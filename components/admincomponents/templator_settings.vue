<template>

<div>

	<span 

          @click="displaythis(indexpos, 'pagesTemplateSettings')"
          v-if="templateListPosition[indexpos]"
          class="lined sys mainbuttons">

         {{ buttontitle }}

    </span>


      <div 
          class="displaymodal"
          v-show="showHides[0]['pagesTemplateSettings'][indexpos] == 'show' ? true : false"
          v-if="templateListPosition[indexpos]">
          <span 

            class="closebuttons" 
            @click="displaythis(indexpos, 'pagesTemplateSettings')">

            X

          </span>

        <div class="wraprelative" style="position: relative; height:90%;">
          
        
          <div class="overflower" style="text-align:left; position: relative; padding:5px 20px;">
            
            <div style="width:100%; text-align:center; padding:10px;">
              	
              	<span>
                Настройки вставки блока на другие страницы
              	</span>
          
            </div>
 
            <span>
             
              <span class="lined sys">

                <input 

                  type="radio" 
                  value="startPage" 
                  v-model="templateListPosition[indexpos]['mode']">

                блоком в начале страницы (добавится перед имеющимися элементами)

              </span>

            </span>
            <span>

              <span class="lined sys">
              
                <input 

                  type="radio" 
                  value="endPage" 
                  v-model="templateListPosition[indexpos]['mode']">

                блоком в конце страницы (добавится после имеющихся элементов)

              </span>

            </span>
            <span>

              <span class="lined sys">

                <input 

                  type="radio" 
                  value="insidePage" 
                  v-model="templateListPosition[indexpos]['mode']">

             
                встроить в шаблон (учитывает номера позиций)

              </span>

            </span>
            <div

                v-if="templateListPosition[indexpos]['mode'] == 'insidePage'"
                style="margin-left: 20px;">
              <span>
             
                <span class="lined sys">

                  <input 

                      type="radio" 
                      value="before" 
                      v-model="templateListPosition[indexpos]['insert']">

                  добавлять перед существующими блоками

                </span>

              </span>
              <span>

                <span class="lined sys">
                  <input 

                    type="radio" 
                    value="after" 
                    v-model="templateListPosition[indexpos]['insert']">
       

                    добавлять после существующих блоков

                </span>

              </span>
              <span>

                <span class="lined sys">
                  <input 

                    type="radio" 
                    value="insideBefore" 
                    v-model="templateListPosition[indexpos]['insert']">
       

                    добавлять внутри блоков перед существующими элементами

                </span>

              </span>
              <span>

                <span class="lined sys">
                  <input 

                    type="radio" 
                    value="insideAfter" 
                    v-model="templateListPosition[indexpos]['insert']">
       

                    добавлять внутри блоков после существующих элементов

                </span>

              </span>
            </div>

            <div>
              <span v-if="templateListPosition[indexpos]['mode'] == 'insidePage' || templateListPosition[indexpos]['mode'] == 'startPage'" class="lined sys">

              пропустить в начале 
 
              <input
                 
                style="width:50px;  height:25px; text-align:center;"
                v-model="templateListPosition[indexpos]['fromstart']"
                value="0"
                type="number" 
                min="0"
                >
             
              блоков 

              </span>
              <span v-if="templateListPosition[indexpos]['mode'] == 'insidePage' || templateListPosition[indexpos]['mode'] == 'endPage'" class="lined sys">

                 пропустить в конце

                <input 
                  value="0"
                 
                  v-model="templateListPosition[indexpos]['fromend']"
                  style="width:50px;  height:25px; text-align:center;"
                  type="number" 
                  min="0">
                  
                  блоков 

              </span>
            </div> 
            <div>
              <span v-if="templateListPosition[indexpos]['mode'] == 'insidePage' || templateListPosition[indexpos]['mode'] == 'startPage'"  class="lined sys">
              <input 

                :checked="templateListPosition[indexpos]['passfirst']"
                v-model="templateListPosition[indexpos]['passfirst']"
                type="checkbox" >

               
                пропускать первый блок

              </span>
              <span v-if="templateListPosition[indexpos]['mode'] == 'insidePage' || templateListPosition[indexpos]['mode'] == 'endPage'" class="lined sys">

                <input 

                  :checked="templateListPosition[indexpos]['passlast']"
                  v-model="templateListPosition[indexpos]['passlast']"
                  type="checkbox" >

                  пропускать последний блок

              </span>
            </div>
          </div>

          <span 
            @click="displaythis(indexpos, 'pagesTemplateSettings')"
            class="lined sys mainbuttons">
            ok
          </span>

        </div>
      </div>

</div>

</template>

 

<script>

import { mapState } from 'vuex'
 
export default {

props:['indexpos', 'buttontitle'],

computed:  mapState ( {

	showHides: state =>  state.showhides,

    templateListPosition: state =>  state.templateListPosition


     }),

    methods: {

    displaythis (inshowhidename, wintype) {

       this.$store.dispatch('showHideModal', {'modal':inshowhidename, 'wintype':wintype}) 

    },
  
}

}
</script>


 