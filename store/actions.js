import {
    firstLoad
}
    from '.././roadmap'
import {
    loadThisCats
}
    from '.././roadmap'
import {
    loadThisElemfolder
}
    from '.././roadmap'
import {
    thisCssSelect
}
    from '.././roadmap'
import {
    loadElemsData
}
    from '.././roadmap'
import {
    createElemFolder
}
    from '.././roadmap'
import {
    createCatOrPage
}
    from '.././roadmap'
import {
    renameThis
}
    from '.././roadmap'
import {
    toTrashThis
}
    from '.././roadmap'
import {
    delCatOrFolder
}
    from '.././roadmap'
import {
    updateDb
}
    from '.././roadmap'
import {
    createElementHere
}
    from '.././roadmap'
import {
    moveElemOneForFolder
}
    from '.././roadmap'
import {
    moveElemGroupForFolder
}
    from '.././roadmap'
import {
    moveToTrashElem
}
    from '.././roadmap'
import {
    loadTrashEls
}
    from '.././roadmap'
import {
    letsCreateTemplate
}
    from '.././roadmap'
import {
    elemToPages
}
    from '.././roadmap'
import axios from "axios"
export default {
    async nuxtServerInit(context) {
        if(this.state.base === '') {
            return firstLoad('is_homepage', '1').then(response => {
                context.commit('firstSetBase', {
                    jumper: response.data
                })
            })
        }
    },
    addHidedModal(context, componentname) {
        context.commit('hideModal', componentname)
    },
    showHideModal(context, componentname) {
        context.commit('showHideModal', componentname)
    },
    createFolder({
                     dispatch
                 }, eldata) {
        if(eldata['mode'] == 'elemfolder') {
            return createElemFolder(eldata['elemdata']).then(response => {
                dispatch('loadThisCatList', {
                    'mode': 'elemfolder',
                    'parent': response.data['parent_id'],
                    'submode': 'newfolder',
                    'fresh': response.data
                })
            })
        }
        if(eldata['mode'] == 'cat') {
            return createCatOrPage(eldata).then(response => {
                console.log(response.data)
                dispatch('loadThisCatList', {
                    'mode': 'cats',
                    'parent': eldata['parent']
                })
            })
        }
    },
    renameFolder(context, eldata) {
        if(eldata['mode'] == 'cats') {
            context.commit('renameThisPlease', {
                'newname': eldata['newname'],
                'what': 'title',
                'way': eldata['way']
            })
            renameThis({
                'dbtable': 'a_cat_list',
                'where': 'id',
                'wherevalue': eldata['willrename'],
                'coll': 'title',
                'value': eldata['newname']
            })
        }
        if(eldata['mode'] == 'elems') {
            context.commit('renameThisPlease', {
                'newname': eldata['newname'],
                'what': 'folder_name',
                'way': eldata['way']
            })
            renameThis({
                'dbtable': 'an_elems_list',
                'where': 'id',
                'wherevalue': eldata['willrename'],
                'coll': 'folder_name',
                'value': eldata['newname']
            })
        }
    },
    createElemHere(context, datas) {
        createElementHere({
            'where': datas['where'],
            'elem_class': datas['elem_class'],
            'elem_type': datas['elem_type']
        }).then(response => {
            context.commit('letsCreateElemHere', {
                'waydata': datas,
                'new': response.data
            })
        })
    },
    cancelElemOperations(context) {
        context.commit('cancelElemOperations')
    },
    showFolderToMoveElem(context, datas) {
        context.commit('showFolderToMoveElem', {
            datas
        })
    },
    letsMoveElemOne(context, parent) {
        moveElemOneForFolder({
            'old_parent': this.state.elemsOperations[0]['old_parent'],
            'new_parent': parent['new_parent'],
            'elem_id': this.state.elemsOperations[0]['elem_id']
        }).then(response => {
            context.commit('letsMoveElemOne', {
                parent
            })
        })
    },
    showCheckbxForMoveElems(context, datas) {
        context.commit('showCheckbxForMoveElems', {
            datas
        })
    },
    selectAllElemsHere(context, datas) {
        context.commit('insertElemFolderToGroupSet', {
            'id': datas['starter'],
            'way': datas['way']
        })
    },
    unselectAllElemsHere(context, datas) {
        context.commit('removeElemFolderFromGroupSet', {
            'id': datas['starter']
        })
    },
    selectThisElemHere(context, datas) {
        context.commit('insertElemToSelect', {
            'id': datas['elemid'],
            'parent': datas['parent'],
            'way': datas['way']
        })
    },
    unselectThisElemHere(context, datas) {
        context.commit('removeElemFromSelect', {
            'id': datas['elemid'],
            'parent': datas['parent']
        })
    },
    letsMoveCheckedElems(context, datas) {
        moveElemGroupForFolder({
            'to': datas['moveto'],
            'from': this.state.elemsOperations[0]
        }).then(response => {
            console.log(response.data)
            context.commit('letsMoveCheckedElems', {
                'moveto': datas['moveto'],
                'way': datas['way']
            })
        })
    },
    deleteEmptyArr(context) {
        context.commit('deleteEmptyArr')
    },
    addElemToThisPage(context, elemsetts) {
        let pageElemClasses = this.state.base.jumper.page_settings['0']['show_elemclass'].split(',')
        if(pageElemClasses[0] == '') {
            pageElemClasses[0] = elemsetts['show_elemclass']
        } else {
            pageElemClasses.push(elemsetts['show_elemclass'])
        }
        let pageElemTypes = this.state.base.jumper.page_settings['0']['show_elemtype'].split(',')
        if(pageElemTypes[0] == '') {
            pageElemTypes[0] = elemsetts['show_elemtype']
        } else {
            pageElemTypes.push(elemsetts['show_elemtype'])
        }
        let pageElemIds = this.state.base.jumper.page_settings['0']['show_elemid'].split(',')
        if(pageElemIds[0] == '') {
            pageElemIds[0] = elemsetts['show_elemid']
        } else {
            pageElemIds.push(elemsetts['show_elemid'])
        }
        let newOutPos = Object.keys(this.state.base.jumper.page_positions).length + 1
        let pageOutpos = this.state.base.jumper.page_settings['0']['show_outpos'].split(',')
        if(pageOutpos[0] == '') {
            pageOutpos[0] = '1'
        } else {
            pageOutpos.push(newOutPos)
        }
        let pageInpos = this.state.base.jumper.page_settings['0']['show_inpos'].split(',')
        if(pageInpos[0] == '') {
            pageInpos[0] = '1'
        } else {
            pageInpos.push('1')
        }
        let pageOutclass = this.state.base.jumper.page_settings['0']['show_outcls'].split(',')
        if(pageOutclass[0] == '') {
            pageOutclass[0] = '*'
        } else {
            pageOutclass.push('*')
        }
        let pageInclass = this.state.base.jumper.page_settings['0']['show_incls'].split(',')
        if(pageInclass[0] == '') {
            pageInclass[0] = '*'
        } else {
            pageInclass.push('*')
        }
        context.commit('addElemToThisPage', {
            'pageElemClasses': pageElemClasses.join(','),
            'pageElemTypes': pageElemTypes.join(','),
            'pageElemIds': pageElemIds.join(','),
            'pageOutpos': pageOutpos.join(','),
            'pageInpos': pageInpos.join(','),
            'pageOutclass': pageOutclass.join(','),
            'pageInclass': pageInclass.join(','),
            'show_elemclass': elemsetts['show_elemclass'],
            'show_elemtype': elemsetts['show_elemtype'],
            'show_elemid': elemsetts['show_elemid'],
            'page_id': elemsetts['page_id']
        })
    },
    removeElemFromPage(context, datas) {
        context.commit('removeElemFromPage', {
            'show_elemclass': datas['show_elemclass'],
            'show_elemtype': datas['show_elemtype'],
            'show_elemid': datas['show_elemid'],
            'outpos': datas['outpos'],
            'inpos': datas['inpos'],
            'page_id': datas['page_id']
        })
    },
    toTrashElem(context, datas) {
        moveToTrashElem({
            'elemid': datas['elemid'],
            'old_parent': datas['old_parent']
        }).then(response => {
            //готовим массив-боработчик
            context.commit('toTrashElem', {
                'elemid': datas['elemid'],
                'way': datas['way'],
            })
        }).then(() => {
            //перемещение в категорию "корзина"
            let trash = {}
            trash['new_way'] = {}
            trash['new_way']['way'] = this.state.base.jumper.elems_folders[0]
            context.commit('letsMoveElemOne', {
                'parent': trash
            })
        })
    },
    //ГЛЮЧИТ!
    //ДЛЯ ЭТОГО И НУЖЕН OLD_PARENT_ID
    restoreElemFolder(context, elem) {
        let a = elem['elem']['elem_class']
        let b = elem['elem']['elem_type']
        let c = elem['elem']['id']
        //по умолчанию корзина - если что то пойдет не так - объект просто не восстановится
        let classFolderIndex = '0'
        if(a == 'mod_el') {
            classFolderIndex = '1'
        }
        if(a == 'typo_el') {
            classFolderIndex = '2'
        }
        if(a == 'shop_el') {
            classFolderIndex = '3'
        }
        let indbClassId = classFolderIndex + 1
        let restoredTo = this.state.base.jumper.elems_folders[classFolderIndex]['elem_id_here']
        //[a][b]['0']['id']
        // console.log(restoredTo)
        // updateDb({'dbtable':'an_elems_list', 'where':'id', 'is':c, })
    },
    //сохранить настройки элемента в хранилище
    dataElementForVuex(context, eldata) {
        context.commit('setEldata', eldata)
    },
    delFolder(context, eldata) {
        var dbtable
        if(eldata['mode'] == 'cats') {
            dbtable = 'a_cat_list'
            eldata['trash'] = this.state.base.jumper.cats_n_pages['0']
            //  console.log(this.state.base.jumper.cats_n_pages)
        }
        if(eldata['mode'] == 'elemfolder') {
            dbtable = 'an_elems_list'
            eldata['trash'] = this.state.base.jumper.elems_folders['0']
        }
        toTrashThis({
            'dbtable': dbtable,
            'where': 'id',
            'is': eldata['willdel'],
            'old_parent': eldata['parent_id']
        }).then(() => {
            context.commit('toTrash', eldata)
        })
    },
    delFromTrash(context, eldata) {
        let dbtable
        if(eldata['mode'] == 'cats') {
            dbtable = 'a_cat_list'
        }
        if(eldata['mode'] == 'elemfolder') {
            dbtable = 'an_elems_list'
        }
        delCatOrFolder({
            'dbtable': dbtable,
            'where': 'id',
            'is': eldata['willdel']
        }).then(() => {
            context.commit('delPlease', eldata)
        })
    },
    //открыть дерево категорий из дерева элементов (открывается из компонента)
    //тут только mode выставляется и submode
    openCatTreeForElemsOperations(context, datas) {
        context.commit('catTreeModeCustom', {
            'mode': datas['mode'],
            'submode': datas['submode'],
        })
        // и еще добавить elemid для добавления
        context.commit('addElemForOperations', {
            'elemid': datas['elemid']
        })
    },
    openCatTreeForMakeTemplate(context, datas) {
        context.commit('catTreeModeCustom', {
            'mode': datas['mode'],
            'submode': datas['submode'],
        })
        context.commit('setCatsForCheckBoxes')
    },
    registerInputsForIncludeOrRemoveElemToPages(context, setts) {
        context.commit('registerInputsForIncludeOrRemoveElemToPages', {
            //  'mode':setts['mode'],
            'catid': setts['catid'],
            'type': setts['cattype']
        })
    },
    checkThisCat(context, catid) {
        //чекбокс отправляет в массив "отмеченные категории"
        context.commit('checkThisCat', {
            'cat': catid['cat']
        })
        //это для настройки применения элемента к стр
        if(this.state.catOperations[0]['catsubmode'] == 'addElemToCats') {
            context.commit('registerInputsForIncludeOrRemoveElemToPages', {
                //  'mode':setts['mode'],
                'catid': catid['cat'],
                'type': 'cat'
            })
        }
    },
    //чекбокс и валуе в настройказ добавления элемента на стр
    addElemToPageSetts(context, val) {
        context.commit('addElemToPageSetts', {
            'value': val['value'],
            'catid': val['catid'],
            'type': val['type'],
            'mode': val['mode']
        })
    },
    checkThisPage(context, pageid) {
        //чекбокс отправляет в массив категории отмеченную страницу
        context.commit('checkThisPage', {
            'cat': pageid['cat'],
            'page': pageid['page']
        })
        if(this.state.catOperations[0]['catsubmode'] == 'addElemToCats') {
            context.commit('registerInputsForIncludeOrRemoveElemToPages', {
                //  'mode':setts['mode'],
                'catid': pageid['page'],
                'type': 'page'
            })
        }
    },
    templateToNewChilds(context, catid) {
        context.commit('templateToNewChilds', {
            'cat': catid['cat']
        })
    },
    addToTemplateListPosition(context, position) {
        //выполнить функцию добавления блока со стр в массив
        context.commit('addToTemplateListPosition', {
            'position': position['position']
        })
    },
    // режим шаблона
    letsMakeTemplate(context) {
        var alldata = {}
        alldata['cats'] = this.state.catOperations[0]['catChilds']
        alldata['positionSettings'] = this.state.templateListPosition
        alldata['positionSettsMode'] = this.state.inputTemplatesMode['mode']
        //  console.log(this.state.templateListPosition[1])
        //1 - номер позиции
        //id - номер позиции
        //mode - блоком в начале стр/блоком в конце/встроить в шаблон
        //если встроить в шаблон  - insert - перед существующими блоками, внутрь или после
        //fromstart & fromend - цифры - сколько пропустить сначала или с конца
        //passfirst и passlast - пропустить первый и последний блоки
        alldata['positions'] = {}
        alldata['outclasses'] = {}
        for(let a in this.state.templateListPosition) {
            alldata['positions'][a] = this.state.base.jumper.page_positions[a]
            alldata['outclasses'][a] = this.state.base.jumper.page_outerclasses[a]
        }
        context.commit('check', alldata)
        letsCreateTemplate(alldata).then(response => {
            console.log(response.data)
            //очистить все экшен массивы
            //добавить страницы в списки included to pages
        })
    },
    letsAddElemToSelectedPages(context) {
        //проверяем, есть ли текущая страница с списке - если да - выполняем фронтенд функцию добавления
        //затем отправляем в php список страниц и id элемента
        //там проверяем страницы и pages_included - если в списке есть страница из выбранных - игнорируем ее
        //затем идем по списку страниц и обновляем show_ , и у элемента included_to_pages
        //этот вариант применяет элемент в последнюю (или заданную) позицию на странице
        //(также, если эл есть на странице - нужна галочка "сохранить css с этой страницы")
        //отправляется элемента id и массив со страницами
        //короче, на сервере будет происходить вот что:
        //перебор прилетевших категорий
        //в категориях (если в массиве добавлены страницы - то применение настроек стр, а затем
        //- подгрузка всего остального из этой категории из БД
        //     console.log('elem')
        //    console.log(this.state.elemsOperations['0']['elem'])
        //    console.log('list')
        //   let b = 1;
        //    for (let a in this.state.catOperations['0']['catChilds']){
        //      console.log(this.state.catOperations['0']['catChilds'][a])
        //     console.log('in cat')
        //      for (let c in this.state.catOperations['0']['catChilds'][a]){
        //        console.log(this.state.catOperations['0']['catChilds'][a]['type'])
        //      }
        //     console.log(b)
        //     b++
        //  }
        //   console.log(this.state.catOperations['0']['catChilds'][4])
        //  console.log(this.state.catOperations['0']['catChilds'])
        let d = this.state.catOperations['0']['catChilds'];
        return elemToPages({
            'cats': this.state.catOperations['0']['catChilds'],
            'elem': this.state.elemsOperations['0']['elem']
        }).then(response => {
            console.log(response.data)
            //дропнуть cat и elem operations
            //обновить included to pages
        })
    },
    letsRemoveElemFromSelectedPages(context) {
        // удалить элемент с выбранных стр
        //отправляется элемента id и массив со страницами
    },
    cancelCatOperations(context) {
        context.commit('cancelCatOperations')
    },
    catTreeSelectParent(context, tomove) {
        context.commit('catTreeModeWithTomove', {
            'tomove': tomove['tomove'],
            'childs': tomove['childs']
        })
    },
    refreshChildlist(context, childs) {
        context.commit('refreshChildlist', {
            'childs': childs['childs']
        })
    },
    letsMoveCat(context, newparent) {
        if(newparent['mode'] == 'cats') {
            updateDb({
                'dbtable': 'a_cat_list',
                'where': 'id',
                'is': this.state.catOperations['0']['cattmp']['way']['id'],
                'set': 'parent_id',
                'value': newparent['newparent']['way']['id']
            }).then(() => {
                updateDb({
                    'dbtable': 'a_cat_list',
                    'where': 'id',
                    'is': this.state.catOperations['0']['cattmp']['way']['id'],
                    'set': 'old_parent_id',
                    'value': newparent['newparent']['way']['id']
                })
            }).then(() => {
                context.commit('letsMoveCat', {
                    'newparent': newparent['newparent']
                })
            })
        }
    },
    //подгрузить классы выбранного селекта
    loadThisCssSelect(context, catname) {
        return thisCssSelect(catname['name']).then(response => {
            context.commit('cssSelectToVuex', {
                'freshdata': response.data,
                'id': catname['id']
            })
        })
    },
    outCssAddClass(context, classArr) {
        context.commit('outClassAdd', classArr)
    },
    outCssRemoveClass(context, classArr) {
        context.commit('outClassRemove', classArr)
    },
    blockPosition(context, newpos) {
        context.commit('blockPosition', newpos)
    },
    changeBlock(context, newpos) {
        context.commit('changeBlock', newpos)
    },
    changePosition(context, newpos) {
        context.commit('innerPosChange', newpos)
    },
    loadElemstoData(context, toload) {
        //подгружаем отсутствующие элементы
        return loadElemsData({
            'elems': toload['id'],
            'parent': toload['parent']
        }).then(response => {
            for(let freshEl in response.data) {
                //console.log(response.data[freshEl][0]['id'])
                context.commit('insertEldata', response.data[freshEl][0])
            }
            //затем добавляем фолдер
        }).then(() => {
            if(toload['needshow'] == 'yes') {
                context.commit('showHideModal', {
                    'modal': toload['modal'],
                    'wintype': toload['wintype']
                })
            }
        })
    },
    loadThisCatList(context, setts) {
        var elemsDatas = this.state.base.jumper.elements_data
        let catparent = setts['parent']
        var chkArr
        setts['mode'] == 'cats' ? chkArr = this.state.base.jumper.cats_n_pages : chkArr = this.state.base.jumper.elems_folders
        var waylist
        var startsearch
        var stopper = '0'
        //первый проход
        var mainAra = []
        for(let b in chkArr) {
            mainAra.push(chkArr[b])
        }
        startersearcher(mainAra)

        function startersearcher(list) {
            //первый проход по данному уровню вложенности
            for(let i in list) {
                if(stopper !== '1') {
                    if(catparent == list[i]['id']) {
                        stopper = '1';
                        //если категория "корзина элементов"
                        //подгрузим списки элементов
                        if(list[i]['elem_class'] == 'trsh') {
                            return loadTrashEls().then(response => {
                                context.commit('loadTrashElems', {
                                    'deleted': response.data
                                })
                                waylist = list[i];
                                setstep(waylist, catparent, elemsDatas)
                            })
                        } else {
                            waylist = list[i];
                            setstep(waylist, catparent, elemsDatas)
                        }
                    }
                }
            }
            //если в первый проход не нашли
            //второй раз идем уже по чайльдам
            if(stopper !== '1') {
                for(let f in list) {
                    if(list[f]['childs']) {
                        startersearcher(list[f]['childs'])
                    }
                }
            }
        }
        //поиск отсутствующих elements_data
        function chk(fresh, elemsDatas) {
            let elsToLoad = []
            for(let el in fresh) {
                if(fresh[el]['elem_id_here']) {
                    let idhere = fresh[el]['elem_id_here'].toString().split(',')
                    for(let elid in idhere) {
                        if(elemsDatas[fresh[el]['elem_class']] == undefined) {
                            context.commit('setElemDataFolder', {
                                'folder': fresh[el]['elem_class']
                            })
                            elsToLoad.push(idhere[elid])
                        } else {
                            if(elemsDatas[fresh[el]['elem_class']][fresh[el]['elem_type']] == undefined) {
                                context.commit('setElemDataSubFolder', {
                                    'folder': fresh[el]['elem_class'],
                                    'subfolder': fresh[el]['elem_type']
                                })
                                elsToLoad.push(idhere[elid])
                            }
                            if(elemsDatas[fresh[el]['elem_class']][fresh[el]['elem_type']][idhere[elid]] == undefined) {
                                elsToLoad.push(idhere[elid])
                            }
                        }
                    }
                }
            }
            return elsToLoad
        }

        function setstep(waylist, catparent, elemsDatas) {
            if(setts['mode'] == 'cats') {
                return loadThisCats(catparent).then(response => {
                    if(response.data !== '0') {
                        context.commit('toVuexThisCatList', {
                            'freshdata': response.data,
                            'parent': catparent,
                            'way': waylist,
                            'mode': setts['mode']
                        })
                    }
                })
            }
            if(setts['mode'] == 'elemfolder') {
                if(setts['submode'] == 'newfolder') {
                    let arr = []
                    arr['folders'] = []
                    if(waylist['childs']) {
                        arr['folders'].push(waylist['childs'])
                    }
                    arr['folders'].push(setts['fresh'])
                    context.commit('toVuexThisCatList', {
                        'freshdata': arr,
                        'parent': catparent,
                        'way': waylist,
                        'mode': setts['mode']
                    })
                } else {
                    return loadThisElemfolder(catparent).then(response => {
                        //проверка наличия элементов в массиве  elements_data
                        let elemsToLoad = chk(response.data['folders'], elemsDatas)
                        // console.log(elemsToLoad)
                        if(elemsToLoad.length == 0) {
                            context.commit('toVuexThisCatList', {
                                'freshdata': response.data,
                                'parent': catparent,
                                'way': waylist,
                                'mode': setts['mode']
                            })
                        } else {
                            let folders = response.data
                            //подгружаем отсутствующие элементы
                            return loadElemsData({
                                'elems': elemsToLoad,
                                'parent': catparent
                            }).then(response => {
                                for(let freshEl in response.data) {
                                    //console.log(response.data[freshEl][0]['id'])
                                    context.commit('insertEldata', response.data[freshEl][0])
                                }
                                //затем добавляем фолдер
                            }).then(() => {
                                context.commit('toVuexThisCatList', {
                                    'freshdata': folders,
                                    'parent': catparent,
                                    'way': waylist,
                                    'mode': setts['mode']
                                })
                            })
                        }
                    })
                }
            }
        }
    },
    clearAllData(context) {
        context.commit('clearAllData')
    }
}