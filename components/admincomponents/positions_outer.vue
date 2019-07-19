<template>

<div>
    <select v-model="selected" @change="blockPosition">
    	<option 

      v-for="(pos, ind) in poslist " 
      :key="ind" :value="pos" 
      :selected="pos == selectedpos ? true:false">
    		блок {{pos}}
    	</option>
    </select>
</div>

</template>

 

<script>
 

  
export default {
 
   props: ['poslist', 'selectedpos'],

   data: function(){ return{selected:''}  },

   updated: function() {
 
        return this.selected = this.selectedpos
          
  	},

  	created: function() {
 
        return this.selected = this.selectedpos
          
  	},

 	methods:{

 		blockPosition(){

 			this.$store.dispatch ('blockPosition', {

        'newPosition':this.selected, 
        'oldPosition':this.selectedpos
         })
 		}
 	}
 
}
</script>


 