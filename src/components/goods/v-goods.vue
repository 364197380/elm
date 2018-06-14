<template>
  <div class="hha" v-if="goods">
    <div class="goods" >
      <div class="meus-main">
        <ul>
          <li v-for="(item,index) in goods" class="text" @click="scroll1(index)">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="food-main">
        <ul ref="li" >
          <li v-for="item in goods" ref="lig">
            <h1 class="title">{{ item.name }}</h1>
            <ul >
              <li v-for="items in item.foods " class="food" @click="show(items)" >
                <div class="icon">
                  <img :src="items.image" />
                </div>
                <div class=foods>
                  <h1 class="name">{{ items.name }}</h1>
                  <p class="des" v-if="items.description">{{ items.description }}</p>
                  <div class="extra">
                    <span class="left">月售{{ items.sellCount }}份</span>
                    <span class="right" >好评率{{ items.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="left">￥{{ items.price }}</span>
                    <span class="right" v-if="items.oldPrice" >￥{{ items.oldPrice }}</span>
                  </div>
                  <div class="add">
                    <add :goods="items"></add>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <shopcar :goods="goods" class="shop-m"></shopcar>
    <shoprating :goods="goods" class="shoprating" ref="rating"></shoprating>
  </div>
</template>

<style >
  .hha{
    width:100%;
    height:100%;
  }
  .goods{
    display:flex;
    position:absolute;
    top: 174px;
    width:100%;
    bottom: 46px;
    overflow:hidden;
    z-index:-1;
  }
  .goods .meus-main{
    width:80px;
    background-color:#f3f5f7;
    overflow:auto;
  }
  .goods .meus-main ul{
    display:flex;
    flex-direction:column;
  }
  .goods .meus-main ul li{
    border-bottom:1px solid rgba(7,17,27,.1);
    flex: 1;
  }
  .goods .meus-main .text{
    display: block;
    width: 56px;
    padding:15px 12px;
    font-size:12px;
    font-weight:100;
    line-height:14px;
    color:black;
  }
  .goods .food-main .title{
    display: block;
    font-size: 12px;
    color:rgb(147,153,259);
    line-height: 26px;
    height: 26px;
    background-color:#f3f5f7;
    border-left:2px solid #d9dde1;
    padding-left: 12px;
  }
  .goods .food-main{
    flex:1;
    font-size:0;
    /*overflow: auto;*/
  }
  .goods .food-main .food{
    position:relative ;
  }
  .goods .food-main .icon{
    display:inline-block;
    vertical-align:top;
  }
  .goods .food-main .food{
    margin:18px;
    display: flex;
  }
  .goods .food-main .icon img{
    width: 70px;
    height: 70px;
  }
  .goods .food-main .foods{
    display:inline-block;
    padding-top:2px;
    margin-left: 10px;
    flex:1;
  }
  .goods .food-main .foods .name{
    font-size: 14px;
    color:rgb(7,17,27);
    margin-bottom:8px;
    line-height:14px;
  }
  .goods .food-main .foods .des,.goods .food-main .foods .extra{
    font-size: 10px;
    color:rgb(147,153,159);
    line-height: 10px;
    margin-bottom: 8px;
  }
  .goods .food-main .foods .extra{
    marign-bottom:0;
  }
  .goods .food-main .foods .price .left{
    vertical-align: top;
    font-size:14px;
    color:rgb(147,153,159);
    font-weight:700;
    line-height:24px;
  }
  .goods .food-main .foods .price .right{
    margin-left:8px;
    font-size: 10px;
    color:rgb(147,153,159);
    font-weight:700;
    line-height:20px;
  }
 .shop-m{
    position:fixed;
    left:0;
    bottom:0;
    z-index:100;
  }
  .goods .food-main .foods .add{
    position:absolute;
    right:0;
    bottom:3px;
  }
  .shoprating{
    position:fixed;
    width:100%;
    top:0;
    left:0;
    bottom:48px;
    z-index:98;
  }
</style>

<script>
  import axios from 'axios'
  import shopcar from "@/components/shopcar/shopcar"
  import add from "@/components/add/add"
  import shoprating from "@/components/shoprating/shoprating"

    export default {
      data() {
        return {
          goods: false,
          heightw: [0],
          shop: [],
        }
      },
      components: {
        shopcar: shopcar,
        add: add,
        shoprating:shoprating
      },
      created() {
        axios.get('static/data.json').then(response => {
          this.goods = response.data.goods;
        }).catch(error => {
          console.log(error);
        });
        let that = this;
        let count = 0;
        setTimeout(function () {
          that.li = that.$refs.li;
          let h = that.$refs.lig;
          for (let i = 0; i < h.length; i++) {
            count += parseInt(getComputedStyle(h[i], null).height) + 18;
            that.heightw.push(count);
          }
          that.touch1(that.li);
        }, 500)
      },
      methods: {
        scroll1: function (index) {
          this.li.style.transform = "translateY(" + (-this.heightw[index]) + "px)";
          this.li.style.transition = "all 1s";
        },
        touch1: function (ele) {
          let that = this;
          let star = 0;
          let count = 0;
          let stars = 0,s=0,starx=0;
          ele.addEventListener("touchstart", function () {
            star=event.touches[0].clientY;
            starx=event.touches[0].clientX;
          });
          ele.addEventListener("touchmove", function () {
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
            if (count < -that.heightw[8] - 200) {
              count = -that.heightw[8] - 200;
            }
            ele.style.transform = "translateY(" + count + "px)";
            star=s;
          })
        },
        show:function(goods){
          this.$refs.rating.showit(true,goods);
        }
      }
    }
//      computed:{
//          hh:function(){
//            this.$refs.shop.gai(this.goods[0].foods[0].count)
//          }
//      }
//    }
</script>
