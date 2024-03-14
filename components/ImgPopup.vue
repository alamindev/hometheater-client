<template>
  <div
    class="fixed z-[9999] inset-0 w-full h-full bg-white backdrop-blur-md max-lg:overflow-y-auto"
  >
    <button
      type="button"
      @click="CloseModal"
      class="absolute right-3 top-2 lg:top-3 size-6 lg:size-8 flex justify-center items-center rounded-full border border-brand-dark"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-x"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <div class="py-2 lg:py-5">
      <h4 class="text-center font-semibold">{{ counter }}</h4>
    </div>
    <div class="flex flex-col lg:flex-row gap-1 lg:gap-4 sm:px-4">
      <div
        class="w-full bg-[#faf8f5] px-4 sm:px-6 pt-5 pb-4 lg:py-8 rounded-xl relative max-[430px]:min-h-[calc(100dvh-100px)] max-xl:flex justify-center items-center"
      >
        <div
          class="absolute max-lg:bottom-4 w-full left-0 flex gap-6 justify-center lg:top-1/2 lg:-translate-y-1/2"
        >
          <button
            @click="prev"
            type="button"
            class="size-8 flex justify-center items-center hover:bg-dark group border rounded-full border-dark lg:absolute left-2 lg:left-4 max-lg:bottom-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="group-hover:stroke-white stroke-dark"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            @click="next"
            type="button"
            class="size-8 flex justify-center items-center hover:bg-dark group border rounded-full border-dark lg:absolute right-2 lg:right-4 max-lg:bottom-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="group-hover:stroke-white stroke-dark"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <figure>
          <img
            class="w-full rounded-xl object-contain max-[430px]:max-h-[calc(100dvh-135px)] md:max-h-[calc(100dvh-135px)] lg:max-h-[calc(100dvh-120px)]"
            :src="imgurl + 'storage/' + selected"
            alt="popup image"
          />
        </figure>
      </div>
      <div
        ref="container"
        class="w-full lg:w-[200px] lg:shrink-0 overflow-y-auto lg:max-h-[calc(100dvh-60px)]"
      >
        <div
          class="flex overflow-x-auto lg:grid grid-cols-1 gap-4 py-2 lg:py-3 max-md:pl-4"
        >
          <div
            v-for="image in images"
            :key="image.id"
            :class="image.is_active ? 'active' : ''"
            class="group cursor-pointer shrink-0"
            @click="ChangeImg($event, image.url)"
          >
            <figure>
              <img
                class="lg:w-full rounded-xl w-12 h-10 lg:h-40 group-[.active]:border-dark border object-cover"
                :src="imgurl + 'storage' + image.url"
                alt=" image.url"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "imagePopUp",
  props: ["imageDatas", "select_name"],
  data() {
    return {
      images: [],
      selected: null,
      imgurl: process.env.imgUrl,
    };
  },
  computed: {
    counter() {
      let curr = this.images.findIndex((item) => item.is_active);
      return `${++curr} of ${this.images.length}`;
    },
  },
  methods: {
    update() {
      this.images = this.images.map((el) => {
        if (el.url == this.selected) {
          return {
            ...el,
            is_active: true,
          };
        }
        return {
          ...el,
          is_active: false,
        };
      });
    },
    ChangeImg(event, url) {
      this.selected = url;
      this.update();
      const itemRect = event.target.getBoundingClientRect();
      if (itemRect.top < 0 || itemRect.bottom > window.innerHeight) {
        this.$refs.container.scrollTo({
          top: itemRect.top,
          behavior: "smooth",
        });
      }
    },
    prev() {
      let curr = [...this.images].findIndex((item) => item.is_active);
      if (curr > 0) {
        let c = --curr;
        this.images = [...this.images].map((el, index) => {
          if (c == index) {
            return {
              ...el,
              is_active: true,
            };
          } else {
            return {
              ...el,
              is_active: false,
            };
          }
        });
        let findCurrent = [...this.images].find((item) => item.is_active);
        if (Object.keys(findCurrent) !== 0) {
          this.selected = findCurrent.url;
        }
      }
    },
    CloseModal() {
      this.$emit("closeModal");
    },
    next() {
      let curr = [...this.images].findIndex((item) => item.is_active);

      if (curr < [...this.images].length - 1) {
        let c = ++curr;
        this.images = [...this.images].map((el, index) => {
          if (c == index) {
            return {
              ...el,
              is_active: true,
            };
          } else {
            return {
              ...el,
              is_active: false,
            };
          }
        });
        let findCurrent = [...this.images].find((item) => item.is_active);
        if (Object.keys(findCurrent) !== 0) {
          this.selected = findCurrent.url;
        }
      }
    },
  },
  mounted() {
    this.update();
  },
  created() {
    this.selected = this.select_name;
    this.images = this.imageDatas;
  },
};
</script>