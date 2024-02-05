<template>
  <div class="py-4 border-b border-gray-200 overflow-hidden">
    <perfect-scrollbar ref="scroll">
      <div class="h-48" v-if="comments.length > 0">
        <div
          class="flex py-3 relative border-b delete--hover"
          :key="comment.id"
          v-for="comment in comments"
          v-if="comment.user != null"
        >
          <div class="">
            <nuxt-img
              quality="50"
              loading="lazy"
              :alt="comment.user.username"
              :src="
                comment.user.photo.includes('http')
                  ? comment.user.photo
                  : imgurl + comment.user.photo
              "
              class="w-12 h-12 object-cover rounded-lg"
            />
          </div>
          <div class="pl-3">
            <h3 class="text-xs pb-1 font-semibold text-dark-sm">
              {{ comment.user.username }}
            </h3>
            <p class="text-xs text-gray-400">
              {{ comment.comment }}
            </p>
            <div class="flex justify-start pt-1">
              <p class="text-xs text-gray-400">{{ comment.date }}</p>
            </div>
          </div>
          <div
            class="absolute right-5 top-4 delete--hover-show"
            v-if="is_user(comment.user.id)"
          >
            <i
              @click="deleteComment(comment.id)"
              class="fas fa-trash-alt text-gray-300 hover:text-brand-color cursor-pointer"
            ></i>
          </div>
        </div>
      </div>
      <h2 v-else class="text-gray-400 text-left text-sm">No comment yet!</h2>
    </perfect-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    comments() {
      return this.$store.state.gallery.comments;
    },
    is_user() {
      return (id) => {
        if (id == this.$auth.user.id) {
          return true;
        }
        return false;
      };
    },
  },
  methods: {
    deleteComment(id) {
      this.$store.dispatch("gallery/deleteComment", id);
    },
  },
  mounted() {
    this.$refs.scroll.$el.scrollTop = this.$refs.scroll.$el.scrollHeight;
  },
  updated: function () {
    this.$refs.scroll.$el.scrollTop = this.$refs.scroll.$el.scrollHeight;
  },
};
</script>

<style>
.delete--hover-show {
  display: none;
}
.delete--hover:hover .delete--hover-show {
  display: block;
}
</style>
