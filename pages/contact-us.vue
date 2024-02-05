<template>
  <section
    v-if="!loading"
    class="px-4 lg:px-16 pb-6 sm:pb-12 md:pb-24 pt-5 sm:pt-12 relative bg-light-5 contact--page"
  >
    <div class="container mx-auto relative">
      <div class="shadow-lg rounded-lg overflow-hidden bg-light-10">
        <div class="flex flex-col lg:flex-row">
          <div class="w-full lg:w-7/12">
            <div class="pb-5 relative">
              <div class="flex items-center justify-center">
                <nuxt-img
                  quality="50"
                  loading="lazy"
                  class="w-full"
                  :src="imgurl + 'storage' + contact.image"
                  alt="client"
                />
              </div>
              <div class="pt-10 pb-3">
                <div class="flex justify-center -mb-6">
                  <h2
                    class="text-dark-sm text-xl px-5 py-3 custom-shadow-contact rounded-md text-center font-medium bg-white inline-block"
                  >
                    Hours of Operation
                  </h2>
                </div>
                <div class="bg-brand-color py-10 px-3 xl:px-6 rounded-lg">
                  <div class="flex flex-wrap justify-center">
                    <div class="flex flex-col items-center px-4 py-2">
                      <h3 class="text-white pb-3">Tue</h3>
                      <p class="text-base text-white">9am-5pm</p>
                    </div>
                    <div class="flex flex-col items-center px-4 py-2">
                      <h3 class="text-white pb-3">Wed</h3>
                      <p class="text-base text-white">9am-5pm</p>
                    </div>
                    <div class="flex flex-col items-center px-4 py-2">
                      <h3 class="text-white pb-3">Thu</h3>
                      <p class="text-base text-white">9am-5pm</p>
                    </div>
                    <div class="flex flex-col items-center px-4 py-2">
                      <h3 class="text-white pb-3">Fri</h3>
                      <p class="text-base text-white">9am-5pm</p>
                    </div>
                    <div class="flex flex-col items-center px-4 py-2">
                      <h3 class="text-white pb-3">Sat</h3>
                      <p class="text-base text-white">10AM - 2PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-5/12 bg-white relative z-40">
            <div class="px-6 md:px-4 xl:px-6 py-3 sm:py-10">
              <div class="mx-auto pb-4 sm:pb-10">
                <h2
                  class="text-xl sm:text-2xl lg:text-3xl font-medium text-left font-rubik"
                >
                  {{ contact.title }}
                </h2>
              </div>
              <form @submit.prevent="ContactSubmit">
                <div class="flex flex-col lg:flex-row">
                  <div class="w-full">
                    <div class="pt-1">
                      <input
                        type="text"
                        class="w-full border-0 border-b-2 border-brand-color py-3 focus:ring-0 focus:border-blue-400"
                        placeholder="Full Name"
                        autocomplete="off"
                        v-model="data.name"
                        :class="{ 'border-b-red-500': errors.name }"
                      />
                      <div class="text-red-500 pl-3" v-if="errors.name">
                        {{ errors.name[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="lg:pl-5 w-full pt-5 lg:pt-0">
                    <div class="pt-1">
                      <input
                        type="text"
                        class="w-full border-0 border-b-2 border-brand-color py-3 focus:ring-0 focus:border-blue-400"
                        placeholder="Mobile Number"
                        v-model="data.phone"
                        :class="{ 'border-red-500': errors.phone }"
                      />
                      <div class="text-red-500 pl-3" v-if="errors.phone">
                        {{ errors.phone[0] }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-full pt-5">
                  <div class="pt-1">
                    <input
                      type="email"
                      class="w-full border-0 border-b-2 border-brand-color py-3 focus:ring-0 focus:border-blue-400"
                      placeholder="Email"
                      v-model="data.email"
                      :class="{ 'border-red-500': errors.email }"
                    />
                    <div class="text-red-500 pl-3" v-if="errors.email">
                      {{ errors.email[0] }}
                    </div>
                  </div>
                </div>
                <div class="pt-6">
                  <span class="text-lg text-dark-sm font-medium font-rubik"
                    >Reason for contact</span
                  >
                  <div class="flex justify-between pt-3 flex-wrap">
                    <div class="radio">
                      <input
                        id="radio-1"
                        v-model="data.reason"
                        name="radio"
                        type="radio"
                        value="general"
                      />
                      <label for="radio-1" class="radio-label">General</label>
                    </div>
                    <div class="radio">
                      <input
                        id="radio-2"
                        v-model="data.reason"
                        name="radio"
                        type="radio"
                        value="quote"
                      />
                      <label for="radio-2" class="radio-label">Quote</label>
                    </div>
                    <div class="radio xl:pr-10">
                      <input
                        id="radio-3"
                        v-model="data.reason"
                        name="radio"
                        type="radio"
                        value="service request"
                      />
                      <label for="radio-3" class="radio-label">
                        Service Request</label
                      >
                    </div>
                  </div>
                  <div class="text-red-500 pl-3" v-if="errors.reason">
                    {{ errors.reason[0] }}
                  </div>
                </div>
                <div class="pt-6">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    class="w-full border-0 border-b-2 border-brand-color py-3 focus:ring-0 focus:border-blue-400"
                    placeholder="Tell us how we can help"
                    v-model="data.details"
                    :class="{ 'border-red-500': errors.details }"
                  ></textarea>
                  <div class="text-red-500 pl-3" v-if="errors.details">
                    {{ errors.details[0] }}
                  </div>
                </div>
                <div class="pt-6 w-full">
                  <button
                    class="w-full flex justify-center rounded-md py-2 px-6 bg-brand-color hover:bg-brand-color-hover focus:outline-none text-white"
                  >
                    <span v-if="!loader"> Submit</span>
                    <Loader v-if="loader" />
                  </button>
                </div>
              </form>
              <div class="py-10">
                <h2 class="text-lg text-dark-sm font-medium font-rubik">
                  Telephone and Email
                </h2>
                <div class="pt-3">
                  <ul>
                    <li class="py-2">
                      <div class="flex flex-col sm:flex-row">
                        <div class="sm:w-32 lg:w-28 xl:w-32">
                          <i
                            class="fas fa-phone-alt text-lg text-brand-color"
                          ></i>
                          <span class="pl-2 text-gray-800">Mobile</span>
                        </div>
                        <a
                          :href="`tel:${contact.phone}`"
                          class="text-base text-brand-color"
                        >
                          {{ contact.phone }}
                        </a>
                      </div>
                    </li>
                    <li class="py-2">
                      <div class="flex flex-col sm:flex-row">
                        <div class="sm:w-32 lg:w-28 xl:w-32">
                          <i class="fas fa-sms text-lg text-brand-color"></i>
                          <span class="pl-2 text-gray-800">SMS Text</span>
                        </div>
                        <a
                          :href="`sms:${contact.phone}`"
                          class="text-base text-brand-color"
                          >Click to Send (Recommended)</a
                        >
                      </div>
                    </li>
                    <li class="py-2">
                      <div class="flex flex-col sm:flex-row">
                        <div class="sm:w-32 lg:w-28 xl:w-32">
                          <i
                            class="fas fa-envelope text-lg text-brand-color"
                          ></i>
                          <span class="pl-2 text-gray-800">Email</span>
                        </div>
                        <p class="text-base text-brand-color">
                          <a
                            :href="`mailto:${contact.email}`"
                            class="underline break-all"
                            >{{ contact.email }}</a
                          >
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="min-h-screen flex items-center" v-else>
    <div class="loader-parent mt-16 mb-20">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import Divider from "@/components/Divider";
import Loader from "@/components/Loader/Loading-white";
import globalMeta from "@/mixins/meta.js";
export default {
  mixins: [globalMeta],
  middleware: ["checkSetting"],
  components: {
    Divider,
    Loader,
  },
  data() {
    return {
      data: {
        name: "",
        phone: "",
        email: "",
        reason: "",
        details: "",
      },
      loader: false,
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    meta() {
      return this.$store.state.meta.contact;
    },
    loading() {
      return this.$store.state.loading.loading;
    },
    contact() {
      return this.$store.state.contact.contact;
    },
  },
  methods: {
    async ContactSubmit() {
      try {
        this.loader = true;
        let { data } = await this.$axios.post("/contact/store", this.data);
        if (data.success === true) {
          this.$swal({
            icon: "success",
            title:
              "Contact Submited! You will get notifications by email soon. ",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
          });
          this.data.name = "";
          this.data.phone = "";
          this.data.email = "";
          this.data.reason = "";
          this.data.details = "";
          this.loader = false;
        }
      } catch (e) {
        this.loader = false;
        return;
      }
    },
  },
  async fetch() {
    await this.$store.dispatch("contact/fetchContactData");
    await this.$store.dispatch("meta/fetchMetaInfo", "contact");
  },
};
</script>
