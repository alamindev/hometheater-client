<template>
  <div class="user--dashboard">
    <div class="" v-if="!loading">
      <StatusBox />

      <div
        class="space-y-4 pt-12"
        v-if="
          Object.keys(product).length !== 0 || Object.keys(booking).length !== 0
        "
      >
        <h3
          class="font-rubik px-4 sm:px-0 text-2xl lg:text-3xl text-brand-color font-bold"
        >
          Getting Your Latest Order
        </h3>
        <div
          v-if="Object.keys(booking).length !== 0"
          class="sm:rounded-3xl w-full bg-white p-4 space-y-3 md:p-6 lg:px-12 lg:py-8"
        >
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="space-y-2">
              <h2 class="text-xl font-semibold">Home Service Details</h2>

              <div class="flex items-center pb-4 pt-2">
                <h3 class="font-semibold text-dark-sm text-lg mr-3">Status:</h3>
                <div class="flex" v-if="booking.status === 'pending'">
                  <p
                    class="py-2 px-6 font-semibold text-xs rounded-full bg-brand-color-hover text-white mr-2"
                  >
                    Pending
                  </p>
                  <button
                    class="py-2 px-4 bg-red-color text-white font-semibold text-xs rounded-full text-center"
                    @click="canceled"
                  >
                    Cancel Booking
                  </button>
                </div>
                <p
                  v-if="booking.status === 'cancel'"
                  class="py-2 px-4 bg-red-color text-white font-semibold text-xs rounded-full text-center"
                >
                  Canceled
                </p>
                <p
                  v-if="booking.status === 'approved'"
                  class="py-2 px-4 text-approve-color border border-approve-color font-semibold text-xs rounded-full text-center"
                >
                  Approved
                </p>
                <div
                  class="flex flex-wrap md:flex-nowrap"
                  v-if="booking.status === 'complete'"
                >
                  <p
                    class="text-center py-2 px-4 mr-2 bg-gray-500 text-white font-semibold text-xs rounded-full focus:outline-none"
                  >
                    Completed
                  </p>
                  <nuxt-link
                    :to="`/users/booking/${booking.id}/review`"
                    class="sm:block py-2 px-3 bg-review-color hover:bg-yellow-400 text-white font-semibold text-xs rounded-full focus:outline-none"
                  >
                    Leave a Review
                  </nuxt-link>
                </div>
              </div>
              <div class="pb-6">
                <h4 class="font-semibold text-lg text-dark">Service Address</h4>
                <div class="border p-4 max-w-xs">
                  <address class="text-gray-500">
                    {{ booking.address }}
                  </address>
                </div>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold text-lg text-dark">
                  Appointments Date and time
                </h4>
                <p class="text-base text-gray-600 mr-2 font-bold">
                  <span v-if="booking.datetime.length > 0">{{
                    $moment(booking.datetime[0].date).format("MM/DD/y")
                  }}</span
                  >,
                  <span v-for="date in booking.datetime" :key="date.id">
                    {{ $moment(date.time, ["hh"]).format("ha") }}
                  </span>
                </p>
              </div>
              <div class="py-4">
                <h4 class="font-semibold text-lg text-dark">Payment Method</h4>
                <div
                  class="pt-2 font-semibold"
                  v-if="booking.payment === 'local'"
                >
                  Local
                </div>
                <div
                  class="flex justify-between pt-2 items-center"
                  v-if="booking.payment === 'online'"
                >
                  <span class="font-semibold text-brand-color">Online</span>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-lg">Service Summery</h3>
                <div class="py-3">
                  <div class="border-b w-full">
                    <ul class="flex w-full pb-2">
                      <li class="w-8/12">Items Summary</li>
                      <li class="w-2/12 text-center text-sm">QTY</li>
                      <li class="w-2/12 text-center text-sm">Item Total</li>
                    </ul>
                  </div>
                  <div class="">
                    <ul>
                      <li
                        class="flex py-3 items-center"
                        v-for="service in booking.services"
                        :key="service.id"
                      >
                        <div class="flex w-8/12 items-center">
                          <div class="image pr-2">
                            <figure class="w-20">
                              <img
                                loading="lazy"
                                class="w-20 h-16 object-cover rounded-md"
                                :src="imgurl + 'storage' + service.image"
                                :alt="service.title"
                              />
                            </figure>
                          </div>
                          <div class="title">
                            <h3
                              class="text-dark-sm text-sm font-rubik font-medium"
                            >
                              {{ service.title }}
                            </h3>
                            <div class="flex pt-1 flex-wrap">
                              <span class="pr-4 text-gray-400 text-xs"
                                >Order# {{ booking.order_id }}</span
                              >
                            </div>
                          </div>
                        </div>
                        <div
                          class="w-2/12 text-dark-sm font-normal text-center"
                        >
                          {{ service.quantity }}
                        </div>
                        <div
                          v-if="service.total"
                          class="w-2/12 text-dark-sm font-normal text-center"
                        >
                          ${{ service.total }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="">
                <table class="w-full mt-3">
                  <tr>
                    <td class="pb-3 font-medium text-gray-600">
                      Order Created
                    </td>
                    <td class="text-right">
                      {{ $moment(booking.created_at).format("MM/DD/y, ha") }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pb-1 font-medium text-gray-600">Code</td>
                    <td class="text-right pb-1">
                      <p
                        v-for="(code, index) in booking.service_type"
                        :key="index"
                      >
                        {{ code }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-1 font-medium text-gray-600">Quantity</td>
                    <td class="text-right">{{ booking.quantity }}</td>
                  </tr>
                  <tr v-if="booking.discount">
                    <td class="py-1 font-medium text-gray-600">Discount</td>
                    <td class="text-right text-red-500">
                      -{{ booking.discount }}%
                    </td>
                  </tr>
                  <tr v-if="booking.addon_price">
                    <td class="py-1 font-medium text-gray-600">Addon Extra</td>
                    <td class="text-right">${{ booking.addon_price }}</td>
                  </tr>
                  <tr class="border-b">
                    <td class="py-1 font-semibold text-gray-600 text-lg">
                      Total
                    </td>
                    <td
                      class="text-right py-1 font-semibold text-lg text-black"
                    >
                      <strong>${{ booking.price }}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-1 font-semibold text-gray-600 text-lg">
                      Grand Total
                    </td>
                    <td
                      class="text-right py-1 font-semibold text-lg text-black"
                    >
                      <strong>${{ grandTotal }}</strong>
                      <sub
                        v-if="booking.payment === 'online'"
                        class="text-sm text-brand-color"
                        >(Paid)</sub
                      >
                      <sub v-else class="text-sm text-red-500">(Not Paid)</sub>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="Object.keys(product).length !== 0"
          class="sm:rounded-3xl w-full bg-white p-4 space-y-3 md:p-6 lg:px-12 lg:py-8"
        >
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="space-y-2">
              <h2 class="text-xl font-semibold">Product Details</h2>

              <div class="flex items-center pb-4 pt-2">
                <h2 class="font-semibold text-dark-sm text-lg mr-3">Status:</h2>
                <div
                  class="flex flex-wrap items-center"
                  v-if="product.status === 'pending'"
                >
                  <p
                    class="py-2 px-6 font-semibold text-xs rounded-full bg-brand-color-hover text-white mr-2"
                  >
                    Pending
                  </p>
                </div>

                <p
                  v-if="product.status === 'cancel'"
                  class="py-2 px-4 bg-red-color text-white font-semibold text-xs rounded-full text-center"
                >
                  Canceled
                </p>
                <p
                  v-if="product.status === 'approved'"
                  class="py-2 px-4 text-approve-color border border-approve-color font-semibold text-xs rounded-full text-center"
                >
                  Shipped
                </p>
                <div v-if="product.status === 'approved'">
                  <a
                    :href="product.tracking_link"
                    target="_blank"
                    class="px-6 py-2 rounded-full bg-red-500 text-white ml-2"
                    >Track your Order</a
                  >
                </div>
                <div
                  class="flex flex-wrap md:flex-nowrap"
                  v-if="product.status === 'complete'"
                >
                  <p
                    class="text-center py-2 px-4 mr-2 bg-gray-500 text-white font-semibold text-xs rounded-full focus:outline-none"
                  >
                    Completed
                  </p>
                  <nuxt-link
                    :to="`/users/product/${product.id}/review`"
                    class="sm:block py-2 px-3 bg-review-color hover:bg-yellow-400 text-white font-semibold text-xs rounded-full focus:outline-none"
                  >
                    Leave a Review
                  </nuxt-link>
                </div>
              </div>
              <div class="pb-6">
                <h4 class="font-semibold text-lg text-dark">
                  Delivery Address
                </h4>
                <div class="border p-4 max-w-xs">
                  <address class="text-gray-500">
                    {{ product.address }}
                  </address>
                </div>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold text-lg text-dark">Delivery Date</h4>
                <p class="text-base font-bold text-gray-500 mr-2">
                  <span> {{ product.delivery_time }} </span>
                </p>
              </div>
              <div class="py-4">
                <h4 class="font-semibold text-lg text-dark">Payment Method</h4>
                <div
                  class="pt-2 font-semibold"
                  v-if="product.payment === 'local'"
                >
                  Local
                </div>
                <div
                  class="flex justify-between pt-2 items-center"
                  v-if="product.payment === 'online'"
                >
                  <span class="font-semibold text-brand-color">Online</span>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-lg">Order Summary</h3>
                <div class="px-4 py-6 bg-white rounded-md shadow-sm mt-4">
                  <div class="border-b w-full">
                    <ul class="flex w-full pb-3">
                      <li class="w-6/12">Items Summary</li>
                      <li class="w-2/12 text-center text-sm">QTY</li>
                      <li class="w-2/12 text-center text-sm">Varient</li>
                      <li class="w-2/12 text-center text-sm">Item Total</li>
                    </ul>
                  </div>
                  <div class="">
                    <ul>
                      <li
                        class="flex py-5 items-center"
                        v-for="service in product.services"
                        :key="service.id"
                      >
                        <div class="flex w-6/12 items-center">
                          <div class="image pr-2">
                            <figure class="w-20">
                              <img
                                loading="lazy"
                                class="w-20 h-16 object-cover rounded-md"
                                :src="imgurl + 'storage' + service.image"
                                :alt="service.title"
                              />
                            </figure>
                          </div>
                          <div class="title">
                            <h3
                              class="text-dark-sm text-sm font-rubik font-medium"
                            >
                              {{ service.title }}
                            </h3>
                            <div class="flex pt-2 flex-wrap">
                              <span class="pr-4 text-gray-400 text-xs"
                                >Order# {{ product.order_id }}</span
                              >
                            </div>
                          </div>
                        </div>
                        <div
                          class="w-2/12 text-dark-sm font-normal text-center"
                        >
                          {{ service.quantity }}
                        </div>
                        <div
                          v-if="service.varient"
                          class="w-2/12 text-dark-sm font-normal text-center"
                        >
                          <p class="font-medium">Selected varient</p>
                          <p>
                            Name: <strong>{{ service?.varient?.name }}</strong>
                          </p>
                          <p
                            :style="`--color: ${service?.varient?.value}`"
                            class="bg-[var(--color)] size-10 mx-auto"
                          ></p>
                        </div>
                        <div v-else class="w-2/12"></div>
                        <div
                          v-if="service.total"
                          class="w-3/12 text-dark-sm font-normal text-center"
                        >
                          ${{ service.total }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                class="px-4 py-6 bg-white rounded-md shadow-sm mt-4 space-y-4"
              >
                <table class="w-full">
                  <tr>
                    <td class="pb-3 font-medium text-gray-600">
                      Order Created
                    </td>
                    <td class="text-right">
                      {{ $moment(product.created_at).format("MM/DD/y, ha") }}
                    </td>
                  </tr>
                  <tr>
                    <td class="py-1 font-medium text-gray-600">Quantity</td>
                    <td class="text-right">{{ product.quantity }}</td>
                  </tr>
                  <tr v-if="product.discount">
                    <td class="py-1 font-medium text-gray-600">Discount</td>
                    <td class="text-right text-red-500">
                      -{{ product.discount }}%
                    </td>
                  </tr>

                  <tr>
                    <td class="py-2 font-semibold text-gray-600 text-lg">
                      Total
                    </td>

                    <td
                      class="text-right py-2 font-semibold text-lg text-black"
                    >
                      <strong>${{ product.price }}</strong>
                    </td>
                  </tr>
                  <tr v-if="product.payment === 'online'" class="border-b">
                    <td class="py-2 font-semibold text-gray-600 text-lg">
                      Taxes
                    </td>
                    <td
                      class="text-right py-2 font-semibold text-lg text-black"
                    >
                      <strong>+{{ product.taxes }}%</strong>
                    </td>
                  </tr>
                  <tr v-if="product.payment === 'online'">
                    <td class="py-2 font-semibold text-gray-600 text-lg">
                      Grand Total
                    </td>
                    <td
                      class="text-right py-2 font-semibold text-lg text-black"
                    >
                      <sub class="text-xs font-normal">(Texes Includes) </sub>
                      <strong>${{ totalWithTaxes }}</strong>
                      <sub
                        v-if="product.payment === 'online'"
                        class="text-xs text-brand-color"
                        >(Paid)</sub
                      >
                      <sub v-else class="text-xs font-normal text-red-500"
                        >(Not Paid)</sub
                      >
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div
          class="sm:rounded-3xl w-full bg-white p-4 space-y-5 md:p-6 lg:px-12 lg:py-8"
        >
          <h2 class="text-xl font-semibold">Contact Information</h2>
          <div class="space-y-5">
            <div class="space-y-2">
              <h4 class="font-semibold text-brand-dark text-base">
                Email Address
              </h4>
              <p>{{ user.email }}</p>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-brand-dark text-base">
                Phone Number
              </h4>
              <p>{{ user.phone }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="w-full pt-20">
        <div class="flex w-full justify-center">
          <img loading="lazy" src="/images/no-result.png" alt="no resutl" />
        </div>
        <h1
          class="text-center pt-10 text-2xl sm:text-3xl text-gray-800 font-semibold"
        >
          You don't have recent orders
        </h1>
        <p class="text-base text-center">
          <nuxt-link to="/booking" class="underline text-brand-color"
            >Book a service</nuxt-link
          >
          or
          <nuxt-link to="/shop" class="underline text-brand-color"
            >Buy a product</nuxt-link
          >
        </p>
      </div>
    </div>
    <div v-else>
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pt-6">
        <div class="rounded-lg p-5 shadow-md">
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-blue-200 rounded w-full"></div>
              <div class="h-4 bg-blue-200 rounded w-3/4"></div>
              <div class="h-4 bg-blue-200 rounded w-3/6"></div>
            </div>
          </div>
        </div>
        <div class="rounded-lg p-5 shadow-md">
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-blue-200 rounded w-full"></div>
              <div class="h-4 bg-blue-200 rounded w-3/4"></div>
              <div class="h-4 bg-blue-200 rounded w-3/6"></div>
            </div>
          </div>
        </div>
        <div class="rounded-lg p-5 shadow-md">
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-blue-200 rounded w-full"></div>
              <div class="h-4 bg-blue-200 rounded w-3/4"></div>
              <div class="h-4 bg-blue-200 rounded w-3/6"></div>
            </div>
          </div>
        </div>
      </div>
      <section class="bg-white shadow-lg p-5 mt-5 rounded-md">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-blue-200 rounded w-3/5"></div>
          </div>
        </div>
        <div class="animate-pulse flex space-x-4 pt-10">
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-blue-200 rounded w-full"></div>
            <div class="h-4 bg-blue-200 rounded w-full"></div>
            <div class="h-4 bg-blue-200 rounded w-full"></div>
          </div>
        </div>
        <div class="animate-pulse flex space-x-4 pt-10">
          <div class="flex-1 space-y-4 py-1 flex justify-center">
            <div class="h-4 bg-blue-200 rounded w-1/6"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import StatusBox from "@/components/StatusBox";
export default {
  middleware: ["auth", "checkSetting"],
  layout: "users",
  components: {
    StatusBox,
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
      show: "",
    };
  },
  head() {
    return {
      title: "Dashboard | Home Theater Proz",
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading.loading;
    },
    product() {
      let product = this.$store.state.users.dashboard?.product;
      if (product) {
        return product;
      } else {
        return {};
      }
    },
    booking() {
      let booking = this.$store.state.users.dashboard?.booking;
      if (booking) {
        return booking;
      } else {
        return {};
      }
    },
    user() {
      return this.$store.state.users.dashboard.user;
    },
    quantity() {
      let booking = this.$store.state.users.dashboard.booking;
      if (booking.services) {
        const s = booking.services.map((el) => +el.quantity);
        if (s.length > 0) {
          return s.reduce((a, b) => a + b);
        }
        return 0;
      }
    },
    grandTotal() {
      let total;
      if (this.booking.discount) {
        total =
          +this.booking.price +
          +this.booking.addon_price -
          +this.booking.discount_price;
      } else {
        total = +this.booking.price + +this.booking.addon_price;
      }
      return total.toFixed(2);
    },
    totalWithTaxes() {
      let total;
      if (this.product.discount) {
        total = +this.product.price - +this.product.discount_price;
      } else {
        total = +this.product.price;
      }
      return (total + total * (this.product.taxes / 100)).toFixed(2);
    },
  },
  methods: {
    canceled() {
      this.$swal({
        title: "Do you want to Cancel Booking?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Confirm`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("users/booking/canceled", this.$route.params.id);
        }
      });
    },
  },
  async created() {
    if (!this.$store.state.users.dashboard.order) {
      await Promise.all([
        this.$store.dispatch("users/dashboard/fetchRecentOrder"),
        this.$store.dispatch("users/dashboard/fetchAllRequiredDatas"),
      ]);
    }
  },
};
</script>


