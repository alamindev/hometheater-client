<template>
  <div class="">
    <div class="flex justify-between items-center border-b pb-3" v-if="header">
      <h1 class="custom--text-cart-title font-bold font-rubik text-gray-600">
        Check out
      </h1>
    </div>
    <div class="" v-show="!is_loading">
      <div v-if="!is_loggedin && !is_required_field">
        <div class="flex justify-between flex-col h-full">
          <div class="" v-if="question_main.length > 0">
            <div
              class="pt-10 question--step"
              v-for="(que, main_index) in question_main"
              :key="que.id"
              :class="{ activestep: main_index === activeStep }"
            >
              <h2
                class="text-center question--heading font-medium text-lg md:text-xl lg:text-2xl"
                v-html="que.title"
              ></h2>
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
          <div v-else class="w-full pt-16">
            <div class="flex w-full justify-center">
              <img loading="lazy" src="/images/no-result.png" alt="no resutl" />
            </div>
            <h1 class="text-center py-10 text-xl text-gray-800 font-medium">
              Extra ADDON not found! Please go next
            </h1>
          </div>
          <div class="border-t pt-10 mt-10">
            <div v-if="question_main.length > 0">
              <button
                class="flex items-center"
                v-if="activeStep == 0"
                @click="onClickPrevious"
              >
                <i class="fas fa-long-arrow-alt-left"></i>
                <span class="pl-3 font-medium">Go Back</span>
              </button>
              <button class="flex items-center" v-else @click="prevQuestion">
                <i class="fas fa-long-arrow-alt-left"></i>
                <span class="pl-3 font-medium">Go Back </span>
              </button>
            </div>
            <button class="flex items-center" v-else @click="onClickPrevious">
              <i class="fas fa-long-arrow-alt-left"></i>
              <span class="pl-3 font-medium">Go Back </span>
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <Register
          v-if="is_register_form && !is_required_field"
          @GotoLogin="GotoLogin"
          @showLoginForm="showLoginForm"
        />
        <Login
          v-if="!is_register_form && !is_required_field"
          @showRegisterForm="showRegisterForm"
          @showCart="showCart"
        />
        <RequiredFields v-if="is_required_field" @showCart="showCart" />
        <button class="flex items-center" v-else @click="onClickPrevious">
          <i class="fas fa-long-arrow-alt-left"></i>
          <span class="pl-3 font-medium">Go Back </span>
        </button>
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
import Login from "@/components/Cart/Login";
import Register from "@/components/Cart/Register";
import RequiredFields from "@/components/Cart/RequiredFields";
export default {
  name: "Questions",
  props: ["header"],
  data() {
    return {
      is_loggedin: false,
      is_register_form: false,
      is_required_field: false,
      is_loading: false,
    };
  },
  components: {
    Login,
    Register,
    RequiredFields,
  },

  computed: {
    question_main() {
      return this.$store.state.cart.questions;
    },
    activeStep() {
      return this.$store.state.cart.activeStep;
    },
    loadQuestion() {
      return this.$store.state.cart.load_question;
    },
    step_active() {
      return this.$store.state.cart.step_3_active;
    },
    isQuestions() {
      if (this.questions && this.questions.length > 0) {
        return true;
      }
      return false;
    },
  },
  watch: {
    step_active: function (val, newVal) {
      if (val === true) {
        if (!this.authenticated) {
          this.is_loggedin = true;
          this.$store.commit("cart/IS_AUTH", false);
          this.$swal({
            icon: "error",
            text: "Please login or register to continue.",
            showConfirmButton: true,
            timer: 6000,
          });
        } else {
          this.showCart();
        }
      }
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
    GotoLogin() {
      this.is_register_form = false;
    },
    showRegisterForm() {
      this.is_register_form = true;
    },
    showLoginForm() {
      this.is_register_form = false;
    },
    async showCart() {
      try {
        this.is_loading = true;
        let { data } = await this.$axios.get(
          `/auth/check-fields/${this.$auth.user.id}`
        );
        if (data.success === true) {
          this.is_required_field = false;
          this.is_loggedin = false;
          this.$store.commit("cart/IS_AUTH", true);
        } else {
          this.is_required_field = true;
          this.$store.commit("cart/IS_AUTH", false);
        }
        this.is_loading = false;
      } catch (e) {
        return;
      }
    },
  },
  created() {
    this.$store.commit("cart/UPDATE_ACTIVE_STEP", 0);
    this.$store.dispatch("cart/fetchQuestions");
    if (!this.authenticated) {
      this.is_loggedin = true;
      this.$store.commit("cart/IS_AUTH", false);
    } else {
      this.showCart();
    }
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
