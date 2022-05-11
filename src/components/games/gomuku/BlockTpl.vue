<template>
  <div @click="handleClick" class="root">
    <div v-if="row > 0" class="line-top"></div>
    <div v-if="col < 14" class="line-right"></div>
    <div v-if="row < 14" class="line-bottom"></div>
    <div v-if="col > 0" class="line-left"></div>
    <div v-if="color === 0" class="chessman-black"></div>
    <div v-if="color === 1" class="chessman-white"></div>
  </div>
</template>

<script>
export default {
  created() {
    this.row = ~~(this.$props.id / 15);
    this.col = this.$props.id % 15;
  },
  data() {
    return {
      row: undefined,
      col: undefined,
    };
  },
  props: {
    id: Number,
    color: Number,
    handleBlockClick: Function,
  },
  methods: {
    handleClick() {
      this.$props.handleBlockClick();
    },
  },
};
</script>

<style lang="less" scoped>
.chessman-black {
  width: 5vw;
  height: 5vw;
  max-width: 50px;
  max-height: 50px;
  background-color: black;
  border-radius: 50%;
  z-index: 10;
}
.chessman-white {
  width: 5vw;
  height: 5vw;
  max-width: 50px;
  max-height: 50px;
  background-color: white;
  border-radius: 50%;
  z-index: 10;
}
.root {
  width: 6vw;
  height: 6vw;
  max-width: 60px;
  max-height: 60px;
  background-color: wheat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: 200ms opacity;
}
.root:hover {
  opacity: 0.5;
}
.line {
  &-top {
    top: 0;
    position: absolute;
    width: 1px;
    height: 3vw;
    max-height: 30px;
    background-color: black;
  }
  &-right {
    right: 0;
    position: absolute;
    height: 1px;
    width: 3vw;
    max-width: 30px;
    background-color: black;
  }
  &-bottom {
    bottom: 0;
    position: absolute;
    width: 1px;
    height: 3vw;
    max-height: 30px;
    background-color: black;
  }
  &-left {
    left: 0;
    position: absolute;
    height: 1px;
    width: 3vw;
    max-width: 30px;
    background-color: black;
  }
}
</style>
