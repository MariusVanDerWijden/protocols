import BN = require("bn.js");

/**
 * The keypair data for EdDSA.
 */
export class KeyPair {
  publicKeyX: string;
  publicKeyY: string;
  secretKey: string;
}

export class DexAccount {
  accountId: number;
  keyPair: KeyPair;
  nonce: number;
}

/**
 * The signature data for EdDSA.
 */
export interface Signature {
  Rx: string;
  Ry: string;
  s: string;
}

export class WithdrawalRequest {
  account: DexAccount;
  token: string;
  tokenId?: number;
  amount: string;
  amountInBN?: BN;
  feeToken: string;
  feeTokenId?: number;
  fee: string;
  feeInBN?: BN;
  label?: number;
  signature?: Signature;
  hash?: string;
}

export class OrderRequest {
  owner: string;
  account: DexAccount;
  exchangeId: number;

  tokenS: string;
  tokenB: string;
  tokenSId: number;
  tokenBId: number;

  amountS: string;
  amountB: string;
  amountSInBN: BN;
  amountBInBN: BN;

  orderId: number;

  label: number;

  allOrNone: boolean;
  validSince: number;
  validUntil: number;
  maxFeeBips: number;
  buy?: boolean;

  feeBips: number;
  rebateBips?: number;

  hash?: string;
  signature?: Signature;

  [key: string]: any;
}

export class CancelRequest {
  account: DexAccount;
  orderToken: string;
  orderTokenId?: number;
  orderId: number;
  feeToken: string;
  feeTokenId?: number;
  fee: string;
  feeInBN?: BN;
  label?: number;
  signature?: Signature;
}

export class GetAPIKeyRequest {
  account: DexAccount;
  signature?: Signature;
}

export class GetDexNonceRequest {
  account: DexAccount;
  signature?: Signature;
}

export class GetOrderIdRequest {
  account: DexAccount;
  tokenSell: string;
  tokenSId?: number;
  signature?: Signature;
}

export class GetOrderDetailRequest {
  account: DexAccount;
  orderHash: string;
  signature?: Signature;
}

export class GetOrdersRequest {
  account: DexAccount;
  market?: string;
  statuses?: [string];
  start?: number;
  end?: number;
  fromHash?: string;
  limit?: number;
  signature?: Signature;
}

export class GetUserBalanceRequest {
  account: DexAccount;
  tokens?: [string];
  tokenIds?: [number];
  signature?: Signature;
}

export class GetUserTransactionsRequest {
  account: DexAccount;
  statuses?: [string];
  types?: [string];
  start?: number;
  end?: number;
  fromHash?: string;
  limit?: number;
  signature?: Signature;
}

export class GetUserActionsRequest {
  account: DexAccount;
  statuses?: [string];
  types?: [string];
  start?: number;
  end?: number;
  fromHash?: string;
  limit?: number;
  signature?: Signature;
}

export class GetUserTradesRequest {
  account: DexAccount;
  orderHash?: string;
  market?: string;
  fromId?: string;
  limit?: number;
  signature?: Signature;
}

export class GetUserFeeRateRequest {
  account: DexAccount;
  market?: string;
  signature?: Signature;
}
