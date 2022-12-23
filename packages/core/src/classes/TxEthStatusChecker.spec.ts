import { EMPTY_ADDRESS } from '../constants'
import { ConnectorBaseEnum, EvmChainIdsEnum, EvmRpsUrlsEnum, TransactionStatusEnum } from '../enums'
import { Transaction } from '../types'
import { EthTxStatusChecker } from './TxEthStatusChecker'
const evm_transaction = {
  account: EMPTY_ADDRESS,
  chainId: EvmChainIdsEnum.POLYGON_MAINNET,
  payload: { action: 'zapperSwap' },
  base: 'EVM' as ConnectorBaseEnum, //TODO: check why it don't work with ConnectorBaseEnum
  status: TransactionStatusEnum.UNKNOWN,
  created: 1667286557584,
}

const evm_transaction_success: Transaction = {
  ...evm_transaction,
  id: 'EVM_137_0x4c91a29191dd060070c9e46f688afd976beaeb45c9dfef8ac7954c4b3817c8d0',
  hash: '0x4c91a29191dd060070c9e46f688afd976beaeb45c9dfef8ac7954c4b3817c8d0',
  status: TransactionStatusEnum.SUCCESS,
}

const evm_transaction_failed: Transaction = {
  ...evm_transaction,
  chainId: EvmChainIdsEnum.POLYGON_TESTNET,
  id: 'EVM_80001_0x6c81166da8810d8c613cb6d1bac26353c44f81314c6d2429ee04d97763614e15',
  hash: '0x6c81166da8810d8c613cb6d1bac26353c44f81314c6d2429ee04d97763614e15',
  status: TransactionStatusEnum.SUCCESS,
}

const evm_transaction_pending: Transaction = {
  ...evm_transaction,
  chainId: EvmChainIdsEnum.POLYGON_TESTNET,
  id: 'EVM_80001_0',
  hash: '0',
  status: TransactionStatusEnum.PENDING,
}

jest.useFakeTimers()

const getPromiseCheckStatus = async (tx: Transaction, rpcUrl: EvmRpsUrlsEnum) => {
  const txStatusChecker = new EthTxStatusChecker(tx.chainId, rpcUrl)
  const txStatus = await txStatusChecker.checkStatus(tx)

  return txStatus
}

//TODO: check timeouts
describe('EthTxStatusChecker class', () => {
  it('check success transaction status', async () => {
    const txStatus = await getPromiseCheckStatus(evm_transaction_failed, EvmRpsUrlsEnum.POLYGON_MAINNET)
    expect(txStatus).toBe(TransactionStatusEnum.SUCCESS)
  })

  it('check failed transaction status', async () => {
    const txStatus = await getPromiseCheckStatus(evm_transaction_success, EvmRpsUrlsEnum.POLYGON_TESTNET)
    expect(txStatus).toBe(TransactionStatusEnum.FAILED)
  })

  it('check pending transaction status', async () => {
    const txStatus = await getPromiseCheckStatus(evm_transaction_pending, EvmRpsUrlsEnum.POLYGON_TESTNET)
    expect(txStatus).toBe(TransactionStatusEnum.PENDING)
  })
})
