<template>
  <div class="relative">
    <div class="hidden lg:flex justify-between items-center border-b pb-3">
      <h1 class="custom--text-cart-title font-bold font-rubik text-gray-600">
        Addons Extra
      </h1>
    </div>
    <div class="" v-show="!is_loading">
      <div class="flex justify-between flex-col h-full">
        <div class="" v-if="question_main.length > 0">
          <div
            class="pt-7 md:pt-10 question--step"
            v-for="(que, main_index) in question_main"
            :key="que.id"
            :class="{ activestep: main_index === activeStep }"
          >
            <h2
              class="text-center question--heading font-semibold text-lg sm:text-xl leading-[1.8] md:text-2xl"
              v-html="que.title"
            ></h2>
            <div class=" ">
              <ul class="cart--question pt-10 md:px-20">
                <li
                  class="pb-6"
                  v-for="(question, index) in que.questions"
                  :key="question.id"
                >
                  <div class="flex pb-2">
                    {{ index + 1 }}.
                    <p class="pl-1 font-medium" v-html="question.title"></p>
                    <span class="text-red-600 pl-2 text-lg">*</span>
                  </div>
                  <ul class="pl-5 pt-1">
                    <li
                      class="pb-2 border-b last:border-0 pt-2"
                      v-for="(option, index) in question.option"
                      :key="option.id"
                    >
                      <div class="flex items-center">
                        <input
                          class="cursor-pointer"
                          type="radio"
                          :name="'answer_' + main_index + '_' + question.id"
                          @change="
                            radioClick(
                              main_index + 1,
                              option.price +
                                '-' +
                                question.service_id +
                                '-' +
                                question.id +
                                '-' +
                                option.id,
                              que.title,
                              que.id
                            )
                          "
                          :id="
                            'answer_' +
                            index +
                            '_' +
                            main_index +
                            '_' +
                            question.id
                          "
                          :value="
                            option.price +
                            '-' +
                            question.service_id +
                            '-' +
                            question.id +
                            '-' +
                            option.id
                          "
                        />
                        <label
                          class="pl-3 cursor-pointer"
                          :for="
                            'answer_' +
                            index +
                            '_' +
                            main_index +
                            '_' +
                            question.id
                          "
                          v-html="option.title"
                        >
                        </label>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else class="w-full pt-16">
          <div class="flex w-full justify-center">
            <img loading="lazy" src="/images/no-result.png" alt="no resutl" />
          </div>
          <h1 class="text-center py-10 text-xl text-gray-800 font-medium">
            Extra ADDON not found! Please go next
          </h1>
        </div>
        <div class="border-t sm:mt-10 lg:pt-6 w-full">
          <div class="absolute -bottom-8 lg:relative lg:bottom-0">
            <div v-if="question_main.length > 0">
              <button
                class="flex items-center"
                v-if="activeStep == 0"
                @click="onClickPrevious"
              >
                <i class="fas fa-long-arrow-alt-left"></i>
                <span class="pl-3 font-medium text-brand-color">Go Back</span>
              </button>
              <button class="flex items-center" v-else @click="prevQuestion">
                <i class="fas fa-long-arrow-alt-left"></i>
                <span class="pl-3 font-medium text-brand-color">Go Back </span>
              </button>
            </div>
            <button class="flex items-center" v-else @click="onClickPrevious">
              <i class="fas fa-long-arrow-alt-left"></i>
              <span class="pl-3 font-medium text-brand-color">Go Back </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-32 pb-32" v-show="is_loading">
      <div class="loader-parent">
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Questions",
  computed: {
    is_loading() {
      return this.$store.state.cart.is_loading;
    },
    question_main() {
      return this.$store.state.cart.questions;
    },
    activeStep() {
      return this.$store.state.cart.activeStep;
    },
    loadQuestion() {
      return this.$store.state.cart.load_question;
    },
    isQuestions() {
      if (this.questions && this.questions.length > 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    radioClick(index, value, title, id) {
      let arr = value.split("-");
      let obj = {
        question_id: arr[2],
        option_id: arr[3],
        service_id: arr[1],
        price: arr[0],
        index: index,
        service_title: title,
      };
      this.$store.dispatch("cart/UpdateAnswer", obj);
      this.$store.dispatch("cart/checkAnswer", { id, obj });
    },
    onClickPrevious() {
      this.$emit("prev");
    },
    prevQuestion() {
      this.$store.commit("cart/UPDATE_STEP_PREV");
    },
  },
  created() {
    this.$store.commit("cart/UPDATE_ACTIVE_STEP", 0);
    this.$store.dispatch("cart/fetchQuestions");
  },
};
</script>

<style>
.question--heading span {
  color: #4e81ee;
  font-weight: bold;
  padding-left: 10px;
}
.question--step {
  display: none;
}
.question--step.activestep {
  display: block;
}
input[type="radio"] {
  width: 1.5em;
  height: 1.5em;
}
</style>
