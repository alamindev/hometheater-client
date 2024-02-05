<template>
  <section class="py-5 md:py-20 relative">
    <div class="px-4 lg:px-16 relative">
      <div
        v-if="review_header"
        class="mx-auto w-full md:w-10/12 lg:w-7/12 xl:w-5/12"
      >
        <h3
          v-if="review_header.title"
          class="w-full font-semibold inline-block text-2xl sm:text-3xl md:text-4xl lg:text-brand-header text-center pb-5 text-brand-dark"
        >
          {{ review_header.title }}
        </h3>
        <p
          v-if="review_header.details"
          class="font-rubik text-brand-sub-header text-center text-brand-gray leading-relaxed"
        >
          {{ review_header.details }}
        </p>
      </div>
    </div>
    <div
      class="container mx-auto px-4 lg:px-16 py-16"
      v-if="reviews.length > 0"
    >
      <div class="w-full">
        <div class="swiper" v-swiper:mySwiper="SliderOptionRating">
          <div class="swiper-wrapper">
            <div
              v-for="review in reviews"
              :key="review.id"
              class="py-12 flex justify-center items-center swiper-slide"
            >
              <div class="w-full md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
                <div class="flex justify-center items-center pb-3">
                  <nuxt-img
                    quality="30"
                    loading="lazy"
                    v-if="review.image"
                    :src="imgurl + 'storage' + review.image"
                    class="rounded-full w-28 h-28 object-cover"
                    alt="user image"
                  />
                </div>
                <h4 class="text-2xl text-center pb-4 text-brand-dark">
                  {{ review.user_name }}
                </h4>
                <h5 class="text-2xl text-center pb-4 text-brand-dark">
                  {{ review.location }}
                </h5>
                <div class="flex pt-8">
                  <div class="flex justify-center items-start flex-shrink-0">
                    <nuxt-img
                      quality="50"
                      loading="lazy"
                      class="w-8"
                      src="/images/top-comma.svg"
                      alt="top-comma"
                    />
                  </div>
                  <div class="">
                    <p class="font-rubik text-base px-3 text-brand-gray">
                      {{ review.text }}
                    </p>
                    <div class="flex items-center pt-4">
                      <h6
                        class="text-lg px-3 text-brand-gray flex items-center"
                      >
                        <span class="pr-2">Rating:</span>
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
                      </h6>
                    </div>
                  </div>
                  <div class="flex justify-center items-end flex-shrink-0">
                    <nuxt-img
                      quality="50"
                      loading="lazy"
                      src="/images/bottom-comma.svg"
                      class="w-8"
                      alt="bottom-comma"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-40 mx-auto flex justify-between items-center pt-2">
        <button
          type="button"
          @click="onSwiperClickSlidePrevRating"
          class="focus:outline-none w-12 h-12 flex justify-center items-center border border-gray-800 rounded-full"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          type="button"
          @click="onSwiperClickSlideNextRating"
          class="focus:outline-none w-12 h-12 flex justify-center items-center border border-gray-800 rounded-full"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <LazyDot position="right-0 bottom-0 z-40 hidden lg:block" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      imgurl: process.env.imgUrl,
      SliderOptionRating: {
        centeredSlides: false,
        slidesPerView: 1,
        loop: true,
      },
    };
  },
  methods: {
    onSwiperClickSlidePrevRating() {
      this.mySwiper.slidePrev();
    },
    onSwiperClickSlideNextRating() {
      this.mySwiper.slideNext();
    },
  },
  computed: {
    reviews() {
      return this.$store.state.review;
    },
    review_header() {
      return this.$store.state.review_header;
    },
  },
};
</script>

<style>
</style>
