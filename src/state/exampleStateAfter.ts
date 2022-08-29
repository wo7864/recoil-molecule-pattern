import {
    atom,
    atomFamily,
    RecoilState,
    RecoilValueReadOnly,
    selector,
    selectorFamily,
    SetRecoilState,
} from 'recoil'

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
export interface IProvider {
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
const props = {
    exampleValue,
    exampleValueB,
    exampleSelector,
}
type Props = typeof props
const serializer = (provider: Props) => {
    const group = selectorFamily({
        key: '_molecule',
        get: (atomList: (keyof typeof provider)[]) => {
            return ({ get }) => {
                const result: IProviderValue = {}
                if (atomList.length) {
                    ;(
                        Object.keys(provider) as (keyof typeof provider)[]
                    ).forEach((key) => {
                        if (atomList.includes(key)) {
                            const p = provider[key]
                            const t = result[key]
                            if (p) result[key] = get<any>(p)
                        }
                    })
                } else {
                    ;(
                        Object.keys(provider) as (keyof typeof provider)[]
                    ).forEach((key) => {
                        const p = provider[key]
                        if (p) result[key] = get<any>(p)
                    })
                }
                return result
            }
        },
        set: (atomList: (keyof typeof provider)[]) => {
            return ({ set }, newValue: any) => {
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
    }
}
const exampleProvider: Props & {
    molecule: (param: (keyof typeof props)[]) => RecoilState<any>
} = serializer({
    exampleValue,
    exampleValueB,
    exampleSelector,
})

export default exampleProvider
