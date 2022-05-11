<script lang="tsx">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
    color: Number,
    onClick: {
      type: Function as PropType<(payload: MouseEvent) => void>,
      required: true,
    },
  },
  setup(props) {
    const row = ~~(props.id / 15);
    const col = props.id % 15;

    return () => (
      <div onClick={props.onClick} class="gomuku-block-root">
        {row > 0 ? <div class="gomuku-block-line-top" /> : null}
        {col < 14 ? <div class="gomuku-block-line-right" /> : null}
        {row < 14 ? <div class="gomuku-block-line-bottom" /> : null}
        {col > 0 ? <div class="gomuku-block-line-left" /> : null}
        {props.color === 0 ? <div class="gomuku-block-black" /> : null}
        {props.color === 1 ? <div class="gomuku-block-white" /> : null}
      </div>
    );
  },
});
</script>

<style lang="less">
.gomuku-block {
  .line {
    position: absolute;
    background-color: var(--color-text-3);
    height: 3vw;
    width: 3vw;
    max-width: 27px;
    max-height: 27px;
  }
  &-root {
    width: 6vw;
    height: 6vw;
    max-width: 54px;
    max-height: 54px;
    background: var(--color-fill-3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: 200ms border-radius ease-in-out;
    cursor: pointer;
  }
  &-root:hover {
    border-radius: 50%;
  }
  &-line {
    &-left {
      .line;
      left: 0;
      height: 1px;
    }
    &-right {
      .line;
      right: 0;
      height: 1px;
    }
    &-top {
      .line;
      top: 0;
      width: 1px;
    }
    &-bottom {
      .line;
      bottom: 0;
      width: 1px;
    }
  }
  &-black {
    width: 5vw;
    height: 5vw;
    max-width: 45px;
    max-height: 45px;
    background-color: rgb(var(--primary-6));
    border-radius: 50%;
    z-index: 10;
  }
  &-white {
    width: 5vw;
    height: 5vw;
    max-width: 45px;
    max-height: 45px;
    background-color: var(--color-fill-3);
    border: 1px solid rgb(var(--primary-6));
    border-radius: 50%;
    z-index: 10;
  }
}
[arco-theme='dark'] {
  .gomuku-block-white {
    background-color: #333;
  }
  .gomuku-block-root {
    background-color: #222;
  }
}
</style>
