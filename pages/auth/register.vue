<template>
  <section class="px-4 lg:px-16 xl:h-screen register--page">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row items-center">
        <div class="w-full lg:w-6/12 hidden lg:block">
          <div class="py-5 flex justify-center items-center">
            <nuxt-img
              quality="50"
              loading="lazy"
              src="/images/register.png"
              class="w-8/12"
              alt="login"
            />
          </div>
        </div>
        <div class="w-full lg:w-6/12 lg:pr-20">
          <div class="w-full py-6">
            <h1
              class="text-2xl lg:text-3xl xl:text-4xl pb-4 text-left font-bold"
            >
              Hey There!
              <span class="block text-brand-color"
                >Please register to continue</span
              >
            </h1>
            <div
              class="py-5 flex justify-center items-center bg--color lg:hidden"
            >
              <nuxt-img
                quality="50"
                loading="lazy"
                src="/images/register.png"
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
              <form @submit.prevent="register">
                <div class="w-full pt-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5">
                    <div class="pb-2 sm:pb-6">
                      <div class="flex items-center relative">
                        <nuxt-img
                          quality="50"
                          loading="lazy"
                          class="absolute left-0 top-0 mt-5 pt-1 ml-5"
                          src="/images/user.svg"
                          alt="mail"
                        />
                        <input
                          v-model="form.first_name"
                          required
                          type="text"
                          name="first_name"
                          :class="{ 'border-red-500': errors.first_name }"
                          id="first_name"
                          autocomplete="off"
                          placeholder="First name"
                          class="pl-12 pr-5 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                        />
                      </div>
                      <div class="text-red-500 pl-3" v-if="errors.first_name">
                        {{ errors.first_name[0] }}
                      </div>
                    </div>
                    <div class="pb-4 sm:pb-6">
                      <div class="flex items-center relative">
                        <nuxt-img
                          quality="50"
                          loading="lazy"
                          class="absolute left-0 top-0 mt-5 pt-1 ml-5"
                          src="/images/user.svg"
                          alt="mail"
                        />
                        <input
                          v-model="form.last_name"
                          required
                          type="last_name"
                          name="last_name"
                          :class="{ 'border-red-500': errors.last_name }"
                          id="last_name"
                          autocomplete="off"
                          placeholder="Last name"
                          class="pl-12 pr-5 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                        />
                      </div>
                      <div class="text-red-500 pl-3" v-if="errors.last_name">
                        {{ errors.last_name[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5">
                    <div class="pb-2 sm:pb-6">
                      <div class="flex items-center relative">
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
                          :class="{ 'border-red-500': errors.email }"
                          id="email"
                          autocomplete="off"
                          placeholder="Email"
                          class="pl-12 pr-5 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                        />
                      </div>
                      <div class="text-red-500 pl-3" v-if="errors.email">
                        {{ errors.email[0] }}
                      </div>
                    </div>
                    <div class="pb-4 sm:pb-6">
                      <div class="flex items-center relative">
                        <input
                          v-model="form.phone"
                          required
                          type="text"
                          name="phone"
                          :class="{ 'border-red-500': errors.phone }"
                          id="phone"
                          v-mask="'+1 (###) ###-####'"
                          autocomplete="off"
                          placeholder="Phone Number"
                          class="pl-12 pr-5 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                        />
                      </div>
                      <div class="text-red-500 pl-3" v-if="errors.phone">
                        {{ errors.phone[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row">
                    <div class="pb-4 sm:pb-6 flex-1 pr-2 sm:pr-5">
                      <div class="flex items-center relative">
                        <input
                          v-model="form.address"
                          required
                          type="text"
                          name="address"
                          :class="{ 'border-red-500': errors.address }"
                          id="address"
                          autocomplete="off"
                          @focus="autoCompleteLocation($event)"
                          placeholder="Address"
                          class="pl-12 pr-5 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                        />
                      </div>
                      <div class="text-red-500 pl-3" v-if="errors.address">
                        {{ errors.address[0] }}
                      </div>
                    </div>
                    <div class="pb-4 sm:pb-6 hidden sm:block sm:w-48">
                      <div class="flex items-center relative">
                        <input
                          v-model="form.city"
                          required
                          type="text"
                          name="city"
                          :class="{ 'border-red-500': errors.city }"
                          id="city"
                          autocomplete="off"
                          placeholder="City"
                          class="pl-5 pr-5 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                        />
                      </div>
                      <div class="text-red-500 pl-3" v-if="errors.city">
                        {{ errors.city[0] }}
                      </div>
                    </div>
                    <div class="pb-4 sm:pb-6 block sm:hidden">
                      <div class="flex items-center relative">
                        <input
                          v-model="form.zipcode"
                          required
                          type="text"
                          name="zipcode"
                          :class="{ 'border-red-500': errors.zipcode }"
                          id="zipcodemobile"
                          v-mask="'#####'"
                          autocomplete="off"
                          placeholder="Zipcode"
                          class="pl-12 pr-5 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                        />
                      </div>
                      <div class="text-red-500 pl-3" v-if="errors.zipcode">
                        {{ errors.zipcode[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2 sm:gap-5">
                    <div class="pb-4 sm:pb-6">
                      <div class="flex items-center relative">
                        <input
                          v-model="form.state"
                          required
                          type="text"
                          name="state"
                          :class="{ 'border-red-500': errors.state }"
                          id="state"
                          autocomplete="off"
                          placeholder="State"
                          class="pl-12 pr-5 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                        />
                      </div>
                      <div class="text-red-500 pl-3" v-if="errors.state">
                        {{ errors.state[0] }}
                      </div>
                    </div>
                    <div class="pb-4 sm:pb-6 hidden sm:block">
                      <div class="flex items-center relative">
                        <input
                          v-model="form.zipcode"
                          required
                          type="text"
                          name="zipcode"
                          :class="{ 'border-red-500': errors.zipcode }"
                          id="zipcode"
                          v-mask="'#####'"
                          autocomplete="off"
                          placeholder="Zipcode"
                          class="pl-12 pr-5 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                        />
                      </div>
                      <div class="text-red-500 pl-3" v-if="errors.zipcode">
                        {{ errors.zipcode[0] }}
                      </div>
                    </div>
                    <div class="pb-4 sm:pb-6 w-full sm:w-48 block sm:hidden">
                      <div class="flex items-center relative">
                        <input
                          v-model="form.city"
                          required
                          type="text"
                          name="city"
                          :class="{ 'border-red-500': errors.city }"
                          id="citymobile"
                          autocomplete="off"
                          placeholder="City"
                          class="pl-5 pr-5 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                        />
                      </div>
                      <div class="text-red-500 pl-3" v-if="errors.city">
                        {{ errors.city[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="w-full pb-4 sm:pb-6">
                    <div class="flex items-center relative">
                      <nuxt-img
                        quality="50"
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
                      <nuxt-img
                        quality="50"
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
                      <nuxt-img
                        quality="50"
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
                        id="cpassword"
                        placeholder="Confirm Password"
                        autocomplete="off"
                        class="px-12 py-5 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                      />
                      <nuxt-img
                        quality="50"
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
                </div>
                <div
                  class="flex justify-center flex-col items-center w-full py-6"
                >
                  <button
                    type="submit"
                    class="shadow-md border-none rounded-full text-xl py-2 px-12 text-white bg-brand-color hover:bg-brand-color-hover"
                  >
                    Sign up
                  </button>
                </div>

                <div class="flex items-center py-1 justify-center">
                  <p>Already have an account?</p>
                  <button
                    type="button"
                    class="ml-3 sm:ml-5 px-6 sm:px-10 py-1 sm:py-2 inline-block rounded-full border-2 text-brand-color border-brand-color hover:bg-brand-color hover:text-white"
                    @click="loginRoute"
                  >
                    Login
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
import SocialLogin from "@/components/SocialLogin";
import googleMapApi from "@/mixins/googleMapApi";
import globalMeta from "@/mixins/meta.js";
export default {
  mixins: [globalMeta, googleMapApi],
  name: "register",
  middleware: "guest",
  layout: "auth",
  components: {
    SocialLogin,
  },
  data: () => ({
    isShowPass: false,
    isShowConfirmPass: false,
    form: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      password: "",
      confirmed: "",
    },
    id: "",
    type: 0,
    is_login: false,
    is_register: false,
    query: "",
    error: "",
  }),
  computed: {
    meta() {
      return this.$store.state.meta.register;
    },
  },
  methods: {
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
    showPass() {
      this.isShowPass = !this.isShowPass;
    },
    showConfirmPass() {
      this.isShowConfirmPass = !this.isShowConfirmPass;
    },
    async register() {
      try {
        let { data } = await this.$axios.post("/auth/registers", this.form);
        if (data.success === true) {
          if (this.query !== "") {
            if (this.query == "cart?step=3") {
              this.$router.push(
                `/login?redirect=${this.query}&zipcode=${this.form.zipcode}`
              );
            } else {
              this.$router.push(`/login?redirect=${this.query}`);
            }
          } else {
            this.$router.push("/login");
          }
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Success! You are now registered. Please login.",
            showConfirmButton: false,
            timer: 15000,
          });
        }
      } catch (e) {
        return;
      }
    },
  },
  async mounted() {
    await this.injectGoogleMapsApiIfNotInjectedAlready();
  },
  created() {
    this.error = this.$route.query.error;
    if (typeof this.$route.query.redirect !== "undefined") {
      this.query = this.$route.query.redirect;
    }

    if (this.$route.path == "/login") {
      this.is_login = true;
      this.is_register = false;
    } else if (this.$route.path == "/register") {
      this.is_login = false;
      this.is_register = true;
    }
    // this.$axios.get("https://geolocation-db.com/json").then((res) => {
    //   if (res.status === 200) {
    //     this.form.city = res.data.city;
    //     this.form.state = res.data.state;
    //     this.form.zipcode = res.data.postal;
    //   }
    // });
  },
  async fetch() {
    await this.$store.dispatch("meta/fetchMetaInfo", "register");
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
