import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';
import { interpolation_functions } from "./math_util"
import { warn } from "vue";
import { deep_assign } from "./index";

const clog = console.log

const expose_func_list = [
    'clean_remain_process',
    'r_animate',
    'r_then',
]

const expose_props_list = [
    'r_id',
    'in_animation',
    'queue',
]

class R_animate_config {
    constructor(config) {
        const { start, end, duration, delay, interpolation, reverse } = config
        Object.keys(config).forEach(key => {
            this[key] = config[key]
        })
        this.name = config.name
        this.callback = config.callback
        this.start = start || {}
        this.end = end || {}
        this.reverse = reverse || false
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
                    let [start_value, end_value] = range.replace('[', '').replace(']', '').split('~').map(o => _.toNumber(o))
                    if (config.reverse) {
                        [start_value, end_value] = [end_value, start_value]
                    }
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
                if (_.isFunction(config.callback)) {
                    config.callback()
                }
                if (!!this.queue.length) this.run()
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

    clean_remain_process() {
        this.queue = []
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
        this.queue.push(new R_animate_config({ duration: 0, callback: func }))
        return this.ref
    }

    r_same(target) {
        target.queue = target.queue.concat(this.queue)
        setTimeout(() => {
            target.run()
        }, 16)
        return target
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
            expose_props_list.forEach(props_name => {
                element[props_name] = registered_dom[props_name]
            })
            expose_func_list.forEach(func_name => {
                element[func_name] = registered_dom[func_name].bind(registered_dom)
            })
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
