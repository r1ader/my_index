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
    // h1
    return text
        .replace( // h1
            /(?:^|\n)#[\u202F\u00A0\s](.*)\n*/g,
            (match, ...p) => `<h1>${ p[0].replace(/\s/g, '&nbsp;') }</h1>`
        )
        .replace( // code
            /```\n*([\s\S]+?)```/g,
            (match, ...p) => {
                return `<div class="code">${
                    p[0].replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;')
                }</div>`
            }
        )
        .replace( // code
            /`(.*)`(\S+?\s)/g,
            (match, ...p) => {
                return `<code style="background: ${ p[1] }">${ p[0].replace(/\s/g, '&nbsp;') }</code>`
            }
        )
        .replace( // code
            /`(.*)`(#[\d\w]+?\s)/g,
            (match, ...p) => {
                return `<code style="background: ${ p[1] }">${ p[0].replace(/\s/g, '&nbsp;') }</code>`
            }
        )
        .replace(
            / ( +)/g, (match, ...p) => {
                return ` ${ '&nbsp;'.repeat(p[0].length) }`
            }
        )
}

export const reverseMarked = (text) => {
    return text
        .replace(/<h1>(.*?)<\/h1>/g, (match, ...p) => {
            return `\n# ${ p[0] }\n\n`
        })
        .replace(/<div class="code">(.*?)<\/div>/g, (match, ...p) => {
            return `\`\`\`\n${ p[0].replace(/<br>/g, '\n') }\`\`\`\n`
        })
        .replace(/<code style="background: (.*?)">(.*?)<\/code>/g, (match, ...p) => {
            return `\`${ p[1] }\`${ p[0] }`
        })
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
    // if (!el.length) return el.focus()
    const range = document.createRange()
    const sel = window.getSelection()
    // console.log(el, el.toString())
    // console.log(el.childNodes[0], el.childNodes[0].toString())
    try {
        if (el.toString() === '[object Text]') {
            range.setStart(el, offset)
        } else {
            range.setStart(el.childNodes[0], offset)
        }
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
    } catch (e) {
        console.warn(e)
    }
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

export const get_node_path = (root, node) => {
    let result = ''
    while (node !== root) {
        const index = [...node.parentNode.childNodes].indexOf(node)
        result = '.' + index + result
        node = node.parentNode
        if (!node || !node.parentNode) return false
    }
    result = '$' + result
    return result
}

export const get_node_by_path = (root, path) => {
    if (path === '$') return root
    path.split('.').slice(1).forEach(index => {
        if (!root.childNodes || root.childNodes.length <= index) return
        root = root.childNodes[index]
    })
    console.log(path, root)
    return root
}
