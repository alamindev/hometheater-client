export default {
    data() {
        return {
            imgurl: process.env.imgUrl,
            url: process.env.url + this.$route.fullPath
        };
    },
    head() {
        return {
            title: this.meta ? this.meta.title + " | Home Theater Proz" : "Our Services | Home Theater Proz",
            meta: [{
                    hid: "description",
                    name: "description",
                    content: this.meta ? this.meta.description : ""
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.meta ? this.meta.keyword : ""
                },
                {
                    hid: "og:type",
                    name: "og:type",
                    content: "website"
                },
                {
                    hid: "og:title",
                    name: "og:title",
                    content: this.meta ? this.meta.title : ""
                },
                {
                    hid: "og:description",
                    name: "og:description",
                    content: this.meta ? this.meta.description : ""
                },
                {
                    hid: "og:image",
                    name: "og:image",
                    content: this.meta ? this.imgurl + "storage" + this.meta.image : ""
                },
                {
                    hid: "og:url",
                    name: "og:url",
                    content: this.url
                },
                {
                    hid: "twitter:description",
                    name: "twitter:description",
                    content: this.meta ? this.meta.description : "asdfsad"
                },
                {
                    hid: "twitter:image",
                    name: "twitter:image",
                    content: this.meta ? this.imgurl + "storage" + this.meta.image : ""
                },
                {
                    hid: "twitter:domain",
                    name: "twitter:domain",
                    content: "hometheaterproz.com"
                },
                {
                    hid: "twitter:card",
                    name: "summary_large_image",
                    content: "summary_large_image"
                },
                {
                    hid: "twitter:url",
                    name: "twitter:url",
                    content: this.url
                },
                {
                    itemprop: "name",
                    content: this.meta ? this.meta.title : ""
                },
                {
                    itemprop: "description",
                    content: this.meta ? this.meta.description : ""
                },
                {
                    itemprop: "image",
                    content: this.meta ? this.imgurl + "storage" + this.meta.image : ""
                }
            ],
            script: this.getScript
        };
    },
    computed: {
        getScript() {
            if (this.meta.reviews.length > 0) {
                return [
                  {
                    type: "application/ld+json",
                    json: {
                      "@context": "https://schema.org/",
                      "@type": "Product",
                      name: this.meta
                        ? this.meta.title.replace(/<\/?[^>]+(>|$)/g, "")
                        : "",
                      image: this.meta
                        ? this.imgurl + "storage" + this.meta.image
                        : "",
                      description: this.meta
                        ? this.meta.details.replace(/<\/?[^>]+(>|$)/g, "")
                        : "",
                      sku: "TV3265",
                      mpn: "NONE",
                      brand: {
                        "@type": "Brand",
                        name: "Home Theater Proz",
                      },
                      review: this.meta ? this.meta.reviews[0] : "",
                      aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: "5",
                        reviewCount: this.meta
                          ? `${this.meta.rating_count}`
                          : "",
                        datePublished: "2021-3-22",
                      },
                      offers: {
                        "@type": "Offer",
                        url: `https://hometheaterproz.com/booking/${
                          this.meta ? this.meta.slug : ""
                        }`,
                        priceCurrency: "USD",
                        price: this.meta ? `${this.meta.price}` : "",
                        priceValidUntil: "2030-11-20",
                        availability: "http://schema.org/InStock",
                      },
                    },
                  },
                ];
            }
        }
    }
};
