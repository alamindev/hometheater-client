<template>
  <section
    class="px-4 lg:px-16 pt-5 pb-20 custom-gradient search--service-page"
  >
    <div class="container mx-auto relative">
      <h2
        v-if="!errors.message"
        class="font-rubik text-xl font-bold text-center pb-10 text-gray-500"
      >
        Search result for
        <span class="text-brand-color"> {{ $route.query.search }}</span>
      </h2>
      <div class="md:flex" v-if="!loading">
        <div v-if="!errors.message">
          <Booking
            Rootclass="grid gap-x-5 xl:gap-x-16 gap-y-10 lg:gap-y-24  grid-cols-2 lg:grid-cols-3"
            :services="services"
            title="text-xs text-sm md:text-base"
          />
        </div>
        <div v-else class="w-full">
          <div class="flex justify-center">
            <div class="">
              <div class="flex justify-center">
                <img
                  loading="lazy"
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
import Booking from "@/components/Booking/Booking";
export default {
  middleware: ["checkSetting"],
  components: {
    Booking,
  },
  head() {
    return {
      title: "Search Service | Home Theater Proz",
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading.loading;
    },
    services() {
      return this.$store.state.search.services;
    },
  },
  watch: {
    "$route.query.search"() {
      this.doSearch();
    },
  },
  methods: {
    doSearch() {
      this.$store.dispatch(
        "search/fetchSearchesService",
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
