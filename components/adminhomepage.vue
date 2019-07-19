<template>
<div>

  <save-changes></save-changes>
 
  <page-settings></page-settings>

  <modalwrapper-pageelems>
    <page-elems slot="a"></page-elems>
  </modalwrapper-pageelems>

  
  <modalwrapper-elemtree>
    <ul slot="a" class="ulbox" v-for="folders in elemTree" :key="folders.id">
      <li  v-if="folders.parent_id == '0'">
       <elem-tree
        :folder="folders"
        :ifDelFlag="'norm'"
        :ifInsideFlag ="'norm'"
        :elemsChecked ="false"
        ></elem-tree>
      </li>
    </ul>
  </modalwrapper-elemtree>


  <modalwrapper-cats>
    <ul slot="a" class="ulbox">
      <li v-for="cat in pageCats" :key="cat.id">
        <cats-tree :thiscat="cat" :isChild="false" ></cats-tree>
      </li>
    </ul>
  </modalwrapper-cats>


  <span 
    
    v-if="Object.keys(templateListPosition).length>1"
    class="lined sys mainbuttons" 
    @click="openCatTreeForMakeTemplate">

      применить отмеченные блоки как шаблон к...

  </span>


  
  <span 
    
    v-if="Object.keys(templateListPosition).length>1"
    class="lined sys">

    натраивать вставку отдельно? 

    <span

          class="lined sys">

      да

      <input 
          type="radio"
          v-model="inputTemplatesMode['mode']"
          value="every" 
          >


    </span>

   
    <span

          class="lined sys">

      нет

      <input 
          type="radio"
          v-model="inputTemplatesMode['mode']"
          value="all" 
          >
 
    </span>

    
  <component

    v-if="inputTemplatesMode['mode'] == 'all'"
    :is="'templator-settings-all'"
    :indexpos="'all'"
    :buttontitle="'настройки вставки всех блоков'"
  ></component>


  </span>
<br>
<br>
<br>



  
      <div v-for="(classez, cla) in elementsData" v-if="cla" :key="cla">
 
        <div v-for="(typez, tpe) in classez" v-if="tpe" :key="tpe">

          <div v-for="(thisis, ths) in typez" v-if="ths" :key="ths">
 
            <component
        
              :is="'elemsetts-'+thisis['0']['id']" 

              :inshowhidename="'elemsetts-'+thisis['0']['id']" 
       
             >
     
              <component 

                 slot="settingspart"
                 
                 :is="'componentsets-'+thisis['0']['el_type']+'-'+thisis['0']['id']" 
 
                 v-bind="thisis['0']"
       
              ></component>
 
            </component>

          </div>

        </div>

      </div>
 


 
  <div class="content_wrap">

  <div 
        v-for="(position, indexpos, posIteration) in pagePos"
        :key="posIteration"
        :class="pagePosClass[indexpos]"
         
  >

    <span class="lined sys"> 
 
      в шаблон 
  
      <input 

      type="checkbox" 
      :checked="templateListPosition[indexpos] ? true : false"
      @change="addToTemplateListPosition({'position':indexpos})">
 
    </span>

    <component

    v-if="inputTemplatesMode['mode'] == 'every'"
    :is="'templator-settings-'+indexpos"
    :indexpos="indexpos"
    :buttontitle="'настройки вставки'"
      >

    </component>

 
    <component
 
      :is="'outerpositions-'+indexpos" 
          
          :poslist="pageSetts['show_outpos'] | splitter"
          :selectedpos="indexpos"

          class="widthauto"
           
    ></component>

    <component
 
       :is="'modalwrapper-outerclasses-'+indexpos"

          class="widthauto"

          :buttontitle="'CSS оберток'"
        
          :inshowhidename="'modalwrapper-outerclasses-'+indexpos" 
    >


      <div  slot="css">

        <component
 
          v-for="(clss, indxx, clsiteration) in classList" 

              :key="clsiteration"
 
              :is="'outerclasses-'+clss['style_cat_alias']+'-'+indexpos" 

              :classes="clss"
              :indx="indxx"
              :hereclass="pagePosClass[indexpos]"
              :outindex="indexpos"
               
        ></component>

      </div>

    </component>


 
    <div

      v-for="(thisposition, indexpoz, numberiteration) in position" 
          
          :key="numberiteration" 
          :class="thisposition.classin"
    > 
      


    <component
           
          :is="'component-'+thisposition.elemtype+'-'+thisposition.elemid" 

  
          :elclass="elementsData[thisposition.elemclass][thisposition.elemtype][thisposition.elemid]['0']['el_class']"

          :eltype="elementsData[thisposition.elemclass][thisposition.elemtype][thisposition.elemid]['0']['el_type']"

          :elid="elementsData[thisposition.elemclass][thisposition.elemtype][thisposition.elemid]['0']['id']"

            
    >

       <component
 
          slot="setsBlock"

         :is="'modalwrapper-'+thisposition.elemtype+'-'+thisposition.elemid" 

          :buttontitle="'Стили элемента'"
          :inshowhidename="'modalwrapper-'+thisposition.elemtype+'-'+thisposition.elemid" 
        >

          <component

          slot="posits"
 
          :is="'innerpositions-'+thisposition.elemtype+'-'+thisposition.elemid" 
         

          :innerPosits="position | posLength"
          :outerPosits = "pageSetts['show_outpos'] | splitter"

          :selectedPos = "indexpoz"
          :selectedOuterPos = "indexpos"
 
           ></component>
 
          <component

          slot="css"

          v-for="(clssi, indxxx) in classList" 
          :key="clssi['style_cat_alias']"
 
          :is="'innerclasses-'+clssi['style_cat_alias']+thisposition.elemtype+'-'+thisposition.elemid" 
          :classes="clssi"

          :indx="indexpos"
          :inindex="indexpoz"

          :indxclass="indxxx"
          :hereclass="thisposition.classin"
         
          ></component>
      
        </component>


      

      </component>

      <div>
        
        <span class="lined mainbuttons" @click="removeElemFromPage(thisposition.elemclass, thisposition.elemtype, thisposition.elemid, indexpos, indexpoz)">убрать со страницы</span>


        <span  slot="setsElem" class="mainbuttons" @click="displaythis('elemsetts-'+thisposition.elemid, 'elemSettings')"> настройки элемента </span>

 
       


      </div>



    </div>

 </div>

  </div>


{{tempArrChecker}}

<style>
{{pageCss}}
</style>
</div>



</template>


<script>
import { mapState } from 'vuex'
import { createComponentAdmin } from './components.js'
import { filters } from './filters'
import axios from "axios"
import Vue from 'vue'
 

export default {

  beforeCreate(){ 

 
    if (this.$store.state.base.jumper.page_positions['']){

      this.$store.dispatch('deleteEmptyArr')
    } 
     // console.log (this.$store.state.base.jumper)
     return createComponentAdmin (this.$store.state.base.jumper.components_list, this.$store.state.base.jumper.page_positions, this.$store.state.base.jumper.class_list)

  },

 
 

   computed:  mapState ( {
 
      pagePos: state => state.base.jumper.page_positions,
         
      pagePosClass: state => state.base.jumper.page_outerclasses,

      elementsData: state => state.base.jumper.elements_data,
 
      pageCats: state =>  state.base.jumper.cats_n_pages,

      pageSetts: state =>  state.base.jumper.page_settings['0'],

      pageCss: state =>  state.base.jumper.page_css,

      classList: state =>  state.base.jumper.class_list,

      elemTree: state =>  state.base.jumper.elems_folders,

      showHides: state =>  state.showhides,

      templateListPosition: state =>  state.templateListPosition,

      inputTemplatesMode: state => state.inputTemplatesMode,

      tempArrChecker: state => state.tempArrChecker

      }),


    methods: {

    displaythis (inshowhidename, wintype) {

       this.$store.dispatch('showHideModal', {'modal':inshowhidename, 'wintype':wintype}) 

    },

    removeElemFromPage (elclass, eltype, elid, outpos, inpos){
 
          this.$store.dispatch('removeElemFromPage', {

            'show_elemclass':elclass,
            'show_elemtype':eltype,
            'show_elemid':elid,
            'outpos':outpos,
            'inpos':inpos,
            'page_id': this.pageSetts.id
             
          })

    },

 
    openCatTreeForMakeTemplate(){
 
      this.$store.dispatch('openCatTreeForMakeTemplate', {
 
        'mode':'checkCats',
        'submode':'makeTemplate'
      })

      this.displaythis ('catTree', 'mainWins')
    },
 

    addToTemplateListPosition(position){

        this.$store.dispatch('addToTemplateListPosition', {
 
          'position':position  
      })
    }
  },


 
 beforeDestroy: function () {
    this.$parent = null
    this.$store.dispatch('clearAllData')
  }



}
</script>




<style lang="stylus">


  select
    background-color #fff
    padding 3px 5px 3px 5px
    border 1px solid #ccc
    
   

  div
    vertical-align top

  .removeoutcss * 
    font-size 14px
    text-align center
    padding 0px
    margin 0px


  .content_wrap

    background-color #fff
  

  .ulbox 

    list-style none
    text-align left
    width 100%
    padding 0px

   & ul
    margin 0px
    padding 0px 0px 0px 0px

   & li
    cursor pointer
    list-style none
    margin 0px
 
 
 .displaymodal 
    display block
    position fixed
    width 50%
    height 50%
    top 0px
    left 0px
    right 0px
    bottom 0px
    margin auto
    overflow hidden
    padding 0px  0px  10px  0px
    background-color #f7f7f7
    box-shadow 0px 0px 12px #333

  .displaybigmodal 
    display block
    position fixed
    width 80%
    height 80%
    top 0px
    left 0px
    right 0px
    bottom 0px
    margin auto
    overflow hidden
    padding 0px  0px  10px  0px
    background-color #f7f7f7
    box-shadow 0px 0px 12px #333

 
  .beforeblackback
    content ''
    background-color rgba(0,0,0,0.3)
    z-index -0!impotant
    width 100%
    height 100%
    position fixed
    top 0px
    left 0px
    cursor pointer


  .eldisplayblock
    position relative
    display block

  .overflower

    position relative
    display block
    width 100%
    height 80% 
    
    overflow-y auto
    overflow-x none
    word-wrap auto
    background-color #f9f9f9
    word-break break-all
    border-top 1px solid #ccc
    border-bottom 1px solid #ccc
    margin 34px 0px 12px 0px
    padding 25px 0px

  .overflower *

    box-sizing border-box

  .wraprelative
    width 100%
   
    position relative





  .closebuttons

    position absolute
    top 0px
    right 0px
    background-color orange
    padding 8px 15px
    cursor pointer
    border-radius 0px 0px 0px 12px


  .lined 
    display inline-block

  .sys 
    font-size 12px
    padding 3px 5px
   
  .mainbuttons
    padding 3px 5px 3px 5px
    border 1px solid #ccc
    cursor pointer
    display inline-block
    line-height 18px
    font-size 11px
    font-weight 600
    color #555
    z-index 2

    &:hover
      background-color #f1ecf0
      
       

  .widthauto 
    width auto
    display inline-block
 

  .tree_folder_wrpper

    
      padding:2px 40px
      position relative
      vertical-align middle
      

  .ulbox ul

      
      padding-left 20px
      margin-left -10px!important
      background #fff



  .tree_folder_wrpper .tree_folder_title

      text-transform uppercase
      font-weight 400


  .tree_folder_wrpper .tree_folder_title:hover
 
      color #116062

  .tree_folder_wrpper .tree_folder_title:hover .abspos

      color #333

 
  .tree_folder_childs_div .tree_folder_wrpper 
 
      padding:0px 60px 



   .tree_folder_childs_div .tree_folder_wrpper .tree_folder_title

      text-transform none
      font-weight 300     
      padding 5px 0px
     

 
  .tree_folder_title

      text-align left
      font-size 14px
      display inline-block
      width 100%
      overflow hidden

 

  .abspos 

      position absolute
      top 100%
      width 350px
      padding 4px 24px 0px 4px!important
      border 1px solid #ccc
      border-radius 3px
      box-shadow 1px 1px 5px #ccc
      background-color #f1f1f1
      z-index 999
      margin-left -60px
      

  .abspos div
      text-align left
  
  .abspos div .mainbuttons
      margin-bottom 4px
      margin-right 4px
 
      


  .submenuclose

      position absolute
      top -4px
      bottom 0px
      margin auto
      right -24px
      border-radius 0px 3px 3px 0px
      color #888
      font-size 12px
      padding 8px 
      cursor pointer
      background-color #f1f1f1
      border-left 1px solid #ccc
 
 

  .submenuclose:hover

      color #322358
      background #ccc
  

  .tree_folder_settigs_wrap

      text-align left
      

  .tree_folder_childs_div 
 
      text-align left
      
 

  .tree_folder_elements
  
      padding 0px 40px 0px 60px
      color #444
      cursor auto
     
 

  .tree_folder_elements_title

      text-align left
      font-size 12px
      padding 5px 0px
      position relative

  .tree_folder_elements_settings

      text-align left
      padding 5px 0px


  .tree_folder_elements_empty 

      text-align left
      width 100%
      color #171a20
      font-size 12px
      margin-left 60px


  .pagesintree span

      font-weight 300!important
      font-size 12px!important
      text-transform none

</style>