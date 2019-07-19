import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
//адрес страницы для первой загрузки
let firstload = 'http://abc/sys/page.php'
//сохранить весь vuex
const funcToSaveAll = 'http://abc/sys/save_vuex.php'
//функция, подгружающая категории и страницы в список
const returnCatToList = 'http://abc/sys/cat_to_list.php'
//функция, возвращающая список css классов для данного селекта
const returnCssSelect = 'http://abc/sys/css_to_select.php'
//подгрузка категориии элементов
const returnElemfolder = 'http://abc/sys/elemfolder_to_list.php'
//подгрузка элементов по списку id (an_elems)
const returnElems = 'http://abc/sys/elems_to_list.php'
//создать категорию элементов
const createFolderElems = 'http://abc/sys/folder_elems_create.php'
//создать категорию или страницу
const createPageOrCat = 'http://abc/sys/cat_page_create.php'
//проверить алиас
const aliasChecker = 'http://abc/sys/alias_check.php'
//функция переименования чего угодно
const renamer = 'http://abc/sys/renamer.php'
//функция удаления строки из БД
const toTrash = 'http://abc/sys/to_trash.php'
//функция удаления строки из БД
const delRow = 'http://abc/sys/del_row.php'
//функция удаления категорий элементов  и категорий страниц (совсем из БД, включая чайльды)
const delFolders = 'http://abc/sys/delete_folders.php'
//обновлябра чего угодно
const updaterDb = 'http://abc/sys/updater.php'
//создать тут элемент
const newElemCreate = 'http://abc/sys/new_elem_creator.php'
//переместить элемент в другую категорию
const moveElemOneToFolder = 'http://abc/sys/elem_move_to_folder.php'
//переместить элемент в другую категорию
const moveGroupElemToFolder = 'http://abc/sys/elem_group_move_to_folder.php'
//переместить элемент в другую категорию
const moveElemToTrash = 'http://abc/sys/elem_to_trash.php'
//подгрузить удаленные элементы
const loadTrashEl = 'http://abc/sys/load_trsh_elems.php'
//создать шаблон из страницы
const createTemplate = 'http://abc/sys/create_template.php'
//применить элемент к страницам
const elemsToPages = 'http://abc/sys/elem_to_pages.php'
//загрузка главной стр или любой другой
// (т.е. где is_homepage=1 или id=xxx)
export function firstLoad(wherewhat, searchingval) {
    return new Promise((resolve, reject) => {
        axios.post(firstload, {
            wherewhat, searchingval
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
export function updateDb(arra) {
    return new Promise((resolve, reject) => {
        axios.post(updaterDb, arra, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
export function renameThis(arra) {
    return new Promise((resolve, reject) => {
        axios.post(renamer, arra, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
export function moveToTrashElem(arra) {
    return new Promise((resolve, reject) => {
        axios.post(moveElemToTrash, arra, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
            // console.log(response.data)
        }, reject)
    })
}
export function toTrashThis(arra) {
    return new Promise((resolve, reject) => {
        axios.post(toTrash, arra, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
            // console.log(response.data)
        }, reject)
    })
}
export function delCatOrFolder(arra) {
    return new Promise((resolve, reject) => {
        axios.post(delFolders, arra, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
//подгрузить список категорий
export function loadThisCats(catData) {
    return new Promise((resolve, reject) => {
        axios.post(returnCatToList, catData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
//подгрузить  каталог элементов
export function loadThisElemfolder(catData) {
    return new Promise((resolve, reject) => {
        axios.post(returnElemfolder, catData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
//подгрузить  элементы по списку id в массиве
export function loadElemsData(catData) {
    return new Promise((resolve, reject) => {
        axios.post(returnElems, catData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
//подгрузить удаленные элементы
export function loadTrashEls() {
    return new Promise((resolve, reject) => {
        axios.post(loadTrashEl, 'ok', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
export function thisCssSelect(cssName) {
    return new Promise((resolve, reject) => {
        axios.post(returnCssSelect, {
            cssName
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
export function createElemFolder(datas) {
    return new Promise((resolve, reject) => {
        axios.post(createFolderElems, datas, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
export function createElementHere(datas) {
    return new Promise((resolve, reject) => {
        axios.post(newElemCreate, datas, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
export function moveElemOneForFolder(datas) {
    return new Promise((resolve, reject) => {
        axios.post(moveElemOneToFolder, datas, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
export function moveElemGroupForFolder(datas) {
    return new Promise((resolve, reject) => {
        axios.post(moveGroupElemToFolder, datas, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
export function checkAlias(alias) {
    return new Promise((resolve, reject) => {
        axios.post(aliasChecker, alias, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
//создать категорию или страницу
export function createCatOrPage(datas) {
    return new Promise((resolve, reject) => {
        axios.post(createPageOrCat, datas, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
//создать категорию или страницу
export function letsCreateTemplate(datas) {
    return new Promise((resolve, reject) => {
        axios.post(createTemplate, datas, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
//создать категорию или страницу
export function elemToPages(datas) {
    return new Promise((resolve, reject) => {
        axios.post(elemsToPages, datas, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            resolve(response)
        }, reject)
    })
}
//функция "сохранить все"
// (отправляет почти весь vuex и возвращает обновленное)
//!!!элементы он обновляет только те, которые записаны в переменной edited
export const saveAll = {
    methods: {
        saveAll: function(datas) {
            return new Promise((resolve, reject) => {
                axios.post(funcToSaveAll, datas, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((response) => {
                    //  console.log(response.data)
                    resolve(response)
                }, reject)
            })
        }
    }
}