<template>
  <div class="user--booking">
    <StatusBox />
    <section class="bg-white shadow-lg p-5 mt-5 rounded-md">
      <h2
        class="text-left pb-5 border-b border-gray-200 text-dark-sm custom--title"
      >
        All Bookings
      </h2>

      <div v-if="!loading">
        <div class="pt-6" v-if="isBooking">
          <div class="w-full pt-5 hidden sm:block md:hidden lg:block">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="text-sm text-gray-400 font-normal text-left pb-5">
                    Order #
                  </th>
                  <th class="text-sm text-gray-400 font-normal text-left pb-5">
                    Code
                  </th>
                  <th class="text-sm text-gray-400 font-normal text-left pb-5">
                    Total Cost
                  </th>
                  <th
                    class="text-sm text-gray-400 font-normal text-center pb-5"
                  >
                    Date
                  </th>
                  <th
                    class="text-sm text-gray-400 font-normal text-center pb-5"
                  >
                    Status
                  </th>
                  <th
                    class="text-sm text-gray-400 font-normal text-center pb-5"
                  >
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="booking in bookings" :key="booking.id">
                  <td class="px-3 py-5">
                    <p class="text-sm font-medium text-dark-sm">
                      #{{ booking.order_id }}
                    </p>
                  </td>
                  <td class="px-3 py-5">
                    <div
                      v-for="(ser, index) in booking.service_type"
                      :key="index"
                    >
                      <p class="text-sm font-medium text-dark-sm">{{ ser }}</p>
                    </div>
                  </td>
                  <td class="px-3 py-5">
                    <p class="text-sm font-medium text-dark-sm">
                      ${{ booking.total }}
                    </p>
                  </td>
                  <td class="px-3 py-5">
                    <p class="text-sm font-medium text-dark-sm">
                      {{ booking.datetime }}
                    </p>
                  </td>
                  <td class="px-3 py-5">
                    <div class="">
                      <p
                        v-if="booking.status === 'cancel'"
                        class="py-2 px-2 bg-red-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                      >
                        Canceled
                      </p>
                      <p
                        v-if="booking.status === 'pending'"
                        class="py-2 px-2 bg-pending-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                      >
                        Pending Approval
                      </p>
                      <p
                        v-if="booking.status === 'approved'"
                        class="py-2 px-2 bg-approve-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                      >
                        Approved
                      </p>
                      <div class="" v-if="booking.status === 'complete'">
                        <p
                          class="text-center py-2 px-2 w-full bg-gray-500 text-white font-semibold text-xs rounded-sm focus:outline-none"
                        >
                          Completed
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-3 py-5">
                    <div class="flex justify-center">
                      <nuxt-link
                        v-if="
                          booking.status === 'pending' ||
                          booking.status === 'approved'
                        "
                        :to="`/users/booking/${booking.id}/edit`"
                        class="mr-1 py-2 px-3 shadow-md bg-brand-color hover:bg-brand-color-hover text-white font-semibold text-xs rounded-sm focus:outline-none"
                      >
                        Edit
                      </nuxt-link>
                      <div
                        class="flex items-center pr-1"
                        v-if="booking.status === 'complete'"
                      >
                        <nuxt-link
                          :to="`/users/booking/${booking.id}/review`"
                          class="shadow-md sm:block py-2 px-3 bg-review-color hover:bg-yellow-400 text-white font-semibold text-xs rounded-sm focus:outline-none"
                        >
                          Review
                        </nuxt-link>
                      </div>
                      <nuxt-link
                        :to="`/users/booking/${booking.id}/details`"
                        class="py-2 px-3 lg:mt-0 shadow-md bg-white border border-brand-color text-brand-color font-semibold rounded-sm focus:outline-none text-xs"
                      >
                        View
                      </nuxt-link>
                      <button
                        v-if="booking.status === 'cancel'"
                        @click="DeleteOrder(booking.id)"
                        class="ml-1 py-2 px-3 lg:mt-0 shadow-md bg-red-color hover:bg-megenta-color-hover text-white font-semibold rounded-sm focus:outline-none text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pt-6 block sm:hidden md:block lg:hidden">
            <div class="flex justify-between">
              <div class="text-sm text-gray-400 font-normal text-left lg:pl-5">
                Order #
              </div>
              <div class="text-sm text-gray-400 font-normal text-left">
                Code
              </div>
              <div class="text-sm text-gray-400 font-normal text-left">
                Total Cost
              </div>
              <div class="text-sm text-gray-400 font-normal text-left pr-5">
                Date
              </div>
            </div>
            <div
              v-for="booking in bookings"
              :key="booking.id"
              class="pb-5 pt-5 border-b"
            >
              <div class="flex items-center justify-between">
                <div
                  class="lg:flex items-center font-medium text-sm md:text-base"
                >
                  #{{ booking.order_id }}
                </div>
                <div class="lg:flex items-center font-medium text-sm">
                  <div
                    v-for="(ser, index) in booking.service_type"
                    :key="index"
                  >
                    <p>{{ ser }}</p>
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-dark-sm">
                    ${{ booking.total }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-dark-sm">
                    {{ booking.datetime }}
                  </p>
                </div>
              </div>
              <div class="pb-2 pt-5">
                <p
                  v-if="booking.status === 'cancel'"
                  class="w-full bg-red-color sm:w-auto md:w-full lg:w-auto py-2 px-2 text-white font-semibold text-xs rounded-sm text-center shadow-md"
                >
                  Status: Canceled
                </p>
                <p
                  v-if="booking.status === 'pending'"
                  class="w-full sm:w-auto md:w-full lg:w-auto py-2 px-2 bg-pending-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                >
                  Status: Pending Approval
                </p>
                <p
                  v-if="booking.status === 'approved'"
                  class="w-full sm:w-auto md:w-full lg:w-auto py-2 px-2 bg-approve-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                >
                  Status: Approved
                </p>
                <div
                  class="flex items-center"
                  v-if="booking.status === 'complete'"
                >
                  <p
                    class="w-full sm:w-auto md:w-full text-center lg:w-auto py-2 px-2 bg-gray-500 text-white font-semibold text-xs rounded-sm focus:outline-none"
                  >
                    Status: Completed
                  </p>
                </div>
              </div>
              <div class="">
                <nuxt-link
                  v-if="
                    booking.status === 'pending' ||
                    booking.status === 'approved'
                  "
                  :to="`/users/booking/${booking.id}/edit`"
                  class="w-full sm:w-auto md:w-full lg:w-auto block text-center mb-2 py-2 px-3 shadow-md bg-brand-color hover:bg-brand-color-hover text-white font-semibold text-xs rounded-sm focus:outline-none"
                >
                  Edit
                </nuxt-link>
                <div
                  class="flex items-center"
                  v-if="booking.status === 'complete'"
                >
                  <nuxt-link
                    :to="`/users/booking/${booking.id}/review`"
                    class="w-full sm:w-auto md:w-full lg:w-auto block text-center mb-2 shadow-md sm:block py-2 px-3 bg-review-color hover:bg-yellow-400 text-white font-semibold text-xs rounded-sm focus:outline-none"
                  >
                    Review
                  </nuxt-link>
                </div>
                <nuxt-link
                  :to="`/users/booking/${booking.id}/details`"
                  class="w-full sm:w-auto md:w-full lg:w-auto block text-center py-2 px-3 lg:mt-0 shadow-md bg-white border border-brand-color text-brand-color text-white font-semibold rounded-sm focus:outline-none text-xs"
                >
                  View
                </nuxt-link>
                <button
                  v-if="booking.status === 'cancel'"
                  @click="DeleteOrder(booking.id)"
                  class="w-full py-2 px-3 mt-2 shadow-md bg-red-color hover:bg-megenta-color-hover text-white font-semibold rounded-sm focus:outline-none text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="w-full pt-20">
          <div class="flex w-full justify-center">
            <nuxt-img
              quality="50"
              loading="lazy"
              src="/images/no-result.png"
              alt="no resutl"
            />
          </div>
          <h1 class="text-center pt-10 text-3xl text-gray-800 font-semibold">
            No booking here.
          </h1>
          <p class="text-base text-center">
            <nuxt-link to="/booking" class="underline text-brand-color"
              >Book a service</nuxt-link
            >
            or go back to
            <nuxt-link to="/cart" class="underline text-brand-color"
              >cart</nuxt-link
            >
          </p>
        </div>
      </div>

      <div v-else class="loader-parent mt-16">
        <div class="loader"></div>
      </div>
      <div class="py-5 flex justify-center" v-show="isBooking">
        <Paginator @NextData="NextData" :datas.sync="booking_paginator" />
      </div>
    </section>
  </div>
</template>

<script>
import Paginator from "@/components/Paginator";
import StatusBox from "@/components/StatusBox";
export default {
  name: "BookingUser",
  middleware: ["auth", "checkSetting"],
  layout: "users",
  components: {
    Paginator,
    StatusBox,
  },
  head() {
    return {
      title: "Booking | Home Theater Proz",
    };
  },
  computed: {
    bookings() {
      return this.$store.state.users.booking.bookings.data;
    },
    booking_paginator() {
      return this.$store.state.users.booking.bookings;
    },
    quantity() {
      return (quantity) => {
        if (quantity)
          return quantity.map((el) => el.quantity).reduce((a, b) => a + b);
      };
    },
    loading() {
      return this.$store.state.loading.loading;
    },
    isBooking() {
      if (this.bookings && this.bookings.length > 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    async NextData(pageNum) {
      this.$router.push("?page=" + pageNum);
      this.$store.dispatch("users/booking/fetchBookingPage", pageNum);
    },
    async loaded() {
      await this.$store.dispatch("users/booking/fetchBookings");
    },
    async loadedwithparam(param) {
      await this.$store.dispatch("users/booking/fetchBookingPage", param);
    },
    DeleteOrder(id) {
      this.$swal({
        title: "Do you want to Delete?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Confirm`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("users/booking/delete", id);
        }
      });
    },
  },
  created() {
    this.$store.dispatch("users/dashboard/fetchAllPayments");
    let param = this.$router.history.current.query.page;
    if (typeof param !== "undefined") {
      this.loadedwithparam(param);
    } else {
      this.loaded();
    }
  },
};
</script>

<style scoped>
.custom--title {
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
