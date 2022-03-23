import { isAnimationValid } from './src/util'

const true_array = [
    // only css
    '90px', '20px', '10', '0', '1',
    // transform
    'scale(1)', 'translate(-10px,10px)', 'rotate(0)',
    'translate([300~-80]px, [300~-30]px) rotateZ(20deg)',
    'translate([300~-50]px,-100px) scale(0.7) perspective(500px) rotateY(-40deg) rotateX(20deg) rotateZ(-50deg)',
    // animation
    '[1~20]px',
    '[~20]px',
    '[0~578]px',
    '[0~1]',
    '[0~0]',
    '[0~888.5]px',
]

true_array.forEach(input => {

    test(`${ input } should be true`, () => {
        expect(isAnimationValid(input)).toBe(true);
    })
})
const false_array = [
    '90p',
    '20x',
    '[1~]px',
    '[-20]px',
    '[~20px]',
    '[20]px',
]
false_array.forEach(input => {
    test(`${ input } should be false`, () => {
        expect(isAnimationValid(input)).toBe(false);
    })
})