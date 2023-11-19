<template>
  <div class="flex py-3 justify-between px-4">
    <div class="flex flex-col items-center cursor-pointer" @click="LikeDislike">
      <i
        :class="is_liked ? 'text-red-500' : ''"
        class="fas fa-heart text-2xl icon-color pb-1"
      ></i>
      <p>{{ like_counts }}</p>
    </div>
    <div
      class="flex flex-col items-center cursor-pointer"
      @click="focusComment"
    >
      <i class="fas fa-comments text-2xl icon-color pb-1"></i>
      <p>{{ comment_counts }}</p>
    </div>
    <div class="relative" v-click-outside="closeSocial">
      <div
        class="absolute -right-5 bg-white shadow-md p-5 bottom-16"
        v-if="is_show"
      >
        <ul class="w-48">
          <li class="pb-4">
            <ShareNetwork
              @open="open"
              network="facebook"
              :url="main_domain + imgData.slug"
              :title="imgData.title"
              :description="imgData.details"
            >
              <p
                class="
                  text-base
                  font-normal
                  hover:text-brand-color-hover
                  text-gray-500
                "
              >
                <i class="fab fa-facebook-f pr-2"></i> Share on Facebook
              </p>
            </ShareNetwork>
          </li>
          <li class="">
            <ShareNetwork
              @open="open"
              network="twitter"
              :url="main_domain + imgData.slug"
              :title="imgData.title"
              :description="imgData.details"
            >
              <p
                class="
                  text-base
                  font-normal
                  hover:text-brand-color-hover
                  text-gray-500
                "
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
        <i class="fas fa-share text-2xl icon-color pb-1"></i>
        <p>{{ share_counts }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gallery_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      is_show: false,
      is_liked: false,
      main_domain: process.env.mainDomain,
    };
  },
  computed: {
    like_counts() {
      return this.$store.state.gallery.count_likes;
    },
    comment_counts() {
      return this.$store.state.gallery.count_comments;
    },
    share_counts() {
      return this.$store.state.gallery.count_shares;
    },
    imgData() {
      return this.$store.state.gallery.gallery;
    },
  },
  methods: {
    focusComment() {
      if (!this.authenticated) {
        this.$router.push(`/login?redirect=gallery/${this.$route.params.slug}`);
      } else {
        this.$emit("clicked");
      }
    },
    LikeDislike() {
      if (!this.authenticated) {
        this.$router.push(`/login?redirect=gallery/${this.$route.params.slug}`);
      } else {
        let data = {
          gallery_id: this.gallery_id,
          user_id: this.$auth.user.id,
        };
        this.$store.dispatch("gallery/submitLiked", data);
      }
    },
    closeSocial() {
      this.is_show = false;
    },
    Is_liked() {
      if (this.authenticated) {
        let vm = this;
        let bool = this.$store.state.gallery.likes.some(function (obj) {
          return obj.user_id === vm.$auth.user.id && obj.liked == true;
        });
        this.is_liked = bool;
      }
    },
    SocialShare() {
      this.is_show = !this.is_show;
    },
    open() {
      return this.$store.dispatch("gallery/ShareCount", {
        gallery_id: this.gallery_id,
      });
    },
  },
  fetch() {
    this.Is_liked();
  },
  updated() {
    this.Is_liked();
  },
};
</script>

<style>
.icon-color {
  color: #24364a;
}
</style>
