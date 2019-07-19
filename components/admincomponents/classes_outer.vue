<template>

<div>
   
  <div>
		<span @click="loadStyleCat(indx, classes.style_cat_alias)">{{classes.style_cat}}</span>
  </div>

  <div v-if="classes.classname">
 
		<select v-model="selected"  @change="outerCssAdd(outindex, classes.classname)" >
			<option disabled value="">выберите значение</option>
			<option v-for="(classnames, ind) in classes.classname"  :key="ind" :value="classnames">{{classes.style_title[ind]}}</option>
		</select>

  </div>
 	  
  <div v-if="classes.classname">
 
		<span  @click="outerCssRemove(outindex,outindex,selected)">убрать</span>

 	</div>
	 
</div>

</template>

 

<script>
 
export default {
  
 	props: ['classes', 'indx', 'hereclass', 'outindex'],

 	data: function(){return{selected:''}},

 	beforeUpdate: function() {

 		if(this.hereclass){

          for (var a in this.classes.classname){

         	if (this.hereclass.includes(this.classes.classname[a])){
				
         		return this.selected = this.classes.classname[a]
         		
         	}

         }}
 
  	},
 
 	methods: {

 	loadStyleCat(ind, catName){
  
 		if(!this.$store.state.base.jumper.class_list[ind]['classname']){

 			return this.$store.dispatch('loadThisCssSelect', {'name':catName, 'id':ind}).then(()=>{
 	 		  
	 		})
 		}


 	},

 	outerCssAdd (outnom, classlistall){
 
 		return this.$store.dispatch('outCssAddClass', {'numberPos':outnom,  'mode':'outerCss', 'outposindx':outnom,  'newclass':this.selected, 'tocheckArray':classlistall})
 		   
        },

    outerCssRemove (outnom, outposindx,){
 
    	let hereclasslist = this.hereclass.split(' ')
  
    	 	 for (let a in hereclasslist){
 
          		if (hereclasslist[a]==this.selected){
          		  	hereclasslist.splice(a, '1')
          		   }
 
          		if (hereclasslist[a]==''){
          		  	hereclasslist.splice(a, '1')
          		   }
 
            }
 
 		return this.$store.dispatch('outCssRemoveClass', {'numberPos':outnom, 'mode':'outerCss', 'outposindx':outnom,  'toremove':hereclasslist.join(' ')}).then(()=> this.selected = '')
 
    }

  
 }
   
  
}
</script>
