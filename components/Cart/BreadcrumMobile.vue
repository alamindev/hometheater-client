<template>
  <div
    class="hidden sm:flex w-full bg-white shadow-lg px-4 lg:px-8 py-2 mb-3 rounded-lg"
  >
    <div
      v-if="step < 3"
      class="flex items-center pr-2 py-2 flex-shrink-0 font-rubik"
      :class="step === 1 ? 'is--active' : ''"
    >
      <div
        class="flex w-6 h-6 xl:w-10 xl:h-10 justify-center items-center rounded-full text-lg number--bg"
      >
        1
      </div>
      <p class="text-sm lg:text-base px-2 text--color">Order Details</p>
      <div class="">
        <i
          class="fas fa-angle-right text-base lg:text-lg xl:text-2xl icon--color"
        ></i>
      </div>
    </div>
    <div
      v-if="step < 3"
      class="flex items-center pr-2 py-2 pl-1 flex-shrink-0"
      :class="step === 2 ? 'is--active' : ''"
    >
      <div
        class="flex w-6 h-6 xl:w-10 xl:h-10 justify-center items-center rounded-full text-lg number--bg"
      >
        2
      </div>
      <p class="text-sm lg:text-base px-2 text--color">Zip code check</p>
      <div class="">
        <i
          class="fas fa-angle-right text-base lg:text-lg xl:text-2xl icon--color"
        ></i>
      </div>
    </div>
    <div
      class="flex items-center pr-2 py-2 pl-1 flex-shrink-0"
      :class="step === 3 ? 'is--active' : ''"
    >
      <div
        class="flex w-6 h-6 xl:w-10 xl:h-10 justify-center items-center rounded-full text-lg number--bg"
      >
        3
      </div>
      <p class="text-sm lg:text-base px-2 text--color">Add extra's</p>
      <div class="">
        <i
          class="fas fa-angle-right text-base lg:text-lg xl:text-2xl icon--color"
        ></i>
      </div>
    </div>
    <div
      class="flex items-center pr-2 py-2 pl-1 flex-shrink-0"
      :class="step === 4 ? 'is--active' : ''"
    >
      <div
        class="flex w-6 h-6 xl:w-10 xl:h-10 justify-center items-center rounded-full text-lg number--bg"
      >
        4
      </div>
      <p class="text-sm lg:text-base px-2 text--color">Upload Image</p>
      <div class="">
        <i
          class="fas fa-angle-right text-base lg:text-lg xl:text-2xl icon--color"
        ></i>
      </div>
    </div>
    <div
      v-if="step >= 3"
      class="flex items-center pr-2 py-2 pl-1 flex-shrink-0"
      :class="step === 5 ? 'is--active' : ''"
    >
      <div
        class="flex w-6 h-6 xl:w-10 xl:h-10 justify-center items-center rounded-full text-lg number--bg"
      >
        5
      </div>
      <p class="text-sm lg:text-base px-2 text--color">Schedule and Payment</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["step"],
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
