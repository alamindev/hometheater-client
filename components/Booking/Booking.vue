<template>
  <div :class="Rootclass">
    <nuxt-link
      v-for="service in services"
      :key="service.id"
      :to="'/booking/' + service.slug"
      class="inline-block"
    >
      <div class="bg-white shadow-lg p-1.5 sm:p-3 rounded-lg">
        <div class="pb-1 sm:pb-3">
          <img
            loading="lazy"
            :src="imgurl + 'storage' + service.image"
            class="w-full image--booking-custom h-48 md:h-64 lg:h-56 xl:h-72 object-cover rounded-lg"
            :alt="service.slug"
          />
        </div>
        <div class="py-2">
          <div class="flex items-center gap-1.5">
            <i
              class="hidden sm:block text-lg md:text-xl lg:text-2xl text-center text-gray-700"
              :class="service.icon"
            ></i>
            <h2
              class="sm:pl-4 text-brand-dark-gray font-semibold font-rubik text-sm sm:text-base truncate"
              :class="title"
            >
              {{ service.title }}
            </h2>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    services: Array,
    Rootclass: String,
    title: String,
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
};
</script>

<style scoped>
@media screen and (max-width: 522px) {
  .image--booking-custom {
    height: 180px;
  }
}
@media screen and (max-width: 440px) {
  .image--booking-custom {
    height: 140px;
  }
}
@media screen and (max-width: 368px) {
  .image--booking-custom {
    height: 120px;
  }
}
</style>
