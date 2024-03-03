<template>
  <div>
    <StatusBox />
    <section
      class="mt-5 rounded-md user--booking-details font-rubik px-4 sm:px-0"
      v-if="!loading"
    >
      <div class="flex items-center justify-between py-3">
        <h2 class="text-left text-2xl text-dark-sm font-medium">
          Order Details
        </h2>
        <nuxt-link
          to="/users/product"
          class="border-0 py-1 px-5 bg-brand-color hover:bg-brand-color-hover rounded-sm text-white"
        >
          Back
        </nuxt-link>
      </div>
      <div
        class="flex items-center justify-between px-4 py-6 bg-white rounded-md shadow-sm"
      >
        <div
          class="flex flex-wrap md:justify-between items-center w-full gap-3"
        >
          <div class="flex items-center">
            <div
              class="flex flex-wrap items-center"
              v-if="product.status === 'pending'"
            >
              <p
                class="py-2 px-4 font-semibold text-xs rounded-full pending--btn mr-2"
              >
                Pending
              </p>
              <div v-if="product.payment === 'online'">
                <small class="text-red-400"
                  >You made payment by online if need to cancel order please
                  <a
                    target="_blank"
                    class="text-brand-color underline"
                    href="/contact-us"
                    >contact us</a
                  ></small
                >
              </div>
              <button
                v-else
                class="py-2 px-4 bg-red-color text-white font-semibold text-xs rounded-full text-center"
                @click="canceled"
              >
                Cancel Booking
              </button>
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
              Approved
            </p>
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
          <div class="sm:pl-3 md:pl-0 md:pt-0 flex items-center">
            <h2 class="text-sm text-gray-600 mr-2">
              <strong> Delivery Date:</strong>
              <span> {{ product.delivery_time }} </span>
            </h2>
          </div>
        </div>
      </div>
      <div class="px-4 py-6 bg-white rounded-md shadow-sm mt-4">
        <div class="border-b w-full">
          <ul class="flex w-full pb-3">
            <li class="w-6/12">Items Summary</li>
            <li class="w-3/12 text-center">QTY</li>
            <li class="w-3/12 text-center">Varient</li>
            <li class="w-3/12 text-center">Item Total</li>
          </ul>
        </div>
        <div class="">
          <ul>
            <li
              class="flex py-5 items-center"
              v-for="service in product.services"
              :key="service.id"
            >
              <div class="flex flex-wrap xl:w-6/12 items-center">
                <div class="image pr-2">
                  <figure class="w-24">
                    <img
                      loading="lazy"
                      class="w-24 h-20 object-cover rounded-md"
                      :src="imgurl + 'storage' + service.image"
                      :alt="service.title"
                    />
                  </figure>
                </div>
                <div class="title">
                  <h3 class="text-dark-sm font-rubik font-medium">
                    {{ service.title }}
                  </h3>
                  <div class="flex pt-2 flex-wrap">
                    <span class="pr-4 text-gray-400 text-sm"
                      >Order# {{ product.order_id }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="w-3/12 text-dark-sm font-normal text-center">
                {{ service.quantity }}
              </div>
              <div
                v-if="service.varient"
                class="w-3/12 text-dark-sm font-normal text-center"
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
              <div v-else class="w-3/12"></div>
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
      <div class="grid lg:grid-cols-2 gap-5">
        <div class="px-4 py-6 bg-white rounded-md shadow-sm mt-4">
          <h3 class="text-base font-medium text-dark-sm font-rubik">
            Order Summary
          </h3>
          <table class="w-full mt-4">
            <tr>
              <td class="py-2 font-medium text-gray-600">Order Created</td>
              <td class="text-right">
                {{ $moment(product.created_at).format("MM/DD/y, ha") }}
              </td>
            </tr>
            <tr>
              <td class="py-2 font-medium text-gray-600">Quantity</td>
              <td class="text-right">{{ product.quantity }}</td>
            </tr>
            <tr v-if="product.discount">
              <td class="py-2 font-medium text-gray-600">Discount</td>
              <td class="text-right text-red-500">{{ product.discount }}%</td>
            </tr>

            <tr>
              <td class="py-2 font-semibold text-gray-600 text-lg">Total</td>
              <td
                v-if="product.discount"
                class="text-right py-2 font-semibold text-lg text-black"
              >
                <strong
                  >${{
                    (+product.price - +product.discount_price).toFixed(2)
                  }}</strong
                >
                <sub>(Discount Includes) </sub>
              </td>
              <td
                v-else
                class="text-right py-2 font-semibold text-lg text-black"
              >
                <strong>${{ product.price }}</strong>
              </td>
            </tr>
            <tr v-if="product.payment === 'online'">
              <td class="py-2 font-semibold text-gray-600 text-lg">Taxes</td>
              <td class="text-right py-2 font-semibold text-lg text-black">
                <strong>{{ product.taxes }}%</strong>
              </td>
            </tr>
            <tr v-if="product.payment === 'online'">
              <td class="py-2 font-semibold text-gray-600 text-lg">
                Total Price
              </td>
              <td class="text-right py-2 font-semibold text-lg text-black">
                <strong>${{ totalWithTaxes }}</strong>
                <sub
                  v-if="product.payment === 'online'"
                  class="text-sm text-brand-color"
                  >(Paid)</sub
                >
                <sub v-else class="text-sm text-red-500">(Not Paid)</sub>
                <sub>(Texes Includes) </sub>
              </td>
            </tr>
          </table>
        </div>
        <div class="px-4 py-6 bg-white rounded-md shadow-sm mt-4">
          <h3 class="text-base font-medium text-dark-sm font-rubik">
            Payment Details
          </h3>
          <div class="py-4">
            <small>Address</small>
            <address class="text-gray-500 pt-3 w-40">
              {{ product.address }}
            </address>
          </div>
          <div class="py-4">
            <small>Payment Method</small>
            <div class="pt-2" v-if="product.payment === 'local'">Local</div>
            <div
              class="flex justify-between pt-2 items-center"
              v-if="product.payment === 'online'"
            >
              <h3>Master Card</h3>
              <figure>
                <img
                  loading="lazy"
                  src="/images/master-card.png"
                  alt="master-card.png"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div v-else class="loader-parent mt-16">
      <div class="loader"></div>
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
    };
  },
  head() {
    return {
      title: "Booking Details | Home Theater Proz",
    };
  },
  computed: {
    totalWithTaxes() {
      let total;
      if (this.product.discount) {
        total = +this.product.price - +this.product.discount_price;
      } else {
        total = +this.product.price;
      }
      return (total + total * (this.product.taxes / 100)).toFixed(2);
    },
    product() {
      return this.$store.state.users.booking.booking;
    },

    loading() {
      return this.$store.state.users.booking.order_details_loading;
    },
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
      show: "",
    };
  },
  async asyncData({ store, error, route }) {
    await store
      .dispatch("users/booking/fetchBookingDetails", route.params.id)
      .catch((e) => {
        error({ statusCode: 404, message: "Enter Wrong Booking ID" });
      });
  },
};
</script>
<style>
.service__title span {
  color: rgb(78, 129, 238);
  padding-left: 5px;
}
.pending--btn {
  background: #cce1ff;
  color: #024c9e;
}
</style>
