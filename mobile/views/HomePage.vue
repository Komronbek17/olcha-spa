<template>
  <div class="w-full bg-c-gray-1">
    <div class="pb-4">
      <MainSlider :sliders="sliders" />
    </div>
    <div class="container pb-12 mx-auto my-shadow  rounded-t-2xl bg-white">
      <Category :all-categories="allCategories" />
      <BannerTop :banner-top="bannerTop" />
      <InterestingProducts :interesting-products="interestingProducts" />
      <BannerMiddle :banner-middle="bannerMiddle" />
      <Proms :promo-blogs="promoBlogs" />
      <News :new-products="newProducts" />
      <Installment :installment-products="installmentProducts" />
      <InstallmentAdvantage :installment-advantage="installmentAdvantage" />
      <BannerBottom :banner-bottom="bannerBottom" />
      <OftenNecessary :often-needed="oftenNeeded" />
      <Blogs :blogs="blogs" />
      <div v-if="historyProducts.lenght">
        <HistoryViewsProducts :history-products="historyProducts" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MainSlider from '../components/home-components/MainSlider'
import Category from '../components/home-components/Category'
import BannerTop from '../components/home-components/BannerTop'
import InterestingProducts from '../components/home-components/InterestingProducts'
import BannerBottom from '../components/home-components/BannerBottom'
import Proms from '../components/home-components/Proms'
import News from '../components/home-components/News'
import Installment from '../components/home-components/Installment'
import InstallmentAdvantage from '../components/home-components/InstallmentAdvantage'
import BannerMiddle from '../components/home-components/BannerMiddle'
import OftenNecessary from '../components/home-components/OftenNecessary'
import Blogs from '../components/home-components/Blogs'
import HistoryViewsProducts from '../components/home-components/HistoryViewsProducts'
import Footer from '../components/home-components/Footer'
import Banner from '~/api/Banner'
import Categories from '~/api/Categories'
import Blog from '~/api/Blog'
import User from '~/api/User'
/* eslint-disable */
export default {
  components: {
    MainSlider,
    Category,
    BannerTop,
    InterestingProducts,
    BannerBottom,
    Proms,
    News,
    Installment,
    InstallmentAdvantage,
    BannerMiddle,
    OftenNecessary,
    Blogs,
    HistoryViewsProducts,
    Footer
  },
  layout: "default",
  middleware({ app, redirect }) {
    if (!app.$auth.loggedIn) {
      redirect("/login");
    }
  },
  computed: {
    ...mapState("home", {
      sliders: state => state.sliders,
      allCategories: state => state.allCategories,
      bannerTop: state => state.bannerTop,
      interestingProducts: state => state.interestingProducts,
      bannerMiddle: state => state.bannerMiddle,
      promoBlogs: state => state.promoBlogs,
      newProducts: state => state.newProducts,
      installmentProducts: state => state.installmentProducts,
      installmentAdvantage: state => state.installmentAdvantage,
      oftenNeeded: state => state.oftenNeeded,
      bannerBottom: state => state.bannerBottom,
      blogs: state => state.blogs,
      historyProducts: state => state.historyProducts
    })
  },
  asyncData({ store }) {
    Banner.GET_SLIDER_BANNER_TOP()
      .then(response => {
        const value = response.data.data.sliders;
        store.commit("home/SET_STATE_VAR", { name: "sliders", value });
      })
      .catch(err => {
        console.log(err);
      });

    Categories.GET_ALL_CATEGORY()
      .then(response => {
        const { categories } = response.data.data;
        const value = categories;
        store.commit("home/SET_STATE_VAR", { name: "allCategories", value });
      })
      .catch(err => {
        console.log(err);
      });

    Banner.GET_BANNER_TOP()
      .then(response => {
        const value = response.data.data.banner;
        store.commit("home/SET_STATE_VAR", { name: "bannerTop", value });
      })
      .catch(err => {
        console.log(err);
      });

    Categories.GET_INTERESTING_PRODUCTS()
      .then(response => {
        const value = response.data.data.products;
        store.commit("home/SET_STATE_VAR", {
          name: "interestingProducts",
          value
        });
      })
      .catch(err => {
        console.log(err);
      });

    Banner.GET_BANNER_MIDDLE()
      .then(response => {
        const value = response.data.data.banner;
        store.commit("home/SET_STATE_VAR", { name: "bannerMiddle", value });
      })
      .catch(err => {
        console.log(err);
      });

    Blog.getPromoBlogs()
      .then(response => {
        const value = response.data.data.blogs;
        store.commit("home/SET_STATE_VAR", { name: "promoBlogs", value });
      })
      .catch(err => {
        console.log(err);
      });

    Categories.GET_NEW_PRODUCTS()
      .then(response => {
        const value = response.data.data.products;
        store.commit("home/SET_STATE_VAR", { name: "newProducts", value });
      })
      .catch(err => {
        console.log(err);
      });

    Categories.GET_INSTALLMENT_PRODUCTS()
      .then(response => {
        const value = response.data.data.products;
        store.commit("home/SET_STATE_VAR", {
          name: "installmentProducts",
          value
        });
      })
      .catch(err => {
        console.log(err);
      });

    Categories.GET_INSTALLMENT_ADVANTAGE()
      .then(response => {
        const value = response.data.data.products;
        store.commit("home/SET_STATE_VAR", {
          name: "installmentAdvantage",
          value
        });
      })
      .catch(err => {
        console.log(err);
      });

    Categories.GET_OFTEN_NEEDED()
      .then(response => {
        const value = response.data.data.products;
        store.commit("home/SET_STATE_VAR", { name: "oftenNeeded", value });
      })
      .catch(err => {
        console.log(err);
      });

    Banner.GET_BANNER_BOTTOM()
      .then(response => {
        const value = response.data.data.banner;
        store.commit("home/SET_STATE_VAR", { name: "bannerBottom", value });
      })
      .catch(err => {
        console.log(err);
      });

    Categories.GET_BLOGS()
      .then(response => {
        const value = response.data.data.blogs;
        store.commit("home/SET_STATE_VAR", { name: "blogs", value });
      })
      .catch(err => {
        console.log(err);
      });

    User.getHistoryViews()
      .then(response => {
        value = response.data.data.history_products;
        store.commit("home/SET_STATE_VAR", { name: "historyProducts", value });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
