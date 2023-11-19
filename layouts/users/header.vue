<template>
  <header class="pt-5 pb-10 px-4 sm:px-0">
    <div class="flex justify-between items-center">
      <h1 class="text-gray-700 text-base flex items-center">
        <span class="block md:hidden bars--click">
          <i
            @click="toggle"
            class="fas fa-bars text-xl text-gray-700 cursor-pointer bars--click"
          ></i>
        </span>
        <span class="leading-none text-lg flex capitalize font-bold pl-2 pr-5">
          {{ matchHeaderVal }}</span
        >
      </h1>
      <div class="flex items-center">
        <div class="right-area flex items-center">
          <Search />
        </div>
        <div class="custom-click hidden">
          <i
            @click="toggleRightSidebar"
            class="fas fa-bars text-xl text-gray-700 cursor-pointer bars--click"
          ></i>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import authImg from "@/components/auth/authImg";
import Search from "@/components/Search";
export default {
  name: "Header",
  components: {
    authImg,
    Search,
  },
  data() {
    return {
      dropdown: false,
    };
  },
  computed: {
    matchHeaderVal() {
      let array = this.$route.fullPath.split("/");
      let newarr = array.map((el) => {
        return el.split("?")[0];
      });
      let buildArr = ["dashboard", "booking", "reviews", "settings"];
      return buildArr.filter((element) => newarr.includes(element)).pop();
    },
  },
  methods: {
    toggle() {
      this.$emit("clicked");
    },
    toggleRightSidebar() {
      this.$emit("rightSideClicked");
    },
  },
};
</script>
<style lang="scss" scoped>
@media (max-width: 1170px) {
  .custom-click {
    display: block;
  }
}
</style>
