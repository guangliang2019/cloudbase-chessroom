<script lang="tsx">
import LogoVue from '@/components/Logo.vue';
import PolishingCardVue from '@/components/PolishingCard.vue';
import { Col, Row } from '@arco-design/web-vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const gameList = ref<string[]>(['五子棋']);
    for (let i = 0; i < 19; i++) {
      gameList.value.push('待定游戏');
    }
    return () => (
      <div class="chessroom-home-root">
        <Row class="chessroom-home-row">
          {gameList.value.map((item) => (
            <Col
              xs={{ span: 12 }}
              sm={{ span: 8 }}
              md={{ span: 6 }}
              class="chessroom-home-col"
            >
              <PolishingCardVue>
                <div class="chessroom-home-card">
                  <div class="chessroom-home-card-text">{item}</div>
                  <LogoVue />
                </div>
              </PolishingCardVue>
            </Col>
          ))}
        </Row>
      </div>
    );
  },
});
</script>

<style lang="less">
.chessroom-home {
  &-root {
    overflow: scroll;
    display: flex;
    width: 100vw;
    height: calc(100vh - 53px);
    flex-direction: column;
    align-items: center;
  }
  &-card {
    height: 334px;
    width: 222px;
    background-color: var(--color-fill-1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-text-1);
    &-text {
      font-weight: 500;
      letter-spacing: 2px;
      font-size: 16px;
    }
  }
  &-row {
    width: 100%;
    max-width: 1000px;
  }
  &-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px 0;
  }
}
</style>
