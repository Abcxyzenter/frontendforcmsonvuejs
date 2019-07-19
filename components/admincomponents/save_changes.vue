<template>

	<div class="widthauto">

	   <span @click="saveAll({'page_settings': pageSetts, 'elements_data': elementsData, 'cats_n_pages': pageCats, 'todel': $store.state.todel , 'tocreate': $store.state.tocreate, 'edited': $store.state.edited })" class="mainbuttons">	&#128190;</span>

	</div>

</template>

 

<script>
import { mapState } from 'vuex'
	import {saveAll} from '../.././roadmap.js'
 
 
export default {

   mixins: [saveAll],
  

   computed:  mapState ( {
  

      elementsData: state => state.base.jumper.elements_data,
 
      pageCats: state =>  state.base.jumper.cats_n_pages,

      pageSetts: state =>  state.base.jumper.page_settings['0'],
 

      }),

}
</script>


 