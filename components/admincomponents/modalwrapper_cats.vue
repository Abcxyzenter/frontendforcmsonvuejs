 

<template>
<div class="widthauto">
 
	<div class="widthauto">

      <span @click="showWin" class="mainbuttons">дерево категорий</span>

    </div>

    <div class="beforeblackback"  @click="showWin"  v-show="showHides[0]['mainWins']['catTree']  == 'show' ? true : false"></div>

    <div class="displaybigmodal" v-show="showHides[0]['mainWins']['catTree']  == 'show' ? true : false">

	 	<div class="wraprelative">

	 		<span @click="showWin" class="closebuttons">X</span>
	 	
	 	</div>
	 
	 	<div class="overflower">

	 		<slot name="a"></slot>
	 	 
		</div>

		<div>
			<span class="lined sys mainbuttons">массовое перемещение</span>
			 
			<span class="lined sys mainbuttons">массовое удаление</span>
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

			 this.$store.dispatch('showHideModal', {'modal':'catTree', 'wintype':'mainWins'}) 
		}
	}

 
 
 }


</script>