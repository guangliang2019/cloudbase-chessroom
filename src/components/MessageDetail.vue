<script lang="tsx">
import { Message } from '@/utils/type';
import {
  Button,
  Form,
  FormItem,
  Input,
  Layout,
  LayoutContent,
  LayoutFooter,
  Message as Tip,
} from '@arco-design/web-vue';
import { IconSend } from '@arco-design/web-vue/es/icon';
import { defineComponent, onMounted, reactive, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import fetch from '@/utils/fetch';
import MessageItem from './MessageItem.vue';
import socket from '@/utils/socket';

export default defineComponent({
  name: 'MessageDetail',

  setup() {
    const layoutContentRef = ref();
    const store = useStore();
    const roomId = ref<string>(store.state.message.roomId);
    const form = reactive({
      content: '',
    });
    const messages = ref<Message[]>([]);
    const loading = ref<boolean>(false);

    const scrollContentToBottom = () => {
      const content = document.getElementById('layoutContentRef') as Element;
      content.scrollTo({ top: content.scrollHeight, behavior: 'smooth' });
    };

    const fetchMessageList = () => {
      loading.value = true;
      roomId.value = store.state.message.roomId;
      if (roomId.value) {
        fetch('message-R', { roomId: roomId.value })
          .then((res) => {
            messages.value = res.messages;
            loading.value = false;
          })
          .then(scrollContentToBottom);
      }
    };

    onMounted(() => {
      const content = document.getElementById('layoutContentRef') as Element;
      content.scrollTo({ top: content.scrollHeight, behavior: 'smooth' });
    });

    watchEffect(() => {
      fetchMessageList();
      if (!socket.hasListeners(roomId.value + '-update')) {
        if (!roomId.value) return;
        console.log('add + ' + roomId.value);
        socket.on(roomId.value + '-update', () => {
          console.log('shouldUpdate ' + roomId.value);
          fetchMessageList();
        });
      }
    });
    // 发送消息
    const submiting = ref<boolean>(false);
    const handleSubmit = () => {
      if (!form.content) return;
      submiting.value = true;
      const newMessage = {
        userName: store.state.user.userName,
        content: form.content,
        createdAt: '',
        readAt: '',
      };
      fetch('message-C', {
        roomId: roomId.value,
        message: newMessage,
      }).then((res) => {
        if (res.err_code) {
          Tip.error('刚刚那条遇到问题了其实没发出去，建议刷新页面重试');
        } else {
          console.log(store.state.user.userName + '-send');
          socket.emit(store.state.user.userName + '-send', {
            roomId: store.state.message.roomId,
          });
        }
      });
      form.content = '';
    };

    return () => (
      <Layout class="chessroom-message-detail-root">
        <LayoutContent
          // @ts-ignore
          id="layoutContentRef"
          class="chessroom-message-detail-content"
        >
          {messages.value.map((item) => (
            <MessageItem {...item} />
          ))}
        </LayoutContent>
        <LayoutFooter>
          <div class="chessroom-message-detail-send-box">
            <Form
              labelColProps={{ span: 0 }}
              wrapperColProps={{ span: 24 }}
              model={form}
            >
              <FormItem field="content">
                <Input
                  modelValue={form.content}
                  onInput={(args: string) => {
                    form.content = args;
                  }}
                ></Input>
                <Button
                  onClick={handleSubmit}
                  htmlType="submit"
                  style={{ marginLeft: '8px' }}
                  type="text"
                >
                  {{ icon: () => <IconSend size={24} /> }}
                </Button>
              </FormItem>
            </Form>
          </div>
        </LayoutFooter>
      </Layout>
    );
  },
});
</script>

<style lang="less">
.chessroom-message-detail {
  &-root {
    height: 100%;
    max-height: 100%;
  }
  &-content {
    max-height: calc(100% - 50px);
    overflow: scroll;
  }
  &-send-box {
    .arco-form-item {
      margin: 0;
      margin-right: 4px;
    }
    background-color: var(--color-bg-1);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    border-top: 1px solid var(--color-border-2);
  }
}
</style>
