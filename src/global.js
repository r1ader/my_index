import { CURSOR_WRAP } from "./const/symbol";
import { isFunction } from "lodash";
import { createStore } from "vuex";

function use_vuex(app) {
    const store = createStore({
        state() {
            return {
                count: 0
            }
        },
        mutations: {
            increase(state) {
                state.count++
            }
        }
    })
    app.use(store)
}

function add_directive(app) {
    app.directive('catchCursor',
        {
            mounted: (el, binding, vnode, prevnode) => {
                el.style.opacity = '0'
                el[CURSOR_WRAP] = true
                if (binding.arg === 'top') {
                    el['r_zIndex'] = 999
                    el['r_opacity'] = 0.4
                }
            }
        }
    )
}

export function beforeMounted(app) {
    use_vuex(app)
    add_directive(app)
}
