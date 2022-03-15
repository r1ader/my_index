export function r_register(element) {
    element.r_animate = function (start_style, end_style) {
        Object.keys(start_style).forEach(key => {
            element.style[key] = start_style[key]
        })
        setTimeout(() => {
            Object.keys(end_style).forEach(key => {
                element.style[key] = end_style[key]
            })
        }, 0)
    }
}

export default class r_animate_director {

}