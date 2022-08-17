import {
    RecoilState,
    RecoilValueReadOnly,
    useRecoilState as useRecoilState_,
    useRecoilValue as useRecoilValue_,
    useSetRecoilState as useSetRecoilState_,
} from 'recoil'
import exampleProvider, { IProvider } from './exampleState'

export const stateTree = {
    exampleProvider,
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
