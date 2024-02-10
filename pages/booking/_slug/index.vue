<template>
  <section class="sm:px-4 lg:px-16 sm:pt-16 pb-24 bg-custom booking--details">
    <div class="container mx-auto">
      <div class="bg-white shadow-lg px-4 py-8 sm:p-10 rounded-md">
        <div v-show="!loading">
          <div class="flex flex-col lg:flex-row pb-10">
            <div class="lg:w-7/12 lg:pr-5 xl:pr-16">
              <div
                v-if="service.images && service.images.length > 0"
                class="flex flex-col-reverse xl:flex-row"
              >
                <div
                  class="xl:pr-3 flex flex-row flex-wrap xl:flex-col flex-2 pt-5"
                >
                  <figure
                    class="cursor-pointer h-24 w-28 sm:h-20 sm:w -24 xl:h-24 xl:w-28 mb-4 mr-3 xl:mr-0"
                    v-for="image in service.images"
                    @click="ChangeImage(imgurl + 'storage' + image.url)"
                    :key="image.id"
                  >
                    <img
                      loading="lazy"
                      class="h-24 sm:w-28 sm:h-20 w-24 xl:h-24 xl:w-28 object-cover rounded-md shadow-md"
                      :src="imgurl + 'storage' + image.url"
                      :alt="service.title"
                    />
                  </figure>
                </div>
                <figure class="pt-5 flex-1 xl:pl-2">
                  <img
                    loading="lazy"
                    class="w-full effect-change-img rounded-md shadow-md"
                    :src="imgurl + 'storage' + service.image"
                    :alt="service.title"
                  />
                </figure>
              </div>
            </div>
            <div class="lg:w-5/12 pt-6 lg:pt-0">
              <div class="w-full lg:pt-5">
                <h1
                  class="font-rubik text-xl sm:text-2xl lg:text-3xl font-medium text-dark-sm"
                >
                  {{ service.title }}
                </h1>
                <div
                  class="font-rubik flex items-center flex-col sm:flex-row pt-3 pb-10"
                  v-if="service.rating != ''"
                >
                  <div class="pr-1">
                    <client-only>
                      <star-rating
                        v-bind:max-rating="5"
                        v-bind:star-size="20"
                        v-bind:increment="0.5"
                        :show-rating="false"
                        :rating="Number(service.rating)"
                        read-only
                      >
                      </star-rating>
                    </client-only>
                  </div>
                  <div class="flex pt-2">
                    <h2
                      class="text-sm xl:text-lg font-medium text-gray-700 pr-2"
                    >
                      Rated {{ service.rating }} out of 5 star
                    </h2>
                    <button
                      @click="tab = 'review'"
                      v-scroll-to="'#element'"
                      class="underline text-sm xl:text-lg font-medium text-gray-700"
                    >
                      Reviews {{ service.review_count }}
                    </button>
                  </div>
                </div>
                <p
                  v-else
                  class="text-brand-sub-header font-rubik text-dark-sm pt-6 pb-5 font-medium"
                >
                  No reviews yet!
                </p>
                <span
                  class="inline-block text-4xl font-bold text-brand-color pb-2"
                >
                  ${{ service.price }}
                </span>
                <span
                  class="block text-xl text-dark-sm font-medium font-rubik pb-2"
                >
                  Service Includes
                </span>
                <ul class="custom_ul list-inside list-disc">
                  <li
                    class="py-1 text-brand-gray"
                    :key="index"
                    v-for="(service_include, index) in service.service_includes"
                  >
                    {{ service_include }}
                  </li>
                </ul>
                <div
                  class="flex flex-col sm:flex-row lg:flex-col xl:flex-row py-8 sm:justify-between sm:items-start"
                >
                  <div class="flex items-center">
                    <span
                      class="inline-block text-xl text-dark-sm font-medium font-rubik pb-2 pr-5"
                    >
                      Quantity
                    </span>
                    <div class="relative border-none shadow-md rounded-md">
                      <select
                        v-model="item"
                        class="bg-light-5 w-20 text-brand-gray cursor-pointer appearance-none border-none inline-block py-3 pl-3 pr-8 rounded leading-tight focus:ring-0"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </div>
                  </div>
                  <div class="xl:pr-10 lg:w-full xl:w-auto">
                    <div class="xl:pl-5 pt-5 xl:pt-0 lg:pt-5 sm:pt-0 md:pt-0">
                      <button
                        v-if="getDatas.includes(service.id)"
                        @click="addToCart(service)"
                        class="w-full rounded-md py-3 px-5 lg:px-2 xl:px-10 bg-brand-color hover:bg-brand-color-hover focus:outline-none text-white transition-all duration-200 ease-in-out"
                      >
                        Added to Cart
                      </button>
                      <button
                        @click="addToCart(service)"
                        v-else
                        class="w-full rounded-md py-3 px-5 lg:px-2 xl:px-10 bg-brand-color hover:bg-brand-color-hover focus:outline-none text-white transition-all duration-200 ease-in-out"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-5" id="element" ref="postionRef">
            <ul class="flex bg-gray-100 shadow service--custom-tab">
              <li
                @click="toggleTab('description')"
                :class="tab == 'description' ? 'active' : ''"
                class="cursor-pointer px-10 py-5 font-semibold text-lg text-gray-600"
              >
                Description
              </li>
              <li
                :class="tab == 'review' ? 'active' : ''"
                @click="toggleTab('review')"
                class="cursor-pointer px-10 py-5 font-semibold text-lg text-gray-600"
              >
                Reviews
              </li>
            </ul>
            <div
              class="py-6 border-b"
              :class="tab == 'description' ? 'block' : 'hidden'"
            >
              <div
                class="prose !max-w-full font-rubik prose-dark prose-strong:font-semibold prose-b:font-semibold prose-a:font-bold prose-h1:text-brand-dark prose-h2:text-brand-dark prose-h3:text-brand-dark prose-strong:text-brand-dark prose-b:text-brand-dark prose-h4:text-brand-dark prose-h5:text-brand-dark prose-h6:text-brand-dark prose-h1:text-[2rem] prose-h2:text-[1.5rem] prose-h3:text-[1.3rem] prose-h4:text-[1rem] prose-h5:text-[0.8rem] prose-h6:text-[0.7rem] prose-a:text-brand-color prose-a:no-underline hover:prose-a:underline hover:prose-a:text-brand-color-hover pt-5"
                v-html="service.details"
              ></div>
            </div>
            <div
              class="py-6 border-b"
              :class="tab == 'review' ? 'block' : 'hidden'"
            >
              <h2 class="text-2xl pb-4 font-medium text-gray-800 font-rubik">
                Reviews
              </h2>
              <div
                class="w-full p-5"
                :class="reviews.length > 0 ? 'block' : 'hidden'"
              >
                <div class="pt-4">
                  <div
                    class="flex pb-8 last:pb-0"
                    :key="review.id"
                    v-for="review in reviews"
                  >
                    <div class="flex-shrink-0">
                      <nuxt-link
                        target="_blank"
                        :to="`/users/${review.user.id}/profile`"
                      >
                        <img
                          loading="lazy"
                          :alt="review.user.username"
                          :src="
                            review.user.photo.includes('http')
                              ? review.user.photo
                              : imgurl + review.user.photo
                          "
                          class="w-10 h-10 object-cover rounded-full"
                        />
                      </nuxt-link>
                    </div>
                    <div class="pl-5">
                      <h3
                        class="flex items-center text-lg pb-1 font-medium text-dark-sm"
                      >
                        {{ review.user.username }}
                        <div class="pl-2">
                          <client-only>
                            <star-rating
                              v-bind:max-rating="5"
                              :rating="Number(review.rating)"
                              read-only
                              :show-rating="false"
                              v-bind:star-size="20"
                              v-bind:increment="0.5"
                            >
                            </star-rating>
                          </client-only>
                        </div>
                      </h3>
                      <p
                        class="text-brand-sub-header font-rubik text-brand-gray"
                      >
                        {{ review.text }}
                      </p>
                      <div class="py-2">
                        <div class="flex flex-wrap">
                          <div
                            class="pr-2"
                            v-for="image in review.images"
                            :key="image.id"
                          >
                            <figure
                              @click="ViewImage(image.id, review.id)"
                              class="cursor-pointer"
                            >
                              <img
                                loading="lazy"
                                class="w-20 h-20 object-cover rounded-md"
                                :src="image.src"
                                :alt="image.title"
                              />
                            </figure>
                          </div>
                        </div>
                      </div>
                      <p class="text-sm text-gray-400 pt-3">
                        Published {{ review.date }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="pt-5 flex justify-center">
                  <Paginator
                    @NextData="NextData"
                    :datas.sync="review_paginator"
                  />
                </div>
              </div>
              <div
                class="py-5"
                :class="reviews.length > 0 ? 'hidden' : 'block'"
              >
                <div class="w-full flex flex-col items-center md:items-start">
                  <div class="flex items-center star--style pb-2">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                  No reviews yet!
                </div>
              </div>
            </div>
          </div>

          <Suggestion />
        </div>
        <div v-show="loading" class="loader-parent mt-16">
          <div class="loader"></div>
        </div>
      </div>
    </div>
    <modal
      name="ImageModal"
      class="relative"
      :clickToClose="true"
      :scrollable="true"
      height="auto"
      :adaptive="true"
    >
      <div class="flex justify-between p-5 border-b">
        <h2 class="text-xl text-dark-sm font-medium font-rubik">View Image</h2>
        <div @click="HideViewImage" class="cursor-pointer">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="w-full">
        <figure class="w-full">
          <img
            loading="lazy"
            :src="image.src"
            class="w-full"
            :alt="image.title"
          />
        </figure>
        <div class="w-full sm:flex">
          <div class="w-full sm:w-6/12 md:w-8/12">
            <div class="pb-4 pt-2 px-5">
              <h2 class="text-lg text-dark-sm pb-1 font-bold">
                {{ image.title }}
              </h2>
              <p class="text-dark-sm text-sm">{{ image.description }}</p>
            </div>
          </div>
          <div class="w-full sm:w-6/12 md:w-4/12">
            <div class="flex justify-end">
              <div class="pr-3" v-for="img in images" :key="img.id">
                <figure
                  class="py-2 cursor-pointer"
                  @click="ViewImage(img.id, img.review_id)"
                >
                  <img
                    loading="lazy"
                    class="w-16 h-16 object-cover rounded-md"
                    :src="img.src"
                    :alt="img.title"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </section>
</template>

<script>
import Suggestion from "@/components/Suggestion";
import globalMeta from "@/mixins/ServiceMeta.js";
import { mapGetters } from "vuex";
export default {
  mixins: [globalMeta],
  middleware: ["checkSetting"],
  name: "Service-details",
  component: {
    Suggestion,
  },
  data() {
    return {
      item: 1,
      imgurl: process.env.imgUrl,
      index: null,
      images: [],
      image: {},
      tab: "description",
    };
  },
  computed: {
    ...mapGetters({
      getDatas: "cart/getDatas",
    }),
    meta() {
      let service = this.$store.state.booking.service;
      let allreviews = [];
      allreviews = this.$store.state.booking.allreviews.map((el) => {
        return {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: el.rating,
            bestRating: "5",
            datePublished: "2011-04-01",
            reviewBody: el.details,
          },
          author: {
            "@type": "Person",
            name: el.user.first_name + " " + el.user.last_name,
          },
        };
      });
      if (service) {
        return {
          title: service.title,
          description: service.seo_details,
          image: service.image,
          keyword: service.keyword,
          details: service.details,
          rating: service.rating,
          rating_count: service.review_count,
          reviews: allreviews,
          slug: service.slug,
          price: service.price,
        };
      }
    },
    service() {
      return this.$store.state.booking.service;
    },

    loading() {
      return this.$store.state.loading.loading;
    },
    reviews() {
      let reviews = this.$store.state.booking.reviews.data;
      if (reviews) {
        return reviews.map((el) => {
          if (el.images.length > 0) {
            return {
              ...el,
              images: el.images.map((e) => {
                return {
                  ...e,
                  src: process.env.imgUrl + e.image,
                };
              }),
            };
          }
          return el;
        });
      }
      return [];
    },
    review() {
      return this.$store.state.booking.review;
    },
    review_paginator() {
      return this.$store.state.booking.reviews;
    },
  },
  methods: {
    ChangeImage(url) {
      let change_img = document.querySelector(".effect-change-img");
      change_img.setAttribute("src", url);
    },
    ViewImage(image_id, review_id) {
      let review = this.reviews.find((el) => el.id === review_id);
      if (review) {
        this.images = review.images.filter((el) => el.id !== image_id);
        this.image = review.images.find((el) => el.id === image_id);
      }
      this.$modal.show("ImageModal");
    },
    HideViewImage(id) {
      this.$modal.hide("ImageModal");
    },
    addToCart(data) {
      let duration = data.duration * +this.item;
      if (duration <= 8) {
        let ids = [];
        for (let i = 0; i < this.item; i++) {
          ids.push(data.id);
        }
        let newData = {
          ...data,
          price: data.price * +this.item,
          original_price: data.price,
          item: this.item,
          totalHour: data.duration,
          ids: ids,
        };
        this.$store.dispatch("cart/setCartDatas", newData);
      } else {
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title:
            "Service Duration limited! Please checkout selected item first.",
          showConfirmButton: false,
          timer: 10000,
        });
      }
    },
    async NextData(pageNum) {
      await this.$store.dispatch("booking/fetchReviewPage", {
        slug: this.$route.params.slug,
        pageNum,
      });
    },
    toggleTab(val) {
      this.tab = val;
    },
  },
  mounted() {
    if (
      typeof this.$route.query.tab !== "undefined" &&
      this.$route.query.tab === "review"
    ) {
      this.tab = this.$route.query.tab;
      setTimeout(() => {
        var top = this.$refs["postionRef"].offsetTop + 10;
        window.scrollTo(0, top);
      });
    }
    let pageNum = this.$router.history.current.query.page;
    if (typeof pageNum !== "undefined") {
      setTimeout(() => {
        this.tab = "review";
        var top = this.$refs["postionRef"].offsetTop + 10;
        window.scrollTo(0, top);
      });
      this.$store.dispatch("booking/fetchReviewPage", {
        slug: this.$route.params.slug,
        pageNum,
      });
    }
  },
  async fetch({ store, route, error, params, watchQuery }) {
    await store.dispatch("booking/fetchService", params.slug).catch((e) => {
      error({ statusCode: 404, message: "Service not found!" });
    });
  },
};
</script>

<style lang="scss"  scoped>
.bg-custom {
  background: rgb(73, 110, 225);
  background: linear-gradient(
    317deg,
    rgba(73, 110, 225, 0.09) 0%,
    rgba(232, 239, 255, 0.05) 100%
  );
}

.custom_ul span {
  color: #24364a;
}
</style>
<style>
.vm--container.scrollable .vm--modal {
  height: auto !important;
}
.service--custom-tab li {
  transition: 0.3s ease all;
}
.service--custom-tab li:hover {
  background: #24364a;
  color: white;
}
.service--custom-tab li.active {
  background: #24364a;
  color: white;
}
.star--style i {
  color: #24364a8a;
}
</style>
