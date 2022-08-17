import { useRecoilState, useRecoilValue, useSetRecoilState } from './state/api'

const AtomBox = () => {
    const [atomValue, setAtomValue] = useRecoilState(
        (state) => state.exampleProvider.exampleValue,
    )

    const selectorValue = useRecoilValue(
        (state) => state.exampleProvider.exampleSelector,
    )
    const addAtom = () => setAtomValue((prev) => prev + 10)
    return (
        <>
            <h2>Basic Recoil</h2>
            <p>atom: {atomValue}</p>
            <p>selector: {selectorValue}</p>
            <button onClick={addAtom}>add Atom</button>
            <hr />
        </>
    )
}

const NoRenderBox = () => {
    const noRenderValue = useRecoilValue(
        (state) => state.exampleProvider.exampleValueB,
    )
    console.log('This text should be printed only the first time')
    return (
        <>
            <h2>No Render</h2>
            <p>noRenderValue: {noRenderValue}</p>
            <hr />
        </>
    )
}
const MoleculeBox = () => {
    const molecule = useRecoilValue((state) =>
        state.exampleProvider.molecule([]),
    )

    return (
        <>
            <h2>Molecule</h2>
            <p>atom: {molecule.exampleValue}</p>
            <p>selector: {molecule.exampleSelector}</p>
            <hr />
        </>
    )
}

const AtomInMoleculeBox = () => {
    const [atomInMolecule, setAtomInMolecule] = useRecoilState((state) =>
        state.exampleProvider.molecule(['exampleValue', 'exampleValueB']),
    )
    const subAtom = () =>
        setAtomInMolecule((prev) => ({
            exampleValue: prev.exampleValue! - 10,
            exampleValueB: prev.exampleValueB + 'B',
        }))
    return (
        <>
            <h2>atomInMolecule</h2>
            <p>atom: {atomInMolecule.exampleValue}</p>
            <button onClick={subAtom}>sub atom</button>
        </>
    )
}
function App() {
    return (
        <div className="App">
            <AtomBox />
            <NoRenderBox />
            <MoleculeBox />
            <AtomInMoleculeBox />
        </div>
    )
}

export default App
