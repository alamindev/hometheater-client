<template>
  <div
    class="sidebar bg-blug-10 py-5 px-5 w-64 -ml-64 xl:w-80 md:ml-0 fixed top-0 bottom-0 left-0 sidebar--click"
    :class="isshowing ? 'showing' : ''"
  >
    <div class="logo__area flex items-center justify-between pb-10 border-b">
      <nuxt-link to="/" exact class="logo px-5 pt-5 flex items-center">
        <figure class="pr-2">
          <nuxt-img
            quality="50"
            loading="lazy"
            class="h-10 w-10"
            v-if="setting.site_logo"
            :src="imgurl + 'storage' + setting.site_logo"
            alt="client-affiliation"
          />
        </figure>
        <span class="hidden md:block font-rubik text-gray-800 text-lg">{{
          setting.site_title
        }}</span>
      </nuxt-link>
      <div class="nav__hidebtn block md:hidden">
        <i
          @click="hide"
          class="fas fa-times text-xl text-gray-700 cursor-pointer bars--click"
        ></i>
      </div>
    </div>
    <div class="pr-10">
      <Clock />
    </div>
    <client-only>
      <div class="main__link">
        <perfect-scrollbar>
          <ul class="list-none -ml-5 pr-10 xl:pr-16">
            <li class="py-1">
              <nuxt-link
                to="/users/dashboard"
                exact
                class="pl-10 py-3 pr-3 flex items-center rounded-tr-2xl rounded-br-lg"
              >
                <span class="text-gray-700 text-lg ml-2 font-roboto">
                  <i class="fas fa-th-large text-lg pr-2"></i>
                  Dashboard</span
                >
              </nuxt-link>
            </li>
            <li class="py-1">
              <nuxt-link
                to="/users/booking"
                exact
                class="pl-10 py-3 pr-3 flex items-center rounded-tr-2xl rounded-br-lg"
              >
                <span class="text-gray-700 text-lg ml-2 font-roboto">
                  <i class="fab fa-first-order-alt text-lg pr-2"></i>
                  Booking</span
                >
              </nuxt-link>
            </li>
            <!-- <li class="py-1">
            <nuxt-link
              to="/"
              exact
              class="pl-10 py-3 pr-3 flex items-center rounded-tr-2xl rounded-br-lg"
            >
              <span class="text-gray-700 text-lg ml-2 font-roboto">
                <i class="fas fa-comment-alt text-lg pr-2"></i>
                Messages</span
              >
            </nuxt-link>
          </li> -->
            <li class="py-1">
              <nuxt-link
                to="/users/review"
                exact
                class="pl-10 py-3 pr-3 flex items-center rounded-tr-2xl rounded-br-lg"
              >
                <span class="text-gray-700 text-lg ml-2 font-roboto">
                  <i class="fas fa-star-half-alt text-lg pr-2"></i>
                  Reviews</span
                >
              </nuxt-link>
            </li>
            <li class="py-1">
              <nuxt-link
                to="/users/settings"
                exact
                class="pl-10 py-3 pr-3 flex items-center rounded-tr-2xl rounded-br-lg"
              >
                <span class="text-gray-700 text-lg ml-2 font-roboto">
                  <i class="fas fa-tools text-lg pr-2"></i>
                  Settings</span
                >
              </nuxt-link>
            </li>
            <li class="py-1">
              <nuxt-link to="/" exact class=""> </nuxt-link>
              <a
                href="#"
                @click.prevent="signOut"
                class="pl-10 py-3 pr-3 flex items-center rounded-tr-2xl rounded-br-lg"
              >
                <span class="text-gray-700 text-lg ml-2 font-roboto">
                  <i class="fas fa-sign-out-alt text-lg pr-2"></i>
                  Log Out</span
                >
              </a>
            </li>
          </ul>
        </perfect-scrollbar>
      </div>
    </client-only>
  </div>
</template>

<script>
import Clock from "@/components/Clock";
export default {
  props: ["isshowing"],
  name: "Sidebar",
  components: {
    Clock,
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    setting() {
      return this.$store.state.setting;
    },
  },
  methods: {
    hide() {
      this.$emit("hidden");
    },
    signOut() {
      this.$swal({
        title: "Do you want to logout?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Confirm`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$auth.logout();
        }
      });
      //
    },
  },
};
</script>

<style lang="scss" scoped>
.ps {
  max-height: 300px;
}
.nuxt-link-active {
  background: rgb(126, 166, 250);
  background: linear-gradient(
    87deg,
    rgba(126, 166, 250, 1) 0%,
    rgba(78, 129, 238, 1) 100%
  );

  span {
    color: white;
  }
}

.sidebar--click.showing {
  transition: 0.1s all ease-in;
  margin-left: 0 !important;
  z-index: 999;
}

@media screen and (max-width: 650px) {
  .sidebar--click {
    top: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
