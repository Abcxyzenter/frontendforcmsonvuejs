<template>
 
    <div class="container">
      <adminhomepage/>
    </div>
  
</template>

<script>
 
import axios from "axios"
import Vue from 'vue'
 

import adminhomepage from '~/components/adminhomepage.vue'

export default {



  

  components: {
    adminhomepage
  }
}
</script>

<style>

* {
  margin:0px;
  padding:0px;
  font-family: sans-serif;
  box-sizing: border-box;
}


body {

  background: #f7f7f7;
}

.container {

  width:80%;
  margin:auto;
  text-align: center;
}
</style>

