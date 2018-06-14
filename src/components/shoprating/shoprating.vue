<template>
  <div class="rating" v-if="show" v-scroll ref="hhh">
    <div class="header">
      <div class="ava"><img :src="goods.image"/></div>
    </div>
    <div class="title">
      <i class="name">{{ goods.name }}</i>
      <div class="sell">
        <span class="left">月售{{ goods.sellCount }}份</span>
        <span class="right">好评率{{ goods.rating }}%</span>
      </div>
      <div class="price">
        <span class="left">￥{{ goods.price }}</span>
        <span class="right" v-if="goods.oldPrice" >￥{{ goods.oldPrice }}</span>
      </div>
      <div class="addcar" @click="addit" v-show="!goods.count||goods.count===0">加入购物车</div>
      <div class="add" v-show="goods.count>0"><add :goods="goods" ref="add"></add></div>
    </div>
    <div class="desc">
      <div class="tit">商品介绍</div>
      <div v-if="goods.description" class="des">{{goods.description}}</div>
    </div>
    <div class="ra">
      <rating :goods="goods"></rating>
    </div>
  </div>
</template>

<style scoped>
  .rating{
    font-size:0;
    /*overflow:auto;*/
  }
  .rating .header .ava img{
    height:375px;
    width:100%
  }
  .rating .title{
    padding:18px;
    border-bottom:16px solid #f3f5f7;
    background-color:white;
    position: relative;
  }
  .rating .title .name{
    display: block;
    font-size:14px;
    font-weight:700;
    color:rgb(7,17,27);
    line-height:14px;
    margin-bottom: 8px;
  }
  .rating .title .sell{
    margin-bottom:18px;
  }
  .rating .title .sell .left,.rating .title .sell .right{
    font-size:10px;
    color:rgb(147,153,159);
    line-height:10px;
    margin-right:12px;
  }
  .rating .title .price .right,.rating .title .price .left{
    display:inline-block;
    vertical-align: top;
    font-size:14px;
    color:red;
    line-height:14px;
    font-weight:700;
  }
  .rating .title .price .right{
    color:rgb(147,153,159);
  }
  .rating .title .addcar{
    border-radius:24px;
    background-color: dodgerblue;
    width: 62px;
    position: absolute;
    bottom:18px;
    right:18px;
    height:10px;
    font-size:10px;
    color:white;
    line-height:10px;
    padding: 12px;
  }
  .rating .title .add{
    position: absolute;
    bottom:10px;
    right:18px;
  }
  .rating .desc{
    padding: 18px;
    background-color: white;
    border-bottom:16px solid #f3f5f7;
  }
  .rating .desc .tit{
    font-size:14px;
    color: black;
    font-weight:700;
    margin-bottom:8px;
  }
  .rating .desc .des{
    font-size:14px;
    color: rgb(77,85,93);
    font-weight:700;
    line-height:24px;
  }
  .ra{
    padding:18px;
    background-color: white;
  }
</style>

<script>
  import rating from "@/components/ratings/rating"
  import add from "@/components/add/add"
  import Vue from 'vue'
  Vue.directive("scroll",function(el){
    let height=0;
    let star = 0;
    let count = 0;
    let stars = 0,s=0,starx=0;
    console.log(getComputedStyle(el,null).height);
    el.addEventListener("touchstart", function () {
      height=0;
      let child=el.children;
      star=event.touches[0].clientY;
      starx=event.touches[0].clientX;
      for(let index in child){
        if(child[index].nodeType==1) {
            height += parseInt(child[index].clientHeight);
          }
        }
      console.log(height);
      });
      el.addEventListener("touchmove", function () {
        let w=starx-event.touches[0].clientX;
        let h=star-event.touches[0].clientY;
        w= w<0?w*-1:w;     //x轴的滑动值
        h= h<0?h*-1:h;     //y轴的滑动值
        if(w>h){                //如果是在x轴中滑动
          event.preventDefault();
        }
        s=parseInt(event.touches[0].clientY);
        stars = (star - parseInt(event.touches[0].clientY))*3;
        count += stars;
        if (count >= 0) {
          count = 0;
        }
        if (count < -height+parseInt(getComputedStyle(el,null).height)-16) {
          count = -height+parseInt(getComputedStyle(el,null).height)-16;

        }
        console.log(-height+getComputedStyle(el,null).height);
        el.style.transform="translateY(" + count + "px)";
        star=s;
      })
    });
    export default {
        props: {

        },
      components:{
          add:add,
          rating:rating
      },
        data() {
            return {
              show:false,
              goods:{
                type:Object
              }
            }
        },
        methods:{
          showit:function(ini,goods){
            this.show=ini;
            this.goods=goods;
          },
          addit:function(){
            this.$refs.add.add();
          }
        }
    }
</script>
