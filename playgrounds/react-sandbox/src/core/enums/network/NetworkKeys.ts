export enum EvmNetworkKeysEnum {
  BSC_MAINNET = 'BSC',
  BSC_TESTNET = 'BSC',
  POLYGON_MAINNET = 'POLYGON',
  POLYGON_TESTNET = 'POLYGON',
  AVALANCHE_MAINNET = 'AVALANCHE',
  AVALANCHE_TESTNET = 'AVALANCHE',
  AURORA_MAINNET = 'AURORA',
  AURORA_TESTNET = 'AURORA',
  ETHEREUM_MAINNET = 'ETHEREUM',
  ETHEREUM_GOERLI_TESTNET = 'ETHEREUM',
  MOONBEAM_MAINNET = 'MOONBEAM',
  MOONBEAM_TESTNET = 'MOONBEAM',
  OPTIMISM_MAINNET = 'OPTIMISM',
  OPTIMISM_TESTNET = 'OPTIMISM',
  ARBITRUM_MAINNET = 'ARBITRUM',
  ARBITRUM_TESTNET = 'ARBITRUM',
}

// TODO: rollback to real mainnets
export enum EvmMainnetNetworkKeysEnum {
  BSC = 'BSC_MAINNET',
  POLYGON = 'ARBITRUM_TESTNET',
  AVALANCHE = 'AVALANCHE_MAINNET',
  AURORA = 'AURORA_MAINNET',
  ETHEREUM = 'ETHEREUM_MAINNET',
  MOONBEAM = 'MOONBEAM_MAINNET',
  OPTIMISM = 'OPTIMISM_MAINNET',
  ARBITRUM = 'ARBITRUM_MAINNET',
}

// TODO: rollback to real testnets
export enum EvmTestnetNetworkKeysEnum {
  BSC = 'POLYGON_TESTNET',
  POLYGON = 'BSC_TESTNET',
  AVALANCHE = 'AVALANCHE_TESTNET',
  AURORA = 'AURORA_TESTNET',
  ETHEREUM = 'ETHEREUM_GOERLI_TESTNET',
  MOONBEAM = 'MOONBEAM_TESTNET',
  OPTIMISM = 'OPTIMISM_TESTNET',
  ARBITRUM = 'POLYGON_MAINNET',
}
