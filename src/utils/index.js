import _ from "lodash";

export const clog = console.log

export function deep_assign (target, origin) {
    Object.keys(origin).forEach(key => {
        if (_.isObject(origin[key])) {
            target[key] = deep_assign(target[key], origin[key])
        } else {
            target[key] = origin[key]
        }
    })
    return target
}