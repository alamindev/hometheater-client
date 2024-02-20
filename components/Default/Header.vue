<template>
  <header class="custom-shadow" :class="$nuxt.isOffline ? 'mt-8' : ''">
    <Logo @openMenu="openMenu" :active="active" />
    <Menu hidden="hidden lg:flex" />
    <div class="nav-mobile block lg:hidden">
      <div class="overlay" :class="active == true ? 'open' : ''" id="overlay">
        <Logo @openMenu="openMenu" :active="active" />
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
      document.body.classList.remove("overflow-hidden");
    },
  },

  methods: {
    openMenu() {
      this.active = !this.active;
      if (this.active !== false) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    },
  },
  created() {
    this.$store.dispatch("cart/fetchData");
  },
};
</script>
