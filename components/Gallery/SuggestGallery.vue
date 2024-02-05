<template>
  <div class="grid" :class="styles">
    <figure
      class="cursor-pointer"
      v-for="img in images"
      :key="img.id"
      @click="viewImage(img.slug)"
    >
      <nuxt-img
        quality="50"
        loading="lazy"
        class="w-full object-cover rounded-lg h-20"
        alt="gellary-img"
        :src="imgurl + 'storage/' + img.url"
      />
    </figure>
  </div>
</template>

<script>
export default {
  props: ["styles"],
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    images() {
      return this.$store.state.gallery.suggestGalleries;
    },
  },
  methods: {
    viewImage(slug) {
      this.$store.dispatch("gallery/fetchImage", slug);
      const url = this.getAbsoluteUrl({
        params: { slug: slug },
      });
      history.replaceState({}, null, url);
      this.$store.dispatch("gallery/suggestGalleries", slug);
    },
    getAbsoluteUrl(to) {
      const path = $nuxt.$router.resolve(to).href;
      return window.location.origin + path;
    },
  },
};
</script>

<style>
</style>