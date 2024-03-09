<template>
  <div class="md:pl-6 lg:px-6 xl:px-20 py-10 space-y-8">
    <div class="space-y-6">
      <div v-if="is_logged_in">
        <div class="cursor-pointer">
          <input
            type="radio"
            name="delivery"
            value="current"
            v-model="delivery"
            id="current_address"
          />
          <label for="current_address" class="font-semibold pl-1"
            >Current Address
          </label>
        </div>
        <div class="border p-4 mt-3" v-if="delivery === 'current'">
          <strong> {{ address }}</strong>
        </div>
      </div>
      <div>
        <div class="cursor-pointer">
          <input
            type="radio"
            name="delivery"
            value="address_new"
            v-model="delivery"
            id="address_new"
          />
          <label for="address_new" class="font-semibold pl-1"
            >Add new Address</label
          >
        </div>
        <div v-if="delivery === 'address_new'">
          <Address />
        </div>
      </div>
    </div>
    <div v-if="is_payment">
      <form v-show="!is_load" id="payment-form" @submit.prevent="handleSubmit">
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
      <div
        v-show="is_load"
        class="loader-parent h-full flex justify-center items-center"
      >
        <div class="loader"></div>
      </div>
    </div>
    <div v-else class="h-full flex justify-center items-center">
      <div class="space-y-4">
        <p class="text-gray-400 font-medium">
          Payment will received at appointment!
        </p>
        <button
          type="button"
          :disabled="finish_loading"
          class="disabled:opacity-50 py-3 px-5 w-[250px] mx-auto text-base sm:text-xl text-white bg-brand-color hover:bg-brand-color-hover flex items-center justify-center rounded-md"
          @click="SubmitLocalPayment"
        >
          <span v-if="!finish_loading" class="uppercase"> Confirm Order </span>
          <Loader v-if="finish_loading" />
        </button>
      </div>
    </div>
  </div>
</template>

 
<script>
import Loader from "@/components/Loader/Loading-white";
import Address from "./Address.vue";
export default {
  name: "PaymentForm",
  props: ["is_payment"],
  components: {
    Loader,
    Address,
  },
  data() {
    return {
      elements: null,
      stripe: null,
      is_load: false,
      delivery: "current",
    };
  },
  methods: {
    hidemodal() {
      this.$emit("hideModal");
    },
    SubmitLocalPayment() {
      this.$store.commit("cart/FINISH_STEP_LOADING", true);
      this.$emit("SubmitLocalPayment");
    },
    async handleSubmit() {
      this.$store.commit("cart/FINISH_STEP_LOADING", true);
      const data = await this.$store.dispatch("cart/AddDataLocalStorage");
      if (data === true) {
        if (localStorage.getItem("confirm_data")) {
          let data = await JSON.parse(localStorage.getItem("confirm_data"));
          let address = {
            city: data.address.city
              ? data.address.city
              : this.$store.state.auth.user.city,
            line: data.address.address
              ? data.address.address
              : this.$store.state.auth.user.address,
            state: data.address.state
              ? data.address.state
              : this.$store.state.auth.user.state,
            zipcode: data.address.zipcode
              ? data.address.zipcode
              : this.$store.state.auth.user.zipcode,
            phone: this.$store.state.auth.user.phone,
            name:
              this.$store.state.auth.user.first_name +
              " " +
              this.$store.state.auth.user.last_name,
          };
          let elements = this.elements;
          const { error } = await this.stripe.confirmPayment({
            elements,
            confirmParams: {
              return_url: `${window.location.origin}/confirmation`,
              shipping: {
                name: address.name,
                phone: address.phone,
                address: {
                  city: address.city,
                  line1: address.line,
                  postal_code: address.zipcode,
                  state: address.state,
                },
              },
            },
          });
          if (error) {
            this.$store.commit("cart/FINISH_STEP_LOADING", false);
          }
        }
      }
    },
  },
  computed: {
    finish_loading() {
      return this.$store.state.cart.finish_loading;
    },
    stripe_key() {
      return this.$store.state.cart.stripe_key;
    },
    is_logged_in() {
      return this.$store.state.auth.loggedIn;
    },
    address() {
      if (this.is_logged_in) {
        let address = `${this.$store.state.auth.user.address}, ${this.$store.state.auth.user.city}, ${this.$store.state.auth.user.state}, ${this.$store.state.auth.user.zipcode}`;
        return address;
      }
      return null;
    },
  },
  async mounted() {
    this.is_load = true;
    await this.$store.dispatch("cart/GetStripeKey");
    if (this.stripe_key.secret) {
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
      this.is_load = false;
    }
  },
};
</script> 