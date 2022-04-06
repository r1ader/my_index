import { CURSOR_WRAP } from "./const/symbol";
import { isFunction } from "lodash";

export function beforeMounted(app) {
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
