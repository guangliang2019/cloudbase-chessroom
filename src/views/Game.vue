<script lang="tsx">
import MessageDetailVue from '@/components/MessageDetail.vue';
import { UIContext, UIInjectionKey } from '@/context';
import socket from '@/utils/socket';
import { below } from '@/utils/ui';
import {
  Button,
  Layout,
  LayoutContent,
  LayoutSider,
} from '@arco-design/web-vue';
import { IconMessage } from '@arco-design/web-vue/es/icon';
import { defineComponent, inject, ref } from 'vue';
import { RouterView } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Game',
  setup() {
    const UIcontext = inject(UIInjectionKey) as UIContext;
    const chatting = ref<boolean>(true);
    const store = useStore();
    socket.on(store.state.user.userName + '-match', (args: any) => {
      store.commit('changeChatRoom', { roomId: args.roomId });
    });

    return () => (
      <Layout class="chessroom-game-root">
        <LayoutSider
          class="chessroom-game-sider"
          collapsedWidth={0}
          width={360}
          collapsed={below(UIcontext.breakpoint, 'xl') ? chatting.value : false}
        >
          <Button
            style={{
              display: below(UIcontext.breakpoint, 'xl') ? 'block' : 'none',
            }}
            type="text"
            class="chessroom-game-chat-btn"
            onClick={() => {
              chatting.value = !chatting.value;
            }}
          >
            {{
              icon: () => <IconMessage size="20" />,
            }}
          </Button>
          <MessageDetailVue>abc</MessageDetailVue>
        </LayoutSider>
        <LayoutContent
          style={{
            marginLeft: below(UIcontext.breakpoint, 'xl') ? '0' : '361px',
            width: below(UIcontext.breakpoint, 'xl')
              ? '100vw'
              : 'calc(100vw - 361px)',
          }}
          class="chessroom-game-content"
        >
          <RouterView></RouterView>
        </LayoutContent>
      </Layout>
    );
  },
});
</script>

<style lang="less">
.chessroom-game {
  &-root {
    height: calc(100vh - 53px);
  }
  &-sider {
    //overflow: hidden;
    position: relative !important;
    box-shadow: none !important;
    border-right: 1px solid var(--color-border-2);
    z-index: 500;
  }
  &-content {
    height: calc(100vh - 53px);
    position: absolute;
    width: 100%;
    overflow-x: unset !important;
    z-index: 100;
  }
  &-chat-btn {
    position: absolute !important;
    background-color: var(--color-bg-1) !important;
    border: 1px solid var(--color-border-2) !important;
    border-left: none !important;
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
    width: 32px !important;
    color: var(--color-text-2) !important;
    z-index: 1000;
    top: calc(53px + 6vh);
    right: -31px;
    .arco-btn-icon {
      margin-left: -3px;
    }
  }
}
</style>
