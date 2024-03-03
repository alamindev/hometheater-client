<template>
  <div class="md:w-10/12 lg:w-8/12 xl:w-6/12 mx-auto py-6">
    <div class="p-4 rounded-md">
      <div class="py-3">
        <social-login :is_cart="true" />
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
        <div class="w-full pt-4">
          <div v-show="step === 1">
            <form
              @submit.prevent="nextStepRegister"
              action-xhr="https://hometheaterproz.com/"
              method="post"
            >
              <div class="">
                <div class="pb-4">
                  <div class="flex items-center relative">
                    <img
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
                      class="pl-12 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                    />
                  </div>
                  <div class="text-red-500 pl-3" v-if="errors.first_name">
                    {{ errors.first_name[0] }}
                  </div>
                </div>
                <div class="pb-4">
                  <div class="flex items-center relative">
                    <img
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
                      class="pl-12 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                    />
                  </div>
                  <div class="text-red-500 pl-3" v-if="errors.last_name">
                    {{ errors.last_name[0] }}
                  </div>
                </div>
              </div>
              <div class="">
                <div class="pb-4">
                  <div class="flex items-center relative">
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
                      :class="{ 'border-red-500': errors.email }"
                      id="email"
                      autocomplete="off"
                      placeholder="Email"
                      class="pl-12 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                    />
                  </div>
                  <div class="text-red-500 pl-3" v-if="errors.email">
                    {{ errors.email[0] }}
                  </div>
                </div>
                <div class="pb-4">
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
                      class="pl-12 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                    />
                  </div>
                  <div class="text-red-500 pl-3" v-if="errors.phone">
                    {{ errors.phone[0] }}
                  </div>
                </div>
              </div>
              <div class="w-full pb-4">
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
                    :class="{ 'border-red-500': errors.password }"
                    :type="isShowPass == true ? 'text' : 'password'"
                    id="password"
                    placeholder="Password"
                    autocomplete="off"
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
                <div class="text-red-500 pl-3" v-if="errors.password">
                  {{ errors.password[0] }}
                </div>
              </div>
              <div class="w-full">
                <div class="flex items-center relative">
                  <img
                    loading="lazy"
                    class="absolute left-0 top-0 mt-5 ml-5"
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
                    class="px-12 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
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
              <button
                type="submit"
                class="py-5 px-10 w-full bg-brand-color text-white mt-5 text-lg rounded-md"
              >
                Next
              </button>
            </form>
          </div>
          <div v-show="step === 2">
            <form
              @submit.prevent="registerFromCart"
              action-xhr="https://hometheaterproz.com/"
              method="post"
            >
              <div class="flex flex-col">
                <div class="pb-4 flex-1">
                  <div class="flex items-center relative">
                    <input
                      v-model="form.address"
                      required
                      type="text"
                      name="address"
                      :class="{ 'border-red-500': errors.address }"
                      id="address"
                      autocomplete="off"
                      placeholder="Address"
                      @focus="autoCompleteLocation($event)"
                      class="pl-12 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                    />
                  </div>
                  <div class="text-red-500 pl-3" v-if="errors.address">
                    {{ errors.address[0] }}
                  </div>
                </div>
                <div class="pb-4">
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
                      class="pl-12 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                    />
                  </div>
                  <div class="text-red-500 pl-3" v-if="errors.city">
                    {{ errors.city[0] }}
                  </div>
                </div>
              </div>
              <div class="">
                <div class="pb-2">
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
                      class="pl-12 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                    />
                  </div>
                  <div class="text-red-500 pl-3" v-if="errors.state">
                    {{ errors.state[0] }}
                  </div>
                </div>
                <div class="pb-4">
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
                      class="pl-12 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                    />
                  </div>
                  <div class="text-red-500 pl-3" v-if="errors.zipcode">
                    {{ errors.zipcode[0] }}
                  </div>
                </div>
              </div>
              <div
                class="flex justify-center items-center w-full py-4 relative"
              >
                <button
                  type="button"
                  class="absolute flex items-center left-0"
                  @click="backStepRegister"
                >
                  <i class="fas fa-long-arrow-alt-left"></i>
                  <span class="pl-3 font-medium">Back</span>
                </button>
                <button
                  type="submit"
                  class="shadow-md border-none rounded-full text-xl py-2 px-12 text-white bg-brand-color hover:bg-brand-color-hover"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
          <div class="flex items-center pt-4 justify-center">
            <p>Already have an account?</p>
            <button
              type="button"
              class="ml-3 sm:ml-5 px-6 sm:px-10 py-1 sm:py-2 inline-block rounded-full border-2 text-brand-color border-brand-color hover:bg-brand-color hover:text-white"
              @click="loginRoute"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import googleMapApi from "@/mixins/googleMapApi";
export default {
  name: "register",
  mixins: [googleMapApi],
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
    query: "",
    error: "",
    step: 1,
  }),
  methods: {
    loginRoute() {
      this.$emit("showLoginForm");
    },
    backStepRegister() {
      this.step = 1;
    },
    nextStepRegister(e) {
      this.step = 2;
    },
    showPass() {
      this.isShowPass = !this.isShowPass;
    },
    showConfirmPass() {
      this.isShowConfirmPass = !this.isShowConfirmPass;
    },
    async registerFromCart() {
      try {
        let { data } = await this.$axios.post("/auth/registers", this.form);
        if (data.success === true) {
          this.$emit("GotoLogin");
          this.$swal({
            icon: "success",
            title: "Registration successful.",
            text: "Please login!",
            showConfirmButton: true,
            timer: 3000,
          });
        }
      } catch (e) {
        return;
      }
    },
  },
  created() {
    if (typeof this.$route.query.error !== "undefined") {
      this.error = this.$route.query.error;
    }
  },
  async mounted() {
    await this.injectGoogleMapsApiIfNotInjectedAlready();
  },
};
</script>

<style>
</style>
