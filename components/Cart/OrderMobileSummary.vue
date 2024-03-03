<template>
  <div class="h-full">
    <div class="sm:px-10 pt-2 px-2">
      <table class="w-full">
        <tbody>
          <tr v-for="(cart, index) in carts" :key="index">
            <td class="w-5 sm:w-12 py-2">{{ index + 1 }}.</td>
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
    </div>
    <div class="flex justify-between pt-2 mb-4 pb-2 px-2 sm:px-10 border-t">
      <p class="text-base uppercase">ITEMS {{ count }}</p>
      <p class="text-base">${{ total }}</p>
    </div>
    <div class="bg-light-blue-cart px-3 sm:px-10">
      <div class="md:pt-10 md:pb-8 py-4">
        <label
          for="promo"
          class="pb-2 inline-block upercase text-sm sm:text-base font-semibold !text-dark rounded-sm"
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
    <div class="w-full -mb-10">
      <div class="pt-2">
        <div class="flex justify-end gap-4 pb-2 sm:pb-3 px-2">
          <h2 class="uppercase text-gray-500 text-sm sm:text-base font-medium">
            <span v-if="subTotal != ''">Sub Total:</span>
            <span v-else>Total:</span>
          </h2>
          <p class="text-gray-700 font-bold">${{ total }}</p>
        </div>

        <div class="flex justify-end gap-4 pb-2 px-2" v-if="feature_price">
          <h2 class="uppercase text-gray-500 text-base font-medium">
            ADDON EXTRAS
          </h2>
          <p class="text-gray-700 font-bold">+ ${{ feature_price }}</p>
        </div>
        <div class="" v-if="is_promo">
          <div class="flex justify-end gap-4 pb-2 px-2">
            <h2 class="uppercase text-gray-500 text-base font-medium">
              {{ percent }}% Discount
            </h2>
            <p class="text-gray-700 font-bold">- ${{ percentVal }}</p>
          </div>
        </div>
      </div>
      <div class="w-full pb-6 px-2" v-if="subTotal != ''">
        <hr />
        <div class="flex justify-end gap-4 pt-1">
          <h2 class="uppercase text-gray-500 text-base font-medium">Total:</h2>
          <p class="text-gray-700 font-bold">${{ subTotal }}</p>
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
    carts() {
      return this.$store.state.cart.carts;
    },
    feature_price() {
      return this.$store.state.cart.feature_price;
    },
    is_promo() {
      return this.$store.state.cart.is_promo;
    },
    percent() {
      return this.$store.state.cart.percent;
    },
    percentVal() {
      return this.$store.state.cart.percent_val;
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
