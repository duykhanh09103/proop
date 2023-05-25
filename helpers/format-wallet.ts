export const formatWallet = (wallet: string, length = 4) => `${wallet.slice(0, length)}...${wallet.slice(-length)}`
