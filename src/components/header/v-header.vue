<template>
  <div class="header">
    <div v-if="seller" class="sell">
      <div class="content-main">
        <div class="ava">
          <img :src="seller.avatar" >
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">
              {{seller.name}}
            </span>
          </div>
          <div class="desc">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div class="supp" v-if="seller.supports">
            <span class="icon"></span>
            <div class="text">
              {{ seller.supports[0].description }}
            </div>
          </div>
          <div class="scount" v-if="seller.supports" @click="close" ref="ha-ha">
            <span class="count">{{ seller.supports.length }}个</span>
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
      </div>
      <div class="background">
        <img :src="seller.avatar" />
      </div>
      <div class="bull">
        <span class="bull-title"></span>
        <span class="bull-text">{{seller.bulletin}}</span>
      </div>
      <transition name="fade">
      <div class="spe" v-if="istrue1" >
        <div class="spes">
          <div class="s-title">
            <div class="name">
                {{ seller.name }}
            </div>
          </div>
         <div class="clearfix">
           <stars :score="seller.score" class="star"></stars>
         </div>
          <div class="you">
            <div class="you-line"></div>
            <div class="you-text">优惠信息</div>
            <div class="you-line"></div>
          </div>
          <div class="supp">
            <ul>
              <li v-for="item in seller.supports">
                <span :class="sup[item.type]" class="icon"></span>
                <div class="text">
                  {{item.description}}
                </div>
              </li>
            </ul>
          </div>
          <div class="you">
            <div class="you-line"></div>
            <div class="you-text">商家公告</div>
            <div class="you-line"></div>
          </div>
          <div class="dis">
            <div class="text">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="close" @click="close">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
  .header{
    background-color:rgba(7,17,27,0.5);
    font-size:0;
    color:#fff;
    position:relative;
  }
  .header .content-main {
    padding:24px 12px 18px 24px;
  }
  .header .content-main .ava{
    vertical-align: top;
    display:inline-block;
    border-radius:2px;
    margin-right:16px;
  }
  .header .content-main .ava img{
    height:64px;
    width:64px;
  }
  .header .content-main .content{
    display: inline-block;
  }
  .header .content-main .content .title{
    margin:2px 0 8px 0;
  }
  .header .content-main .content .title .brand{
    display:inline-block;
    vertical-align:top;
    width:30px;
    height:18px;
    background-image:url('brand@2x.png');
    background-size:30px 18px;
    margin-right:5px;
  }
  .header .content-main .content .title .name{
    font-size:16px;
    line-height:16px;
    color:white;
    font-weight:bold;
  }
  .header .content-main .content .desc{
    margin-bottom:10px;
    font-size:12px;
    line-height:12px;
    font-weight:200;
    color:white;
  }
  .header .content-main .content .supp .icon{
    display:inline-block;
    vertical-align: bottom;
    width:12px;
    height:12px;
    margin-right:4px;
    background-size:12px 12px;
    background-image:url('decrease_3@2x.png');
  }
  .header .content-main .content .supp .text{
    display:inline-block;
    font-size:12px;
    line-height:12px;
  }
  .header .scount{
    position:absolute;
    right:12px;
    bottom:18px;
    font-size:12px;
    color:white;
    font-weight:200;
    line-height:24px;
    padding:0 8px;
    height:24px;
    border-radius:14px;
    background-color:rgba(0,0,0,.2);
    margin-bottom:25px;
  }
  .header .scount .icon-arrow_lift{
    font-size:12px;
  }
  .header .bull{
    height:28px;
    padding:0 22px 0 12px;
    line-height:28px;
    font-size:10px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    background-color:rgba(7,14,27,.2)
  }
  .header .bull .bull-title{
    display:inline-block;
    vertical-align:top;
    width:22px;
    height:12px;
    background-image:url("bulletin@2x.png");
    background-size:22px 12px;
    background-repeat:no-repeat;
    margin-top:8px;
  }
  .header .bull .bull-text{
    vertical-align:top;
    font-size:10px;
    margin:0 4px;
  }
  .header .spe{
    position:fixed;
    left:0;
    top:0;
    height:100%;
    font-size:0;
    overflow:auto;
    background:rgba(7,17,27,.8);
  }
  .fade-enter{
    opacity: 0;
  }
  .fade-leave{
    opacity:1;
  }
  .fade-enter-active {
    transition: opacity .5s
  }
  .fade-leave-active{
    opacity: 0;
    transition: opacity .5s;
  }
  .header .spe .s-title{
    width:100%;
    margin-bottom:16px;
  }
  .header .spe .spes{

    margin-top:64px;
    padding:0 36px;
    min-height:100%;
    padding-bottom:64px;
  }
  .header .spe .s-title .name{
    font-size:16px;
    font-weight:700;
    color:white;
    line-height:32px;
    text-align:center;
  }
  .header .spe .you{
    font-size:0;
    display:flex;
    margin-bottom:24px;
  }
  .header .spe .you .you-line{
    height:6px;
    border-bottom: 2px solid rgba(255,255,255,0.2);
    flex:1;
  }
  .header .spe .you .you-text{
    margin:0 12px;
    font-size:12px;
    font-weight:700;
  }
  .header .spe .supp{
    margin-bottom:28px;
  }
  .header .spe .supp .icon{
    display:inline-block;
    vertical-align: top;
    width:16px;
    height:16px;
    margin-right:4px;
    background-size:16px 16px;
  }
  .header .spe .supp .text{
    display:inline-block;
    font-size:12px;
    line-height:12px;
    font-weight:200;
    color:white;
  }
  .header .spe .supp li{
    margin-bottom:12px;
  }
  .header .spe .supp .a{
    background-image:url('decrease_3@2x.png');
  }
  .header .spe .supp .b{
    background-image:url('discount_1@2x.png');
  }
  .header .spe .supp .c{
    background-image:url('special_1@2x.png');
  }
  .header .spe .supp .d{
    background-image:url('invoice_1@2x.png');
  }
  .header .spe .supp .e{
    background-image:url('decrease_3@2x.png');
  }
  .header .spe .dis{
    margin-top:24px;
  }
  .header .spe .dis .text{
    padding:0 12px;
    font-size:12px;
    font-weight:200;
    color:rgb(255,255,255);
    line-height:24px;
  }
  .header .spe .close{
    position: relative;
    margin:-64px auto 0 auto;
    height: 32px;
    width: 32px;
    background-color:rgba(255,255,255,.5);
  }
  .header .spe .close .icon-arrow_lift{
    font-size: 32px;
    height: 32px;
    width: 32px;
    line-height:32px;
  }
  /*.clearfix:after{*/
    /*clear:both;*/
  /*}*/
  /*.clearfix:before{*/
    /*clear:both;*/
  /*}*/
  .header .spe .clearfix{
    margin-bottom: 18px;
    text-align:center;
  }
  .header .background{
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
    z-index:-1;
    filter:blur(10px);
  }
  .header .background img{
    width:100%;
    height: 100%;
  }
</style>

<script>
  import star from '@/components/star/star'
    export default {
      data() {
        return {
          istrue1:false,
          sup:["a","b","c","d","c"],
        }
      },
      props: {
        seller:{ type:Object}
      },
      created:function(){
//        this.$nextTick(function() {
//          console.log(this.$refs["ha-ha"]);
//        })
        let h=this;
        setTimeout(function(){
          h.haha=h.$refs["ha-ha"];
        },1000)


      },
      methods:{
        close:function(){
          this.istrue1= !this.istrue1;
        }
      },
      components:{
        stars: star
      }
    }
</script>
