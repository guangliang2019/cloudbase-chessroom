<script lang="tsx">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  setup() {
    return () => <div class="abc">test</div>;
  },
});
</script>

<style lang="less">
.abc {
  color: red;
}
</style>
