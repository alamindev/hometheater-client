<template>
  <div class="absolute" :class="position">
    <img loading="lazy" src="/images/circle.svg" alt="circle" />
  </div>
</template>

<script>
export default {
  props: ["position"],
};
</script> 