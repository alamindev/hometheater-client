<template>
  <div class="font-custom">
    <div
      style="z-index: 9000"
      v-if="$nuxt.isOffline"
      class="w-full text-center py-2 bg-red-200 text-red-900 font-semibold fixed top-0"
    >
      You are offline
    </div>
    <LazyDefaultHeader />
    <delay-hydration>
      <div>
        <div class="sticky top-0 z-50">
          <div class="flex items-center lg:hidden py-2 px-4 bg-white">
            <Search classes="w-full" />
            <div class="pl-3 flex-2 relative pr-2 lg:pr-0">
              <nuxt-link to="/cart">
                <div
                  class="absolute -top-3 -right-1 lg:-right-4 rounded-full w-8 h-8 bg-brand-color flex justify-center items-center text-white"
                >
                  {{ count }}
                </div>
                <nuxt-img
                  quality="50"
                  loading="lazy"
                  src="/images/cart.svg"
                  alt="cart icon"
              /></nuxt-link>
            </div>
          </div>
        </div>
        <Nuxt />
        <LazyDefaultFooter />
      </div>
    </delay-hydration>
  </div>
</template>

<script>
import Search from "@/components/Search";
import { mapGetters } from "vuex";
export default {
  name: "Default",
  components: {
    Search,
  },
  head() {
    return {
      script: [
        {
          src: this.setting
            ? "https://www.googletagmanager.com/gtag/js?id=" +
              this.setting.analytics_id
            : "",
          async: true,
        },
        {
          src: "https://admin.hometheaterproz.com/storage/custom.js",
          type: "text/javascript",
          body: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      count: "cart/cartDataCount",
    }),
    setting() {
      return this.$store.state.setting;
    },
  },
  async fetch() {
    await this.$store.dispatch("fetchSetting");
  },
};
</script>
