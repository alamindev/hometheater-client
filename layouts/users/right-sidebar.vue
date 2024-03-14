<template>
  <div
    class="custom-rightsidebar bg-blug-10 py-5 px-3 w-80 md:w-72 -ml-72 xl:w-80 2xl:-ml-80 md:ml-0 max-[1440px]:shadow-2xl fixed top-0 bottom-0 right-0"
    :class="isshowingright ? 'showing' : ''"
  >
    <div class="relative">
      <div class="nav__hidebtn block lg:hidden absolute left-2 top-0">
        <i
          @click="hide"
          class="fas fa-times text-xl text-gray-700 cursor-pointer bars--click"
        ></i>
      </div>
      <div class="flex justify-center pt-8 pb-1">
        <div class="p-3 bg-white rounded-full">
          <ImageAuth styles="w-24 h-24 rounded-full" />
        </div>
      </div>
      <div class="flex justify-center flex-col items-center pb-10">
        <h3 class="text-brand-color text-base pb-1 text-center">
          Welcome back!
        </h3>
        <nuxt-link
          :to="`/users/${user.id}/profile`"
          class="pt-2 text-brand-dark-gray text-xl font-medium text-center capitalize leading-6 hover:underline"
        >
          {{ user.first_name }} {{ user.last_name }}
        </nuxt-link>
      </div>
      <div class="rounded bg-white shadow-md px-3 py-3">
        <div class="pb-2 border-b border-gray-200">
          <h1 class="text-lg font-bold text-black leading-relaxed">
            Recent Activities
          </h1>
          <p class="text-xs text-gray-400 py-1">
            These things were happening while you were offline
          </p>
        </div>
        <client-only>
          <div class="pb-4 pt-2" v-if="activities.length > 0">
            <perfect-scrollbar>
              <div class="">
                <div
                  class="border-b last:border-0"
                  v-for="activity in activities"
                  :key="activity.id"
                >
                  <nuxt-link
                    :to="`${activity.link}`"
                    class="flex py-3"
                    target="_blank"
                  >
                    <div class="">
                      <img
                        loading="lazy"
                        class="w-16 h-12 object-cover rounded-lg"
                        :src="
                          activity.photo.includes('http')
                            ? activity.photo
                            : imgurl + activity.photo
                        "
                        :alt="activity.username"
                      />
                    </div>
                    <div class="pl-3">
                      <div v-if="activity.type == 'blog'">
                        <h3 class="text-xs font-normal text-black">
                          <strong>{{ activity.username }}</strong>
                          published a new blog post.
                        </h3>
                        <div
                          class="text-sm font-semibold text-black"
                          v-html="activity.text"
                        ></div>
                      </div>
                      <div class="" v-if="activity.type == 'review'">
                        <h3 class="text-xs font-normal text-black">
                          <strong>{{ activity.username }}</strong> published a
                          new review.
                        </h3>
                        <div
                          class="text-sm font-semibold text-black"
                          v-html="activity.text"
                        ></div>
                      </div>
                      <div class="" v-if="activity.type == 'like'">
                        <h3 class="text-xs font-normal text-black">
                          <strong>{{ activity.username }}</strong>
                        </h3>
                        <div class="text-sm font-semibold text-black">
                          New like on gallery image!
                        </div>
                      </div>
                      <div class="" v-if="activity.type == 'comment'">
                        <h3 class="text-xs font-normal text-black">
                          <strong>{{ activity.username }}</strong> published a
                          new comment.
                        </h3>
                        <div
                          class="text-sm font-semibold text-black"
                          v-html="activity.text"
                        ></div>
                      </div>
                      <div class="flex justify-start pt-2">
                        <p class="text-xs text-gray-400">{{ activity.date }}</p>
                      </div>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </perfect-scrollbar>
          </div>
          <div v-else class="w-full pt-10">
            <h1 class="text-center py-10 text-sm text-gray-800 font-medium">
              Recent Activities not found!
            </h1>
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import ImageAuth from "@/components/auth/Img";
export default {
  props: ["isshowingright"],
  name: "Right-SideBar",
  components: {
    ImageAuth,
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    activities() {
      return this.$store.state.activity.activities;
    },
  },
  methods: {
    hide() {
      this.$emit("hiddenright");
    },
  },
};
</script>

<style  scoped>
.ps {
  max-height: 200px;
}
.custom-rightsidebar.showing {
  transform: translateX(0px);
  z-index: 999;
}

@media (max-width: 1535px) {
  .custom-rightsidebar {
    transition: all 0.3s ease-in-out;
    transform: translateX(400px);
  }
}
</style>
