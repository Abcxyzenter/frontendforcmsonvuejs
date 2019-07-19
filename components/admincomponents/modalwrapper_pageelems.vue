 

<template>
<div class="widthauto">
 
	<div class="widthauto">

      <span @click="showWin" class="mainbuttons">компоненты страницы</span>

    </div>
    
    <div class="beforeblackback"  @click="showWin"  v-show="showHides[0]['mainWins']['pageElems']  == 'show' ? true : false"></div>

    <div class="displaybigmodal" v-show="showHides[0]['mainWins']['pageElems']  == 'show' ? true : false">

	 	<div class="wraprelative">

	 		<span @click="showWin" class="closebuttons">X</span>
	 	
	 	</div>
	 
	 	<div class="overflower">

	 		<slot name="a"></slot>
	 	 
		</div>
	</div>
 
</div>
</template>

<script>

import { mapState } from 'vuex'
 
export default{

 
  	computed:   mapState ( {

	  	showHides: state => state.showhides

	}),


	methods: {

		showWin () {

			 this.$store.dispatch('showHideModal', {'modal':'pageElems', 'wintype':'mainWins'}) 
		}
	}

 
 
 }

</script>