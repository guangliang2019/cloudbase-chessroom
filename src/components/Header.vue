<script lang="tsx">
import { Badge, Button, Space } from '@arco-design/web-vue';
import { IconEmail, IconStar, IconUser } from '@arco-design/web-vue/es/icon';
import { defineComponent } from 'vue';
import Logo from './Logo.vue';

export default defineComponent({
  components: {
    Logo,
  },

  setup() {
    return () => (
      <div class="chessroom-header">
        <Logo />
        <div>
          <Space size="small">
            <Button type="text">
              {{
                icon: () => (
                  <Badge dot count={1}>
                    <IconEmail class="chessroom-icon" size="20" />
                  </Badge>
                ),
              }}
            </Button>
            <Button type="text">
              {{
                icon: () => <IconStar class="chessroom-icon" size="20" />,
              }}
            </Button>
            <Button type="text">
              {{
                icon: () => (
                  <Badge dot count={0}>
                    <IconUser class="chessroom-icon" size="20" />
                  </Badge>
                ),
              }}
            </Button>
          </Space>
        </div>
      </div>
    );
  },
});
</script>

<style lang="less">
.chessroom-header {
  width: 100%;
  max-width: 1440px;
  height: 52px;
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.arco-btn-icon .chessroom-icon {
  stroke: var(--color-text-2);
}
</style>
