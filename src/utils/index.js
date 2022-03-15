import _ from "lodash";

const deep_assign = (target, origin) => {
    Object.keys(origin).forEach(key => {
        if (_.isObject(origin[key])) {
            target[key] = deep_assign(target[key], origin[key])
        } else {
            target[key] = origin[key]
        }
    })
    return target
}

const register_dict = {}
const register_queue = []

export function r_register(args) {
    const wait_register_queue = []
    if (!_.isArray(args)) {
        const r_id = Date.now()
        wait_register_queue.push(r_id)
        register_dict[r_id] = {
            id: r_id,
            ref: args,
            in_animation: false,
            queue: []
        }
        register_queue.push(register_dict[r_id])
    } else {
        args.forEach(item => {
            const r_id = Date.now()
            wait_register_queue.push(r_id)
            register_dict[r_id] = {
                id: r_id,
                ref: item,
                in_animation: false,
                queue: []
            }
            register_queue.push(register_dict[r_id])
        })
    }
    wait_register_queue.forEach(element => {
        element.r_animate = function (config) {
            const start = config.start
            const end = config.end
            Object.keys(start).forEach(key => {
                element.style[key] = start[key]
            })
            setTimeout(() => {
                Object.keys(end).forEach(key => {
                    element.style[key] = end[key]
                })
            }, 0)
            return this
        }
    })
}

export class R_animate_config {
    constructor(config) {
        const {start, end} = config
        this.start = start
        this.end = end
    }


    replace(obj) {
        return deep_assign(this, obj)
    }

    delay(delay_duration) {
        this.start.transitionDelay = `${ delay_duration }ms`
        return this
    }


}

export default class r_animate_director {

}