<template>
  <header class="custom-shadow" :class="$nuxt.isOffline ? 'mt-8' : ''">
    <Logo />
    <Menu hidden="hidden lg:flex" />
    <div class="nav-mobile block lg:hidden">
      <div
        class="button_container"
        :class="active == true ? 'active' : ''"
        @click="OpenMenu"
      >
        <span class="top"></span>
        <span class="middle"></span>
        <span class="bottom"></span>
      </div>
      <div class="overlay" :class="active == true ? 'open' : ''" id="overlay">
        <Logo />
        <Menu />
      </div>
    </div>
  </header>
</template>

<script>
import Logo from "@/components/Header/Logo";
import Menu from "@/components/Header/Menu";
export default {
  name: "Header",
  components: {
    Logo,
    Menu,
  },
  data() {
    return {
      active: false,
    };
  },

  watch: {
    $route() {
      this.active = false;
    },
  },

  methods: {
    OpenMenu() {
      this.active = !this.active;
    },
  },
  created() {
    this.$store.dispatch("cart/fetchData");
  },
};
</script>
