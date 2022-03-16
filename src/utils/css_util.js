export function parseCSSValue(css_attribute_name, css_value, unit='px') {
    switch (css_attribute_name) {
        // todo add implement of transform
        case 'transform':
            break
        case 'opacity':
            return css_value
        case 'margin':
        case 'marginLeft':
        case 'marginRight':
        case 'marginTop':
        case 'marginBottom':
            return`${ css_value }${unit}`
    }
}