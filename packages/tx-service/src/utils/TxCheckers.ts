import { RequestedTransaction, Transaction, TransactionLike, TxCheckInfo } from '../types'

export function isTransaction(tx: TransactionLike): tx is Transaction {
  return 'hash' in tx && 'status' in tx
}

export function isRequestedTx(tx: TransactionLike): tx is RequestedTransaction {
  return !isTransaction(tx)
}

export function isTxCheckInfo(info: Partial<TxCheckInfo>): info is TxCheckInfo {
  return info.chainId !== undefined && info.hash !== undefined
}
