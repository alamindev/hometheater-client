<template>
  <div class="w-full relative custom-height">
    <div
      class="w-full transition duration-500"
      :class="loading ? 'is__loading' : ''"
    >
      <div class="w-full" id="sq-ccbox ">
        <!--
      You should replace the action attribute of the form with the path of
      the URL you want to POST the nonce to (for example, "/process-card")
    -->
        <ul
          class="error w-full mb-3 list-disc list-inside"
          v-if="error.length > 0"
        >
          <li v-for="e in error" :key="e.message" class="text-red-600">
            {{ e }}
          </li>
        </ul>
        <form id="nonce-form" novalidate>
          <div id="card-tainer">
            <div class="cardfields card-number mb-3" id="sq-card-number"></div>
            <div class="grid grid-cols-3 gap-3">
              <div
                class="cardfields expiration-date w-full"
                id="sq-expiration-date"
              ></div>
              <div class="cardfields cvv w-full" id="sq-cvv"></div>
              <div class="cardfields postal-code" id="sq-postal-code"></div>
            </div>
          </div>

          <input type="hidden" id="card-nonce" name="nonce" />
          <div id="sq-walletbox">
            <div v-show="!applePay" class="wallet-not-enabled">
              Apple Pay for Web not enabled
            </div>
            <!-- Placeholder for Apple Pay for Web button -->
            <button
              v-show="applePay"
              id="sq-apple-pay'"
              class="button-apple-pay"
            ></button>

            <!-- <div v-show="!masterpass" class="wallet-not-enabled">
            Masterpass not enabled
          </div> -->
            <!-- Placeholder for Masterpass button -->
            <!-- <button
            v-show="masterpass"
            id="sq-masterpass'"
            class="button-masterpass"
          ></button> -->
          </div>
        </form>
      </div>
      <button
        @click="requestCardNonce($event)"
        class="
          productPurchase
          button-credit-card
          flex
          justify-center
          w-full
          items-center
        "
      >
        <span v-if="!finish_loading" class="uppercase"> Pay</span>
        <Loader v-if="finish_loading" />
      </button>
    </div>
    <div v-show="loading" class="loader-parent mt-16 top-0">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader/Loading-white";
export default {
  name: "paymentForm",
  data: function () {
    return {
      error: [],
      masterpass: false,
      applePay: false,
      paymentForm: null,
      loading: false,
      nonce: null,
      location_id: "FB06VFK9D72CK",
    };
  },
  components: {
    Loader,
  },
  computed: {
    finish_loading() {
      return this.$store.state.cart.finish_loading;
    },
  },
  mounted: function () {
    this.loading = true;
    let locationId = this.location_id;
    let applicationId = "sq0idp-2bgMKU7Djr9w_zeNnZiCHA";
    let that = this;
    this.paymentForm = new SqPaymentForm({
      autoBuild: false,
      applicationId: applicationId,
      locationId: locationId,
      inputClass: "sq-input",
      // Initialize the payment form elements
      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [
        {
          fontSize: "16px",
          lineHeight: "24px",
          padding: "16px",
          placeholderColor: "#a0a0a0",
          backgroundColor: "transparent",
        },
      ],
      // Initialize Apple Pay placeholder ID
      applePay: {
        elementId: "sq-apple-pay",
      },
      // Initialize Masterpass placeholder ID
      // masterpass: {
      //   elementId: "sq-masterpass",
      // },
      // Initialize the credit card placeholders
      cardNumber: {
        elementId: "sq-card-number",
        placeholder: "Card number",
      },
      cvv: {
        elementId: "sq-cvv",
        placeholder: "CVV",
      },
      expirationDate: {
        elementId: "sq-expiration-date",
        placeholder: "MM / YY",
      },
      postalCode: {
        elementId: "sq-postal-code",
        placeholder: "Zip Code",
      },
      // SqPaymentForm callback functions
      callbacks: {
        /*
         * callback function: methodsSupported
         * Triggered when: the page is loaded.
         */
        methodsSupported: function (methods) {
          // Only show the button if Apple Pay for Web is enabled
          // Otherwise, display the wallet not enabled message.
          that.applePay = methods.applePay;
          that.masterpass = methods.masterpass;
        },
        /*
         * Digital Wallet related functions
         */
        createPaymentRequest: function () {
          var paymentRequestJson;
          /* ADD CODE TO SET/CREATE paymentRequestJson */
          return paymentRequestJson;
        },
        validateShippingContact: function (contact) {
          var validationErrorObj;
          /* ADD CODE TO SET validationErrorObj IF ERRORS ARE FOUND */
          return validationErrorObj;
        },
        /*
         * callback function: cardNonceResponseReceived
         * Triggered when: SqPaymentForm completes a card nonce request
         */
        cardNonceResponseReceived: function (errors, nonce, cardData) {
          if (errors) {
            that.error = [];
            errors.forEach(function (error) {
              that.error.push(error.message);
            });
            return;
          }
          // Assign the nonce value to the hidden form field
          // document.getElementById("card-nonce").value = nonce;
          // POST the nonce form to the payment processing page
          // document.getElementById("nonce-form").submit();
          that.$emit("processPayment", {
            nonce,
            location_id: that.location_id,
          });
        },
        /*
         * callback function: paymentFormLoaded
         * Triggered when: SqPaymentForm is fully loaded
         */
        paymentFormLoaded: function () {
          that.loading = false;
        },
      },
    });
    this.paymentForm.build();
  },
  methods: {
    requestCardNonce: function (event) {
      event.preventDefault();
      this.paymentForm.requestCardNonce();
      this.error = [];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.sq-input--error {
  outline: 3px auto rgb(255, 97, 97);
}
.errorbox {
  line-height: 14px;
  text-align: left;
}
.error {
  border: 1px solid #e02f2f;
  border-radius: 6px;
  background-color: white;
  font-size: "16px";
  padding: 10px;
}
.sq-input {
  height: 56px;
  box-sizing: border-box;
  border: 1px solid #e0e2e3;
  background-color: white;
  border-radius: 6px;
  display: inline-block;
  -webkit-transition: border-color 0.2s ease-in-out;
  -moz-transition: border-color 0.2s ease-in-out;
  -ms-transition: border-color 0.2s ease-in-out;
  transition: border-color 0.2s ease-in-out;
}
.button-credit-card {
  width: 100%;
  height: 56px;
  margin-top: 10px;
  background: #4a90e2;
  border-radius: 6px;
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  letter-spacing: 0;
  text-align: center;
  -webkit-transition: background 0.2s ease-in-out;
  -moz-transition: background 0.2s ease-in-out;
  -ms-transition: background 0.2s ease-in-out;
  transition: background 0.2s ease-in-out;
}

.button-credit-card:hover {
  background-color: #4281cb;
}

.wallet-not-enabled {
  min-width: 100%;
  padding: 0;
  margin: 10px 0px;
  line-height: 40px;
  background: #eee;
  border-radius: 5px;
  font-weight: lighter;
  font-style: italic;
  font-family: inherit;
  display: block;
}
/* Customize the Apple Pay on the Web button */
.button-apple-pay {
  min-width: 100%;
  padding: 0;
  margin: 10px 0px;
  background-image: -webkit-named-image(apple-pay-logo-white);
  background-color: black;
  background-size: 100% 60%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 5px;
  cursor: pointer;
  display: none;
}
/* Customize the Masterpass button */
.button-masterpass {
  min-width: 200px;
  min-height: 40px;
  max-height: 40px;
  padding: 0;
  margin: 10px;
  background-image: url(https://static.masterpass.com/dyn/img/btn/global/mp_chk_btn_147x034px.svg);
  background-color: black;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 5px;
  border-color: rgb(255, 255, 255);
  cursor: pointer;
}
#sq-walletbox {
  text-align: center;
  vertical-align: top;
  font-weight: bold;
}
#sq-ccbox {
  margin: 5px;
  padding: 0px 10px;
  text-align: center;
  vertical-align: top;
  font-weight: bold;
}
.is__loading {
  opacity: 0;
  visibility: hidden;
}
</style>
<style scoped>
.loader-parent {
  position: absolute !important;
}
.custom-height {
  min-height: 200px;
}
</style>
