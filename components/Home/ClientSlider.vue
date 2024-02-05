<template>
  <section class="py-12">
    <div class="px-4 lg:px-16 relative">
      <div v-if="affiliation_header" class="mx-auto w-full md:w-9/12 lg:w-8/12">
        <h3
          v-if="affiliation_header.title"
          class="w-full font-semibold inline-block text-2xl sm:text-3xl md:text-4xl lg:text-brand-header text-center pb-5 text-brand-dark"
        >
          {{ affiliation_header.title }}
        </h3>
        <p
          v-if="affiliation_header.details"
          class="font-rubik text-brand-sub-header text-center text-brand-gray leading-relaxed"
        >
          {{ affiliation_header.details }}
        </p>
      </div>
      <LazyDot position="left-0 top-0 -mt-12 z-40" />
    </div>
    <div class="container mx-auto px-4 lg:px-16 py-16">
      <client-only>
        <div class="swiper" v-swiper:mySwiper="SliderOptionLogo">
          <div class="swiper-wrapper">
            <div
              v-for="aff in affiliation"
              :key="aff.id"
              class="py-12 flex justify-center items-center swiper-slide"
            >
              <div
                class="w-40 h-20 shadow-md rounded flex justify-center items-center custom-slider-active"
              >
                <a :href="aff.link ? aff.link : '#'" target="_blank">
                  <nuxt-img
                    quality="30"
                    loading="lazy"
                    class="w-20"
                    :src="imgurl + 'storage' + aff.image"
                    alt="client-affiliation"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </client-only>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      imgurl: process.env.imgUrl,
      SliderOptionLogo: {
        centeredSlides: true,
        slidesPerView: 2,
        loop: true,
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1536: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
        },
      },
    };
  },

  computed: {
    affiliation() {
      return this.$store.state.affiliation;
    },
    affiliation_header() {
      return this.$store.state.affiliation_header;
    },
  },
};
</script>

<style>
</style>
