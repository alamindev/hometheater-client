<template>
  <div class="relative">
    <div class="hidden lg:flex justify-between items-center border-b pb-2">
      <h1 class="custom--text-cart-title font-bold font-rubik text-gray-600">
        Checkout
      </h1>
    </div>
    <div class="min-h-[450px] grid grid-cols-1 md:grid-cols-2">
      <div class="space-y-6 py-8 md:pr-6 lg:px-6 xl:px-20">
        <table
          class="w-full text-sm sm:text-base"
          v-if="Object.keys(cartdata.services).length !== 0"
        >
          <thead class="text-left">
            <tr>
              <th
                class="text-gray-500 text-base sm:text-xl font-medium lg:px-2 py-1.5 border-b"
              >
                Services
              </th>
              <th
                class="text-gray-500 text-right text-base lg:px-2 py-2 md:py-3 border-b font-medium"
              >
                Payment Option
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td colspan="2" class="py-2 px-2">
                <div class="grid gap-3">
                  <div
                    class=""
                    :key="cart.id"
                    v-for="cart in cartdata.services"
                  >
                    <div class="flex gap-3 items-start">
                      <figure class="w-16 shrink-0">
                        <img
                          loading="lazy"
                          class="w-16 h-14 shadow border object-cover rounded-md"
                          :src="imgurl + 'storage' + cart.image"
                          :alt="cart.title"
                        />
                      </figure>
                      <div class="space-y-2">
                        <h3 class="text-sm">{{ cart.title }}</h3>
                        <p class="text-sm">
                          QTY: <strong>{{ cart.item }}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="border-b">
              <td class="py-2 lg:px-2">
                <h4 class="text-sm sm:text-base">
                  Total with Addons <br />
                  <strong>${{ servicesTotalWithAddons }}</strong>
                </h4>
              </td>
              <td class="py-2 lg:px-2">
                <ul class="space-y-3">
                  <li class="text-right space-x-2">
                    <label
                      for="payone"
                      class="cursor-pointer text-sm sm:text-base"
                      >Pay Now</label
                    >
                    <input
                      type="radio"
                      value="online"
                      v-model="service_payment"
                      name="service_payment"
                      id="payone"
                    />
                  </li>
                  <li class="text-right space-x-2">
                    <label
                      for="payat"
                      class="cursor-pointer text-sm sm:text-base font-bold"
                      >Pay at appointment</label
                    >
                    <input
                      type="radio"
                      v-model="service_payment"
                      value="local"
                      name="service_payment"
                      id="payat"
                    />
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          class="w-full text-sm sm:text-base"
          v-if="Object.keys(cartdata.products).length !== 0"
        >
          <thead class="text-left">
            <tr>
              <th
                class="text-gray-500 text-base sm:text-xl font-medium lg:px-2 py-1.5 border-b"
              >
                Products
              </th>
              <th
                class="text-gray-500 text-right text-base lg:px-2 py-2 md:py-3 border-b font-medium"
              >
                Payment Option
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td colspan="2" class="py-2 px-2">
                <div class="grid gap-3">
                  <div
                    class=""
                    :key="cart.id"
                    v-for="cart in cartdata.products"
                  >
                    <div class="flex gap-3 items-start">
                      <figure class="w-16 shrink-0">
                        <img
                          loading="lazy"
                          class="w-16 h-14 shadow border object-cover rounded-md"
                          :src="imgurl + 'storage' + cart.image"
                          :alt="cart.title"
                        />
                      </figure>
                      <div class="space-y-2">
                        <h3 class="text-sm">{{ cart.title }}</h3>
                        <p class="text-sm">
                          QTY: <strong>{{ cart.item }}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="border-b">
              <td class="py-2 lg:px-2">
                <h4 class="text-sm sm:text-base">
                  Total: <strong>${{ productsTotal }}</strong>
                </h4>
              </td>
              <td class="py-2 lg:px-2">
                <ul class="space-y-3">
                  <li class="text-right space-x-2">
                    <label
                      for="payonline"
                      class="cursor-pointer text-sm sm:text-base"
                      >Pay Now</label
                    >
                    <input type="radio" checked name="product" id="payonline" />
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-full text-sm sm:text-base pt-3">
          <tbody>
            <tr class="">
              <td class="py-2 lg:px-2">Sub Total</td>
              <td class="py-2 lg:px-2">
                <h4 class="font-medium text-right">
                  ${{ serviceAndProductAddition }}
                </h4>
              </td>
            </tr>
            <tr
              class=" "
              v-if="
                service_payment === 'local' &&
                Object.keys(cartdata.services).length !== 0
              "
            >
              <td class="py-2 lg:px-2">Pay at appointment</td>
              <td class="py-2 lg:px-2">
                <h4 class="font-medium text-right">
                  -${{ servicesTotalWithAddons }}
                </h4>
              </td>
            </tr>
            <tr
              class="border-b"
              v-if="Object.keys(cartdata.products).length !== 0"
            >
              <td class="py-2 lg:px-2">Taxes <sub>(Only for Products)</sub></td>
              <td class="py-2 lg:px-2">
                <h4 class="font-medium text-right">+{{ rate }}%</h4>
              </td>
            </tr>
            <tr class="">
              <td class="py-2 lg:px-2"><strong>Grand Total</strong></td>
              <td class="py-2 lg:px-2">
                <h4 class="font-bold text-right">${{ grandTotal }}</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="md:border-l max-md:border-t">
        <transition name="fade">
          <PaymentForm
            @SubmitLocalPayment="SubmitLocalPayment"
            :is_payment="is_payment"
          />
        </transition>
      </div>
    </div>
    <div class="border-t lg:pt-6">
      <button
        class="flex items-center absolute -bottom-8 lg:relative lg:bottom-0"
        @click="onClickPrevious"
      >
        <i class="fas fa-long-arrow-alt-left"></i>
        <span class="pl-3 font-medium text-brand-color">Go Back</span>
      </button>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader/Loading-white";
import { mapGetters } from "vuex";
import PaymentForm from "./PaymentForm.vue";
export default {
  name: "FinalStep",
  components: {
    PaymentForm,
    Loader,
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    ...mapGetters({
      total: "cart/getTotal",
    }),
    cartdata() {
      return this.$store.state.cart.cartobj;
    },
    percent_val() {
      return this.$store.state.cart.percent_val;
    },
    finish_loading() {
      return this.$store.state.cart.finish_loading;
    },
    percent() {
      return this.$store.state.cart.percent;
    },
    servicesTotalWithAddons() {
      let services = this.$store.state.cart.cartobj?.services;
      let maps = services.map((el) => +el.price);
      if (maps.length > 0) {
        let total = maps.reduce((a, b) => a + b);
        let addons = this.$store.state.cart?.feature_price;
        if (addons) {
          let totalval = total + addons;
          return totalval - totalval * (this.percent / 100);
        }
        return total - total * (this.percent / 100);
      }
      return 0;
    },
    productsTotal() {
      let products = this.$store.state.cart.cartobj?.products;
      let maps = products.map((el) => +el.price);
      if (maps.length > 0) {
        let total = maps.reduce((a, b) => a + b);
        return +total.toFixed(2);
      }
      return 0;
    },

    serviceAndProductAddition() {
      if (this.percent) {
        let parcentVal =
          this.productsTotal - this.productsTotal * (this.percent / 100);
        return +(parcentVal + this.servicesTotalWithAddons).toFixed(2);
      }
      return +(this.productsTotal + this.servicesTotalWithAddons).toFixed(2);
    },
    service_payment: {
      get() {
        return this.$store.state.cart.payment;
      },
      set(value) {
        this.$store.commit("cart/UPDATE_PAYMENT", value);
      },
    },
    is_payment() {
      if (Object.keys(this.cartdata.products).length !== 0) {
        return true;
      } else {
        if (this.service_payment === "online") {
          return true;
        }
        return false;
      }
    },
    promocode() {
      return this.$store.state.cart.promocode;
    },
    rate() {
      return this.$store.state.cart.rate;
    },
    grandTotal() {
      var total;
      if (this.percent) {
        let parcentVal =
          this.productsTotal - this.productsTotal * (this.percent / 100);
        total = parcentVal;
      } else {
        total = this.productsTotal;
      }
      const taxes = total * (this.rate / 100);
      let SubgrandTotal;
      if (this.service_payment === "local") {
        SubgrandTotal = total;
      } else {
        SubgrandTotal = total + this.servicesTotalWithAddons;
      }
      let grandTotal = (SubgrandTotal + taxes).toFixed(2);
      this.$store.commit("cart/GRAND_TOTAL", +grandTotal);
      return grandTotal;
    },
  },
  methods: {
    onClickPrevious() {
      this.$emit("prev");
    },
    SubmitLocalPayment() {
      this.$emit("finishedCheckout");
    },
  },
};
</script> 