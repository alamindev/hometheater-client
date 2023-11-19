<template>
   <section class="py-16">
      <div class="px-4 lg:px-16">
        <div
          v-if="header_service"
          class="mx-auto w-full md:w-10/12 lg:w-7/12 xl:w-5/12"
        >
          <span
            v-if="header_service.home_title"
            class="
              w-full
              font-semibold
              inline-block
              text-2xl
              sm:text-3xl
              md:text-4xl
              lg:text-brand-header
              text-center
              pb-5
              text-brand-dark
            "
          >
            {{ header_service.home_title }}
          </span>
          <p
            v-if="header_service.home_details"
            class="
              font-rubik
              text-brand-sub-header text-center text-brand-gray
              leading-relaxed
            "
          >
            {{ header_service.home_details }}
          </p>
        </div>
      </div>
      <LazyDot position="right-0 mt-10 z-20" />
      <div class="custom-gradient-two relative py-12 px-4 lg:px-16">
        <div class="container mx-auto pb-20 md:pb-40">
          <div class="relative z-30">

          <swiper
            ref="carouselLogo"
            class="swiper"
            :options="SliderOption"
          >
            <swiper-slide
              v-for="service in services"
               :key="service.id"
              class="w-full py-8"
            >
              <nuxt-link
                :to="'/booking/' + service.slug"
                class="inline-block w-full h-full"
              >
                <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div class="pb-1 sm:pb-3 flex justify-center items-center w-full">
                    <img  class="w-full h-44 sm:h-72 lg:h-64 xl:h-72 object-cover" :src="imgurl + 'storage' + service.thumbnail" loading="lazy" :alt="service.title">
                  </div>
                  <div class="pt-2 pb-4 px-3 md:px-4">
                    <div class="">
                      <h2
                        class="
                          text-brand-dark-gray
                          font-semibold
                          text-sm
                          sm:text-lg
                          font-roboto
                        "
                      >
                        {{ service.title }}
                      </h2>
                      <p class="py-1 text-sm lg:text-base font-normal text-dark-light-30">${{ service.price }}</p>
                       <div class="flex gap-2 items-center">
                        <client-only>
                        <star-rating
                          v-bind:max-rating="5"
                          :rating="Number(service.rating)"
                          read-only
                          :show-rating="false"
                          v-bind:star-size="20"
                          v-bind:span="0.5"
                        >
                        </star-rating>
                        </client-only>
                        <p>({{ service.review_count }})</p>
                       </div>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </swiper-slide>
          </swiper>

            <div class="flex justify-center items-center pt-16">
              <nuxt-link
                to="/services"
                class="
                  px-6
                  sm:px-10
                  py-2
                  inline-block
                  rounded-full
                  border-2 border-brand-color
                  text-white
                  bg-brand-color
                  hover:bg-brand-color-hover
                "
                >View all</nuxt-link
              >
            </div>
          </div>
        </div>
        <LazyDivider color="#fff" />
      </div>
    </section>
</template>

<script>
export default {
 data(){
    return{
      imgurl: process.env.imgUrl,
      SliderOption: {
        slidesPerView: 2,
        spaceBetween: 10,
        loop: true,
        autoplay: {
          delay: 3000
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
              slidesPerView: 3,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      },
    }
  },
    methods: {
    onSwiperClickSlidePrev() {
      this.$refs.carousel.$swiper.slidePrev();
    },
    onSwiperClickSlideNext() {
      this.$refs.carousel.$swiper.slideNext();
    },

    },
   computed: {
    services() {
      return this.$store.state.services;
    },
      header_service() {
      return this.$store.state.header_service;
    },
   },
}
</script>

<style>
  .svg svg{
  width: 75px;
  height: 75px;
}

.fontawesome{
  font-size: 50px;
}
@media (min-width: 600px) {
  .svg svg{
  width: 75px;
  height: 75px;
}

.fontawesome{
  font-size: 50px;
}
}

</style>
