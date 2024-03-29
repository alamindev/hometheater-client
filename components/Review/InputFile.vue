<template>
  <div>
    <div
      :class="{ 'has-file': showRemovedBtn }"
      class="c-file-input js-file-input cursor-pointer"
    >
      <div class="c-file-input__indicator">
        <span class="c-file-input__indicator__icon fas fa-paperclip"></span>
      </div>
      <label
        class="c-file-input__label js-file-input__label cursor-pointer"
        :for="`inputfile_${image_id}`"
      >
        <span class="font-bold text-dark-sm">{{ theFileName }}</span>
        <input
          :id="`inputfile_${image_id}`"
          type="file"
          :required="required"
          @change="fileChangeHandler($event)"
          name="attachment"
          class="c-file-input__field js-file-input__field"
        />
      </label>
    </div>
    <div class="py-5" v-if="photo">
      <nuxt-img
        quality="50"
        loading="lazy"
        :src="photo"
        alt="profile photo"
        class="w-28 h-24 object-cover"
      />
    </div>

    <div class="py-5" v-if="img_url && !photo">
      <nuxt-img
        quality="50"
        loading="lazy"
        :src="imgurl + img_url"
        alt="profile photo"
        class="w-28 h-24 object-cover"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    labelPlaceholder: {
      type: String,
      default: "Upload Image",
    },
  },
  props: ["image_id", "img_url", "required"],
  data() {
    return {
      value: "",
      showRemovedBtn: false,
      imgurl: process.env.imgUrl,
      files: [],
      photo: null,
    };
  },
  computed: {
    theFileName() {
      if (this.files.length > 0 && "name" in this.files[0]) {
        return this.files[0].name;
      }
      return "Upload Image";
    },
  },
  methods: {
    getBase64(file) {
      let vm = this;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        let obj = {
          image: reader.result,
          id: vm.image_id,
        };
        vm.$store.commit("users/review/UPDATE_IMAGE_FORM", obj);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
    fileChangeHandler(e) {
      this.files = Array.from(e.target.files);
      if (e.target.files[0]) {
        let blob = new Blob(e.target.files, {
          type: e.target.files[0].type,
        });
        if (e.target.files[0].size / 1024 / 1024 >= 10)
          return this.$swal("File size must be greater then 10 mb.");
        this.photo = URL.createObjectURL(blob);
        this.getBase64(e.target.files[0]);
      }
      this.showRemovedBtn = true;
    },
  },
};
</script>

<style scoped>
.o-container {
  padding-top: 40px;
  padding-bottom: 40px;
}

.c-field__error {
  font-size: 12px;
  color: #d71149;
}

.c-file-input {
  position: relative;
  display: block;
  height: 36px;
  border: 1px dashed #ddd;
  background-color: #fff;
}

/* line 24, app/assets/stylesheets/mweb/6-components/_components.file-input.scss */
.c-file-input:invalid,
.c-field--error .c-file-input {
  background-color: #ffe6e9;
  border-color: #ff566a;
}

/* line 28, app/assets/stylesheets/mweb/6-components/_components.file-input.scss */
.c-file-input:invalid:focus,
.c-field--error .c-file-input:focus {
  background-color: #ffe6e9;
  border-color: #ff566a;
}

/* line 34, app/assets/stylesheets/mweb/6-components/_components.file-input.scss */
.c-file-input__label {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 36px;
  padding-right: 36px;
  line-height: 36px;
  color: #999;
  font-size: 12px;
  overflow: hidden;
  word-wrap: break-word;
  z-index: 1;
}

/* line 50, app/assets/stylesheets/mweb/6-components/_components.file-input.scss */
.c-file-input__field {
  position: absolute !important;
  height: 1px !important;
  width: 1px !important;
  padding: 0 !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  z-index: -1;
}

/* line 59, app/assets/stylesheets/mweb/6-components/_components.file-input.scss */
.c-file-input__field:focus {
  outline: none;
}

/* line 64, app/assets/stylesheets/mweb/6-components/_components.file-input.scss */
.c-file-input__indicator {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 36px;
  z-index: 2;
}

/* line 73, app/assets/stylesheets/mweb/6-components/_components.file-input.scss */
.c-file-input__indicator__icon {
  color: #bbb;
  position: absolute;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  -o-transform: translate(0, -50%);
  transform: translate(0, -50%);
  left: 4px;
  font-size: 20px;
}

/* line 81, app/assets/stylesheets/mweb/6-components/_components.file-input.scss */
.has-file .c-file-input__indicator__icon {
  color: #d71149;
}

/* line 86, app/assets/stylesheets/mweb/6-components/_components.file-input.scss */
.c-file-input__remove {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 36px;
  z-index: 2;
}

.has-file > .c-file-input__remove {
  display: block;
}

/* line 100, app/assets/stylesheets/mweb/6-components/_components.file-input.scss */
.c-file-input__remove__icon {
  position: absolute;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  -o-transform: translate(0, -50%);
  transform: translate(0, -50%);
  left: 4px;
  font-size: 20px;
  color: #ff566a;
}
</style>



