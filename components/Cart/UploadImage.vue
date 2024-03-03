<template>
  <div class="relative">
    <div class="hidden lg:flex justify-between items-center border-b pb-3">
      <h1 class="custom--text-cart-title font-bold font-rubik text-gray-600">
        Upload Images
      </h1>
    </div>
    <div class="py-16">
      <h1 class="pb-12 text-xl text-gray-700 text-center">
        Feel free to upload images. That would help us a lot.
      </h1>
      <dropzone
        id="foo"
        ref="el"
        :options="options"
        :destroyDropzone="true"
        v-on:vdropzone-file-added="fileAdded"
        v-on:vdropzone-success="uploadSuccess"
        v-on:vdropzone-error="uploadError"
        v-on:vdropzone-removed-file="removefile"
      ></dropzone>
    </div>
    <div class="border-t lg:pt-10">
      <button
        class="flex items-center absolute -bottom-8 lg:relative lg:bottom-0"
        @click="onClickPrevious"
      >
        <i class="fas fa-long-arrow-alt-left"></i>
        <span class="pl-3 font-medium text-brand-color">Go Back</span>
      </button>
    </div>
  </div>
</template>

<script>
import Dropzone from "nuxt-dropzone";
import "nuxt-dropzone/dropzone.css";

export default {
  name: "UploadImage",
  components: {
    Dropzone,
  },
  data() {
    return {
      options: {
        url: process.env.baseUrl + "anything",
        addRemoveLinks: true,
        maxFiles: 6,
        maxFilesize: 10,
      },
    };
  },

  computed: {
    images() {
      return this.$store.state.cart.images;
    },
  },
  methods: {
    onClickPrevious() {
      this.$emit("prev");
    },
    fileAdded(file) {
      const is_image_exist = this.images.some((el) => el.name == file.name);
      if (is_image_exist) {
        this.$refs.el.removeFile(file);
        this.$swal({
          icon: "error",
          title: `Image already uploaded!`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
      }
    },
    uploadSuccess(file, res) {
      const obj = {
        name: file.name,
        data: file.dataURL,
      };
      this.$store.commit("cart/UPLOAD_IMAGES", obj);
    },
    uploadError(file, message, xhr) {
      this.$swal({
        icon: "error",
        title: `${message}`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
      });
    },
    removefile(file, error, xhr) {
      const filterObj = this.images.filter((el) => el.name === file.name);
      this.$store.commit("cart/DELETE_IMAGES", filterObj);
    },
  },
};
</script>

<style>
.dropzone .dz-preview .dz-error-message {
  top: 0 !important;
}
</style>
