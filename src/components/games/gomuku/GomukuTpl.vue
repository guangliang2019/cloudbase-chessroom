<template>
  <div class="root">
    <div>
      <div>黑子:{{ users[0] }}</div>
      <div>白子:{{ users[1] }}</div>
      <div>{{ users[turn] === name ? '轮到你了' : '轮到对方' }}</div>
    </div>
    <div class="container">
      <Block
        v-for="item in blocks"
        :handleBlockClick="
          () => {
            handleBlockClick(item.id);
          }
        "
        :color="item.color"
        :key="item.id"
        :id="item.id"
      />
    </div>
  </div>
</template>

<script>
import Block from './Block.vue';

const rightRule = 1;
const bottomRule = 15;
const leftBottomRule = 14;
const rightBottomRule = 16;

export default {
  created() {
    for (let i = 0; i < 225; i++) {
      this.blocks.push({
        id: i,
        color: -1,
        //rules
        1: [true, true],
        15: [true, true],
        14: [true, true],
        16: [true, true],
      });
    }
    //this.name = prompt('这局你叫什么？', 'defaultName');
    this.createUser(this.name).then(() => {
      console.log(this.blocks);
      this.joinRoom(this.name, this.blocks).then(() => {
        let timer = setInterval(() => {
          if (this.status === 'end') {
            clearInterval(timer);
          }
          if (this.users[this.turn] === this.name) return;
          this.pollingRoom(this.name, this.roomId);
        }, 2000);

        let checker = setInterval(() => {
          if (this.status === 'playing') {
            clearInterval(checker);
          }
          this.checkRoom(this.roomId);
        }, 1000);
      });
    });
  },
  beforeUnmount() {
    this.delUser(this.name).then(() => {
      this.leaveRoom(this.name);
    });
  },
  data() {
    return {
      blocks: [],
      nowColor: 0,
      isEnd: false,
      name: '',
      roomId: '',
      status: 'waiting',
      users: [],
      turn: undefined,
    };
  },
  methods: {
    //棋盘属性相关
    changeTurn() {
      if (this.turn === 0) this.turn = 1;
      else this.turn = 0;
    },

    //dom事件
    handleBlockClick(id) {
      if (this.status === 'end') {
        alert('这一局结束了');
        return;
      }
      if (this.status !== 'playing') {
        alert('还在匹配对手');
        return;
      }
      if (this.users[this.turn] !== this.name) {
        alert('稍等对方一会');
        return;
      }
      if (this.blocks[id].color === 0 || this.blocks[id].color === 1) return;
      this.blocks[id].color = this.nowColor;
      this.judgeWin();
      this.updateRoom(this.name, this.roomId, this.blocks, this.status);
      this.changeTurn();
    },

    //判断是否终盘
    //-----start-----//
    judgeCombo(id, direction) {
      let color = this.blocks[id].color;
      if (!this.blocks[id][direction][color]) return;

      for (let i = 1; i < 5; i++) {
        if (this.blocks[id + i * direction].color !== color) return;
      }
      //isWin
      alert(color ? 'White' : 'Black' + ', Win!!');
      this.isEnd = true;
      this.status = 'end';
    },
    findNext(id) {
      for (let i = id + 1; i < 225; i++) {
        if (this.blocks[i].color !== -1) return i;
      }
      return -1;
    },
    judgeWin() {
      let id = this.findNext(-1);
      while (id !== -1) {
        let row = ~~(id / 15);
        let col = id % 15;
        if (col < 10) this.judgeCombo(row * 15 + col, rightRule);
        if (row < 10) this.judgeCombo(row * 15 + col, bottomRule);
        if (row < 10 && col < 10)
          this.judgeCombo(row * 15 + col, rightBottomRule);
        if (row >= 5 && col < 10)
          this.judgeCombo(row * 15 + col, leftBottomRule);
        id = this.findNext(id);
      }
    },
    updateRules(id) {
      let color = this.blocks[id].color;
      let row = ~~(id / 15);
      let col = id % 15;
      //left
      for (let i = 1; i < 5; i++) {
        if (col - i >= 0) continue;
        this.blocks[id - i * rightRule][rightRule][color] = false;
      }
      //top
      for (let i = 1; i < 5; i++) {
        if (row - i >= 0) continue;
        this.blocks[id - i * bottomRule][bottomRule][color] = false;
      }
      //right top
      for (let i = 1; i < 5; i++) {
        if (row - i >= 0 && col + i < 15) continue;
        this.blocks[id - i * leftBottomRule][leftBottomRule][color] = false;
      }
      //left top
      for (let i = 1; i < 5; i++) {
        if (col - i >= 0) continue;
        this.blocks[id - i * rightBottomRule][rightBottomRule][color] = false;
      }
    },
    //-----end-----//

    //API
    //创建用户
    async createUser(name) {
      try {
        const res = await this.$cloudbase.callFunction({
          name: 'createUser',
          data: {
            name: name,
          },
        });
        console.log(res, 'createUser');
      } catch (e) {
        console.error(e);
      }
    },
    //退出时下线
    async delUser(name) {
      try {
        const res = await this.$cloudbase.callFunction({
          name: 'delUser',
          data: {
            name: name,
          },
        });
        console.log(res, 'delUser');
      } catch (e) {
        console.error(e);
      }
    },
    //加入房间
    async joinRoom(name, blocks) {
      try {
        const res = await this.$cloudbase.callFunction({
          name: 'joinRoom',
          data: {
            name: name,
            blocks: JSON.stringify(blocks),
          },
        });
        this.roomId = res.result.roomId;
        this.users = res.result.users;
        this.turn = res.result.turn;
        console.log(res, 'joinRoom');
      } catch (e) {
        console.error(e);
      }

      if (this.users.length > 1) {
        this.status = 'playing';
        this.nowColor = 1;
      }
    },
    //离开房间
    async leaveRoom(name, roomId) {
      try {
        const res = await this.$cloudbase.callFunction({
          name: 'leaveRoom',
          data: {
            name: name,
            roomId: roomId,
          },
        });
        console.log(res, 'leaveRoom');
      } catch (e) {
        console.error(e);
      }
    },
    //轮询房间情况
    async pollingRoom(name, roomId) {
      try {
        const res = await this.$cloudbase.callFunction({
          name: 'pollingRoom',
          data: {
            name: name,
            roomId: roomId,
          },
        });
        if (res.result.ready) {
          this.blocks = JSON.parse(res.result.blocks);
          this.turn = res.result.turn;
          this.users = res.result.users;
          this.status = res.result.status;
        }
        console.log(res, 'pollingRoom');
      } catch (e) {
        console.error(e);
      }
    },
    //更新棋盘状况
    async updateRoom(name, roomId, blocks, status) {
      try {
        const res = await this.$cloudbase.callFunction({
          name: 'updateRoom',
          data: {
            name: name,
            roomId: roomId,
            blocks: JSON.stringify(blocks),
            status: status,
          },
        });
        console.log(res, 'updateRoom');
      } catch (e) {
        console.error(e);
      }
    },
    //轮询匹配情况
    async checkRoom(roomId) {
      try {
        const res = await this.$cloudbase.callFunction({
          name: 'checkRoom',
          data: {
            roomId: roomId,
          },
        });
        if (res.result.ready) {
          this.status = 'playing';
          this.users = res.result.users;
        }
        console.log(res, 'checkRoom');
      } catch (e) {
        console.error(e);
      }
    },
  },
  components: {
    Block,
  },
};
</script>

<style lang="less" scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 90vw;
  height: 90vw;
  max-width: 900px;
  max-height: 900px;
}
</style>
