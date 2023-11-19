<script>
const apiKey = process.env.MAP_API_KEY;
export default {
  methods: {
    injectGoogleMapsApiIfNotInjectedAlready() {
      return new Promise((resolve, reject) => {
        try {
          if (
            typeof window !== "undefined" &&
            !Object.prototype.hasOwnProperty.call(window, "google")
          ) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
            document.head.appendChild(script);
          }
          resolve();
        } catch (e) {
          reject(
            new Error("Map could not be loaded due to network issues " + e)
          );
        }
      });
    },
    autoCompleteLocation(event = null) {
      let vm = this;
      var options = {
        types: ["address"],
        componentRestrictions: {
          country: "us",
        },
      };
      const searchCityTextField = event.target;
      try {
        const autocomplete = new google.maps.places.Autocomplete(
          searchCityTextField,
          options
        );
        autocomplete.addListener("place_changed", function () {
          var place = autocomplete.getPlace();
          var storableLocation = {};
          for (var ac = 0; ac < place.address_components.length; ac++) {
            var component = place.address_components[ac];
            switch (component.types[0]) {
              case "locality":
                storableLocation.city = component.long_name;
                break;
              case "administrative_area_level_1":
                storableLocation.state = component.short_name;
                break;
              case "postal_code":
                storableLocation.postal_code = component.long_name;
                break;
            }
          }
          vm.form.state = storableLocation.state;
          vm.form.zipcode = storableLocation.postal_code;
          vm.form.city = storableLocation.city;
          vm.form.address = place.name;
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
