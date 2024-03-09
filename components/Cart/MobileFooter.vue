<template>
  <div class="h-full py-2">
    <div class="w-full pt-8">
      <button
        type="button"
        class="disabled:opacity-50 py-3 px-5 text-center text-base md:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
        :disabled="isCheckout == true"
        @click="onClickNext"
        v-if="step === 1 && currentTab == 'shopping-cart'"
      >
        <p class="uppercase text-center w-full">NEXT - GO TO SUMMARY</p>
      </button>
      <button
        type="button"
        class="disabled:opacity-50 py-3 px-5 text-center text-base md:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
        :disabled="isCheckout == true"
        @click="onClickNext"
        v-if="step === 1 && currentTab == 'order-summary'"
      >
        <p class="uppercase text-center w-full">NEXT</p>
      </button>
      <div v-if="Object.keys(this.cartdata.services).length !== 0">
        <button
          type="button"
          class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
          :disabled="is_next == false"
          @click="onClickNext"
          v-if="step === 2"
        >
          <p class="uppercase"></p>
          <p class="uppercase">Next</p>
          <i class="fas fa-arrow-right"></i>
        </button>
        <div class="" v-if="step === 3">
          <div class="" v-if="question_main.length > 0">
            <button
              v-if="activeStep + 1 < question_main.length"
              @click="nextQuestion"
              type="button"
              :disabled="isQuestionCheck(activeStep)"
              class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
            >
              <p class="uppercase"></p>
              <p class="uppercase">Next</p>
              <i class="fas fa-arrow-right"></i>
            </button>
            <button
              v-if="activeStep + 1 === question_main.length"
              type="button"
              class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
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
            class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
            @click="onClickNext"
          >
            <p class="uppercase"></p>
            <p class="uppercase">Next</p>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
        <button
          type="button"
          class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
          @click="onClickNext"
          v-if="step === 4"
        >
          <p class="uppercase"></p>
          <p class="uppercase">Next</p>
          <i class="fas fa-arrow-right"></i>
        </button>
        <button
          type="button"
          class="disabled:opacity-50 py-3 px-5 text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-between w-full rounded-md"
          @click="onClickNext"
          :disabled="is_finished == false"
          v-if="step === 5"
        >
          <p class="uppercase"></p>
          <p class="uppercase">Next</p>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader/Loading-white";
import { mapGetters } from "vuex";
export default {
  props: ["isCheckout", "step", "currentTab"],
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
      total: "cart/getTotal",
    }),
    is_finished() {
      return this.$store.state.cart.is_finished;
    },
    cartdata() {
      return this.$store.state.cart.cartobj;
    },
    is_next() {
      return this.$store.state.cart.is_next;
    },
    is_auth() {
      return this.$store.state.cart.is_auth;
    },

    isDisabled() {
      if (this.promoCode != "") return false;
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
    checkQuetions() {
      return this.$store.state.cart.checkQuetions;
    },

    loading_stripe() {
      return this.$store.state.cart.loading_stripe;
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
    onClickNext() {
      if (this.currentTab == "order-summary") {
        this.$emit("next");
      } else {
        this.$emit("next");
      }
    },
  },
};
</script>

<style>
</style>
