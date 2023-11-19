<template>
  <div class="">
    <Countable @clicked="focusComment" :gallery_id="gallery_id" />
    <form @submit.prevent="SubmitComment" v-if="authenticated" class="relative">
      <div class="w-full flex pb-5">
        <div class="w-full">
          <input
            type="text"
            v-model="comment"
            ref="comment"
            class="w-full border border-gray-300 focus:outline-none py-2 px-4 text-gray-400 rounded-l-lg"
          />
        </div>
        <button
          type="submit"
          :disabled="!isDisable"
          class="bg-brand-color px-5 rounded-r-lg text-3xl leading-6 text-white hover:bg-brand-color-hover"
        >
          >
        </button>
      </div>
      <div
        v-if="error"
        class="w-full text-xs text-red-700 absolute bottom-0 pl-2"
      >
        Input at least 4 characters!
      </div>
    </form>
  </div>
</template>

<script>
import Countable from "@/components/Gallery/Countable";
export default {
  props: {
    gallery_id: {
      type: Number,
      required: true,
    },
  },
  components: {
    Countable,
  },
  data() {
    return {
      comment: "",
      error: false,
    };
  },
  computed: {
    isDisable() {
      return this.comment.length > 0;
    },
  },
  watch: {
    comment: function (val) {
      if (val.length > 3) this.error = false;
    },
  },
  methods: {
    focusComment() {
      this.$refs.comment.focus();
    },
    SubmitComment() {
      if (this.comment.length > 3) {
        let data = {
          comment: this.comment,
          gallery_id: this.gallery_id,
          user_id: this.$auth.user.id,
        };
        this.$store.dispatch("gallery/submitComment", data).then((e) => {
          this.comment = "";
        });
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<style>
</style>
