<template>
  <main>
    <section class="w-full relative profile--page">
      <div class="w-full">
        <nuxt-img
          quality="50"
          loading="lazy"
          class="w-full h-36 object-cover sm:h-auto"
          src="/images/users/profile.png"
          alt="profile"
        />
      </div>
      <div class="px-4 lg:px-16 py-6 bg-custom">
        <div class="container mx-auto relative">
          <div class="absolute -left-24 top-24">
            <nuxt-img
              quality="50"
              loading="lazy"
              class="w-56"
              src="/images/contact-circle.svg"
              alt="about"
            />
          </div>
          <div class="sm:flex relative">
            <div class="w-full sm:w-5/12 lg:w-4/12 xl:w-3/12">
              <Profile-info />
            </div>
            <div
              class="w-full sm:w-7/12 lg:w-8/12 xl:w-9/12 pt-5 sm:pt-0 sm:px-5 lx:px-6"
            >
              <Profile-activity />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Divider from "@/components/Divider";
import ProfileActivity from "@/components/Profile/ProfileActivity";
import ProfileInfo from "@/components/Profile/ProfileInfo";
import globalMeta from "@/mixins/meta.js";
export default {
  mixins: [globalMeta],
  middleware: ["checkSetting"],
  components: {
    Divider,
    ProfileInfo,
    ProfileActivity,
  },
  computed: {
    meta() {
      let user = this.$store.state.users.profile.user;
      if (user) {
        return {
          title: user.username.replace(/(^|\s)\S/g, (l) => l.toUpperCase()),
          description: user.bio,
          image: user.photo,
          keyword: user.location,
        };
      }
    },
  },
  async fetch({ store, route }) {
    await store.dispatch("users/profile/fetchUser", route.params.id);
    await store.dispatch("activity/fetchUserActivity", route.params.id);
  },
};
</script>

<style   scoped>
.bg-custom {
  background: rgb(202, 186, 242);
  background: linear-gradient(
    274deg,
    rgba(202, 186, 242, 0.2) 0%,
    rgba(215, 229, 255, 0.1) 100%
  );
}
</style>
