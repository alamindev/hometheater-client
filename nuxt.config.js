export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Home Theater Proz",
    meta: [
      { "http-equiv": "content-language", content: "en-us" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "We offer professional home theater installation, media room finishing, whole home audio and TV mounting service in and around San Antonio, Texas.",
      },
      {
        hid: "msapplication-TileColor",
        name: "msapplication-TileColor",
        content: "#da532c",
      },
      {
        hid: "theme-color",
        name: "theme-color",
        content: "#ffffff",
      },
    ],
    link: [
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
        sizes: "76x76",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
      {
        rel: "mask-icon",
        href: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      }, 
    ],
  },
  /*
   */
  css: ["assets/css/style.scss", "swiper/css/swiper.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "./plugins/nuxt-swiper-plugin.js", ssr: false },
    "./plugins/mixins/validation",
    "./plugins/mixins/user",
    "./plugins/axios",
    "./plugins/typeface.js",
    "./plugins/directive.js",
    "./plugins/vue-js-modal.js",
    "./plugins/vue-the-mask.js",
    { src: "./plugins/pagination.js", ssr: false },
    { src: "./plugins/perfect-scroll.js", ssr: false },
    { src: "./plugins/calendar.js", ssr: false },
    { src: "./plugins/star-rating.js", ssr: false },
    { src: "./plugins/underscore.js", ssr: false },
    
  ],
  static: {
    prefix: true,
  },
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */

  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/pwa",
    "@nuxt/postcss8",
    "@nuxtjs/moment", 
  ],
  optimizedImages: {
    optimizeImages: true,
  }, 
  // pwa: {
  //   meta: {
  //     title: "home theater proz",
  //     author: "Me",
  //   },
  //   manifest: {
  //     name: "home theater",
  //     short_name: "TV Mounting & Home Theater Installation",
  //     lang: "en",
  //     orientation: "portrait-primary",
  //     background_color: "#ffffff",
  //     theme_color: "#010101",
  //   },
  //   workbox: {
  //     dev: process.env.NODE_ENV !== "production", 
  //   },
  // },
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth", 
    "nuxt-precompress",
    "vue-sweetalert2/nuxt",
    "vue-social-sharing/nuxt",
    "cookie-universal-nuxt",
    ["vue-scrollto/nuxt", { duration: 300 }], 
    [
      "nuxt-lazy-load",
      {
        defaultImage: "/images/loading-gif.gif",
        directiveOnly: true,
      },
    ],
    "@nuxtjs/amp",
    "nuxt-compress", 
    "nuxt-beastcss", 
  ],  
  beastcss: {  
    config: { 
      fontFace: true,
    },
  },
  optimization: {
    splitChunks: {
      maxSize: 300000
    }
  },
  "nuxt-compress": {
    gzip: {
      threshold: 8192,
    },
    brotli: {
      threshold: 8192,
    },
  },
  amp: {
    origin: "https://hometheaterproz.com",
    mode: "hybrid",
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ["typeface-poppins", "typeface-roboto", "typeface-rubik"],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
    extend(config, ctx) {
      config.performance.maxAssetSize = 700 * 1024;
    },
    maxChunkSize: 3000,
  },
  sitemap: {
    hostname: "https://hometheaterproz.com/",
    lastmod: "2022-04-01",
  },
  env: {
    baseUrl: process.env.BASE_URL || "https://admin.hometheaterproz.com/api/",
    // https://admin.hometheaterproz.com/api/    http://localhost:8000/api/
    imgUrl: "https://admin.hometheaterproz.com/",
    //https://admin.hometheaterproz.com/  http://localhost:8000/
    mainDomain: "https://hometheaterproz.com/",
    url: "https://hometheaterproz.com", 
    MAP_API_KEY: "AIzaSyBjVRkL8MOLaVd-fjloQguTIQDLAAzA4w0",  
  },
  /*
   ** Axios module configuration
   */
  axios: {
    proxy: true,
    proxyHeaders: false,
    credentials: false,
  },
  server: {
    port: 8080, // default: 3000
  },
  router: {
    middleware: ["clearValidationErrors", 'redirect' ],
    extendRoutes(routes, resolve) {
      routes.push({
        path: "/login",
        components: {
          default: resolve(__dirname, "pages/auth/login"),
        },
      });
      routes.push({
        path: "/register",
        components: {
          default: resolve(__dirname, "pages/auth/register"),
        },
      });
      routes.push({
        path: "/forgot-password",
        components: {
          default: resolve(__dirname, "pages/auth/forgot-password"),
        },
      });
      routes.push({
        path: "/change-password",
        components: {
          default: resolve(__dirname, "pages/auth/change-password"),
        },
      });
    },
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "auth/login",
            method: "post",
            propertyName: "token",
          },
          user: {
            url: "me",
            method: "get",
            propertyName: "data",
          },
          logout: {
            method: "get",
            url: "auth/logout",
            method: "get",
          },
        },
      },
    },
    redirect: {
      login: "/login",
      logout: "/",
      home: "/",
    },
    plugins: [
      { src: "./plugins/axios", ssr: true },
      "./plugins/auth",
      "./plugins/remember",
    ],
    cookie: {
      options: {
        maxAge: 86400, // 24 hours
      },
    },
  },
};
