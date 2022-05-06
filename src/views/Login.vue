<script lang="tsx">
import { UIContext, UIInjectionKey } from '@/context';
import {
  Button,
  Form,
  FormItem,
  Input,
  InputPassword,
  Link,
  TypographyParagraph,
  TypographyTitle,
} from '@arco-design/web-vue';
import { defineComponent, inject, reactive } from 'vue';
import { over } from '@/utils/ui';

export default defineComponent({
  setup() {
    const form = reactive({
      name: '',
      password: '',
      visable: false,
    });
    // 获取 UI 上下文
    const UIContext = inject(UIInjectionKey);
    return () => (
      <div class="chessroom-login-root">
        <div
          class="chessroom-login-left"
          style={{
            width: over((UIContext as UIContext).breakpoint, 'md')
              ? '420px'
              : '0',
          }}
        ></div>
        <div class="chessroom-login-right">
          <div class="chessroom-login-right-box">
            <TypographyParagraph>
              <TypographyTitle>登录</TypographyTitle>
            </TypographyParagraph>
            <Form
              labelColProps={{ span: 0 }}
              wrapperColProps={{ span: 24 }}
              model={form}
            >
              <FormItem field="userName">
                <Input
                  size="large"
                  modelValue={form.name}
                  placeholder="用户名"
                  onInput={(args: string) => {
                    form.name = args;
                  }}
                ></Input>
              </FormItem>
              <FormItem field="password">
                <InputPassword
                  // @ts-ignore
                  // arco 的 mixin 真是让人血压飙升
                  size={'large'}
                  modelValue={form.password}
                  placeholder={'密码'}
                  onInput={(args: string) => {
                    form.password = args;
                  }}
                ></InputPassword>
              </FormItem>
              <FormItem style={{ marginTop: '16px' }} field="password">
                <Button size="large" long type="primary">
                  登录
                </Button>
              </FormItem>
            </Form>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Link href="/register">没有账号？去注册！</Link>
              <Link>找回密码</Link>
            </div>
            <div
              class="chessroom-login-right-box-jacker"
              style={{
                height: over((UIContext as UIContext).breakpoint, 'md')
                  ? '12vh'
                  : '40vh',
              }}
            />
          </div>
        </div>
      </div>
    );
  },
});
</script>

<style lang="less">
.chessroom {
  &-login {
    &-root {
      display: flex;
      flex-direction: row;
      height: 100vh;
    }
    &-left {
      width: 400px;
      background-color: var(--color-fill-1);
      transition: 300ms width ease-in-out;
    }
    &-right {
      flex: 1;
      box-shadow: 0px 4px 36px -8px rgba(#000, 0.08);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 8px;
      transition: 300ms width ease-in-out;
      &-box {
        max-width: 420px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &-jacker {
          height: 36vh;
          transition: 300ms height ease-in-out;
        }
      }
    }
  }
}
</style>
