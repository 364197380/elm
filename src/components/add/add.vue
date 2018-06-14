<template>
<div class="add">
  <transition name="fade1">
    <div class="left" v-show="goods.count" @click.stop="drecr">-</div>
  </transition>
    <div class="mid" v-show="goods.count">{{goods.count}}</div>
  <div class="right" @click.stop="add">+</div>
</div>
</template>

<style >
  .add{
    display:flex;
  }
  .add .left{
    display:inline-block;
    color:dodgerblue;
    border:2px solid dodgerblue;
    border-radius:50%;
    font-size:24px;
    line-height:16px;
    height:16px;
    width:16px;
    text-align:center;

  }
  .add .mid{
    display:inline-block;
    width:24px;
    height:20px;
    text-align:center;
    color:black;
    line-height:20px;
    font-size:10px;
  }
  .add .right{
    display:inline-block;
    height:20px;
    width:20px;
    color:white;
    background-color:dodgerblue;
    line-height:20px;
    font-size:24px;
    border-radius:50%;
    text-align:center;
  }
  .fade1-enter{
    opacity:0;
    transform-origin:2px 2px;
    transform:rotate(360deg) translateX(44px)
  }
  .fade1-enter-active{
    transition:all 1s;
  }
</style>

<script>
    export default {
        props: {
          goods:{
          }
        },
        data() {
            return {}
        },
       methods: {
         add: function () {
            this.$nextTick(function(){
              if (!this.goods.count) {
                this.$set(this.goods,"count",1)
              }
              else {
                this.$set(this.goods,"count",++this.goods.count)
              }
            })
         },
         drecr:function() {
           this.$nextTick(function () {
             this.$set(this.goods, "count", --this.goods.count)
           })
         }
       },
      watch: {
        c: {
          shu: function (value,oldvalue) {
            console.log(oldvalue)
          },
          deep: true
        }
      }
    }
</script>
