<template>
  <div>
    <img
      loading="lazy"
      v-if="user.photo === null"
      src="/images/dashboard-img-1.svg"
      alt="admin image"
      class="object-cover"
      :class="styles"
    />
    <img
      loading="lazy"
      v-if="user.photo"
      :src="user.photo.includes('http') ? user.photo : imgurl + user.photo"
      alt="admin image"
      class="object-cover"
      :class="styles"
    />
  </div>
</template>

<script>
export default {
  props: ["styles"],
  name: "image",
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
};
</script>
