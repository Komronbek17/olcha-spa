
import Api from '~/api/core/Api'
class Checkout extends Api {
  static async VerificationCoupon (couponCode) {
    let err = false
    const res = await super.post('order/coupon', { coupon: couponCode })
      .then(respData => respData.data)
      .catch(() => { err = true })
    let data
    if (!err) {
      data = res.data
    } else {
      data = 400
    }

    return data
  }

  static async SendSmsCode (phone) {
    const res = await super.post('order/sendsms', { phone })
      .then(respData => respData)
      .catch((err) => {
        /* eslint-disable */
        console.log(err);
      })
      /* eslint-disable */
      console.log(res); 
    return res.data
  }

  static async CheckSmsCode (phone, code) {
    let res = await super.post('order/checksms', { phone, code })
      .then(respData => respData)
      .catch(err => err )
      
      if(!res){
        res = {
          data : {
            status:"error",
            message: "Телефон должен вводиться в формате - 998711234567"
          }
        }
      }
      
      return res.data
  }

  static async GetRegions () {
    return await super.get('order/districts')
  }
  
  static async GetPickupPointRegions(){
    return await super.get('checkout/pickup-regions')
  }

  static async GetDistrict (id) {
    const res = await super.get(`order/districts?region_id=${id}`)
    const { districts } = res.data.data
    return districts
  }

  static async GetPaymentTypes (regionId) {
    return await super.get(`checkout/payment-types/${regionId}`)
  }

  static async GetDeliveryType (districtId = 11, products) {
    return await super.get(`checkout/deliveries/${districtId}`, { params: { products } })
  }
  
  static async CreateNewOrder(data){
    return await super.post('order/checkout', data )
  }
  
  static async PaymentRequest(productId){
    return await super.get(`payment/request/${productId}`)
  }
  
  static async DeliverHistoryAddress(){
    return await super.get('user/address')
  }
  
  static async GetUserBonus () {
    return await super.get('user/bonus')
  }
}

export default Checkout
