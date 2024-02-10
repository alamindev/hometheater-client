<template>
  <div class="absolute" :class="position">
    <img loading="lazy" src="/images/dot-blog.svg" alt="dot" />
  </div>
</template>

<script>
export default {
  props: ["position"],
};
</script>

<style>
</style>