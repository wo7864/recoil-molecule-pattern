import { useRecoilState, useRecoilValue, useSetRecoilState } from './state/api'
import exampleProvider from './state/exampleState'

export const stateTree = {
    exampleProvider,
}

// const AtomBox = () => {
//     const [atomValue, setAtomValue] = useRecoilState(
//         (state) => state.exampleProvider.exampleValue,
//     )

//     const selectorValue = useRecoilValue(
//         (state) => state.exampleProvider.exampleSelector,
//     )
//     const addAtom = () => setAtomValue((prev) => prev + 10)
//     return (
//         <>
//             <h2>Basic Recoil</h2>
//             <p>atom: {atomValue}</p>
//             <p>selector: {selectorValue}</p>
//             <button onClick={addAtom}>add Atom</button>
//             <hr />
//         </>
//     )
// }

// const NoRenderBox = () => {
//     const noRenderValue = useRecoilValue(
//         (state) => state.exampleProvider.exampleValueB,
//     )
//     console.log('This text should be printed only the first time')
//     return (
//         <>
//             <h2>No Render</h2>
//             <p>noRenderValue: {noRenderValue}</p>
//             <hr />
//         </>
//     )
// }
const MoleculeBox = () => {
    console.log('repaint A or B')
    const molecule = useRecoilValue((state) => state.exampleProvider([]))

    return (
        <>
            <h2>Molecule</h2>
            <p>atom: {molecule.exampleValue}</p>
            <p>atom: {molecule.exampleValueB}</p>
            <p>selector: {molecule.exampleSelector}</p>
            <hr />
        </>
    )
}

const MoleculeBoxA = () => {
    console.log('repaintA')
    const molecule = useRecoilValue((state) =>
        state.exampleProvider(['exampleValue']),
    )

    return (
        <>
            <h2>Molecule A</h2>
            <p>atom: {molecule.exampleValue}</p>
            <p>atom: {molecule.exampleValueB}</p>
            <hr />
        </>
    )
}
const MoleculeBoxB = () => {
    console.log('repaintB')
    const molecule = useRecoilValue((state) =>
        state.exampleProvider(['exampleValueB']),
    )

    return (
        <>
            <h2>Molecule B</h2>
            <p>atom: {molecule.exampleValueB}</p>
            <hr />
        </>
    )
}

const AtomInMoleculeBox = () => {
    const [atomInMolecule, setAtomInMolecule] = useRecoilState((state) =>
        state.exampleProvider(['exampleValue', 'exampleValueB']),
    )

    const addA = () =>
        setAtomInMolecule((prev) => ({
            ...prev,
            exampleValue: prev.exampleValue + 50,
        }))
    const addB = () =>
        setAtomInMolecule((prev) => ({
            ...prev,
            exampleValueB: prev.exampleValueB + 'C',
        }))

    return (
        <>
            <h2>atomInMolecule</h2>
            <p>atom: {atomInMolecule.exampleValue}</p>
            <button onClick={addA}>Add A</button>
            <button onClick={addB}>Add B</button>
        </>
    )
}
function App() {
    return (
        <div className="App">
            {/* <AtomBox />
            <NoRenderBox /> */}
            <MoleculeBox />
            <MoleculeBoxA />
            <MoleculeBoxB />
            <AtomInMoleculeBox />
        </div>
    )
}

export default App
