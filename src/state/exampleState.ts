import {
    atom,
    atomFamily,
    RecoilState,
    RecoilValueReadOnly,
    selector,
    selectorFamily,
    SetRecoilState,
} from 'recoil'
import { stateTree } from './api'

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
export interface IProvider<> {
    [key: string]: RecoilState<any> | RecoilValueReadOnly<any> | any
    exampleValue: RecoilState<number>
    exampleValueB: RecoilState<any>
    exampleSelector: RecoilValueReadOnly<any>
    molecule: (param: string[]) => RecoilState<IProviderValue>
}
interface IProviderValue {
    [key: string]: any
    exampleValue?: number
    exampleValueB?: string
    exampleSelector?: number
}

const serializer = (provider: Omit<IProvider, 'molecule'>) => {
    const group = selectorFamily({
        key: '_molecule',
        get: (atomList: string[]) => {
            return ({ get }) => {
                const result: IProviderValue = {}
                if (atomList.length) {
                    Object.keys(provider).forEach((key) => {
                        if (atomList.includes(key)) {
                            const p = provider[key]
                            if (p) result[key] = get(p)
                        }
                    })
                } else {
                    Object.keys(provider).forEach((key) => {
                        const p = provider[key]
                        if (p) result[key] = get(p)
                    })
                }
                return result
            }
        },
        set: (atomList: string[]) => {
            return ({ set }: { set: SetRecoilState }, newValue: any) => {
                atomList.forEach((key) => {
                    const state = provider[key]
                    set<any>(state as RecoilState<any>, newValue[key])
                })
            }
        },
    })

    return {
        ...provider,
        molecule: group,
    } as IProvider
}
const exampleProvider: IProvider = serializer({
    exampleValue,
    exampleValueB,
    exampleSelector,
})

export default exampleProvider
