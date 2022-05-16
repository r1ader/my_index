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

export const marked = (text, output_type = 'dom') => {
    return output_type === 'dom' ?
        text.replace(/```([\s\S]+?)```/g, `<div class="code">$1</div>`)
            .replace(/`(.*)`(\S+?\s)/g, `<span style="background: $2" class="code_span">$1</span>`)
            .replace(/`(.*)`(#[\d\w]+?\s)/g, `<span style="background: $2" class="code_span">$1</span>`)
            .replace(/#####[\u202F\u00A0\s](.*)/g, `<h5>$1</h5>`)
            .replace(/####[\u202F\u00A0\s](.*)/g, `<h4>$1</h4>`)
            .replace(/###[\u202F\u00A0\s](.*)/g, `<h3>$1</h3>`)
            .replace(/##[\u202F\u00A0\s](.*)/g, `<h2>$1</h2>`)
            .replace(/#[\u202F\u00A0\s](.*)/g, `<h1>$1</h1>`)
            .replace(/\n\n+/g, `<br>`)
        :
        text.replace(/```([\s\S]+?)```/g, `$1`)
            .replace(/`(.*)`(\S+?\s)/g, `$1`)
            .replace(/`(.*)`(#[\d\w]+?\s)/g, `$1`)
            .replace(/#####[\u202F\u00A0\s](.*)/g, `$1`)
            .replace(/####[\u202F\u00A0\s](.*)/g, `$1`)
            .replace(/###[\u202F\u00A0\s](.*)/g, `$1`)
            .replace(/##[\u202F\u00A0\s](.*)/g, `$1`)
            .replace(/#[\u202F\u00A0\s](.*)/g, `$1`)
            .replace(/\n\n+/g, `<br>`)
}

export const unMarked = (text) => {
    return text
        .replace(/<h1>(.*)<\/h1>/g, `# $1`)
}

export const reverseMarked = (text, md_type) => {
    text = text.replace(/\n/g, '\n\n')
    switch (md_type) {
        case 'h1':
            return `# ${ text }`
        case 'h2':
            return `## ${ text }`
        case 'h3':
            return `### ${ text }`
        case 'h4':
            return `#### ${ text }`
        case 'h5':
            return `##### ${ text }`
        default:
            return text
    }
}

export const format_space = (text) => {
    return decodeURI(encodeURI(text).replace('%C2%A0', '%20'))
}

export const textSplice = (text, position, deleteNum, ...items) => {
    return text.slice(0, position) +
        items.join('') +
        text.slice(position + deleteNum)
}

export const set_cursor_position = (el, offset) => {
    if (!el.childNodes.length) return el.focus()
    const range = document.createRange()
    const sel = window.getSelection()

    range.setStart(el.childNodes[0], offset)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
}

export const get_cursor = () => {
    const {
        anchorNode,
        anchorOffset,
        focusNode,
        focusOffset
    } = getSelection()
    const { textContent } = anchorNode
    return {
        anchorNode,
        anchorOffset,
        focusOffset,
        isSelected: !(focusNode === anchorNode && anchorOffset === focusOffset),
        isCursorAtHead: anchorOffset === 0,
        isCursorAtEnd: anchorOffset === anchorNode.length,
        textBeforeCursor: textContent.slice(0, anchorOffset),
        textAfterCursor: textContent.slice(anchorOffset),
        characterBeforeCursor: textContent[anchorOffset - 1],
        characterAfterCursor: textContent[anchorOffset],
    }
}
