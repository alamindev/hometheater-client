<template>
  <section class="px-4 sm:px-0">
    <div class="grid grid-cols-3 gap-2 md:gap-6 pt-6">
      <div
        class="flex flex-col items-center rounded-lg shadow-md bookings pt-2 pb-1 lg:px-2 lg:py-4"
      >
        <img
          loading="lazy"
          src="/images/users/date-range.svg"
          class="w-8 lg:w-10 pb-1 lg:pb-2 h-8 lg:h-10"
          alt="date-range.svg"
        />
        <h2
          class="text-center text-sm lg:text-2xl text-white font-bold pb-1 lg:pb-2"
        >
          Bookings
        </h2>
        <p class="text-center text-lg font-bold text-white">
          <span v-if="booking_count">{{ booking_count }}</span>
          <span v-else>0</span>
        </p>
      </div>
      <div
        class="flex flex-col items-center rounded-lg shadow-md reviews pt-2 lg:px-2 lg:py-4"
      >
        <img
          loading="lazy"
          src="/images/users/rate-review.svg"
          class="w-8 lg:w-10 pb-1 lg:pb-2 h-8 lg:h-10"
          alt="rate-review.svg"
        />
        <h2
          class="text-center text-sm lg:text-2xl text-white font-bold pb-1 lg:pb-2"
        >
          Reviews
        </h2>
        <p class="text-center text-lg font-bold text-white">
          <span v-if="reviews_count">{{ reviews_count }}</span>
          <span v-else>0</span>
        </p>
      </div>
      <div
        class="flex flex-col items-center rounded-lg shadow-md total_spent pt-2 lg:px-2 lg:py-4"
      >
        <img
          loading="lazy"
          src="/images/users/money-bill-alt.svg"
          class="w-8 lg:w-10 pb-1 lg:pb-2 h-8 lg:h-10"
          alt="money-bill-alt.svg"
        />
        <h2
          class="text-center text-sm lg:text-2xl text-white font-bold pb-1 lg:pb-2"
        >
          Total Spent
        </h2>
        <p class="text-center text-lg font-bold text-white">
          <span v-if="total_span">${{ total_span }}</span>
          <span v-else>0</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    booking_count() {
      return this.$store.state.users.dashboard.booking_count;
    },
    reviews_count() {
      return this.$store.state.users.dashboard.review_count;
    },
    total_span() {
      return this.$store.state.users.dashboard.total_span;
    },
  },
};
</script>

<style   scoped>
.bookings {
  background: #4e81ee;
}
.messages {
  background: #33d19b;
}
.reviews {
  background: #ea6969;
}
.total_spent {
  background: #634eee;
}
</style>
