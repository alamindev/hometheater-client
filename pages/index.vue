<template>
  <div>
    <main class="home--page" v-show="!loading">
      <LazyHomeBanner />
      <LazyHomeService />
      <LazyHomeWhy />
    </main>
    <div class="min-h-screen flex items-center" v-show="loading">
      <div class="loader-parent mt-16 mb-20">
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
import globalMeta from "@/mixins/meta.js";
export default {
  mixins: [globalMeta],
  computed: {
    meta() {
      return this.$store.state.meta.home;
    },
    loading() {
      return this.$store.state.loading.loading;
    },
  },
  async fetch({ store }) {
    if (store.state.services.length <= 0) {
      await Promise.all([
        store.dispatch("fetchHomePageData"),
        store.dispatch("meta/fetchMetaInfo", "home"),
        store.dispatch("fetchServices"),
      ]);
    }
  },
};
</script>
<style scoped>
@media screen and (max-width: 768px) {
  .custom--grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>

