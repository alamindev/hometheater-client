<template>
  <div class="user--review-edit">
    <section class="bg-white shadow-lg p-5 mt-5 rounded-md">
      <div
        class="flex items-center justify-between pb-5 border-b border-gray-200"
      >
        <h2 class="text-left text-2xl text-dark-sm font-bold">Edit Review</h2>
        <button
          @click="$router.go(-1)"
          class="border-0 py-2 px-5 bg-brand-color hover:bg-brand-color-hover rounded-sm text-white"
        >
          Back
        </button>
      </div>
      <client-only>
        <div class="pt-6" v-if="!loading">
          <form @submit.prevent="submitRating()">
            <div class="pt-6 pb-12">
              <div class="flex pb-4 items-center">
                <h3 class="text-base pr-2">Rating:</h3>
                <star-rating
                  v-bind:max-rating="5"
                  v-model="rating"
                  v-bind:star-size="25"
                  v-bind:increment="0.5"
                  :show-rating="false"
                  :rating="Number(rating)"
                >
                </star-rating>
              </div>
              <div class="">
                <textarea
                  class="w-full border-1 border-gray-300 rounded-md"
                  name=""
                  id=""
                  rows="5"
                  placeholder="Write something..."
                  v-model="ratingText"
                ></textarea>
                <div class="py-2">
                  <EditImage :service_id="edit_review.service_id" />
                </div>
                <div class="pt-3">
                  <button
                    type="submit"
                    class="py-3 px-8 bg-brand-color hover:bg-brand-color-hover text-white rounded-md"
                  >
                    <span v-if="!review_loading" class="uppercase">
                      Update</span
                    >
                    <Loader v-if="review_loading" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div v-else class="loader-parent mt-16">
          <div class="loader"></div>
        </div>
      </client-only>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/Loader/Loading-white";
import EditImage from "@/components/Review/EditImage";
export default {
  middleware: ["auth", "checkSetting"],
  layout: "users",
  data() {
    return {
      imgurl: process.env.imgUrl,
      show: "",
      rating: 0,
      ratingText: "",
    };
  },
  components: {
    EditImage,
    Loader,
  },
  computed: {
    edit_review() {
      return this.$store.state.users.review.edit_review;
    },
    loading() {
      return this.$store.state.loading.loading;
    },
    review_loading() {
      return this.$store.state.users.review.review_loading;
    },
  },
  head() {
    return {
      title: "Edit Reiview | Home Theater Proz",
    };
  },
  watch: {
    edit_review: function (old, newval) {
      this.rating = +old.rating;
      this.ratingText = old.details;
    },
  },
  methods: {
    submitRating() {
      let obj = {
        id: this.$route.params.id,
        rating: this.rating,
        text: this.ratingText,
      };
      this.$store.dispatch("users/review/updateReview", obj);
    },
  },
  async created() {
    await this.$store.dispatch(
      "users/review/EditReview",
      this.$route.params.id
    );
  },
};
</script>

