<template>
  <section class="custom-gradient relative px-4 lg:px-24">
    <div class="container mx-auto">
      <div
        class="flex flex-col-reverse lg:flex-row pt-4 sm:pt-12 pb-12 lg:py-20 lg:items-center"
      >
        <div class="lg:w-6/12 lg:pr-8 xl:pl-16 xl:pr-24">
          <h1
            v-if="topheader"
            class="text-2xl sm:text-3xl lg:text-4xl xl:text-brand-header py-3 text-center lg:text-left text-dark-sm leading-relaxed font-semibold"
            v-html="topheader.title"
          ></h1>
          <p
            v-if="topheader"
            class="text-brand-sub-header font-rubik text-brand-gray py-3 text-center lg:text-left leading-relaxed"
            v-html="topheader.details"
          ></p>
          <div class="flex justify-center lg:block w-full" v-if="topheader">
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
        <div
          class="lg:w-6/12 py-5 h-full px-5 sm:px-0 lg:py-0 lg:pl-8 xl:pl-12 flex justify-center lg:justify-end"
          v-if="topheader"
        >
          <div
            class="h-[230px] md:h-[400px] lg:h-[500px] w-full max-w-full sm:w-[600px] relative rounded-2xl sm:rounded-3xl overflow-hidden"
          >
            <img
              v-if="topheader.image"
              :src="imgurl + 'storage' + topheader.image"
              class="w-full lg:absolute h-full object-center object-cover inset-0"
              :alt="topheader.title"
            />
          </div>
        </div>
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
