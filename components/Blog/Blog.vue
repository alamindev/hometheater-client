<template>
  <div class="lg:pl-5">
    <div class="relative shadow-lg">
      <img
        class="rounded-lg w-full object-cover"
        :src="imgurl + 'storage/' + post.photo"
        alt="blog-image"
      />
      <div
        class="absolute right-0 bottom-0 bg-brand-color p-2 rounded-tl-lg rounded-tr-md mb-4"
      >
        <div class="flex">
          <img src="/images/calendar.svg" alt="calendar" />
          <span class="text-white pl-2">{{ post.date }}</span>
        </div>
      </div>
    </div>
    <div
      class="bg-white p-5 -mt-4 relative rounded-tl-lg rounded-bl rounded-br shadow-lg"
    >
      <div class="pt-5">
        <nuxt-link
          :to="`/blogs/${post.slug}`"
          class="inline-block pb-4 text-lg text-brand-dark-gray font-semibold hover:underline"
        >
          <h2>{{ post.title }}</h2>
        </nuxt-link>
        <p class="font-roboto text-base text-brand-gray leading-relaxed">
          {{ post.details }}
        </p>
      </div>
      <div class="flex justify-between">
        <div v-if="isReadmore == 'true'" class="flex items-center">
          <span class="font-roboto text-brand-dark-gray pr-3">Read more</span>
          <img src="/images/right-angle.svg" alt="right-angle" />
        </div>
        <ShareBlogLike :post="post" position="left-0" />
      </div>
    </div>
  </div>
</template>

<script>
import ShareBlogLike from "@/components/Blog/ShareBlogLike";
export default {
  props: ["isReadmore", "post"],
  components: {
    ShareBlogLike,
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
};
</script>

<style>
</style>
