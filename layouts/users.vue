<template>
  <div>
    <div
      v-if="$nuxt.isOffline"
      class="w-full text-center py-2 bg-red-200 text-red-900 font-semibold fixed top-0"
    >
      You are offline
    </div>

    <div
      class="bg min-h-screen font-custom"
      :class="$nuxt.isOffline ? 'mt-8' : ''"
    >
      <Sidebar @hidden="hidden" :isshowing="isshowing" />
      <div
        class="md:ml-64 xl:ml-80 mr-72 xl:mr-80 sm:px-5 main--parent"
        :class="isshowing || isshowingright ? 'showing' : ''"
      >
        <Header @clicked="onClicked" @rightSideClicked="toggleRightSidebar" />
        <main>
          <Nuxt keep-alive />
        </main>
      </div>
      <RightSidebar
        @hiddenright="hiddenright"
        :isshowingright="isshowingright"
      />
    </div>
  </div>
</template>

<script>
import Header from "./users/header";
import RightSidebar from "./users/right-sidebar";
import Sidebar from "./users/sidebar";
export default {
  name: "Users",
  components: {
    Header,
    Sidebar,
    RightSidebar,
  },
  data() {
    return {
      isshowing: false,
      isshowingright: false,
    };
  },
  head() {
    return {
      script: [
        {
          src: this.setting
            ? "https://www.googletagmanager.com/gtag/js?id=" +
              this.setting.analytics_id
            : "",
          async: true,
        },
        {
          src: "https://admin.hometheaterproz.com/storage/custom.js",
          type: "text/javascript",
          body: true,
        },
      ],
    };
  },
  computed: {
    setting() {
      return this.$store.state.setting;
    },
  },
  watch: {
    isshowing() {
      let vm = this;
      let showing = document.querySelector(".main--parent");
      var handler = function () {
        vm.isshowing = false;
      };
      setTimeout(() => {
        showing.addEventListener("click", handler, true);
      }, 500);
    },
    isshowingright() {
      let vm = this;
      let showing = document.querySelector(".main--parent");
      var handler = function () {
        vm.isshowingright = false;
      };
      setTimeout(() => {
        showing.addEventListener("click", handler, true);
      }, 500);
    },
    $route(to, from) {
      this.isshowing = false;
      this.$store.dispatch("activity/fetchActivities");
    },
  },
  methods: {
    onClicked() {
      this.isshowing = true;
    },
    toggleRightSidebar() {
      this.isshowingright = true;
    },
    hidden() {
      this.isshowing = false;
    },
    hiddenright() {
      this.isshowingright = false;
    },
  },
  async fetch() {
    await this.$store.dispatch("fetchSetting");
    await this.$store.dispatch("activity/fetchActivities");
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background: linear-gradient(
    197deg,
    rgba(219, 215, 242, 0.09) 0%,
    rgba(189, 183, 243, 0.1) 100%
  );
}

.main--parent {
  transition: 0.2s all ease-in;
  background: #eff0f6;
  min-height: 100vh;
  padding-bottom: 10px;
}

.main--parent.showing {
  margin-left: 250px;
}

@media screen and (max-width: 767px) {
  .main--parent.showing {
    margin-left: 0;

    &::after {
      content: "";
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(30, 30, 30, 0.762);
      left: 0;
      top: 0;
      z-index: 111;
    }
  }
}
@media (max-width: 1170px) {
  .main--parent {
    margin-right: 0;
  }
}
</style>
