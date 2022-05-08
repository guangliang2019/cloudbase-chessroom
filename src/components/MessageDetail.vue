<script lang="tsx">
import {
  Button,
  Form,
  FormItem,
  Input,
  Layout,
  LayoutContent,
  LayoutFooter,
} from '@arco-design/web-vue';
import { IconSend } from '@arco-design/web-vue/es/icon';
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import MessageItem from './MessageItem.vue';

export default defineComponent({
  name: 'MessageDetail',

  setup() {
    const store = useStore();
    const form = reactive({
      content: '',
    });
    return () => (
      <Layout class="chessroom-message-detail-root">
        <LayoutContent class="chessroom-message-detail-content">
          {store.state.message.roomId}
          <MessageItem
            message={{ userName: '广亮', content: '123123', createdAt: '123' }}
          />
        </LayoutContent>
        <LayoutFooter>
          <div class="chessroom-message-detail-send-box">
            <Form
              labelColProps={{ span: 0 }}
              wrapperColProps={{ span: 24 }}
              model={form}
            >
              <FormItem>
                <Input></Input>
                <Button style={{ marginLeft: '8px' }} type="text">
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
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    border-top: 1px solid var(--color-border-2);
  }
}
</style>
