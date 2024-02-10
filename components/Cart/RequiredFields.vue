<template>
  <div class="md:w-10/12 lg:w-8/12 xl:w-6/12 mx-auto py-6">
    <div class="shadow-lg p-4 rounded-md">
      <div class="w-full">
        <div class="">
          <p class="font-bold text-lg">Please fillup required fields!</p>
        </div>
        <div class="w-full pt-4">
          <div>
            <form
              @submit.prevent="updateRequiredFields"
              action-xhr="https://hometheaterproz.com/"
              method="post"
            >
              <div class="pb-4">
                <div class="flex items-center relative">
                  <input
                    v-model="form.first_name"
                    required
                    type="text"
                    name="first_name"
                    :class="{ 'border-red-500': errors.first_name }"
                    id="first_name"
                    autocomplete="off"
                    placeholder="First name"
                    class="pl-5 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                  />
                </div>
                <div class="text-red-500 pl-3" v-if="errors.first_name">
                  {{ errors.first_name[0] }}
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
                    class="pl-5 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                  />
                </div>
                <div class="text-red-500 pl-3" v-if="errors.phone">
                  {{ errors.phone[0] }}
                </div>
              </div>
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
                      class="pl-5 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
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
                      class="pl-5 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
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
                      class="pl-5 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
                    />
                  </div>
                  <div class="text-red-500 pl-3" v-if="errors.state">
                    {{ errors.state[0] }}
                  </div>
                </div>
                <div class="pb-4 pt-2">
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
                      class="pl-5 pr-5 py-4 border border-gray-200 shadow-md focus:outline-none text-gray-600 rounded-md w-full"
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
                  type="submit"
                  class="shadow-md border-none rounded-full text-xl py-2 px-12 text-white bg-brand-color hover:bg-brand-color-hover"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import googleMapApi from "@/mixins/googleMapApi";
export default {
  name: "Requiredfields",
  mixins: [googleMapApi],
  data: () => ({
    form: {
      first_name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
    },
  }),
  methods: {
    async updateRequiredFields() {
      try {
        let { data } = await this.$axios.post("/user/required-fields/update", {
          ...this.form,
          id: this.$auth.user.id,
        });
        if (data.success === true) {
          this.$emit("showCart");
        }
      } catch (e) {
        return;
      }
    },
    async getUserRequiredFields() {
      let { data } = await this.$axios.get(
        `/user/required-info/${this.$auth.user.id}`
      );
      if (data.success === true) {
        this.form = data.user;
      }
    },
  },
  async mounted() {
    await this.injectGoogleMapsApiIfNotInjectedAlready();
  },
  created() {
    this.getUserRequiredFields();
  },
};
</script>

