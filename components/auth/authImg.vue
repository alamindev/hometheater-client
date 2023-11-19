<template>
  <div class="flex items-center">
    <h2 class="text-gray-700 text-base pr-2 hidden md:block">
      {{ user.name }}
    </h2>
    <img
      v-if="user.photo === null"
      src="/images/dashboard-img-1.svg"
      width="35"
      height="35"
      alt="admin image"
    />
    <img
      v-if="user.photo"
      :src="user.photo.includes('http') ? user.photo : imgurl + user.photo"
      class="rounded-full"
      width="35"
      height="35"
      alt="admin image"
    />
  </div>
</template>

<script>
export default {
  name: 'AuthImage',
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
};
</script>
