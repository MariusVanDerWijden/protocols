//const config = require('./config.json');
const data = require("./data");
const fm = require("../common/formatter");
const config = data.configs;
const fees = config.fees;
const txs = config.txs;

function requestWhiteList() {
  const url =
    "//raw.githubusercontent.com/Loopring/mock-relay-data/master/whiteList.json";
  return fetch(url, { method: "GET" }).then(res => res.json());
}

async function isinWhiteList(address) {
  return await requestWhiteList().then(whiteList => {
    const result = whiteList.find(
      add => add.toLowerCase() === address.toLowerCase()
    );
    return !!result;
  });
}

function getChainId() {
  return config.chainId;
}

function getExchangeId() {
  return config.exchangeId;
}

function getWalletId() {
  return config.walletAddressId;
}

function getMaxFeeBips() {
  return config.maxFeeBips;
}

function getTokenBySymbol(symbol) {
  if (!symbol) {
    return {};
  }
  return (
    getTokens().find(
      token => token.symbol.toLowerCase() === symbol.toLowerCase()
    ) || {}
  );
}

function getTokenByAddress(address) {
  if (!address) {
    return {};
  }
  return getTokens().find(
    token => token.address.toLowerCase() === address.toLowerCase()
  );
}

function getCustomTokens() {
  return getTokens().filter(token => token.custom);
}

function getTokens() {
  return config.tokens;
}

function fromWEI(symbol, valueInWEI, precision = 4) {
  const token = getTokenBySymbol(symbol);
  if (!token) {
    return 0;
  }
  const value = fm.toBig(valueInWEI).div("1e" + token.digits);
  return value.toNumber().toFixed(precision);
}

function toWEI(symbol, value) {
  const token = getTokenBySymbol(symbol);
  if (!token) {
    return 0;
  }
  const valueInBN = fm.toBig(value).times("1e" + token.digits);
  return valueInBN.toString(10);
}

function getMarketByPair(pair) {
  if (pair) {
    const pairArr = pair.split("-");
    if (pairArr && pairArr.length === 2) {
      return getMarketBySymbol(pairArr[0], pairArr[1]);
    }
  }
}

function isSupportedMarket(market) {
  if (!market) {
    return false;
  }
  const pair = market.split("-");
  if (pair.length !== 2) {
    return false;
  }
  return getMarkets().find(m => {
    return (
      (m.tokenx === pair[0].toUpperCase() &&
        m.tokeny === pair[1].toUpperCase()) ||
      (m.tokenx === pair[1].toUpperCase() && m.tokeny === pair[0].toUpperCase())
    );
  });
}

function getMarketBySymbol(tokenx, tokeny) {
  if (tokenx && tokeny) {
    return (
      getMarkets().find(market => {
        return (
          (market.tokenx === tokenx && market.tokeny === tokeny) ||
          (market.tokenx === tokeny && market.tokeny === tokenx)
        );
      }) || {
        pricePrecision: 8
      }
    );
  } else {
    return {
      pricePrecision: 8
    };
  }
}

function getMarketsByTokenR(token) {
  return getMarkets().filter(item => item.tokeny === token);
}

function getMarketsByTokenL(token) {
  return getMarkets().filter(item => item.tokenx === token);
}

function getTokenSupportedMarkets(token) {
  const leftMarket = getMarketsByTokenL(token);
  const rightMarket = getMarketsByTokenR(token);
  return [...leftMarket, ...rightMarket];
}

function getMarkets() {
  return config.markets;
}

function getGasLimitByType(type) {
  if (type) {
    return txs.find(tx => type === tx.type);
  }
}

function getFeeByType(type) {
  if (type) {
    return fees.find(fee => type === fee.type);
  }
}

function getWalletAddress() {
  return config.walletAddress;
}

function getExchangeAddress() {
  return config.exchangeAddress;
}

function getWallets() {
  return data.wallets;
}

export default {
  getTokenBySymbol,
  getTokenByAddress,
  getTokens,
  getMarketBySymbol,
  getMarketByPair,
  getGasLimitByType,
  getFeeByType,
  isinWhiteList,
  getChainId,
  getExchangeId,
  getWalletId,
  getMaxFeeBips,
  isSupportedMarket,
  getMarketsByTokenR,
  getTokenSupportedMarkets,
  getMarkets,
  getWalletAddress,
  getExchangeAddress,
  getWallets,
  fromWEI,
  toWEI
};
