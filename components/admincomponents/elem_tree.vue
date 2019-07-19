<template>
 
	<div>
			   
		<div 

			class="tree_folder_wrpper">
 
		 	<div 

		 		class="tree_folder_title">


				<span 

					class="mainbuttons" style="margin-right:10px" 
					v-if="folder.parent_id >1 && elemTreeMode == 'normal'" 
					@click="displaythis (folder.id, 'elemFolderSetts')">

					&#128736;

				</span> 
				<span 

					@click="loadElemFolder">  

					{{folder.folder_name}} 

				</span>	 
				<div 

					class="tree_folder_settigs_wrap lined" 
					v-if="folder.elem_class == elemsOperations.elem_class && folder.elem_type == elemsOperations.elem_type">
 
 					<div 

						class="lined"  
						v-if="elemTreeMode == 'foldersForElement' && folder.parent_id >1">

		 				<span 

		 					class="lined sys mainbuttons"
							@click="letsMoveElemOne">

		 					Сюда

						</span>
		 				<span 

			 				class="lined sys mainbuttons" 
							@click="cancelElemOperations">

		 					Отмена

		 				</span>

					</div>
					<div 

						class="lined sys" 
						v-if="elemTreeMode == 'showCheckbxForMoveElems' && folder.parent_id >1">

						<span>

							все 

							<input 

								type="checkbox" 
								:checked="elemsChecked ? elemsChecked : chkels" 
								:disabled="elemsChecked"  
								@change="selectAllElems($event.target.checked)">

						</span>
								 				 
					</div>	  
					<div 

						class="lined"  
						v-if="elemTreeMode == 'showCheckbxForMoveElems' && folder.parent_id >1">

			 			<span 

			 				class="lined sys mainbuttons" 
							@click="letsMoveElems">

		 					Сюда

			 			</span>
						<span 
		
							class="lined sys mainbuttons" 
		 					@click="cancelElemOperations">

			 				Отмена

			 			</span>

					</div>
				</div>
			</div>					
		 	<div 

		 		v-if="elemTreeMode == 'normal'" 
		 		class="tree_folder_settigs_wrap abspos"  
				v-show="showHides[0]['elemFolderSetts'][folder.id] == 'show' ? true : false">

				<div style="position:relative;">

			 		<span 

			 			class="submenuclose" 
			 			@click="displaythis (folder.id, 'elemFolderSetts')">

			 			<span>
			 					
			 				X
			 				
			 			</span>

			 		</span>
					<div 

		 				v-if="folder.parent_id > 1 && ifDelFlag == 'norm'">
		 
						<span 

							class="lined sys mainbuttons" 
							@click="createFolder({'mode':'elemfolder', 'elemdata':folder})" > 

							+ папка 

						</span>
						<span 

							class="lined sys mainbuttons"  
							@click="createElemHere">  

							+ элемент

						</span>
						<span 

							class="lined sys mainbuttons" 
							v-if="folder.parent_id >3 " 
							@click="displaythis(folder.id, 'elemFolderRename')">  

							переименовать 

						</span>
						<div 

							class="renamecat" 
							v-if="folder.parent_id >3"
							v-show="showHides[0]['elemFolderRename'][folder.id] == 'show' ? true : false">
							 

							<input 

								type="text" 
								v-model="catname" 
								value="catname"> 
						 			
				 			<br>
						
							<span 

								class="mainbuttons" 
								@click="renamefolder" >

								Ok

							</span>
							<span>
		
								отмена

							</span>
						</div>
						<span  

							v-if="folder.parent_id >4">

							переместить категории

						</span>	
						<span 

							class="lined sys mainbuttons" 
							@click="showCheckbxForMoveElems" >

							переместить элементы

						</span>	
						<span 

							class="lined sys" 
							v-if="folder.parent_id >4" >  

							переместить в... 

						</span>	
						<span 

							class="lined sys mainbuttons"
							v-if="folder.parent_id >4" 
							@click="delElemfolder"> 

							в корзину 

						</span>
					</div>
					<div 

						v-if="folder.parent_id ==1 || ifDelFlag == 'deleted'">

						<span 

							class="lined sys mainbuttons"  
							@click="restoreElemFolder">  

							восстановить 

						</span>	
						<span 

							class="lined sys mainbuttons"
							@click="delFromTrashFolder"> 

							удалить  

						</span>
					</div>
				</div>
		 	</div>
		</div>
	 	<div 

	 		v-show="showHides[0]['elemFolders'][folder.id] == 'show' ? true : false">

	 		<div 

	 			class="tree_folder_childs_div">
		 				
		 		<ul>
				 	
				 	<li 

				 		v-for="child in folder.childs" 
				 		:key="child.id">
							   
						<elem-tree 

							style="padding-left:10px;" 
							:key="child.id" 
							:folder="child" 
							:elemsChecked="chkels == true ? chkels : elemsChecked" 
							:ifDelFlag="folder.parent_id == 1 || ifDelFlag == 'deleted' ? 'deleted' : 'norm' "></elem-tree>
							     
					</li>
				</ul>
			</div>
			<div 

				v-if="elemTreeMode == 'normal' || elemTreeMode == 'showCheckbxForMoveElems'" >	 
  
				<ul 

					v-if="folder.elem_id_here && folder.elem_id_here.length">

					<li  

						v-for="(elemid, b, c) in (String(folder.elem_id_here)).split(',')"  
						class="tree_folder_elements"  
						:key="c">

						<div 

							class="tree_folder_elements_title">

							<span 

								class="mainbuttons" 
								style="margin-right:10px" 
								v-if="elemTreeMode == 'normal'" 
								@click="displaythis(elemid, 'elemSettingsAllInTree')">

								&#128736;

							</span> 
							<div

								class="lined" 
								style="margin-right:10px"  
								v-if="folder.elem_class == elemsOperations.elem_class && folder.elem_type == elemsOperations.elem_type">
	 
								<div 

									v-if="elemTreeMode == 'showCheckbxForMoveElems' && folder.parent_id >1">

							 		<input 

							 			type="checkbox" 
							 			:checked="chkels == true ? chkels : elemsChecked" 
							 			@change="selectElem(elemid, $event.target.checked)">
							 				 
								</div>
							</div>
							<span 

								class="lined" 
								v-if="folder.id > 1"> 	

								{{ pageData[folder.elem_class][folder.elem_type][elemid]['0']['el_name'] }}

							</span>
 							<span 

 								class="lined" 
 								v-if="folder.id == 1 && elemsTree['elems']"> 	

								{{ elemsTree['elems'][elemid]['el_name'] }}
		 
							</span>
							<div 

								v-if="elemTreeMode == 'normal'" 
								class="tree_folder_elements_settings abspos"
	 							v-show="showHides[0]['elemSettingsAllInTree'][elemid] == 'show' ? true : false">

								<div style="position:relative;">

									<span 

										class="submenuclose" 
										@click="displaythis(elemid, 'elemSettingsAllInTree')">

										X

									</span>
									<div 

										v-if="folder.parent_id > 1 && ifDelFlag == 'norm'">
												
										<span 

											class="lined sys mainbuttons" 
											@click="displaythis('elemsetts-'+elemid, 'elemSettings')"> 
													
											настройки 

										</span>
										<span 

											class="lined sys  mainbuttons" 
											@click="moveElemOne(elemid)"> 

											переместить в...

										</span>	
										<span 

											class="lined sys mainbuttons" 
											@click="addElemToThisPage(elemid)">

											+  на стр 

										</span>
										<span 

											class="lined sys mainbuttons" 
											@click="openCatTreeForAddElemToPages({'elemid':elemid, 'elemtype':folder.elem_type, 'elemclass':folder.elem_class})"> 

											+  к страницам 

										</span>
										<span 

											class="lined sys mainbuttons" 
											@click="openCatTreeForRemoveElemFromPages(elemid)">

											-  со страниц

										</span> 
										<span 

											class="lined sys mainbuttons" 
											@click="toTrashElem(elemid)">

											 trsh

										</span>
									</div>
									<div 

										v-if="folder.parent_id == 1 || ifDelFlag == 'deleted'">
	
										<span 

											class="lined sys mainbuttons" 
											@click="restoreElement"> 

										    восстановить 

										</span>	
										<span 

											class="lined sys mainbuttons" 
											@click="delFromTrashElement"> 

											удалить  

										</span>
									</div>
									<div 

										v-if="folder.id == 1">

										<span 

											class="lined sys mainbuttons" 
											@click="restoreElement">

						    				восстановить 

										</span>	
										<span 

											class="lined sys mainbuttons" 
											@click="delFromTrashElement">

											удалить  

										</span>
									</div>
								</div>	
							</div>
 						</div>
					</li>
				</ul>
				<div  

					v-else 
					class="tree_folder_elements_empty">

					<span  

						v-if="folder.parent_id > 4">

						Здесь ничего нет. Создать 

						<span 

							class="lined sys mainbuttons" 
							v-if="elemTreeMode == 'normal'" 
							@click="createElemHere">

							{{ folder.type_normname}}

						</span> 

						или 


						<span 

							class="lined sys mainbuttons" 
							@click="createFolder({'mode':'elemfolder', 'elemdata':folder})" > 

							папку

						</span>
					</span>  
				</div>
			</div>
		</div>
	</div>

</template>

 
 
   
<script>
 
import { mapState } from 'vuex'

export default {

 
	props: ['folder', 'ifDelFlag', 'elemsChecked', 'ifInsideFlag'],

	  computed:   mapState ( {

	  	pageSettings: state => state.base.jumper.page_settings[0],
	  	pageData: state => state.base.jumper.elements_data,
 	  	elemsTree: state =>  state.base.jumper.elems_folders,

	  	showHides: state => state.showhides,
	  	elemsOperations: state => state.elemsOperations[0],
	  	elemTreeMode: state => state.elemTreeMode,

	  }),

	   

 
	data: function(){

		return {

 			chkels: false,
 			showhide:false,
			catname: this.folder.folder_name,
			
		}
			
	},
 

 	methods: {

 	loadElemFolder: function(){


 		if (this.showHides[0]['elemFolders']['elemfolder_'+this.folder.id]){
	 
	 		this.$store.dispatch('showHideModal', {

 				'modal':this.folder.id,
 				'wintype':'elemFolders'

 			})
 		}

 		else {

		 	this.$store.dispatch('loadThisCatList', {

		 		'mode':'elemfolder', 
		 		'parent': this.folder.id,  
		 		'el_class': this.folder.elem_class, 
		 		'el_type': this.folder.elem_type, 
		 		'idHere': this.folder.elem_id_here

		 	}).then(()=>{

		 		this.$store.dispatch('showHideModal', {

	 				'modal':this.folder.id,
	 				'wintype':'elemFolders'

	 			})
		 	})
	 	}
 	},


 	showmod: function(datas){ 
 
 		if (!this.showHides[0]['elemSettings']['modalwrapper-elem'+datas.eltype+'-'+datas.elid]){

 			this.$store.dispatch('loadElemstoData', {

 				'id': datas.elid, 
 				'needshow':'yes', 
 				'modal':'modalwrapper-elem'+datas.eltype+'-'+datas.elid,
 				'wintype':'elemSettings'

 			})
 		}

 		else { 

 			this.$store.dispatch('showHideModal', {

 				'modal':'modalwrapper-elem'+datas.eltype+'-'+datas.elid,
 				'wintype':'elemSettings'

 			})
 		}
 	},


 	createFolder: function(elemdata){

 		this.$store.dispatch('createFolder', elemdata)

 	},

 	renamefolder (){

 		let way = this.searcher({'a':this.elemsTree, 'b':this.folder.id})
 
 		return this.$store.dispatch('renameFolder', {

 			'willrename':this.folder.id, 
 			'way':way['way'], 
 			'newname':this.catname,  
 			'mode': 'elems'

 		}).then(()=> {this.displaythis (this.folder.id, 'elemFolderRename')})
 	},


 	createElemHere (){

 		let way = this.searcher({'a':this.elemsTree, 'b':this.folder.id})

 		return this.$store.dispatch('createElemHere', {

 			'way':way['way'], 
 			'where':this.folder.id, 
 			'elem_class': this.folder.elem_class, 
 			'elem_type':this.folder.elem_type

 		})
 	},


 	cancelElemOperations(){

 		this.$store.dispatch('cancelElemOperations')

 	},


 	moveElemOne (elemid){

 		let way = this.searcher({'a':this.elemsTree, 'b':this.folder.id})
 
 		this.$store.dispatch('showFolderToMoveElem', {

 			'elem_class':this.folder.elem_class, 
 			'elem_type':this.folder.elem_type, 
 			'elem_id':elemid, 
 			'old_parent':this.folder.id,
 			'old_way': way
 		})
 	},


 	letsMoveElemOne(){

 		let way = this.searcher({'a':this.elemsTree, 'b':this.folder.id})

 		this.$store.dispatch('letsMoveElemOne', {

 			'new_parent':this.folder.id,
 			'new_way': way

 		})
 	},


 	showCheckbxForMoveElems (){


 		this.$store.dispatch('showCheckbxForMoveElems', {

 			'elem_class':this.folder.elem_class, 
 			'elem_type':this.folder.elem_type
 		})


 	},


 	selectAllElems (truefalse){

 		
 	 	
 	 	let way = this.searcher({'a':this.elemsTree, 'b':this.folder.id})
 		
 	 	if (truefalse == true){this.$store.dispatch('selectAllElemsHere', {

 	 		'starter': this.folder.id, 
 	 		'way':way['way'] 
 	 	})}

 	  	else {this.$store.dispatch('unselectAllElemsHere', {

 	  	 	'starter': this.folder.id 

 	  	})}

 	  	this.chkels = truefalse


 	},

 	selectElem(elemid, truefalse){
 		
 		let way = this.searcher({'a':this.elemsTree, 'b':this.folder.id})

 		if (truefalse == true){this.$store.dispatch('selectThisElemHere', {
 			
 			'elemid': elemid, 
 			'parent':this.folder.id , 
 			'way':way['way']  

 		})}

 		else {this.$store.dispatch('unselectThisElemHere', {

 			'elemid': elemid, 
 			'parent':this.folder.id 
 		})}
 	},

 


 	letsMoveElems(){

 		let way = this.searcher({'a':this.elemsTree, 'b':this.folder.id})

 		this.$store.dispatch('letsMoveCheckedElems', {

 			'moveto':this.folder.id, 
 			'way':way['way'] 
 		})
 	},


 	toTrashElem (elemid){

 		let way = this.searcher({'a':this.elemsTree, 'b':this.folder.id})
 		this.$store.dispatch('toTrashElem', {

 			'elemid': elemid,
 			'way':way,
 			'old_parent':this.folder.id
 		})

 	},


 	restoreElement(){


 		//old_parent


 	},


 	delFromTrashElement(){





 	},

 

 	openCatTreeForAddElemToPages(elemid){
 

	 	//и, собственно, откроем дерево категорий
		this.$store.dispatch('openCatTreeForElemsOperations', {

 			'elemid':elemid,
 			'mode':'checkCats',
 			'submode':'addElemToCats'
	 	})
 
 	 	this.displaythis('catTree', 'mainWins')
 	},




 	openCatTreeForRemoveElemFromPages(elemid){

 		this.$store.dispatch('openCatTreeForElemsOperations', {

 			'elemid':elemid,
 			'mode':'checkCats',
 			'submode':'removeElemFromCats'
	 	})
 
	 	this.displaythis('catTree', 'mainWins')

 	},



 	displaythis (modal, wintype){
 
		this.$store.dispatch('showHideModal', {

 			'modal':modal,
 			'wintype':wintype
	 	})
 	},



 	addElemToThisPage(elemid){

 		if (this.pageData[this.folder.elem_class][this.folder.elem_type][elemid]['0']['included_to_pages']){
 
 		let pageIncludedTo = this.pageData[this.folder.elem_class][this.folder.elem_type][elemid]['0']['included_to_pages'].split(',')

 			for (let i=0; i<pageIncludedTo.length; i++){

 				if (pageIncludedTo[i] == this.pageSettings.id) {
 					alert('этот элемент уже на странице');
 					return;
 				}
 			}
 		}

 		this.$store.dispatch('addElemToThisPage', {

 			'show_elemclass':this.folder.elem_class,
 			'show_elemtype':this.folder.elem_type,
 			'show_elemid':elemid,
 			'page_id': this.pageSettings.id
 			 
 		})
 
 	},


	delElemfolder(){
		   
 		let way = this.searcher({'a':this.elemsTree, 'b':this.folder.id})
 	  
 		return this.$store.dispatch('delFolder', {

 			'willdel':this.folder.id, 
 			'indx':way['indx'], 
 			'parent':way['parent'], 
 			'mode':'elemfolder',
 			'parent_id':this.folder.parent_id

 		})
 	},


 	delFromTrashFolder(){

 		console.log(this.elemsTree)
		   
 		let way = this.searcher({'a':this.elemsTree, 'b':this.folder.id})
 	  
 		return this.$store.dispatch('delFromTrash', {

 			'willdel':this.folder.id, 
 			'indx':way['indx'], 
 			'parent':way['parent'], 
 			'mode':'cats'

 		})
 	},

 	restoreElemFolder(){

 	//	console.log(this.folder)
 
 		return this.$store.dispatch('restoreElemFolder', {'elem':this.folder})
 	},



  searcher(datas){

    var stopper='0'
 	var actualway

     function startersearcher (list){
  
          //первый проход по данному уровню вложенности
          for (let i in list){

            if (stopper !=='1'){

            if (datas['b'] == list[i]['id']){ 

                 stopper = '1'
                 
                 actualway = {'way':list[i], 'indx':i, 'parent':list }
    
              }
            }
          }

          //если в первый проход не нашли
          //второй раз идем уже по чайльдам
          if (stopper !=='1'){

          for (let f in list){

            if (list[f]['childs']){
 
              startersearcher (list[f]['childs'])

            }
          }
        }
      }
 
    startersearcher(datas['a'])

	return  actualway
 
    }
 
 }
	 
}
 
</script>

