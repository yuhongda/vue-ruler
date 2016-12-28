import VueRuler from './VueRuler.vue'

export function install(Vue, options) {

    VueRuler.mixins = VueRuler.mixins || [];

    options = options || {};

    VueRuler.mixins.push({
        props:{
            max:{
                type:Number,
                default:options.max || 1000
            },
            step:{
                type:Number,
                default:options.step || 10
            },
            unit:{
                type:Number,
                default:options.unit || 10
            }
        }
    })

    Vue.component('vue-ruler', VueRuler);
}
