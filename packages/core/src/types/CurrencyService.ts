import { BigNumber } from 'ethers'
import { ConnectorBaseEnum } from '../enums'

export type NetworkId = `${ConnectorBaseEnum}_${string | number}`
export type CurrencyId = `${ConnectorBaseEnum}_${string}_${string | number}`
export type CurrencyBalanceId = `${ConnectorBaseEnum}_${string}_${string | number}_${string}`

type UsualCurrencySetup = {
  base: ConnectorBaseEnum
  chainId: string | number
  address: string
  isNative: false
  icon: string
}
type NativeCurrencySetup = {
  base: ConnectorBaseEnum
  chainId: string | number
  address: string // for get native balance
  address0x: string // for get price from 0x
  isNative: true
  name: string
  symbol: string
  decimals: number
  icon: string
}

export interface CurrencyBalanceSetup {
  base: ConnectorBaseEnum
  chainId: string | number
  address: string
}

export type CurrencySetup = NativeCurrencySetup | UsualCurrencySetup

// TODO: merge TokenInfo and CurrencyInfo
export interface CurrencyInfo {
  base: ConnectorBaseEnum
  chainId: string | number
  address: string // TODO: change to Address class
  isNative: boolean
  name: string
  symbol: string
  decimals: number
  icon: string
}

export interface CurrencyStorage {
  currencyInfoMap: Map<CurrencyId, Readonly<CurrencyInfo>>
  balanceInfoMap: Map<CurrencyBalanceId, BigNumber>
}

export interface MulticallNetworkInfo {
  multicall: string
  network: EvmNetworkInfo | TvmNetworkInfo
}

// ========

export interface NetworkInfo<ChainId extends string | number, Explorer extends string> {
  networkName: string
  chainId: ChainId
  symbol: string
  explorer: Explorer
  base: ConnectorBaseEnum
}

export interface EvmNetworkInfo<T extends string = string> extends NetworkInfo<string | number, string> {
  rpcUrl: string
  base: ConnectorBaseEnum.EVM
  key: string
}

export interface TvmNetworkInfo<T extends string = string> extends NetworkInfo<string | number, string> {
  grpcUrl: string
  base: ConnectorBaseEnum.TVM
}
