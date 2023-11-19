<template>
  <div class="p-3 border">
    <ul>
      <li v-for="(image, index) in images" :key="index">
        <div class="border mt-3 p-3 relative custom--hover">
          <div>
            <div class="py-2">
              <InputFile
                :image_id="image.id"
                :img_url="image.image"
                :required="image.required ? true : false"
              />
            </div>
            <div class="py-2">
              <input
                type="text"
                class="w-full border-1 border-gray-300 rounded-md"
                placeholder="Title"
                :value="image.title"
                required
                minlength="3"
                maxlength="20"
                @input="UpdateContent(image, 'title', $event.target.value)"
              />
            </div>
            <div class="py-2">
              <textarea
                class="w-full border-1 border-gray-300 rounded-md"
                name=""
                cols="5"
                rows="3"
                maxlength="100"
                placeholder="Write a sort details"
                :value="image.description"
                @input="
                  UpdateContent(image, 'description', $event.target.value)
                "
              ></textarea>
            </div>
          </div>
          <div class="absolute top-0 -mt-2 -mr-2 right-0 hidden remove--area">
            <button type="button" @click="removeArea(image.id)" class="">
              <i class="far fa-times-circle text-2xl text-red-400"></i>
            </button>
          </div>
        </div>
      </li>
    </ul>
    <div class="pt-2">
      <button
        type="button"
        class="py-2 px-5 bg-dark-sm text-white"
        @click="AddImage()"
      >
        <i class="fas fa-plus"></i>
      </button>
      <span class="font-semibold pl-3" v-if="check_images.length > 0"
        >Add more images</span
      >
      <span class="font-semibold pl-3" v-else>Add Photos to you review</span>
    </div>
  </div>
</template>

<script>
import InputFile from "@/components/Review/InputFile";

import { v4 as uuid } from "uuid";
export default {
  props: ["service_id"],
  components: {
    InputFile,
  },
  computed: {
    images() {
      return this.$store.state.users.review.images;
    },
    check_images() {
      return this.images.filter((el) => {
        if (el.service_id == this.service_id) {
          return true;
        }
        return false;
      });
    },
  },
  methods: {
    AddImage() {
      let obj = {
        id: uuid(),
        title: "",
        service_id: this.service_id,
        description: "",
        image: "",
        required: true,
      };
      this.$store.dispatch("users/review/add_new_form", obj);
    },
    UpdateContent(image, name, val) {
      if (Object.keys(image).includes(name)) {
        let obj = {
          [name]: val,
          id: image.id,
        };
        this.$store.commit("users/review/UPDATE_IMAGE_FORM", obj);
      }
    },
    removeArea(image_id) {
      this.$swal({
        title: "Do you want to Delete?",
        showCancelButton: true,
        confirmButtonText: `Confirm`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.commit("users/review/DELETE_IMAGE_FORM", image_id);
          this.$store.dispatch("users/review/delete__image", image_id);
        }
      });
    },
  },
};
</script>

<style scoped>
.custom--hover:hover .remove--area {
  display: block !important;
}
</style>
