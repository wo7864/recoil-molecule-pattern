import {
    RecoilState,
    RecoilValueReadOnly,
    selectorFamily,
    SetRecoilState,
    useRecoilState as useRecoilState_,
    useRecoilValue as useRecoilValue_,
    useSetRecoilState as useSetRecoilState_,
} from 'recoil'
import { stateTree } from '../App'
const PRINTABLE =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'
const PRINTABLE_LEN = PRINTABLE.length

function getBetweenInt(min: number, max: number) {
    return Number((Math.random() * (max - min) + min).toFixed())
}
const randId = () => {
    return Array(12)
        .fill(0)
        .map(() => PRINTABLE[getBetweenInt(0, PRINTABLE_LEN)])
        .join('')
}
export interface IProviderType {
    [key: string]: RecoilState<any> | RecoilValueReadOnly<any>
}

export const toMolecule = <IProviderValue>(provider: IProviderType) => {
    const id = randId()
    const group = selectorFamily({
        key: `${id}_molecule`,
        get: (atomList: string[]) => {
            return ({ get }) => {
                const result = {} as { [key: string]: any }
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
                return result as IProviderValue
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

    return group
}
export const useRecoilValue = <T>(
    func: (store: typeof stateTree) => RecoilState<T> | RecoilValueReadOnly<T>,
) => {
    const state = func(stateTree)
    return useRecoilValue_(state)
}

export const useRecoilState = <T>(
    func: (store: typeof stateTree) => RecoilState<T>,
) => {
    const state = func(stateTree)
    return useRecoilState_(state)
}

export const useSetRecoilState = <T>(
    func: (store: typeof stateTree) => RecoilState<T>,
) => {
    const state = func(stateTree)
    return useSetRecoilState_(state)
}
