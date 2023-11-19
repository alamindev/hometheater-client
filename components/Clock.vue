<template>
  <div class="flex justify-center pb-12 pt-5">
    <div class="">
      <div class="flex items-start text-2xl">
        <i class="fas fa-clock pr-2 text-4xl"></i>
        <div class="time text-brand-color">
          <span id="hours">{{ hours }}</span
          ><span id="min">{{ minutes }}</span> <span id="ampm">{{ ampm }}</span>
        </div>
      </div>

      <div class="days flex justify-center">
        <p class="text-lg text-gray-400 pt-2 capitalize">
          {{ $moment().format("ddd MMMM DD YYYY") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: [
        { text: "sun", active: false },
        { text: "mon", active: false },
        { text: "tue", active: false },
        { text: "wed", active: false },
        { text: "thu", active: false },
        { text: "fri", active: false },
        { text: "sat", active: false },
      ],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      ampm: "",
      hours: "",
      minutes: "",
      sec: "",
      month: "",
      date: "",
      year: "",
    };
  },
  methods: {
    startClock: function () {
      var THIS = this;

      setInterval(function () {
        var a = new Date().getTime() / 1e3,
          b = new Date(),
          c = b.getHours(),
          d = b.getMinutes(),
          e = b.getSeconds(),
          f = b.getMilliseconds(),
          g = f.toString().slice(0, -2),
          h = b.getDay(),
          i = 12 <= c ? "PM" : "AM",
          j = b.getMonth(),
          k = b.getDate(),
          l = b.getFullYear();
        THIS.$data.ampm = i;
        12 < c && (c %= 12),
          0 == c && (c = 12),
          9 >= e && (e = "0" + e),
          9 >= d && (d = "0" + d),
          (THIS.$data.hours = c),
          (THIS.$data.minutes = `:${d}`),
          (THIS.$data.sec = e),
          (THIS.$data.month = THIS.$data.months[j]),
          (THIS.$data.date = k),
          (THIS.$data.year = l);
        THIS.$data.days[h].active = true;
      }, 100);
    },
  },
  created: function () {
    this.startClock();
  },
};
</script>

<style>
</style>
