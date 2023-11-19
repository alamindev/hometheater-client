<template>
  <div class="absolute" :class="position">
    <img src="/images/dot-blog.svg" alt="dot" />
  </div>
</template>

<script>
export default {
  props: ["position"],
};
</script>

<style>
</style>