<template>
  <div>
    <section
      class="bg-white shadow-lg p-5 mt-5 rounded-md user--booking-review"
    >
      <div
        class="flex items-center justify-between pb-5 border-b border-gray-200"
      >
        <h2 class="text-left text-2xl text-dark-sm font-bold">Review</h2>
        <button
          @click="$router.go(-1)"
          class="border-0 py-2 px-5 bg-brand-color hover:bg-brand-color-hover rounded-sm text-white"
        >
          Back
        </button>
      </div>

      <div class="pt-6" v-if="!loading">
        <div
          class=""
          v-for="(service, index) in order_services"
          :key="service.id"
        >
          <div class="" v-if="!service.is_review">
            <h2 class="text-lg font-bold">
              {{ index + 1 }}. {{ service.title }}
              <span class="text-gray-400 text-sm font-normal"
                >(Leave a review for this service)</span
              >
            </h2>
            <form
              @submit.prevent="submitRating(service.id)"
              action-xhr="https://hometheaterproz.com/"
              method="post"
            >
              <div class="pt-6 pb-12">
                <div class="flex pb-4 items-center">
                  <h3 class="text-base pr-2">Rating:</h3>
                  <star-rating
                    v-bind:max-rating="5"
                    v-model="ratingSelected[service.id]"
                    v-bind:star-size="25"
                    v-bind:increment="0.5"
                    :show-rating="false"
                  >
                  </star-rating>
                </div>
                <div class="">
                  <textarea
                    class="w-full border-1 border-gray-300 rounded-md"
                    name=""
                    required
                    minlength="4"
                    id=""
                    rows="5"
                    placeholder="Write something..."
                    v-model="ratingText[service.id]"
                  ></textarea>
                  <div class="" v-if="service.message">
                    <p class="text-red-400">{{ service.message }}</p>
                  </div>
                  <div class="py-2">
                    <AddImage :service_id="service.id" />
                  </div>
                  <div class="pt-5">
                    <button
                      type="submit"
                      class="py-3 px-8 bg-brand-color hover:bg-brand-color-hover text-white rounded-md"
                    >
                      <span v-if="!review_loading" class="uppercase">
                        Submit</span
                      >
                      <Loader v-if="review_loading" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div v-else>
            <h2 class="text-lg font-bold">
              {{ index + 1 }}. {{ service.title }}
              <span class="text-gray-400 text-sm font-normal"
                >( {{ Number(service.rating) }} Start rating )</span
              >
            </h2>
            <div class="pt-6 pb-12">
              <div class="flex pb-4 items-center">
                <h3 class="text-base pr-2">Rating:</h3>
                <star-rating
                  v-bind:max-rating="5"
                  v-bind:star-size="25"
                  v-bind:increment="0.5"
                  :show-rating="false"
                  :rating="Number(service.rating)"
                  read-only
                >
                </star-rating>
              </div>
              <div>
                <p class="text-gray-500">{{ service.text }}</p>
              </div>
              <ShowImg
                v-if="service.images.length > 0"
                :images="service.images"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loader-parent mt-16">
        <div class="loader"></div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/Loader/Loading-white";
import AddImage from "@/components/Review/AddImage";
import ShowImg from "@/components/Review/ShowImg";
export default {
  middleware: ["auth", "checkSetting"],
  layout: "users",
  components: {
    AddImage,
    ShowImg,
    Loader,
  },
  computed: {
    order_services() {
      return this.$store.state.users.review.order_services;
    },
    loading() {
      return this.$store.state.users.review.rating_loading;
    },
    review_loading() {
      return this.$store.state.users.review.review_loading;
    },
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
      show: "",
      ratingSelected: [],
      ratingText: [],
      index: null,
    };
  },
  head() {
    return {
      title: "Booking Review | Home Theater Proz",
    };
  },
  methods: {
    submitRating(id) {
      let vm = this;
      let filtered = Object.keys(this.ratingSelected).map((el) => {
        if (+el === +id) {
          if (this.ratingText[id] && this.ratingText[id].trim().length >= 4) {
            let obj = {
              id: id,
              message: "",
            };
            this.$store.commit("users/review/ERROR_SERVICE_REVIEW", obj);
            return {
              service_id: id,
              order_id: +this.$route.params.id,
              rating: this.ratingSelected[id],
              text: this.ratingText[id],
              user_id: this.$auth.user.id,
            };
          } else {
            let obj = {
              id: id,
              message: "Please select min 4 character!",
            };
            this.$store.commit("users/review/ERROR_SERVICE_REVIEW", obj);
          }
        }
      });
      if (filtered.length > 0) {
        this.$store.dispatch(
          "users/review/SaveRating",
          filtered.filter((el) => el).shift()
        );
      } else {
        this.$swal({
          icon: "error",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          title: "Please select rating and write some text.",
        });
      }
    },
  },
  async fetch() {
    this.$store.commit("users/review/FETCH_DEFAULT_FORM", []);
    await this.$store.dispatch(
      "users/review/OrderServices",
      this.$route.params.id
    );
  },
};
</script>

