<template>
  <!-- 油卡充值页 -->
  <div class="container-moon">
    <van-collapse v-model="activeNames">
      <van-collapse-item
        title="请选择油卡类型（中石化/中石油）"
        name="1"
      >
        <van-radio-group v-model="ruleForm.operator">
          <van-cell-group>
            <van-cell
              :title="item.operator | filtersOperator"
              clickable
              v-for="(item, index) in operatorType"
              :key="item.operator"
            >
              <van-radio :name="item.operator" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-collapse-item>
    </van-collapse>
    <van-field
      v-model="ruleForm.account"
      placeholder="请输入加油卡号"
    />
    <ul class="box">
      <li
        v-for="(item,index) in allPrice"
        :key="index"
        @click="selectMoney(item.goodName,item.goodId,index, $event)"
        :class="{ liActive : liIndex == index}"
      >
        {{item.price / 100}}元
      </li>
    </ul>
    <!-- 折叠面板 -->
    <van-collapse
      v-model="activeNames"
      class="coll"
    >
      <van-collapse-item
        title="支付方式"
        name="2"
      >
        <ul class="pay-type">
          <li @click="payWay(0)">
            <img
              src="@/assets/images/alipay.png"
              alt=""
            >
            <span>支付宝</span>
          </li>
          <li @click="payWay(1)">
            <img
              src="@/assets/images/coupon.png"
              alt=""
            >
            <span>兑换码</span>
            <span class='num-code'>您有5个兑换码</span>
            <span
              class="input-code"
              @click="exchangeCode"
            >输入兑换码？</span>
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>
    <div>
      <van-field
        v-if="isInput"
        class="remeed"
        v-model="ruleForm.authCode"
        placeholder="请输入兑换码"
      />
    </div>
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
      <van-button
        type="primary"
        @click="submit"
      >立即支付</van-button>
    </div>
    <div class='footer-history'>
      <span>回收记录</span>
      <span>|</span>
      <span>帮助中心</span>
    </div>
  </div>
</template>

<script>
import { Collapse,CollapseItem,Toast } from 'vant';
import { referOperator,queryOperator,paycode } from '../../api';
export default {
  props: {
    allPrice: {
      type: Array,
      required: true
    }
  },
  filters: {
    filtersOperator(val) {
      if(val=='T04') {
        return '中石化'
      } else if(val=='T05') {
        return '中石油'
      }
    }
  },
  watch: {
    'ruleForm.operator': {
      handler(val) {
        queryOperator({
          params: {
            operator: val
          }
        }).then(res => {
          //子组件改变父组件的值
          this.$emit('update:allPrice',res)
        })
      }
    }
  },
  data() {
    return {
      value1: '',
      isInput: false,   //输入兑换码input框显示隐藏
      isSelect: true,     //是否同意按钮
      checked: true,   //阅读是否同意
      value: '',  //加油卡号
      radio: 0,   //选择油卡类型
      operatorType: [],   //运营商类型
      active: '',
      activeNames: ['1'],
      numList: [100,200,300,400],
      show: false,

      options: [{
        value: '选项1',
        label: '中石化'
      },{
        value: '选项2',
        label: '中石油'
      }
      ],
      value: '',


      option: [{
        value: '选项1',
        label: '支付宝'
      },{
        value: '选项2',
        label: '兑换码'
      }
      ],
      value: '',
      liIndex: null,   //控制选中的样式
      ruleForm: {
        payType: '',  //支付方式
        operator: '', //运营商
        account: '',  //加油卡号
        totalAmount: '',  //选中的price
        authCode: '',     //兑换码
        goodName: '',     //商品名称
        userId: '',
        custId: '',
        goodId: '',
      }
    }
  },
  methods: {
    onclick() {
      this.show=true
    },
    //选择money
    selectMoney(goodName,goodId,index,event) {
      this.ruleForm.goodName=goodName
      this.ruleForm.goodId=goodId
      if(this.ruleForm.operator) {
        this.liIndex=index
      } else {
        Toast('请选择油卡类型')
      }
      this.ruleForm.totalAmount=parseInt(event.target.innerText)
    },
    //是否同意阅读
    isArgee(index) {
      index==1? this.isSelect=false:this.isSelect=true
    },
    //点击兑换码，让input框显示
    exchangeCode() {
      this.isInput=true
    },
    //选中支付方式
    payWay(index) {
      this.ruleForm.payType=index
    },
    //立即支付
    submit() {
      console.log(this.ruleForm,'fd')
      if(!this.ruleForm.operator) {
        Toast('请选择运营商')
        return false
      }
      if(!this.ruleForm.account) {
        Toast('请输入加油卡号')
        return false
      }
      if(!this.ruleForm.totalAmount) {
        Toast('请选择价格')
        return false
      }
      if(typeof (this.ruleForm.payType)!='number') {
        Toast('请选择支付类型')
        return false
      } else if(this.ruleForm.payType==1) {
        if(!this.ruleForm.authCode) {
          Toast('请选择兑换码')
          return false
        }
      }
      if(this.isSelect==1) {
        Toast('请阅读并同意用户充值协议')
        return false
      }
      paycode(this.ruleForm).then(res => {
        console.log(res,'res')
      })
    }
  },

  created() {
    let [userId,custId]=[1,2]
    this.ruleForm.userId=userId
    this.ruleForm.custId=custId
    referOperator().then(res => {
      this.operatorType=res
    })
  },
}
</script>

<style lang="less" scoped>
.container-.moon {
  width: 100%;
}
.box {
  padding: 0 0.2rem;
  box-sizing: border-box;
  display: flex;
  margin: 10px auto;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  box-sizing: border-box;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    width: 2.6rem;
    height: 1rem;
    color: black;
    margin: 0 0.2rem;
    font-size: 0.32rem;
    border-radius: 5px;
    text-align: center;
    line-height: 1rem;

    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #fff;
    border: 2px solid #09b90b;
  }
}
.pay-type {
  width: 100%;
  li {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    &:last-child {
      border-top: 1px solid #e5e5e5;
    }
    img {
      width: 0.5rem;
      vertical-align: middle;
    }
    .num-code {
      padding-left: 0.4rem;
    }
    .input-code {
      float: right;
      color: #e92322;
    }
  }
}
.remeed {
  margin-top: 4px;
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
/deep/ .coll {
  .van-collapse-item__content {
    padding: 0 0.5rem;
  }
}
/deep/ .van-cell {
  margin-top: 2px;
}
</style>
