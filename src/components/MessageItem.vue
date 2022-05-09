<script lang="tsx">
import { defineComponent, PropType } from 'vue';
import type { Message } from '@/utils/type';
import { Avatar } from '@arco-design/web-vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MessageItem',
  props: {
    userName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
    },
    readAt: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const isSelf = store.state.user.userName === props.userName;

    return () => (
      <div
        style={{ flexDirection: isSelf ? 'row-reverse' : 'row' }}
        class="chessroom-message-item-root"
      >
        <Avatar class="chessroom-message-item-avatar" size={30}>
          {props.userName[0]}
        </Avatar>
        <div class="chessroom-message-item-right">
          <div
            style={{ textAlign: isSelf ? 'right' : 'left' }}
            class="chessroom-message-item-right-username"
          >
            {props.userName}
          </div>
          <div
            class={`chessroom-message-item-right-content${
              isSelf ? '-self' : ''
            }`}
          >
            {props.content}
          </div>
        </div>
      </div>
    );
  },
});
</script>

<style lang="less">
.chessroom-message-item {
  &-root {
    margin: 16px;
    display: flex;
    flex-direction: row;
  }
  &-avatar {
    min-width: 30px;
    min-height: 30px;
  }
  &-right {
    display: flex;
    flex-direction: column;
    margin: 0 8px;
    width: 100%;
    &-username {
      font-size: 14px;
      color: var(--color-text-2);
      width: 100%;
    }
    &-content {
      align-self: flex-start;
      background-color: var(--color-bg-1);
      margin-top: 8px;
      padding: 8px;
      border-radius: 4px;
      border-top-left-radius: 0;
      color: var(--color-text-1);
      border: 1px solid var(--color-border-2);
      max-width: 75%;
      width: fit-content;
      word-break: break-all;
      &-self {
        align-self: flex-end;
        color: white;
        background-color: rgb(var(--primary-6));
        border: 1px solid rgb(var(--primary-6));
        margin-top: 8px;
        padding: 8px;
        border-radius: 4px;
        border-top-right-radius: 0;
        max-width: 75%;
        width: fit-content;
        word-break: break-all;
      }
    }
  }
}
</style>
