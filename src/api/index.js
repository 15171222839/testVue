import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = 'http://47.98.106.151:8088/api/'//线上
// axios.defaults.baseURL = 'http://localhost:8081/api/'//本地
//核对用户信息
export const checkUser = params => {
     return axios.get('recovery/checkUserId.do',params).then(res=>res.data)
}
//查询运营商类型
export const  referOperator = () => {
     return axios.get('selectGood/queryType.do').then(res => res.data)
}
//根据运营商跳渲染price
export const  queryOperator = params => {
     return axios.get('selectGood/queryOperator.do', params).then(res => res.data)
}
//立即支付
export const paycode = params => {
     return axios.post('recharge/payCode.do',qs.stringify(params)).then(res=>res.data)
}

