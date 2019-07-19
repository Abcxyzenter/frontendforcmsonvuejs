import Vue from 'vue'
import { createComponentAdmin } from './../components/components.js'
import { registerNewElem } from './../components/components.js'
import { registerWrapperComponents } from './../components/components.js'


function lilsearcher(datas){

    var stopper='0'
    var actualway

    function lilstartersearcher (list){
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

                    lilstartersearcher (list[f]['childs'])

                }
            }
        }
    }

    lilstartersearcher(datas['a'])

    return  actualway

}


function childsIdRecorder(wayto){

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

}





export default {

    check(state, fdata){

        Vue.set(this.state, 'tempArrChecker', fdata )

    },

    firstSetBase (state, firstData){


    Vue.set(this.state, 'base', firstData)


    },



    hideModal (state, componentname){

     if (this.state.showhides[0][componentname['wintype']][componentname['modal']] == undefined){

        Vue.set( this.state.showhides[0][componentname['wintype']], componentname['modal'], 'hide')
     }

    Vue.set( this.state.showhides[0][componentname['wintype']], componentname['modal'], 'hide')

    },



    showHideModal (state, componentname){


     if (this.state.showhides[0][componentname['wintype']][componentname['modal']] == undefined){

        Vue.set( this.state.showhides[0][componentname['wintype']], componentname['modal'], 'hide')
     }

 	if (this.state.showhides[0][componentname['wintype']][componentname['modal']] == 'hide'){

        Vue.set( this.state.showhides[0][componentname['wintype']], componentname['modal'], 'show')

        }

    else{

        Vue.set( this.state.showhides[0][componentname['wintype']], componentname['modal'], 'hide')

        }
    },


    setEldata (state, eldata){

    	let a = eldata['el_class']
    	let b = eldata['el_type']
    	let c = eldata['id']

     	this.state.base.jumper.elements_data[a][b][c]['0'] = Object.assign({}, this.state.base.jumper.elements_data[a][b][c]['0'], eldata)

     	this.state.edited.push({'el_class':a, 'el_type':b, 'id':c})

    },


    renameThisPlease(context, data){

        Vue.set(data['way'], data['what'], data['newname'])

    },


    toTrash (context, data){


       let nlen = Object.keys(data['trash']).length

       Vue.set(data['trash'], nlen, data['way'])
       Vue.delete(data['parent'], data['indx'])

    },

    delPlease (context, data){

      Vue.delete(data['parent'], data['indx'])

    },


    cancelCatOperations (context){

        Vue.set( this.state.catOperations['0'], 'cattree', 'normal')
        Vue.set( this.state.catOperations['0'], 'catsubmode', '')
        Vue.set(this.state.catOperations['0'], 'cattmp', '')
        Vue.set(this.state.catOperations['0'], 'catChilds', {})
    },


    catTreeModeCustom (context, vals){

       Vue.set( this.state.catOperations['0'], 'cattree', vals['mode'])
       Vue.set( this.state.catOperations['0'], 'catsubmode', vals['submode'])
    },


    catTreeModeWithTomove (context, tomove){


        Vue.set(this.state.catOperations['0'], 'cattree', 'selectcat')
        Vue.set(this.state.catOperations['0'], 'cattmp', tomove['tomove'])
        Vue.set(this.state.catOperations['0'], 'catChilds', tomove['childs'])

    },

    setCatsForCheckBoxes(context){

        Vue.set(this.state.catOperations['0'], 'catChilds', {})

    },


    registerInputsForIncludeOrRemoveElemToPages(context, setts){

        if (this.state.catOperations['0']['catChilds'][setts['catid']] && this.state.catOperations['0']['catChilds'][setts['catid']]['position']){

            return false
        }

        else {

            if (this.state.catOperations['0']['catChilds'][setts['catid']]== undefined ){

                Vue.set(this.state.catOperations['0']['catChilds'], setts['catid'], {})
                Vue.set(this.state.catOperations['0']['catChilds'][setts['catid']], 'position', '1')
                Vue.set(this.state.catOperations['0']['catChilds'][setts['catid']], 'type', setts['type'])
            }

            if (this.state.catOperations['0']['catChilds'][setts['catid']] && this.state.catOperations['0']['catChilds'][setts['catid']]['position'] == undefined){

                Vue.set(this.state.catOperations['0']['catChilds'][setts['catid']], 'position', '1')
                Vue.set(this.state.catOperations['0']['catChilds'][setts['catid']], 'type', setts['type'])
            }
        }
    },



    addElemToPageSetts(context, val){

         Vue.set(this.state.catOperations['0']['catChilds'][val['catid']], val['mode'], val['value'])
         Vue.set(this.state.catOperations['0']['catChilds'][val['catid']], 'type', val['type'])

        // console.log(this.state.catOperations['0']['catChilds'][val['catid']])
    },



    checkThisCat(context, datas){


     //   console.log(datas)


        let a = datas['cat']
        let arr = this.state.catOperations['0']['catChilds']

        var newval

        if (!arr[a]){

            newval = true
            Vue.set(this.state.catOperations['0']['catChilds'], a, {})
        }

        else {

            arr[a]['checkedCat'] == true ? newval = false : newval = true
        }

        Vue.set(this.state.catOperations['0']['catChilds'][a], 'checkedCat', newval)
        Vue.set(this.state.catOperations['0']['catChilds'][a], 'templateToNewChilds', false)


        //а теперь надо рекурсивно добавить все чайльды...

        let willcheck = lilsearcher({'a':this.state.base.jumper.cats_n_pages, 'b':datas['cat']})

        let childs = childsIdRecorder(willcheck['way'])

        for (let i = 0; i<childs['id'].length; i++){

            //сначала создадим незозданные массивы категорий
            if (childs['type'][i] == 'cat'){

                if (!arr[childs['id'][i]]){

                    Vue.set(this.state.catOperations['0']['catChilds'], childs['id'][i], {})

                    }

                Vue.set(this.state.catOperations['0']['catChilds'][childs['id'][i]], 'checkedCat', newval)
                Vue.set(this.state.catOperations['0']['catChilds'][childs['id'][i]], 'templateToNewChilds', false)

                }

            //добавляем значения для вложенных в категорию страниц
            if (childs['type'][i] == 'page'){

                if(!arr[childs['parent'][i]]){

                    Vue.set(this.state.catOperations['0']['catChilds'], childs['parent'][i], {})
                    Vue.set(this.state.catOperations['0']['catChilds'][childs['parent'][i]], 'checkedCat', newval)
                }

                Vue.set(this.state.catOperations['0']['catChilds'][childs['parent'][i]], childs['id'][i], newval)

            }
        }


         //   console.log(this.state.catOperations['0']['catChilds'])

    },


    checkThisPage(context, datas){

    //    console.log(datas)

        let a = datas['cat']
        let b = datas['page']
        let arr = this.state.catOperations['0']['catChilds']


        if (!arr[a]){

        //    console.log('no cat in catChilds')

            Vue.set(this.state.catOperations['0']['catChilds'], a, {})
            Vue.set(this.state.catOperations['0']['catChilds'][a], 'checkedCat', false)
            Vue.set(this.state.catOperations['0']['catChilds'][a], 'templateToNewChilds', false)

            if (this.state.catOperations[0]['catsubmode'] == 'addElemToCats'){

                Vue.set(this.state.catOperations['0']['catChilds'][a], 'type', 'cat')
                Vue.set(this.state.catOperations['0']['catChilds'][a], 'position', '1')

            }
        }

        let newval

        this.state.catOperations['0']['catChilds'][a][b] == true ? newval = false : newval = true

        Vue.set(this.state.catOperations['0']['catChilds'][a], b, newval)

        //    console.log(this.state.catOperations['0']['catChilds'])

    },


    //предполагается, что ячейка templateToNewChilds создана при отметке чекбокса категории
    //ну это если будет ругаться про undefined
    templateToNewChilds(context, datas){

        let a = datas['cat']
        let arr = this.state.catOperations['0']['catChilds']

        var newval

        arr[a]['templateToNewChilds'] == true ? newval = false : newval = true

        Vue.set(this.state.catOperations['0']['catChilds'][a], 'templateToNewChilds', newval)

        let willcheck = lilsearcher({'a':this.state.base.jumper.cats_n_pages, 'b':datas['cat']})

        let childs = childsIdRecorder(willcheck['way'])

        for (let i = 0; i<childs['id'].length; i++){

            //сначала создадим незозданные массивы категорий
            if (childs['type'][i] == 'cat'){

                Vue.set(this.state.catOperations['0']['catChilds'][childs['id'][i]], 'templateToNewChilds', newval)

            }

        }

    },





    refreshChildlist (context, childs){

        Vue.set(this.state.catOperations['0'], 'cattree', 'selectcat')
        Vue.set(this.state.catOperations['0'], 'catChilds', childs['childs'])

    },






    letsMoveCat (context, newparent){

        if (!newparent['newparent']['way']['childs']){  Vue.set(newparent['newparent']['way'], 'childs', {})}

            Vue.set(newparent['newparent']['way']['childs'], '0', this.state.catOperations['0']['cattmp']['way'])

            Vue.delete(this.state.catOperations['0']['cattmp']['parent'], this.state.catOperations['0']['cattmp']['indx'])


            Vue.set(this.state.catOperations['0'], 'cattmp', '')
            Vue.set(this.state.catOperations['0'], 'catChilds', {})
            Vue.set(this.state.catOperations['0'], 'catsubmode', '')
            Vue.set(this.state.catOperations['0'], 'cattree', 'normal')

    },


    letsCreateElemHere (context, datas){

        let a = datas['new']['el_class']
        let b = datas['new']['el_type']
        let c = datas['new']['id']

        //добавляем свежесозданный элемент
        Vue.set(this.state.base.jumper.elements_data[a][b], c, {})
        Vue.set(this.state.base.jumper.elements_data[a][b][c], '0', datas['new'])

        //регистрируем связанные компоненты
        registerNewElem ({'class':a, 'type':b, 'id':c, 'template':'default'})


        //обновляем elements_id_here
        let newElemIdHere

        if (datas['waydata']['way']['elem_id_here'] == undefined || datas['waydata']['way']['elem_id_here'] == '') {newElemIdHere = datas['new']['id']}
            else {newElemIdHere = datas['new']['id']+','+datas['waydata']['way']['elem_id_here']}

        Vue.set(datas['waydata']['way'], 'elem_id_here', newElemIdHere)

    },


    showFolderToMoveElem(context, datas){

        Vue.set(this.state.elemsOperations, '0', datas['datas'])
        Vue.set(this.state, 'elemTreeMode', 'foldersForElement')

    },


    cancelElemOperations (context){

        Vue.set(this.state.elemsOperations[0], {})
        Vue.set(this.state, 'elemTreeMode', 'normal')
    },



    toTrashElem(context, datas){

        Vue.set (this.state.elemsOperations[0],'elem_id', datas['elemid'] )
        Vue.set (this.state.elemsOperations[0],'old_way', {} )
        Vue.set (this.state.elemsOperations[0]['old_way'], 'way', datas['way']['way'])

    },


    letsMoveElemOne(context, parent){

        //удаляем из старого блока
        let willremove = this.state.elemsOperations[0]['old_way']['way']

        let withoutRemoved = willremove['elem_id_here'].split(',')

            for (let i=0; i<withoutRemoved.length; i++){

                if (withoutRemoved[i] == this.state.elemsOperations[0]['elem_id']){

                    withoutRemoved.splice(i,1)
                }
            }

        let refreshOldStr = withoutRemoved.join(',')

        Vue.set(this.state.elemsOperations[0]['old_way']['way'], 'elem_id_here', refreshOldStr)

        //добавляем элемент в новое место
        let newParent = parent['parent']['new_way']['way']

        if (newParent['elem_id_here']) {
         Vue.set(newParent, 'elem_id_here', newParent['elem_id_here']+','+this.state.elemsOperations[0]['elem_id'])
        }
        else {
         Vue.set(newParent, 'elem_id_here', this.state.elemsOperations[0]['elem_id'])
        }

        Vue.set(this.state.elemsOperations[0], {})
        Vue.set(this.state, 'elemTreeMode', 'normal')
    },



    showCheckbxForMoveElems(context, datas){

        Vue.set(this.state.elemsOperations, '0', datas['datas'])
        Vue.set(this.state, 'elemTreeMode', 'showCheckbxForMoveElems')

    },





    insertElemFolderToGroupSet (context, datas){

        if ( !this.state.elemsOperations[0]['groupSet']){

            Vue.set(this.state.elemsOperations[0], 'groupSet', {})
            Vue.set(this.state.elemsOperations[0]['groupSet'], 'unchecked', {})
        }

        if ( !this.state.elemsOperations[0]['elemSet']){

            Vue.set(this.state.elemsOperations[0], 'elemSet', {})
            this.state.elemsOperations[0]['elemSet']['unchecked']
        }

        if (this.state.elemsOperations[0]['groupSet']['unchecked'][datas['id']]){

             Vue.delete(this.state.elemsOperations[0]['groupSet']['unchecked'], datas['id'])

        }

        Vue.set(this.state.elemsOperations[0]['groupSet'], datas['id'], datas)

    },


     removeElemFolderFromGroupSet (context, datas){

        if (this.state.elemsOperations[0]['groupSet'][datas['id']]){

        Vue.delete(this.state.elemsOperations[0]['groupSet'], datas['id'])}

        if (!this.state.elemsOperations[0]['groupSet']['unchecked']){

            Vue.set(this.state.elemsOperations[0]['groupSet'], 'unchecked', {})
        }

        Vue.set(this.state.elemsOperations[0]['groupSet']['unchecked'], datas['id'], datas)

    },



   insertElemToSelect (context, datas){

        if ( !this.state.elemsOperations[0]['elemSet']){

            Vue.set(this.state.elemsOperations[0], 'elemSet', {})
            this.state.elemsOperations[0]['elemSet']['unchecked']
        }

        if ( !this.state.elemsOperations[0]['groupSet']){

            Vue.set(this.state.elemsOperations[0], 'groupSet', {})
            Vue.set(this.state.elemsOperations[0]['groupSet'], 'unchecked', {})
        }

        if (this.state.elemsOperations[0]['elemSet']['unchecked']){

             if (this.state.elemsOperations[0]['elemSet']['unchecked'][datas['id']]){

             Vue.delete(this.state.elemsOperations[0]['elemSet']['unchecked'], datas['id'])

             }
        }

        Vue.set(this.state.elemsOperations[0]['elemSet'], datas['id'], datas)

    },




    removeElemFromSelect (context, datas){

        if ( !this.state.elemsOperations[0]['elemSet']){

            Vue.set(this.state.elemsOperations[0], 'elemSet', {})
            this.state.elemsOperations[0]['elemSet']['unchecked']
        }

        if ( !this.state.elemsOperations[0]['groupSet']){

            Vue.set(this.state.elemsOperations[0], 'groupSet', {})
            Vue.set(this.state.elemsOperations[0]['groupSet'], 'unchecked', {})
        }

        if (this.state.elemsOperations[0]['elemSet'][datas['id']]){

        Vue.delete(this.state.elemsOperations[0]['elemSet'], datas['id'])

         if (!this.state.elemsOperations[0]['elemSet']['unchecked']){

            Vue.set(this.state.elemsOperations[0]['elemSet'], 'unchecked', {})
        }

        Vue.set(this.state.elemsOperations[0]['elemSet']['unchecked'], datas['id'], datas)

        }

    },




    letsMoveCheckedElems (context, datas){


         //переместить
         //uncheck all

      //дропнуть this.state.elemsOperations[0]
      Vue.set(this.state.elemsOperations, '0', {})
    },




    //добавить элемент в единственном экземпляре в elemsOperations
    addElemForOperations(context, datas){
      //сначала почистим elemOperations
      Vue.set(this.state.elemsOperations, '0', {})

      Vue.set(this.state.elemsOperations[0], 'elem', datas['elemid'])


    },


    addToTemplateListPosition(context, position){

        let positionslist = this.state.templateListPosition

        let pos = parseInt(position['position']['position'])

        if (positionslist[pos] && pos !== 'all'){

            Vue.delete(this.state.templateListPosition, pos)
        }

        else {

            if ( pos !== 'all' ){

            Vue.set(this.state.templateListPosition, pos, {})
            Vue.set(this.state.templateListPosition[pos], 'id', pos)
            Vue.set(this.state.templateListPosition[pos], 'mode', 'insidePage')
            Vue.set(this.state.templateListPosition[pos], 'insert', 'insideAfter')
            Vue.set(this.state.templateListPosition[pos], 'fromstart', '0')
            Vue.set(this.state.templateListPosition[pos], 'fromend', '0')
            Vue.set(this.state.templateListPosition[pos], 'passfirst', false)
            Vue.set(this.state.templateListPosition[pos], 'passlast', false)

            Vue.set( this.state.showhides[0]['pagesTemplateSettings'], pos, 'hide')

            }
        }
     // console.log(this.state.templateListPosition)
    },


    addElemToThisPage (context, datas){


        Vue.set(this.state.base.jumper.page_settings['0'], 'show_elemclass', datas['pageElemClasses'])
        Vue.set(this.state.base.jumper.page_settings['0'], 'show_elemtype', datas['pageElemTypes'])
        Vue.set(this.state.base.jumper.page_settings['0'], 'show_elemid', datas['pageElemIds'])
        Vue.set(this.state.base.jumper.page_settings['0'], 'show_outpos', datas['pageOutpos'])
        Vue.set(this.state.base.jumper.page_settings['0'], 'show_inpos', datas['pageInpos'])
        Vue.set(this.state.base.jumper.page_settings['0'], 'show_outcls', datas['pageOutclass'])
        Vue.set(this.state.base.jumper.page_settings['0'], 'show_incls', datas['pageInclass'])


        Vue.set(this.state.base.jumper.page_outerclasses, Object.keys(this.state.base.jumper.page_outerclasses).length+1, '*')

        let newOutPos = Object.keys(this.state.base.jumper.page_positions).length+1

         Vue.set(this.state.base.jumper.page_positions, newOutPos, {})
         Vue.set(this.state.base.jumper.page_positions[newOutPos], '1', {})
         Vue.set(this.state.base.jumper.page_positions[newOutPos]['1'], 'classin','')
         Vue.set(this.state.base.jumper.page_positions[newOutPos]['1'], 'elemclass', datas['show_elemclass'])
         Vue.set(this.state.base.jumper.page_positions[newOutPos]['1'], 'elemtype', datas['show_elemtype'])
         Vue.set(this.state.base.jumper.page_positions[newOutPos]['1'], 'elemid', datas['show_elemid'])


    //зарегистрировать обертки для компонентов
    registerWrapperComponents (datas['show_elemtype'], datas['show_elemid'], newOutPos, this.state.base.jumper.class_list)

    //обновить page_included_in
    let includedToPages = []

    if (this.state.base.jumper.elements_data[datas['show_elemclass']][datas['show_elemtype']][datas['show_elemid']][0]['included_to_pages']){
    includedToPages = this.state.base.jumper.elements_data[datas['show_elemclass']][datas['show_elemtype']][datas['show_elemid']][0]['included_to_pages'].split(',')
    }

     if (includedToPages[0] == ''){includedToPages[0] = datas['page_id']}
            else {
                 includedToPages.push(datas['page_id'])
          }

    Vue.set(this.state.base.jumper.elements_data[datas['show_elemclass']][datas['show_elemtype']][datas['show_elemid']][0], 'included_to_pages', includedToPages.join(','))

    //отмечаем элемент, как отредактированный
    this.state.edited.push({'el_class':datas['show_elemclass'], 'el_type':datas['show_elemtype'], 'id':datas['show_elemid']})

    },







    removeElemFromPage (context, datas){


        let allPageShow = this.state.base.jumper.page_settings['0']

        let showoutpos = allPageShow['show_outpos'].split(',')
        let showinpos = allPageShow['show_inpos'].split(',')

        let showElClass = allPageShow['show_elemclass'].split(',')
        let showElType = allPageShow['show_elemtype'].split(',')
        let showElId = allPageShow['show_elemid'].split(',')
        let showOutClassList = allPageShow['show_outcls'].split(',')
        let showInnerClassList = allPageShow['show_incls'].split(',')


        let positionState = this.state.base.jumper.page_positions[datas['outpos']]


        //найти в show и удалить
        for (let i=0; i<showoutpos.length; i++){

            if (showoutpos[i] == datas['outpos'] && showinpos[i] == datas['inpos']){

                showoutpos.splice(i,1)
                showinpos.splice(i,1)
                showElClass.splice(i,1)
                showElType.splice(i,1)
                showElId.splice(i,1)
                showOutClassList.splice(i,1)
                showInnerClassList.splice(i,1)

            }

        }

        //отдельным циклом, т.к. значения неупорядочены
        for (let i=0; i<showoutpos.length; i++){

             if (showoutpos[i] == parseInt(datas['outpos']) && showinpos[i] > parseInt(datas['inpos'])){

                showinpos[i] = parseInt(showinpos[i])-1
            }

            if (!positionState[parseInt(datas['inpos'])+1] && datas['inpos'] == 1){

                if (showoutpos[i] > parseInt(datas['outpos'])){

                    showoutpos[i] = parseInt(showoutpos[i])-1
                }
            }
        }

        Vue.set(this.state.base.jumper.page_settings['0'], 'show_elemclass', showElClass.join(','))
        Vue.set(this.state.base.jumper.page_settings['0'], 'show_elemtype', showElType.join(','))
        Vue.set(this.state.base.jumper.page_settings['0'], 'show_elemid', showElId.join(','))
        Vue.set(this.state.base.jumper.page_settings['0'], 'show_outpos', showoutpos.join(','))
        Vue.set(this.state.base.jumper.page_settings['0'], 'show_inpos', showinpos.join(','))
        Vue.set(this.state.base.jumper.page_settings['0'], 'show_outcls', showOutClassList.join(','))
        Vue.set(this.state.base.jumper.page_settings['0'], 'show_incls', showInnerClassList.join(','))

        //удаление из массива позиций
        if (!positionState[parseInt(datas['inpos'])+1]){

            Vue.delete (this.state.base.jumper.page_positions[datas['outpos']], datas['inpos'])

        }

        else {

            for (let i = parseInt(datas['inpos']); i <= (Object.keys(this.state.base.jumper.page_positions[datas['outpos']]).length - parseInt(datas['inpos'])+1); i++){

                Vue.set(this.state.base.jumper.page_positions[datas['outpos']], i, this.state.base.jumper.page_positions[datas['outpos']][i+1])
            }

            Vue.delete (this.state.base.jumper.page_positions[datas['outpos']], Object.keys(this.state.base.jumper.page_positions[datas['outpos']]).length)

        }

        if (Object.keys(this.state.base.jumper.page_positions[parseInt(datas['outpos'])]).length == 0){


            if (this.state.base.jumper.page_positions[parseInt(datas['outpos'])+1] ){

                for (let i = parseInt(datas['outpos']); i <= (Object.keys(this.state.base.jumper.page_positions).length-parseInt(datas['outpos'])+1); i++){

                    Vue.set(this.state.base.jumper.page_positions, i, this.state.base.jumper.page_positions[i+1])
                    Vue.set(this.state.base.jumper.page_outerclasses, i, this.state.base.jumper.page_outerclasses[i+1])
                }

                Vue.delete (this.state.base.jumper.page_positions,  Object.keys(this.state.base.jumper.page_positions).length)
                Vue.delete (this.state.base.jumper.page_outerclasses,  Object.keys(this.state.base.jumper.page_outerclasses).length)
            }

            else {

                    Vue.delete (this.state.base.jumper.page_positions,  Object.keys(this.state.base.jumper.page_positions).length)
                    Vue.delete (this.state.base.jumper.page_outerclasses,  Object.keys(this.state.base.jumper.page_outerclasses).length)
            }

        }

     //обновляем included_to_pages
    if (datas['show_elemclass'] !== 'page'){

       let includedToPages = this.state.base.jumper.elements_data[datas['show_elemclass']][datas['show_elemtype']][datas['show_elemid']]['0']['included_to_pages'].split(',')

        for (let i=0; i<includedToPages.length; i++){

          if (includedToPages[i] == parseInt(datas['page_id'])){

              includedToPages.splice(i,1)
            }
         }

      Vue.set(this.state.base.jumper.elements_data[datas['show_elemclass']][datas['show_elemtype']][datas['show_elemid']]['0'], 'included_to_pages', includedToPages.join(','))

      }

    this.state.edited.push({'el_class':datas['show_elemclass'], 'el_type':datas['show_elemtype'], 'id':datas['show_elemid']})

    },




    insertEldata (state, eldata){

    	let a = eldata['el_class']
    	let b = eldata['el_type']
    	let c = eldata['id']



    	if (this.state.base.jumper.elements_data[a] == undefined) {

    		Vue.set( this.state.base.jumper.elements_data, a, {})

    		Vue.set( this.state.base.jumper.elements_data[a], b, {})

    		Vue.set( this.state.base.jumper.elements_data[a][b], c, eldata)

    	 	Vue.set( this.state.base.jumper.elements_data[a][b][c], '0',  eldata)


    	}

    	if (this.state.base.jumper.elements_data[a] !== undefined) {

    		if (this.state.base.jumper.elements_data[a][b] == undefined)

    		{

    			Vue.set( this.state.base.jumper.elements_data[a], b, {})

    			Vue.set( this.state.base.jumper.elements_data[a][b], c, {})

    			Vue.set( this.state.base.jumper.elements_data[a][b][c], '0',  eldata)

     		}
    	}



    	if (this.state.base.jumper.elements_data[a] !== undefined) {

    		if (this.state.base.jumper.elements_data[a][b] !== undefined){

    		Vue.set( this.state.base.jumper.elements_data[a][b], c, {})

    	 	Vue.set( this.state.base.jumper.elements_data[a][b][c], '0',  eldata)

   		}
   		}


   		//регистрируем связанные компоненты
   		registerNewElem ({'class':a, 'type':b, 'id':c, 'template':eldata['el_template']})

    },



    setElemDataFolder (context, folder){

        Vue.set (this.state.base.jumper.elements_data, folder['folder'], {})
        Vue.set (this.state.base.jumper.elements_data[folder['folder']], folder['subfolder'], {})

    },


    setElemDataSubFolder (context, folder){

        Vue.set (this.state.base.jumper.elements_data[folder['folder']], folder['subfolder'], {})
    },



    loadTrashElems(context, datas){

        //циклом вставляем прилетевшее

        let trashFolderArr = {}

        for (let i in datas['deleted']){

            let d = datas['deleted'][i][0]

            if(d['el_template'] !== undefined){

                if (!this.state.base.jumper.elements_data[d['el_class']]){

                    Vue.set(this.state.base.jumper.elements_data, d['el_class'], {})
                    Vue.set(this.state.base.jumper.elements_data[d['el_class']], d['el_type'], {})

                    }

                if (!this.state.base.jumper.elements_data[d['el_class']][d['el_type']]){

                    Vue.set(this.state.base.jumper.elements_data[d['el_class']], d['el_type'], {})

                    }

                    Vue.set (this.state.base.jumper.elements_data[d['el_class']][d['el_type']], d['id'], {})
                    Vue.set (this.state.base.jumper.elements_data[d['el_class']][d['el_type']][d['id']], '0', d)

                    //регистрируем связанные компоненты
                    registerNewElem ({'class':d['el_class'], 'type':d['el_type'], 'id':d['id'], 'template':d['el_template']})

                //заливаем в массив корзины
                trashFolderArr[d['id']] = d
            }
        }

        Vue.set (this.state.base.jumper.elems_folders,'elems', trashFolderArr)

    },



    toVuexThisCatList (context, freshdata) {

    	var fresh

    	if (freshdata['mode'] == 'cats') {fresh = freshdata['freshdata']}

    	if (freshdata['mode'] == 'elemfolder') {fresh = freshdata['freshdata']['folders']}

		let arrayNewElems = [];

   		for (var catdata in fresh)
   		 { if (fresh[catdata]['id']) {arrayNewElems.push(fresh[catdata]);} };

    	Vue.set(freshdata['way'], 'childs', arrayNewElems)




            //ЕСЛИ ДЕРЕВО КАТЕГОРИЙ В РЕЖИМЕ ПЕРЕМЕЩЕНИЯ КАТЕГОРИИ В КАТЕГОРИЮ
            //проверяем, если среди свежеподгруженных есть папки, вложенные в перемещаемую категорию
            if (this.state.catOperations['0']['cattree'] == 'selectcat' && this.state.catOperations['0']['catChilds']){

                 //ну уж точно уточним, что есть еще и категория, которую перемещаем
                if (this.state.catOperations['0']['cattmp']['way']['id']){

                    let tomove = lilsearcher({'a':this.state.base.jumper.cats_n_pages, 'b':this.state.catOperations['0']['cattmp']['way']['id']})

                    let childs = childsIdRecorder(tomove['way'])

                    Vue.set(this.state.catOperations['0'], 'catChilds', childs['id'])

                }
            }



            //если дерево категорий в режиме чекбоксов
            if (this.state.catOperations['0']['cattree'] == 'checkCats' && this.state.catOperations['0']['catChilds'][freshdata['freshdata'][0]['parent_id']]){

                var arr = this.state.catOperations['0']['catChilds']
                var newval = this.state.catOperations['0']['catChilds'][freshdata['freshdata'][0]['parent_id']]['checkedCat']
                var templateToNewChilds = this.state.catOperations['0']['catChilds'][freshdata['freshdata'][0]['parent_id']]['templateToNewChilds']

                    let willcheck = lilsearcher({'a':this.state.base.jumper.cats_n_pages, 'b':freshdata['freshdata'][0]['parent_id']})

                    let childs = childsIdRecorder(willcheck['way'])

                    for (let i = 0; i<childs['id'].length; i++){

                        //сначала создадим незозданные массивы категорий
                        if (childs['type'][i] == 'cat'){

                            if (!arr[childs['id'][i]]){

                                Vue.set(this.state.catOperations['0']['catChilds'], childs['id'][i], {})

                                }

                            Vue.set(this.state.catOperations['0']['catChilds'][childs['id'][i]], 'checkedCat', newval)
                            Vue.set(this.state.catOperations['0']['catChilds'][childs['id'][i]], 'templateToNewChilds', templateToNewChilds)

                            }

                        //добавляем значения для вложенных в категорию страниц
                        if (childs['type'][i] == 'page'){

                            if(!arr[childs['parent'][i]]){

                                Vue.set(this.state.catOperations['0']['catChilds'], childs['parent'][i], {})
                                Vue.set(this.state.catOperations['0']['catChilds'][childs['parent'][i]], 'checkedCat', newval)
                                Vue.set(this.state.catOperations['0']['catChilds'][childs['parent'][i]], 'templateToNewChilds', templateToNewChilds)

                            }

                            Vue.set(this.state.catOperations['0']['catChilds'][childs['parent'][i]], childs['id'][i], newval)

                        }
                    }
            }

    },




    blockPosition (context, pos){

        //чистим если там пустой массив был
        if (this.state.base.jumper.page_outerclasses['']){Vue.delete(this.state.base.jumper.page_outerclasses, '')}
        if (this.state.base.jumper.page_positions['']){Vue.delete(this.state.base.jumper.page_positions, '')}


    	let oldPos = pos['oldPosition']
    	let newPos = pos['newPosition']


    	//последовательность pagePos
    	let pagePos = this.state.base.jumper.page_positions
    	//page_outerclasses
    	let pageOutClassList = this.state.base.jumper.page_outerclasses

		//номера позиций в show_outpos
    	let pageOutpos = this.state.base.jumper.page_settings['0']['show_outpos'].split(',')

    		//то что переносим
    		var transported = this.state.base.jumper.page_positions[oldPos]

     //       console.log(transported)

    		var transportedClass = this.state.base.jumper.page_outerclasses[oldPos]
  			let tmpPosArr = []

    		//перемещаем из конца в начало
    		if (oldPos>newPos){

    			//расстояние от ноля массива до старой позиции
    			let iterations = Object.keys(pagePos).length - ( Object.keys(pagePos).length - oldPos )
    			// начиная со старой позиции копируем предыдущую
    			for (let i=iterations; i>newPos; i--){

    				Vue.set(this.state.base.jumper.page_positions, i, pagePos[i-1])
    				Vue.set(this.state.base.jumper.page_outerclasses, i, pageOutClassList[i-1])

    			}

    			for (let b=0; b<pageOutpos.length; b++){

    				if ( pageOutpos[b] == parseInt(oldPos)){ tmpPosArr.push(b) }

    				if ( pageOutpos[b] >= newPos && oldPos >= pageOutpos[b] ){pageOutpos[b] = parseInt(pageOutpos[b])+1}

    			}
    		}

    		else {

    			// начиная со старой позиции копируем предыдущую
    			for (let i=parseInt(oldPos); i<=parseInt(newPos); i++){

    				Vue.set(this.state.base.jumper.page_positions, i, pagePos[i+1])
    				Vue.set(this.state.base.jumper.page_outerclasses, i, pageOutClassList[i+1])

    			}

    			for (let b=0; b<pageOutpos.length; b++){

    				if ( pageOutpos[b] == parseInt(oldPos)){ tmpPosArr.push(b) }

    				if ( pageOutpos[b] >= oldPos && newPos >= pageOutpos[b] ){pageOutpos[b] = pageOutpos[b]-1}

    			}
    		}

    		for (let i=0; i<tmpPosArr.length; i++){pageOutpos[tmpPosArr[i]] = newPos}

    		Vue.set(this.state.base.jumper.page_positions, newPos, transported)
    		Vue.set(this.state.base.jumper.page_outerclasses, newPos, transportedClass)
    		Vue.set(this.state.base.jumper.page_settings['0'], 'show_outpos', pageOutpos.join(','))

    },



    changeBlock (context, pos){

        //чистим если там пустой массив был
        if (this.state.base.jumper.page_outerclasses['']){Vue.delete(this.state.base.jumper.page_outerclasses, '')}
        if (this.state.base.jumper.page_positions['']){Vue.delete(this.state.base.jumper.page_positions, '')}


        let oldPos = pos['oldPosition']
    	let newPos = pos['newPosition']

    	let ctrlPos = pos['innerPos']


    	//если новый создаем:

    	if (newPos > Object.keys( this.state.base.jumper.page_positions ).length){

    		let newlen = parseInt(Object.keys( this.state.base.jumper.page_positions ).length+1)

    		Vue.set( this.state.base.jumper.page_positions, newlen, {})
    		Vue.set( this.state.base.jumper.page_outerclasses, newlen, '')

        	createComponentAdmin (this.state.base.jumper.components_list, this.state.base.jumper.page_positions, this.state.base.jumper.class_list)
    	}

    	//...и погнали

    	let pageOutpos = this.state.base.jumper.page_settings['0']['show_outpos'].split(',')
    	let pageInpos = this.state.base.jumper.page_settings['0']['show_inpos'].split(',')
     	let pageOutclass = this.state.base.jumper.page_settings['0']['show_outcls'].split(',')

	  		var ourPosIndex
	    	var nBlockLen = 0
	    	var newOutClass

    	for (let i=0; i<pageInpos.length; i++){
    		//находим индекс старой позиции
    		if (parseInt(pageInpos[i]) == parseInt(ctrlPos) && parseInt(pageOutpos[i]) == parseInt(oldPos)) { ourPosIndex = i }

    		//посчитать длину нового блока
    		if (pageOutpos[i] == newPos)
    			{
    				newOutClass = pageOutclass[i]
    				nBlockLen = nBlockLen+1
    			}
    		}

    		//console.log(nBlockLen)

    		nBlockLen = nBlockLen+1
	    	//сменили номер блока
	    	pageOutpos[ourPosIndex] = newPos
	    	pageInpos[ourPosIndex] = nBlockLen
	    	//console.log(pageInpos[ourPosIndex])
	    	//сменили список классов блока у перемещаемого
	    	pageOutclass[ourPosIndex] = newOutClass

	    	//в старом блоке
	    	//все номера позиций больше перемещаемого
	    	//уменьшить на единицу
			for (let i=0; i<pageInpos.length; i++){
       		if (  parseInt(pageInpos[i]) >  parseInt(ctrlPos) &&  parseInt(pageOutpos[i]) ==  parseInt(oldPos) )
       		 { pageInpos[i] =  parseInt(pageInpos[i]-1) }
       		}


    	Vue.set(this.state.base.jumper.page_settings['0'], 'show_inpos', pageInpos.join(','))
    	Vue.set(this.state.base.jumper.page_settings['0'], 'show_outpos', pageOutpos.join(','))
    	Vue.set(this.state.base.jumper.page_settings['0'], 'show_outcls', pageOutclass.join(','))

	    	let pagePosOld = this.state.base.jumper.page_positions[oldPos]
	    	let pagePosNew = this.state.base.jumper.page_positions[newPos]
	    	let traveller = pagePosOld[ctrlPos]
	    	let newInpos = Object.keys( pagePosNew ).length + 1

			//в старом подмассиве померять длину и если она больше старой позиции
    		//всем подмассивам уменьшить индекс на 1

    		for (let i = parseInt(ctrlPos); i<Object.keys( pagePosOld ).length+1; i++){

    				if (!pagePosOld[i+1]){Vue.delete(pagePosOld, i)}
    				else{Vue.set(pagePosOld, i, pagePosOld[i+1])}

    		}

 		//записываем перемещенный объект в новый массив
    	Vue.set(this.state.base.jumper.page_positions[newPos], newInpos, traveller)

    	//проверяем контейнер - осталось ли там что то еще
    	var chk=0

    	for (let i=0; i<pageInpos.length; i++){if (parseInt(pageOutpos[i]) == parseInt(oldPos)){chk=1} }

    		//и если все же пусто - массово перемещаем все контейнеры после - на одну позицию назад
   		if (chk == 0){

   			Vue.delete( this.state.base.jumper.page_positions, oldPos)
   			 Vue.delete( this.state.base.jumper.page_outerclasses, oldPos)


   			for (let i=0; i<pageOutpos.length; i++){if (parseInt(pageOutpos[i])>parseInt(oldPos)){

    			 this.dispatch('blockPosition', {'newPosition':pageOutpos[i]-1, 'oldPosition':pageOutpos[i] })

    			}


    		Vue.delete( this.state.base.jumper.page_positions, pageOutpos.length)
    		Vue.delete( this.state.base.jumper.page_outerclasses, pageOutpos.length)
   			}
   		}

    },



    innerPosChange (context, pos){

        //чистим если там пустой массив был
        if (this.state.base.jumper.page_outerclasses['']){Vue.delete(this.state.base.jumper.page_outerclasses, '')}
        if (this.state.base.jumper.page_positions['']){Vue.delete(this.state.base.jumper.page_positions, '')}


    	var oldPos = pos['oldPosition']
    	var newPos = pos['newPosition']

    	//нужен для контроля блока
    	var ctrlPos = pos['outerPos']

		//номера позиций в show_outpos
    	var pageOutpos = this.state.base.jumper.page_settings['0']['show_outpos'].split(',')
    	var pageInpos = this.state.base.jumper.page_settings['0']['show_inpos'].split(',')

    	var pagePos = this.state.base.jumper.page_positions[ctrlPos]
    	var traveller = pagePos[oldPos]


  		//находим старую позицию
  		var oldPosIndex

    	for (let i=0; i<pageInpos.length; i++){if (pageInpos[i]==oldPos && pageOutpos[i] == ctrlPos){ oldPosIndex = i }}

    	if (oldPos>newPos){

	    		let iterations = parseInt(Object.keys( pagePos ).length - parseInt(newPos) - parseInt(oldPos) + 1)

	    		for (let i=iterations+1; i>parseInt(newPos); i--){

	    			Vue.set(pagePos, i, pagePos[i-1])

	    		}

	    		for (let b=0; b<pageInpos.length; b++){

	    			if ( parseInt(pageInpos[b]) >= parseInt(newPos) && parseInt(oldPos) >= parseInt(pageInpos[b]) ){

	    				if (parseInt(pageOutpos[b]) == parseInt(ctrlPos)){ pageInpos[b] = parseInt(pageInpos[b])+1 }
	    			}
	    		}
	    	}

    	else{
    			for (let i=parseInt(oldPos); i<parseInt(newPos); i++){

    			Vue.set(pagePos, i, pagePos[i+1])

    			}

    			for (let b=0; b<pageInpos.length; b++){

    				if ( parseInt(pageInpos[b]) >= parseInt(oldPos) && parseInt(newPos) >= parseInt(pageInpos[b]) ){

    					if (parseInt(pageOutpos[b]) == parseInt(ctrlPos)){ pageInpos[b] = pageInpos[b]-1 }
    				}
    			}
    		}

    	pageInpos[oldPosIndex] = newPos

    	Vue.set(this.state.base.jumper.page_settings['0'], 'show_inpos', pageInpos.join(','))

     	Vue.set(this.state.base.jumper.page_positions[ctrlPos], newPos, traveller)

    },


    deleteEmptyArr(context){

         //чистим если там пустой массив был
        if (this.state.base.jumper.elements_data['']){Vue.delete(this.state.base.jumper.elements_data, '')}
        if (this.state.base.jumper.page_outerclasses['']==''){Vue.delete(this.state.base.jumper.page_outerclasses, '')}
        if (this.state.base.jumper.page_positions['']){Vue.delete(this.state.base.jumper.page_positions, '')}


    },


    cssSelectToVuex (context, freshdata) {

		let arrayNewElems = [];
		arrayNewElems['classname'] = [];
		arrayNewElems['style_title'] = [];
		arrayNewElems['styles'] = [];

   		for (var catdata in freshdata['freshdata']['classes'])
   		 {

   		  arrayNewElems['classname'].push(freshdata['freshdata']['classes'][catdata]['classname']);
   		  arrayNewElems['style_title'].push(freshdata['freshdata']['titles'][catdata]['style_title']);
   		  arrayNewElems['styles'].push(freshdata['freshdata']['styles'][catdata]['styles']);

   		  };

   		let stylesets = arrayNewElems['styles'].join(' ')+this.state.base.jumper.page_css

    	Vue.set(this.state.base.jumper.class_list[freshdata['id']], 'classname', arrayNewElems['classname'])
    	Vue.set(this.state.base.jumper.class_list[freshdata['id']], 'style_title', arrayNewElems['style_title'])
    	Vue.set(this.state.base.jumper, 'page_css', stylesets)

    },


    outClassAdd (context, classarray){


        //чистим если там пустой массив был
        if (this.state.base.jumper.page_outerclasses['']){Vue.delete(this.state.base.jumper.page_outerclasses, '0')}
        if (this.state.base.jumper.page_positions['']){Vue.delete(this.state.base.jumper.page_positions, '0')}


  		let showpos
  		let showcls

  		classarray['mode'] == 'outerCss' ? showpos = 'show_outpos' :  showpos = 'show_inpos'
  		classarray['mode'] == 'outerCss' ? showcls = 'show_outcls' :  showcls = 'show_incls'

		//pageSettings
    	let a = this.state.base.jumper.page_settings['0'][showpos]
    	let posArr = a.split(',')

    	let b = this.state.base.jumper.page_settings['0'][showcls]
    	let classArr = b.split(',')

    	let j = this.state.base.jumper.page_settings['0']['show_outpos']
    	let posArrToo = j.split(',')

		for (let c=0; c<posArr.length; c++){

    		if (posArr[c] == classarray['numberPos'] && posArrToo[c] == classarray['outposindx']){


    			let tmp = []

    			//проверка - разбивать ли массив
    			//тут же удаляем пустоту, если она есть
    			if (classArr[c].includes('*')){
    			tmp = classArr[c].split('*')}
                else
    			{tmp['0'] = classArr[c]}

    			if (tmp['0']==''){tmp.splice(0,1)}


    			//проверяем, есть ли классы этого типа в этом массиве
    			for (let d=0; d<tmp.length; d++){

    				for (let e=0; e<classarray['tocheckArray'].length; e++){

						if (tmp[d]==classarray['tocheckArray'][e]){tmp.splice(d, 1)}
						// if (tmp[d]==''){tmp[d].splice(d,1)}

    				}

    			}



    			if (tmp['0']!==''){
    			tmp.push(classarray['newclass'])
    		      } else (tmp['0']=classarray['newclass'])


    			classArr[c] = tmp.join('*')



    		}

    	}


         let newwline = classArr.join(',')
    	 console.log(newwline)
    	 Vue.set(this.state.base.jumper.page_settings['0'], showcls, newwline )


        //OuterClass


    	let topush;
    	let toset;
    	let willset;

        console.log(this.state.base.jumper.page_outerclasses)

    	classarray['mode'] == 'outerCss' ? topush = this.state.base.jumper.page_outerclasses[classarray['numberPos']] : topush = this.state.base.jumper.page_positions[classarray['outposindx']][classarray['numberPos']]['classin'];
    	classarray['mode'] == 'outerCss' ? toset = this.state.base.jumper.page_outerclasses : toset = this.state.base.jumper.page_positions[classarray['outposindx']][classarray['numberPos']];
    	classarray['mode'] == 'outerCss' ? willset = classarray['numberPos'] : willset = 'classin';

 		let outClassArr = topush.split(' ');

 		for (let g=0; g<classarray['tocheckArray'].length; g++){

 			for (let h=0; h<outClassArr.length; h++){

 				if (outClassArr[h] == classarray['tocheckArray'][g])
 					{outClassArr.splice(h,1)}
 				if (outClassArr[h] ==''){outClassArr.splice(h,1)}
 			}

 		}

 		outClassArr.push(classarray['newclass'])

 		let newline = outClassArr.join(' ')

    	Vue.set(toset, willset, newline)

  	},


  	outClassRemove (context, classarray){


        //чистим если там пустой массив был
        if (this.state.base.jumper.page_outerclasses['']){Vue.delete(this.state.base.jumper.page_outerclasses, '')}
        if (this.state.base.jumper.page_positions['']){Vue.delete(this.state.base.jumper.page_positions, '')}


  		//OuterClass

    	let topush
    	let toset
    	let willset

    	classarray['mode'] == 'outerCss' ? topush = this.state.base.jumper.page_outerclasses[classarray['numberPos']] : topush = this.state.base.jumper.page_positions[classarray['outposindx']][classarray['numberPos']]['classin']
    	classarray['mode'] == 'outerCss' ? toset = this.state.base.jumper.page_outerclasses : toset = this.state.base.jumper.page_positions[classarray['outposindx']][classarray['numberPos']]
    	classarray['mode'] == 'outerCss' ? willset = classarray['numberPos'] : willset = 'classin'

  		Vue.set(toset, willset, classarray['toremove'])

  		let showpos
  		let showcls

  		classarray['mode'] == 'outerCss' ? showpos = 'show_outpos' :  showpos = 'show_inpos'
  		classarray['mode'] == 'outerCss' ? showcls = 'show_outcls' :  showcls = 'show_incls'

		//pageSettings
    	let a = this.state.base.jumper.page_settings['0'][showpos]
    	let posArr = a.split(',')

    	let b = this.state.base.jumper.page_settings['0'][showcls]
    	let classArr = b.split(',')

    	let j = this.state.base.jumper.page_settings['0']['show_outpos']
    	let posArrToo = j.split(',')


		for (let c=0; c<posArr.length; c++){

			if (posArr[c] == classarray['numberPos'] && posArrToo[c] == classarray['outposindx']){

    		 	classArr[c]=classarray['toremove'].split(' ').join('*')

    		}

    	}


    	Vue.set(this.state.base.jumper.page_settings['0'], showcls, classArr.join(','))

  	},



    clearAllData(context){

    //   Vue.delete(this, state)

    }



}



