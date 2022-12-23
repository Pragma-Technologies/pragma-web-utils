import { EMPTY_ADDRESS } from '../constants'
import { ConnectorBaseEnum, TransactionStatusEnum, TvmChainIdsEnum, TvmGrpsUrlsEnum } from '../enums'
import { Transaction } from '../types'
import { TronTxStatusChecker } from './TxTronStatusChecker'

const tvm_transaction = {
  account: EMPTY_ADDRESS,
  chainId: TvmChainIdsEnum.SHASTA,
  payload: { action: 'zapperSwap' },
  base: 'TVM' as ConnectorBaseEnum, //TODO: check why it don't work with ConnectorBaseEnum
  status: TransactionStatusEnum.UNKNOWN,
  created: 1667286557584,
}

const tvm_transaction_success: Transaction = {
  ...tvm_transaction,
  id: 'TVM_0_0',
  hash: '',
  status: TransactionStatusEnum.SUCCESS,
}

const tvm_transaction_failed: Transaction = {
  ...tvm_transaction,
  id: 'TVM_0_0',
  hash: '',
  status: TransactionStatusEnum.SUCCESS,
}

const tvm_transaction_pending: Transaction = {
  ...tvm_transaction,
  id: 'TVM_0_0',
  hash: '',
  status: TransactionStatusEnum.PENDING,
}

jest.useFakeTimers()

const getPromiseCheckStatus = async (tx: Transaction) => {
  const txStatusChecker = new TronTxStatusChecker(tx.chainId, TvmGrpsUrlsEnum.SHASTA)
  const txStatus = await txStatusChecker.checkStatus(tx)

  return txStatus
}

//TODO: check timeouts
describe('EthTxStatusChecker class', () => {
  it('check success transaction status', async () => {
    const txStatus = await getPromiseCheckStatus(tvm_transaction_failed)
    expect(txStatus).toBe(TransactionStatusEnum.SUCCESS)
  })

  it('check failed transaction status', async () => {
    const txStatus = await getPromiseCheckStatus(tvm_transaction_success)
    expect(txStatus).toBe(TransactionStatusEnum.FAILED)
  })

  it('check pending transaction status', async () => {
    const txStatus = await getPromiseCheckStatus(tvm_transaction_pending)
    expect(txStatus).toBe(TransactionStatusEnum.PENDING)
  })
})
