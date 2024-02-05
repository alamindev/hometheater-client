<template>
  <div class="absolute" :class="position">
    <nuxt-img quality="60" loading="lazy" src="/images/dot.svg" alt="dot" />
  </div>
</template>

<script>
export default {
  props: ["position"],
};
</script>

<style>
</style>