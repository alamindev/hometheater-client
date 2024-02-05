<template>
  <div
    class="flex flex-wrap items-center py-4 lg:px-16 px-5 border-b border-gray-200"
  >
    <div class="flex-1 flex justify-start items-center">
      <figure class="hidden md:block">
        <nuxt-img
          quality="50"
          loading="lazy"
          src="/images/bar-header.svg"
          class="pr-6"
          alt="header-bar"
        />
      </figure>
      <nuxt-link to="/" class="text-xl flex items-center">
        <figure class="pr-2">
          <nuxt-img
            quality="50"
            loading="lazy"
            class="h-8 w-8"
            v-if="setting.site_logo"
            :src="imgurl + 'storage' + setting.site_logo"
            alt="client-affiliation"
          />
        </figure>
        <span class="hidden md:block font-rubik text-gray-800 text-lg">{{
          setting.site_title
        }}</span>
      </nuxt-link>
    </div>
    <div v-if="!authenticated" class="flex justify-start items-center">
      <nuxt-link
        class="px-6 sm:px-10 py-1 sm:py-2 inline-block rounded-full border-2 border-brand-color text-white bg-brand-color hover:bg-brand-color-hover"
        to="/login"
        >Log in</nuxt-link
      >
      <nuxt-link
        class="ml-3 sm:ml-5 px-6 sm:px-10 py-1 sm:py-2 inline-block rounded-full border-2 text-brand-color border-brand-color hover:bg-brand-color hover:text-white"
        to="/register"
        >Sign up</nuxt-link
      >
    </div>
    <div v-if="authenticated" class="flex items-center">
      <div
        class="admin-profie flex md:pl-5 items-center cursor-pointer relative"
        @click="menuClick"
        v-click-outside="hide"
      >
        <authImg />
        <div
          class="absolute top-0 right-0 sm:-right-6 mt-12 bg-white shadow rounded-lg z-100"
          v-if="dropdown"
        >
          <div class="w-48">
            <nuxt-link
              :to="`/users/${user.id}/profile`"
              class="flex items-center hover:bg-gray-200 hover:text-brand-color text-gray-500 py-3 px-5"
            >
              <i class="far fa-user text-xl pr-2"></i>
              <span class="">Profile</span>
            </nuxt-link>
            <nuxt-link
              :to="`/users/dashboard`"
              class="flex items-center hover:bg-gray-200 hover:text-brand-color text-gray-500 py-3 px-5"
            >
              <i class="fas fa-tachometer-alt text-xl pr-2"></i>
              <span class="">Dashboard</span>
            </nuxt-link>
            <a
              href="#"
              @click.prevent="signOut"
              class="flex items-center hover:bg-gray-200 hover:text-brand-color text-gray-500 py-3 px-5"
            >
              <i class="fas fa-sign-out-alt text-xl pr-2"></i>
              <span class="">Logout</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authImg from "@/components/auth/authImg";
export default {
  components: {
    authImg,
  },
  data() {
    return {
      dropdown: false,
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    setting() {
      return this.$store.state.setting;
    },
  },
  methods: {
    toggle() {
      this.$emit("clicked");
    },
    menuClick() {
      this.dropdown = !this.dropdown;
    },
    hide() {
      this.dropdown = false;
    },
    signOut() {
      this.$auth.logout();
    },
  },
};
</script>

<style>
</style>
