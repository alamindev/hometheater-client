<template>
  <main>
    <section class="py-7 sm:py-10 px-4 lg:px-16 custom-gradient gallery--page">
      <div class="container mx-auto">
        <div class="md:flex">
          <GallerySidebar redirect="true" sortbyshow="true" />
          <div class="w-full md:w-10/12 lg:w-9/12">
            <div class="shadow p-3 rounded-md bg-white">
              <div class="flex items-center justify-between border-b pb-2">
                <h3 class="font-semibold text-2xl text-dark" v-if="!loading">
                  {{ album_name }}
                </h3>
                <div v-else class="flex gap-4">
                  <div
                    class="animate-pulse opacity-60 bg-brand-color w-20 h-5 rounded-lg"
                  ></div>
                  <div
                    class="animate-pulse opacity-60 bg-brand-color w-20 h-5 rounded-lg"
                  ></div>
                </div>
                <button
                  class="border-0 py-2 px-5 bg-brand-color hover:bg-brand-color-hover rounded-sm text-white"
                  @click="$router.go(-1)"
                >
                  Back
                </button>
              </div>
              <Sortby class="pt-3" />
              <div v-if="!loading" class="pt-2">
                <div
                  class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 py-5"
                >
                  <figure
                    class="cursor-pointer"
                    v-for="img in images"
                    :key="img.id"
                    @click="ShowImages(img.slug)"
                  >
                    <img
                      loading="lazy"
                      class="w-full h-32 sm:h-48 md:h-56 lg:h-40 object-cover rounded-lg"
                      :data-src="imgurl + 'storage/' + img.url"
                      alt="gellary-img"
                      v-lazy-load
                    />
                  </figure>
                </div>
              </div>
              <div v-else class="loader-parent mt-16 mb-10">
                <div class="loader"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <modal
      name="showimage"
      class="modal--showimg"
      :clickToClose="false"
      :scrollable="true"
      :adaptive="true"
      height="auto"
      width="98%"
    >
      <div class="bg-white modal-sub relative lg:max-w-[80%] mx-auto">
        <div class="pt-2 absolute right-2 z-20">
          <div
            @click="hidemodal"
            class="cursor-pointer w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center"
          >
            <i class="fas fa-times"></i>
          </div>
        </div>

        <div class="w-full sm:flex custom--design-main">
          <div
            class="w-full sm:w-7/12 lg:w-8/12 flex items-center bg-dark relative custom--design-sub"
          >
            <div class="flex items-center w-full justify-between absolute px-3">
              <button
                class="flex justify-center items-center w-10 h-10 bg-black bg-opacity-60 rounded-lg cursor-pointer"
                @click="ShowImages(imgData.previous_slug)"
              >
                <i class="fas fa-chevron-left text-white"></i>
              </button>
              <button
                class="flex justify-center items-center w-10 h-10 bg-black bg-opacity-60 rounded-lg cursor-pointer"
                @click="ShowImages(imgData.next_slug)"
              >
                <i class="fas fa-chevron-right text-white"></i>
              </button>
            </div>
            <figure class="w-full">
              <img
                loading="lazy"
                class="w-full h-4/5 max-height-custom object-contain"
                :src="imgurl + 'storage/' + imgData.url"
                :alt="imgData.title"
              />
            </figure>
          </div>
          <div class="w-full sm:w-5/12 lg:w-4/12 pt-5 custom--design-sub">
            <div class="rounded shadow-md px-5 py-2 bg-white">
              <div class="pb-3 border-b border-gray-200">
                <h1
                  class="text-lg sm:text-xl font-bold text-dark-sm leading-relaxed"
                >
                  {{ imgData.title }}
                </h1>
                <div
                  class="text-sm sm:text-base details-p py-3"
                  v-html="imgData.details"
                ></div>
                <p class="text-xs sm:text-sm install-color">
                  Installed on {{ imgData.install_date }}
                </p>
              </div>
              <Comments />

              <CommentSubmit :gallery_id="imgData.id" />
            </div>
          </div>
        </div>
      </div>
    </modal>
  </main>
</template>

<script>
import CommentSubmit from "@/components/Gallery/CommentSubmit";
import Comments from "@/components/Gallery/Comments";
import GallerySidebar from "@/components/Gallery/GallerySidebar";
import Sortby from "@/components/Gallery/Sortby";
import globalMeta from "@/mixins/meta.js";
export default {
  mixins: [globalMeta],
  middleware: ["checkSetting"],
  components: {
    GallerySidebar,
    Sortby,
    Comments,
    CommentSubmit,
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
      isOpen: false,
    };
  },
  computed: {
    routeParam() {
      let param = this.$route.params.slug.split("-").join(" ");

      return param.charAt(0).toUpperCase() + param.slice(1);
    },
    meta() {
      return this.$store.state.meta.gallery;
    },
    images() {
      return this.$store.state.gallery.galleries;
    },
    album_name() {
      return this.$store.state.gallery.album_name;
    },
    loading() {
      return this.$store.state.loading.loading;
    },
    imgData() {
      return this.$store.state.gallery.gallery;
    },
  },
  methods: {
    hidemodal() {
      this.$modal.hide("showimage");
    },
    ShowImages(slug) {
      let album_slug = this.$route.params.slug;
      this.$store
        .dispatch("gallery/fetchImage", { slug, album_slug })
        .then((res) => {
          if (res.success == true) {
            this.$modal.show("showimage");
          }
        });
    },
  },
  created() {
    if (this.$route.params.slug != "") {
      this.$store.dispatch("gallery/fetchGalleryData", this.$route.params.slug);
    }
    if (
      typeof this.$route.query.modal != "undefined" &&
      typeof this.$route.query.slug != "undefined"
    ) {
      this.ShowImages(this.$route.query.slug);
    }
  },
  asyncData({ store, error }) {
    store.dispatch("gallery/fetchCategories");
    store.dispatch("meta/fetchMetaInfo", "gallery");
  },
};
</script>
<style scoped>
.modal-sub {
  box-shadow: 0px 10px 18px -5px rgba(1, 1, 1, 0.65);
  border-radius: 5px;
  overflow: hidden;
}
.max-height-custom {
  max-height: 425px;
}
@media screen and (min-width: 640px) {
  .max-height-custom {
    max-height: 700px;
  }
}
@media screen and (min-width: 809px) and (max-width: 814px) {
  .custom--design-main {
    display: block !important;
  }
  .custom--design-sub {
    width: 100% !important;
  }
  .max-height-custom {
    max-height: 425px;
  }
}
</style>
