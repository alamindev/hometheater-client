<template>
  <main class="custom-gradient booking-page">
    <section class="py-8 sm:py-12 relative">
      <div class="px-4 lg:px-12 relative">
        <Heading
          v-if="header_product"
          :title="header_product.title ? header_product.title : ''"
          :text="header_product.description ? header_product.description : ''"
          column="w-full md:w-10/12 lg:w-7/12 xl:w-6/12"
          h_class="font-semibold"
        />
      </div>
      <div
        class="container mx-auto px-4 lg:px-16 py-7 sm:py-10 md:py-24 relative"
      >
        <Dot position="right-0 top-0 z-30 hidden md:block" />
        <div v-if="!loading" class="relative z-40">
          <Product
            Rootclass="grid gap-3 sm:gap-x-5 xl:gap-x-8 sm:gap-y-10 lg:gap-y-16 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            :products="products"
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
import Dot from "@/components/Dot";
import Heading from "@/components/Heading";
import Product from "@/components/Product/Product";
import globalMeta from "@/mixins/meta.js";

export default {
  mixins: [globalMeta],
  middleware: ["checkSetting"],
  components: {
    Heading,
    Dot,
    Product,
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    meta() {
      return this.$store.state.meta.product;
    },
    products() {
      return this.$store.state.product.products;
    },
    loading() {
      return this.$store.state.loading.loading;
    },
    header_product() {
      return this.$store.state.product.product_header;
    },
  },
  methods: {},
  created() {
    if (this.$store.state.product.products <= 0) {
      this.$store.dispatch("product/fetchProducts");
    }
  },
  async fetch() {
    if (this.$store.state.product.products <= 0) {
      await this.$store.dispatch("meta/fetchMetaInfo", "product");
    }
  },
};
</script>
