<template>
  <section class="px-4 lg:px-16 xl:h-screen login--page">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row items-center">
        <div class="w-full lg:w-6/12 hidden lg:block">
          <div class="py-5 flex justify-center items-center">
            <img
              loading="lazy"
              src="/images/login.png"
              class="w-8/12"
              alt="login"
            />
          </div>
        </div>
        <div class="w-full lg:w-6/12 lg:pr-20">
          <div class="w-full py-6">
            <h1
              class="text-2xl lg:text-3xl xl:text-4xl pb-5 text-left font-bold"
            >
              Hey!
              <span class="block text-brand-color">Welcome Back</span>
            </h1>
            <div
              class="py-5 flex justify-center items-center bg--color lg:hidden"
            >
              <img
                loading="lazy"
                src="/images/login.png"
                class="w-8/12"
                alt="login"
              />
            </div>
            <ul class="flex py-5 text-xl">
              <li class="pr-3">
                <nuxt-link to="/" class="py-1">Home</nuxt-link>
              </li>
              <li class="px-3">
                <button
                  type="button"
                  @click="loginRoute"
                  class="cursor-pointer border-0 focus:outline-none focus:ring-0"
                  :class="is_login ? 'nuxt-link-exact-active' : ''"
                >
                  Log in
                </button>
              </li>
              <li class="px-3">
                <button
                  type="button"
                  @click="registerRoute"
                  class="cursor-pointer border-0 focus:outline-none focus:ring-0"
                  :class="is_register ? 'nuxt-link-exact-active' : ''"
                >
                  Register
                </button>
              </li>
            </ul>
            <div class="py-3">
              <social-login />
            </div>
            <div class="w-full">
              <div
                class="py-2 px-5 bg-red-600 text-white mb-2 shadow-sm rounded"
                v-if="errors.email"
              >
                {{ errors.email[0] }}
              </div>
              <div
                v-if="error"
                class="py-2 px-5 bg-red-600 text-white mb-2 shadow-sm rounded"
                role="alert"
              >
                Your token appeared to be invalid. Please try again.
              </div>
              <div
                v-if="err != ''"
                class="py-2 px-5 bg-red-600 text-white mb-2 shadow-sm rounded"
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
                  <div class="flex items-center pb-8 relative">
                    <img
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
                      placeholder="Password"
                      :type="type == true ? 'text' : 'password'"
                      id="password"
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
                </div>
                <div class="flex justify-between pt-8 pb-2">
                  <nuxt-link
                    to="/forgot-password"
                    class="underline text-gray-600"
                    >Forgot password</nuxt-link
                  >
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      v-model="form.remember_me"
                    />
                    <label for="remember" class="pl-1 text-brand-color"
                      >Remember me</label
                    >
                  </div>
                </div>
                <div
                  class="flex justify-center flex-col items-center w-full py-10"
                >
                  <button
                    type="submit"
                    class="relative shadow-md border-none rounded-full text-xl py-2 px-12 text-white bg-brand-color hover:bg-brand-color-hover"
                  >
                    <span v-if="!loading"> Log in</span>
                    <Loader v-if="loading" />
                  </button>
                </div>
                <div class="flex items-center py-2 justify-center">
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
      </div>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/Loader/Loading-white";
import SocialLogin from "@/components/SocialLogin";
import globalMeta from "@/mixins/meta.js";
export default {
  mixins: [globalMeta],
  middleware: "guest",
  layout: "auth",
  components: {
    Loader,
    SocialLogin,
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
      is_login: false,
      is_register: false,
      query: "",
      err: "",
    };
  },
  computed: {
    meta() {
      return this.$store.state.meta.login;
    },
  },
  methods: {
    showPass() {
      this.type = !this.type;
    },
    loginRoute() {
      if (this.query !== "") {
        this.$router.push(`/login?redirect=${this.query}`);
      } else {
        this.$router.push("/login");
      }
    },
    registerRoute() {
      if (this.query !== "") {
        this.$router.push(`/register?redirect=${this.query}`);
      } else {
        this.$router.push("/register");
      }
    },
    async login() {
      this.loading = true;
      try {
        await this.$auth.login({
          data: this.form,
        });
        if (this.authenticated) {
          this.$router.push(
            this.$route.query.redirect
              ? this.$route.query.redirect == "cart?step=3" &&
                typeof this.$route.query.zipcode !== "undefined"
                ? this.$route.query.redirect +
                  "&zipcode=" +
                  this.$route.query.zipcode
                : this.$route.query.redirect
              : "/users/dashboard"
          );
          if (this.$route.query.redirect == "cart?step=3") {
            this.$swal({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "Your are now logged in! please continue",
              showConfirmButton: false,
              timer: 10000,
            });
          }
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
        return;
      }
    },
  },
  created() {
    if (typeof this.$route.query.redirect !== "undefined") {
      this.query = this.$route.query.redirect;
      this.$cookies.set("last-location", this.$route.query.redirect);
    } else {
      this.$cookies.remove("last-location");
    }
    if (typeof this.$route.query.err !== "undefined") {
      this.err = this.$route.query.err;
    }
    if (this.$route.path == "/login") {
      this.is_login = true;
      this.is_register = false;
    } else if (this.$route.path == "/register") {
      this.is_login = false;
      this.is_register = true;
    }
  },
  async fetch() {
    await this.$store.dispatch("meta/fetchMetaInfo", "login");
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
