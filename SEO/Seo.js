import SeoSingleton from '~/SEO/core/SeoSingleton'

class Seo extends SeoSingleton {
  static baseUrl = 'https://olcha.uz/';

  static product (seo, product, url = '') {
    return {
      titleTemplate: super.get(seo, 'seo_title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: super.get(seo, 'seo_description')
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: super.get(seo, 'seo_keyword')
        },
        {
          hid: 'name',
          name: 'itemprop',
          content: super.get(seo, 'seo_title')
        },
        {
          hid: 'description',
          name: 'description',
          content: super.get(seo, 'seo_description')
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        }, {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@olcha.uz'
        }, {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: super.get(seo, 'seo_title')
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Цена товара: ${product.total_price} UZS  Ежемесячная оплата: ${product.monthly_repayment} UZS
        ${super.get(seo, 'seo_description')}`
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: '@olcha.uz'
        },
        {
          hid: 'twitter:data1',
          name: 'twitter:data1',
          content: `${product.total_price} UZS`
        },
        {
          hid: 'twitter:label1',
          name: 'twitter:label1',
          content: 'Price'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: super.getImageURL(product.main_image, '600x600')
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `${this.baseUrl}${super.getLocal()}${url}`
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'olcha.uz'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: super.get(seo, 'seo_title')
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Цена товара: ${product.total_price} UZS  Ежемесячная оплата: ${product.monthly_repayment} UZS
        ${super.get(seo, 'seo_description')}`
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'product'
        },
        {
          hid: 'og:price:amount',
          property: 'og:price:amount',
          content: `${product.total_price} UZS`
        },
        {
          hid: 'og:price:currency',
          property: 'og:price:currency',
          content: 'UZS'
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: '1000'
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: '1000'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: super.getImageURL(product.main_image, '600x600')
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${this.baseUrl}${super.getLocal()}${url}`
        },
        {
          hid: 'image',
          itemprop: 'image',
          content: super.getImageURL(product.main_image, '600x600')
        },
        {
          hid: 'product:price:amount',
          property: 'product:price:amount',
          content: `${product.total_price} UZS`
        },
        {
          hid: 'product:price:currency',
          property: 'product:price:currency',
          content: 'UZS'
        }
      ]
    }
  }

  static catalog (seo, url = '') {
    return {
      titleTemplate: super.get(seo, 'seo_title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: super.get(seo, 'seo_description')
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: super.get(seo, 'seo_keyword')
        },
        {
          hid: 'name',
          name: 'itemprop',
          content: super.get(seo, 'seo_title')
        },
        {
          hid: 'description',
          name: 'description',
          content: super.get(seo, 'seo_description')
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        }, {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@olcha.uz'
        }, {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: super.get(seo, 'seo_title')
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: super.get(seo, 'seo_description')
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: '@olcha.uz'
        },
        // {
        //   hid: 'twitter:data1',
        //   name: 'twitter:data1',
        //   content: `${product.total_price} UZS`
        // },
        // {
        //   hid: 'twitter:label1',
        //   name: 'twitter:label1',
        //   content: 'Price'
        // },
        // {
        //   hid: 'twitter:image',
        //   name: 'twitter:image',
        //   content: super.getImageURL(product.main_image, '600x600')
        // },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `${this.baseUrl}${super.getLocal()}${url}`
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'olcha.uz'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: super.get(seo, 'seo_title')
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: super.get(seo, 'seo_description')
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        // {
        //   hid: 'og:price:amount',
        //   property: 'og:price:amount',
        //   content: `${product.total_price} UZS`
        // },
        // {
        //   hid: 'og:price:currency',
        //   property: 'og:price:currency',
        //   content: 'UZS'
        // },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: '800'
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: '500'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://olcha.uz/dist/images/logo.svg'
          /* super.getImageURL(product.main_image, '600x600') */
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${this.baseUrl}${super.getLocal()}${url}`
        }
        // {
        //   hid: 'image',
        //   itemprop: 'image',
        //   content: super.getImageURL(product.main_image, '600x600')
        // },
        // {
        //   hid: 'product:price:amount',
        //   property: 'product:price:amount',
        //   content: `${product.total_price} UZS`
        // },
        // {
        //   hid: 'product:price:currency',
        //   property: 'product:price:currency',
        //   content: 'UZS'
        // }
      ]
    }
  }

  static childCategory (seo, url = '') {
    return {
      titleTemplate: super.get(seo, 'seo_title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: super.get(seo, 'seo_description')
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: super.get(seo, 'seo_keyword')
        },
        {
          hid: 'name',
          name: 'itemprop',
          content: super.get(seo, 'seo_title')
        },
        {
          hid: 'description',
          name: 'description',
          content: super.get(seo, 'seo_description')
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        }, {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@olcha.uz'
        }, {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: super.get(seo, 'seo_title')
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: super.get(seo, 'seo_description')
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: '@olcha.uz'
        },
        // {
        //   hid: 'twitter:data1',
        //   name: 'twitter:data1',
        //   content: `${product.total_price} UZS`
        // },
        // {
        //   hid: 'twitter:label1',
        //   name: 'twitter:label1',
        //   content: 'Price'
        // },
        // {
        //   hid: 'twitter:image',
        //   name: 'twitter:image',
        //   content: super.getImageURL(product.main_image, '600x600')
        // },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `${this.baseUrl}${super.getLocal()}${url}`
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'olcha.uz'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: super.get(seo, 'seo_title')
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: super.get(seo, 'seo_description')
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        // {
        //   hid: 'og:price:amount',
        //   property: 'og:price:amount',
        //   content: `${product.total_price} UZS`
        // },
        // {
        //   hid: 'og:price:currency',
        //   property: 'og:price:currency',
        //   content: 'UZS'
        // },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: '800'
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: '500'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://olcha.uz/dist/images/logo.svg'
          /* super.getImageURL(product.main_image, '600x600') */
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${this.baseUrl}${super.getLocal()}${url}`
        }
        // {
        //   hid: 'image',
        //   itemprop: 'image',
        //   content: super.getImageURL(product.main_image, '600x600')
        // },
        // {
        //   hid: 'product:price:amount',
        //   property: 'product:price:amount',
        //   content: `${product.total_price} UZS`
        // },
        // {
        //   hid: 'product:price:currency',
        //   property: 'product:price:currency',
        //   content: 'UZS'
        // }
      ]
    }
  }
}

export default Seo
