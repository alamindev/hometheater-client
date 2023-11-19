<template>
  <main>
    <section class="py-10 px-4 lg:px-16 custom-gradient gallery--page">
      <div class="container mx-auto">
        <div class="md:flex">
          <GallerySidebar />
          <div
            class="
              w-full
              md:w-10/12
              lg:w-9/12
              shadow
              p-3
              rounded-md
              bg-white
              h-full
            "
          >
            <div class="" v-if="!loading">
              <h3 class="border-b pb-2 font-semibold text-2xl text-dark">
                {{ category_name }}
              </h3>
              <div
                v-if="!errors.message"
                class="
                  grid grid-cols-2
                  lg:grid-cols-4
                  xl:grid-cols-5
                  gap-5
                  py-5
                "
              >
                <div
                  class="relative rounded-lg overflow-hidden shadow-sm"
                  v-for="album in albums"
                  :key="album.id"
                >
                  <nuxt-link :to="`/gallery/${album.slug}`">
                    <div
                      class="
                        absolute
                        bg-brand-dark bg-opacity-20
                        w-full
                        h-full
                        flex
                        items-center
                        justify-center
                        flex-col
                      "
                    >

                      <p class="pt-2 text-white font-medium">
                        {{ album.image_count }}
                        <span v-if="album.image_count > 1">Photos</span
                        ><span v-else>Photo</span>
                      </p>
                    </div>
                    <figure class="cursor-pointer">
                      <template v-if="album.images.length > 1">
                        <div
                          class="h-24"
                          v-for="gallery in album.images"
                          :key="gallery.id"
                        >
                          <img
                            class="w-full h-24 object-cover"
                            :data-src="imgurl + 'storage/' + gallery.src"
                            alt="gellary-img"
                            v-lazy-load
                          />
                        </div>
                      </template>
                      <template v-else-if="album.images.length == 1">
                        <div
                          class="h-48"
                          v-for="gallery in album.images"
                          :key="gallery.id"
                        >
                          <img
                            class="w-full h-48 object-cover"
                            :src="imgurl + 'storage/' + gallery.src"
                            alt="gellary-img"
                          />
                        </div>
                      </template>
                      <template v-else>
                        <img
                          class="w-full h-48 object-cover"
                          :src="imgurl + 'storage/uploads/no-image.png'"
                          alt="gellary-img"
                        />
                      </template>
                    </figure>
                  </nuxt-link>
                </div>
              </div>
              <div v-else class="w-full h-full">
                <h1 class="text-center pt-24 pb-12 text-2xl text-red-600">
                  {{ errors.message }}
                </h1>
              </div>
            </div>
            <div v-else class="loader-parent mt-16 mb-10">
              <div class="loader"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { getCookie } from "@/Utils/Cookie";
import GallerySidebar from "@/components/Gallery/GallerySidebar";
import globalMeta from "@/mixins/meta.js";
export default {
  mixins: [globalMeta],
  middleware: ["checkSetting"],
  components: {
    GallerySidebar,
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
      isOpen: false,
    };
  },
  computed: {
    meta() {
      return this.$store.state.meta.gallery;
    },
    albums() {
      return this.$store.state.gallery.albums;
    },
    category_name() {
      return this.$store.state.gallery.category_name;
    },
    loading() {
      return this.$store.state.loading.loading;
    },
  },
  mounted() {
    const getslug = getCookie("slug");
    if (getslug != "") {
      this.$store.dispatch("gallery/fetchAlbum", getslug);
    } else {
      this.$store.dispatch("gallery/fetchAlbum", "tv-mounting");
    }
  },
  created() {
    this.$store.dispatch("gallery/fetchCategories");
  },
  fetch() {
    this.$store.dispatch("meta/fetchMetaInfo", "gallery");
  },
};
</script>
