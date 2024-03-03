<template>
  <header class="pt-5 pb-10 px-4 sm:px-0">
    <div class="flex justify-between items-center">
      <h1 class="text-gray-700 text-base flex items-center">
        <button
          class="block lg:hidden bars--click"
          type="button"
          @click="toggle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="w-5 h-5 text-brand-gray"
          >
            <path
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </button>

        <span
          class="leading-none text-sm sm:text-lg flex capitalize font-bold sm:pl-2 pl-1 pr-3 sm:pr-5"
        >
          {{ matchHeaderVal }}</span
        >
      </h1>
      <div class="flex items-center">
        <div class="right-area flex items-center">
          <Search />
        </div>
        <div class="max-[1440px]:block hidden">
          <button type="button" @click="toggleRightSidebar">
            <svg
              class="w-5 h-5 text-brand-gray"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Search from "@/components/Search";
import authImg from "@/components/auth/authImg";
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
<style   scoped>
@media (max-width: 1170px) {
  .custom-click {
    display: block;
  }
}
</style>
