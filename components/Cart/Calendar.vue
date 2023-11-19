<template>
  <div class="">
    <div class="flex justify-between items-center border-b pb-3" v-if="header">
      <h1 class="custom--text-cart-title font-bold font-rubik text-gray-600">
        Check out
      </h1>
    </div>
    <div class="py-10 flex flex-col items-center">
      <h1 class="pb-12 text-lg text-gray-700">
        Please choose date and time for your appointment
      </h1>
      <client-only>
        <div class="w-full sm:w-auto sm:flex flex-col sm:flex-row items-center">
          <div class="w-full sm:w-auto">
            <vc-date-picker
              :min-date="new Date()"
              v-model="date"
              mode="date"
              :max-date="maxDate"
              :attributes="attrs"
            />
          </div>
          <div class="pt-5 sm:pt-0 sm:pl-5">
            <ul class="font-rubik grid grid-cols-3 sm:grid-cols-2 gap-x-3">
              <li
                v-for="(t, index) in times"
                :key="t.value"
                :class="t.isSelect ? 'active' : ''"
                class="pb-2"
              >
                <button
                  :disabled="t.isbook || t.notAllow"
                  :class="t.isbook || t.notAllow ? 'is_time__active' : ''"
                  @click="dataTime(t.value, index)"
                  class="
                    w-full
                    flex
                    justify-center
                    py-4
                    px-6
                    border
                    rounded-md
                    cursor-pointer
                    hover:border-brand-color hover:text-brand-color
                  "
                >
                  {{ t.value }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </client-only>
      <p class="text-red-600 pt-2" v-if="calendarerr">{{ err }}</p>
      <br />
      <div class="relative mt-2" v-if="datetimes != ''">
        <button
          type="button"
          @click="resetDateTime"
          class="
            absolute
            top-0
            right-0
            border border-red-600
            text-red-600
            rounded-md
            py-1
            text-sm
            px-5
            bg-white
            hover:text-white hover:bg-red-600
          "
        >
          Edit
        </button>
        <p class="border px-16 rounded-md py-10 w-full">
          You have selected:
          <span class="text-brand-color">{{ datetimes }}</span>
        </p>
      </div>
    </div>
    <div class="border-t pt-10">
      <button class="flex items-center" @click="onClickPrevious">
        <i class="fas fa-long-arrow-alt-left"></i>
        <span class="pl-3 font-medium">Go Back</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  props: ["err", "header"],
  data() {
    return {
      time: [],
      date: new Date(),
      calendarerr: true,
      times: [
        {
          value: "9am",
          isbook: false,
          isSelect: false,
          notAllow: false,
        },
        {
          value: "10am",
          isbook: false,
          isSelect: false,
          notAllow: false,
        },
        {
          value: "11am",
          isbook: false,
          isSelect: false,
          notAllow: false,
        },
        {
          value: "12pm",
          isbook: false,
          isSelect: false,
        },
        {
          value: "1pm",
          isbook: false,
          isSelect: false,
          notAllow: false,
        },
        {
          value: "2pm",
          isbook: false,
          isSelect: false,
          notAllow: false,
        },
        {
          value: "3pm",
          isbook: false,
          isSelect: false,
          notAllow: false,
        },
        {
          value: "4pm",
          isbook: false,
          isSelect: false,
          notAllow: false,
        },
      ],
      is_time: false,
    };
  },
  computed: {
    carts() {
      return this.$store.state.cart.carts;
    },
    datetimes() {
      let datetime = [...this.$store.state.cart.datetime];
      if (datetime.length > 0) {
        if (datetime.length > 1) {
          let first = datetime.shift();
          let last = datetime.pop();
          return (
            this.$moment(first.date).format("L") +
            ", " +
            this.$moment(first.time, ["h:mm"]).format("ha") +
            "-" +
            this.$moment(last.time, ["h:mm"]).format("ha")
          );
        } else {
          return (
            this.$moment(datetime[0].date).format("L") +
            ", " +
            this.$moment(datetime[0].time, ["h:mm"]).format("ha")
          );
        }
      }
      return "";
    },
    attrs() {
      let attrs = this.$store.state.cart.attributes;
      if (attrs.length > 0) {
        return [
          ...attrs.map((todo) => ({
            dates: todo.dates,
            dot: "red",
          })),
        ];
      }
    },
    maxDate() {
      return new Date(this.$moment().add(1, "months"));
    },
    changeDateTime() {
      const { time, date } = this;
      return {
        time,
        date,
      };
    },
    changeDate() {
      const { date } = this;
      return {
        date,
      };
    },
  },
  watch: {
    changeDate: {
      handler: function (val) {
        let times = [...this.times];
        this.times = times.map((el) => {
          el.isSelect = false;
          return el;
        });
        this.$store.commit("cart/IS_FINISHED", false);
        this.time = [];
        this.$store.commit("cart/UPDATE_DATETIME", []);
        let date = this.$moment(val.date).format("YYYY-MM-DD");
        this.$store.dispatch("cart/fetchTime", date).then((res) => {
          this.timeMatch(res);
        });
        this.checkDateAvailable();
      },
      deep: true,
    },
    changeDateTime: {
      handler: function (val) {
        let date = this.$moment(val.date).format("YYYY-MM-DD");
        if (val.date != "" && val.time.length > 0) {
          let datetime = val.time.map((el) => {
            return {
              time: this.$moment(el.value, ["h:mm A"]).format("HH:mm"),
              date: date,
            };
          });
          this.$store.commit("cart/UPDATE_DATETIME", datetime);
          this.calendarerr = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    onClickPrevious() {
      this.$emit("prev");
    },
    checkDateAvailable() {
      let isDateToday = this.$moment(this.date).format("YYYY-MM-DD");
      if (this.$moment().format("YYYY-MM-DD") === isDateToday) {
        let store_times = [];
        let date = this.$moment(this.date).format("MM-DD-YYYY");
        let d = date + " 7:00 am";
        let currentTime = this.$moment(
          this.date,
          "MM-DD-YYYY hh:mm A"
        ).isBefore(+d, "hour");
        if (currentTime) {
          for (let i = 1; i <= 12; i++) {
            let time = this.$moment(
              this.$moment(this.date, "MM-DD-YYYY hh:mm A")
                .add(i, "hour")
                .format("HH"),
              ["HH:mm"]
            ).format("ha");
            store_times.push({
              value: time,
            });
          }
        }
        if (store_times.length > 0) {
          let helper = new Map();
          for (const store_time of store_times) {
            helper.set(store_time.value, store_time);
          }
          for (const time of this.times) {
            let s = helper.get(time.value);
            if (typeof s !== "undefined") {
              time.notAllow = s ? true : false;
            }
          }
        } else {
          this.times.map((el) => {
            el.notAllow = true;
            return el;
          });
        }
      } else {
        this.times.map((el) => {
          el.notAllow = false;
          return el;
        });
        let currentDate = this.$moment(this.date).format("YYYY-MM-DD");
        if (
          this.$moment().add(1, "days").format("YYYY-MM-DD") === currentDate
        ) {
          let store_times = [];
          let date = this.$moment(this.date).format("MM-DD-YYYY");
          let currentTime = this.$moment(
            this.date,
            "MM-DD-YYYY hh:mm A"
          ).isAfter(date + " 8:00 pm", "hour");

          if (currentTime) {
            for (let i = 1; i <= 12; i++) {
              let time = this.$moment(
                this.$moment(this.date, "MM-DD-YYYY hh:mm A")
                  .add(i, "hour")
                  .format("HH"),
                ["HH:mm"]
              ).format("ha");
              store_times.push({
                value: time,
              });
            }
          }
          if (store_times.length > 0) {
            let helper = new Map();
            for (const store_time of store_times) {
              helper.set(store_time.value, store_time);
            }
            for (const time of this.times) {
              let s = helper.get(time.value);
              if (typeof s !== "undefined") {
                time.notAllow = s ? true : false;
              }
            }
          }
        }
      }
    },

    dataTime(val, index) {
      let isDateToday = this.$moment(this.date).format("YYYY-MM-DD");
      if (this.$moment().format("YYYY-MM-DD") === isDateToday) {
        let currentTime = this.$moment().format("HH:mm");
        let fetchTime = this.$moment(val, ["h:mm A"]).format("HH:mm");

        if (fetchTime > currentTime) {
          this.is_time = true;
        } else {
          this.is_time = false;
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Wrong booking Time that's already gone!",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      } else {
        this.is_time = true;
      }
      if (this.is_time) {
        let duration = this.get_cart_item_duration();
        if (duration !== 0) {
          let loops = [];
          for (let i = 0; i < duration; i++) {
            loops.push(i);
          }
          let showTimes = [];
          let j = 0;
          do {
            let times = [...this.times];
            let newTimes = this.$_.rest(times, index);
            let timeselected = newTimes[j];
            if (typeof timeselected !== "undefined") {
              if (timeselected.isbook === true) {
                break;
              } else {
                showTimes.push(timeselected);
              }
              j++;
            } else {
              break;
            }
          } while (j < loops.length);

          if (this.time.length === duration) {
            this.$swal({
              toast: true,
              position: "top-end",
              icon: "error",
              title: "Please edit selected time to change your time frame",
              showConfirmButton: false,
              timer: 10000,
            });
          } else {
            if (showTimes.length === duration) {
              let vm = this;
              let helper = new Map();
              for (const showtime of showTimes) {
                helper.set(showtime.value, showtime);
              }
              for (const time of this.times) {
                let s = helper.get(time.value);
                if (typeof s !== "undefined") {
                  time.isSelect = s ? true : false;
                }
              }
              this.time = showTimes;
              this.$store.commit("cart/IS_FINISHED", true);
            } else {
              this.$swal({
                toast: true,
                position: "top-end",
                icon: "error",
                title:
                  "Something went wrong! Please select another date and time",
                showConfirmButton: false,
                timer: 5000,
              });
            }
          }
        } else {
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "error",
            title:
              "Service Duration limited! Please removed some item and try again.",
            showConfirmButton: false,
            timer: 10000,
          });
        }
      }
    },
    timeMatch(res) {
      if (res.length > 0) {
        let timearr = res.map((el) =>
          this.$moment(el.time, ["hh"]).format("ha")
        );
        let times = [...this.times];
        this.times = times.map((el) => {
          el.isbook = false;
          var match = timearr.includes(el.value);
          if (match) {
            el.isbook = true;
          }
          return el;
        });
      } else {
        let times = [...this.times];
        this.times = times.map((el) => {
          el.isbook = false;
          return el;
        });
      }
    },
    get_cart_item_duration() {
      let cart_wrappers = this.carts.map((x) => x.ids);
      let allitems = [];
      for (let ids of cart_wrappers) {
        for (let id of ids) {
          let filtered = this.carts.filter((el) => el.id == id);
          allitems.push(filtered);
        }
      }
      let duration = allitems
        .flat()
        .map((el) => +el.duration)
        .reduce((a, b) => a + b, 0);
      if (+duration <= 8) {
        return duration;
      } else {
        return 0;
      }
    },
    resetDateTime() {
      this.$store.commit("cart/UPDATE_DATETIME", []);
      this.times = this.times.map((e) => {
        if (e.isSelect === true) {
          e.isSelect = false;
        }
        return e;
      });
      this.time = [];
    },
  },
  created() {
    this.$store.commit("cart/UPDATE_DATETIME", []);

    this.$store.dispatch("cart/fetchAttributes").then((res) => {
      if (res.length > 0) {
        let attri = res.map((el) => {
          return {
            dates: el.date,
          };
        });
        this.checkDateAvailable();
        this.$store.commit("cart/FETCH_ATTRIBUTES", attri);
      }
    });
    this.$store
      .dispatch("cart/fetchTime", {
        date: this.$moment(new Date()).format("YYYY-MM-DD"),
      })
      .then((res) => {
        this.checkDateAvailable();
        this.timeMatch(res);
      });
  },
  mounted() {
    document
      .querySelectorAll(".vc-dots")
      .forEach(
        (vcdots) =>
          vcdots.children.length > 1 &&
          vcdots.children.forEach(
            (vcdot, i) => i != 0 && (vcdot.style.display = "none")
          )
      );
  },
};
</script>

<style scoped>
.active {
  color: rgba(78, 129, 238) !important;
  border-color: rgba(78, 129, 238) !important;
}
.vc-container {
  width: 100% !important;
}
.is_time__active {
  background: #e53e3e !important;
  cursor: not-allowed !important;
  color: white !important;
}
</style>
