import {
  ConnectorBaseEnum,
  EMPTY_ADDRESS,
  IStorable,
  StorageListenerTypeEnum,
  StorageManager,
} from '@pragma-web-utils/core'
import { TransactionStatusEnum } from '../enums'
import { Transaction, TxInfo } from '../types'
import { TestTxChecker } from '../utils'
import { StorableTx } from './StorableTx'

const dto1: TxInfo = {
  account: EMPTY_ADDRESS,
  chainId: 1,
  payload: { action: 'test' },
  base: ConnectorBaseEnum.EVM,
  hash: '0x00...01',
  status: TransactionStatusEnum.UNKNOWN,
}
const id = `${dto1.base}_${dto1.chainId}_${dto1.hash}`

const testChecker = new TestTxChecker()
const checkersMap = new Map([
  [1, testChecker],
  [2, testChecker],
  [3, testChecker],
])

describe('StorableTx', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(Date, 'now').mockImplementation(() => 0)
  })

  it('check id', () => {
    const storable = new StorableTx(dto1, checkersMap, () => Promise.resolve(null))
    expect(storable.getId()).toBe(id)
  })

  it('check init already created dto', () => {
    const storable1 = new StorableTx(dto1, checkersMap, () => Promise.resolve(null))
    expect(storable1.getValue().created).toBe(0)

    const storable2 = new StorableTx({ ...dto1, created: -1 }, checkersMap, () => Promise.resolve(null))
    expect(storable2.getValue().created).toBe(-1)
  })

  it('check value', () => {
    const storable = new StorableTx(dto1, checkersMap, () => Promise.resolve(null))
    expect(storable.getValue()).toEqual({ ...dto1, id, created: storable.getValue().created })
  })

  it('check connection with StorageManager', async () => {
    const waitTimeout = 300
    const storable = new StorableTx(dto1, checkersMap, () => Promise.resolve(null), waitTimeout)
    const storageManager = new StorageManager<IStorable<Transaction>>()
    const updateItem = jest.spyOn(storageManager, 'updateItem')
    const addToStorage = jest.spyOn(storable, 'addToStorage')
    const removeFromStorage = jest.spyOn(storable, 'removeFromStorage')
    const onOldValue = jest.fn()
    const onNewValue = jest.fn()
    const waitStatus = jest.spyOn(testChecker, 'waitStatus')

    storageManager.addListener(
      StorageListenerTypeEnum.ON_UPDATE,
      ({ oldValue, newValue }) => {
        onOldValue(oldValue.getValue())
        onNewValue(newValue.getValue())
      },
      (tx) => tx.getId() === storable.getId(),
    )

    storageManager.addItem(storable)

    expect(addToStorage).toBeCalledTimes(1)
    expect(removeFromStorage).toBeCalledTimes(0)
    expect(waitStatus).toBeCalledTimes(1)
    expect(waitStatus).toHaveBeenCalledWith(storable.getValue(), { waitTimeout })
    expect(updateItem).toBeCalledTimes(0)
    expect(onOldValue).toBeCalledTimes(0)
    expect(onNewValue).toBeCalledTimes(0)

    // wait checking status
    await Promise.resolve()
    await Promise.resolve()

    expect(updateItem).toBeCalledTimes(1)
    expect(onNewValue).toBeCalledTimes(1)
    expect(onOldValue).toBeCalledTimes(1)
    expect(onOldValue).toHaveBeenCalledWith(storable.getValue())
    expect(onNewValue).toHaveBeenCalledWith({ ...storable.getValue(), status: TransactionStatusEnum.SUCCESS })
    expect(storable.getValue().status).toBe(TransactionStatusEnum.UNKNOWN)
    expect(storageManager.getItem(storable.getId())?.getValue().status).toBe(TransactionStatusEnum.SUCCESS)
    expect(addToStorage).toBeCalledTimes(1)
    expect(removeFromStorage).toBeCalledTimes(1)

    storageManager.removeItem(storable.getId())

    expect(addToStorage).toBeCalledTimes(1)
    expect(removeFromStorage).toBeCalledTimes(1)
  })
})
