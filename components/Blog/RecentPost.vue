<template>
  <div class="w-full">
    <div class="" v-if="!loading_recent_post">
      <div class="pb-4">
        <h1
          class="pt-5 md:pt-0 text-brand-dark-gray font-semibold"
          :class="heading"
        >
          Recent Blogs And Articles
        </h1>
        <p v-if="subtitle == 'true'" class="text-gray-400 text-sm xl:text-base">
          All the latest juicy topics you can read share and comment
        </p>
      </div>
      <ul class="py-5" :class="wrapper">
        <li
          class="p-3 bg-white mb-4 shadow-md rounded-md"
          v-for="post in posts"
          :key="post.id"
        >
          <div class="flex items-start">
            <img
              :class="image"
              class="rounded-lg object-cover"
              :src="imgurl + 'storage/' + post.photo"
              alt="blog-image"
            />
            <div class="pl-3 lg:pl-5">
              <nuxt-link
                :to="`/blogs/${post.slug}`"
                class="text-base lg:text-lg text-brand-dark-gray font-semibold pt-3 sm:pt-0 md:pt-3 lg:pt-0"
              >
                <h2 class="text-[1.1em]">{{ post.title }}</h2>
              </nuxt-link>
              <p
                class="font-roboto text-sm lg:text-base text-brand-gray leading-5 py-2"
              >
                {{ post.details }}
              </p>
              <span class="text-brand-color text-sm">{{ post.date }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <RecentLoading v-else />
  </div>
</template>

<script>
import RecentLoading from "@/components/Blog/RecentLoading";
export default {
  props: ["isReadmore", "subtitle", "heading", "image", "wrapper"],
  components: {
    RecentLoading,
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    posts() {
      return this.$store.state.blog.recent_posts;
    },
    loading_recent_post() {
      return this.$store.state.blog.loading_recent_post;
    },
  },
};
</script>

<style>
</style>
