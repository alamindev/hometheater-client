<template>
  <div>
    <section class="bg-white shadow-lg p-5 mt-5 rounded-md user--booking-edit">
      <div
        class="flex items-center justify-between pb-5 border-b border-gray-200"
      >
        <h2 class="text-left text-2xl text-dark-sm font-bold">Edit Booking</h2>
        <button
          @click="$router.go(-1)"
          class="border-0 py-2 px-5 bg-brand-color hover:bg-brand-color-hover rounded-sm text-white"
        >
          Back
        </button>
      </div>

      <div class="pt-6" v-if="!loading">
        <div class="flex items-center justify-between pb-5">
          <div class="w-full">
            <div>
              <h2 class="text-xl text-gray-600 pb-3 font-medium">
                Your appointment is scheduled for:
              </h2>
              <table class="table">
                <thead>
                  <tr>
                    <th class="py-2 text-left">Date</th>
                    <th class="py-2 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="datetime in edit_booking.datetime"
                    :key="datetime.id"
                  >
                    <td class="py-2">
                      {{ $moment(datetime.date).format("MMMM Do YYYY") }}
                    </td>
                    <td class="py-2">
                      {{ $moment(datetime.time, ["hh"]).format("ha") }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="pt-8">
              <p class="text-gray-400 text-sm pb-5">
                (Change date and time for Appointment)
              </p>
              <button
                v-if="!is_edit"
                @click="isEdit"
                class="px-5 py-2 bg-brand-color hover:bg-brand-color-hover text-white rounded shadow"
                type="button"
              >
                <i class="fas fa-book text-white"></i> Select date & time
              </button>
              <div class="" v-show="is_edit">
                <EditCalendar />
              </div>
            </div>
          </div>
        </div>
        <h2 class="text-xl text-gray-600 pb-5 pt-3">Edit Image</h2>
        <EditImage />
        <div class="pb-10 pt-16">
          <button
            @click="update"
            :disabled="datetime === 'Invalid date'"
            class="border-0 bg-brand-color hover:bg-brand-color-hover py-2 px-10 text-white rounded-md disabled:bg-blue-200"
          >
            Update
          </button>
        </div>
      </div>
      <div v-else class="loader-parent mt-16">
        <div class="loader"></div>
      </div>
    </section>
  </div>
</template>

<script>
import EditCalendar from "@/components/Cart/EditCalendar";
import EditImage from "@/components/Cart/EditImage";
export default {
  middleware: ["auth", "checkSetting"],
  layout: "users",
  components: {
    EditCalendar,
    EditImage,
  },
  computed: {
    edit_booking() {
      return this.$store.state.users.booking.edit_booking;
    },
    datetime() {
      return this.$store.state.users.booking.datetime;
    },
    loading() {
      return this.$store.state.loading.loading;
    },
  },
  data() {
    return {
      imgurl: process.env.imgUrl,
      show: "",
      is_edit: false,
    };
  },

  methods: {
    isEdit() {
      this.is_edit = !this.is_edit;
    },
    async update() {
      await this.$store.dispatch("users/booking/UpdateBooking").then((res) => {
        if (res == true) {
          this.$swal({
            toast: true,
            position: "top-right",
            icon: "success",
            timer: 5000,
            showConfirmButton: false,
            title: "Booking Successfully Updated!",
          });
          this.$router.push("/users/booking");
        }
      });
    },
  },
  head() {
    return {
      title: "Edit Booking | Home Theater Proz",
    };
  },
  async fetch() {
    if (
      this.edit_booking.status === "cancel" ||
      this.edit_booking.status === "complete"
    ) {
      this.$router.go(-1);
    }
    await this.$store.dispatch(
      "users/booking/fetchBooking",
      this.$route.params.id
    );
  },
  updated() {
    this.$store.commit("users/booking/UPDATE_NEWIMG", []);
  },
};
</script>

