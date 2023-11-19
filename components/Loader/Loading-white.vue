<template>
  <div class="profile-main-loaders">
    <div class="loaders">
      <svg class="circular-loaders" viewBox="25 25 50 50">
        <circle
          class="loaders-path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="#fff"
          stroke-width="2"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.profile-main-loaders {
  width: 45px;
  z-index: 9000 !important;
}

.profile-main-loaders .loaders {
  position: relative;
  margin: 0px auto;
  width: 30px;
  height: 30px;
}
.profile-main-loaders .loaders:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.circular-loaders {
  -webkit-animation: rotate 2s linear infinite;
  animation: rotate 2s linear infinite;
  height: 100%;
  -webkit-transform-origin: center center;
  -ms-transform-origin: center center;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
}

.loaders-path {
  stroke-dasharray: 150, 200;
  stroke-dashoffset: -10;
  -webkit-animation: dash 1.5s ease-in-out infinite,
    color 6s ease-in-out infinite;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}

@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
@-webkit-keyframes color {
  0% {
    stroke: #fff;
  }
  40% {
    stroke: #fff;
  }
  66% {
    stroke: #fff;
  }
  80%,
  90% {
    stroke: #fff;
  }
}
@keyframes color {
  0% {
    stroke: #fff;
  }
  40% {
    stroke: #fff;
  }
  66% {
    stroke: #fff;
  }
  80%,
  90% {
    stroke: #fff;
  }
}
</style>