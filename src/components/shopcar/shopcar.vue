<template>
  <div class="hh">
    <div class="shop">
      <div class="shop-main" @click="showit">
        <div class="shop-left">
          <span class="car">{{count}}</span>
          <span class="price">￥0</span>
        </div>
        <div class="shop-mid">
          \ddfgd
        </div>
        <div class="shop-right">
            faga
        </div>
      </div>
    </div>
    <transition name="move" >
      <div class="shopcar" v-show="show">
        <div class="header">
          <span class="left">购物车</span>
          <span class="right" @click="close">清空</span>
        </div>
        <div class="content">
          <ul class="max">
            <li v-for="item in selectgoods" class="food" ref="li">
              <span>{{ item.name }}</span>
              <span class="price">￥{{ item.count*item.price }}</span>
              <span class="add1">
                  <add :goods="item"></add>
                </span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<style >
  .hh{
    width:100%;
  }
  .shop{
    position:fixed;
    bottom:0;
    width:100%;
    height:52px;
    background-color:#141d27;
    font-size:0;
    z-index:100;
  }
  .shop .shop-main{
    display:flex;
    color:rgba(255,255,255,.4);
  }
  .shop .shop-main .shop-left{
    height:52px;
    margin-left:12px;
  }
  .shop .shop-main .shop-left .car{
    display:inline-block;
    vertical-align: top;
    height:48px;
    border-radius:50%;
    width:48px;
    font-size:12px;
    margin-top:-4px;
    background-color:rgba(255,255,255,.8);
    text-align:center;
    color:black;
    line-height:42px;
  }
  .shop .shop-main .shop-left .price{
    vertical-align: top;
    display:inline-block;
    margin:0 12px;
    height:52px;
    font-size:20px;
    font-weight:700;
    line-height:52px;
  }
  .shop .shop-main .shop-mid{
    display:inline-block;
    flex:1;
    font-size:16px;
    line-height: 52px;
    padding:0 12px;
    border-left:1px solid rgba(255,255,255,.1);
  }
  .shop .shop-main .shop-right{
    display:inline-block;
    width:105px;
    box-sizing: border-box;
    padding:0 8px;
    font-size:20px;
    font-weight:700;
    line-height:52px;
    text-align:center;
    background-color: rgba(255,255,255,.1);
  }
  .shopcar{
    width:100%;
    position:fixed;
    left:0;
    font-size:0;
    bottom:52px;
    overflow:hidden;
    z-index:99;
  }
  .shopcar .header{
    height: 38px;
    position: relative;
    background-color:#f3f5f7;
    font-weight:200;
    line-height: 40;
    z-index:1000;
    border-bottom:2px solid rgba(7,17,27,.1)
  }
  .shopcar .header .left{
    font-size:14px;
    height:100%;
    color:black;
    position:absolute;
    left:18px;
    top:0;
    line-height:40px;
  }

  .shopcar .header .right{
    font-size:14px;
    height:100%;
    color:rgb(0,160,220);
    position:absolute;
    right: 18px;
    line-height:40px;
  }
  .shopcar .content{
    padding:0 18px;
    background:white;
  }
  .shopcar .content .max{
    max-height:200px;
  }
  .shopcar .content .food{
    position: relative;
    height:47px;
    line-height: 48px;
    font-size:15px;
    color:rgb(7,17,27);
    border-bottom:1px solid rgba(7,17,27,.1)
  }
  .shopcar .content .food .price{
    color:red;
    font-size: 10px;
    font-weight:700;
    position:absolute;
    right: 90px;
  }
  .shopcar .content .food .add1{
    height:47px;
    position: absolute;
    right: 10px;
    padding:16px 0;
  }
  .move-enter,.move-leave-active{
    bottom:-170px;
    transition:all .5s;
  }
  .move-enter-active{
    transition:all .5s;
  }
  .back{
    position:absolute;
    height:100%;
    width:100%;
    background:rgba(7,17,27,0.6);
    filter: blur(10px);
  }
</style>
<script>
  import add from "@/components/add/add"
    export default {
        props:{
          goods: {
            type: Array
          }
        },
        data() {
            return {
              selectgoods:[],
              show:false
            }
        },
      components:{
          add:add
      },
      methods: {
        showit: function () {
          console.log("clice");
          if (this.selectgoods.length) {
            this.show = !this.show;
            return;
          }
          if(!this.selectgoods.length){
            this.show=false;
          }
        },
        close:function(){
          for(let i=0;i<this.goods.length;i++) {
            for (let j = 0; j < this.goods[i].foods.length; j++) {
              if (!!this.goods[i].foods[j].count) {
                this.goods[i].foods[j].count = 0;
              }
            }
          }
        }
      },
      computed:{
        count:function(){
            let count=0;
            let k=0;
            this.selectgoods=[];
//            console.log(this.goods[0].foods[1].count);
             for(let i=0;i<this.goods.length;i++){
               for(let j=0;j<this.goods[i].foods.length;j++){
                 if(!!this.goods[i].foods[j].count) {
                   count += this.goods[i].foods[j].count;
                 }
                 if(this.goods[i].foods[j].count>0){
                   this.selectgoods[k]=this.goods[i].foods[j];
                   k++;
                 }
             }
          }
            return count
          }
        }
    }
</script>
