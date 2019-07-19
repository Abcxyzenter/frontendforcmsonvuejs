<template>
 
	<div>
 
		<div 

			class="tree_folder_wrpper">

		 	<div 

		 		class="tree_folder_title" >


				<span 

					class="mainbuttons" 
					style="margin-right:10px" 
					v-if="thiscat.parent_id > 1 && this.catmode == 'normal'" 
					@click="displaythis (thiscat.id, 'catSettings')">

					&#128736;

				</span>
				<span

					@click="loadcats(thiscat.id, thiscat.childs)">

					{{thiscat.title}}

				</span>
				<div 

					v-if="this.catmode=='selectcat' && thiscat.parent_id >1" 
					class="tree_folder_settigs_wrap lined">

					<div

						v-if="thiscat.type == 'cat'">

						<span 

							class="mainbuttons" 
							@click="letsMove" 
							v-if="willmove !== thiscat.id && isChild == false"> 

							выбрать

						</span>
						<span  

							class="mainbuttons" 
							@click="cancelCatOperations"> 

							отмена 

						</span>
					</div>
				</div>
				<div v-if="this.catmode=='checkCats' && thiscat.parent_id >1">


					<span
						v-if="thiscat.type == 'cat'"
						class="lined sys">

						отметить все
						
						<input 
							
							type="checkbox"
							:checked="childlist[thiscat.id] && childlist[thiscat.id]['checkedCat'] == true ? true : false"
							@change="checkThisCat">


					</span>

					<input 
						v-if="thiscat.type == 'page'"
						type="checkbox"
						:checked="childlist[thiscat.parent_id] && childlist[thiscat.parent_id][thiscat.id] == true ? true : false"
						@change="checkThisPage">


					<div 
	 				
	 					class="lined sys"
						v-if="this.submode=='makeTemplate'">

						<span 

							class="lined sys mainbuttons"
							@click="letsMakeTemplate">

							Применить

						</span>
						<span 	
							
							class="lined sys mainbuttons"
							@click="cancelCatOperationsAndClose">

							отмена

						</span>

						<span  

							v-if="thiscat.type == 'cat'"
							class="lined sys" 
							>


							<span 

								v-if="childlist[thiscat.id] && childlist[thiscat.id]['checkedCat'] == true"
								class="lined sys">

								сделать шаблоном для новых страниц
	 
								<input
									type="checkbox"
									:checked="childlist[thiscat.id] && childlist[thiscat.id]['templateToNewChilds'] == true ? true : false"
									@change="templateToNewChilds">

							</span>
						</span>
	 				</div>
					<div 
	 				
	 					class="lined sys"
						v-if="this.submode=='addElemToCats'">

						<span 

							class="lined sys mainbuttons"
							@click="addElemToThisPages">

							Применить

						</span>

						<span 

							class="lined sys mainbuttons"
							@click="openAddElemSettings(thiscat.id, thiscat.type)">

							настройки вставки

						</span>

						 
						<div 

							style="z-index: 99;"
							class="displaymodal"
							v-if="showHides[0]['pagesOneElemAddOrRemove'][thiscat.id] == 'show'">

							<span 

								class="closebuttons"
								@click="openAddElemSettings(thiscat.id)">

								X

							</span>

							<div class="wraprelative" style="text-align:center; cursor:auto; color:#333; font-size:16px;">
 
								<div class="overflower">
 
									<span class="lined sys">

									 	<input 

								 			style="width:50px;  height:25px; text-align:center;"
								 			@change="preferPosiiton($event.target.value, thiscat.id, thiscat.type)"
								 			 
								 			v-model="childlist[thiscat.id]['position']"
								 			type="number" 
								 			min="1">

									 	предпочитаемая позиция

									</span >
									<span class="lined sys" v-if="thiscat.type == 'cat'">

									 	<input 
									 		@change="toExistTemplate($event.target.checked, thiscat.id, thiscat.type)"
									 		v-model="childlist[thiscat.id]['templateToNewChilds']"
									 		type="checkbox" >

									 	применить к шаблону категории

									</span>

								</div>
								<span 
									@click="openAddElemSettings(thiscat.id)"
									class="lined sys mainbuttons">
									 ok 
								</span>
							</div>
						</div>
						<span 	
							
							class="lined sys mainbuttons"
							@click="cancelCatOperationsAndClose">

							отмена

						</span>

	 				</div>
	 				<div 
	 				
	 					class="lined sys"
	 					v-if="this.submode=='removeElemFromCats'">

						<span 

							class="lined sys mainbuttons"
							@click="removeElemFromThisCats">

							Убрать

						</span>

	 					<span

	 						class="lined sys ">

	 						удалить из шаблонов

	 						<input 

	 							type="checkbox"
	 							v-model="checkDelFromTemplate">
 
	 					</span>
						<span 	
							
							class="lined sys mainbuttons"
							@click="cancelCatOperationsAndClose">

							отмена

						</span>
						
	 				</div>


				</div>
				<div 

					v-if="this.catmode=='normal' && thiscat.parent_id >1" 
					class="tree_folder_settigs_wrap abspos" 
					v-show="showHides[0]['catSettings'][thiscat.id] == 'show' ? true : false">

					<div 

						style="position:relative;">

			 			<span 

			 				class="submenuclose" 
			 				@click="displaythis (thiscat.id, 'catSettings')">

			 				<span>
			 					
			 					X
			 				
			 				</span>

			 			</span>
						<span 

							class="lined sys mainbuttons" 
							v-if="thiscat.id !== '1' && thiscat.type == 'cat'" 
							@click="createCatHere({ 'mode':'cat', 'createMode':'cat', 'parent':thiscat.id, 'template':thiscat.template_id_for_new})">

							 + кат 

						</span>
						<span 

							class="lined sys mainbuttons" 
							v-if="thiscat.id !== '1' && thiscat.type == 'cat'" 
							@click="createCatHere({ 'mode':'cat', 'createMode':'page', 'parent':thiscat.id, 'template':thiscat.template_id_for_new})"> 

							+ стр

						</span>
						<span 

							class="lined sys mainbuttons" 
							v-if="thiscat.parent_id !== '0'" 
							@click="displaythis (thiscat.id, 'catRenameCatOrPage')">

							 переименовать 

						</span>
						<div 

							class="renamecat" 
							v-if="thiscat.parent_id !== '0'"
							v-show="showHides[0]['catRenameCatOrPage'][thiscat.id] == 'show' ? true : false">

							<span>

								Имя

							</span>
							
							<br>
							
							<input 

								type="text" 
								v-model="catname" 
								value="catname" 
								@keyup="makealias"> 
							 
							<br>

							<span>

								алиас

							</span>
							
							<br>
							
							<input 

								type="text" 
								v-model="alias" 
								value="alias" 
								@keyup="checkalias( alias )">

							<span 

								class="lined sys mainbuttons" 
								@click="renamefolder">

								Ok

							</span>
							<span>

								отмена

							</span>
						</div>
						<span 

							class="lined sys mainbuttons" 
							v-if="thiscat.parent_id > 1" 
							@click="delcat"> 

							trsh 

						</span>
						<span 

							class="lined sys mainbuttons" 
							v-if="thiscat.parent_id !== '0'" 
							@click="moveCatinTree"> 

							в другую категорию

						</span>	
						<div 

							v-if="thiscat.type == 'page' && thiscat.parent_id !== '0'">
								
							<span 

								class="lined sys mainbuttons">

								SEO

							</span>
							<span 

								class="lined sys mainbuttons">

								SHOP's

							</span>
							<span 

								class="lined sys mainbuttons">

								основное изображение

							</span>
							<span 

								class="lined sys mainbuttons">

								фоновое изображение

							</span>
							<span 

								class="lined sys mainbuttons">

								фоновое видео

							</span>
 
							<br>

							<span 

								class="lined sys">

								Шаблон обертки

							</span>
							
							<br>
							
							<select>
								<option value="default">default</option>
								<option value="2">еще какой то</option>
							</select>
							
							<br>
							
							<span 

								class="lined sys" > 

								сделать главной  

								<input 

									type="checkbox" 
									:disabled="thiscat.active == 1 ? false : true" 
									:checked="thiscat.is_homepage == '1' ? true : false">

							</span>	
						</div>
						<span 

							class="lined sys" 
							v-if="thiscat.parent_id !== '0'"> 

							вкл 

							<input 

								type="checkbox"  
								:checked="thiscat.active == 1 ? true : false">

						</span>

						<br>

						<span 

							class="lined sys">
							
							Уровень доступа

						</span>
							
						<br>
							
						<select>
							<option 

								:selected="thiscat.access == 1 ? true : false" 
								value="1">

								всем

							</option>
							<option 

								:selected="thiscat.access == 2 ? true : false" 
								value="2">

								зарегистрированным

							</option>
							<option 

								:selected="thiscat.access == 3 ? true : false" 
								value="3">

								админу

							</option>
						</select>
					</div>
				</div>
				<span 

					class="lined sys mainbuttons" 
					v-if="thiscat.parent_id == 1" 
					@click="delFromTrashcat">

					 del  

				</span>
			</div>
		</div>
		<div 

			v-show="showHides[0]['catFolders'][thiscat.id] == 'show' ? true : false">

		 	<ul 

		 		v-if="thiscat.childs" 
		 		style="margin-left:10px;">
			 		
			 	<li  

			 		v-if="childs.type == 'cat'" 
			 		v-for="(childs, indexed) in thiscat.childs"  
			 		:key="indexed" 
					
			 		>
						   
					<cats-tree :thiscat="childs" :isChild="childs.id, childlist | ischild" ></cats-tree>
						  
				</li>
				<li 

					v-if="childs.type == 'page'" 
					v-for="childs in thiscat.childs"  
					class="pagesintree" :key="childs.id">
						   
					<cats-tree :thiscat="childs"></cats-tree>
						  
				</li>
			</ul>
			<div  

				style="margin-left:10px;" 
				class="pagesintree" 
				v-if="!thiscat.childs && thiscat.parent_id > 2 && thiscat.type == 'cat' && this.catmode=='normal'">
					
				<span>
						
					Здесь ничего нет, вы можете создать здесь

					<span 

						class="lined sys mainbuttons" 
						v-if="thiscat.id !== '1' && thiscat.type == 'cat'" 
						@click="createCatHere({ 'mode':'cat', 'createMode':'cat', 'parent':thiscat.id, 'template':thiscat.template_id_for_new})"> 

						каталог 

					</span>

					или
					
					<span 

						class="lined sys mainbuttons" 
						v-if="thiscat.id !== '1' && thiscat.type == 'cat'" 
						@click="createCatHere({ 'mode':'cat', 'createMode':'page', 'parent':thiscat.id, 'template':thiscat.template_id_for_new})"> 

						страницу

					</span>
				</span>
			</div>
		</div>	
	</div>

</template>

 
 

<script>
  
import {checkAlias} from '../.././roadmap'
import { mapState } from 'vuex'
import { filters } from '.././filters'

export default {

 
	props: ['thiscat', 'isChild'],

	data: function(){

		return {

			catflag: '',
			catname: this.thiscat.title,
			alias: this.thiscat.alias
 
			 
		}		
	},


	  computed:   mapState ( {

	  	catsNpages: state => state.base.jumper.cats_n_pages,
	  	showHides: state => state.showhides,
	  	 
	  	catmode: state => state.catOperations['0']['cattree'],
	  	submode: state => state.catOperations['0']['catsubmode'],
	  	willmove: state => state.catOperations['0']['cattmp']['way']['id'],
	  	childlist: state => state.catOperations['0']['catChilds'],
	  	tmp: state => state.catOperations['0']['tmp']

	  }),


 
 
 	methods: {

 	loadcats: function(parent, childs){

  
  	if (!childs){
	 	return this.$store.dispatch('loadThisCatList',  {

	 		'mode':'cats',
	 		'parent':parent

	 	}).then( () => {
 
	 		 this.displaythis (parent, 'catFolders') 
	 		 
	 	})
	 	}
	 	else{

	 		this.displaythis (parent, 'catFolders') 
	 	}
 	},




 	createCatHere (setts){

 		return this.$store.dispatch('createFolder', setts)

 	},




 	cancelCatOperations(){
 
 		return this.$store.dispatch('cancelCatOperations')

 	},

 	cancelCatOperationsAndClose(){
 
 		this.$store.dispatch('cancelCatOperations')
 		this.displaythis('catTree', 'mainWins')
 	},




 	moveCatinTree(){

 		let tomove = this.searcher({'a':this.catsNpages, 'b':this.thiscat.id})

 		let childs = this.childsIdRecorder(tomove['way'])
 
 		return this.$store.dispatch('catTreeSelectParent', {

 			'tomove':tomove, 
 			'childs':childs['id']})
 	},



 	letsMove (){

 		let newparent = this.searcher({'a':this.catsNpages, 'b':this.thiscat.id})

 		return this.$store.dispatch('letsMoveCat', {

 			'newparent':newparent, 
 			'mode':'cats'

 		})
 	},




 	renamefolder (){

 		if (this.alias !== 'введите другой'){

 		let way = this.searcher({'a':this.catsNpages, 'b':this.thiscat.id})
  
 		return this.$store.dispatch('renameFolder', {

 			'willrename':this.thiscat.id, 
 			'newname':this.catname, 
 			'newalias':this.alias,
 			'way':way['way'], 
 			'mode': 'cats'


 		}).then(()=>{

 	 

 		this.displaythis (this.thiscat.id, 'catRenameCatOrPage') })

 	} else {alert('введите другой алиас для страницы!')}

 	},



 	makealias (){
 
		let oldstr = this.catname;

	    let strz = oldstr.toLowerCase().replace(/<.+>/, ' ').replace(/\s+/, ' ');
	    let c = {
	        'а':'a', 'б':'b', 'в':'v', 'г':'g', 'д':'d', 'е':'e', 'ё':'jo', 'ж':'zh', 'з':'z', 'и':'i', 'й':'j', 'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o', 'п':'p', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'ф':'f', 'х':'h', 'ц':'c', 'ч':'ch', 'ш':'sh', 'щ':'shch', 'ъ':'', 'ы':'y', 'ь':'', 'э':'e', 'ю':'ju', 'я':'ja', ' ':'-', ';':'', ':':'', ',':'', '—':'-', '–':'-', '.':'', '«':'', '»':'', '"':'', "'":'', '@':''
	    }

	    let newStr = new String();
	    for (let i = 0; i < strz.length; i++) {
	     	 let  ch = strz.charAt(i);
	        newStr += ch in c ? c[ch] : ch;
	    }
	  
	    this.checkalias(newStr)
	 
 	},



 	checkalias(newStr){
  
 		return checkAlias ({'strch':newStr}).then(response => {

 			if (response.data == 'free') {return this.alias = newStr}
 			else {return this.alias = 'введите другой'}

 		})
 
 	},




 	displaythis (modal, wintype){
 
		this.$store.dispatch('showHideModal', {

	 				'modal':modal,
	 				'wintype':wintype
	 	})
 	},


	checkThisCat(){

		//отправить отмеченную категорию в массив

		 this.$store.dispatch('checkThisCat', {

			'cat':this.thiscat.id 

		})

 	},

 	checkThisPage(){

 		//отправить отмеченную страницу в массив категории
		this.$store.dispatch('checkThisPage', {

			'page':this.thiscat.id, 
			'cat': this.thiscat.parent_id

		})
 	},

 	templateToNewChilds(){

 		//применить шаблон ко всем созданным в этой категории страницам
		this.$store.dispatch('templateToNewChilds', {

			'cat':this.thiscat.id, 
  
		})
 	},


 	letsMakeTemplate(){

 		//выполнить функцию добавления шаблона к стр
		this.$store.dispatch('letsMakeTemplate')
		this.displaythis ('catTree', 'mainWins') 
 	},


 	
 	openAddElemSettings (catid, cattype){

 		this.$store.dispatch('registerInputsForIncludeOrRemoveElemToPages', {

 			//'mode':'include',
 			'catid':catid,
 			'type':cattype
 		})

 		this.displaythis (catid, 'pagesOneElemAddOrRemove') 

 		  
 	},



 	//настройки инпута для при доб. элемента к стр.
	preferPosiiton (val, catid, type){
		
		this.$store.dispatch('addElemToPageSetts', {

			'value':val,
			'catid':catid,
			'type':type,
			'mode':'position'
		})
	},

	//настройки чекбокса для при доб. элемента к стр.
	toExistTemplate (val, catid, type){

			this.$store.dispatch('addElemToPageSetts', {

			'value':val,
			'catid':catid,
			'type':type,
			'mode':'templateToNewChilds'
		})
	},
 


 

 	addElemToThisPages(){

 		//выполнить функцию добавления элемента на выбранные стр

		this.$store.dispatch('letsAddElemToSelectedPages')
		this.displaythis ('catTree', 'mainWins') 
 	},


 	removeElemFromThisCats(){

		//выполнить функцию удаления элемента с выбранныех стр
		this.$store.dispatch('letsRemoveElemFromSelectedPages')
		this.displaythis ('catTree', 'mainWins') 
 	},



 	delcat(){
		   
 		let way = this.searcher({'a':this.catsNpages, 'b':this.thiscat.id})
 	  
 		return this.$store.dispatch('delFolder', {

 			'willdel':this.thiscat.id, 
 			'parent_id':this.thiscat.parent_id, 
 			'indx':way['indx'], 
 			'parent':way['parent'], 
 			'mode':'cats'
 		})
 	},


 	delFromTrashcat(){
		   
 		let way = this.searcher({'a':this.catsNpages, 'b':this.thiscat.id})
 	  
 		return this.$store.dispatch('delFromTrash', {

 			'willdel':this.thiscat.id, 
 			'indx':way['indx'], 
 			'parent':way['parent'], 
 			'mode':'cats'
 		})
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
 
    },



childsIdRecorder(wayto){

    var childIdarray = []
    var childTypearray = []
    var childParentarray = []
                       
    function recorder(way){
                       
        for (let i in way){
                       
            childIdarray.push(way[i]['id'])
            childTypearray.push(way[i]['type'])
            childParentarray.push(way[i]['parent_id'])

            if (way[i]['childs']){
                       
                recorder(way[i]['childs'])

            }
        }
    }

    recorder(wayto['childs'])
    var childarray = []                  
    childarray['id'] = childIdarray
    childarray['type'] = childTypearray
    childarray['parent'] = childParentarray

    return childarray
                     
},

}




	 
}
 
</script>


 