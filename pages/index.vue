<template>
  <div>
    <main class="home--page" v-show="!loading">
      <LazyHomeBanner/>
      <LazyHomeService/>
      <LazyHomeWhy/>
      <LazyHomeClientSlider/>
      <LazyHomeReview/>
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
  async fetch() {
    await Promise.all([
      this.$store.dispatch("fetchHomePageData"),
      this.$store.dispatch("meta/fetchMetaInfo", "home"),
      this.$store.dispatch("fetchServices")
    ]);
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

