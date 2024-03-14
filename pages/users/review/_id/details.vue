<template>
  <div class="user--booking-review-details">
    <section class="bg-white shadow-lg p-5 mt-5 rounded-md">
      <div
        class="flex items-center justify-between pb-5 border-b border-gray-200"
      >
        <h2 class="text-left text-2xl text-dark-sm font-bold">
          Review Details
        </h2>
        <button
          @click="$router.go(-1)"
          class="border-0 py-2 px-5 bg-brand-color hover:bg-brand-color-hover rounded-sm text-white"
        >
          Back
        </button>
      </div>
      <div class="pt-6 pb-12">
        <nuxt-link
          v-if="review.service"
          target="_blank"
          :to="`/booking/${review.service.slug}`"
          class="text-lg font-bold pb-5 inline-block"
        >
          <span class="hover:underline">{{ review.service.title }}</span>
          <span class="text-gray-400 text-sm font-normal"
            >( {{ Number(review.rating) }} Star rating )</span
          >
        </nuxt-link>
        <div class="flex pb-4 items-center">
          <h3 class="text-base pr-2">Rating:</h3>
          <client-only>
            <star-rating
              v-bind:max-rating="5"
              v-bind:star-size="25"
              v-bind:increment="0.5"
              :show-rating="false"
              :rating="Number(review.rating)"
              read-only
            >
            </star-rating>
          </client-only>
        </div>
        <div>
          <p class="text-gray-500">{{ review.details }}</p>
        </div>
        <ShowImg
          v-if="review.review_images.length > 0"
          :images="review.review_images"
        />
      </div>
    </section>
  </div>
</template>

<script>
import ShowImg from "@/components/Review/ShowImg";
export default {
  middleware: ["auth", "checkSetting"],
  layout: "users",
  name: "DetailsReview",
  components: {
    ShowImg,
  },
  computed: {
    review() {
      return this.$store.state.users.review.review;
    },
  },
  head() {
    return {
      title: "Details Review | Home Theater Proz",
    };
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
      show: "",
    };
  },
  async asyncData({ store, error, route }) {
    await store.dispatch("users/review/ReviewDtails", route.params.id);
  },
};
</script>

