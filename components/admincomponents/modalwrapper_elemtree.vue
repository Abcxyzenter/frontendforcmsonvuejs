 

<template>
<div class="widthauto">
 
	<div class="widthauto">

      <span @click="showWin" class="mainbuttons">дерево элементов</span>

    </div>

    <div class="beforeblackback"  @click="showWin"  v-show="showHides[0]['mainWins']['elemTree']  == 'show' ? true : false"></div>

    <div class="displaybigmodal" v-show="showHides[0]['mainWins']['elemTree']  == 'show' ? true : false">

	 	<div class="wraprelative">

	 		<span @click="showWin" class="closebuttons">X</span>
	 	
	 	</div>
	 
	 	<div class="overflower">

	 		<slot name="a"></slot>
	 	 	<div style="width:100%; height:120px"></div>
		</div>
		<div>
			<span class="lined sys mainbuttons">массовое удаление категорий</span>
			<span class="lined sys mainbuttons">массовое удаление элементов</span>
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

			 this.$store.dispatch('showHideModal', {'modal':'elemTree', 'wintype':'mainWins'}) 
		}
	}

 
 
 }

</script>