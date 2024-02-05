<template>
  <div class="absolute" :class="position">
    <nuxt-img
      quality="50"
      loading="lazy"
      src="/images/circle.svg"
      alt="circle"
    />
  </div>
</template>

<script>
export default {
  props: ["position"],
};
</script> 