import BN = require("bn.js");
import { BlockState, BlockType, Signature } from "loopringV3.js";

export interface OrderInfo {
  owner?: string;
  tokenS?: string;
  tokenB?: string;
  amountS: BN;
  amountB: BN;

  exchangeID?: number;
  accountID?: number;
  orderID?: number;

  label?: number;

  tokenIdS?: number;
  tokenIdB?: number;

  allOrNone?: boolean;
  validSince?: number;
  validUntil?: number;
  maxFeeBips?: number;
  buy?: boolean;

  feeBips?: number;
  rebateBips?: number;

  balanceS?: BN;
  balanceB?: BN;

  hash?: string;
  signature?: Signature;

  [key: string]: any;
}

export interface OrderExpectation {
  filledFraction: number;
  spread?: BN;
}

export interface RingExpectation {
  orderA?: OrderExpectation;
  orderB?: OrderExpectation;
}

export interface RingInfo {
  orderA: OrderInfo;
  orderB: OrderInfo;

  tokenID?: number;
  fee?: BN;

  expected?: RingExpectation;
}

export interface RingBlock {
  rings: RingInfo[];
  protocolTakerFeeBips?: number;
  protocolMakerFeeBips?: number;

  onchainDataAvailability?: boolean;
  timestamp?: number;
  exchangeID?: number;
  operatorAccountID?: number;

  signature?: Signature;
}

export interface Deposit {
  exchangeId: number;
  depositIdx: number;
  accountID: number;
  publicKeyX: string;
  publicKeyY: string;
  tokenID: number;
  amount: BN;
  timestamp?: number;
  transactionHash?: string;
}

export interface DepositBlock {
  deposits: Deposit[];

  onchainDataAvailability?: boolean;
  startHash: BN;
  startIndex: number;
  count: number;
}

export interface WithdrawalRequest {
  exchangeId: number;
  accountID: number;
  tokenID: number;
  amount: BN;

  feeTokenID?: number;
  fee?: BN;
  label?: number;

  withdrawalIdx?: number;
  slotIdx?: number;

  withdrawalFee?: BN;

  signature?: Signature;
  timestamp?: number;
  transactionHash?: string;
}

export interface Withdrawal {
  exchangeID: number;
  blockIdx: number;
  withdrawalIdx: number;
}

export interface WithdrawBlock {
  withdrawals: WithdrawalRequest[];

  onchainDataAvailability?: boolean;

  operatorAccountID?: number;

  startHash: BN;
  startIndex: number;
  count: number;
}

export interface Cancel {
  accountID: number;
  orderTokenID: number;
  orderID: number;
  feeTokenID: number;
  fee: BN;
  label?: number;

  signature?: Signature;
}

export interface CancelBlock {
  cancels: Cancel[];

  onchainDataAvailability?: boolean;

  operatorAccountID?: number;
}

export interface Block {
  blockIdx: number;
  filename: string;
  blockType: BlockType;
  blockSize: number;
  blockVersion: number;
  blockState: BlockState;
  operator: string;
  origin: string;
  operatorId: number;
  data: string;
  offchainData: string;
  compressedData: string;
  publicDataHash: string;
  publicInput: string;
  proof?: string[];
  blockFeeWithdrawn: boolean;
  blockFeeAmountWithdrawn?: BN;
  committedTimestamp: number;
  verifiedTimestamp?: number;
  finalizedTimestamp?: number;
  transactionHash: string;
}

export interface Account {
  accountID: number;
  owner: string;
  publicKeyX: string;
  publicKeyY: string;
  secretKey: string;
  nonce: number;
}

export interface TradeHistory {
  filled: BN;
  cancelled: boolean;
  orderID: number;
}

export interface Balance {
  balance: BN;
  tradeHistory: { [key: number]: TradeHistory };
}

export interface AccountLeaf {
  publicKeyX: string;
  publicKeyY: string;
  nonce: number;
  balances: { [key: number]: Balance };
}

export interface ExchangeState {
  accounts: AccountLeaf[];
}

export interface DetailedTokenTransfer {
  description: string;
  token: number;
  from: number;
  to: number;
  amount: BN;
  subPayments: DetailedTokenTransfer[];
}

export interface RingSettlementSimulatorReport {
  exchangeStateBefore: ExchangeState;
  exchangeStateAfter: ExchangeState;
  detailedTransfers: DetailedTokenTransfer[];
}

export interface SimulatorReport {
  exchangeStateBefore: ExchangeState;
  exchangeStateAfter: ExchangeState;
}

export interface DepositInfo {
  owner: string;
  token: string;
  amount: BN;
  fee: BN;
  timestamp: number;
  accountID: number;
  depositIdx: number;
}
