<template>
  <div class="w-full md:w-2/12 lg:w-3/12 md:pr-8">
    <ul
      class="bg-white rounded-md shadow pl-5 xl:pl-10 pt-12 pr-5 pb-5 hidden md:block sticky top-16"
    >
      <li
        class="pb-6 cursor-pointer flex items-center justify-center lg:justify-start"
        v-for="cate in categories"
        :key="cate.id"
        @click="ChangeCategory(cate.slug)"
      >
        <div class="lg:w-8">
          <i
            v-if="cate.type == 0"
            class="text-3xl lg:text-2xl text-center"
            :class="
              cate.slug == selectedCategory
                ? 'text-brand-color ' + cate.icon
                : 'text-gray-500 ' + cate.icon
            "
          ></i>
          <img
            loading="lazy"
            v-if="cate.type == 1"
            :src="imgurl + 'storage/' + cate.image"
            alt="image"
            class="w-10 h-10 lg:w-8 lg:h-8 object-cover rounded-md"
          />
        </div>
        <strong
          :class="
            cate.slug == selectedCategory
              ? 'text-brand-color'
              : 'text-gray-500 '
          "
          class="pl-5 hover:text-brand-color-hover hidden lg:block"
          >{{ cate.name }}</strong
        >
      </li>
    </ul>
    <div class="flex md:hidden justify-between items-center relative z-40 pb-5">
      <div class="w-full">
        <VueSelect
          :data="categories"
          v-model="selectedCategory"
          v-on:valueSelect="onValueSelect"
        >
        </VueSelect>
      </div>
      <div
        v-if="sortbyshow == 'true'"
        class="pl-10 relative"
        v-click-outside="closeDropdown"
      >
        <i
          class="fas fa-th-large text-3xl text-gray-400 cursor-pointer"
          @click="isSortOpen"
        ></i>
        <ul
          v-if="isOpen"
          class="p-4 shadow-lg absolute right-0 z-30 bg-white rounded-md w-52"
        >
          <li
            v-for="(sort, i) in sorts"
            :key="i"
            @click="sortChange(sort.slug)"
            :class="sort.slug == sortby ? 'text-brand-color' : 'text-gray-700'"
            class="cursor-pointer py-2 px-2 font-semibold border-b hover:text-brand-color-hover"
          >
            {{ sort.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import VueSelect from "@/components/VueSelectBox";
import { sorts } from "@/Utils/SortArr";
export default {
  props: ["redirect", "sortbyshow"],
  components: {
    VueSelect,
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
      isOpen: false,
      selectedCategory: "",
      sortby: "most-recent",
      sorts: sorts,
    };
  },
  computed: {
    categories() {
      let slug = this.$cookies.get("slug");
      if (slug === "" || slug === undefined) {
        this.selectedCategory = this.$store.state.gallery.categories.length
          ? this.$store.state.gallery.categories[0].slug
          : "";
      }
      return this.$store.state.gallery.categories;
    },
  },
  methods: {
    closeDropdown() {
      this.isOpen = false;
    },
    onValueSelect(value) {
      if (this.redirect == "true") {
        this.$router.push({
          path: "/gallery",
        });
      }
      this.selectedCategory = value;
      this.$store.dispatch("gallery/ChangeCate", value);
      this.selectedCategory = value;
      this.$cookies.set("slug", value);
    },
    isSortOpen() {
      this.isOpen = !this.isOpen;
    },
    ChangeCategory(slug) {
      if (this.redirect == "true") {
        this.$router.push({
          path: "/gallery",
        });
      }
      this.$store.dispatch("gallery/ChangeCate", slug);
      this.selectedCategory = slug;
      this.$cookies.set("slug", slug);
    },
    sortChange(slug) {
      this.sortby = slug;
      const categorySlug = this.$route.params.slug;
      this.$store.dispatch("gallery/fetchSortChange", { slug, categorySlug });
    },
  },
  fetch() {
    this.selectedCategory = this.$cookies.get("slug");
  },
};
</script>

<style>
</style>
