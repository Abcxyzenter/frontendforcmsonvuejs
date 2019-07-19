import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(Vuex)
const store = () => new Vuex.Store({
    state: {
        //пока не используется
        todel: [],
        tocreate: [],
        //используется, например, для элементов, добавленных на стр
        edited: [],
        base: '',
        //сюда тупо пуш всего base при каждом действии
        undoarr: [],
        //сюда тупо пуш текущего base при каждом анду
        redoarr: [],
        tempArrChecker: '',
        //массив для display block/none
        showhides: [{
            mainWins: {
                'pageSets': 'hide',
                'catTree': 'hide',
                'elemTree': 'hide',
                'pageElems': 'hide'
            },
            'positionSettings': {},
            'inPositionSettings': {},
            'elemFolders': {},
            'elemFolderRename': {},
            'elemSettingsAllInTree': {},
            'elemSettings': {},
            'elemFolderSetts': {},
            'catFolders': {},
            'catRenameCatOrPage': {},
            'catSettings': {},
            'pagesTemplateSettings': {},
            'pagesOneElemAddOrRemove': {},
            'catSeo': {},
            'catShops': {},
            'catImg': {},
            'catBackImg': {},
            'catBackVideo': {}
        }],
        //localsetts
        elemTreeMode: 'normal',
        elemsOperations: [{}], //сюда же чекед состояние для элементов надо записывать(а не как щас)
        //для применения позиций на другие страницы
        templateListPosition: {
            'all': {
                'mode': 'insidePage',
                'insert': 'insideAfter',
                'fromstart': '0',
                'fromend': '0',
                'passfirst': false,
                'passlast': false
            },
        },
        //режим настроек вставки: для всех блоков или по отдельности
        inputTemplatesMode: {
            'mode': 'all'
        },
        //show&hide например
        catOperations: [{
            'cattree': 'normal',
            'catsubmode': '',
            'catChilds': {},
            'cattmp': '',
            'tmp': {},
            'groupCatTransit': '',
            'groupСatTrash': '',
            'groupСatDel': '',
        }]
    },
    actions,
    mutations,
    getters
})
export default store