 

<template>
<div class="widthauto removeoutcss">

 
	<div class="widthauto">

      <span @click="showModal" class="mainbuttons sss">{{buttontitle}}</span>

    </div>

    <div class="displaymodal" v-show="showHides[0]['inPositionSettings'][inshowhidename]  == 'show' ? true : false">

	 	<div class="wraprelative">

	 		<span @click="showModal" class="closebuttons">X</span>
	 	
	 	</div>
	 
	 	<div class="overflower">


	 		<slot name="posits"></slot>
	 		<slot name="css"></slot>
	 		 
	 		 
		</div>

		<span class="lined sys mainbuttons">css редактор (создать новые стили)</span>
	</div>
 
</div>
</template>

<script>
import { mapState } from 'vuex'
 
export default{

 
	props:['inshowhidename', 'buttontitle'],
 

  	computed:   mapState ( {

	  	showHides: state => state.showhides

	}),


	created: function (){
	//делаем добавленное модальное окно невидимым
    this.$store.dispatch('addHidedModal', {'modal':this.inshowhidename, 'wintype':'inPositionSettings'}) 
      
	},

	methods: {

		showModal () {

			 this.$store.dispatch('showHideModal', {'modal':this.inshowhidename, 'wintype':'inPositionSettings'}) 
		}
	}

 

 
 }

</script>