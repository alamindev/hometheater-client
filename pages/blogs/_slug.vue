<template>
  <main>
    <section class="blog-gradient px-4 lg:px-16 pt-16 pb-16 blog--datails">
      <div class="container mx-auto relative">
        <div class="md:flex">
          <div class="md:w-7/12 md:pr-5 lg:pr-8">
            <div class="p-5 rounded-md bg-white">
              <div>
                <h2
                  class="inline-block pb-6 text-lg sm:text-2xl md:text-lg lg:text-xl xl:text-3xl text-brand-dark-gray font-semibold"
                >
                  {{ post.title }}
                </h2>
                <div class="flex justify-between">
                  <div class="flex">
                    <div class="pr-3">
                      <nuxt-img
                        quality="50"
                        loading="lazy"
                        class="w-12 h-12 object-cover rounded-full"
                        :src="imgurl + 'storage/' + post.user.photo"
                        :alt="post.user.username"
                      />
                    </div>
                    <div class="">
                      <h2
                        class="text-left text-sm sm:text-base capitalize text-gray-400"
                      >
                        By {{ post.user.username }}
                      </h2>
                      <p class="text-gray-400 text-xs sm:text-sm">
                        {{ post.category }}, {{ post.date }}
                      </p>
                    </div>
                  </div>
                  <div class="">
                    <ShareBlogLike :post="post" position="right-0" />
                  </div>
                </div>
              </div>
              <div class="py-10">
                <nuxt-img
                  quality="50"
                  loading="lazy"
                  class="rounded-lg w-full object-cover"
                  :src="imgurl + 'storage/' + post.photo"
                  alt="blog-image"
                />
              </div>
              <div
                class="py-10 prose !max-w-full prose-dark prose-strong:font-semibold prose-b:font-semibold prose-a:font-bold prose-h1:text-brand-dark prose-h2:text-brand-dark prose-h3:text-brand-dark prose-strong:text-brand-dark prose-b:text-brand-dark prose-h4:text-brand-dark prose-h5:text-brand-dark prose-h6:text-brand-dark prose-h1:text-[2rem] prose-h2:text-[1.5rem] prose-h3:text-[1.3rem] prose-h4:text-[1rem] prose-h5:text-[0.8rem] prose-h6:text-[0.7rem] prose-a:text-brand-color prose-a:no-underline hover:prose-a:underline hover:prose-a:text-brand-color-hover"
              >
                <div v-html="post.details"></div>
              </div>
            </div>
          </div>
          <div class="md:w-5/12">
            <div class="md:pl-5 lg:pl-10 sticky top-12">
              <RecentPost
                heading="text-xl lg:text-2xl xl:text-3xl"
                image="w-24 h-24 xl:w-32 xl:h-32 "
                wrapper="xl:pr-0"
                subtitle="true"
              />
              <SubscribeBlog />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import RecentPost from "@/components/Blog/RecentPost";
import ShareBlogLike from "@/components/Blog/ShareBlogLike";
import SubscribeBlog from "@/components/Blog/SubscribeBlog";
import globalMeta from "@/mixins/meta.js";
export default {
  mixins: [globalMeta],
  middleware: ["checkSetting"],
  components: {
    RecentPost,
    SubscribeBlog,
    ShareBlogLike,
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    meta() {
      let blog = this.$store.state.blog.post;
      if (blog) {
        return {
          title: blog.title,
          description: blog.seo_details,
          image: blog.photo,
          keyword: blog.keyword,
        };
      }
    },
    post() {
      return this.$store.state.blog.post;
    },
  },
  created() {
    this.$store.dispatch("blog/recentPost");
  },
  async fetch({ store, error, route }) {
    await store
      .dispatch("blog/fetchSinglePost", route.params.slug)
      .catch((e) => {
        error({ statusCode: 404, message: "Post not found!" });
      });
  },
};
</script>

<style>
</style>
