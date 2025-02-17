/*

  Copyright 2017 Loopring Project Ltd (Loopring Foundation).

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
pragma solidity ^0.5.11;

import "../../lib/MathUint.sol";

import "../../iface/IAddressWhitelist.sol";

import "./ExchangeBalances.sol";
import "./ExchangeData.sol";


/// @title ExchangeAccounts.
/// @author Daniel Wang  - <daniel@loopring.org>
/// @author Brecht Devos - <brecht@loopring.org>
library ExchangeAccounts
{
    using MathUint          for uint;
    using ExchangeBalances  for ExchangeData.State;

    event AccountCreated(
        address indexed owner,
        uint24  indexed id,
        uint            pubKeyX,
        uint            pubKeyY
    );

    event AccountUpdated(
        address indexed owner,
        uint24  indexed id,
        uint            pubKeyX,
        uint            pubKeyY
    );

    // == Public Functions ==
    function getAccount(
        ExchangeData.State storage S,
        address owner
        )
        external
        view
        returns (
            uint24 accountID,
            uint   pubKeyX,
            uint   pubKeyY
        )
    {
        accountID = getAccountID(S, owner);
        ExchangeData.Account storage account = S.accounts[accountID];
        pubKeyX = account.pubKeyX;
        pubKeyY = account.pubKeyY;
    }

    function createOrUpdateAccount(
        ExchangeData.State storage S,
        uint  pubKeyX,
        uint  pubKeyY,
        bytes calldata permission
        )
        external
        returns (
            uint24 accountID,
            bool   isAccountNew,
            bool   isAccountUpdated
        )
    {
        isAccountNew = (S.ownerToAccountId[msg.sender] == 0);
        if (isAccountNew) {
            if (S.addressWhitelist != address(0)) {
                require(
                    IAddressWhitelist(S.addressWhitelist).isWhitelisted(msg.sender, permission),
                    "ADDRESS_NOT_WHITELISTED"
                );
            }
            accountID = createAccount(S, pubKeyX, pubKeyY);
            isAccountUpdated = false;
        } else {
            (accountID, isAccountUpdated) = updateAccount(S, pubKeyX, pubKeyY);
        }
    }

    function getAccountID(
        ExchangeData.State storage S,
        address owner
        )
        public
        view
        returns (uint24 accountID)
    {
        accountID = S.ownerToAccountId[owner];
        require(accountID != 0, "ADDRESS_HAS_NO_ACCOUNT");

        accountID = accountID - 1;
    }

    function createAccount(
        ExchangeData.State storage S,
        uint pubKeyX,
        uint pubKeyY
        )
        private
        returns (uint24 accountID)
    {
        require(S.accounts.length < ExchangeData.MAX_NUM_ACCOUNTS(), "ACCOUNTS_FULL");
        require(S.ownerToAccountId[msg.sender] == 0, "ACCOUNT_EXISTS");

        accountID = uint24(S.accounts.length);
        ExchangeData.Account memory account = ExchangeData.Account(
            msg.sender,
            pubKeyX,
            pubKeyY
        );

        S.accounts.push(account);
        S.ownerToAccountId[msg.sender] = accountID + 1;

        emit AccountCreated(
            msg.sender,
            accountID,
            pubKeyX,
            pubKeyY
        );
    }

    function updateAccount(
        ExchangeData.State storage S,
        uint pubKeyX,
        uint pubKeyY
        )
        private
        returns (
            uint24 accountID,
            bool   isAccountUpdated
        )
    {
        require(S.ownerToAccountId[msg.sender] != 0, "ACCOUNT_NOT_EXIST");

        accountID = S.ownerToAccountId[msg.sender] - 1;
        ExchangeData.Account storage account = S.accounts[accountID];

        isAccountUpdated = (account.pubKeyX != pubKeyX || account.pubKeyY != pubKeyY);
        if (isAccountUpdated) {
            account.pubKeyX = pubKeyX;
            account.pubKeyY = pubKeyY;

            emit AccountUpdated(
                msg.sender,
                accountID,
                pubKeyX,
                pubKeyY
            );
        }
    }
}
