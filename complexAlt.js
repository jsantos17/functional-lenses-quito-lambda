const { Map, List } = require('immutable')
const { set, view, compose, lens, over } = require('ramda')

const pretty = imm => JSON.stringify(imm.toJS(), null, 4)

const html = Map({
    'body': Map({
        'h1': 'Function optics',
        'span': Map({
            'div': Map({
                'ul': List([1, 2, 3])
            })
        }),
        'div': Map({
            'ul': List([7, 8, 9])
        })
    })
});

const _body = lens(s => s.get('body'), (a, s) => s.set('body', a))
const _div = lens(s => s.get('div'), (a, s) => s.set('div', a))
const _ul = lens(s => s.get('ul'), (a, s) => s.set('ul', a))
const _ol = lens(s => s.get('ol'), (a, s) => s.set('ol', a))
const _span = lens(s => s.get('span'), (a, s) => s.set('span', a))

const _innerList = compose(_body, _span, _div, _ul)
const _secondInnerList = compose(_body, _div, _ul)

const duplicateList = (html, selector) => over(selector, list => list.map(x => x*2), html)

console.log(pretty(duplicateList(html, _innerList)))

console.log(pretty(duplicateList(html, _secondInnerList)))
