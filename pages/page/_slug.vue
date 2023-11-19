<template>
  <main v-if="!loading">
    <section class="relative dynamic--pages">
      <div
        class="w-full py-24 px-4 lg:px-16 bg-no-repeat bg-cover"
        :style="`background-image: linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.5) ),url('${
          imgurl + 'storage' + page.thumb
        }');`"
      >
        <div class="container mx-auto">
          <div class="w-full">
            <h1
              v-if="page.main_title"
              class="text-center text-white text-xl sm:text-2xl md:text-3xl leading-relaxed pb-5 font-semibold"
            >
              {{ page.main_title }}
            </h1>
          </div>
        </div>
      </div>
    </section>
    <section class="px-4 lg:px-16">
      <div class="container mx-auto">
        <div class="py-10 blog--details w-full !max-w-full prose prose-dark prose-strong:font-semibold prose-b:font-semibold prose-a:font-bold prose-h1:text-brand-dark prose-h2:text-brand-dark prose-h3:text-brand-dark prose-strong:text-brand-dark prose-b:text-brand-dark prose-h4:text-brand-dark prose-h5:text-brand-dark prose-h6:text-brand-dark prose-h1:text-[2rem] prose-h2:text-[1.5rem] prose-h3:text-[1.3rem] prose-h4:text-[1rem] prose-h5:text-[0.8rem] prose-h6:text-[0.7rem]  prose-a:text-brand-color prose-a:no-underline hover:prose-a:underline hover:prose-a:text-brand-color-hover" v-html="page.content"></div>
      </div>
    </section>
  </main>
  <div v-else class="loader-parent mt-16 mb-20">
    <div class="loader"></div>
  </div>
</template>

<script>
import globalMeta from "@/mixins/meta.js";
export default {
  mixins: [globalMeta],
  middleware: ["checkSetting"],
  data() {
    return {
      imgurl: process.env.imgUrl,
      url: process.env.url + this.$route.fullPath,
    };
  },
  computed: {
    meta() {
      let page = this.$store.state.page.page;
      if (page) {
        return {
          title: page.main_title,
          description: page.seo_details,
          image: page.thumb,
          keyword: page.keyword,
        };
      }
    },
    loading() {
      return this.$store.state.loading.loading;
    },
    page() {
      return this.$store.state.page.page;
    },
  },
  async asyncData({ store, params, error }) {
    await store.dispatch("page/fetchPage", params.slug).catch((e) => {
      error({ statusCode: 404, message: "Page not found!" });
    });
  },
};
</script>

<style>
</style>
