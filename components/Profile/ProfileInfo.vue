<template>
  <div class="rounded shadow-lg p-5 bg-white">
    <div class="flex justify-center border-b pb-3">
      <div class="-mt-36 sm:-mt-24 md:-mt-36">
        <div class="p-2 bg-white shadow-lg rounded-full">
          <img
            loading="lazy"
            class="w-40 h-40 object-cover rounded-full"
            :src="
              user.photo.includes('http') ? user.photo : imgurl + user.photo
            "
            :alt="user.username"
          />
        </div>
        <h2 class="text-center font-bold text-lg pt-3">{{ user.username }}</h2>
        <p class="text-center text-sm text-gray-400">{{ user.nickname }}</p>
      </div>
    </div>

    <div class="flex py-4 justify-between border-b">
      <div class="flex flex-col items-center cursor-pointer">
        <i class="fas fa-heart text-2xl text-dark-sm pb-1"></i>
        <p class="text-dark-sm text-sm">Likes</p>
        <h3 class="text-center text-lg font-semibold text-brand-color">
          {{ user.likes | number_formter }}
        </h3>
      </div>
      <div class="flex flex-col items-center cursor-pointer">
        <i class="fas fa-comments text-2xl text-dark-sm pb-1"></i>
        <p class="text-dark-sm text-sm">Comments</p>
        <h3 class="text-center text-lg font-semibold text-brand-color">
          {{ user.comments | number_formter }}
        </h3>
      </div>
      <div class="flex flex-col items-center cursor-pointer">
        <i class="fab fa-resolving text-2xl text-dark-sm pb-1"></i>
        <p class="text-dark-sm text-sm">Reviews</p>
        <h3 class="text-center text-lg font-semibold text-brand-color">
          {{ user.reviews | number_formter }}
        </h3>
      </div>
    </div>
    <div class="md:flex py-4 border-b items-center">
      <div class="flex items-center">
        <i class="fas fa-map-marker-alt text-brand-color"></i>
        <span class="text-lg font-semibold pl-3 text-dark-sm">Location</span>
      </div>
      <p class="text-base pl-3">{{ user.location }}</p>
    </div>
    <div class="py-4">
      <h2 class="text-lg font-bold pb-3 text-dark-sm">Bio</h2>
      <p class="text-sm text-gray-400">
        {{ user.bio }}
      </p>
    </div>
    <div class="py-3">
      <ul class="flex justify-between flex-wrap">
        <li class="pr-6">
          <a :href="user.facebook" target="_blank"
            ><i class="fab fa-facebook text-3xl text-brand-color"></i
          ></a>
        </li>
        <li class="pr-6">
          <a :href="user.twitter" target="_blank"
            ><i class="fab fa-twitter text-3xl text-brand-color"></i
          ></a>
        </li>
        <li class="pr-6">
          <a :href="user.messenger" target="_blank"
            ><i class="fab fa-facebook-messenger text-3xl text-brand-color"></i
          ></a>
        </li>
        <li>
          <a :href="user.instagram" target="_blank"
            ><i class="fab fa-instagram text-3xl text-brand-color"></i
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
var abbreviate = require("number-abbreviate");
export default {
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    user() {
      return this.$store.state.users.profile.user;
    },
  },
  filters: {
    number_formter: function (value) {
      return abbreviate(value);
    },
  },
};
</script>

<style>
</style>
