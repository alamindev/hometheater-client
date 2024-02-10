<template>
  <div class="h-full">
    <div class="flex justify-between py-4 px-4 sm:px-10 border-b">
      <p class="text-base uppercase">ITEMS {{ count }}</p>
      <p class="text-base">${{ total }}</p>
    </div>
    <div class="sm:px-10 pb-5 pt-2">
      <table class="w-full">
        <tbody>
          <tr v-for="(cart, index) in carts" :key="index">
            <td class="w-5 sm:w-12 py-4">{{ index + 1 }}.</td>
            <td class="sm:w-64 md:w-auto">
              <h2 class="text-sm sm:text-base font-bold">{{ cart.title }}</h2>
            </td>
            <td class="w-10 sm:w-24 py-4 text-sm sm:text-base">
              X {{ cart.item }}
            </td>
            <td class="w-10 sm:w-32 text-right py-4 text-sm sm:text-base">
              ${{ cart.price }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pt-2 sm:pt-5">
        <h2
          class="font-semibold text-right py-4 md:py-8 border px-5 rounded-md"
        >
          SubTotal: ${{ total }}
        </h2>
      </div>
    </div>
    <div class="bg-light-blue-cart px-4 sm:px-10">
      <div class="pt-5">
        <label
          for="payment"
          class="pb-2 inline-block upercase text-base font-bold"
          >Payment Option</label
        >
        <select
          class="border w-full text-gray-500 bg-white border-gray-200"
          name="payment"
          id="payment"
          v-model="payment_option"
        >
          <option value="local">Local - Service Location</option>
          <!-- <option value="online">Credit Card</option> -->
        </select>
      </div>
      <div class="md:pt-10 md:pb-8 py-4">
        <label
          for="promo"
          class="pb-2 inline-block upercase text-base font-bold rounded-sm"
          >PROMO CODE</label
        >
        <div class="flex justify-between flex-col sm:flex-row">
          <div class="">
            <input
              class="border w-full text-gray-500 bg-white border-gray-200 rounded-sm disabled:bg-gray-200"
              name="promo"
              id="promo"
              type="text"
              v-model="promoCode"
              placeholder="Enter code here"
              :disabled="isDisabledInput"
            />
            <div class="text-red-500 text-xs" v-if="errors.message">
              {{ errors.message }}
            </div>
          </div>
          <button
            type="button"
            @click="applyPromo"
            :disabled="isDisabled"
            class="bg-red-400 hover:bg-red-500 disabled:opacity-75 text-white text-base px-12 py-2 rounded-md mt-3 sm:mt-0"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["isCheckout", "step"],
  name: "OrderSummery",
  data() {
    return {
      item: 1,
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    ...mapGetters({
      count: "cart/cartDataCount",
      total: "cart/getTotal",
      promoCode: "cart/getPromoCode",
    }),
    promoCode: {
      get() {
        return this.$store.state.cart.promocode;
      },
      set(value) {
        this.$store.commit("cart/UPDATE_PROMOCODE", value);
      },
    },
    payment_option: {
      get() {
        return this.$store.state.cart.payment;
      },
      set(value) {
        this.$store.commit("cart/UPDATE_PAYMENT", value);
      },
    },
    carts() {
      return this.$store.state.cart.carts;
    },
    subTotal() {
      return this.$store.state.cart.sub_total;
    },
    isDisabled() {
      if (this.promoCode != "") return false;
      return true;
    },
    isDisabledInput() {
      if (this.carts.length > 0) return false;
      return true;
    },
    payment() {
      return this.$store.state.cart.payment;
    },
  },
  methods: {
    async applyPromo() {
      if (!this.authenticated) {
        this.$router.push("login?redirect=cart");
      }
      this.$store.dispatch("cart/applyPromo");
    },
  },
};
</script>

<style>
</style>
