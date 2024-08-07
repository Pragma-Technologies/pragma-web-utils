import { Deps } from '@pragma-web-utils/hooks'
import { atom, useAtom } from 'jotai'
import { FC, PropsWithChildren, useState } from 'react'
import { AtomStatesBaseStorage } from '../class'
import { NOT_PROVIDED_STATE_STRICT_CONTEXT, NOT_REGISTERED_STATE } from '../constants'
import {
  ActualStateValue,
  BaseStatesStorage,
  CommonState,
  StateValue,
  StrictStorageState,
  StrictStorageWrapper,
} from '../types'

export function getAtomStrictWrapper<T extends BaseStatesStorage, K extends keyof T>(
  atomStorage: AtomStatesBaseStorage<T>,
  isValueValid: (stateKey: K, value: StateValue<StrictStorageState<T, K>>) => boolean = (stateKey, value) =>
    value !== undefined && value !== null,
): FC<PropsWithChildren<StrictStorageWrapper<T, K>>> {
  return (props) => {
    const { isActual, value, error } = useAtomStateValue(atomStorage, props.stateKey)

    if (!isActual) {
      return <props.skeleton />
    }

    if (!isValueValid(props.stateKey, value as StateValue<StrictStorageState<T, K>>) || error) {
      return <props.error />
    }

    return <>{props.children}</>
  }
}

export function getAtomStoreWrapper<T extends BaseStatesStorage, K extends keyof T>(
  atomStorage: AtomStatesBaseStorage<T>,
): FC<{ stateKeys: Deps<K> } & Omit<PropsWithChildren<StrictStorageWrapper<T>>, 'stateKey'>> {
  const AtomStoreWrapper: FC<{ stateKeys: Deps<K> } & Omit<PropsWithChildren<StrictStorageWrapper<T>>, 'stateKey'>> = ({
    children,
    stateKeys,
    ...props
  }) => {
    const [atomStates] = useState(() =>
      atom((get) => stateKeys.map((key) => get(atomStorage.getCommonStateAtom(key)) as CommonState)),
    )
    const [states] = useAtom(atomStates)

    if (states.some((state) => !state.isActual)) {
      return <props.skeleton />
    }

    if (states.some((state) => state === undefined || state === null || !!state.error)) {
      return <props.error />
    }

    return <>{children}</>
  }
  return AtomStoreWrapper
}

export function useAtomStateValue<T extends BaseStatesStorage, K extends keyof T>(
  atomStorage: AtomStatesBaseStorage<T>,
  stateKey: K,
): StrictStorageState<T, K> {
  const [state] = useAtom(atomStorage.getCommonStateAtom(stateKey))

  if (state === undefined || state === null) {
    throw `${stateKey as string}: ${NOT_REGISTERED_STATE}`
  }
  return state as StrictStorageState<T, K>
}

export function useStrictAtomStateValue<T extends BaseStatesStorage, K extends keyof T>(
  atomStorage: AtomStatesBaseStorage<T>,
  stateKey: K,
  isValueValid: (stateKey: K, value: StateValue<StrictStorageState<T, K>>) => boolean = () => true,
): ActualStateValue<StrictStorageState<T, K>> {
  const state = useAtomStateValue(atomStorage, stateKey)

  if (!isValueValid(stateKey, state as StateValue<StrictStorageState<T, K>>)) {
    throw `${stateKey as string}: ${NOT_PROVIDED_STATE_STRICT_CONTEXT}`
  }
  return state.value as ActualStateValue<StrictStorageState<T, K>>
}
