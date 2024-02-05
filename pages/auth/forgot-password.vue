<template>
  <section class="px-4 lg:px-16 xl:h-screen forgot--password">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row items-center">
        <div class="w-full lg:w-6/12 hidden lg:block">
          <div class="py-5 flex justify-center items-center">
            <nuxt-img
              quality="50"
              loading="lazy"
              src="/images/login.png"
              class="w-8/12"
              alt="login"
            />
          </div>
        </div>
        <div class="w-full lg:w-6/12 lg:pr-20">
          <div class="w-full py-6" v-if="!loading">
            <h1
              class="text-2xl lg:text-3xl xl:text-4xl pb-5 text-left font-bold"
            >
              Forgot your password?
              <span class="block text-brand-color">No problem!</span>
            </h1>
            <p class="text-gray-400 text-base py-3">
              Simply enter your email address below and we will send you
              instructions to help you create a new password.
            </p>
            <div
              class="py-5 flex justify-center items-center bg--color lg:hidden"
            >
              <nuxt-img
                quality="50"
                loading="lazy"
                src="/images/login.png"
                class="w-8/12"
                alt="login"
              />
            </div>
            <div class="w-full pt-5">
              <div
                class="py-3 px-5 bg-yellow-light text-red-dark mb-2 shadow-sm rounded"
                v-if="errors.email"
              >
                <span class="font-bold text-red-dark">Sorry! </span>
                {{ errors.email[0] }}
              </div>
              <div
                class="py-3 px-5 bg-yellow-light text-red-dark mb-2 shadow-sm rounded"
                v-if="errors.token"
              >
                <span class="font-bold text-red-dark">Sorry! </span>
                {{ errors.token[0] }}
              </div>
              <div
                class="py-3 px-5 bg-green-200 text-dark-sm mb-2 shadow-sm rounded"
                v-if="success.email"
              >
                <span class="font-bold text-dark-sm">Success! </span>
                {{ success.email[0] }}
              </div>
              <form @submit.prevent="forgotPass" v-if="!sended">
                <div class="w-full pt-5">
                  <div class="flex items-center pb-8 relative">
                    <nuxt-img
                      quality="50"
                      loading="lazy"
                      class="absolute left-0 top-0 mt-6 ml-5"
                      src="/images/mail.svg"
                      alt="mail"
                    />
                    <input
                      v-model="form.email"
                      required
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      class="pl-12 pr-5 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                    />
                  </div>
                </div>

                <div
                  class="flex justify-center flex-col items-center w-full py-10"
                >
                  <button
                    type="submit"
                    class="relative shadow-md border-none rounded-full text-xl py-2 px-12 text-white bg-brand-color hover:bg-brand-color-hover"
                  >
                    <span v-if="!btnloading"> Submit</span>
                    <Loader v-if="btnloading" />
                  </button>
                </div>
              </form>
              <form @submit.prevent="VerifyCode" v-if="sended">
                <div class="w-full pt-5">
                  <div class="flex items-center pb-8 relative">
                    <input
                      v-model="verify"
                      required
                      type="text"
                      name="verify"
                      id="verify"
                      placeholder="Verify token"
                      class="pl-5 pr-5 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                    />
                  </div>
                  <div class="flex justify-between">
                    <p class="text-brand-color">
                      Did not receive email?
                      <button
                        type="button"
                        class="focus:outline-none underline"
                        @click="tryAgain"
                      >
                        Resend
                      </button>
                    </p>
                    <p class="text-brand-color">
                      <vue-countdown
                        :time="60 * 60 * 1000"
                        v-slot="{ minutes, seconds }"
                      >
                        You have {{ minutes }}:{{ seconds }} minutes remaining
                      </vue-countdown>
                    </p>
                  </div>
                </div>

                <div
                  class="flex justify-center flex-col items-center w-full py-10"
                >
                  <button
                    type="submit"
                    class="relative shadow-md border-none rounded-full text-xl py-2 px-12 text-white bg-brand-color hover:bg-brand-color-hover"
                  >
                    <span v-if="!btnloading"> Verify</span>
                    <Loader v-if="btnloading" />
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
import Loader from "@/components/Loader/Loading-white";
import { deleteCookie, getCookie, setCookie } from "@/Utils/Cookie";
import VueCountdown from "@chenfengyuan/vue-countdown";
export default {
  middleware: "guest",
  layout: "auth",
  components: {
    Loader,
    VueCountdown,
  },
  data() {
    return {
      form: {
        email: "",
      },
      verify: "",
      loading: true,
      btnloading: false,
      sended: false,
    };
  },
  head() {
    return {
      title: "Forgot Password | Home Theater Proz",
    };
  },
  methods: {
    async forgotPass() {
      this.btnloading = true;
      try {
        let { data } = await this.$axios.post(
          `auth/forgot-password`,
          this.form
        );
        setCookie("token_id", data.id, 1);
        setCookie("forgot-password", "sended", 1);
        this.sended = true;
        this.btnloading = false;
      } catch {
        this.btnloading = false;
        return;
      }
      setTimeout(() => {
        this.$store.dispatch("validation/clearErrors");
        this.$store.dispatch("validation/clearSuccess");
      }, 5000);
    },
    async VerifyCode() {
      this.btnloading = true;
      try {
        let form = {
          token: this.verify,
          user_id: getCookie("token_id"),
        };
        let { data } = await this.$axios.post(`auth/verify`, form);

        setCookie("token", data.token, 1);
        this.$router.push(
          this.$route.query.redirect
            ? this.$route.query.redirect
            : "/change-password"
        );
        this.btnloading = false;
      } catch {
        this.btnloading = false;
        return;
      }
      setTimeout(() => {
        this.$store.dispatch("validation/clearErrors");
        this.$store.dispatch("validation/clearSuccess");
      }, 5000);
    },
    tryAgain() {
      deleteCookie("forgot-password");
      this.sended = false;
    },
  },
  mounted() {
    let isCookie = getCookie("forgot-password");
    let isToken = getCookie("token");
    if (
      isCookie !== null &&
      isCookie !== "" &&
      isCookie !== undefined &&
      isCookie == "sended"
    ) {
      this.sended = true;
    }
    this.loading = false;

    if (isToken !== null && isToken !== "" && isToken !== undefined) {
      this.$router.push(
        this.$route.query.redirect
          ? this.$route.query.redirect
          : "/change-password"
      );
    }
  },
};
</script>

<style scoped>
.nuxt-link-exact-active {
  border-bottom: 2px solid #4e81ee;
}
@media screen and (max-width: 1024px) {
  .bg--color {
    background: lavender;
    height: 250px;
    margin-top: 15px;
  }
  .bg--color img {
    height: 100%;
    width: auto;
  }
}
</style>
