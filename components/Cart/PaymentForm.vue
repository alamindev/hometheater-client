<template>
  <div>
    <modal
      name="dialog"
      class="modal--showimg"
      :clickToClose="false"
      :scrollable="true"
      :adaptive="true"
      height="auto"
      width="600"
    >
      <div class="bg-white p-4 relative rounded-md">
        <div class="absolute right-3 z-20">
          <div
            @click="hidemodal"
            class="cursor-pointer w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center"
          >
            <i class="fas fa-times"></i>
          </div>
        </div>

        <div class="py-3" v-show="!loading">
          <h2
            class="pb-4 text-sm sm:text-lg text-center text-brand-color font-bold font-rubik"
          >
            Please enter your card info.
          </h2>
          <div class="flex justify-center pb-5">
            <figure class="">
              <img
                class="h-[60px]"
                src="/images/credit-card-icons.png"
                alt="credit-card-icons.png"
              />
            </figure>
          </div>
          <form
            @submit.prevent="submitPayment"
            action-xhr="https://hometheaterproz.com/"
            method="post"
          >
            <div class="space-y-2 pb-6">
              <div
                v-if="errorMessage"
                class="px-4 py-2.5 rounded-md w-full border-red-300 border text-red-400 bg-red-100"
              >
                <p class="text-center">{{ errorMessage }}</p>
              </div>
              <div>
                <label for="card-number" class="text-gray-500 text-sm"
                  >Card Number</label
                >
                <div
                  id="card-number"
                  class="border px-3 py-3 rounded-md text-xl"
                  ref="cardNumber"
                ></div>
              </div>
              <div>
                <label for="card-expiry" class="text-gray-500 text-sm"
                  >Expiry</label
                >
                <div
                  id="card-expiry"
                  class="border px-3 py-3 rounded-md"
                  ref="cardExpiry"
                ></div>
              </div>
              <div>
                <label for="card-cvc" class="text-gray-500 text-sm">CVC</label>
                <div
                  id="card-cvc"
                  class="border px-3 py-3 rounded-md"
                  ref="cardCvc"
                ></div>
              </div>
            </div>

            <div class="flex justify-center pt-3">
              <button
                :disabled="finish_loading"
                type="submit"
                class="px-6 py-3 rounded-md bg-brand-color text-white text-base disabled:bg-opacity-70 hover:bg-brand-color-hover"
              >
                <span v-if="!finish_loading" class="uppercase">
                  Confirm Payment</span
                >
                <Loader v-if="finish_loading" />
              </button>
            </div>
          </form>
        </div>
        <div v-show="loading" class="loader-parent mt-16 mb-20">
          <div class="loader"></div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Loader from "@/components/Loader/Loading-white";
export default {
  name: "PaymentForm",
  props: ["paymentModal"],
  data() {
    return {
      token: null,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      errorMessage: "",
      loading: false,
    };
  },
  components: {
    Loader,
  },
  beforeDestroy() {
    if (this.cardNumber) {
      this.cardNumber.destroy();
      this.cardExpiry.destroy();
      this.cardCvc.destroy();
    }
  },
  watch: {
    paymentModal: function (val, old) {
      if (val === true) {
        this.$modal.show("dialog");
        this.loading = true;
        setTimeout(() => {
          this.stripe = Stripe(
            "pk_test_51OmIKGASvVieBJpKtWjKXYLvKlEOFQhOWMMGCjDEb6dMVLImvPLzqbvEyWBhSdR905TWzn4SLhdWllxcglzz9dFt00l0r8f7cF"
          );
          const elements = this.stripe.elements();
          this.cardNumber = elements.create("cardNumber", {
            showIcon: true,
          });
          this.cardExpiry = elements.create("cardExpiry");
          this.cardCvc = elements.create("cardCvc");

          // Ensure that $refs.cardElement exists before mounting
          if (this.$refs.cardNumber) {
            this.cardNumber.mount(this.$refs.cardNumber);
            this.cardExpiry.mount(this.$refs.cardExpiry);
            this.cardCvc.mount(this.$refs.cardCvc);
          }
          this.loading = false;
        }, 1000);
      } else {
        this.$modal.hide("dialog");
      }
    },
  },
  methods: {
    hidemodal() {
      this.$modal.hide("dialog");
      this.$emit("hideModal");
    },
    async submitPayment() {
      this.errorMessage = "";
      const { token, error } = await this.stripe.createToken(this.cardNumber);

      if (error) {
        this.errorMessage = error?.message;
        return;
      }
      if (token) {
        this.$store.commit("cart/FINISH_STEP_LOADING", true);
        this.$emit("finishedCheckout", token.id);
      }
    },
  },
  computed: {
    finish_loading() {
      return this.$store.state.cart.finish_loading;
    },
  },
};
</script> 

 