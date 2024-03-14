<template>
  <main class="custom-gradient booking-page">
    <section class="py-8 sm:py-12 relative">
      <div class="px-4 lg:px-12 relative">
        <Heading
          v-if="header_service"
          :title="
            header_service.booking_title ? header_service.booking_title : ''
          "
          :text="
            header_service.booking_details ? header_service.booking_details : ''
          "
          column="w-full md:w-10/12 lg:w-7/12 xl:w-6/12"
          h_class="font-semibold"
        />
      </div>
      <div
        class="container mx-auto px-4 lg:px-16 py-7 sm:py-10 md:py-24 relative"
      >
        <Dot position="right-0 top-0 z-30 hidden md:block" />
        <div v-if="!loading" class="relative z-40">
          <Booking
            v-if="services.length > 0"
            Rootclass="grid gap-3 sm:gap-x-5 xl:gap-x-8 sm:gap-y-10 lg:gap-y-16 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            :services="services"
            title="text-xs text-sm md:text-base"
          />
        </div>
        <div v-else class="loader-parent mt-16">
          <div class="loader"></div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Booking from "@/components/Booking/Booking";
import Dot from "@/components/Dot";
import Heading from "@/components/Heading";
import globalMeta from "@/mixins/meta.js";

export default {
  mixins: [globalMeta],
  middleware: ["checkSetting"],
  components: {
    Heading,
    Dot,
    Booking,
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    meta() {
      return this.$store.state.meta.booking;
    },
    services() {
      return this.$store.state.booking.services;
    },
    loading() {
      return this.$store.state.loading.loading;
    },
    header_service() {
      return this.$store.state.booking.service_header;
    },
  },
  methods: {},
  async fetch({ store }) {
    if (store.state.booking.services <= 0) {
      await Promise.all([
        store.dispatch("meta/fetchMetaInfo", "booking"),
        store.dispatch("booking/fetchServices"),
      ]);
    }
  },
};
</script>
