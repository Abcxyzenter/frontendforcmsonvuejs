import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//чтобы один раз загружать шаблон, а не в цикле
const posTmpls = []
if(!posTmpls['outerpositions']) {
    posTmpls['outerpositions'] = function(res) {
        require(['./admincomponents/positions_outer.vue'], res)
    }
    posTmpls['innerpositions'] = function(res) {
        require(['./admincomponents/positions_inner.vue'], res)
    }
    posTmpls['modalwrapperInposStyles'] = function(res) {
        require(['./admincomponents/modalwrapper_inpos_styles.vue'], res)
    }
    posTmpls['modalwrapperElem'] = function(res) {
        require(['./admincomponents/modalwrapper_elemsets.vue'], res)
    }
    posTmpls['modalwrapperPositionCss'] = function(res) {
        require(['./admincomponents/modalwrapper_position_css.vue'], res)
    }
    posTmpls['outerclasses'] = function(res) {
        require(['./admincomponents/classes_outer.vue'], res)
    }
    posTmpls['innerclasses'] = function(res) {
        require(['./admincomponents/classes_inner.vue'], res)
    }
    posTmpls['templatorsettings'] = function(res) {
        require(['./admincomponents/templator_settings.vue'], res)
    }
}
export function createComponentAdmin(complist, outers, classlist) {
    Vue.component('save-changes', function(res) {
        require(['./admincomponents/save_changes.vue'], res)
    })
    Vue.component('templator-settings-all', function(res) {
        require(['./admincomponents/templator_settings.vue'], res)
    })
    Vue.component('page-settings', function(res) {
        require(['./admincomponents/page_settings.vue'], res)
    })
    Vue.component('modalwrapper-cats', function(res) {
        require(['./admincomponents/modalwrapper_cats.vue'], res)
    })
    Vue.component('cats-tree', function(res) {
        require(['./admincomponents/cat_tree.vue'], res)
    })
    Vue.component('modalwrapper-elemtree', function(res) {
        require(['./admincomponents/modalwrapper_elemtree.vue'], res)
    })
    Vue.component('elem-tree', function(res) {
        require(['./admincomponents/elem_tree.vue'], res)
    })
    Vue.component('modalwrapper-pageelems', function(res) {
        require(['./admincomponents/modalwrapper_pageelems.vue'], res)
    })
    Vue.component('page-elems', function(res) {
        require(['./admincomponents/page_elems.vue'], res)
    })
    Vue.component('cats-editor', function(res) {
        require(['./admincomponents/cats_editor.vue'], res)
    })
    //////////////////////////////////
    //ФАБРИКА ДИНАМИЧЕСКИХ КОМПОНЕНТОВ ДЛЯ ЭЛЕМЕНТОВ СТРАНИЦЫ (АДМИНКА)
    //////////////////////////////////
    ////////////////////ПОСЛЕДОВАТЕЛЬНОСТЬ - OUTER POSITIONS
    var posits = [];
    for(var prop in outers) {
        posits.push(outers[prop]);
    };
    var classez = [];
    for(var propz in classlist) {
        classez.push(classlist[propz]);
    };
    for(let i = 0; i < posits.length; i++) {
        Vue.component('outerpositions-' + (i + 1), posTmpls['outerpositions'])
        Vue.component('modalwrapper-outerclasses-' + (i + 1), posTmpls['modalwrapperPositionCss'])
        Vue.component('templator-settings-' + (i + 1), posTmpls['templatorsettings'])
        for(let b = 0; b < classez.length; b++) {
            Vue.component('outerclasses-' + classez[b]['style_cat_alias'] + '-' + (i + 1), posTmpls['outerclasses'])
        }
    }
    ///////////////////ЭЛЕМЕНТЫ НА СТРАНИЦЕ
    var comps = [];
    for(var prop in complist) {
        comps.push(complist[prop]);
    }
    for(let i = 0; i < comps.length; i++) {
        Vue.component('innerpositions-' + comps[i]['el_type'] + '-' + comps[i]['el_id'], posTmpls['innerpositions'])
        for(let b = 0; b < classez.length; b++) {
            Vue.component('innerclasses-' + classez[b]['style_cat_alias'] + comps[i]['el_type'] + '-' + comps[i]['el_id'], posTmpls['innerclasses'])
        }
        Vue.component('modalwrapper-' + comps[i]['el_type'] + '-' + comps[i]['el_id'], posTmpls['modalwrapperInposStyles'])
        Vue.component('elemsetts-' + comps[i]['el_id'], posTmpls['modalwrapperElem'])
        //два компонента с динамическими шаблонами
        //их потом тоже в переменную добавлю
        Vue.component('componentsets-' + comps[i]['el_type'] + '-' + comps[i]['el_id'], function(res) {
            require(['./elements/admin/' + comps[i]['el_class'] + '/' + comps[i]['el_type'] + '/sets.vue'], res)
        })
        Vue.component('component-' + comps[i]['el_type'] + '-' + comps[i]['el_id'], function(res) {
            require(['./elements/user/' + comps[i]['el_class'] + '/' + comps[i]['el_type'] + '/default.vue'], res)
        })
    }
}
//////////////////////////////////
//ФАБРИКА ДИНАМИЧЕСКИХ КОМПОНЕНТОВ ДЛЯ ЮЗЕРА
//////////////////////////////////
export function createComponentUser(complist) {
    var comps = [];
    for(var prop in complist) {
        comps.push(complist[prop]);
    }
    for(let i = 0; i < comps.length; i++) {
        Vue.component(
            //имя компонента
            'component-' + comps[i]['el_type'] + '-' + comps[i]['el_id'],
            //шаблон
            function(resolve) {
                require(['./elements/user/' + comps[i]['el_class'] + '/' + comps[i]['el_type'] + '/default.vue'], resolve)
            })
    }
}
//когда подгружаем новый элемент (в дереве элементов)
export function registerNewElem(pagedataway) {
    Vue.component('elemsetts-' + pagedataway['id'], function(res) {
        require(['./admincomponents/modalwrapper_elemsets.vue'], res)
    })
    Vue.component('componentsets-' + pagedataway['type'] + '-' + pagedataway['id'], function(res) {
        require(['./elements/admin/' + pagedataway['class'] + '/' + pagedataway['type'] + '/sets.vue'], res)
    })
    Vue.component('component-' + pagedataway['type'] + '-' + pagedataway['id'], function(res) {
        require(['./elements/user/' + pagedataway['class'] + '/' + pagedataway['type'] + '/default.vue'], res)
    })
}
//когда добавляем элемент на страницу - регистрируем обертки
export function registerWrapperComponents(eltype, elid, positionout, classlist) {
    Vue.component('outerpositions-' + positionout, posTmpls['outerpositions'])
    Vue.component('templator-settings-' + positionout, posTmpls['templatorsettings'])
    Vue.component('modalwrapper-outerclasses-' + positionout, posTmpls['modalwrapperPositionCss'])
    Vue.component('innerpositions-' + eltype + '-' + elid, posTmpls['innerpositions'])
    Vue.component('modalwrapper-' + eltype + '-' + elid, posTmpls['modalwrapperInposStyles'])
    var classez = [];
    for(var propz in classlist) {
        classez.push(classlist[propz]);
    };
    for(let b = 0; b < classez.length; b++) {
        Vue.component('outerclasses-' + classez[b]['style_cat_alias'] + '-' + positionout, posTmpls['outerclasses'])
        Vue.component('innerclasses-' + classez[b]['style_cat_alias'] + eltype + '-' + elid, posTmpls['innerclasses'])
    }
}