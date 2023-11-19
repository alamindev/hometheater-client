<template>
  <div class="rounded bg-white shadow-md px-5 py-3">
    <div class="pb-5">
      <h1 class="text-lg font-semibold text-dark-sm leading-relaxed">
        Recent Activities
      </h1>
    </div>
    <div class="pb-4 pt-2" v-if="!loading">
      <div class="" v-if="activities.length > 0">
        <div
          class="border-b last:border-0"
          v-for="activity in activities"
          :key="activity.id"
        >
          <nuxt-link :to="`${activity.link}`" class="flex py-3" target="_blank">
            <div class="">
              <img
                class="w-16 h-12 object-cover rounded-lg"
                :src="imgurl + activity.photo"
                :alt="activity.username"
              />
            </div>
            <div class="pl-3">
              <div v-if="activity.type == 'blog'">
                <h3 class="text-xs font-normal text-dark-sm">
                  <strong>{{ activity.username }}</strong>
                  published a new blog post.
                </h3>
                <div
                  class="text-sm font-semibold text-dark-sm"
                  v-html="activity.text"
                ></div>
              </div>
              <div class="" v-if="activity.type == 'review'">
                <h3 class="text-xs font-normal text-dark-sm">
                  <strong>{{ activity.username }}</strong> published a new
                  review.
                </h3>
                <div
                  class="text-sm font-semibold text-dark-sm"
                  v-html="activity.text"
                ></div>
              </div>
              <div class="" v-if="activity.type == 'like'">
                <h3 class="text-xs font-normal text-dark-sm">
                  <strong>{{ activity.username }}</strong>
                </h3>
                <div class="text-sm font-semibold text-dark-sm">
                  New like on gallery image!
                </div>
              </div>
              <div class="" v-if="activity.type == 'comment'">
                <h3 class="text-xs font-normal text-dark-sm">
                  <strong>{{ activity.username }}</strong> published a new
                  comment.
                </h3>
                <div
                  class="text-sm font-semibold text-dark-sm"
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
      <div v-else class="w-full pt-10">
        <div class="flex w-full justify-center">
          <img src="/images/no-result.png" alt="no resutl" />
        </div>
        <h1 class="text-center py-10 text-xl text-gray-800 font-medium">
          Recent Activities not found!
        </h1>
      </div>
    </div>
    <div v-else class="loader-parent mt-16">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    activities() {
      return this.$store.state.activity.user_activities;
    },
    loading() {
      return this.$store.state.activity.loading_activity;
    },
  },
};
</script>

<style>
</style>
