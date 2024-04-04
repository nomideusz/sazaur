// src/params/category.js
/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return ['sales', 'rental'].includes(param);
}
