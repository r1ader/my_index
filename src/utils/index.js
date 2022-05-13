import _ from "lodash";

export const clog = console.log

export function getElSize(target) {
    const viewportOffset = target.getBoundingClientRect();
    const top = viewportOffset.top;
    const left = viewportOffset.left;
    let {
        width,
        height,
        padding,
        backgroundColor,
        borderColor,
        borderRadius
    } = getComputedStyle(target)
    width = parseFloat(width.replace('px', ''))
    height = parseFloat(height.replace('px', ''))
    padding = parseFloat(padding.replace('px', ''))
    borderRadius = parseFloat(borderRadius.replace('px', ''))
    return {
        width,
        height,
        top,
        left,
        padding,
        backgroundColor,
        borderColor,
        borderRadius
    }
}

export const debounce = (actor) => {
    while (actor.schedule.length >= 2) {
        actor.schedule.shift()
        actor.schedule.shift()
    }
}

export const marked = (text) => {
    return text
        .replace(/```([\s\S]+?)```/g, `<div class="code">$1</div>`)
        .replace(/`(.+)`/g, `<span class="code_span">$1</span>`)
        .replace(/#####(.+)/g, `<h5>$1</h5>`)
        .replace(/####(.+)/g, `<h4>$1</h4>`)
        .replace(/###(.+)/g, `<h3>$1</h3>`)
        .replace(/##(.+)/g, `<h2>$1</h2>`)
        .replace(/#(.+)/g, `<h1>$1</h1>`)
}
