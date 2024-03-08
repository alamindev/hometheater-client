<template>
  <div
    class="fixed min-h-screen backdrop-blur-sm z-[999] px-6 pt-12 pb-10 flex justify-center items-start lg:items-center inset-0 bg-dark/80 w-full h-full"
  >
    <div class="max-w-full w-[650px] mx-auto">
      <div class="bg-white p-5 sm:p-12 rounded-lg relative">
        <div class="absolute top-5 right-4 z-20">
          <div
            @click="hidemodal"
            class="cursor-pointer w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center"
          >
            <i class="fas fa-times"></i>
          </div>
        </div>
        <form id="payment-form" @submit.prevent="handleSubmit">
          <div id="payment-element"></div>
          <div class="flex justify-center pt-6">
            <button
              id="submit"
              class="rounded-full px-8 py-2.5 bg-brand-color hover:bg-brand-color-hover text-white"
            >
              <span v-if="!finish_loading" class="uppercase">
                Confirm Payment</span
              >
              <Loader v-if="finish_loading" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

 
<script>
import Loader from "@/components/Loader/Loading-white";
export default {
  name: "PaymentForm",
  components: {
    Loader,
  },
  data() {
    return {
      elements: null,
      stripe: null,
    };
  },
  methods: {
    hidemodal() {
      this.$emit("hideModal");
    },
    async handleSubmit() {
      this.$store.commit("cart/FINISH_STEP_LOADING", true);

      let elements = this.elements;
      await this.stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/confirmation`,
        },
        // redirect: "if_required",
      });
      // if (paymentIntent.status === "succeeded") {
      //   this.$emit("finishedCheckout");
      // }
    },
  },
  computed: {
    finish_loading() {
      return this.$store.state.cart.finish_loading;
    },
    stripe_key() {
      return this.$store.state.cart.stripe_key;
    },
  },
  mounted() {
    this.stripe = Stripe(this.stripe_key.publisher);
    const clientSecret = `${this.stripe_key.secret}`;
    const appearance = {};
    const options = {
      layout: {
        type: "tabs",
        defaultCollapsed: false,
      },
      billingDetails: "never",
    };
    this.elements = this.stripe.elements({ clientSecret, appearance });
    const paymentElement = this.elements.create("payment", options);
    paymentElement.mount("#payment-element");
  },
};
</script> 