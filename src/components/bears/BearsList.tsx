import { WhiteCard } from ".."
import { useBearStore } from "../../stores";
import { useShallow } from 'zustand/react/shallow'

export const BearsList = () => {

    const bears = useBearStore(useShallow(state => state.bears));
    const addBear = useBearStore(state => state.addBear)

    return(
        <WhiteCard centered>
            <h2>Osos</h2>
            <button className="mt-2 mb-2" onClick={addBear}>Agregar oso</button>
            <pre>
                {JSON.stringify(bears, null, 2)}
            </pre>
        </WhiteCard>
    )

}
