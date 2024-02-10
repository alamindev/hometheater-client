<template>
  <div>
    <div
      class="flex flex-col items-center justify-center py-10 relative"
      v-if="error.statusCode === 404"
    >
      <img
        class="sm:w-5/12 md:w-5/12 lg:w-4/12 xl:w-3/12"
        src="/images/404.svg"
        alt="404 page img"
      />
      <div class="absolute top-0 right-0 w-6/12">
        <img loading="lazy" src="/images/404-dot-1.svg" alt="404" />
      </div>
      <div class="absolute left-0 top-0 mt-20 -ml-20">
        <img
          loading="lazy"
          class="w-96"
          src="/images/about-circle.svg"
          alt="about"
        />
      </div>
      <h1 class="text-center text-4xl">Whoops!</h1>
      <h2 class="text-center text-red-500 text-lg">{{ error.message }}</h2>
    </div>
    <div
      class="flex justify-center py-10 relative"
      v-if="error.statusCode !== 404"
    >
      <h2 class="text-3xl text-brand-color">Something went wrong!</h2>
    </div>
    <div class="flex justify-center pb-10 relative z-30">
      <nuxt-link
        to="/"
        class="inline-block py-2 px-5 rounded text-white bg-brand-color hover:bg-brand-color-hover"
        >Go to home</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
};
</script>
