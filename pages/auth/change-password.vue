<template>
  <section class="px-4 lg:px-16 xl:h-screen change--password">
    <div class="container mx-auto">
      <div class="flex flex-col-reverse md:flex-row items-center">
        <div class="w-full md:w-6/12">
          <div class="py-5 flex justify-center items-center">
            <img
              loading="lazy"
              src="/images/login.png"
              class="w-8/12"
              alt="login"
            />
          </div>
        </div>
        <div class="w-full md:w-6/12 lg:pr-20">
          <div class="w-full py-6" v-if="!loading">
            <h1
              class="text-2xl lg:text-3xl xl:text-4xl pb-5 text-left font-bold"
            >
              Forgot your password?
              <span class="block text-brand-color">No problem!</span>
            </h1>
            <p class="text-gray-400 text-base py-3">
              Create a new password. Choose something you can easily remember,
              but hard for someone else to guess.
            </p>
            <div class="w-full pt-5">
              <div
                class="py-2 px-5 bg-yellow-light text-red-dark mb-2 shadow-sm rounded"
                v-if="errors.email"
              >
                {{ errors.email[0] }}
              </div>
              <div
                class="py-2 px-5 bg-brand-color text-white mb-2 shadow-sm rounded"
                v-if="success.email"
              >
                {{ success.email[0] }}
              </div>
              <div
                class="py-3 px-5 bg-yellow-light text-red-dark mb-2 shadow-sm rounded"
                v-if="errors.token"
              >
                <span class="font-bold text-red-dark">Sorry! </span>
                {{ errors.token[0] }}
              </div>
              <form
                @submit.prevent="forgotPass"
                action-xhr="https://hometheaterproz.com/"
                method="post"
              >
                <div class="w-full pb-6">
                  <div class="flex items-center relative">
                    <img
                      loading="lazy"
                      class="absolute left-0 top-0 mt-6 ml-5"
                      src="/images/password.svg"
                      alt="password"
                    />
                    <input
                      v-model="form.password"
                      minlength="6"
                      required
                      :class="{ 'border-red-500': errors.password }"
                      :type="isShowPass == true ? 'text' : 'password'"
                      id="password"
                      placeholder="Password"
                      autocomplete="off"
                      class="px-12 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                    />
                    <img
                      loading="lazy"
                      class="-ml-12 z-30 cursor-pointer"
                      @click="showPass"
                      src="/images/eye.svg"
                      alt="password"
                    />
                  </div>
                  <div class="text-red-500 pl-3" v-if="errors.password">
                    {{ errors.password[0] }}
                  </div>
                </div>
                <div class="w-full">
                  <div class="flex items-center relative">
                    <img
                      loading="lazy"
                      class="absolute left-0 top-0 mt-6 ml-5"
                      src="/images/password.svg"
                      alt="password"
                    />
                    <input
                      v-model="form.confirmed"
                      minlength="6"
                      required
                      :class="{ 'border-red-500': errors.confirmed }"
                      :type="isShowConfirmPass == true ? 'text' : 'password'"
                      id="password"
                      placeholder="Confirm Password"
                      autocomplete="off"
                      class="px-12 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                    />
                    <img
                      loading="lazy"
                      class="-ml-12 z-30 cursor-pointer"
                      @click="showConfirmPass"
                      src="/images/eye.svg"
                      alt="password"
                    />
                  </div>
                  <div class="text-red-500 pl-3" v-if="errors.confirmed">
                    {{ errors.confirmed[0] }}
                  </div>
                </div>

                <div class="flex justify-center items-center w-full py-10">
                  <button
                    type="submit"
                    class="relative shadow-md border-none rounded-full text-xl py-2 px-12 text-white bg-brand-color hover:bg-brand-color-hover"
                  >
                    <span v-if="!btnloading"> Change Password</span>
                    <Loader v-if="btnloading" />
                  </button>
                  <button
                    type="button"
                    class="ml-3 border-none rounded-full text-xl py-2 px-12 text-white bg-red-500 hover:bg-red-600"
                    @click="Cancel"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <div
                class="flex flex-col sm:flex-row sm:justify-between py-2 sm:items-center"
              >
                <nuxt-link to="/login" class="underline">Back</nuxt-link>
                <div class="flex items-center">
                  <p class="text-base text-gray-500">Don’t have an account?</p>
                  <nuxt-link
                    class="ml-3 sm:ml-5 px-6 sm:px-10 py-1 sm:py-2 inline-block rounded-full border-2 text-brand-color border-brand-color hover:bg-brand-color hover:text-white"
                    to="/register"
                    >Sign up</nuxt-link
                  >
                </div>
              </div>
            </div>
          </div>
          <div v-if="loading" class="loading">
            <div class="bg-white">
              <div class="animate-pulse space-x-4">
                <div class="py-1">
                  <div class="h-4 my-3 bg-gray-200 rounded w-4/6"></div>
                  <div class="h-4 my-3 bg-gray-200 rounded w-2/6"></div>
                  <div class="h-4 my-10 bg-gray-200 rounded w-full"></div>
                  <div class="my-5">
                    <div class="h-12 my-3 bg-gray-200 rounded"></div>
                    <div class="h-12 my-3 bg-gray-200 rounded"></div>
                    <div class="flex justify-center my-6">
                      <div class="h-8 bg-gray-200 rounded w-2/6"></div>
                    </div>
                    <div class="flex justify-between my-10">
                      <div class="h-4 bg-gray-200 rounded w-2/6"></div>
                      <div class="h-4 bg-gray-200 rounded w-2/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { deleteCookie, getCookie } from "@/Utils/Cookie";
import Loader from "@/components/Loader/Loading-white";
export default {
  middleware: "guest",
  layout: "auth",
  components: {
    Loader,
  },
  data() {
    return {
      isShowPass: false,
      isShowConfirmPass: false,
      form: {
        password: "",
      },
      loading: true,
      btnloading: false,
    };
  },
  head() {
    return {
      title: "Change Password | Home Theater Proz",
    };
  },
  methods: {
    showPass() {
      this.isShowPass = !this.isShowPass;
    },
    showConfirmPass() {
      this.isShowConfirmPass = !this.isShowConfirmPass;
    },
    async forgotPass() {
      try {
        let data = {
          password: this.form.password,
          token: getCookie("token"),
          user_id: getCookie("token_id"),
        };
        let { d } = await this.$axios.post(`auth/change-password`, data);
        this.deleteAll();
        this.$swal({
          toast: true,
          title: "Password has been changed!",
          icon: "success",
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      } catch {
        return;
      }
    },
    Cancel() {
      this.deleteAll();
    },
    deleteAll() {
      deleteCookie("forgot-password");
      deleteCookie("token");
      deleteCookie("token_id");

      this.$router.push(
        this.$route.query.redirect ? this.$route.query.redirect : "/login"
      );
    },
  },
  mounted() {
    this.loading = false;

    let isToken = getCookie("token");
    if (!isToken) {
      this.$router.push(
        this.$route.query.redirect
          ? this.$route.query.redirect
          : "/forgot-password"
      );
    }
  },
};
</script>

<style scoped>
.nuxt-link-exact-active {
  border-bottom: 2px solid #4e81ee;
}
</style>
