<script lang="tsx">
import { Avatar, Badge, MenuItem } from '@arco-design/web-vue';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ChatListItem',
  props: {
    userName: {
      type: String,
      required: true,
    },
    latestMessage: {
      type: String,
      default: '刚刚认识',
    },
    roomId: {
      type: String,
      required: true,
    },
    new: {
      type: Number,
      default: 1,
    },
    latestTime: {
      type: String,
      default: '19:30',
    },
  },
  setup(props) {
    const store = useStore();

    return () => (
      <MenuItem
        onClick={() => {
          store.commit('changeChatRoom', { roomId: props.roomId });
        }}
        class="chessroom-chat-list-root"
      >
        <div class="chessroom-chat-list-item">
          <Avatar>{props.userName[0]}</Avatar>
          <div class="chessroom-chat-list-item-right">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div class="chessroom-chat-list-item-right-user-name">
                {props.userName}
              </div>
              <div class="chessroom-chat-list-item-right-time">
                {props.latestTime}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div class="chessroom-chat-list-item-right-message">
                {props.latestMessage}
              </div>
              <Badge
                style={{ marginBottom: '-1px' }}
                count={props.new}
                dot
              ></Badge>
            </div>
          </div>
        </div>
      </MenuItem>
    );
  },
});
</script>

<style lang="less">
.chessroom-chat-list {
  &-root {
    height: 66px;
    padding-top: 12px !important;
  }
  &-item {
    display: flex;
    flex-direction: row;
    min-width: 208px;
    align-items: center;

    &-right {
      margin-left: 12px;
      display: flex;
      width: 152px;
      height: 36px;
      flex-direction: column;
      justify-content: space-between;
      &-user-name {
        line-height: 1em;
        font-size: 16px;
        font-weight: 500;
        color: var(--color-text-1);
      }
      &-message {
        line-height: 1em;
        font-size: 13px;
        max-width: 130px;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: 400;
        color: var(--color-text-2);
      }
      &-time {
        margin-top: 2px;
        font-size: 12px;
        line-height: 1em;
        font-weight: 400;
        color: var(--color-text-3);
      }
      .arco-badge-dot {
        box-shadow: none;
      }
    }
  }
}
</style>
