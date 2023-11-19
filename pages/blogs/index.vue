<template>
  <main>
    <section class="custom-gradient px-4 lg:px-16 pt-16 pb-2 mb-20 blog--page">
      <div class="container mx-auto relative">
        <div class="md:flex">
          <div class="w-full md:w-6/12" v-if="post">
            <div class="lg:pl-5 pr-0 md:pr-10 xl:pr-24">
              <Blog v-if="!loading_post" isReadmore="false" :post="post" />
              <div v-else>
                <div>
                  <div class="animate-pulse space-x-4">
                    <div class="py-1">
                      <div class="h-32 my-3 bg-gray-200 rounded w-6/6"></div>
                      <div
                        class="h-4 mt-8 mb-5 bg-gray-200 rounded w-6/6"
                      ></div>
                      <div class="my-5">
                        <div class="h-12 my-3 bg-gray-200 rounded"></div>
                      </div>
                      <div class="flex justify-start my-10">
                        <div class="h-4 bg-gray-200 rounded w-1/6 mr-3"></div>
                        <div class="h-4 bg-gray-200 rounded w-1/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-6/12">
            <RecentPost
              heading="text-2xl lg:text-3xl xl:text-4xl"
              image="lg:w-40 lg:h-40 w-24 h-24"
              wrapper="xl:pr-12"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="pb-16 bg-cover mb-16 px-6 md:px-0">
      <div class="relative px-4 lg:px-16">
        <Heading
          v-if="blog_header"
          :title="blog_header.title ? blog_header.title : ''"
          :text="blog_header.details ? blog_header.details : ''"
          column="w-full md:w-10/12 lg:w-7/12 xl:w-5/12"
          h_class="font-semibold"
        />
        <Dot position="right-0 top-0 mt-10 z-40 hidden lg:block" />
      </div>
      <client-only>
        <div class="container mx-auto relative z-30">
          <ul class="flex flex-wrap blog-category justify-center py-12 px-8">
            <li
              class="mb-3"
              v-for="cate in categories"
              :key="cate.id"
              @click="ChangeCategory(cate.slug)"
            >
              <div
                class="text-xl relative"
                :class="
                  cate.slug == selectedCategory
                    ? 'text-brand-color border-b-2 border-brand-color'
                    : 'text-brand-dark-gray'
                "
              >
                {{ cate.name }}
              </div>
            </li>
          </ul>
          <div
            v-if="!loading"
            class="w-full lg:w-10/12 mx-auto pt-10 relative z-50"
          >
            <div
              v-if="!errors.message"
              class="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-32"
            >
              <Blog
                isReadmore="true"
                v-for="post in posts"
                :key="post.id"
                :post="post"
              />
            </div>
            <div v-else class="w-full">
              <div class="flex w-full justify-center">
                <img src="/images/no-result.png" alt="no resutl" />
              </div>
              <h1 class="text-center py-10 text-xl text-gray-800 font-medium">
                {{ errors.message }}
              </h1>
            </div>
          </div>
          <div v-else class="loader-parent mt-16">
            <div class="loader"></div>
          </div>
          <div class="flex justify-center pt-10 relative">
            <!-- <a
              v-if="!errors.message"
              href="#"
              class="px-6 sm:px-10 py-1 sm:py-2 inline-block rounded-full border-2 border-brand-color text-white bg-brand-color hover:bg-brand-color-hover text-xl font-semibold"
              >View all</a
            > -->
            <Dot position="right-0 top-0 mt-3 z-40 hidden lg:block" />
          </div>
        </div>
      </client-only>
    </section>
  </main>
</template>

<script>
import Heading from "@/components/Heading";
import Blog from "@/components/Blog/Blog";
import RecentPost from "@/components/Blog/RecentPost";
import Dot from "@/components/DotBlog";

import { setCookie, getCookie } from "@/Utils/Cookie";
import blogMeta from "@/mixins/blogMeta.js";

export default {
  mixins: [blogMeta],
  middleware: ["checkSetting"],
  components: {
    Heading,
    Dot,
    Blog,
    RecentPost,
  },
  data() {
    return {
      selectedCategory: "",
    };
  },
  computed: {
    meta() {
      return this.$store.state.meta.blog;
    },
    loading_recent_post() {
      return this.$store.state.blog.loading_recent_post;
    },
    posts() {
      return this.$store.state.blog.posts;
    },
    post() {
      return this.$store.state.blog.post;
    },
    loading_post() {
      return this.$store.state.blog.loading_post;
    },
    categories() {
      let slug = this.$cookies.get("post-slug");
      if (slug === "" || slug === undefined) {
        this.selectedCategory = this.$store.state.blog.categories.length
          ? this.$store.state.blog.categories[0].slug
          : "";
      }
      return this.$store.state.blog.categories;
    },
    loading() {
      return this.$store.state.loading.loading;
    },
    blog_header() {
      return this.$store.state.blog.blog_header;
    },
  },
  methods: {
    ChangeCategory(slug) {
      this.$router.push({
        path: "/blogs",
      });
      this.$store.dispatch("blog/ChangeCate", slug);
      this.selectedCategory = slug;
      setCookie("post-slug", slug);
    },
  },
  mounted() {
    this.selectedCategory = getCookie("post-slug");
  },
  beforeCreate() {
    this.$store.commit("blog/LOADING_POST", true);
    this.$store.commit("blog/LOADING_RECENT_POST", true);
  },
  async created() {
    const getslug = this.$cookies.get("post-slug");
    if (getslug != "" || getslug != undefined) {
      this.$store.dispatch("blog/fetchPostData", getslug);
    } else {
      this.$store.dispatch("blog/fetchPostData");
    }
    await this.$store.dispatch("meta/fetchMetaInfo", "blog");
    await Promise.all([
      this.$store.dispatch("blog/fetchPost"),
      this.$store.dispatch("blog/recentPost"),
    ]);
    await this.$store.dispatch("blog/fetchCategories");
  },
};
</script>
