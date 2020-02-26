const { view, compose, lens, over } = require('ramda')
const { Map, List } = require('immutable')

const address = List.of(
    '1113 Main St',
    '321 Maple Av',
    '99 Elm St')

const person = Map({ 'name': 'John Doe', address: address })

const _namePerson = lens(person => person.get('name'), (name, person) => person.set('name', name))
const _addressPerson = lens(person => person.get('address'), (address, person) => person.set('address', address))
const _first = lens(l => l.get(0), (newValue, l) => l.set(0, newValue))

const _personFirstAddress = compose(_addressPerson, _first)

console.log(view(_addressPerson, person).toJS())
console.log(over(_personFirstAddress, addr => addr + " (not valid)", person).toJS())
