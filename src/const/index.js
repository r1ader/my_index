export const NON_BREAKING_SPACE = "%C2%A0"
export const H1_PATTERN = /^#[\u202F\u00A0\s]/
export const H2_PATTERN = /^##[\u202F\u00A0\s]/
export const H3_PATTERN = /^###[\u202F\u00A0\s]/
export const H4_PATTERN = /^####[\u202F\u00A0\s]/
export const H5_PATTERN = /^#####[\u202F\u00A0\s]/
export const H1_STYLE = { fontSize: '50px', fontWeight: 'bolder' }
export const H2_STYLE = { fontSize: '40px', fontWeight: 'bolder' }
export const H3_STYLE = { fontSize: '30px', fontWeight: 'bolder' }
export const H4_STYLE = { fontSize: '20px', fontWeight: 'bolder' }
export const H5_STYLE = { fontSize: '20px' }
export const PLAIN_STYLE = {
    fontSize: '20px'
}
export const PATTERNS = [
    { PATTERN: H1_PATTERN, MD_TYPE: "h1", STYLE: H1_STYLE },
    { PATTERN: H2_PATTERN, MD_TYPE: "h2", STYLE: H2_STYLE },
    { PATTERN: H3_PATTERN, MD_TYPE: "h3", STYLE: H3_STYLE },
    { PATTERN: H4_PATTERN, MD_TYPE: "h4", STYLE: H4_STYLE },
    { PATTERN: H5_PATTERN, MD_TYPE: "h5", STYLE: H5_STYLE },
]
export const ANCHOR_OFFSET_START = 0
export const ANCHOR_OFFSET_END = 1
