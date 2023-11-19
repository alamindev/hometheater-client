<template>
  <div class="hidden md:block">
    <div class="flex flex-wrap">
      <p class="text-gray-400 text-base font-semibold">Sort by:</p>
      <ul class="flex flex-wrap">
        <li
          v-for="(sort, i) in sorts"
          :key="i"
          @click="sortChange(sort.slug)"
          :class="
            sort.slug == sortby ? 'text-brand-color underline-custom' : ''
          "
          class="
            cursor-pointer
            mx-2
            lg:mx-2
            xl:mx-6
            font-semibold
            text-gray-700
            hover:text-brand-color-hover
          "
        >
          {{ sort.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCookie } from "@/Utils/Cookie";
import { sorts } from "@/Utils/SortArr";
export default {
  data() {
    return {
      sortby: "most-recent",
      sorts: sorts,
    };
  },
  methods: {
    sortChange(slug) {
      this.sortby = slug;
      const categorySlug = this.$route.params.slug;
      this.$store.dispatch("gallery/fetchSortChange", { slug, categorySlug });
    },
  },
};
</script>

<style>
</style>
