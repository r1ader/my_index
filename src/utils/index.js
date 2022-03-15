import _ from "lodash";
import {v4 as uuidv4} from 'uuid';

const registered_dict = {}

const registered_queue = []

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

const get_time_duration_from_string = (time_string) => {
    let res = 0
    const s_regex = /(\d+)s/g
    let found_res = time_string.match(s_regex)
    if (found_res) {
        res += parseFloat(found_res[0].replace('s', '')) * 1000
    }
    const ms_regex = /(\d+)ms/g
    found_res = time_string.match(ms_regex)
    if (found_res) {
        res += parseFloat(found_res[0].replace('ms', ''))
    }
    res = res | 0
    return res
}

export function r_register(args) {
    const wait_register_queue = []
    if (!_.isArray(args)) {
        const r_id = uuidv4().replace(/-/g, "")
        wait_register_queue.push(r_id)
        args.r_id = r_id
        registered_dict[r_id] = new R_registered_dom(r_id, args)
        registered_queue.push(registered_dict[r_id])
    } else {
        args.forEach(item => {
            const r_id = uuidv4().replace(/-/g, "")
            wait_register_queue.push(r_id)
            item.r_id = r_id
            registered_dict[r_id] = new R_registered_dom(r_id, item)
            registered_queue.push(registered_dict[r_id])
        })
    }
    wait_register_queue.forEach(r_id => {
        const element = registered_dict[r_id].ref
        element.r_animate = function (config) {
            registered_dict[r_id].queue.push(new R_animate_config(config))
            if (!registered_dict[r_id].in_animation) {
                registered_dict[r_id].run()
            }
            return this
        }
    })
}

export class R_animate_config {
    constructor(config) {
        const {start, end, duration, delay} = config
        this.start = start || {}
        this.end = end || {}
        this.duration = duration || 1000
        this.delay = delay || 0
    }

    replace(obj) {
        return deep_assign(this, obj)
    }

    r_delay(delay_duration) {
        this.delay = delay_duration
        return this
    }

    get plan_duration() {
        let res = 0
        // if (_.isString(this.start.transition)) {
        //     res += get_time_duration_from_string(this.start.transition)
        // }
        // if (_.isString(this.start.transitionDelay)) {
        //     res += get_time_duration_from_string(this.start.transitionDelay)
        // }
        // console.log('res', res)
        if (_.isNumber(this.delay)) res += this.delay
        if (_.isNumber(this.duration)) res += this.duration
        return res
    }

}

class R_registered_dom {
    constructor(id, item) {
        this.id = id
        this.ref = item
        this.in_animation = false
        this.queue = []
    }

    run() {
        if (this.in_animation) return
        this.in_animation = true
        const config = this.queue.pop()
        if (!config) return
        // console.log('run', config)
        console.log('run', config)
        const start = config.start
        const end = config.end

        this.ref.style.transition = `None`
        // setTimeout(() => {
        Object.keys(start).forEach(key => {
            this.ref.style[key] = start[key]
        })
        setTimeout(() => {
            this.ref.style.transition = `${config.duration}ms`
            Object.keys(end).forEach(key => {
                this.ref.style[key] = end[key]
            })
        }, 0)
        // }, config.delay)
        // todo find a better way to control css motion
        // todp rather than using setTimeout

        setTimeout(() => {
            this.in_animation = false
            if (this.queue.length) this.run()
        }, config.plan_duration)
    }
}