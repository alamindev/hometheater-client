<template>
  <section class="custom-gradient relative px-4 lg:px-16">
    <div
      class="flex flex-col-reverse md:flex-row container mx-auto pt-12 pb-12 items-center"
    >
      <div class="md:w-6/12 md:pr-10 xl:pl-16 xl:pr-24">
        <h1
          v-if="topheader"
          class="text-2xl sm:text-3xl lg:text-4xl xl:text-brand-header py-3 text-center md:text-left text-dark-sm leading-relaxed font-semibold"
          v-html="topheader.title"
        ></h1>
        <p
          v-if="topheader"
          class="text-brand-sub-header font-rubik text-brand-gray py-3 text-center md:text-left leading-relaxed"
          v-html="topheader.details"
        ></p>
        <div class="flex justify-center md:block w-full" v-if="topheader">
          <nuxt-link
            v-if="topheader.btn_text"
            :to="`/${topheader.btn_link}`"
            class="mr-2 px-4 lg:px-8 mt-5 py-3 bg-brand-color border-2 border-brand-color text-white rounded-md inline-block font-medium"
          >
            {{ topheader.btn_text }}
          </nuxt-link>
          <a
            :href="topheader.second_btn_link"
            class="px-4 lg:px-8 mt-5 py-3 border-2 border-brand-color uppercase font-medium text-brand-color rounded-md inline-block"
            >{{ topheader.second_btn_text }}</a
          >
        </div>
      </div>
      <div class="md:w-6/12 py-5 md:py-0" v-if="topheader">
        <nuxt-img
          quality="50"
          loading="lazy"
          v-if="topheader.image"
          :src="imgurl + 'storage' + topheader.image"
          class="w-full"
          :alt="topheader.title"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    topheader() {
      return this.$store.state.topheader;
    },
  },
};
</script>

<style>
</style>
