import { marked, reverseMarked } from "./index";

test('test marked', () => {
    let inputs = [
        `# first line`,

        `# first line
         # second line
         `
    ]
    inputs.forEach((o, i) => {
        console.log(marked(o))
        expect(reverseMarked(marked(o))).toBe(o);
    })
});
