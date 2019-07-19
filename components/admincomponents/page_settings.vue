<template>
<div class="widthauto">
 
	<div class="widthauto">

      <span  @click="showWin" class="mainbuttons">настройки страницы</span>

    </div>
    
    <div class="beforeblackback"  @click="showWin"  v-show="showHides[0]['mainWins']['pageSets']  == 'show' ? true : false"></div>

    <div class="displaybigmodal" v-show="showHides[0]['mainWins']['pageSets']  == 'show' ? true : false">

	 	<div class="wraprelative">

	 		<span @click="showWin" class="closebuttons">X</span>
	 	
	 	</div>
	 
	 	<div class="overflower">
	  
		  <h2 @click="showById('pagetitle_'+tostore.id)">{{tostore.title}}</h2>

		  <input type="text" v-model="tostore.title" :id="'pagetitle_'+tostore.id" class="setinput"> 

		  <p>{{tostore.alias}}  - чек алиаса в бд</p> 
		 
		  

		  <p>вкл стр? {{tostore.active}}
		  	 <input type="checkbox" v-model="tostore.active"  :value="tostore.active"> 
		  </p>


		  <p>главная стр? {{tostore.is_homepage}} 

		  	<input type="checkbox" v-model="tostore.is_homepage" :value="tostore.is_homepage">
		  
		  </p>  


		  <p>{{tostore.access}}</p>

 
		  <p>{{tostore.price_default}}</p> 
		  <p>{{tostore.price_old}}</p> 
		  <p>{{tostore.price_new}}</p>


		  <p>{{tostore.seo_keywords}}</p> 
		  <p>{{tostore.seo_description}}</p>


		  <p>{{tostore.template}}</p> 
 

		  <p>{{tostore.default_img}}</p> 
		  <p>{{tostore.background}}</p> 
		  <p>{{tostore.background_video}}</p>


		  <h3>редактируются не тут</h3>
		  <p>{{tostore.show_elemclass}}</p> 
		  <p>{{tostore.show_elemtype}}</p> 
		  <p>{{tostore.show_elemid}}</p> 
		  <p>{{tostore.show_outpos}}</p> 
		  <p>{{tostore.show_inpos}}</p> 
		  <p>{{tostore.show_outcls}}</p> 
		  <p>{{tostore.show_incls}}</p> 
		  <p>{{tostore.parent_id}}</p> 
		  <p>{{tostore.cat_order}}</p>
		  <p>{{tostore.type}}</p>
		  <p>{{tostore.id}}</p> 
		
		</div>

	</div>	

</div>

</template>

 

<script>
  
import { mapState } from 'vuex'
 
export default{

 

 	data: function (){

 		return {

 			tostore:this.$store.state.base.jumper.page_settings['0']

 		}

 	},

  	computed:   mapState ( {

	  	showHides: state => state.showhides

	}),


	methods: {

		showWin () {

			 this.$store.dispatch('showHideModal', {'modal':'pageSets', 'wintype':'mainWins'}) 
		}
	}


}
 
</script>
