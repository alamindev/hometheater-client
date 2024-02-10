<template>
  <div class="relative mr-3 md:mr-5 lg:mr-8" :class="classes">
    <div class="flex flex-1 relative">
      <input
        type="text"
        v-model="search"
        autocomplete="off"
        v-on:keyup="getResults"
        placeholder="Search"
        class="border-2 w-full focus:ring-0 lg:w-72 xl:w-98 border-gray-200 py-2 md:py-3 pl-5 pr-10 rounded-lg focus:outline-none text-gray-600"
      />
      <img
        class="absolute right-2 top-1/2 -translate-y-1/2"
        src="/images/search.svg"
        alt="search icon"
      />
    </div>
    <div
      v-if="isShow"
      class="w-full absolute bg-white rounded-md z-50 overflow-hidden shadow-md"
    >
      <ul>
        <li class="pt-3 pb-2 text-gray-500 px-3 font-medium">
          <p><i class="fas fa-briefcase pr-2"></i>Services</p>
          <ul class="sm:pl-4 pt-2" v-if="!error">
            <li
              class="py-2 px-2 hover:bg-gray-100"
              v-if="!searchLoading"
              v-for="data in datas"
              :key="data.id"
            >
              <nuxt-link
                class="flex gap-2 items-center"
                :to="`/booking/${data.slug}`"
                ><img
                  loading="lazy"
                  :src="imgurl + 'storage' + data.image"
                  class="w-8 h-8 rounded-full flex-shrink-0"
                  alt=""
                />
                <p>{{ data.title }}, ${{ data.price }}</p>
              </nuxt-link>
            </li>
            <li v-if="searchLoading">Loading...</li>
          </ul>
          <p v-else class="pl-6 pt-2 text-center text-lg font-medium">
            No Services Found!
          </p>
        </li>
        <li
          @click="SearchBlog('blog')"
          class="py-3 text-gray-500 cursor-pointer px-3 hover:bg-gray-100 font-medium"
        >
          <i class="fas fa-file-alt pr-2"></i>I am searching for blog
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["classes"],
  data() {
    return {
      search: "",
      isShow: false,
      timer: null,
      datas: [],
      error: false,
      searchLoading: true,
      imgurl: process.env.imgUrl,
    };
  },
  watch: {
    search(old, newval) {
      if (old == "") {
        this.isShow = false;
      } else {
        this.isShow = true;
        this.searchLoading = true;
      }
    },
    $route() {
      this.search = "";
    },
  },
  methods: {
    SearchBlog() {
      this.$router.push("/search/blog?search=" + this.search);
    },
    getResults() {
      let vm = this;
      vm.error = false;
      vm.searchLoading = true;

      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.$axios
          .get("/livesearch", { params: { keyword: this.search } })
          .then((res) => {
            vm.datas = res.data.services;
            vm.searchLoading = false;
          })
          .catch((error) => {
            if (error.response.status === 404) {
              vm.error = true;
            }
          });
      }, 800);
    },
  },
};
</script>
</script>

<style>
</style>
