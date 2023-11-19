<template>
  <section class="px-4 lg:px-16 pt-5 pb-20 custom-gradient search--blog-page">
    <div class="container mx-auto relative">
      <h2
        v-if="!errors.message"
        class="font-rubik text-xl font-bold text-center pb-10 text-gray-500"
      >
        Search result for
        <span class="text-brand-color"> {{ $route.query.search }}</span>
      </h2>
      <div class="md:flex" v-if="!loading">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          v-if="!errors.message"
        >
          <Blog :post="post" :key="post.id" v-for="post in posts" />
        </div>
        <div v-else class="w-full">
          <div class="flex justify-center">
            <div class="">
              <div class="flex justify-center">
                <img
                  class="w-8/12"
                  src="/images/no-result-found.svg"
                  alt="no-result-found.svg"
                />
              </div>
              <h1 class="text-center text-2xl text-dark-sm font-bold pt-2">
                Oops! Nothing Found
              </h1>
              <p class="text-brand-gray pt-2 font-medium text-center">
                Please try searching again with some new keywords, or go to home
                page.
              </p>
              <div class="flex justify-center pt-3">
                <nuxt-link
                  to="/"
                  class="flex items-center px-5 text-white py-2 bg-brand-color hover:bg-brand-color-hover rounded-md shadow-md"
                >
                  <i class="fas fa-long-arrow-alt-left text-2xl pr-3"></i> Go to
                  Home
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loader-parent mt-16">
        <div class="loader"></div>
      </div>
    </div>
  </section>
</template>

<script>
import Blog from "@/components/Blog/Blog";
export default {
  middleware: ["checkSetting"],
  components: {
    Blog,
  },
  computed: {
    loading() {
      return this.$store.state.loading.loading;
    },
    posts() {
      return this.$store.state.search.blogs;
    },
  },
  head() {
    return {
      title: "Search Blog | Home Theater Proz",
    };
  },
  watch: {
    "$route.query.search"() {
      this.doSearch();
    },
  },
  methods: {
    doSearch() {
      this.$store.dispatch(
        "search/fetchSearchesBlog",
        this.$route.query.search
      );
    },
  },
  created() {
    this.doSearch();
  },
};
</script>

<style>
</style>
