<template>
  <div class="rating" v-show="goods">
    <div class="titl">商品评价</div>
    <div class="rathead">
      <div class="left" @click="choosed(-1)">全部 {{ count[0] }}</div>
      <div class="center" @click="choosed(0)">推荐 {{ count[1] }}</div>
      <div class="right" @click="choosed(1)">吐槽 {{ count[2] }}</div>
    </div>
    <div class="only">
      <span class="icon-check_circle"></span>
      <span class="onlycontent">只看有内容的评价</span>
    </div>
    <div class="ratings">
      <ul>
        <li v-for="item in select">
          <div class="top">
            <div class="time"></div>
            <div class="user">
              <div class="name">{{ item.username }}</div>
              <div class="use"><img :src="item.avatar"/></div>
            </div>
          </div>
          <div class="content">
            <span class="left"></span>
            <div class="right" v-show="item.text">{{ item.text }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
  .rating{
    background-color: white;
  }
  .rating .titl{
    font-size: 14px;
    color:black;
    margin-bottom:18px;
    font-weight:700;
  }
  .rathead{
    border-bottom:1px solid rgba(7,17,27,.1);
  }
  .rathead .right,.rathead .center,.rathead .left{
    vertical-align:top;
    display: inline-block;
    font-size:12px;
    line-height:16px;
    margin-right:8px;
    padding:8px;
    color:rgb(77,85,93);
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    margin-bottom:18px;
  }
  .rathead .left,.rathead .center{
    background-color: #baeeff;
  }
  .rathead .right{
    background-color: rgba(77,85,93,.2);
  }
  .icon-check_circle{
    font-size: 24px;
  }
  .rating .only{
    border-bottom:1px solid rgba(7,17,27,.1);
    padding:12px 0;
  }
  .rating .only .onlycontent{
    display:inline-block;
    font-size: 14px;
    color:rgb(147,153,159);
    line-height:24px;
  }
  .rating .ratings li{
    padding:16px 0;
    border-bottom:1px solid rgba(7,17,27,.1);
  }
  .rating .ratings .content .right{
    font-size: 10px;
    color:black;
    line-height:12px;
  }
  .rating .ratings .top{
    padding-bottom:6px;
    position:relative;
  }
  .rating .ratings .top .user{
    position:absolute;
    right: 18px;
    bottom: 6px;
  }
  .rating .ratings .top .user .name{
    display:inline-block;
    font-size:10px;
    color:rgb(147,153,159);
    line-height:12px;
    margin-right: 6px;
  }
  .rating .ratings .top .user .use{
    display:inline-block;
  }
  .rating .ratings .top .user .use img{
    width: 12px;
    height: 12px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
</style>

<script>

    export default {
        props: {
          goods:{
            type:Object
          }
        },
        data() {
            return {
              only:false,
              choose:-1,
              f:0,
              s:1,
              t:2
            }
        },
      methods:{
          choosed:function(ind){
            this.choose=ind;
          }
      },
      computed:{
          select:function(){
            let arr=[];
            if(this.choose==-1){
              arr=this.goods.ratings;
              return arr;
            }
            for(let i=0;i<this.goods.ratings.length;i++){
              if(this.goods.ratings[i].rateType==this.choose){
                arr.push(this.goods.ratings[i]);
              }
            }
            return arr;
         },
         count:function(){
            let arr=[];
            let totall=0;
            for(let j=0;j<2;j++) {
              let count=0;
              for (let i = 0; i < this.goods.ratings.length; i++) {
                if (this.goods.ratings[i].rateType == j) {
                  count++;
                }
                totall++;
              }
              if(j==0){
                arr.push(totall);
              }
              arr.push(count)
            }

            return arr;
         }
      }
    }
</script>
