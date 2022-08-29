import { atom, selector } from 'recoil'
import { toMolecule } from './api'

const exampleValue = atom({
    key: 'exampleValue',
    default: 10,
})
const exampleValueB = atom({
    key: 'exampleValueB',
    default: 'A',
})
const exampleSelector = selector({
    key: 'examplestate',
    get: ({ get }) => get(exampleValue) * 100,
})

interface IProviderValue {
    exampleValue: number
    exampleValueB: string
    exampleSelector: number
}

const exampleProvider = toMolecule<IProviderValue>({
    exampleValue,
    exampleValueB,
    exampleSelector,
})

export default exampleProvider
