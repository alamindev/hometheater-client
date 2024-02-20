<template>
  <div
    class="hidden sm:flex w-full bg-white shadow-lg px-4 lg:px-8 py-2 mb-3 rounded-lg"
  >
    <div
      class="flex items-center xl:pr-3 2xl:pr-5 py-2 flex-shrink-0 font-rubik"
      :class="step === 1 ? 'is--active' : ''"
    >
      <div
        class="flex w-8 h-8 justify-center items-center rounded-full text-lg number--bg text-gray-400"
      >
        1
      </div>
      <p
        class="text-sm lg:text-base px-1 lg:px-2 xl:px-3 text--color text-gray-400"
      >
        Order Details
      </p>
      <div class="">
        <i class="fas fa-angle-right text-base icon--color text-gray-400"></i>
      </div>
    </div>
    <div
      v-if="!is_check_zipcode"
      class="flex items-center xl:pr-3 2xl:pr-5 py-2 pl-1 lg:pl-2 flex-shrink-0"
      :class="step === 2 ? 'is--active' : ''"
    >
      <div
        class="flex w-8 h-8 justify-center items-center rounded-full text-lg number--bg text-gray-400"
      >
        2
      </div>
      <p
        class="text-sm lg:text-base px-1 lg:px-2 xl:px-3 text--color text-gray-400"
      >
        Zip code check
      </p>
      <div class="">
        <i class="fas fa-angle-right text-base icon--color text-gray-400"></i>
      </div>
    </div>
    <div
      class="flex items-center xl:pr-3 2xl:pr-5 py-2 pl-1 lg:pl-2 flex-shrink-0"
      :class="step === 3 ? 'is--active' : ''"
    >
      <div
        class="flex w-8 h-8 justify-center items-center rounded-full text-lg number--bg text-gray-400"
      >
        3
      </div>
      <p
        class="text-sm lg:text-base px-1 lg:px-2 xl:px-3 text--color text-gray-400"
      >
        Add extra's
      </p>
      <div class="">
        <i class="fas fa-angle-right text-base icon--color text-gray-400"></i>
      </div>
    </div>
    <div
      class="flex items-center xl:pr-3 2xl:pr-5 py-2 pl-1 lg:pl-2 flex-shrink-0"
      :class="step === 4 ? 'is--active' : ''"
    >
      <div
        class="flex w-8 h-8 justify-center items-center rounded-full text-lg number--bg text-gray-400"
      >
        4
      </div>
      <p
        class="text-sm lg:text-base px-1 lg:px-2 xl:px-3 text--color text-gray-400"
      >
        Upload Image
      </p>
      <div class="">
        <i class="fas fa-angle-right text-base icon--color text-gray-400"></i>
      </div>
    </div>
    <div
      class="flex items-center xl:pr-3 2xl:pr-5 py-2 pl-1 lg:pl-2 flex-shrink-0"
      :class="step === 5 ? 'is--active' : ''"
    >
      <div
        class="flex w-8 h-8 justify-center items-center rounded-full text-lg number--bg text-gray-400"
      >
        5
      </div>
      <p
        class="text-sm lg:text-base px-1 lg:px-2 xl:px-3 text--color text-gray-400"
      >
        Schedule and Payment
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["step", "is_check_zipcode"],
};
</script>

<style >
.is--active .number--bg {
  background: rgb(11, 158, 11);
  color: #fff;
}
.is--active .icon--color {
  color: #24364a;
}
.is--active .text--color {
  color: #24364a;
}
</style>
