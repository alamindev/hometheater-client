<template>
  <div
    class="xl:px-20 2xl:px-24 px-5 lg:px-12 flex py-2 justify-between"
    :class="hidden"
    id="menu"
  >
    <nav class="overlay-menu w-full flex justify-start lg:w-auto lg:block">
      <ul
        class="flex items-center justify-between flex-col md:flex-row text-base pt-4 md:pt-0 !w-[150px] lg:!w-auto"
      >
        <li>
          <nuxt-link
            class="relative custom--margin first:ml-0 md:mx-3 !text-xl lg:!text-base xl:mx-5 py-1 md:py-3 px-0 block text-gray-700 hover:text-blue-500"
            to="/"
            exact
            >Home</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            class="relative custom--margin md:mx-3 !text-xl lg:!text-base xl:mx-5 py-1 md:py-3 px-0 block text-gray-700 hover:text-blue-500"
            href="#"
            to="/services"
            >Services</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            class="relative custom--margin md:mx-3 !text-xl lg:!text-base xl:mx-5 py-1 md:py-3 px-0 block text-gray-700 hover:text-blue-500"
            to="/booking"
            >Booking
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            class="relative custom--margin md:mx-3 !text-xl lg:!text-base xl:mx-5 py-1 md:py-3 px-0 block text-gray-700 hover:text-blue-500"
            to="/shop"
            >Shop
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            class="relative custom--margin md:mx-3 !text-xl lg:!text-base xl:mx-5 py-1 md:py-3 px-0 block text-gray-700 hover:text-blue-500"
            to="/blogs"
            >Blogs</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            class="relative custom--margin md:mx-3 !text-xl lg:!text-base xl:mx-5 py-1 md:py-3 px-0 block text-gray-700 hover:text-blue-500"
            to="/gallery"
            >Gallery</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            class="relative custom--margin md:mx-3 !text-xl lg:!text-base xl:mx-5 py-1 md:py-3 px-0 block text-gray-700 hover:text-blue-500"
            to="/contact-us"
            >Contact us</nuxt-link
          >
        </li>
      </ul>
    </nav>
    <div class="hidden w-full md:w-auto lg:flex justify-between items-center">
      <Search />
      <div class="flex-2 relative mr-3">
        <nuxt-link to="/cart">
          <div
            class="absolute -top-3 -right-1 lg:-right-4 rounded-full w-6 sm:w-8 h-6 sm:h-8 bg-brand-color flex justify-center items-center text-white"
          >
            {{ count }}
          </div>
          <img loading="lazy" src="/images/cart.svg" alt="cart icon"
        /></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import { mapGetters } from "vuex";
export default {
  props: ["hidden"],
  components: {
    Search,
  },
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    ...mapGetters({
      count: "cart/cartMainItem",
    }),
  },
};
</script>
