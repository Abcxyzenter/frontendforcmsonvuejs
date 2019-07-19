import Vue from 'vue'
export const showCheckLoader = {
    //show-check-loader (mode: el/cat, by what select)
}
export const okButton = {
    //closeAll (for in compsArr data)
}
export const showThis = {
    data: function() {
        return {
            showme: false,
            showthis: 'displayblock',
            hidethis: 'displaynone'
        }
    },
    methods: {
        showThis: function() {
            this.showme = !this.showme
        },
        showById: function(elid) {
            let checkthis = document.getElementById(elid);
            let tempcheck = window.getComputedStyle(checkthis, "");
            checkthis.style.display = (tempcheck.display == 'none') ? 'block' : 'none';
        },
    },
}
//кнопка сохранения в хранилище
export const dataToVuex = {
    methods: {
        //отправка настроек элемента в хранилище
        //!!закрывает модальное окно
        elemSetsToVuex: function(eldata) {
            this.$store.dispatch('dataElementForVuex', eldata)
            this.$store.dispatch('showHideModal', {
                'modal': 'modalwrapper-elem' + eldata['el_type'] + '-' + eldata['id']
            })
        },
    }
}
//кнопка сохранения в хранилище
export const cancelButton = {
    methods: {
        //отмена изменений всего элемента
        //закрывает окно
        elemAllCancel: function(elemdata) {
            let a = elemdata['el_class']
            let b = elemdata['el_type']
            let c = elemdata['id']
            for(var datas in elemdata) {
                elemdata[datas] = this.$store.state.base.jumper.elements_data[a][b][c]['0'][datas]
            }
            this.$store.dispatch('showHideModal', {
                'modal': 'elemsetts-' + c,
                'wintype': 'elemSettings'
            })
        },
        //отмена изменений одного элемента
        elemPartCancel: function(eldata, elempart) {
            let a = eldata['el_class']
            let b = eldata['el_type']
            let c = eldata['id']
            eldata[elempart] = this.$store.state.base.jumper.elements_data[a][b][c]['0'][elempart]
        },
    }
}
export const checkAlias = {
    //closeThis (by this data onclick)
}
export const closeAll = {
    //closeThis (by this data onclick)
}
export const createSomething = {
    //create (mode: el/cat/folder by parent_id-type/parent_id-class-type/class-type)
}
export const delSomething = {
    //del (mode: el/cat/folder by id/class-type-id/class-type-id)
}
export const showDir = {
    //showdir (by .filetype)
}
export const selectAndChange = {
    //select-and-change (fileway to store)
}
export const moveToParent = {
    //select-and-change (parent_id to store)
}
export const checkboxIo = {
    //checkbox io (mode: el/cat/folder by id/class-type-id/class-type-id)
}
export const radioButton = {
    //radiobutton (class of radios, mode: el/cat/folder by id/class-type-id/class-type-id)
}
export const undoButton = {
    //undo
}
export const redoButton = {
    //redo
}