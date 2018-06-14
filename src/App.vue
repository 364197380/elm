<template>
  <div id="app">
    <div>
      <hheader :seller="seller"></hheader>
    </div>
    <div class="tab">
      <div class="tab-item"><router-link to="/">商品</router-link></div>
      <div class="tab-item"><router-link :to="{name:'ratings',params:{rating:ratings,seller:seller}}">评价</router-link></div>
      <div class="tab-item"><router-link to="/setter">商家</router-link></div>
    </div>
    <div class="view"><router-view/></div>

  </div>
</template>

<script>
  import axios from 'axios'
  import header from '@/components/header/v-header'

export default {
    data() {
      return {
        seller: {},
        goods: [],
        ratings: [],
        select:{
          data:1
        }
      }
    },
  name: 'app',
  components: {
    hheader: header
  },
  created: function () {
    axios.get('static/data.json').then(response => {
      this.seller=response.data.seller;
      this.goods=response.data.goods;
      this.ratings=response.data.ratings;
      console.log(this.ratings);
      console.log(this.seller);
    }).catch(error => {
      console.log(error);
      alert('网络错误，不能访问');
    })
  }
  }

</script>

<style>
  #app{
    width:100%;
  }
#app .tab{
  display:flex;
  height:40px;
  width:100%;
  flex-direction:row;
  border-bottom:1px solid rgba(7,17,27,.1);
}
#app .tab .tab-item{
  font-size:14px;
  line-height:40px;
  color:rgb(77,85,93);
  text-align:center;
  flex:1;
}
</style>
