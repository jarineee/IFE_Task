<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <v-content :seller="seller"></v-content>
    <v-cart :seller="seller"></v-cart>
  </div>
</template>

<script>
// import Vue from 'vue'
import vContent from '@/components/content/content'
import vHeader from '@/components/header/header'
// import VueResource from 'vue-resource'
import vCart from '@/components/cart/shoppingCart'
import { parseUrlQuery } from '@/assets/js/utils'
import data from './../data.json'

// Vue.use(VueResource)
// const ERR_OK = 0

export default {
  name: 'app',
  data () {
    return {
      seller: {}
    }
  },
  created () {
    const queryParam = parseUrlQuery()
    // this.$http.get('/api/dataSell?id=76524_58').then(response => {
    //   if (response.body.errno === ERR_OK) {
    //     this.seller = response.body.data
    //     this.seller.id = queryParam.id
    //   }
    // }, response => {})
    this.seller = data.seller
    this.seller.id = queryParam.id
  },
  components: {
    vContent, vHeader, vCart
  }

}
</script>

<style lang="less">
  
</style>
