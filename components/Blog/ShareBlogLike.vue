<template>
  <ul class="flex pt-5">
    <li class="sm:pr-3">
      <div
        class="flex flex-col items-center cursor-pointer"
        @click="LikeDislike(post.id)"
      >
        <i
          :class="is_liked ? 'text-red-light' : ''"
          class="fas fa-heart text-2xl text-gray-300"
        ></i>
      </div>
    </li>
    <li class="pl-3">
      <div class="relative" v-click-outside="closeSocial">
        <div
          class="absolute bg-white shadow-md p-5 top-8"
          :class="position"
          v-if="is_show"
        >
          <ul class="w-48">
            <li class="pb-4">
              <ShareNetwork
                network="facebook"
                :url="main_domain + 'blogs/' + post.slug"
                :title="post.title"
                :description="post.details"
                :hashtags="post.tags"
              >
                <p
                  class="text-base font-normal hover:text-brand-color-hover text-gray-500"
                >
                  <i class="fab fa-facebook-f pr-2"></i> Share on Facebook
                </p>
              </ShareNetwork>
            </li>
            <li class="">
              <ShareNetwork
                network="twitter"
                :url="main_domain + 'blogs/' + post.slug"
                :title="post.title"
                :description="post.details"
                :hashtags="post.tags"
              >
                <p
                  class="text-base font-normal hover:text-brand-color-hover text-gray-500"
                >
                  <i class="fab fa-twitter pr-2"></i> Share on Twitter
                </p>
              </ShareNetwork>
            </li>
          </ul>
        </div>
        <div
          class="flex flex-col items-center cursor-pointer"
          @click="SocialShare"
        >
          <i class="fas fa-share-alt text-2xl cursor-pointer text-gray-300"></i>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["post", "position"],
  data() {
    return {
      is_show: false,
      main_domain: process.env.mainDomain,
      is_liked: false,
    };
  },
  computed: {
    likes() {
      return this.$store.state.blog.likes;
    },
  },
  watch: {
    likes(val) {
      if (this.authenticated) {
        let vm = this;
        let bool = val.some(function (obj) {
          return obj.user_id === vm.$auth.user.id && obj.liked == true;
        });
        this.is_liked = bool;
      }
    },
  },
  methods: {
    LikeDislike(post_id) {
      if (!this.authenticated) {
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      } else {
        let data = {
          post_id,
          user_id: this.$auth.user.id,
        };
        this.$store.dispatch("blog/submitLiked", data);
      }
    },
    closeSocial() {
      this.is_show = false;
    },
    Is_liked() {
      if (this.authenticated) {
        let vm = this;
        let bool = this.$store.state.blog.likes
          ? this.$store.state.blog.likes.some(function (obj) {
              return obj.user_id === vm.$auth.user.id && obj.liked == true;
            })
          : false;
        this.is_liked = bool;
      }
    },
    SocialShare() {
      this.is_show = !this.is_show;
    },
  },
  created() {
    this.Is_liked();
  },
};
</script>

<style>
</style>