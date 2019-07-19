 

<template>
 
    <div class="displaymodal" v-show="showHides[0]['elemSettings'][inshowhidename]  == 'show' ? true : false">

	 	<div class="wraprelative">

	 		<span @click="showModal" class="closebuttons">X</span>
	 	
	 	</div>
	 
	 	<div class="overflower">

	 		<slot name="settingspart"></slot>
	 	  
		</div>
	</div>
 
 
</template>

<script>
  
import { mapState } from 'vuex'
 
export default{

 
	props:['inshowhidename'],
 

  	computed:   mapState ( {

	  	showHides: state => state.showhides

	}),

	created: function (){
	//делаем добавленное модальное окно невидимым
    this.$store.dispatch('addHidedModal', {'modal':this.inshowhidename, 'wintype':'elemSettings'}) 

      
	},

	methods: {

		showModal () {

			 this.$store.dispatch('showHideModal', {'modal':this.inshowhidename, 'wintype':'elemSettings'}) 
		}
	}

 

 
 }

</script>