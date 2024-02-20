<template>
  <div class="font-custom scroll-smooth">
    <LazyDefaultCheckZip v-if="is_popup" @setZipCode="setZipCode" />
    <div
      style="z-index: 9000"
      v-if="$nuxt.isOffline"
      class="w-full text-center py-2 bg-red-200 text-red-900 font-semibold fixed top-0"
    >
      You are offline
    </div>
    <LazyDefaultHeader />
    <div>
      <div class="sticky top-0 z-50">
        <div class="flex items-center lg:hidden py-2 px-4 bg-white">
          <Search classes="w-full" />
          <div class="pl-3 flex-2 relative pr-2 lg:pr-0">
            <nuxt-link to="/cart">
              <div
                class="absolute -top-3 -right-1 lg:-right-4 rounded-full w-6 sm:w-8 h-6 sm:h-8 bg-brand-color flex justify-center items-center text-white"
              >
                {{ count }}
              </div>
              <img loading="lazy" src="/images/cart.svg" alt="cart icon"
            /></nuxt-link>
          </div>
        </div>
      </div>
      <Nuxt />
      <LazyDefaultFooter />
    </div>
  </div>
</template>

<script>
import { getCookie, setCookie } from "@/Utils/Cookie";
import Search from "@/components/Search";
import { mapGetters } from "vuex";
export default {
  name: "Default",
  data() {
    return {
      is_popup: false,
    };
  },
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
  mounted() {
    let is_zipcode = getCookie("is_zipcode");
    if (is_zipcode === "" || is_zipcode === "false") {
      setTimeout(() => {
        this.is_popup = true;
      }, 7000);
    }
  },
  methods: {
    setZipCode(type, zipcode, is_success) {
      setCookie("is_zipcode", true, 1500);
      if (type === "service") {
        this.$router.push("/booking");
      } else if (type === "home") {
        this.$router.push("/");
      } else if (type === "contact") {
        this.$router.push("/contact-us");
      }

      if (is_success) {
        setCookie("is_zipcode_checked", zipcode, 1500);
      }
      this.is_popup = false;
    },
  },
  async fetch() {
    await this.$store.dispatch("fetchSetting");
  },
};
</script>
