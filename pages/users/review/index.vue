<template>
  <div class="user--review">
    <StatusBox />
    <section class="bg-white shadow-lg p-5 mt-5 rounded-md">
      <h2
        class="text-left pb-5 border-b border-gray-200 text-2xl text-dark-sm font-bold"
      >
        Reviews
      </h2>

      <div v-if="!loading">
        <div class="pt-6" v-if="isReview">
          <div class="w-full pt-5 hidden sm:block md:hidden lg:block">
            <table class="table w-full">
              <thead>
                <tr>
                  <th
                    class="text-xs sm:text-sm text-gray-400 font-normal text-left pb-5"
                  >
                    Order #
                  </th>
                  <th
                    class="text-xs sm:text-sm text-gray-400 font-normal text-left pb-5 w-56"
                  >
                    Service Type
                  </th>
                  <th
                    class="text-xs sm:text-sm text-gray-400 font-normal text-left pb-5"
                  >
                    Rating
                  </th>
                  <th
                    class="text-sm text-gray-400 font-normal text-center pb-5"
                  >
                    Date
                  </th>
                  <th
                    class="text-sm text-gray-400 font-normal text-center pb-5"
                  >
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="review in reviews" :key="review.id">
                  <td class="px-3 py-5">
                    <nuxt-link
                      :to="`/users/booking/${review.order_id}/details`"
                      class="text-xs sm:text-sm font-medium underline"
                      >#{{ review.order_id_show }}</nuxt-link
                    >
                  </td>
                  <td class="px-3 py-5">
                    <div class="">
                      <h2 class="text-base font-semibold pb-2">
                        {{ review.title }}
                      </h2>
                      <p class="text-sm font-normal text-gray-400">
                        {{ review.details }}
                      </p>
                    </div>
                  </td>
                  <td class="px-3 py-5">
                    <p class="text-xs sm:text-sm font-medium">
                      {{ review.rating }}
                    </p>
                  </td>
                  <td class="px-3 py-5">
                    <p class="text-xs sm:text-sm font-medium">
                      {{ review.date }}
                    </p>
                  </td>
                  <td class="px-3 py-5">
                    <div class="flex justify-center">
                      <nuxt-link
                        :to="`/users/review/${review.id}/edit`"
                        class="block text-center mr-2 py-2 px-3 shadow-md bg-brand-color hover:bg-brand-color-hover text-white font-semibold text-xs rounded-sm focus:outline-none"
                      >
                        Edit
                      </nuxt-link>
                      <nuxt-link
                        :to="`/users/review/${review.id}/details`"
                        class="py-2 px-3 lg:mt-0 shadow-md bg-megenta-color hover:bg-megenta-color-hover text-white font-semibold rounded-sm focus:outline-none text-xs"
                      >
                        View
                      </nuxt-link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pt-6 block sm:hidden md:block lg:hidden">
            <div class="flex justify-between">
              <div
                class="text-xs sm:text-sm text-gray-400 font-normal text-left lg:pl-5"
              >
                Order ID #
              </div>
              <div
                class="text-xs sm:text-sm text-gray-400 font-normal text-left"
              >
                Service Type
              </div>
              <div
                class="text-xs sm:text-sm text-gray-400 font-normal text-left"
              >
                Rating
              </div>
              <div
                class="text-xs sm:text-sm text-gray-400 font-normal text-left pr-5"
              >
                Date
              </div>
            </div>
            <div
              v-for="review in reviews"
              :key="review.id"
              class="pb-5 pt-5 border-b"
            >
              <div class="flex items-center justify-between">
                <div
                  class="lg:flex items-center font-medium text-xs sm:text-sm md:text-base"
                >
                  <nuxt-link
                    :to="`/users/booking/${review.order_id}/details`"
                    class="text-xs sm:text-sm font-medium underline"
                    >#{{ review.order_id_show }}</nuxt-link
                  >
                </div>
                <div
                  class="lg:flex items-center font-medium text-xs sm:text-sm"
                >
                  <div class="">
                    <h2 class="text-sm md:text-base font-semibold">
                      {{ review.title }}
                    </h2>
                    <p
                      class="text-sm font-normal text-gray-400 hidden sm:block md:hidden lg:block"
                    >
                      {{ review.details }}
                    </p>
                  </div>
                </div>
                <div>
                  <p class="text-xs sm:text-sm font-medium">
                    {{ review.rating }}
                  </p>
                </div>
                <div>
                  <p class="text-xs sm:text-sm font-medium">
                    {{ review.date }}
                  </p>
                </div>
              </div>
              <div class="pt-5">
                <nuxt-link
                  :to="`/users/review/${review.id}/edit`"
                  class="block text-center mb-2 py-2 px-3 shadow-md bg-brand-color hover:bg-brand-color-hover text-white font-semibold text-xs rounded-sm focus:outline-none"
                >
                  Edit
                </nuxt-link>
                <nuxt-link
                  :to="`/users/review/${review.id}/details`"
                  class="block text-center py-2 px-3 lg:mt-0 shadow-md bg-megenta-color hover:bg-megenta-color-hover text-white font-semibold rounded-sm focus:outline-none text-xs"
                >
                  View
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="w-full pt-10">
          <div class="flex w-full justify-center">
            <img loading="lazy" src="/images/no-result.png" alt="no resutl" />
          </div>
          <h1 class="text-center py-10 text-xl text-gray-800 font-medium">
            No Reviews found yet!
          </h1>
        </div>
      </div>

      <div v-else class="loader-parent mt-16">
        <div class="loader"></div>
      </div>
      <div class="py-5 flex justify-center" v-show="isReview">
        <Paginator @NextData="NextData" :datas.sync="review_paginator" />
      </div>
    </section>
  </div>
</template>

<script>
import Paginator from "@/components/Paginator";
import StatusBox from "@/components/StatusBox";
export default {
  middleware: ["auth", "checkSetting"],
  layout: "users",
  name: "Reviews",
  components: {
    Paginator,
    StatusBox,
  },
  head() {
    return {
      title: "Review | Home Theater Proz",
    };
  },
  computed: {
    reviews() {
      return this.$store.state.users.review.reviews.data;
    },
    review_paginator() {
      return this.$store.state.users.review.reviews;
    },
    loading() {
      return this.$store.state.loading.loading;
    },
    isReview() {
      if (this.reviews && this.reviews.length > 0) {
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
    async NextData(pageNum) {
      this.$router.push("?page=" + pageNum);
      await this.$store.dispatch("users/review/fetchReviewPage", {
        id: this.$auth.user.id,
        pageNum,
      });
    },
    async loaded() {
      await this.$store.dispatch(
        "users/review/fetchReview",
        this.$auth.user.id
      );
    },
    async loadedwithparam(param) {
      await this.$store.dispatch("users/review/fetchReviewPage", {
        id: this.$auth.user.id,
        param,
      });
    },
  },
  async created() {
    if (!this.authenticated) {
      this.$router.push("login?redirect=/users/booking/reviews");
    }
    this.$store.dispatch("users/dashboard/fetchAllRequiredDatas");
    let param = this.$router.history.current.query.page;
    if (typeof param !== "undefined") {
      this.loadedwithparam(param);
    } else {
      this.loaded();
    }
  },
};
</script>

