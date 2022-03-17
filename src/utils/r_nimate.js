import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';
import { parseCSSValue } from "./css_util";
import { interpolation_functions } from "./math_util"
import { warn } from "vue";

const clog = console.log

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

class R_animate_config {
    constructor(config) {
        const { start, end, duration, delay, interpolation } = config
        Object.keys(config).forEach(key => {
            this[key] = config[key]
        })
        this.start = start || {}
        this.end = end || {}
        this.duration = _.isNumber(duration) ? duration : 0
        this.delay = delay || 0
        this.interpolation = interpolation || 'easeOutExpo'

    }

    replace(obj) {
        return deep_assign(this, obj)
    }

    r_delay(delay_duration) {
        const res = _.cloneDeep(this)
        res.delay = delay_duration
        return res
    }

    r_reverse() {
        return new R_animate_config({
            start: this.end,
            end: this.start,
            ...this
        })
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
    constructor(r_id, item) {
        this.r_id = r_id
        this.ref = item
        this.in_animation = false
        this.queue = []
    }

    run() {
        if (this.in_animation) return
        this.in_animation = true
        if (this.queue.length === 0) {
            warn(this.ref.toString() + '’s queue is empty')
        }
        const config = this.queue.shift()
        if (!config) return
        let frame_index = 0
        const render = () => {
            Object.keys(config).forEach(key => {
                const extract_number_reg = /\[(-|\d|\.)+?~(-|\d||\.)+?\]/g
                if (!_.isString(config[key])) return
                const extract_res = config[key].match(extract_number_reg)
                if (!_.isArray(extract_res) || !extract_res.length) return
                let groove = config[key].replace(extract_number_reg, '{}')
                const slots = extract_res.map(range => {
                    const inter_func = interpolation_functions(config.interpolation)
                    const [start_value, end_value] = range.replace('[', '').replace(']', '').split('~').map(o => _.toNumber(o))
                    if ((frame_index) * 16 >= config.plan_duration) {
                        return end_value
                    }
                    const ratio = inter_func(frame_index * 16 / config.plan_duration)
                    return start_value + (end_value - start_value) * ratio
                })
                slots.forEach(value => {
                    groove = groove.replace('{}', Math.round(value * 1000) / 1000)
                })
                this.ref.style[key] = groove
            })
            frame_index += 1
            if ((frame_index - 1) * 16 < config.plan_duration) {
                requestAnimationFrame(render)
            } else {
                this.in_animation = false
                if (this.queue.length) this.run()
            }
        }
        this.render_process = requestAnimationFrame(render)
    }

    stop() {
        if (this.render_process) {
            cancelAnimationFrame(this.render_process)
        }
        this.in_animation = false
        this.render_process = undefined
    }

    r_same(target) {
        target.queue = target.queue.concat(this.queue)
        setTimeout(() => {
            target.run()
        }, 16)
        return target
    }

    r_animate(config) {
        this.queue.push(new R_animate_config(config))
        if (!this.in_animation) {
            setTimeout(() => {
                this.run()
            }, 16)
        }
        return this.ref
    }

    r_then(func) {
        const sum_duration = this.queue.reduce((pre, now) => {
            return pre + now.plan_duration
        }, 0)
        setTimeout(() => {
            func()
        }, sum_duration)
        return this.ref
    }

    r_sleep(delay_duration) {
        this.queue.push(new R_animate_config({
            delay: delay_duration
        }))
        if (!this.in_animation) {
            setTimeout(() => {
                this.run()
            }, 16)
        }
        return this.ref
    }
}

// todo implement a director class to control all the registered dom
class R_director {
    constructor() {
        this.id = uuidv4().replace(/-/g, "")

        this.registered_dict = {}

        this.registered_queue = []
    }

    register(args) {
        // todo deal the situation that one dom was registered for more than one time
        const wait_register_queue = []
        if (!_.isArray(args)) {
            const r_id = uuidv4().replace(/-/g, "")
            wait_register_queue.push(r_id)
            this.registered_dict[r_id] = new R_registered_dom(r_id, args)
            this.registered_queue.push(this.registered_dict[r_id])
        } else {
            args = _.compact(args)
            args.forEach(item => {
                const r_id = uuidv4().replace(/-/g, "")
                wait_register_queue.push(r_id)
                this.registered_dict[r_id] = new R_registered_dom(r_id, item)
                this.registered_queue.push(this.registered_dict[r_id])
            })
        }

        wait_register_queue.forEach(r_id => {
            const registered_dom = this.registered_dict[r_id]
            const element = registered_dom.ref
            element.r_id = r_id
            element.queue = registered_dom.queue
            element.run = registered_dom.run.bind(registered_dom)
            element.r_animate = registered_dom.r_animate.bind(registered_dom)
            element.r_same = registered_dom.r_same.bind(registered_dom)
            element.r_then = registered_dom.r_then.bind(registered_dom)
            element.r_sleep = registered_dom.r_sleep.bind(registered_dom)
        })
    }

    take(env) {
        Object.keys(env.$refs).forEach(ref_name => {
            this.register(env.$refs[ref_name])
        })
    }

    stop() {

    }

    continue() {

    }

    cut() {
        this.registered_queue.forEach(member => {
            member.queue = []
            member.stop()
        })
    }

    read() {
        console.log('I am', this.id)
        return this.registered_queue
    }

    copy(origin, targets) {
        const origin_dom = this.registered_dict[origin.r_id]
        targets.forEach(target => {
            const registered_dom = this.registered_dict[target.r_id]
            registered_dom.queue = registered_dom.queue.concat(origin_dom.queue)
            setTimeout(() => {
                registered_dom.run()
            }, 16)
            return registered_dom.ref
        })
    }
}

export default R_director