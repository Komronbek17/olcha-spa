<template>
  <div class="">
    <div v-if="product">
      <TitleContainer title-text="Покупка в рассрочку" />

      <div class="container mx-auto bg-white">
        <div class="flex justify-between items-center pb-4 border-b-2 border-c-gray-2">
          <div>
            <img
              :src="product.main_image ? $aspect(product.main_image, '58x58') : require('~/assets/images/No_Image_Available.jpg')"
              :alt="product.main_image"
            >
          </div>
          <div>
            <p class="text-base">
              {{ $lang(product, 'name') }}
            </p>
          </div>
        </div>
        <div>
          <p class="text-c-gray-5 my-4">
            Выберите первый взнос и срок рассрочки, чтоб расчитать стоимость
          </p>
        </div>
        <!-- Первый взнос -->
        <div class="my-8">
          <div class="flex justify-between items-center text-xl font-bold">
            <p>Первый взнос</p>
            <p>{{ fee }} сум</p>
          </div>
          <div class="flex flex-col items-center justify-center mt-4 mb-2">
            <span
              v-show="!fee_error.valid"
              class="text-c-red-1 text-sm"
            >
              {{ fee_error.title }}
            </span>
            <input
              v-model="fee"
              v-validate="'numeric'"
              class="py-2.5 px-2 w-full rounded-lg border border-c-gray-4 focus:outline-none"
              :class="fee_error.valid ? '' : 'border-c-red-1'"
              type="text"
            >
          </div>
          <div class="flex justify-between items-center text-c-gray-5">
            <p>от {{ product.initial_fee }} сум</p>
            <p>до {{ product.total_price }} сум</p>
          </div>
        </div>

        <!-- Срок рассрочки -->
        <div class="my-8">
          <div class="flex justify-between items-center text-xl font-bold">
            <p>Срок рассрочки</p>
            <p>{{ n }} месяцев</p>
          </div>
          <div class="flex items-center justify-center mt-8 px-2">
            <vue-slider
              v-model="n"
              :marks="marks2"
              :data="[product.plan.min_period,4,5,6,7,8,product.plan.max_period]"
              :rail-style="{background:'#EDEDED'}"
              :process-style="{background:'#12BF6C'}"
              :step-style="{background:'transparent'}"
              :dot-style="dotStyle2"
              :dot-size="26"
              :width="350"
              :height="8"
            >
              <template #tooltip="{ value }">
                <div class="text-sm font-semibold">
                  {{ value }}
                </div>
              </template>
            </vue-slider>
          </div>
        </div>
        <div class="bg-c-gray-1 flex justify-between items-center p-4 whitespace-nowrap text-sm">
          <div>
            <p>Ежемесячный платеж</p>
            <p class="font-bold text-lg">
              {{ total.monthly }} сум
            </p>
          </div>
          <div>
            <p>Общая сумма оплаты</p>
            <p class="font-bold text-lg">
              {{ total.total }}
            </p>
          </div>
        </div>

        <div class="bg-c-gray-1 flex justify-center items-center rounded-lg py-2 px-4 my-4">
          <NuxtLink :to="{ name: 'installment/view' }">
            <p class="text-center">
              Просмотреть график платежа
            </p>
          </NuxtLink>
        </div>

        <button
          class="w-full bg-c-red-1 text-white flex justify-center items-center rounded-lg py-2 px-4 mb-8"
          @click="verifyUser"
        >
          <span class="text-center block">
            {{ $t('id1109') }}
          </span>
        </button>
      </div>
    </div>
    <div v-else>
      id is required params
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

import TitleContainer from '../../reusable/TitleContainer'
import Installment from '~/api/Installment'
import Product from '~/api/Product'
/* eslint-disable */
export default {
  name: 'InstallmentPage',
  components: {
    TitleContainer,
    VueSlider
  },
  async asyncData ({ params }) {
    return await Product.getProduct({ id: params.id })
      .then((res) => {
        return {
          product: res.data.data.product,
          productId: params.id
        }
      }).catch(() => {
        return {
          product: {}
        }
      })
  },
  data () {
    return {
      fee: 0, // Первоначальный взнос
      n: 0, // срок кредита в месяцах
      s: 0,
      r: 0, // процентная ставка (в месяц),
      fee_error: {
        valid: true,
        title: ''
      },
      dotStyle1: {
        background: '#EB1537',
        boxShadow: '0px 0px 1px #fff',
        border: '3px solid #f7f7f7',
        width: '26px',
        height: '26px'
      },
      dotStyle2: {
        background: '#f7f7f7',
        boxShadow: '0px 0px 1px #fff',
        border: '3px solid #12BF6C',
        width: '26px',
        height: '26px'
      },
      marks2: val => val >= 3
        ? ({
            label: '|',
            labelStyle: {
              opacity: 1,
              fontSize: '8px'
            },
            labelActiveStyle: {
              color: '#12BF6C'
            }
          })
        : false
    }
  },
  computed: {
    total () {
      const top = this.r * Math.pow((1 + this.r), this.n)
      const bottom = Math.pow((1 + this.r), this.n) - 1
      const p = this.s * (top / bottom)
      const monthly = Math.ceil(p / 1000) * 1000
      return {
        monthly,
        total: Number((monthly * this.n)) + Number(this.fee)
      }
    }
  },
  watch: {
    fee: {
      deep: true,
      handler (newVal) {
        this.s = Number(this.product.total_price) - Number(newVal)
      }
    }
  },
  mounted () {
    this.fee = this.product.initial_fee
    this.s = Number(this.product.total_price - this.product.initial_fee)
    this.n = Number(this.product.plan.min_period)
    this.r = Number((this.product.plan.margin / 100) / 12)
  },
  methods: {
    async verifyUser () {
      if (this.fee >= this.product.initial_fee) {
        if (this.$auth.loggedIn) {
          return await Installment.checkUser()
            .then(async () => {
              const data = {
                first_fee: this.fee,
                inst_pay_time: this.n,
                product_id: this.$route.params.id
              }
              return await Installment.createRequest(data)
                .then((response) => {
                  const installment_id = response.data.data.installment_id
                  this.$router.push({
                    name: 'installment/checkout/product',
                    params: { installment_id }
                  })
                }).catch((err) => {
                  console.log(err)
                })
            })
            .catch(() => {
              sessionStorage.setItem('installment', this.$route.params.id)
              this.$router.push({
                name: 'installment/form-step'
              })
            })
        } else {
          await this.$router.push({
            name: 'login'
          })
        }
      } else {
        this.fee_error.title = `Минимальная сумма первоначального взноса ${this.product.initial_fee}`
        this.fee_error.valid = false
      }
    }
  }
}
</script>
