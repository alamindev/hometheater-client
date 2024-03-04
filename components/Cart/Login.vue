<template>
  <div class="md:w-10/12 lg:w-8/12 xl:w-6/12 mx-auto py-6">
    <div class="p-4 rounded-md">
      <div class="w-full">
        <div
          class="py-1.5 px-5 bg-red-600 text-white mb-2 shadow-sm rounded"
          v-if="errors.email"
        >
          {{ errors.email[0] }}
        </div>
        <div
          v-if="error"
          class="py-1.5 px-5 bg-red-600 text-white mb-2 shadow-sm rounded"
          role="alert"
        >
          Your token appeared to be invalid. Please try again.
        </div>
        <div
          v-if="err != ''"
          class="py-1.5 px-5 bg-red-600 text-white mb-2 shadow-sm rounded"
          role="alert"
        >
          {{ err }}
        </div>
        <form
          @submit.prevent="login"
          action-xhr="https://hometheaterproz.com/"
          method="post"
        >
          <div class="w-full pt-5">
            <div class="flex items-center pb-5 relative">
              <img
                loading="lazy"
                class="absolute left-0 top-0 mt-5 pt-1 ml-5"
                src="/images/mail.svg"
                alt="mail"
              />
              <input
                v-model="form.email"
                required
                type="email"
                name="email"
                placeholder="Email"
                class="pl-12 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
              />
            </div>
            <div class="flex items-center relative">
              <img
                loading="lazy"
                class="absolute left-0 top-0 mt-5 ml-5"
                src="/images/password.svg"
                alt="password"
              />
              <input
                v-model="form.password"
                minlength="6"
                required
                placeholder="Password"
                :type="type == true ? 'text' : 'password'"
                class="px-12 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
              />
              <img
                loading="lazy"
                class="-ml-12 z-30 cursor-pointer"
                @click="showPass"
                src="/images/eye.svg"
                alt="password"
              />
            </div>
          </div>
          <div class="flex justify-between pt-5 pb-2">
            <nuxt-link to="/forgot-password" class="underline text-gray-600"
              >Forgot password</nuxt-link
            >
            <div class="flex items-center">
              <input type="checkbox" id="remember" v-model="form.remember_me" />
              <label for="remember" class="pl-1 text-brand-color"
                >Remember me</label
              >
            </div>
          </div>
          <div class="flex justify-center flex-col items-center w-full py-6">
            <button
              type="submit"
              class="relative shadow-md border-none rounded-full text-xl py-2 px-12 text-white bg-brand-color hover:bg-brand-color-hover"
            >
              <span v-if="!loading"> Log in</span>
              <Loader v-if="loading" />
            </button>
          </div>
          <div class="flex items-center justify-center">
            <p>Don’t have an account?</p>
            <button
              type="button"
              class="ml-3 sm:ml-5 px-6 sm:px-10 py-1 sm:py-2 inline-block rounded-full border-2 text-brand-color border-brand-color hover:bg-brand-color hover:text-white"
              @click="registerRoute"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader/Loading-white";
export default {
  components: {
    Loader,
  },
  data() {
    return {
      type: false,
      form: {
        email: "",
        password: "",
        remember_me: "",
      },
      error: this.$route.query.error,
      loading: false,
      err: "",
    };
  },
  methods: {
    showPass() {
      this.type = !this.type;
    },
    registerRoute() {
      this.$emit("showRegisterForm");
    },
    async login() {
      this.loading = true;
      try {
        await this.$auth.login({
          data: this.form,
        });
        if (this.authenticated) {
          this.$store.dispatch("cart/showCart");
          this.$router.push("/cart");
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
        return;
      }
    },
  },
  created() {
    if (typeof this.$route.query.err !== "undefined") {
      this.err = this.$route.query.err;
    }
  },
};
</script>

<style>
</style>
