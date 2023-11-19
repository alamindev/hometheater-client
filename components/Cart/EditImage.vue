<template>
  <div class="">
    <div class="">
      <client-only>
        <CoolLightBox :items="images" :index="index" @close="index = null">
        </CoolLightBox>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          v-if="images"
        >
          <div
            class="bg-white shadow-md p-5 relative img-area"
            v-for="(image, imageIndex) in images"
            :key="imageIndex"
          >
            <div class="absolute top-0 right-0 hidden hoverarea">
              <label
                :for="`choose-${imageIndex}`"
                class="cursor-pointer border-0 px-2 py-1 bg-green-400 text-white shadow-md hover:bg-green-600 rounded-md"
              >
                <input
                  type="file"
                  class="hidden"
                  :id="`choose-${imageIndex}`"
                  :data-image-id="image.id"
                  @change="selectFile"
                  accept="image/*"
                />
                <i class="fas fa-upload"></i>
              </label>
              <button
                @click="index = imageIndex"
                class="border-0 px-2 py-1 bg-blue-400 text-white shadow-md hover:bg-blue-600 rounded-md"
              >
                <i class="fas fa-eye"></i>
              </button>
              <button
                @click="deleteImg(image.id)"
                class="border-0 px-2 py-1 bg-red-400 text-white shadow-md hover:bg-red-600 rounded-md"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>

            <img
              @click="index = imageIndex"
              class="w-full object-cover rounded-md"
              :src="image.src"
              alt="user image"
            />
          </div>
        </div>
      </client-only>
    </div>
    <div class="w-full pt-10">
      <label
        for="choose"
        class="text-center inline-block w-full py-20 px-10 border border-dashed border-gray-300 uppercase cursor-pointer rounded-md"
      >
        <input
          type="file"
          class="hidden"
          id="choose"
          @change="selectFile"
          accept="image/*"
        />
        <i class="fas fa-upload"></i> Upload image
      </label>
    </div>
  </div>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
export default {
  data() {
    return {
      imgurl: process.env.imgUrl,
      index: null,
    };
  },
  components: {
    CoolLightBox,
  },
  computed: {
    images() {
      return this.$store.state.users.booking.images;
    },
  },

  methods: {
    selectFile(event) {
      if (event.target.files[0]) {
        if (event.target.files[0].size / 1024 / 1024 >= 10) {
          return this.$swal("File size must be greater then 10 mb.");
        }
        var file = event.target.files[0];
        var reader = new FileReader();
        let self = this;
        reader.onloadend = function () {
          let obj = {
            id: event.target.getAttribute("data-image-id"),
            src: reader.result,
          };
          self.$store.commit("users/booking/UPDATE_IMAGE", obj);
        };
        reader.readAsDataURL(file);
      }
    },

    deleteImg(id) {
      this.$swal({
        title: "Do you want to Delete?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Confirm`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("users/booking/DeleteImg", id);
        }
      });
    },
  },
};
</script>

<style>
.img-area:hover .hoverarea {
  display: block !important;
}
</style>
