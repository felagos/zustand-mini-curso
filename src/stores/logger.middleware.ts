import { StateCreator, StoreMutatorIdentifier } from "zustand"

type Logger = <
  T = unknown,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T = unknown>(
  f: StateCreator<T, [], []>,
  name?: string,
) => StateCreator<T, [], []>

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
    //type T = ReturnType<typeof f>
    const loggedSet: typeof set = (...a) => {
        set(...a)
        console.log(...(name ? [`${name}:`] : []), get())
    }
    store.setState = loggedSet

    return f(loggedSet, get, store)
}

export const logger = loggerImpl as unknown as Logger;
