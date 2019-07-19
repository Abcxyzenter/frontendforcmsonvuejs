<template>

<div >
   
  <div>
		<span @click="loadStyleCat(indxclass, classes.style_cat_alias)">{{classes.style_cat}}</span>
  </div>
  <div v-if="classes.classname">
		<select   v-model="selected" @change="outerCssAdd(inindex, classes.classname)">
			<option value="">выберите значение</option>
			<option v-for="(classnames, ind) in classes.classname" :value="classnames" :key="ind" :selected="classnames == hereclass?true :false">{{classes.style_title[ind]}}</option>
		</select>
  </div>
	  
  <div v-if="classes.classname" >
		<span @click="outerCssRemove()">убрать</span>
 	</div>
	 
</div>

</template>

 

<script>
 
export default {
 

 	props: ['classes', 'indx', 'hereclass', 'inindex', 'indxclass'],

	data: function(){return{selected:''}},


  beforeMount: function() {

          for (var a in this.classes.classname){

          if (this.hereclass.includes(this.classes.classname[a])){
        
            return this.selected = this.classes.classname[a]
            
          }

         }
 
    },

 	beforeUpdate: function() {

          for (var a in this.classes.classname){

         	if (this.hereclass.includes(this.classes.classname[a])){
				
         		return this.selected = this.classes.classname[a]
         		
         	}

         }
 
  	},

  	created: function() {

          for (var a in this.classes.classname){

         	if (this.hereclass.includes(this.classes.classname[a])){
				
         		return this.selected = this.classes.classname[a]
         		
         	}

         }
 
  	},
 
 
 	methods: {

 	loadStyleCat(ind, catName){
  
 		if(!this.$store.state.base.jumper.class_list[ind]['classname']){

 			return this.$store.dispatch('loadThisCssSelect', {'name':catName, 'id':ind}).then(()=>{
 	 		  
	 		})
 		}


 	},

 	outerCssAdd (outnom, classlistall){
 
 		return this.$store.dispatch('outCssAddClass', {'numberPos':this.inindex,  'mode':'inCss', 'outposindx':this.indx, 'newclass':this.selected, 'tocheckArray':classlistall})
 		   
        },

    outerCssRemove (){
 
    	let hereclasslist = this.hereclass.split(' ')
  
    	 	 for (let a in hereclasslist){


          		if (hereclasslist[a]==''){
          		  	hereclasslist.splice(a, '1')
          		   }

          		if (hereclasslist[a]==this.selected){
          		  	hereclasslist.splice(a, '1')
          		   }
 
            }
 
 		return this.$store.dispatch('outCssRemoveClass', {'numberPos':this.inindex, 'mode':'inCss', 'outposindx':this.indx,  'toremove':hereclasslist.join(' ')}).then(()=> this.selected = '')
 
    }

  
 }
   
  
}
</script>
