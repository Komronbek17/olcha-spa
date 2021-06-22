// Mobile Views
import HomePage from '@/mobile/views/HomePage.vue'

/* Proms And Discounts Page */

// Category
import CategoryBranch from '@/mobile/views/category/CategoryBranch.vue'
import CategoryBranchVariation from '@/mobile/views/category/CategoryBranchVariation.vue'
// End Of Category
// Login
import LoginPage from '@/mobile/views/registration/LoginPage.vue'

/* SignUp */
import SignUp from '@/mobile/views/registration/SignUp.vue'
import VerificationCode from '@/mobile/views/registration/VerificationCode.vue'

/* Recover Password */
import RecoverPassword from '@/mobile/views/registration/RecoverPassword.vue'

/* Installment */
import InstallmentPage from '@/mobile/views/installment/InstallmentPage.vue'
import PaymentSchedule from '@/mobile/views/installment/PaymentSChedule.vue'
import PaymentMoreDetails from '@/mobile/views/installment/PaymentMoreDetails.vue'
import InstallmentVerification from '@/mobile/views/installment/InstallmentVerification.vue'
import InputCardNumber from '@/mobile/views/installment/InputCardNumber.vue'

/* Installment Checkout */
import InstallmentCheckout from '@/mobile/views/installment/checkout/InstallmentCheckout.vue'
import InstOrderSuccess from '@/mobile/views/installment/checkout/InstOrderSuccess.vue'

/* Order */
import OrderRegistrationPage from '@/mobile/views/order/OrderRegistrationPage.vue'
import PaymentLevel from '@/mobile/views/order/PaymentLevel.vue'
import OrderSuccess from '@/mobile/views/order/OrderSuccess.vue'
import ManufacturerPage from '~/mobile/views/ManufacturerPage.vue'
/* Mobile */
import HomePageRoute from '~/mobile/router/HomePageRoute.vue'
import CheckoutPageRoute from '~/mobile/router/CheckoutPageRoute.vue'
import CartPage from '~/mobile/views/CartPage'
import ProductPage from '~/mobile/views/ProductPage'
import FavoritePage from '~/mobile/views/FavoritePage'
import CabinetPage from '~/mobile/views/CabinetPage'
import ProfilePage from '~/mobile/views/cabinet/ProfilePage'
import CabinetPageRoute from '~/mobile/router/CabinetPageRoute'
import OrdersHistory from '~/mobile/views/cabinet/OrdersHistory'
import AddressPage from '~/mobile/views/cabinet/AddressPage'
import TrackOrderPage from '~/mobile/views/cabinet/TrackOrderPage'
import HelpPage from '~/mobile/views/static-pages/HelpPage'
import SettingPage from '~/mobile/views/cabinet/SettingPage'
import NotificationsPage from '~/mobile/views/cabinet/NotificationsPage'
import ComparePage from '~/mobile/views/ComparePage'
import BonusAccountPage from '~/mobile/views/cabinet/BonusAccountPage'
import FeedbackPage from '~/mobile/views/cabinet/FeedbackPage'
import ReviewsPage from '~/mobile/views/ReviewsPage'
import CategoryPage from '~/mobile/views/CategoryPage'
import InstallmentProfilePage from '~/mobile/views/cabinet/InstallmentProfilePage'
import Orders from '~/mobile/views/cabinet/Orders'
import BlogPage from '~/mobile/views/BlogPage.vue'
import CompareProductPage from '~/mobile/views/compare/CompareProductPage'

/* Static Pages */
import AboutCompany from '~/mobile/views/static-pages/AboutCompany'
import EcoFriendly from '~/mobile/views/static-pages/EcoFriendly'
import InstallmentPlan from '~/mobile/views/static-pages/InstallmentPlan'
import PaymentDelivery from '~/mobile/views/static-pages/PaymentDelivery'
import Policy from '~/mobile/views/static-pages/Policy'
import PublicOffer from '~/mobile/views/static-pages/PublicOffer'

/* Bonus Account */
// import BonusAccount from '~/mobile/components/profile-components/BonusAccount.vue'

/* Search */
// import MainSearchPage from '~/mobile/views/search/MainSearchPage.vue'
// import MainSearchList from '~/mobile/views/search/MainSearchList.vue'

export const routes = [
  {
    path: '/',
    component: HomePageRoute,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage
      },
      {
        path: 'category',
        name: 'categories',
        component: CategoryPage
      },
      {
        path: 'category/:alias',
        name: 'category',
        component: CategoryBranch
      },
      {
        path: 'installments/:alias',
        name: 'installments',
        component: CategoryBranch
      },
      {
        path: 'discounts/:alias',
        name: 'discounts',
        component: CategoryBranch
      },
      {
        path: 'category/:alias/:variation',
        name: 'category/variation',
        component: CategoryBranchVariation
      },
      {
        path: 'installments/:alias/:variation',
        name: 'installments/variation',
        component: CategoryBranchVariation
      },
      {
        path: 'discounts/:alias/:variation',
        name: 'discounts/variation',
        component: CategoryBranchVariation
      },
      {
        path: 'product/view/:alias',
        name: 'product',
        component: ProductPage
      },
      {
        path: 'login',
        name: 'login',
        component: LoginPage
      },
      {
        path: 'sign-up',
        name: 'sign-up',
        component: SignUp
      },
      {
        path: 'sign-up/verification-code',
        name: 'verification-code',
        component: VerificationCode
      },
      {
        path: 'recover-password',
        name: 'recover-password',
        component: RecoverPassword
      },
      {
        path: 'product/installment/:id',
        name: 'product/installment',
        component: InstallmentPage
      },
      {
        path: 'payment-schedule/:id',
        name: 'payment-schedule',
        component: PaymentSchedule
      },
      {
        path: 'payment-schedule/payments-more-details',
        name: 'payment-schedule/payments-more-details',
        component: PaymentMoreDetails
      },
      {
        path: 'installment-verification',
        name: 'installment-verification',
        component: InstallmentVerification
      },
      {
        path: 'input-card-number',
        name: 'input-card-number',
        component: InputCardNumber
      },
      {
        path: 'installment/checkout/:installment_id',
        name: 'installment/checkout/product',
        component: InstallmentCheckout
      },
      {
        path: 'installment/checkout/pay/:order_id',
        name: 'installment/checkout/pay',
        component: InstOrderSuccess
      },
      {
        path: 'page/about-company',
        name: 'about-company',
        component: AboutCompany
      },
      {
        path: 'page/eco-friendly',
        name: 'eco-friendly',
        component: EcoFriendly
      },
      {
        path: 'page/usloviya-rassrochki',
        name: 'installment-plan',
        component: InstallmentPlan
      },
      {
        path: 'page/payment-and-delivery',
        name: 'payment-and-delivery',
        component: PaymentDelivery
      },
      {
        path: 'page/policy',
        name: 'policy',
        component: Policy
      },
      {
        path: 'page/public-offer',
        name: 'public-offer',
        component: PublicOffer
      },
      /* Blogs */
      {
        path: 'blog/view/:alias',
        name: 'blog/view',
        component: BlogPage
      },
      /* Order */
      {
        path: 'checkout',
        component: CheckoutPageRoute,
        children: [
          {
            path: '',
            name: 'checkout',
            component: OrderRegistrationPage
          },
          {
            path: 'pay/:order_id',
            name: 'pay',
            component: PaymentLevel,
            props: true
          },
          {
            path: 'success',
            name: 'success',
            component: OrderSuccess,
            props: true
          }
        ]
      },
      {
        path: 'manufacturer/:alias/:category?',
        name: 'manufacturer',
        component: ManufacturerPage
      },
      {
        path: '/',
        name: 'cash'
      },
      {
        path: 'cart',
        name: 'cart',
        component: CartPage
      },
      {
        path: 'reviews/:id',
        name: 'reviews',
        component: ReviewsPage
      }
    ]
  },
  {
    path: '/cabinet',
    component: CabinetPageRoute,
    children: [
      {
        path: '/cabinet',
        name: 'cabinet',
        component: CabinetPage
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfilePage
      },
      {
        path: 'installment/form-step',
        name: 'installment/form-step',
        component: InstallmentProfilePage
      },
      // {
      //   path: 'profile-bonus-account',
      //   name: 'profile-bonus',
      //   component: BonusAccount
      // },
      {
        path: 'profile-bonus',
        name: 'profile-bonus',
        component: BonusAccountPage
      },
      {
        path: 'orders',
        name: 'orders',
        component: Orders
      },
      {
        path: 'orders-history',
        name: 'orders-history',
        component: OrdersHistory
      },
      {
        path: 'address',
        name: 'address',
        component: AddressPage
      },
      {
        path: 'track-order',
        name: 'track-order',
        component: TrackOrderPage
      },
      {
        path: 'help',
        name: 'help',
        component: HelpPage
      },
      {
        path: 'setting',
        name: 'setting',
        component: SettingPage
      },
      {
        path: 'notification',
        name: 'notification',
        component: NotificationsPage
      },
      {
        path: 'compare',
        name: 'compare',
        component: ComparePage
      },
      {
        path: 'compare/:first/:second?/:other?',
        name: 'compare/product',
        component: CompareProductPage
      },
      // {
      //   path: 'bonus-account',
      //   name: 'bonus-account',
      //   component: BonusAccount
      // },
      {
        path: 'favorite',
        name: 'favorite',
        component: FavoritePage
      },
      {
        path: 'feedback',
        name: 'feedback',
        component: FeedbackPage
      }
    ]
  }
]
