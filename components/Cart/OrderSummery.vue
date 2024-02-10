<template>
  <div class="bg-light-blue-cart h-full px-5 py-12">
    <h2
      class="font-medium custom--text-order-title text-gray-700 border-b pb-4 text-center"
    >
      Order Summary
    </h2>
    <div class="flex justify-between py-4">
      <p class="text-base uppercase" v-if="count === 1">ITEM {{ count }}</p>
      <p class="text-base uppercase" v-else>ITEMS {{ count }}</p>
      <p class="text-base">${{ total }}</p>
    </div>
    <div class="pt-5">
      <label
        for="payment"
        class="pb-2 inline-block upercase text-base font-medium !text-dark"
        >Payment Option</label
      >
      <select
        class="border w-full text-gray-500 bg-white border-gray-200"
        name="payment"
        id="payment"
        v-model="payment_option"
      >
        <option value="local">Local- service location</option>
        <!-- <option value="online">Credit Card</option> -->
      </select>
    </div>
    <div class="pt-5 pb-8">
      <label
        for="promocode"
        class="pb-2 inline-block upercase text-base font-medium rounded-sm !text-dark"
        >PROMO CODE</label
      >
      <input
        class="border w-full text-gray-500 bg-white border-gray-200 rounded-sm disabled:bg-gray-200"
        name="promocode"
        id="promocode"
        type="text"
        v-model="promoCode"
        placeholder="Enter code here"
        :disabled="isDisabledInput"
      />
      <div class="text-red-500 text-xs" v-if="errors.message">
        {{ errors.message }}
      </div>
      <button
        type="button"
        @click="applyPromo"
        :disabled="isDisabled"
        class="bg-red-400 hover:bg-red-500 disabled:opacity-75 text-white text-base px-6 py-3 mt-3 rounded-md"
      >
        Apply
      </button>
    </div>
    <div class="py-10 border-t">
      <div class="w-full">
        <div class="flex justify-between pb-5">
          <h2 class="uppercase text-gray-500 text-base font-medium">
            sub total
          </h2>
          <p class="text-gray-500 font-medium">${{ total }}</p>
        </div>
        <div class="" v-if="is_promo">
          <div class="flex justify-between pb-2">
            <h2 class="uppercase text-gray-500 text-base font-medium">
              {{ percent }}% Discount
            </h2>
            <p class="text-gray-500 font-medium">- ${{ percentVal }}</p>
          </div>
        </div>
        <div class="flex justify-between pb-2" v-if="feature_price">
          <h2 class="uppercase text-gray-500 text-base font-medium">
            ADDON EXTRAS
          </h2>
          <p class="text-gray-500 font-medium">+ ${{ feature_price }}</p>
        </div>
      </div>
      <div class="" v-if="subTotal != ''">
        <hr />
        <div class="flex justify-between pb-6 pt-1">
          <h2 class="uppercase text-gray-500 text-base font-medium">
            Total Cost
          </h2>
          <p class="text-gray-500 font-medium">${{ subTotal }}</p>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
      :disabled="isCheckout == true"
      @click="onClickNext"
      v-if="step === 1"
    >
      <i class="fas fa-luggage-cart"></i>
      <p class="uppercase">CHECKOUT</p>
      <i class="fas fa-arrow-right"></i>
    </button>
    <button
      type="button"
      class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
      :disabled="is_next == false"
      @click="onClickNext"
      v-if="step === 2"
    >
      <p class="uppercase"></p>
      <p class="uppercase">Next</p>
      <i class="fas fa-arrow-right"></i>
    </button>

    <div class="" v-if="step === 3">
      <div v-if="is_auth">
        <div class="" v-if="question_main.length > 0">
          <button
            v-if="activeStep + 1 < question_main.length"
            @click="nextQuestion"
            type="button"
            :disabled="isQuestionCheck(activeStep)"
            class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
          >
            <p class="uppercase"></p>
            <p class="uppercase">Next</p>
            <i class="fas fa-arrow-right"></i>
          </button>
          <button
            v-if="activeStep + 1 === question_main.length"
            type="button"
            class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
            @click="onClickNext"
            :disabled="isQuestionCheck(activeStep)"
          >
            <p class="uppercase"></p>
            <p class="uppercase">Next</p>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
        <button
          v-else
          type="button"
          class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
          @click="onClickNext"
        >
          <p class="uppercase"></p>
          <p class="uppercase">Next</p>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <button
        v-else
        type="button"
        :disabled="!is_auth"
        class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
      >
        <p class="uppercase"></p>
        <p class="uppercase">Next</p>
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>

    <button
      type="button"
      class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
      @click="onClickNext"
      v-if="step === 4"
    >
      <p class="uppercase"></p>
      <p class="uppercase">Next</p>
      <i class="fas fa-arrow-right"></i>
    </button>
    <button
      type="button"
      class="disabled:opacity-50 py-3 px-5 text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-center w-full rounded-md"
      @click="finishToCheckout"
      :disabled="is_finished == false"
      v-if="step === 5"
    >
      <span v-if="payment !== 'online' || payment !== 'crypto'">
        <span v-if="!finish_loading" class="uppercase"> Finish</span>
        <Loader v-if="finish_loading" />
      </span>
      <span v-else class="uppercase"> Finish</span>
    </button>
  </div>
</template>

<script>
import Loader from "@/components/Loader/Loading-white";
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
  components: {
    Loader,
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
    percent() {
      return this.$store.state.cart.percent;
    },
    percentVal() {
      return this.$store.state.cart.percent_val;
    },
    subTotal() {
      return this.$store.state.cart.sub_total;
    },
    is_promo() {
      return this.$store.state.cart.is_promo;
    },
    is_next() {
      return this.$store.state.cart.is_next;
    },
    is_fields() {
      return this.$store.state.cart.is_fields;
    },
    is_finished() {
      return this.$store.state.cart.is_finished;
    },
    is_auth() {
      return this.$store.state.cart.is_auth;
    },
    feature_price() {
      return this.$store.state.cart.feature_price;
    },
    isDisabled() {
      if (this.promoCode != "") return false;
      return true;
    },
    isDisabledInput() {
      if (this.carts.length > 0) return false;
      return true;
    },
    datetime() {
      return this.$store.state.cart.datetime;
    },
    payment() {
      return this.$store.state.cart.payment;
    },
    question_main() {
      return this.$store.state.cart.questions;
    },
    activeStep() {
      return this.$store.state.cart.activeStep;
    },
    finish_loading() {
      return this.$store.state.cart.finish_loading;
    },
    checkQuetions() {
      return this.$store.state.cart.checkQuetions;
    },
    isQuestionCheck() {
      return (activeStep) => {
        let queArr = [...this.checkQuetions];
        let quemainArr = [...this.question_main];
        let arr = queArr[activeStep];
        let arrmain = quemainArr[activeStep];
        if (arrmain.questions.length > arr.question.length) {
          return true;
        } else {
          return false;
        }
      };
    },
  },
  methods: {
    nextQuestion() {
      this.$store.commit("cart/UPDATE_STEP_NEXT");
    },
    async applyPromo() {
      if (!this.authenticated) {
        this.$router.push("login?redirect=cart");
      }
      this.$store.dispatch("cart/applyPromo");
    },
    onClickNext() {
      this.$emit("next");
    },
    finishToCheckout() {
      if (this.datetime.length !== 0) {
        if (this.payment == "online") {
          this.$emit("Checkout");
        } else if (this.payment == "crypto") {
          this.$emit("cryptoCheckout");
        } else {
          this.$emit("finishedCheckout");
        }
      } else {
        this.$emit("calendarErr");
        this.$swal({
          icon: "error",
          title: `Please choose date and time`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
      }
    },
  },
};
</script>

<style scoped>
.custom--text-order-title {
  font-size: 1.7rem;
  font-weight: 700;
}
</style>
