import { atom, atomFamily, RecoilState, selector, selectorFamily } from 'recoil'

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

const exampleAtomFamily = atomFamily({
    key: 'exampleatomFamily',
    default: (v: number) => v + 5,
})

const exampleProvider = {
    exampleValue,
    exampleValueB,
    exampleSelector,
}
type ExampleList = 'exampleValue' | 'exampleSelector'

const serializer = (provider: typeof exampleProvider) => {
    const group = selectorFamily({
        key: 'group',
        get: (atomList: ExampleList[] = []) => {
            return ({ get }) => {
                const result: { [str: string]: any } = {}
                if (atomList.length) {
                    Object.keys(provider).forEach((key) => {
                        if (atomList.includes(key as ExampleList))
                            result[key] = get(provider[key as ExampleList])
                    })
                } else
                    Object.keys(provider).forEach((key) => {
                        result[key] = get(provider[key as ExampleList])
                    })
                return result
            }
        },
        set: (atomList: ExampleList[]) => {
            return ({ set }, newValue: any) => {
                const state = provider[atomList[0]]
                if (typeof newValue === 'number')
                    set<number>(state as RecoilState<number>, newValue)
            }
        },
    })

    return {
        ...provider,
        group: group,
    }
}
export default serializer(exampleProvider)
