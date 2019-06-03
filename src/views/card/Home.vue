<template>
  <div class="container">
    <ul class="title-toggle">
      <li
        @click="toggleLi(1)"
        :class="{active: currentView == 'recharge'}"
      >油卡充值</li>

      <li
        @click="toggleLi(2)"
        :class="{active: currentView == 'recycle'}"
      >油卡回收</li>
    </ul>
    <keep-alive>
      <component
        :is="currentView"
        :allPrice.sync="allPrice"
        :allNumPrice="allNumPrice"
        :count="count"
      ></component>
    </keep-alive>
  </div>
</template>
<script>
import recharge from './Recharge.vue'
import recycle from './Recycle.vue'
import successful from './Successful.vue'
import { checkUser } from '../../api'
export default {
  components: {
    recharge,
    recycle,
    successful
  },
  data() {
    return {
      currentView: '',  //目前所在组件
      allPrice: [],     //给油卡充值组件的价格
      allNumPrice: [],  //给油卡回收组件的价格
      count: 0
    }
  },
  methods: {
    //此方法用于切换组件
    toggleLi(value) {
      value==1? this.currentView='recharge':this.currentView='recycle'
    }
  },
  created() {
    // //获取url地址的参数
    //  let { userId, custId } = this.$route.query
    let [userId,custId]=[1,2]
    checkUser({
      params: {
        userId,
        custId
      }
    }).then(res => {
      if(res.count) {
        this.count=res.count
      }
      this.allPrice=res.price
      this.allNumPrice=res.price
      if(res.code==0) {
        this.currentView='recycle'
      } else if(res.code==100) {
        this.currentView='recharge'
      }
    })
  },
}
</script>
<style scoped>
.container {
  width: 100%;
}
.title-toggle {
  width: 100%;
  height: 0.8rem;
  display: flex;
}
.title-toggle li {
  width: 50%;
  height: 100%;
  text-align: center;
  font-size: 0.32rem;
  line-height: 0.8rem;
}
.active {
  color: #4258f3;
  font-weight: bold;
  border-bottom: 2px solid #4258f3;
}
</style>
