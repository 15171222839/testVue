<template>
  <!-- 油卡回收页 -->
  <div class="container-detail">
    <h2>您有{{ count }}个兑换码可兑换以下面值</h2>
    <ul class="box">
      <li
        v-for="(item,index) in  allNumPrice"
        :key="index"
        :class="{ liActive : liIndex == index}"
        @click="selectMoney(index)"
      >
        <div :class="{'no-backPrice': !item.goodId ? true : false}">{{ item.price / 100 }}元</div>
        <span v-if="item.goodId">
          ￥{{item.backPrice}}
        </span>
      </li>
    </ul>
    <!-- 输入支付宝账号 -->
    <van-cell-group>
      <van-field
        v-model="value"
        placeholder="请输入您的支付宝账号，极速到账"
      />
    </van-cell-group>
    <!-- 阅读协议 -->
    <div class="is-read-agreen">
      <img
        src="../../assets/images/noselected.png"
        alt=""
        v-if="isSelect"
        @click="isArgee(1)"
      >
      <img
        v-else
        src="../../assets/images/selected.png"
        alt=""
        @click="isArgee(2)"
      >
      <span class="read-display">
        我已阅读并同意此<span>
          <<用户充值协议>>
        </span>
      </span>
    </div>
    <div class="at-once">
      <van-button type="primary">立即兑换</van-button>
    </div>
    <div class='footer-history'>
      <span>回收记录</span>
      <span>|</span>
      <span>帮助中心</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    allNumPrice: {
      type: Array,
      required: true
    },
    count: {
      type: Number
    }
  },
  data() {
    return {
      active: '',
      value: '',     //支付宝账号
      liIndex: 0,   //控制选中的样式
      isSelect: true,     //是否同意按钮
      numList: []
    }
  },
  methods: {
    selectMoney(index) {
      this.liIndex=index
    },
    submit() {
      if(this.isSelect==1) {
        Toast('请阅读并同意用户充值协议')
        return false
      }
    },
    //是否同意阅读
    isArgee(index) {
      index==1? this.isSelect=false:this.isSelect=true
    },
  },
}
</script> 
<style lang="less" scoped>
.container-detail {
  width: 100%;
  h2 {
    font-size: 0.4rem;
    margin-left: 0.6rem;
  }
  .box {
    padding: 0 0.2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    box-sizing: border-box;
    li {
      width: 2.6rem;
      height: 1rem;
      color: black;
      margin: 0 0.2rem;
      font-size: 0.32rem;
      border-radius: 5px;
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
      // margin: 10px auto;
      background-color: #fff;
      border: 2px solid #09b90b;
      div {
        margin-top: 0.04rem;
      }
    }
  }
  .is-read-agreen {
    width: 100%;
    height: 0.8rem;
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
    box-sizing: border-box;
    img {
      width: 0.4rem;
      height: 0.4rem;
      vertical-align: middle;
      margin-right: 0.1rem;
    }
    .read-display {
      font-size: 0.26rem;
      span {
        color: blue;
      }
    }
  }
  .at-once {
    width: 100%;
    display: flex;
    margin-top: 0.1rem;
    justify-content: center;
    .van-button {
      width: 80%;
    }
  }
  .footer-history {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 0.3rem;
    margin-top: 0.3rem;
    span:nth-child(2) {
      margin: 0 0.2rem;
    }
  }
  .liActive {
    background: #09b90b !important;
    color: #fff !important;
  }
}
.no-backPrice {
  line-height: 1rem;
}
</style>