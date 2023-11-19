<template>
  <div class="pt-12">
    <h3 class="text-2xl pb-10 font-medium text-gray-800 font-rubik">
      Services you might like
    </h3>

    <div
      v-if="suggests.length > 0"
      class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <nuxt-link
        :to="'/booking/' + suggest.slug"
        class="relative"
        v-for="suggest in suggests"
        :key="suggest.id"
      >
        <i
          class="
            fas
            fa-plus-circle
            text-brand-color
            absolute
            right-0
            top-0
            -mr-2
            -mt-3
            bg-white
            rounded-full
            text-2xl
            z-20
          "
        ></i>
        <figure>
          <img
            class="
              w-full
              rounded-md
              border border-brand-color
              h-48
              sm:h-56
              md:h-48
              lg:h-56
              object-cover
            "
            :src="imgurl + 'storage' + suggest.image"
            :alt="suggest.slug"
          />
        </figure>
        <p class="text-lg md:text-base font-medium text-gray-800 pt-1 pl-2">
          {{ suggest.title }}
        </p>
      </nuxt-link>
    </div>
    <p v-else class="text-center text-red-600">Suggestion sevices not found!</p>
  </div>
</template>

<script>
export default {
  name: "SuggestServices",
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    suggests() {
      return this.$store.state.booking.suggests;
    },
  },
};
</script>

<style>
</style>
