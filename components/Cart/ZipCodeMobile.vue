<template>
  <div class="relative">
    <div class="flex justify-between items-center border-b pb-3" v-if="header">
      <h1
        class="text-xl font-bold font-rubik text-gray-600 custom--text-cart-title"
      >
        Check out
      </h1>
    </div>
    <div class="my-10 sm:mb-24 sm:mt-20 lg:h-64">
      <div class="flex justify-center items-center flex-col">
        <h1 class="pb-4 sm:pb-8 text-xl text-gray-700">
          Please confirm your zip code
        </h1>
        <div class="w-full sm:w-5/6 lg:w-3/6">
          <input
            name="zipcodeMobile"
            type="text"
            v-model="zipcodeMobile"
            class="py-3 px-6 bg-light-10 border-0 rounded-md w-full"
          />
          <div
            class="text-brand-color text-sm font-medium pt-2 flex items-center"
            v-if="success != '' && ajaxerr"
          >
            <i class="fas fa-check-circle text-lg block"></i> &nbsp;
            <p>{{ success }}</p>
          </div>
          <div
            class="text-red-500 text-xs pt-2"
            v-if="errors.ziperror && success == '' && ajaxerr"
          >
            {{ errors.ziperror }}
          </div>
          <div class="text-red-500 text-xs pt-2" v-if="ziperr">
            The zipcode format is invalid.
          </div>
          <div
            class="text-red-500 text-xs pt-2"
            v-if="errors.zipcode && success == ''"
          >
            {{ errors.zipcode[0] }}
          </div>
        </div>
      </div>
    </div>
    <div class="border-t lg:pt-10">
      <button
        class="flex items-center absolute -bottom-8 lg:relative lg:bottom-0"
        @click="onClickPrevious"
      >
        <i class="fas fa-long-arrow-alt-left"></i>
        <span class="pl-3 font-medium text-brand-color">Go Back</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZipCode",
  props: ["header"],
  data() {
    return {
      is_check: false,
    };
  },
  computed: {
    zipcodeMobile: {
      get() {
        return this.$store.state.cart.zipcode;
      },
      set(value) {
        this.$store.commit("cart/UPDATE_ZIPCODE", value);
      },
    },
    success() {
      return this.$store.state.cart.success;
    },
    ziperr() {
      return this.$store.state.cart.ziperr;
    },
    ajaxerr() {
      return this.$store.state.cart.ajaxerr;
    },
  },
  watch: {
    zipcodeMobile: function (val, oldVal) {
      if (val != "") {
        this.$store.dispatch("cart/CheckZipcode");
      }
    },
  },
  methods: {
    onClickPrevious() {
      this.$emit("prev");
    },
  },
  async created() {
    if (typeof this.$route.query.zipcode !== "undefined") {
      this.$store.commit("cart/UPDATE_ZIPCODE", this.$route.query.zipcode);
    }
  },
};
</script>

<style>
</style>
