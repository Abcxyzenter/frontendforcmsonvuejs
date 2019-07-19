<template>

<div>

  <div>
    <span>номер блока </span>
  </div>

  <div>
    <select v-model="selectedBlock" @change="changeBlock">
    	<option 

        v-for="(posOut, indx) in outerPosits" 

        :selected="posOut == selectedOuterPos ? true:false" 
        :key="indx" 
        :value="posOut">

          блок {{posOut}}

        </option>
		  <option 

        v-if="innerPosits.length>1" 

        :value="outerPosits.length+1">

          НОВЫЙ

      </option>
    </select>
  </div>  
    <div>
      <span>позиция внутри блока </span>
    </div>
    <div>
    <select v-model="selectedPosition" @change="changePosition">
    	<option 

        v-for="(pos, ind) in innerPosits" 

        :selected="pos == selectedPos ? true : false" 
        :key="ind" 
        :value="pos">	

          позиция {{pos}}

      </option>
    </select>
  </div>

</div>

</template>

 

<script>
 


export default {
 
    props: ['innerPosits', 'outerPosits', 'selectedPos', 'selectedOuterPos'],
 
    data: function(){ return{selectedBlock:'', selectedPosition:''}  },

    created: function() {

  		 return this.selectedBlock = this.selectedOuterPos, this.selectedPosition = this.selectedPos 
         	 
  	},

    updated: function() {

   		 return this.selectedBlock = this.selectedOuterPos, this.selectedPosition = this.selectedPos 
         	 
  	},

  	methods: {

  		changeBlock (){

  			this.$store.dispatch ('changeBlock', {

          'newPosition':this.selectedBlock, 
          'oldPosition':this.selectedOuterPos, 
          'innerPos':this.selectedPosition

        })
  		},

  		changePosition (){

  			this.$store.dispatch ('changePosition', {

          'newPosition':this.selectedPosition, 
          'oldPosition':this.selectedPos, 
          'outerPos':this.selectedBlock 
        })
  		}
  	}
 
 
}
</script>


 