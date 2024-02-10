<template>
  <div class="">
    <div v-if="header" class="flex justify-between items-center border-b pb-3">
      <h1 class="custom--text-cart-title font-bold font-rubik text-gray-600">
        Shopping Cart
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
      <div class="md:pb-5 md:pt-5 py-2" v-if="carts.length">
        <table class="w-full text-sm sm:text-base desktop--design">
          <thead class="text-left">
            <tr>
              <th
                class="text-gray-500 font-medium w-72 md:w-80 lg:w-auto lg:px-2 py-5 border-b"
              >
                Service details
              </th>
              <th
                class="text-gray-500 font-medium w-28 lg:w-32 lg:px-2 py-5 border-b"
              >
                Price
              </th>
              <th class="text-gray-500 font-medium w-40 lg:px-2 py-5 border-b">
                Quantity
              </th>
              <th class="text-gray-500 font-medium w-16 lg:px-2 py-5 border-b">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b" v-for="cart in carts" :key="cart.id">
              <td class="py-2">
                <div class="flex pt-3">
                  <figure class="w-24">
                    <img
                      loading="lazy"
                      class="w-24 h-20 object-cover rounded-md"
                      :src="imgurl + 'storage' + cart.image"
                      :alt="cart.title"
                    />
                  </figure>
                  <div
                    class="pl-4 font-rubik flex flex-col justify-between items-start"
                  >
                    <nuxt-link
                      :to="`/booking/${cart.slug}`"
                      class="w-40 lg:w-auto inline-block font-medium text-sm sm:text-base overflow-ellipsis overflow-hidden pr-5"
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
                      class="text-gray-500 text-sm"
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
                    @click="decrement(cart.id, cart.duration)"
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
                    @click="increment(cart.id, cart.duration)"
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
            class="w-full border-b pb-5 pt-5"
            v-for="cart in carts"
            :key="cart.id"
          >
            <div class="flex justify-between">
              <div class="flex">
                <figure class="w-24">
                  <img
                    loading="lazy"
                    class="w-24 h-20 object-cover rounded-md"
                    :src="imgurl + 'storage' + cart.image"
                    :alt="cart.title"
                  />
                </figure>
                <div
                  class="pl-4 font-rubik flex flex-col justify-between items-start"
                >
                  <nuxt-link
                    :to="`/booking/${cart.slug}`"
                    class="w-40 lg:w-auto font-medium text-sm sm:text-base pb-5 overflow-ellipsis overflow-hidden pr-5"
                  >
                    {{ cart.title }}
                  </nuxt-link>
                  <button
                    type="button"
                    class="text-gray-500 text-sm"
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
                  @click="decrement(cart.id, cart.duration)"
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
                  @click="increment(cart.id, cart.duration)"
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
      <div class="w-full" v-else>
        <h2 class="text-center py-4">Cart is empty!</h2>
      </div>
    </client-only>
    <SuggestionCart />
    <div class="pt-4 sm:pt-6 md:pt-10">
      <nuxt-link to="/booking" class="flex items-center">
        <i class="fas fa-long-arrow-alt-left"></i>
        <span class="pl-3 font-medium">Continue Shopping</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import SuggestionCart from "@/components/SuggestionCart";
import { mapGetters } from "vuex";
export default {
  name: "CartItems",
  props: ["header"],
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
      count: "cart/cartDataCount",
      total: "cart/getTotal",
    }),
    carts() {
      return this.$store.state.cart.carts;
    },
  },
  methods: {
    Remove(id) {
      this.$store.dispatch("cart/removeCart", id);
    },
    decrement(id, install_time) {
      this.$store.dispatch("cart/decrement", { id, install_time });
    },
    increment(id, install_time) {
      this.$store.dispatch("cart/increment", { id, install_time });
    },
  },
};
</script>


