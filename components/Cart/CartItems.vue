<template>
  <div class="relative">
    <div class="hidden lg:flex justify-between items-center border-b pb-2">
      <h1 class="custom--text-cart-title font-bold font-rubik text-gray-600">
        Cart items
      </h1>
      <p
        class="text-base font-bold text-gray-600 mr-5 custom--text-cart-title"
        v-if="count === 1"
      >
        {{ count }} Item
      </p>
      <p
        class="text-base font-bold text-gray-600 mr-3 custom--text-cart-title"
        v-else
      >
        {{ count }} Items
      </p>
    </div>
    <client-only>
      <div>
        <div
          v-if="cartdata.services.length > 0"
          class="border-b last:border-b-0"
        >
          <div class="pt-3 pb-6">
            <table class="w-full text-sm sm:text-base desktop--design">
              <thead class="text-left">
                <tr>
                  <th
                    class="text-gray-500 font-medium w-72 md:w-80 lg:w-auto lg:px-2 py-1.5 md:py-2 border-b"
                  >
                    Service details
                  </th>
                  <th
                    class="text-gray-500 font-medium w-24 xl:w-32 lg:px-2 py-2 md:py-3 border-b"
                  >
                    Price
                  </th>
                  <th
                    class="text-gray-500 font-medium w-28 xl:w-40 lg:px-2 py-2 md:py-3 border-b"
                  >
                    Quantity
                  </th>
                  <th
                    class="text-gray-500 font-medium w-24 lg:px-2 py-2 md:py-3 border-b"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b last:border-b-0"
                  v-for="cart in cartdata.services"
                  :key="cart.id"
                >
                  <td class="py-3">
                    <div class="flex">
                      <figure class="w-20 sm:w-24 shrink-0">
                        <img
                          loading="lazy"
                          class="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-md"
                          :src="imgurl + 'storage' + cart.image"
                          :alt="cart.title"
                        />
                      </figure>
                      <div
                        class="pl-4 font-rubik flex flex-col justify-between items-start"
                      >
                        <nuxt-link
                          :to="`/booking/${cart.slug}`"
                          class="w-40 lg:w-auto font-medium text-sm xl:text-base pr-3 sm:pr-5 line-clamp-3"
                        >
                          {{ cart.title }}
                        </nuxt-link>
                        <p
                          class="text-brand-color font-bold text-sm"
                          v-if="cart.totalHour == 1"
                        >
                          Duration: {{ cart.totalHour }} hour
                        </p>
                        <p
                          class="text-brand-color font-bold text-sm"
                          v-if="cart.totalHour != 1 && cart.totalHour != 8"
                        >
                          Duration: {{ cart.totalHour }} hours
                        </p>
                        <p
                          class="text-brand-color font-bold text-sm"
                          v-if="cart.totalHour == 8"
                        >
                          Duration: 1 Day
                        </p>
                        <button
                          type="button"
                          class="text-red-600 text-sm"
                          @click="Remove(cart.id)"
                        >
                          <i class="far fa-trash-alt"></i> Remove
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="font-rubik">${{ cart.original_price }}</p>
                  </td>
                  <td>
                    <div class="flex w-full">
                      <button
                        type="button"
                        class="font-bold px-2 border-l border-t border-b"
                        @click="decrement(cart.id, cart.duration, cart.type)"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        v-model="cart.item"
                        readonly
                        class="border-gray-300 w-12 text-center h-8 rounded-sm focus:ring-0 focus:outline-none"
                      />
                      <button
                        type="button"
                        @click="increment(cart.id, cart.duration, cart.type)"
                        class="font-bold px-2 border-r border-t border-b"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <p class="font-rubik">${{ cart.price }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="mobile--design">
              <div
                class="w-full last:border-b-0 border-b last:pb-2 pb-5"
                v-for="cart in cartdata.services"
                :key="cart.id"
              >
                <div class="flex justify-between">
                  <div class="flex">
                    <figure class="w-20 sm:w-24 shrink-0">
                      <img
                        loading="lazy"
                        class="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-md"
                        :src="imgurl + 'storage' + cart.image"
                        :alt="cart.title"
                      />
                    </figure>
                    <div
                      class="pl-4 font-rubik flex flex-col justify-between items-start"
                    >
                      <nuxt-link
                        :to="`/booking/${cart.slug}`"
                        class="w-40 lg:w-auto font-medium text-sm xl:text-base pr-3 sm:pr-5 line-clamp-3"
                      >
                        {{ cart.title }}
                      </nuxt-link>
                      <p
                        class="text-brand-color font-bold text-sm"
                        v-if="cart.totalHour == 1"
                      >
                        Duration: {{ cart.totalHour }} hour
                      </p>
                      <button
                        type="button"
                        class="text-red-600 text-sm"
                        @click="Remove(cart.id)"
                      >
                        <i class="far fa-trash-alt"></i> Remove
                      </button>
                    </div>
                  </div>
                  <div class="">
                    <p class="font-rubik">${{ cart.original_price }}</p>
                  </div>
                </div>
                <div class="flex pt-5">
                  <div class="flex w-full">
                    <button
                      type="button"
                      class="font-bold px-2 border-l border-t border-b"
                      @click="decrement(cart.id, cart.duration, cart.type)"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      v-model="cart.item"
                      readonly
                      class="border-gray-300 w-12 text-center h-8 rounded-sm focus:ring-0 focus:outline-none"
                    />
                    <button
                      type="button"
                      @click="increment(cart.id, cart.duration, cart.type)"
                      class="font-bold px-2 border-r border-t border-b"
                    >
                      +
                    </button>
                  </div>
                  <div class="">
                    <p class="font-rubik">${{ cart.price }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="cartdata.products.length > 0">
          <div class="pb-3 pt-6">
            <table class="w-full text-sm sm:text-base desktop--design">
              <thead class="text-left">
                <tr>
                  <th
                    class="text-gray-500 font-medium w-72 md:w-80 lg:w-auto lg:px-2 py-1.5 md:py-2 border-b"
                  >
                    Product details
                  </th>
                  <th
                    class="text-gray-500 font-medium w-24 xl:w-32 lg:px-2 py-2 md:py-3 border-b"
                  >
                    Price
                  </th>
                  <th
                    class="text-gray-500 font-medium w-28 xl:w-40 lg:px-2 py-2 md:py-3 border-b"
                  >
                    Quantity
                  </th>
                  <th
                    class="text-gray-500 font-medium w-24 lg:px-2 py-2 md:py-3 border-b"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b last:border-b-0"
                  v-for="cart in cartdata.products"
                  :key="cart.id"
                >
                  <td class="py-3">
                    <div class="flex">
                      <figure class="w-20 sm:w-24 shrink-0">
                        <img
                          loading="lazy"
                          class="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-md"
                          :src="imgurl + 'storage' + cart.image"
                          :alt="cart.title"
                        />
                      </figure>
                      <div
                        class="pl-4 font-rubik flex flex-col justify-between items-start"
                      >
                        <nuxt-link
                          :to="`/shop/${cart.slug}`"
                          class="w-40 lg:w-auto font-medium text-sm xl:text-base pr-3 sm:pr-5 line-clamp-3"
                        >
                          {{ cart.title }}
                        </nuxt-link>

                        <button
                          type="button"
                          class="text-red-600 text-sm"
                          @click="Remove(cart.id)"
                        >
                          <i class="far fa-trash-alt"></i> Remove
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="font-rubik">${{ cart.original_price }}</p>
                  </td>
                  <td>
                    <div class="flex w-full">
                      <button
                        type="button"
                        class="font-bold px-2 border-l border-t border-b"
                        @click="decrement(cart.id, cart.duration, cart.type)"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        v-model="cart.item"
                        readonly
                        class="border-gray-300 w-12 text-center h-8 rounded-sm focus:ring-0 focus:outline-none"
                      />
                      <button
                        type="button"
                        @click="increment(cart.id, cart.duration, cart.type)"
                        class="font-bold px-2 border-r border-t border-b"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <p class="font-rubik">${{ cart.price }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="mobile--design">
              <div
                class="w-full border-b first:pt-0 pt-4 pb-4"
                v-for="cart in cartdata.products"
                :key="cart.id"
              >
                <div class="flex justify-between">
                  <div class="flex">
                    <figure class="w-20 sm:w-24 shrink-0">
                      <img
                        loading="lazy"
                        class="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-md"
                        :src="imgurl + 'storage' + cart.image"
                        :alt="cart.title"
                      />
                    </figure>
                    <div
                      class="pl-4 font-rubik flex flex-col justify-between items-start"
                    >
                      <nuxt-link
                        :to="`/shop/${cart.slug}`"
                        class="w-40 lg:w-auto font-medium text-sm xl:text-base pr-3 sm:pr-5 line-clamp-3"
                      >
                        {{ cart.title }}
                      </nuxt-link>
                      <button
                        type="button"
                        class="text-red-600 text-sm"
                        @click="Remove(cart.id)"
                      >
                        <i class="far fa-trash-alt"></i> Remove
                      </button>
                    </div>
                  </div>
                  <div class="">
                    <p class="font-rubik">${{ cart.original_price }}</p>
                  </div>
                </div>
                <div class="flex pt-5">
                  <div class="flex w-full">
                    <button
                      type="button"
                      class="font-bold px-2 border-l border-t border-b"
                      @click="decrement(cart.id, cart.duration, cart.type)"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      v-model="cart.item"
                      readonly
                      class="border-gray-300 w-12 text-center h-8 rounded-sm focus:ring-0 focus:outline-none"
                    />
                    <button
                      type="button"
                      @click="increment(cart.id, cart.duration, cart.type)"
                      class="font-bold px-2 border-r border-t border-b"
                    >
                      +
                    </button>
                  </div>
                  <div class="">
                    <p class="font-rubik">${{ cart.price }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </client-only>
    <SuggestionCart />
    <div class="lg:pt-8 lg:mt-8 lg:border-t">
      <nuxt-link
        to="/booking"
        class="flex items-center absolute -bottom-7 lg:relative lg:bottom-0"
      >
        <i class="fas fa-long-arrow-alt-left"></i>
        <span class="pl-3 font-medium text-brand-color">Continue Shopping</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import SuggestionCart from "@/components/SuggestionCart";
import { mapGetters } from "vuex";
export default {
  name: "CartItems",
  data() {
    return {
      item: 1,
      imgurl: process.env.imgUrl,
    };
  },
  component: {
    SuggestionCart,
  },
  computed: {
    ...mapGetters({
      count: "cart/cartMainItem",
      total: "cart/getTotal",
    }),
    cartdata() {
      return this.$store.state.cart.cartobj;
    },
  },
  methods: {
    Remove(id) {
      this.$store.dispatch("cart/removeCart", id);
    },
    decrement(id, install_time, type) {
      this.$store.dispatch("cart/decrement", { id, install_time, type });
    },
    increment(id, install_time, type) {
      this.$store.dispatch("cart/increment", { id, install_time, type });
    },
  },
};
</script>


