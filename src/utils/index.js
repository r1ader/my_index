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