<template>
  <div class="star">
    <ul class="clearfix">
      <li v-for="item in star" :class="item"></li>
    </ul>
  </div>
</template>

<style >
  ul{
    overflow:hidden;
  }
  .star li{
    width: 24px;
    height: 24px;
    margin:0 5px;
    display:inline-block;
    font-size:0;
  }
  .a{
    background-image:url('star24_on@2x.png');
    background-repeat:no-repeat;
  }
  .b{
    background-image:url('star24_half@2x.png');
    background-repeat:no-repeat;
  }
  .c{
    background-image:url('star24_off@2x.png');
    background-repeat:no-repeat;
  }
</style>

<script>
    export default {
      name:'star',
      props: {
        score:{
          type:Number
        }
      },
      data() {
        return {
        }
      },
      computed:{
        star:function(){
          let len=5;
          let star=[];
          let count=Math.floor(this.score);
          for(let i=0;i<count;i++){
            star.push('a');
          }
          if(count!=this.score){
            star.push('b');
            count++;
          }
          for(let i=0;i<(len-count);i++){
            star.push('c');
          }
          return star;
        }
      }
    }
</script>
