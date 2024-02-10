<template>
  <div class="user--settings">
    <form
      v-if="!loading"
      @submit.prevent="UpdateInfo"
      action-xhr="https://hometheaterproz.com/"
      method="post"
    >
      <div
        v-if="require_msg"
        class="mb-5 text-red-800 bg-red-200 rounded-md py-5 px-10"
      >
        <p class="text-center font-medium">
          <b>Important:</b> Please complete the required info's in order to book
          your appointment.
        </p>
      </div>
      <div
        v-if="success_msg"
        class="mb-5 text-black bg-green-300 rounded-md py-5 px-10"
      >
        <p class="text-center font-medium">
          <b>Success: </b> All required info has been updated, please continue.
        </p>
      </div>
      <div class="flex flex-col sm:flex-row md:flex-col lg:flex-row">
        <div class="w-full sm:w-5/12 md:w-full lg:w-5/12">
          <div class="flex flex-col items-center bg rounded-lg p-5 shadow-md">
            <h2 class="text-base text-dark-sm font-bold text-center pb-2">
              Change avatar
            </h2>
            <p class="text-sm text-gray-400 text-center pb-5">
              We only accept jpg, png and bmp
            </p>
            <label for="choose" class="relative cursor-pointer">
              <input
                type="file"
                class="hidden"
                id="choose"
                @change="selectFile"
                accept="image/*"
              />
              <div class="rounded-full p-3 bg-white" v-if="!photo">
                <img
                  loading="lazy"
                  v-if="loaduser != null"
                  :src="
                    loaduser.includes('http') ? loaduser : imgurl + loaduser
                  "
                  class="w-24 h-24 object-cover rounded-full"
                  alt=""
                />
                <div class="w-24 h-24" v-if="loaduser == null">
                  <img
                    loading="lazy"
                    src="/images/dashboard-img-1.svg"
                    class="w-24 h-24 object-cover rounded-full"
                    alt=""
                  />
                </div>
              </div>
              <div class="rounded-full p-3 bg-white" v-else>
                <img
                  loading="lazy"
                  v-if="photo"
                  :src="photo"
                  alt="profile photo"
                  class="w-24 h-24 object-cover rounded-full"
                />
              </div>
              <i
                class="fas fa-camera text-2xl text-gray-300 absolute bottom-3 left-12"
              ></i>
            </label>
          </div>
          <div class="px-4 sm:px-0">
            <nuxt-link
              :to="`/users/${user.id}/profile`"
              class="inline-block text-center my-5 w-full py-3 px-5 bg-brand-color hover:bg-brand-color-hover text-white font-semibold text-base rounded-md focus:outline-none"
              >View Public Profile</nuxt-link
            >
          </div>
          <div class="w-full bg rounded-lg p-4 shadow-md">
            <h2 class="text-base text-dark-sm font-bold text-center pb-2">
              Notifications
            </h2>
            <p class="text-sm text-gray-400 text-center pb-5">
              Turn alerts on and off. Choose email or SMS
            </p>

            <div class="w-full py-5 px-3 bg-white shadow">
              <div class="flex justify-between items-center">
                <h3 class="text-xs text-dark-sm font-semibold">
                  Appointment Confirmations
                </h3>
                <div class="flex items-center">
                  <p class="email text-xs pr-1">Email</p>
                  <div>
                    <input
                      id="app-noty"
                      v-model="form.is_appointment"
                      type="checkbox"
                      class="checkbox"
                    />
                    <label for="app-noty" class="switch">
                      <span class="switch__circle">
                        <span class="switch__circle-inner"></span>
                      </span>
                      <span class="switch__left"></span>
                      <span class="switch__right"></span>
                    </label>
                  </div>
                  <p class="email text-xs pl-1">Sms</p>
                </div>
              </div>
            </div>
            <div class="flex justify-center items-center flex-col pt-3">
              <h3 class="text-xs text-dark-sm font-semibold text-center pb-2">
                Enable or disable all notifications
              </h3>
              <div>
                <input
                  id="all-noty"
                  type="checkbox"
                  v-model="form.is_notification"
                  class="checkbox"
                />
                <label for="all-noty" class="switch switch-two">
                  <span class="switch__circle">
                    <span class="switch__circle-inner"></span>
                  </span>
                  <span class="switch__left-two">On</span>
                  <span class="switch__right-two">Off</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full sm:w-7/12 md:w-full lg:w-7/12 sm:pl-6 md:pl-0 lg:pl-5 pt-5 sm:pt-0 md:pt-5 lg:pt-0"
        >
          <div class="bg-white rounded-lg p-4 shadow-md">
            <h2 class="text-lg font-bold pb-5">User info</h2>

            <div class="form">
              <div class="flex pb-5">
                <div class="w-5/12">
                  <input
                    type="text"
                    v-model="form.first_name"
                    placeholder="First Name"
                    name="name"
                    class="custom--color-input w-full px-5 py-2 shadow-md border-none rounded-lg"
                  />
                  <div class="text-red-500 pl-3" v-if="errors.first_name">
                    {{ errors.first_name[0] }}
                  </div>
                </div>
                <div class="w-7/12 pl-3">
                  <input
                    type="text"
                    placeholder="Last Name"
                    v-model="form.last_name"
                    name="name"
                    class="custom--color-input w-full px-5 py-2 shadow-md border-none rounded-lg"
                  />
                  <div class="text-red-500 pl-3" v-if="errors.last_name">
                    {{ errors.last_name[0] }}
                  </div>
                </div>
              </div>
              <div class="flex pb-5">
                <div class="w-5/12">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    v-model="form.email"
                    class="custom--color-input w-full px-5 py-2 shadow-md border-none rounded-lg"
                  />
                  <div class="text-red-500 pl-3" v-if="errors.email">
                    {{ errors.email[0] }}
                  </div>
                </div>
                <div class="w-7/12 pl-3">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    v-model="form.phone"
                    class="custom--color-input w-full px-5 py-2 shadow-md border-none rounded-lg"
                  />
                  <div class="text-red-500 pl-3" v-if="errors.phone">
                    {{ errors.phone[0] }}
                  </div>
                </div>
              </div>

              <div class="w-full pb-5">
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  v-model="form.address"
                  @focus="autoCompleteLocation($event)"
                  onfocus="autocomplete"
                  class="custom--color-input w-full px-5 py-2 shadow-md border-none rounded-lg"
                />
                <div class="text-red-500 pl-3" v-if="errors.address">
                  {{ errors.address[0] }}
                </div>
              </div>

              <div class="w-full pb-5">
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  v-model="form.city"
                  class="custom--color-input w-full px-5 py-2 shadow-md border-none rounded-lg"
                />
                <div class="text-red-500 pl-3" v-if="errors.city">
                  {{ errors.city[0] }}
                </div>
              </div>
              <div class="w-full pb-5">
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  v-model="form.state"
                  class="custom--color-input w-full px-5 py-2 shadow-md border-none rounded-lg"
                />
              </div>
              <div class="w-full pb-5">
                <input
                  type="text"
                  placeholder="Zipcode"
                  name="zipcode"
                  v-model="form.zipcode"
                  class="custom--color-input w-full px-5 py-2 shadow-md border-none rounded-lg"
                />
                <div class="text-red-500 pl-3" v-if="errors.zipcode">
                  {{ errors.zipcode[0] }}
                </div>
              </div>
              <div class="w-full pb-5">
                <textarea
                  name="about"
                  v-model="form.bio"
                  class="custom--color-input w-full px-5 py-2 shadow-md border-none rounded-lg"
                  id=""
                  cols="30"
                  rows="5"
                  placeholder="Tell everyone a little about you. (Optional)"
                ></textarea>
              </div>
            </div>
            <h2 class="text-lg font-bold pb-5">Social Networks</h2>

            <div class="w-full py-5">
              <div class="flex pb-5 items-center">
                <i
                  class="fab fa-facebook text-2xl text-brand-color flex-1 pr-5"
                ></i>
                <div class="w-full">
                  <input
                    v-model="form.facebook"
                    type="url"
                    placeholder="Facebook url"
                    name="facebook_url"
                    class="custom--color-input w-full px-5 py-2 shadow-md border-none rounded-lg"
                  />
                </div>
              </div>
              <div class="flex pb-5 items-center">
                <i
                  class="fab fa-twitter text-2xl text-brand-color flex-1 pr-5"
                ></i>
                <div class="w-full">
                  <input
                    type="url"
                    v-model="form.twitter"
                    placeholder="Twitter url"
                    name="twitter_url"
                    class="custom--color-input w-full px-5 py-2 shadow-md border-none rounded-lg"
                  />
                </div>
              </div>
              <div class="flex pb-5 items-center">
                <i
                  class="fab fa-facebook-messenger text-2xl text-brand-color flex-1 pr-5"
                ></i>
                <div class="w-full">
                  <input
                    type="url"
                    v-model="form.messenger"
                    placeholder="Facebook messenger url"
                    name="twitter_url"
                    class="custom--color-input w-full px-5 py-2 shadow-md border-none rounded-lg"
                  />
                </div>
              </div>
              <div class="flex pb-5 items-center">
                <i
                  class="fab fa-instagram text-2xl text-brand-color flex-1 pr-5"
                ></i>
                <div class="w-full">
                  <input
                    type="url"
                    v-model="form.instagram"
                    placeholder="Instagram url"
                    name="twitter_url"
                    class="custom--color-input w-full px-5 py-2 shadow-md border-none rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center pb-10 pt-8">
        <button
          type="button"
          @click="deleteAccount"
          class="inline-block mr-8 text-center py-3 px-5 transparent text-red-500 font-semibold text-base rounded-md focus:outline-none"
        >
          Delete Account
        </button>
        <button
          type="submit"
          class="inline-block text-center py-3 px-5 bg-brand-color hover:bg-brand-color-hover text-white font-semibold text-base rounded-md focus:outline-none"
        >
          Save changes
        </button>
      </div>
    </form>
    <div v-else class="flex flex-col sm:flex-row md:flex-col lg:flex-row">
      <div class="w-full sm:w-5/12 md:w-full lg:w-5/12">
        <div class="bg rounded-lg p-5 shadow-md">
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-blue-200 rounded w-3/4"></div>
              <div class="h-4 bg-blue-200 rounded w-3/6"></div>
              <div class="space-y-2">
                <div class="h-4 bg-blue-200 rounded"></div>
                <div class="h-4 bg-blue-200 rounded w-5/6"></div>
                <div class="h-4 bg-blue-200 rounded w-2/6"></div>
                <div class="h-4 bg-blue-200 rounded w-3/6"></div>
                <div class="h-4 bg-blue-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full sm:w-7/12 md:w-full lg:w-7/12 sm:pl-6 md:pl-0 lg:pl-5 pt-5 sm:pt-0 md:pt-5 lg:pt-0"
      >
        <div class="bg-white rounded-lg p-5 shadow-md">
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-blue-200 rounded w-3/4"></div>
              <div class="h-4 bg-blue-200 rounded w-3/6"></div>
              <div class="space-y-2">
                <div class="h-4 bg-blue-200 rounded"></div>
                <div class="h-4 bg-blue-200 rounded w-5/6"></div>
                <div class="h-4 bg-blue-200 rounded w-2/6"></div>
                <div class="h-4 bg-blue-200 rounded w-3/6"></div>
                <div class="h-4 bg-blue-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import googleMapApi from "@/mixins/googleMapApi";
export default {
  middleware: ["auth"],
  mixins: [googleMapApi],
  layout: "users",
  data() {
    return {
      show: "",
      imgurl: process.env.imgUrl,
      dropdown: false,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        facebook: "",
        twitter: "",
        messenger: "",
        instagram: "",
        zipcode: "",
        bio: "",
        is_appointment: "",
        is_notification: "",
      },
      file: null,
      photo: null,
      loaduser: null,
      loading: false,
      require_msg: false,
      success_msg: false,
    };
  },
  head() {
    return {
      title: "Settings | Home Theater Proz",
    };
  },
  methods: {
    async loadUser() {
      this.loading = true;
      let { data } = await this.$axios.get(`/users/${this.user.id}/setting`);

      if (data.success == true) {
        this.form = data.user;
        this.loaduser = data.user.photo;
        this.loading = false;
      } else {
        this.$swal({
          title: data.errors,
        });
      }
    },
    menuClick() {
      this.dropdown = !this.dropdown;
    },
    hide() {
      this.dropdown = false;
    },
    selectFile(event) {
      this.file = event.target.files[0];
      if (event.target.files[0]) {
        let blob = new Blob(event.target.files, {
          type: event.target.files[0].type,
        });
        if (event.target.files[0].size / 1024 / 1024 >= 1)
          return this.$swal("File size must be greater then 1 mb.");
        this.photo = URL.createObjectURL(blob);
      }
    },
    async UpdateInfo() {
      const datas = new FormData();
      datas.append("photo", this.file);
      const json = JSON.stringify(this.form);
      datas.append("data", json);
      try {
        let { data } = await this.$axios.post(
          `/users/${this.user.id}/update`,
          datas
        );
        if (data.success === true) {
          this.$auth.fetchUser();
          this.$swal({
            title: "Profile has been Updated",
            type: "success",
          });
          this.success_msg = true;
          this.require_msg = false;
          this.$router.push(
            this.$route.query.redirect
              ? "/" + this.$route.query.redirect
              : "/users/settings"
          );
          if (this.$route.query.redirect == "cart?step=3") {
            this.$swal({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "Information Updated! please continue",
              showConfirmButton: false,
              timer: 10000,
            });
          }
        }
      } catch (e) {
        this.success_msg = false;
      }
    },
    deleteAccount() {
      this.$swal({
        title: "Do you want to Delete your account?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Confirm`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            this.$axios
              .post(`/user/delete`, { id: this.$auth.user.id })
              .then((res) => {
                if (res.data.success === true) {
                  this.$auth.logout();
                  this.$swal({
                    title: "Account has been deleted",
                    type: "success",
                  });
                }
              });
          } catch (e) {
            return;
          }
        }
      });
    },
  },
  async fetch() {
    if (typeof this.$route.query.success !== "undefined") {
      this.require_msg = true;
      this.success_msg = false;
    } else {
      this.require_msg = false;
    }
    await this.loadUser();
  },
  async mounted() {
    await this.injectGoogleMapsApiIfNotInjectedAlready();
  },
};
</script>

<style   scoped>
.checkbox {
  display: none;
}

.switch {
  align-items: center;
  background-color: #3cc79e;
  border-radius: 500px;
  cursor: pointer;
  display: flex;
  height: 30px;
  justify-content: space-between;
  padding: 0 10px;
  position: relative;
  user-select: none;
  width: 45px;
}
.switch-two {
  background-color: red;
  width: 65px;
}

.checkbox:checked ~ .switch {
  background-color: #4e81ee;
}
.checkbox:checked ~ .switch-two {
  background-color: #f00707;
}

.checkbox:not(:checked) ~ .switch {
  background-color: #3cc79e;
}
.checkbox:not(:checked) ~ .switch-two {
  background-color: #3cc79e;
}

.checkbox:checked ~ .switch .switch__left,
.checkbox:checked ~ .switch .switch__right {
  color: #3cc79e;
}

.checkbox:checked ~ .switch-two .switch__left-two,
.checkbox:checked ~ .switch-two .switch__right-two {
  color: #fff;
}

.checkbox:not(:checked) ~ .switch .switch__left,
.checkbox:not(:checked) ~ .switch .switch__right {
  color: #4e81ee;
}
.checkbox:not(:checked) ~ .switch-two .switch__left-two,
.checkbox:not(:checked) ~ .switch-two .switch__right-two {
  color: #fff;
}

.checkbox:checked ~ .switch .switch__left {
  visibility: hidden;
}
.checkbox:checked ~ .switch-two .switch__left-two {
  visibility: hidden;
}

.checkbox:not(:checked) ~ .switch .switch__right {
  visibility: hidden;
}
.checkbox:not(:checked) ~ .switch-two .switch__right-two {
  visibility: hidden;
}

.switch__circle {
  height: 30px;
  padding: 5px;
  position: absolute;
  transition: all 0.1s linear;
  width: 30px;
}

.checkbox:checked ~ .switch .switch__circle {
  left: 0;
  right: calc(100% - 30px);
}

.checkbox:not(:checked) ~ .switch .switch__circle {
  left: calc(100% - 30px);
  right: 0;
}

.switch__circle-inner {
  background-color: white;
  border-radius: 50%;
  display: block;
  height: 100%;
  width: 100%;
}
.email {
  color: #4e81eed5;
}
.sms {
  color: #3cc79dc0;
}
.bg {
  background: #f2f4fb;
}
.custom--color-input {
  color: #4b5b83 !important;
}
</style>


