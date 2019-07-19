<template>
 
		 <div>

		 	<span class="lined sys"> + (создать новый элемент) </span>

		 	<br>
		 	<br>
		 	<br>
			    
				<ul >
					<li v-for="(item, b, c) in pageData['page']"  :key="c">
 
					<span class="lined sys">	---- {{ item[Object.keys(item)][0]['content'] }} ---- </span>

					<span class="lined sys" @click="showmodal({'eltype':item[Object.keys(item)][0]['el_type'], 'elid':item[Object.keys(item)][0]['id']})"> [НАСТРОЙКИ ЭЛЕМЕНТА] </span>
 
					<span class="lined sys"> + (добавить на стр) </span>					
					<span class="lined sys"> - (удалить с этой стр) </span>
  
					</li>
				</ul>
 
		</div>

 	 
 
</template>

 
 
   
<script>
 
import { mapState } from 'vuex'

export default {

 

	  computed:   mapState ( {

	  	 pageData: state => state.base.jumper.elements_data

	  }),



 
 	methods: {


 		showmodal: function(datas){ 
  
 			this.$store.dispatch('showHideModal', {'modal':'modalwrapper-elem'+datas.eltype+'-'+datas.elid}) 
 
 		}


 
 }
	 
}
 
</script>


 