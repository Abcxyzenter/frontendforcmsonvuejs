import Vue from 'vue'
import Vuex from 'vuex'
//сплиттер с array_unique и упорядочиванием по возрастанию
Vue.filter('splitt', function(val) {
    let a
    if(val) {
        a = val.split(',')
    }
    return a
})
//сплиттер с array_unique и упорядочиванием по возрастанию
Vue.filter('splitter', function(val) {
    let a = val.split(',')
    let c = []
    for(let i = 0; i < a.length; i++) {
        let el = a[i];
        if(!c.includes(el)) c.push(el);
    }
    c.sort(function(a, b) {
        return a - b;
    });
    return c
})
//считалка для внутренних позиций
Vue.filter('posLength', function(val) {
    let a = 1
    let c = []
    for(let b in val) {
        c.push(a)
        a++
    }
    return c
})
//искалка вложенных категорий
Vue.filter('ischild', function(val, list) {
    let a = false
    for(let i in list) {
        if(val == list[i]) {
            a = true
        }
    }
    return a
})