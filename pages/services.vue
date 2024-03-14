<template>
  <main class="service--page" v-if="!loading">
    <section class="py-8 sm:py-12 relative px-4 lg:px-16 custom-gradient">
      <div class="container mx-auto" v-if="header">
        <div
          class="flex flex-col-reverse lg:flex-row items-center relative z-40"
        >
          <div class="lg:w-6/12 lg:pr-10 xl:pl-16 xl:pr-24">
            <div class="text-center sm:text-left">
              <h1
                v-if="header.service_title"
                class="text-2xl sm:text-3xl lg:text-4xl xl:text-brand-header py-3 text-center lg:text-left text-dark-sm leading-relaxed font-semibold"
              >
                {{ header.service_title }}
              </h1>
              <p
                v-if="header.service_details"
                class="text-brand-sub-header font-roboto text-brand-gray py-3 text-center lg:text-left leading-relaxed"
              >
                {{ header.service_details }}
              </p>
              <div class="flex justify-center lg:justify-start pb-5">
                <nuxt-link
                  v-if="header.service_btn_text"
                  :to="`/${header.service_btn_link}`"
                  class="inline-flex items-center w-auto py-3 px-5 text-white text-xl bg-brand-color hover:bg-brand-color-hover rounded-md mt-5"
                >
                  {{ header.service_btn_text }}
                  <i class="fas fa-arrow-alt-circle-right pl-3 text-2xl"></i
                ></nuxt-link>
              </div>
            </div>
          </div>
          <div class="lg:w-6/12">
            <div
              class="w-full flex items-center justify-end lg:pl-20 pt-5 pb-10 lg:pb-0 lg:pt-0"
            >
              <img
                loading="lazy"
                v-if="header.image"
                class="object-cover w-full px-20 sm:px-0"
                :src="imgurl + 'storage' + header.image"
                :alt="header.service_title"
              />
              <img
                loading="lazy"
                v-else
                class="w-full"
                src="/images/service-image-header.png"
                alt="services-img.png"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-center -mt-lg-5">
          <div
            class="flex flex-col items-center cursor-pointer"
            v-scroll-to="'#element'"
          >
            <i
              class="animate-bounce fas fa-angle-double-down text-xl text-gray-500"
            ></i>
            <p class="text-gray-500">Scroll</p>
          </div>
        </div>
      </div>
    </section>
    <section class="px-4 lg:px-16 py-16 relative" id="element">
      <div class="container mx-auto font-roboto relative z-30">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 xl:gap-20"
        >
          <div
            v-for="category in categories"
            :key="category.id"
            class="shadow-md rounded-md overflow-hidden bg-white"
          >
            <div class="py-4 px-8 flex items-center bg-light-20 font-rubik">
              <div class="pr-2 sm:pr-5">
                <i
                  v-if="category.type == 0"
                  class="text-2xl text-center text-gray-700"
                  :class="category.icon"
                ></i>
                <img
                  loading="lazy"
                  v-if="category.type == 1 && category.photo"
                  :src="imgurl + 'storage/' + category.photo"
                  alt="image"
                  class="w-10 h-10 lg:w-8 lg:h-8 object-cover rounded-md"
                />
              </div>
              <h2 class="font-medium text-xl sm:text-2xl text-dark-sm">
                {{ category.name }}
              </h2>
            </div>
            <div class="p-5 bg-white">
              <ul>
                <template v-for="service in category.services">
                  <li
                    class="pb-3 last:pb-0"
                    v-if="service.type === 0"
                    :key="service.id"
                  >
                    <nuxt-link
                      :to="'booking/' + service.slug"
                      class="text-lg text-gray-500 hover:text-brand-color"
                      >{{ service.title }}</nuxt-link
                    >
                  </li>
                </template>
              </ul>
            </div>
          </div>
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
import Circles from "@/components/Circles";
import Dot from "@/components/Dot";
import Heading from "@/components/Heading";
import globalMeta from "@/mixins/meta.js";
export default {
  mixins: [globalMeta],
  middleware: ["checkSetting"],
  components: {
    Heading,
    Dot,
    Circles,
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    meta() {
      return this.$store.state.meta.service;
    },
    loading() {
      return this.$store.state.loading.loading;
    },
    categories() {
      return this.$store.state.service.categories;
    },
    header() {
      return this.$store.state.service.service_header;
    },
  },
  async fetch({ store }) {
    if (store.state.service.categories <= 0) {
      await Promise.all([
        store.dispatch("service/fetchServiceHeader"),
        store.dispatch("service/fetchServiceCategory"),
        store.dispatch("meta/fetchMetaInfo", "service"),
      ]);
    }
  },
};
</script>
