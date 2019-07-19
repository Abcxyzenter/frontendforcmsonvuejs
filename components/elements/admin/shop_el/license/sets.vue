 <template>

<div class="widthauto">
  

			<h2 >{{tostore.el_name}}</h2>
 
 			<input type="text" v-model="tostore.el_name" class="setinput"> 
 
			<span @click="elemPartCancel(tostore, 'el_name')">анду</span> 
 
			<span @click="elemSetsToVuex(tostore)" class="mainbuttons">Ок</span>

			<span @click="elemAllCancel(tostore)" class="mainbuttons">Отмена</span>
</div>
</template>

<script>

import {dataToVuex} from '../../../.././mixin.js'
import {cancelButton} from '../../../.././mixin.js'

export default{

 

	mixins: [dataToVuex, cancelButton],

 	props:['id', 'active', 'access', 'el_class', 'el_type', 'el_inctables', 'el_name', 'el_short', 'el_full', 'el_template', 'el_default_img', 'el_imglist', 'el_link', 'el_video', 'el_files', 'for_identifier'],

 data: function() {

   return {

     tostore:{

     	id:this.id, 
		active:this.active, 
		access:this.access, 
		el_class:this.el_class, 
		el_type:this.el_type, 
		el_inctables:this.el_inctables, 
		el_name:this.el_name, 
		el_short:this.el_short, 
		el_full:this.el_full, 
		el_template:this.el_template, 
		el_default_img:this.el_default_img, 
		el_imglist:this.el_imglist, 
		el_link:this.el_link,  
		el_video:this.el_video, 
		el_files:this.el_files, 
		for_identifier:this.for_identifier

     }

   }

},

	 

 

}

</script>