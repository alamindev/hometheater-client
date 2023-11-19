<template>
  <footer class="relative z-20 font-rubik">
    <div class="bg-dark-sm py-20 px-4 sm:px-8 lg:px-20">
      <div class="container mx-auto flex flex-col justify-between">
        <div class="sm:flex flex-wrap">
          <div class="w-full md:w-6/12 lg:w-4/12 md:pr-10 pb-5 sm:pb-0">
            <div class="flex items-center pb-1 sm:pb-5 md:pb-10 -mt-2">
              <img
                v-if="setting.footer_logo"
                :src="imgurl + 'storage' + setting.footer_logo"
                alt="client-affiliation"
              />
              <img v-else src="/images/logo-white-full.svg" alt="logo white" />
            </div>
            <p
              class="text-whitesmoke text-base pt-3"
              v-if="setting.footer_details"
            >
              {{ setting.footer_details }}
            </p>
            <ul class="flex items-center -ml-2 pt-5" v-if="setting">
              <li class="px-2" v-if="setting.facebook">
                <a
                  :href="setting.facebook"
                  class="
                    w-12
                    h-12
                    flex
                    justify-center
                    items-center
                    border border-white
                    text-whitesmoke
                    rounded-full
                  "
                >
                  <i class="fab fa-facebook-f"></i>
                </a>
              </li>
              <li class="px-2" v-if="setting.instagram">
                <a
                  :href="setting.instagram"
                  class="
                    w-12
                    h-12
                    flex
                    justify-center
                    items-center
                    border border-white
                    text-whitesmoke
                    rounded-full
                  "
                >
                  <i class="fab fa-instagram"></i>
                </a>
              </li>
              <li class="px-2" v-if="setting.twitter">
                <a
                  :href="setting.twitter"
                  class="
                    w-12
                    h-12
                    flex
                    justify-center
                    items-center
                    border border-white
                    text-whitesmoke
                    rounded-full
                  "
                >
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
          <div
            class="
              w-full
              sm:w-6/12
              md:w-3/12
              lg:w-2/12
              md:pl-3
              pt-3
              sm:pt-8
              lg:pt-0
            "
          >
            <span
              class="
                inline-block
                text-whitesmoke text-2xl
                pb-1
                sm:pb-5
                md:pb-10
              "
            >
              Company
            </span>
            <ul class="flex sm:block">
              <li class="py-2 pr-2 sm:pr-0">
                <nuxt-link
                  to="/about"
                  class="text-whitesmoke text-sm sm:text-base"
                >
                  About us
                </nuxt-link>
              </li>
              <li
                class="py-2 pr-2 sm:pr-0"
                v-for="company in company_pages"
                :key="company.id"
              >
                <nuxt-link
                  :to="`/page/${company.slug}`"
                  class="text-whitesmoke text-sm sm:text-base"
                >
                  {{ company.title }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div
            class="
              w-full
              sm:w-6/12
              md:w-3/12
              lg:w-2/12
              md:pl-3
              pt-3
              sm:pt-8
              lg:pt-0
            "
          >
            <span
              class="
                inline-block
                text-whitesmoke text-2xl
                pb-1
                sm:pb-5
                md:pb-10
              "
            >
              Service
            </span>
            <ul class="flex sm:block">
              <li
                class="py-2 pr-3 sm:pr-0"
                v-for="service in service_pages"
                :key="service.id"
              >
                <nuxt-link
                  :to="`/page/${service.slug}`"
                  class="text-whitesmoke text-sm sm:text-base"
                >
                  {{ service.title }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div
            class="
              w-full
              sm:w-6/12
              md:w-6/12
              lg:w-2/12
              md:pl-3
              pt-3
              sm:pt-8
              lg:pt-0
            "
          >
            <span
              class="
                inline-block
                text-whitesmoke text-2xl
                pb-1
                sm:pb-5
                md:pb-10
              "
            >
              On Social
            </span>
            <ul class="flex sm:block" v-if="setting">
              <li class="py-2 pr-3 sm:pr-0" v-if="setting.instagram">
                <a
                  :href="setting.instagram"
                  target="_blank"
                  class="text-whitesmoke text-sm sm:text-base"
                  >Instagram</a
                >
              </li>
              <li class="py-2 pr-3 sm:pr-0" v-if="setting.facebook">
                <a
                  :href="setting.facebook"
                  target="_blank"
                  class="text-whitesmoke text-sm sm:text-base"
                >
                  Facebook
                </a>
              </li>
              <li class="py-2 pr-3 sm:pr-0" v-if="setting.twitter">
                <a
                  :href="setting.twitter"
                  target="_blank"
                  class="text-whitesmoke text-sm sm:text-base"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div
            class="
              w-full
              sm:w-6/12
              md:w-6/12
              lg:w-2/12
              md:pl-3
              pt-3
              sm:pt-8
              lg:pt-0
            "
          >
            <div class="flex lg:items-start flex-col">
              <span
                class="
                  inline-block
                  text-whitesmoke text-2xl
                  pb-1
                  sm:pb-5
                  md:pb-10
                "
              >
                Contact us
              </span>
              <ul class="flex flex-col sm:flex-row sm:block" v-if="setting">
                <li class="py-2 pr-3 sm:pr-0" v-if="setting.contact_email">
                  <a
                    :href="`mailto:${setting.contact_email}`"
                    class="text-whitesmoke text-base"
                    >{{ setting.contact_email }}</a
                  >
                </li>
                <li class="py-2 pr-3 sm:pr-0" v-if="setting.contact_number">
                  <a
                    :href="`sms:${setting.contact_number}`"
                    class="text-whitesmoke text-base"
                  >
                    {{ setting.contact_number }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="py-10 w-full px-4">
        <p
          v-if="setting"
          class="text-center text-gray-800 md:text-base text-sm"
        >
          {{
            setting.copyright
              ? setting.copyright
              : "Home Theater PROZ. All rights reserved."
          }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    setting() {
      return this.$store.state.setting;
    },
    service_pages() {
      return this.$store.state.service_pages;
    },
    company_pages() {
      return this.$store.state.company_pages;
    },
  },
};
</script>

<style>
</style>
