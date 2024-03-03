<template>
  <div class="user--dashboard">
    <div class="" v-if="!loading">
      <StatusBox />
      <section class="bg-white shadow-lg p-5 mt-5 rounded-md">
        <h2
          class="text-left pb-5 border-b border-gray-200 text-2xl text-dark-sm font-medium"
        >
          Recent Bookings
        </h2>
        <div class="" v-if="isBooking">
          <div class="w-full pt-5 hidden md:block">
            <table class="table w-full">
              <thead>
                <tr>
                  <th
                    class="text-xs sm:text-sm text-gray-400 font-normal text-left pb-5"
                  >
                    Order #
                  </th>
                  <th
                    class="text-xs sm:text-sm text-gray-400 font-normal text-center pb-5"
                  >
                    Code
                  </th>
                  <th
                    class="text-xs sm:text-sm text-gray-400 font-normal text-center pb-5"
                  >
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
                  <th class="text-sm text-gray-400 font-normal text-right pb-5">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                <template v-for="booking in recent_booking">
                  <tr :key="booking.id" v-if="booking.type === 0">
                    <td class="px-3 py-5">
                      <p
                        class="text-xs sm:text-sm font-medium w-28 overflow-hidden text-ellipsis"
                      >
                        #{{ booking.order_id }}
                      </p>
                    </td>
                    <td class="px-3 py-5">
                      <div
                        v-for="(ser, index) in booking.service_type"
                        :key="index"
                      >
                        <p class="text-xs sm:text-sm font-medium text-center">
                          {{ ser }}
                        </p>
                      </div>
                    </td>
                    <td class="px-3 py-5">
                      <p class="text-xs sm:text-sm font-medium text-center">
                        ${{ booking.total }}
                      </p>
                    </td>
                    <td class="px-3 py-5">
                      <p class="text-xs sm:text-sm font-medium text-center">
                        {{ booking.datetime }}
                      </p>
                    </td>
                    <td class="px-3 py-5">
                      <div class="">
                        <p
                          v-if="booking.status === 'cancel'"
                          class="py-2 px-2 md:max-w-[200px] mx-auto bg-red-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                        >
                          Canceled
                        </p>
                        <p
                          v-if="booking.status === 'pending'"
                          class="py-2 px-2 md:max-w-[200px] mx-auto bg-pending-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                        >
                          Pending Approval
                        </p>
                        <p
                          v-if="booking.status === 'approved'"
                          class="py-2 px-2 md:max-w-[200px] mx-auto bg-approve-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                        >
                          Approved
                        </p>
                        <div class="" v-if="booking.status === 'complete'">
                          <p
                            class="text-center py-2 px-2 md:max-w-[200px] mx-auto w-full bg-gray-500 text-white font-semibold text-xs rounded-sm focus:outline-none"
                          >
                            Completed
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-3 py-5">
                      <div class="flex justify-end">
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
                </template>
              </tbody>
            </table>
          </div>
          <div class="pt-6 block md:hidden">
            <div class="flex justify-between">
              <div
                class="text-xs sm:text-sm text-gray-400 font-normal text-left lg:pl-5 w-28"
              >
                Order #
              </div>
              <div
                class="text-xs sm:text-sm text-gray-400 font-normal text-center"
              >
                Code
              </div>
              <div
                class="text-xs sm:text-sm text-gray-400 font-normal text-center"
              >
                Total Cost
              </div>
              <div
                class="text-xs sm:text-sm text-gray-400 font-normal text-center pr-5"
              >
                Date
              </div>
            </div>
            <template v-for="booking in recent_booking">
              <div
                :key="booking.id"
                v-if="booking.type === 0"
                class="pb-5 pt-5 border-b"
              >
                <div class="flex items-center justify-between">
                  <div
                    class="lg:flex w-28 overflow-hidden text-ellipsis items-center font-medium text-xs sm:text-sm md:text-base"
                  >
                    #{{ booking.order_id }}
                  </div>
                  <div
                    class="lg:flex items-center font-medium text-xs sm:text-sm"
                  >
                    <div
                      v-for="(ser, index) in booking.service_type"
                      :key="index"
                    >
                      <p>{{ ser }}</p>
                    </div>
                  </div>
                  <div>
                    <p class="text-xs sm:text-sm font-medium text-center">
                      ${{ booking.total }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs sm:text-sm font-medium text-center">
                      {{ booking.datetime }}
                    </p>
                  </div>
                </div>
                <div class="pb-2 pt-5">
                  <p
                    v-if="booking.status === 'cancel'"
                    class="w-full bg-red-color sm:w-auto md:w-full lg:w-auto py-2 px-2 md:max-w-[200px] mx-auto text-white font-semibold text-xs rounded-sm text-center shadow-md"
                  >
                    Status: Canceled
                  </p>
                  <p
                    v-if="booking.status === 'pending'"
                    class="w-full sm:w-auto md:w-full lg:w-auto py-2 px-2 md:max-w-[200px] mx-auto bg-pending-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                  >
                    Status: Pending Approval
                  </p>
                  <p
                    v-if="booking.status === 'approved'"
                    class="w-full sm:w-auto md:w-full lg:w-auto py-2 px-2 md:max-w-[200px] mx-auto bg-approve-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                  >
                    Status: Approved
                  </p>
                  <div
                    class="flex items-center"
                    v-if="booking.status === 'complete'"
                  >
                    <p
                      class="w-full sm:w-auto md:w-full text-center lg:w-auto py-2 px-2 md:max-w-[200px] mx-auto bg-gray-500 text-white font-semibold text-xs rounded-sm focus:outline-none"
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
                    class="w-full sm:w-auto md:w-full lg:w-auto block text-center py-2 px-3 lg:mt-0 shadow-md bg-white border border-brand-color text-brand-color font-semibold rounded-sm focus:outline-none text-xs"
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
            </template>
          </div>
          <div class="py-5 flex justify-center">
            <nuxt-link
              to="/users/booking"
              class="mr-2 py-2 px-5 bg-brand-color hover:bg-brand-color-hover text-white font-semibold text-base rounded-md focus:outline-none"
            >
              All Bookings
            </nuxt-link>
          </div>
        </div>
        <div v-else class="w-full pt-20">
          <div class="flex w-full justify-center">
            <img loading="lazy" src="/images/no-result.png" alt="no resutl" />
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
      </section>
      <section class="bg-white shadow-lg p-5 mt-5 rounded-md">
        <h2
          class="text-left pb-5 border-b border-gray-200 text-2xl text-dark-sm font-medium"
        >
          Recent Products
        </h2>
        <div class="" v-if="isBooking">
          <div class="w-full pt-5 hidden md:block">
            <table class="table w-full">
              <thead>
                <tr>
                  <th
                    class="text-xs sm:text-sm text-gray-400 font-normal text-left pb-5"
                  >
                    Order #
                  </th>
                  <th
                    class="text-xs sm:text-sm text-gray-400 font-normal text-center pb-5"
                  >
                    Code
                  </th>
                  <th
                    class="text-xs sm:text-sm text-gray-400 font-normal text-center pb-5"
                  >
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
                  <th class="text-sm text-gray-400 font-normal text-right pb-5">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                <template v-for="booking in recent_booking">
                  <tr :key="booking.id" v-if="booking.type === 1">
                    <td class="px-3 py-5">
                      <p class="text-xs sm:text-sm font-medium text-left">
                        #{{ booking.order_id }}
                      </p>
                    </td>
                    <td class="px-3 py-5">
                      <div
                        v-for="(ser, index) in booking.service_type"
                        :key="index"
                      >
                        <p class="text-xs sm:text-sm font-medium text-center">
                          {{ ser }}
                        </p>
                      </div>
                    </td>
                    <td class="px-3 py-5">
                      <p class="text-xs sm:text-sm font-medium text-center">
                        ${{ booking.total }}
                      </p>
                    </td>
                    <td class="px-3 py-5">
                      <p class="text-xs sm:text-sm font-medium text-center">
                        {{ booking.datetime }}
                      </p>
                    </td>
                    <td class="px-3 py-5">
                      <div class="">
                        <p
                          v-if="booking.status === 'cancel'"
                          class="py-2 px-2 md:max-w-[200px] mx-auto bg-red-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                        >
                          Canceled
                        </p>
                        <p
                          v-if="booking.status === 'pending'"
                          class="py-2 px-2 md:max-w-[200px] mx-auto bg-pending-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                        >
                          Pending Approval
                        </p>
                        <p
                          v-if="booking.status === 'approved'"
                          class="py-2 px-2 md:max-w-[200px] mx-auto bg-approve-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                        >
                          Approved
                        </p>
                        <div class="" v-if="booking.status === 'complete'">
                          <p
                            class="text-center py-2 px-2 md:max-w-[200px] mx-auto w-full bg-gray-500 text-white font-semibold text-xs rounded-sm focus:outline-none"
                          >
                            Completed
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-3 py-5">
                      <div class="flex justify-end">
                        <div
                          class="flex items-center pr-1"
                          v-if="booking.status === 'complete'"
                        >
                          <nuxt-link
                            :to="`/users/product/${booking.id}/review`"
                            class="shadow-md sm:block py-2 px-3 bg-review-color hover:bg-yellow-400 text-white font-semibold text-xs rounded-sm focus:outline-none"
                          >
                            Review
                          </nuxt-link>
                        </div>
                        <nuxt-link
                          :to="`/users/product/${booking.id}/details`"
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
                </template>
              </tbody>
            </table>
          </div>
          <div class="pt-6 block md:hidden">
            <div class="flex justify-between">
              <div
                class="text-xs sm:text-sm text-gray-400 font-normal text-left lg:pl-5"
              >
                Order #
              </div>
              <div
                class="text-xs sm:text-sm text-gray-400 font-normal text-center"
              >
                Code
              </div>
              <div
                class="text-xs sm:text-sm text-gray-400 font-normal text-center"
              >
                Total Cost
              </div>
              <div
                class="text-xs sm:text-sm text-gray-400 font-normal text-center pr-5"
              >
                Date
              </div>
            </div>
            <template v-for="booking in recent_booking">
              <div
                :key="booking.id"
                v-if="booking.type === 0"
                class="pb-5 pt-5 border-b"
              >
                <div class="flex items-center justify-between">
                  <div
                    class="lg:flex items-center font-medium text-xs sm:text-sm md:text-base"
                  >
                    #{{ booking.order_id }}
                  </div>
                  <div
                    class="lg:flex items-center font-medium text-xs sm:text-sm"
                  >
                    <div
                      v-for="(ser, index) in booking.service_type"
                      :key="index"
                    >
                      <p>{{ ser }}</p>
                    </div>
                  </div>
                  <div>
                    <p class="text-xs sm:text-sm font-medium text-center">
                      ${{ booking.total }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs sm:text-sm font-medium text-center">
                      {{ booking.datetime }}
                    </p>
                  </div>
                </div>
                <div class="pb-2 pt-5">
                  <p
                    v-if="booking.status === 'cancel'"
                    class="w-full bg-red-color sm:w-auto md:w-full lg:w-auto py-2 px-2 md:max-w-[200px] mx-auto text-white font-semibold text-xs rounded-sm text-center shadow-md"
                  >
                    Status: Canceled
                  </p>
                  <p
                    v-if="booking.status === 'pending'"
                    class="w-full sm:w-auto md:w-full lg:w-auto py-2 px-2 md:max-w-[200px] mx-auto bg-pending-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                  >
                    Status: Pending Approval
                  </p>
                  <p
                    v-if="booking.status === 'approved'"
                    class="w-full sm:w-auto md:w-full lg:w-auto py-2 px-2 md:max-w-[200px] mx-auto bg-approve-color text-white font-semibold text-xs rounded-sm text-center shadow-md"
                  >
                    Status: Approved
                  </p>
                  <div
                    class="flex items-center"
                    v-if="booking.status === 'complete'"
                  >
                    <p
                      class="w-full sm:w-auto md:w-full text-center lg:w-auto py-2 px-2 md:max-w-[200px] mx-auto bg-gray-500 text-white font-semibold text-xs rounded-sm focus:outline-none"
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
                    :to="`/users/product/${booking.id}/edit`"
                    class="w-full sm:w-auto md:w-full lg:w-auto block text-center mb-2 py-2 px-3 shadow-md bg-brand-color hover:bg-brand-color-hover text-white font-semibold text-xs rounded-sm focus:outline-none"
                  >
                    Edit
                  </nuxt-link>
                  <div
                    class="flex items-center"
                    v-if="booking.status === 'complete'"
                  >
                    <nuxt-link
                      :to="`/users/product/${booking.id}/review`"
                      class="w-full sm:w-auto md:w-full lg:w-auto block text-center mb-2 shadow-md sm:block py-2 px-3 bg-review-color hover:bg-yellow-400 text-white font-semibold text-xs rounded-sm focus:outline-none"
                    >
                      Review
                    </nuxt-link>
                  </div>
                  <nuxt-link
                    :to="`/users/product/${booking.id}/details`"
                    class="w-full sm:w-auto md:w-full lg:w-auto block text-center py-2 px-3 lg:mt-0 shadow-md bg-white border border-brand-color text-brand-color font-semibold rounded-sm focus:outline-none text-xs"
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
            </template>
          </div>
          <div class="py-5 flex justify-center">
            <nuxt-link
              to="/users/product"
              class="mr-2 py-2 px-5 bg-brand-color hover:bg-brand-color-hover text-white font-semibold text-base rounded-md focus:outline-none"
            >
              All Products
            </nuxt-link>
          </div>
        </div>
        <div v-else class="w-full pt-20">
          <div class="flex w-full justify-center">
            <img loading="lazy" src="/images/no-result.png" alt="no resutl" />
          </div>
          <h1 class="text-center pt-10 text-3xl text-gray-800 font-semibold">
            No Product here.
          </h1>
          <p class="text-base text-center">
            <nuxt-link to="/shop" class="underline text-brand-color"
              >Buy Products</nuxt-link
            >
            or go back to
            <nuxt-link to="/cart" class="underline text-brand-color"
              >cart</nuxt-link
            >
          </p>
        </div>
      </section>
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
  methods: {
    DeleteOrder(id) {
      this.$swal({
        title: "Do you want to Delete?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Confirm`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("users/dashboard/delete", id);
        }
      });
    },
  },
  computed: {
    isBooking() {
      if (this.recent_booking && this.recent_booking.length > 0) {
        return true;
      }
      return false;
    },
    recent_booking() {
      return this.$store.state.users.dashboard.recent_booking;
    },

    loading() {
      return this.$store.state.loading.loading;
    },
  },
  created() {
    if (!this.authenticated) {
      this.$router.push("login?redirect=/users/dashboard");
    }
    this.$store.dispatch("users/dashboard/fetchAllRequiredDatas");
    this.$store.dispatch("users/dashboard/fetchRecentBooking");
  },
};
</script>


