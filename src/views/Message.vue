<script lang="tsx">
import ChatListItem from '@/components/ChatListItem.vue';
import MessageDetail from '@/components/MessageDetail.vue';
import { Layout, LayoutContent, LayoutSider, Menu } from '@arco-design/web-vue';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import socket from '@/utils/socket';
import type { Chat } from '@/utils/type';

export default defineComponent({
  setup() {
    const loading = ref<boolean>(true);
    const chatList = ref<Chat[]>([]);
    const store = useStore();
    // 长链接加载好友列表
    if (store.state.user.userName) {
      socket.emit('chat', store.state.user.userName);
      socket.on(store.state.user.userName + '-chatList', (args) => {
        chatList.value = args.res.map((item: any): Chat => {
          let users = Object.keys(item.users);
          let anotherUserName = '';
          users.forEach((item) => {
            if (item !== store.state.user.userName) {
              anotherUserName = item;
            }
          });
          return {
            roomId: item._id as string,
            userName: anotherUserName as string,
            new: 0,
          };
        });
        store.state.message.roomId = chatList.value[0].roomId;
        loading.value = false;
      });
    }

    return () => (
      <Layout class="chessroom-message-root">
        <LayoutSider
          width={240}
          collapsedWidth={72}
          breakpoint="md"
          class="chessroom-message-sider"
        >
          <Menu
            //@ts-ignore
            collapsedWidth={72}
            tooltip-props={{ popupVisible: false }}
            style={{ marginTop: '4px' }}
          >
            {loading.value
              ? '加载中'
              : chatList.value.map((item) => (
                  <ChatListItem key={item.userName} {...item} />
                ))}
          </Menu>
        </LayoutSider>
        <LayoutContent>
          <MessageDetail></MessageDetail>
        </LayoutContent>
      </Layout>
    );
  },
});
</script>

<style lang="less">
.chessroom {
  &-message {
    &-root {
      height: 100%;
      z-index: 1;
    }
    &-sider {
      height: 100%;
      z-index: 100;
      box-shadow: none !important;
      border-right: 1px solid var(--color-border-2);
      &-menuitem-inner {
        display: flex;
        flex-direction: row;
        min-width: 208px;
        &-right {
          margin-left: 12px;
          display: flex;
          width: 152px;
          flex-direction: row;
          justify-content: space-between;
          &-user-name {
            line-height: 1em;
            font-size: 16px;
            font-weight: 500;
            color: var(--color-text-1);
          }
          &-message {
            line-height: 1em;
          }
          &-time {
            line-height: 1em;
          }
        }
      }
    }

    .flex {
      display: inline-block;
      position: absolute;
      top: 200px;
    }
  }
}
</style>
