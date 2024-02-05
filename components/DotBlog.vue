<template>
  <div class="absolute" :class="position">
    <nuxt-img
      quality="50"
      loading="lazy"
      src="/images/dot-blog.svg"
      alt="dot"
    />
  </div>
</template>

<script>
export default {
  props: ["position"],
};
</script>

<style>
</style>