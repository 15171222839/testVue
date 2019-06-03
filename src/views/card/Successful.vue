<template>
  <div class="money">
    <div class="money-box">
      <div class="money-box-img"><img src="../../assets/images/dispose.png"></div>
      <div class="money-txt">
        <div class="money-txt-o">发起支付申请</div>
        <div class="money-txt-t">通道处理中</div>
        <div class="money-txt-f">预计05-15 14：51提前到账</div>
      </div>
    </div>
    <div class="money-box">
      <div class="money:after">

      </div>
      <div class="money:before"></div>
    </div>

  </div>

</template>

<script>
/* 接口返回一个参数
    ststus 0/1 如果为0那么到账成功，如果为1那么失败...
*/

</script>

<style lang="less">
.money {
  font-size: 0.28rem;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.money-box {
  display: flex;
  margin: 0 0.8rem;
  // position:relative;
}
.money-box-img {
  width: 0.6rem;
  img {
    width: 0.6rem;
    height: 2rem;
    margin-top: 0.14rem;
  }
}
.money-txt {
  padding-top: 0.5rem;
  margin-left: 0.6rem;
}
.money-txt-o,
.money-txt-t {
  font-weight: bold;
}
.money-txt-t {
  margin-top: 0.5rem;
}
.money-txt-f {
  color: rgba(177, 177, 177, 1);
}
.money:after {
  content: "";
  width: 0.01rem;
  height: 1rem;
  border-right: 0.01rem solid #999;
  position: absolute;
  left: 1.1rem;
  top: 2.9rem;
}
.money:before {
  content: "";
  position: absolute;
  left: 1.04rem;
  top: 3.9rem;
  border-radius: 50%;
  background: #999;
  width: 8px;
  height: 8px;
}
</style>

