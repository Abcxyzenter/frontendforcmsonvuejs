export default {
  
	 pageCats: state => {
 
   	 	 return state.base.jumper.cats_n_pages

	 },

	pageSets: state => {
 
   		return state.base.jumper.page_settings['0']

	},

	pagePos: state => {
 
   		 return state.base.jumper.page_positions

	},
 
	pageData: state => {
 
   		 return state.base.jumper.elements_data

	},


	pagePosClass: state => {
 
   		 return state.base.jumper.page_outerclasses

	},


 

 

 
	 



}