<template>
  <div class="pt-12 pb-10 sm:pb-0" v-if="suggests.length > 0">
    <h3
      class="text-lg sm:text-xl lg:text-2xl pb-8 font-medium text-gray-800 font-rubik"
    >
      Services you might like
    </h3>

    <div
      class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-5 sm:gap-6"
    >
      <div
        class="relative cursor-pointer"
        @click="showModal(suggest.id)"
        v-for="suggest in suggests"
        :key="suggest.id"
      >
        <i
          class="fas fa-plus-circle text-brand-color absolute right-0 top-0 -mr-2 -mt-3 bg-white rounded-full text-2xl z-20"
        ></i>
        <figure>
          <nuxt-img
            quality="50"
            loading="lazy"
            class="w-full rounded-md border border-brand-color h-40 sm:h-56 object-cover"
            :src="imgurl + 'storage' + suggest.image"
            :alt="suggest.slug"
          />
        </figure>
        <p class="text-sm md:text-base font-medium text-gray-800 pt-1 pl-2">
          {{ suggest.title }}
        </p>
      </div>
    </div>
    <modal
      name="showimage"
      class="relative modal--showimg"
      :clickToClose="false"
      :scrollable="true"
      :adaptive="true"
      height="auto"
      width="600"
    >
      <div class="bg-white modal-sub relative rounded-md">
        <div class="pt-2 absolute right-2 z-20">
          <div
            @click="hidemodal"
            class="cursor-pointer w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center"
          >
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div
          class="w-full pb-5 pt-10 pl-4 sm:pl-10 pr-4 sm:pr-8 bg-light-gray rounded-md"
        >
          <h1
            class="font-rubik text-xl sm:text-2xl lg:text-3xl font-medium text-dark-sm text-left"
          >
            {{ service.title }}
          </h1>
          <div
            class="font-rubik flex items-center flex-col sm:flex-row pt-3 pb-10"
            v-if="service.rating != ''"
          >
            <div class="pr-1">
              <client-only>
                <star-rating
                  v-bind:max-rating="5"
                  v-bind:star-size="20"
                  v-bind:increment="0.5"
                  :show-rating="false"
                  :rating="Number(service.rating)"
                  read-only
                >
                </star-rating>
              </client-only>
            </div>
            <div class="flex mt-1 items-center">
              <h2 class="text-sm xl:text-lg font-medium text-gray-700 pr-2">
                Rated {{ service.rating }} out of 5 star Reviews
              </h2>
            </div>
          </div>
          <p
            v-else
            class="text-brand-sub-header font-rubik text-dark-sm pt-6 pb-5 font-medium"
          >
            No reviews yet!
          </p>
          <span class="inline-block text-4xl font-bold text-brand-color pb-2">
            ${{ service.price }}
          </span>
          <span class="block text-xl text-dark-sm font-medium font-rubik pb-2">
            Service Includes
          </span>
          <ul class="custom_ul list-inside list-disc">
            <li
              class="py-1 text-brand-gray"
              :key="index"
              v-for="(service_include, index) in service.service_includes"
            >
              {{ service_include }}
            </li>
          </ul>
          <div
            class="flex flex-col sm:flex-row lg:flex-col xl:flex-row py-8 sm:justify-between sm:items-start"
          >
            <div class="flex items-center">
              <span
                class="inline-block text-xl text-dark-sm font-medium font-rubik pb-2 pr-5"
              >
                Quantity
              </span>
              <div class="relative border-none shadow-md rounded-md">
                <select
                  v-model="item"
                  class="bg-light-5 w-20 text-brand-gray cursor-pointer appearance-none border-none inline-block py-3 pl-3 pr-8 rounded leading-tight focus:ring-0"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div>
          </div>
          <div
            class="pt-4 pb-5 flex justify-center items-center gap-3 sm:gap-3"
          >
            <nuxt-link
              :to="`/booking/${service.slug}`"
              class="px-4 sm:px-8 py-2 text-white bg-brand-color hover:bg-brand-color-hover rounded-md w-48 max-w-full text-center"
              >Learn more</nuxt-link
            >
            <button
              type="button"
              class="px-4 sm:px-8 py-2 text-black bg-yellow-400 hover:bg-yellow-500 rounded-md w-48 max-w-full text-center"
              @click="addToCart(service)"
              v-if="getDatas.includes(service.id)"
            >
              Add to Cart
            </button>
            <button
              type="button"
              v-else
              class="px-4 sm:px-8 py-2 text-black bg-yellow-400 hover:bg-yellow-500 rounded-md w-48 max-w-full text-center"
              @click="addToCart(service)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SuggestServicesCart",
  data() {
    return {
      imgurl: process.env.imgUrl,
      service: {},
      item: 1,
    };
  },
  computed: {
    ...mapGetters({
      getDatas: "cart/getDatas",
    }),
    suggests() {
      return this.$store.state.cart.suggests;
    },
  },
  methods: {
    hidemodal() {
      this.$modal.hide("showimage");
    },
    async showModal(id) {
      const { data } = await this.$axios.get(`/cart/booking/${id}`);
      if (data.success === true) {
        this.$modal.show("showimage");
        this.service = data.service;
      }
    },
    addToCart(data) {
      let duration = data.duration * +this.item;
      if (duration <= 8) {
        let ids = [];
        for (let i = 0; i < this.item; i++) {
          ids.push(data.id);
        }
        let newData = {
          ...data,
          price: data.price * +this.item,
          original_price: data.price,
          item: this.item,
          totalHour: data.duration,
          ids: ids,
        };
        this.$store.dispatch("cart/setCartDatas", newData);
        this.$store.dispatch("cart/suggestData");
        this.$modal.hide("showimage");
      } else {
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title:
            "Service Duration limited! Please checkout selected item first.",
          showConfirmButton: false,
          timer: 10000,
        });
      }
    },
  },
};
</script>

<style>
</style>
