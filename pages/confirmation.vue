<template>
  <section class="sm:px-4 xl:px-16 sm:pt-8 pb-20 cart--page">
    <div class="container mx-auto">
      <div class="bg-white shadow-lg rounded-md p-4 md:p-10 lg:p-20">
        <div v-show="!is_loading">
          <div class="flex px-10 py-20 flex-col items-center font-rubik">
            <div class="flex flex-col justify-center items-center">
              <i class="fas fa-check-circle text-2xl text-brand-color"></i>
              <h3 class="text-brand-color text-3xl font-medium">Success!</h3>
            </div>
            <div v-if="!only_product" class="pb-4">
              <p class="text-gray-400 pt-8 pb-3">
                Your Product & Services Ordered successfully Completed!
              </p>
            </div>
            <div v-else class="pb-4">
              <p class="text-gray-400 pt-8 pb-3">
                Your Product Ordered successfully Completed!
              </p>
            </div>
            <nuxt-link
              to="users/dashboard"
              class="py-3 px-10 bg-brand-color hover:bg-brand-color-hover text-white rounded-md"
              >View Dashboard</nuxt-link
            >
          </div>
        </div>
        <div
          v-show="is_loading"
          class="min-h-[300px] flex justify-center items-center"
        >
          <div class="loader-parent mt-16 mb-20">
            <div class="loader"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/Loader/Loading-white";
export default {
  components: {
    Loader,
  },
  data() {
    return {
      is_loading: true,
      payment_id: null,
      status: null,
      only_product: false,
    };
  },

  async mounted() {
    this.is_loading = true;
    this.status = this.$route.query.redirect_status;
    this.payment_id = this.$route.query.payment_intent;

    if (this.status === "succeeded" && this.payment_id) {
      if (localStorage.getItem("confirm_data")) {
        const confirm_data = await JSON.parse(
          localStorage.getItem("confirm_data")
        );

        const newData = {
          ...confirm_data,
          payment_id: this.payment_id,
        };

        this.$store.dispatch("cart/finishedCheckout", newData).then((res) => {
          if (res.success == true) {
            if (res.type === 1) {
              this.only_product = true;
            }
            this.is_loading = false;
          }
        });
      } else {
        this.$router.push("/");
      }
    } else {
      this.$router.push("/");
    }
  },
};
</script>