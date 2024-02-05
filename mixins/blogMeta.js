export default {
  data() {
    return {
      imgurl: process.env.imgUrl,
      url: process.env.url + this.$route.fullPath,
    };
  },
  head() {
    return {
      title: this.meta.title ? this.meta.title + " | Home Theater Proz" : "Recent Blogs and Articles | Home Theater Proz",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.meta ? this.meta.description : "",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.meta ? this.meta.keyword : "",
        },
        {
          hid: "og:type",
          name: "og:type",
          content: "website",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.meta ? this.meta.title : "",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.meta ? this.meta.description : "",
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.meta ? this.imgurl + "storage" + this.meta.image : "",
        },
        {
          hid: "og:url",
          name: "og:url",
          content: this.url,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.meta ? this.meta.description : "",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.meta ? this.imgurl + "storage" + this.meta.image : "",
        },
        {
          hid: "twitter:domain",
          name: "twitter:domain",
          content: "hometheaterproz.com",
        },
        {
          hid: "twitter:card",
          name: "summary_large_image",
          content: "summary_large_image",
        },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: this.url,
        },
        {
          itemprop: "name",
          content: this.meta ? this.meta.title : "",
        },
        {
          itemprop: "description",
          content: this.meta ? this.meta.description : "",
        },
        {
          itemprop: "image",
          content: this.meta ? this.imgurl + "storage" + this.meta.image : "",
        },
      ],
      script: [
        {
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
          "data-ad-client": "ca-pub-8126792890895912",
          async: true,
        },
      ],
    };
  },
};
