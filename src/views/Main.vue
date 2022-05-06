<script lang="tsx">
// import router from '@/router';
import {
  Button,
  Layout,
  LayoutContent,
  LayoutHeader,
} from '@arco-design/web-vue';
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';

export default defineComponent({
  components: {
    Header,
  },
  setup() {
    return () => (
      <>
        <Layout>
          <LayoutHeader class="chessroom-header-box">
            <Header></Header>
          </LayoutHeader>
          <LayoutContent>
            <h1>這是正文區域</h1>
            <Button>123</Button>
          </LayoutContent>
        </Layout>
      </>
    );
  },
});
</script>
<style lang="less">
.chessroom {
  &-header {
    &-box {
      width: 100vw;
      border-bottom: 1px solid var(--color-border-1);
      box-shadow: 0px 4px 36px -8px rgba(#000, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
