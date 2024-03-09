<template>
  <div class="pt-4">
    <form action="">
      <div class="w-full pb-2">
        <input
          type="text"
          placeholder="Address"
          name="address"
          v-model="address"
          @focus="autoCompleteLocation($event)"
          onfocus="autocomplete"
          class="px-4 py-2 border border-gray-300 rounded w-full appearance-none"
        />
      </div>

      <div class="w-full pb-2">
        <input
          type="text"
          placeholder="City"
          name="city"
          v-model="city"
          class="px-4 py-2 border border-gray-300 rounded w-full appearance-none"
        />
      </div>
      <div class="w-full pb-2">
        <input
          type="text"
          placeholder="State"
          name="state"
          v-model="state"
          class="px-4 py-2 border border-gray-300 rounded w-full appearance-none"
        />
      </div>
      <div class="w-full pb-2">
        <input
          type="number"
          placeholder="Zipcode"
          name="zipcode"
          v-model="zipcode"
          class="px-4 py-2 border border-gray-300 rounded w-full appearance-none"
        />
      </div>
    </form>
  </div>
</template>
<script>
import googleMapApi from "@/mixins/googleMapApi";
export default {
  mixins: [googleMapApi],
  computed: {
    address: {
      get() {
        return this.$store.state.cart.address.address;
      },
      set(value) {
        this.$store.commit("cart/UPDATE_ADDRESS", value);
      },
    },
    city: {
      get() {
        return this.$store.state.cart.address.city;
      },
      set(value) {
        this.$store.commit("cart/UPDATE_CITY", value);
      },
    },
    state: {
      get() {
        return this.$store.state.cart.address.state;
      },
      set(value) {
        this.$store.commit("cart/UPDATE_STATE", value);
      },
    },
    zipcode: {
      get() {
        return this.$store.state.cart.address.zipcode;
      },
      set(value) {
        this.$store.commit("cart/UPDATE_ADDRESS_ZIPCODE", value);
      },
    },
    is_logged_in() {
      return this.$store.state.auth.loggedIn;
    },
  },
  async mounted() {
    await this.injectGoogleMapsApiIfNotInjectedAlready();
  },
};
</script>
 