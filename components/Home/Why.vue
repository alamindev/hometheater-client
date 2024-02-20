<template>
  <section class="py-12">
    <div class="px-4 lg:px-16 relative">
      <div v-if="choose_us_header" class="mx-auto w-full md:w-9/12">
        <h3
          v-if="choose_us_header.title"
          class="w-full font-semibold inline-block text-2xl sm:text-3xl md:text-4xl lg:text-brand-header text-center pb-2 sm:pb-5 text-brand-dark"
        >
          {{ choose_us_header.title }}
        </h3>
        <article
          v-if="choose_us_header.details"
          class="font-rubik text-brand-sub-header text-left text-brand-gray leading-relaxed"
          v-html="choose_us_header.details"
        ></article>
      </div>
    </div>
    <div class="px-4 lg:px-16 py-16">
      <div class="container mx-auto">
        <div
          class="grid gap-5 xl:gap-10 grid-cols-1 md:grid-cols-3 custom--grid"
        >
          <div
            v-for="choose in choose_us"
            :key="choose.id"
            class="px-5 md:px-2 lg:px-5 py-10 flex flex-col items-center shadow-md rounded-md border border-gray-100 bg-gray-50"
          >
            <h4
              class="text-xl lg:text-2xl text-dark-sm font-medium text-center pb-5"
              v-if="choose.title"
            >
              {{ choose.title }}
            </h4>
            <div
              class="xl:h-40 py-5 flex items-center text-center justify-center"
              v-if="choose.image"
            >
              <img
                v-lazy-load
                loading="lazy"
                class="xl:h-40 object-cover"
                :src="imgurl + 'storage' + choose.image"
                :alt="choose.title"
                width="150"
                height="150"
              />
            </div>
            <p
              class="font-rubik text-brand-sub-header font-normal text-brand-gray text-center leading-relaxed pt-5"
              v-if="choose.details"
              v-html="choose.details"
            ></p>
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
    choose_us() {
      return this.$store.state.choose_us;
    },
    choose_us_header() {
      return this.$store.state.choose_us_header;
    },
  },
};
</script>

<style>
</style>
