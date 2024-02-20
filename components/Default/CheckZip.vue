<template>
  <div class="fixed w-full inset-0 bg-white/50 backdrop-blur-md z-50">
    <div class="w-full h-full flex justify-center items-center px-4">
      <div
        class="max-w-full w-[600px] space-y-2 rounded-md bg-white border border-neutral-200 shadow-2xl p-6 relative"
      >
        <button
          @click="setZipCode('default')"
          type="button"
          class="p-1 absolute right-2 top-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h2
          class="text-3xl text-brand-color text-center font-bold font-rubik leading-tight"
        >
          Zip Code Check
        </h2>
        <p class="text-center">
          Let's check to see if we offer service in your area.
        </p>
        <div class="space-y-10 pt-8">
          <div>
            <input
              name="zipcode"
              type="text"
              v-model="zipcode"
              class="py-3 px-6 bg-light-10 border-0 rounded-md w-full"
            />
            <div
              class="text-brand-color text-sm font-medium pt-2 flex items-center"
              v-if="success != '' && ajaxerr"
            >
              <i class="fas fa-check-circle text-lg block"></i> &nbsp;
              <p>We offer service in your location.</p>
            </div>
            <div
              class="text-red-500 text-xs pt-2"
              v-if="errors.ziperror && success == '' && ajaxerr"
            >
              Sorry we do not offer service in your area. However, if you have
              multiple TV's or this is a large scale project. Contact us below
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
          <div class="flex gap-4 justify-center">
            <button
              @click="setZipCode('home')"
              type="button"
              class="text-sm md:text-base px-7 sm:px-10 disabled:opacity-60 disabled:cursor-not-allowed py-3 rounded-lg bg-brand-color hover:bg-brand-color-hover text-white inline-block"
            >
              Browse
            </button>
            <div class="flex gap-5 items-center">
              <button
                v-if="errors.ziperror && success == '' && ajaxerr"
                @click="setZipCode('contact')"
                type="button"
                class="text-sm md:text-base px-7 sm:px-10 disabled:opacity-60 disabled:cursor-not-allowed py-3 rounded-lg bg-brand-color hover:bg-brand-color-hover text-white inline-block"
              >
                Contact Us
              </button>
              <button
                v-else
                @click="setZipCode('service')"
                :disabled="success === ''"
                type="button"
                class="text-sm md:text-base px-7 sm:px-10 disabled:opacity-60 disabled:cursor-not-allowed py-3 rounded-lg bg-brand-color hover:bg-brand-color-hover text-white inline-block"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "CheckZip",
  computed: {
    zipcode: {
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
  methods: {
    setZipCode(value) {
      this.$emit("setZipCode", value, this.zipcode, this.success);
    },
  },
  watch: {
    zipcode: function (val, oldVal) {
      if (val != "") {
        this.$store.dispatch("cart/CheckZipcode");
      }
    },
  },
};
</script>
<style>
</style>
  