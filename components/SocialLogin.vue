<template>
  <div class="social-login">
    <button
      @click="socialLogin('facebook')"
      class="social-login-btn facebook shadow-md"
    >
      <i class="fab fa-facebook"></i>
    </button>
    <button
      @click="socialLogin('twitter')"
      class="social-login-btn twitter shadow-md"
    >
      <i class="fab fa-twitter"></i>
    </button>
    <button
      @click="socialLogin('google')"
      class="social-login-btn google shadow-md"
    >
      <i class="fab fa-google"></i>
    </button>
    <button
      @click="socialLogin('linkedin')"
      class="social-login-btn linkedin shadow-md"
    >
      <i class="fab fa-linkedin"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: ["is_cart"],
  methods: {
    socialLogin(service) {
      if (this.is_cart && this.is_cart === true) {
        this.$cookies.set("last-location", "cart?step=3");
      } else {
        this.$cookies.remove("last-location");
      }
      window.location.href = `${process.env.baseUrl}auth/login/${service}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.social-login {
  display: flex;
  justify-content: flex-start;
}
.social-login-btn {
  color: white;
  border-radius: 5px;
  background: #333;
  border: none;
  margin-left: 5px;
  margin-right: 5px;
  width: 50px;
  height: 50px;
  font-size: 23px;
  cursor: pointer;
  &.google {
    background: #dd4b39;
  }
  &.twitter {
    background: #00acee;
  }
  &.facebook {
    background: #3b5998;
  }
  &.linkedin {
    background: #0e76a8;
  }
}
</style>
