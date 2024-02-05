<template>
  <div class="py-5 flex flex-wrap">
    <div
      class="bg-white shadow-lg p-5 w-72 mb-5 mr-5 rounded-lg"
      v-for="image in images"
      :key="image.id"
    >
      <figure>
        <nuxt-img
          quality="50"
          loading="lazy"
          class="w-full object-cover rounded-md"
          :src="imgurl + image.image"
          alt="user image"
        />
      </figure>
      <h2 class="text-lg font-rubik font-semibold pt-3">
        {{ image.title }}
      </h2>
      <p class="text-base pt-2">{{ image.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["images"],
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
};
</script>

<style>
</style>
