<template>
  <div class="w-full py-10">
    <div class="pb-6">
      <h4
        class="pt-5 md:pt-0 text-brand-dark-gray text-xl lg:text-2xl xl:text-3xl font-semibold"
      >
        Subscribe to our blog
      </h4>
      <p class="text-gray-400">
        Get the latest juicy topics you can read and share
      </p>
    </div>
    <div class="w-full">
      <div class="lg:flex">
        <div class="">
          <input
            type="email"
            required
            v-model="email"
            :class="{ 'border-red-500': errors.email }"
            class="w-full border border-gray-300 px-6 py-3 text-gray-400 focus:outline-none rounded-md lg:rounded-none lg:rounded-tl-md lg:rounded-bl-md"
          />
        </div>

        <button
          @click="Subscribe"
          class="w-full lg:w-auto py-3 px-10 text-white bg-brand-color hover:bg-brand-color-hover rounded-md lg:rounded-none lg:rounded-tr-md lg:rounded-br-md mt-2 lg:mt-0"
        >
          Subscribe
        </button>
      </div>
      <div class="text-red-500" v-if="errors.email">
        {{ errors.email[0] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async Subscribe() {
      try {
        let form = {
          email: this.email,
        };
        let { data } = await this.$axios.post("/post/subscribe/", form);
        if (data.success === true) {
          this.$swal("Great! you are now subscriber.");
          this.email = "";
        }
      } catch (e) {
        return;
      }
    },
  },
};
</script>

<style>
</style>
