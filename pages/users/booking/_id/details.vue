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
          to="/users/booking"
          class="border-0 py-1 px-5 bg-brand-color hover:bg-brand-color-hover rounded-sm text-white"
        >
          Back
        </nuxt-link>
      </div>
      <div
        class="flex items-center justify-between px-4 py-6 bg-white rounded-md shadow-sm"
      >
        <div class="flex flex-wrap md:justify-between items-center w-full">
          <div class="flex items-center">
            <div class="flex" v-if="booking.status === 'pending'">
              <p
                class="py-2 px-4 font-semibold text-xs rounded-full pending--btn mr-2"
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
          <div class="sm:pl-3 md:pl-0 md:pt-0 flex items-center">
            <h2 class="text-sm text-gray-600 mr-2">
              <strong> Appointment Date:</strong>
              <span v-if="booking.datetime.length > 0">{{
                $moment(booking.datetime[0].date).format("MM/DD/y")
              }}</span
              >,
              <span v-for="date in booking.datetime" :key="date.id">
                {{ $moment(date.time, ["hh"]).format("ha") }}
              </span>
            </h2>
            <div
              v-if="
                booking.status !== 'complete' && booking.status !== 'cancel'
              "
            >
              <nuxt-link
                :to="`/users/booking/${booking.id}/edit`"
                class="rounded-full py-1 px-3 bg-red-light text-white text-sm"
                >Change</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 py-6 bg-white rounded-md shadow-sm mt-4">
        <div class="border-b w-full">
          <ul class="flex w-full pb-3">
            <li class="w-6/12">Items Summary</li>
            <li class="w-3/12 text-center">Per Item</li>
            <li class="w-3/12 text-center">Item Total</li>
          </ul>
        </div>
        <div class="">
          <ul>
            <li
              class="flex py-5 items-center"
              v-for="service in booking.services"
              :key="service.id"
            >
              <div class="flex flex-wrap xl:w-6/12 items-center">
                <div class="image pr-2">
                  <figure class="w-24">
                    <nuxt-img
                      quality="50"
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
                      >Order# {{ booking.order_id }}</span
                    >
                    <span class="text-gray-400 text-sm"
                      >QTY: {{ service.quantity }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="w-3/12 text-dark-sm font-normal pl-2 text-center">
                ${{ service.sub_total }}
              </div>
              <div class="w-3/12 text-dark-sm font-normal text-center">
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
                {{ $moment(booking.created_at).format("MM/DD/y, ha") }}
              </td>
            </tr>
            <tr>
              <td class="pb-4 font-medium text-gray-600">Code</td>
              <td class="text-right pb-4">
                <p v-for="(code, index) in booking.service_type" :key="index">
                  {{ code }}
                </p>
              </td>
            </tr>
            <tr>
              <td class="py-1 font-medium text-gray-600">Sub total</td>
              <td class="text-right">${{ booking.sub_total }}</td>
            </tr>
            <tr v-if="booking.discount != null">
              <td class="py-1 font-medium text-gray-600">Discount</td>
              <td class="text-right text-red-500">
                -${{ booking.discount_price }}
              </td>
            </tr>
            <tr v-if="booking.addon_price != null">
              <td class="py-1 font-medium text-gray-600">Addon Extra</td>
              <td class="text-right">${{ booking.addon_price }}</td>
            </tr>
            <tr>
              <td class="pt-5 font-semibold text-gray-600 text-lg">Total</td>
              <td class="text-right pt-5 font-semibold text-lg text-black">
                ${{ booking.price }}
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
              {{ booking.address }}
            </address>
          </div>
          <div class="py-4">
            <small>Payment Method</small>
            <div class="pt-2" v-if="booking.payment === 'local'">Local</div>
            <div
              class="flex justify-between pt-2 items-center"
              v-if="booking.payment === 'online'"
            >
              <h3>Master Card</h3>
              <figure>
                <nuxt-img
                  quality="50"
                  loading="lazy"
                  src="/images/master-card.png"
                  alt="master-card.png"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div class="pb-4 pt-8">
        <h3 class="text-left text-2xl text-dark-sm font-medium">
          Booking Questions
        </h3>
        <ul>
          <li v-for="que in booking.questions" :key="que.id">
            <div class="px-4 py-6 bg-white rounded-md shadow-sm mt-2">
              <h3
                class="text-base font-medium text-dark-sm font-rubik text-center border-b pb-2 service__title"
                v-html="que.service_title"
              ></h3>
              <div class="pt-3">
                <ul>
                  <li
                    v-for="(q, index) in que.question"
                    :key="index"
                    class="flex py-2 items-center"
                  >
                    <div class="w-6/12">
                      <h3>({{ index + 1 }}) {{ q.name }}</h3>
                    </div>
                    <p class="pl-4">{{ q.title }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
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
    install_hour() {
      let booking = this.$store.state.users.booking.booking;
      if (booking) {
        return booking.services
          .map((el) => el.duration)
          .reduce((a, b) => a + b, 0);
      }
    },
    booking() {
      return this.$store.state.users.booking.booking;
    },
    quantity() {
      let booking = this.$store.state.users.booking.booking;
      if (booking.services) {
        const s = booking.services.map((el) => +el.quantity);
        if (s.length > 0) {
          return s.reduce((a, b) => a + b);
        }
        return 0;
      }
    },
    loading() {
      return this.$store.state.users.booking.order_details_loading;
    },
    isQuestion() {
      if (this.booking && this.booking.questions.length > 0) {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
      show: "",
    };
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
