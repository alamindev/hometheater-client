<template>
  <main v-if="!loading" class="about--page">
    <section class="relative">
      <client-only>
        <swiper ref="carousel" class="swiper" :options="SliderOption">
          <swiper-slide
            class="flex justify-center items-center"
            v-for="slider in sliders"
            :key="slider.id"
          >
            <div
              class="w-full py-48 lg:py-56 xl:py-72 bg-center bg-no-repeat bg-cover px-4 lg:px-16"
              :style="`background-image: linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.7) ),url('${
                imgurl + 'storage' + slider.image
              }');`"
            >
              <div class="container mx-auto">
                <div class="w-full lg:w-10/12 mx-auto">
                  <div class="w-full md:w-8/12 lg:w-7/12 xl:w-6/12">
                    <div>
                      <h1
                        v-if="slider.title"
                        class="text-center md:text-left text-white text-xl sm:text-2xl md:text-3xl leading-relaxed pb-5 font-semibold"
                      >
                        {{ slider.title }}
                      </h1>
                      <p
                        v-if="slider.details"
                        class="text-white text-center md:text-left text-base pb-5"
                      >
                        {{ slider.details }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </client-only>
      <div class="flex justify-center">
        <div
          class="w-64 lg:w-full absolute z-50 bottom-0 lg:bottom-auto lg:top-0 lg:mt-64 lg:px-20 mb-10 md:mb-20 mx-auto flex justify-between items-center pt-2"
        >
          <button
            type="button"
            @click="onSwiperClickSlidePrev"
            class="focus:outline-none w-12 h-12 flex justify-center items-center border border-white rounded-full"
          >
            <i class="fas fa-chevron-left text-white"></i>
          </button>
          <button
            type="button"
            @click="onSwiperClickSlideNext"
            class="focus:outline-none w-12 h-12 flex justify-center items-center border border-white rounded-full"
          >
            <i class="fas fa-chevron-right text-white"></i>
          </button>
        </div>
      </div>
    </section>
    <section class="px-4 lg:px-16 py-20">
      <div class="w-full lg:w-11/12 xl:w-9/12 mx-auto">
        <div class="flex flex-col md:flex-row gap-10 items-start">
          <div class="w-full md:w-5/12  lg:pr-12">
            <img
              class="w-full"
              :src="imgurl + 'storage' + information.image"
              alt="client-affiliation"
            />
          </div>
          <div class="w-full md:w-7/12">
            <h2
              v-if="information.title"
              class="text-2xl text-brand-dark-gray font-semibold"
            >
              {{ information.title }}
            </h2>
            <p
              v-if="information.details"
              class="font-roboto text-base text-brand-gray leading-relaxed py-2"
            >
              {{ information.details }}
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="px-4 lg:px-16 pb-20">
      <h2
        v-if="header.title"
        class="text-2xl text-brand-dark-gray font-semibold text-center pb-5"
      >
        {{ header.title }}
      </h2>
      <ul class="flex justify-center items-start pt-6 flex-wrap">
        <li class="px-8 flex justify-center" v-for="mem in members" :key="mem.id">
          <div class="p-5 px-8 flex justify-center flex-col items-center">
            <img
              class="rounded-full w-24 h-24 object-cover"
              :src="imgurl + 'storage' + mem.image"
              alt="client-affiliation"
            />
            <h2
              v-if="mem.title"
              class="text-lg text-brand-dark-gray font-semibold pb-2 pt-5"
            >
              {{ mem.title }}
            </h2>
            <p
              v-if="mem.details"
              v-html="mem.details"
              class="text-base text-brand-gray"
            ></p>
          </div>
        </li>
      </ul>
    </section>
    <section class="px-4 lg:px-16 py-10 bg-brand-color">
      <ul class="flex justify-center items-center flex-wrap">
        <li class="px-8" v-for="counter in counters" :key="counter.id">
          <div class="p-5">
            <h2
              class="text-3xl text-center text-white font-semibold"
              v-if="counter.title"
            >
              {{ counter.title }}
            </h2>
            <p class="text-base text-center text-white" v-if="counter.details">
              {{ counter.details }}
            </p>
          </div>
        </li>
      </ul>
    </section>
    <section class="px-4 lg:px-16 pt-20 pb-16 relative">
      <div class="absolute left-0 top-0 mt-20 -ml-64">
        <img src="images/about-circle.svg" alt="about" />
      </div>
      <div class="w-full md:w-11/12 lg:w-10/12 xl:w-8/12 mx-auto">
        <h2
          v-if="about.title"
          class="text-2xl text-brand-dark-gray font-semibold text-center pb-5"
        >
          {{ about.title }}
        </h2>
        <div
          v-if="about.details"
          v-html="about.details"
          class="text-base text-brand-gray leading-relaxed pb-4"
        ></div>
        <div class="flex justify-center pt-3">
          <nuxt-link
            to="/contact-us"
            class="px-6 sm:px-10 py-3 inline-block rounded-lg border-2 border-brand-color text-white bg-brand-color hover:bg-brand-color-hover text-xl font-semibold"
            >Contact Us</nuxt-link
          >
        </div>
      </div>
    </section>
  </main>
  <div class="min-h-screen flex items-center" v-else>
    <div class="loader-parent mt-16 mb-20">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import Divider from "@/components/Divider";
import globalMeta from "@/mixins/meta.js";
export default {
  mixins: [globalMeta],
  middleware: ["checkSetting"],
  components: {
    Divider,
  },
  data() {
    return {
      SliderOption: {
        slidesPerView: 1,
        loop: true,
      },
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading.loading;
    },
    meta() {
      let slider = this.$store.state.about.sliders[0];
      if (slider) {
        return {
          title: slider.title,
          description: slider.details,
          image: slider.image,
          keyword: "",
        };
      }
    },
    sliders() {
      return this.$store.state.about.sliders;
    },
    information() {
      return this.$store.state.about.information;
    },
    members() {
      return this.$store.state.about.members;
    },
    counters() {
      return this.$store.state.about.counters;
    },
    about() {
      return this.$store.state.about.about;
    },
    header() {
      return this.$store.state.about.header;
    },
  },
  methods: {
    onSwiperClickSlidePrev() {
      this.$refs.carousel.$swiper.slidePrev();
    },
    onSwiperClickSlideNext() {
      this.$refs.carousel.$swiper.slideNext();
    },
  },
  async fetch() {
    await this.$store.dispatch("about/fetchAboutData");
  },
};
</script>
