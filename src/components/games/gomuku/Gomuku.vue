<script lang="tsx">
import socket from '@/utils/socket';
import { Message } from '@arco-design/web-vue';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import Block from './Block.vue';
import { GomukuBlock, GomukuColor, GomukuRule } from './utils';

// 用于初始化响应式数据源
const initBlocks: GomukuBlock[] = [];
for (let i = 0; i < 225; i++)
  initBlocks.push({
    id: i,
    color: GomukuColor['none'],
    [GomukuRule.right]: [true, true],
    [GomukuRule.bottom]: [true, true],
    [GomukuRule.leftBottom]: [true, true],
    [GomukuRule.rightBottom]: [true, true],
  });

export default defineComponent({
  setup() {
    const store = useStore();

    // 内部标志位
    let waiting = true;
    let color = -1;
    let end = false;

    // 响应式属性
    const blocks = ref<GomukuBlock[]>(initBlocks);

    // 匹配完成时的事件处理
    socket.on(store.state.user.userName + '-match', (args: any) => {
      // 添加长链接监视
      console.log(args.roomId, 'game_monitor');
      socket.on(
        args.roomId + '-game-update',
        (args: { block: GomukuBlock }) => {
          blocks.value[args.block.id] = args.block;
          if (args.block.color !== color) {
            waiting = false;
          }
          let result = judge();
          if (result !== -1 && !end) {
            Message.info(result === color ? '你赢了' : '对方赢了');
            end = true;
          }
        },
      );
      Array.prototype.forEach.call(
        args.order as Array<string>,
        (item, index) => {
          color = store.state.user.userName === item ? index : color;
        },
      );
      if (color === 0) waiting = false;
    });

    // 进入游戏房间
    socket.emit('game', store.state.user.userName, 0);

    // 处理点击事件
    const handleBlockClick = (block: GomukuBlock) => {
      if (end) {
        Message.info('这局结束了');
        return;
      }
      if (waiting) {
        Message.info('稍等一会，现在轮到对方落子');
        return;
      }
      waiting = true;
      block.color = color;
      socket.emit(store.state.user.userName + '-game-update', {
        roomId: store.state.message.roomId,
        block,
      });
      let result = judge();
      if (result !== -1 && !end) {
        Message.info(result === color ? '你赢了' : '对方赢了');
        end = true;
      }
    };

    const combol = (id: number, rule: GomukuRule) => {
      let cur_id = id;
      for (let times = 1; times < 5; times++) {
        if (blocks.value[cur_id].color === blocks.value[cur_id + rule].color) {
          cur_id += rule;
        } else {
          return -1;
        }
      }
      return blocks.value[id].color;
    };

    const judge = (): GomukuColor => {
      // 横向
      for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 10; col++) {
          let id = row * 15 + col;
          let color = combol(id, GomukuRule.right);
          if (color !== -1) {
            return color;
          }
        }
      }
      // 纵向
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 15; col++) {
          let id = row * 15 + col;
          let color = combol(id, GomukuRule.bottom);
          if (color !== -1) {
            return color;
          }
        }
      }
      // 左斜
      for (let row = 0; row < 10; row++) {
        for (let col = 5; col < 15; col++) {
          let id = row * 15 + col;
          let color = combol(id, GomukuRule.leftBottom);
          if (color !== -1) {
            return color;
          }
        }
      }
      // 右斜
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          let id = row * 15 + col;
          let color = combol(id, GomukuRule.rightBottom);
          if (color !== -1) {
            return color;
          }
        }
      }
      return -1;
    };

    return () => (
      <div class="chessroom-game-gomuku-root">
        <div class="chessroom-game-gomuku-box">
          {blocks.value.map((block) => (
            <Block
              onClick={() => handleBlockClick(block)}
              id={block.id}
              color={block.color}
              key={block.id}
            />
          ))}
        </div>
      </div>
    );
  },
});
</script>

<style lang="less">
.chessroom-game-gomuku {
  &-root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &-box {
    width: 90vw;
    max-width: 810px;
    max-height: 810px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: rgb(var(--primary-5));
  }
}
</style>
