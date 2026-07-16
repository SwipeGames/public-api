---
id: currencies
title: Currencies
slug: /currencies
---

# Currencies

A currency is identified by a short **currency code**, chosen by you in [Create New Game](/core/create-new-game) and fixed for the lifetime of the game session.

Treat a currency code as an **opaque string**. Most codes are ISO 4217 (`USD`, `EUR`), but not all of them are: crypto codes (`BTC`), crypto sub-units (`mBTC`) and virtual currencies (`FUN`) are Swipe Games codes with no ISO equivalent. Match codes exactly, including case.

## Currency types

Every currency belongs to exactly one type. These are the values accepted by the `currencyFilters` query parameter of [Get Games Information](/core/get-games-information), which controls the `currencies` and `betLines` returned for each game.

| `currencyFilters` value | Meaning                                                                |
| ----------------------- | ---------------------------------------------------------------------- |
| `main`                  | `main_fiat` + `main_crypto`                                            |
| `main_fiat`             | [National fiat currencies](#main-fiat-main_fiat)                       |
| `main_crypto`           | [Crypto currencies](#main-crypto-main_crypto)                          |
| `sub_fiat`              | Operator-specific denomination-scaled fiat units — see below           |
| `sub_crypto`            | [Crypto sub-units](#crypto-sub-units-sub_crypto)                       |
| `virtual`               | [Virtual currencies](#virtual-currencies-virtual) (no exchange rate)   |

Two behaviours worth knowing:

- **Omitting `currencyFilters` returns all non-virtual currencies** — every type except `virtual`. This is the default, and matches the behaviour from before the parameter existed.
- `additionalCurrencies` adds specific codes on top of whatever `currencyFilters` matched. An unknown code there is rejected with a `400`.

:::note Scaled fiat (`sub_fiat`)
`sub_fiat` covers denomination-scaled fiat units — the same money re-denominated, for currencies whose everyday amounts run to large numbers. These are **enabled per agreement for specific operators and are not listed here**. If your integration needs them, talk to your account manager; if it doesn't, the `sub_fiat` filter returns nothing for you.
:::

## Decimal places

Amounts in the Core API and the Integration Adapter API are **decimal strings in the currency's main unit, not in cents** — `"0.90"` means €0.90, not €0.0090.

- **Fiat carries up to 2 decimal places.** Up to, not exactly — see below.
- **Crypto carries up to its own precision**, listed per currency in the tables (e.g. `BTC` 8, `ETH` 18).

Two cases catch integrators out:

**Zero-decimal fiat.** These 16 currencies carry **no** decimal places — a fractional amount is not meaningful and will be rounded away:

`BIF` `CLP` `DJF` `GNF` `ISK` `JPY` `KMF` `KRW` `PYG` `RWF` `UGX` `VND` `VUV` `XAF` `XOF` `XPF`

**Conventionally 3-decimal fiat is handled at 2.** `BHD`, `IQD`, `JOD`, `KWD`, `LYD`, `OMR` and `TND` have three decimal places by banking convention, but Swipe Games processes them at **2**. A third decimal you send will be rounded away. The tables below list the number of decimals we actually honour.

## Main fiat (`main_fiat`)

149 currencies.

| Code  | Name                                     | Decimals |
| ----- | ---------------------------------------- | -------- |
| `AED` | United Arab Emirates Dirham              | 2        |
| `AFN` | Afghanistan Afghani                      | 2        |
| `ALL` | Albania Lek                              | 2        |
| `AMD` | Armenia Dram                             | 2        |
| `AOA` | Angolan Kwanza                           | 2        |
| `ARS` | Argentina Peso                           | 2        |
| `AUD` | Australia Dollar                         | 2        |
| `AWG` | Aruban Florin                            | 2        |
| `AZN` | Azerbaijan New Manat                     | 2        |
| `BAM` | Bosnia and Herzegovina Convertible Marka | 2        |
| `BBD` | Barbados Dollar                          | 2        |
| `BDT` | Bangladesh Taka                          | 2        |
| `BGN` | Bulgaria Lev                             | 2        |
| `BHD` | Bahraini Dinar                           | 2        |
| `BIF` | Burundi Franc                            | 0        |
| `BMD` | Bermudian dollar                         | 2        |
| `BND` | Brunei Dollar                            | 2        |
| `BOB` | Bolivia Boliviano                        | 2        |
| `BRL` | Brazil Real                              | 2        |
| `BSD` | Bahamas Dollar                           | 2        |
| `BTN` | Bhutanese Ngultrum                       | 2        |
| `BWP` | Botswana Pula                            | 2        |
| `BYN` | Belarus Ruble                            | 2        |
| `BZD` | Belize Dollar                            | 2        |
| `CAD` | Canada Dollar                            | 2        |
| `CDF` | Democratic Republic of the Congo Franc   | 2        |
| `CHF` | Switzerland Franc                        | 2        |
| `CLP` | Chile Peso                               | 0        |
| `CNY` | China Yuan Renminbi                      | 2        |
| `COP` | Colombia Peso                            | 2        |
| `CRC` | Costa Rican colon                        | 2        |
| `CVE` | Cape Verdean Escudo                      | 2        |
| `CZK` | Czech Koruna                             | 2        |
| `DJF` | Djibouti Franc                           | 0        |
| `DKK` | Denmark Krone                            | 2        |
| `DOP` | Dominican Republic Peso                  | 2        |
| `DZD` | Algerian Dinar                           | 2        |
| `EGP` | Egyptian Pound                           | 2        |
| `ERN` | Eritrean Nakfa                           | 2        |
| `ETB` | Ethiopian Birr                           | 2        |
| `EUR` | European member countries Euro           | 2        |
| `FJD` | Fiji Dollar                              | 2        |
| `FKP` | Falkland Islands Pound                   | 2        |
| `GBP` | United Kingdom Pound                     | 2        |
| `GEL` | Georgia Lari                             | 2        |
| `GHS` | Ghana Cedis                              | 2        |
| `GIP` | Gibraltar Pound                          | 2        |
| `GMD` | Gambian Dalasi                           | 2        |
| `GNF` | Guinea Franc                             | 0        |
| `GTQ` | Guatemalan quetzal                       | 2        |
| `GYD` | Guyana Dollar                            | 2        |
| `HKD` | Hong Kong Dollar                         | 2        |
| `HNL` | Honduras Lempira                         | 2        |
| `HTG` | Haiti Gourde                             | 2        |
| `HUF` | Hungary Forint                           | 2        |
| `IDR` | Indonesia Rupiah                         | 2        |
| `ILS` | Israel Shekel                            | 2        |
| `INR` | India Rupee                              | 2        |
| `IQD` | Iraq Dinar                               | 2        |
| `IRR` | Iran Rial                                | 2        |
| `ISK` | Iceland Krona                            | 0        |
| `JMD` | Jamaica Dollar                           | 2        |
| `JOD` | Jordanian Dinar                          | 2        |
| `JPY` | Japan Yen                                | 0        |
| `KES` | Kenya Shilling                           | 2        |
| `KGS` | Kyrgyzstan Som                           | 2        |
| `KHR` | Cambodia Riel                            | 2        |
| `KMF` | Comoros Franc                            | 0        |
| `KRW` | Korea (South) Won                        | 0        |
| `KWD` | Kuwaiti Dinar                            | 2        |
| `KYD` | Cayman Islands Dollar                    | 2        |
| `KZT` | Kazakhstan Tenge                         | 2        |
| `LAK` | Laos Kip                                 | 2        |
| `LBP` | Lebanon Pound                            | 2        |
| `LKR` | Sri Lanka Rupee                          | 2        |
| `LRD` | Liberia Dollar                           | 2        |
| `LSL` | Lesotho Loti                             | 2        |
| `LYD` | Libya Dinar                              | 2        |
| `MAD` | Morocco Dirham                           | 2        |
| `MDL` | Moldova Leu                              | 2        |
| `MGA` | Madagascar Ariary                        | 2        |
| `MKD` | Macedonia Denar                          | 2        |
| `MMK` | Myanmar Kyat                             | 2        |
| `MNT` | Mongolia Tughrik                         | 2        |
| `MOP` | Macau Pataca                             | 2        |
| `MRU` | Mauritania Ouguiya                       | 2        |
| `MUR` | Mauritius Rupee                          | 2        |
| `MVR` | Maldives Rufiyaa                         | 2        |
| `MWK` | Malawi Kwacha                            | 2        |
| `MXN` | Mexico Peso                              | 2        |
| `MYR` | Malaysia Ringgit                         | 2        |
| `MZN` | Mozambican Metical                       | 2        |
| `NAD` | Namibia Dollar                           | 2        |
| `NGN` | Nigeria Naira                            | 2        |
| `NIO` | Nicaragua Cordoba                        | 2        |
| `NOK` | Norway Krone                             | 2        |
| `NPR` | Nepal Rupee                              | 2        |
| `NZD` | New Zealand Dollar                       | 2        |
| `OMR` | Omani Rial                               | 2        |
| `PAB` | Panamanian Balboa                        | 2        |
| `PEN` | Peru Nuevo Sol                           | 2        |
| `PGK` | Papua New Guinea Kina                    | 2        |
| `PHP` | Philippines Peso                         | 2        |
| `PKR` | Pakistan Rupee                           | 2        |
| `PLN` | Poland Zloty                             | 2        |
| `PYG` | Paraguay Guarani                         | 0        |
| `QAR` | Qatari Riyal                             | 2        |
| `RON` | Romania New Leu                          | 2        |
| `RSD` | Serbia Dinar                             | 2        |
| `RUB` | Russia Ruble                             | 2        |
| `RWF` | Rwanda Franc                             | 0        |
| `SAR` | Saudi Arabia Riyal                       | 2        |
| `SBD` | Solomon Islands Dollar                   | 2        |
| `SCR` | Seychelles Rupee                         | 2        |
| `SDG` | Sudanese Pound                           | 2        |
| `SEK` | Sweden Krona                             | 2        |
| `SGD` | Singapore Dollar                         | 2        |
| `SHP` | Saint Helena Pound                       | 2        |
| `SLE` | Sierra Leone Leone (new)                 | 2        |
| `SOS` | Somalia Shilling                         | 2        |
| `SRD` | Suriname Dollar                          | 2        |
| `SSP` | South Sudan Pound                        | 2        |
| `STN` | São Tomé and Príncipe Dobra              | 2        |
| `SZL` | Eswatini Lilangeni                       | 2        |
| `THB` | Thailand Baht                            | 2        |
| `TJS` | Tajikistan Somoni                        | 2        |
| `TMT` | Turkmenistan Manat                       | 2        |
| `TND` | Tunisia Dinar                            | 2        |
| `TOP` | Tonga Pa'anga                            | 2        |
| `TRY` | Turkey Lira                              | 2        |
| `TTD` | Trinidad and Tobago Dollar               | 2        |
| `TWD` | Taiwan New Dollar                        | 2        |
| `TZS` | Tanzania Shilling                        | 2        |
| `UAH` | Ukraine Hryvna                           | 2        |
| `UGX` | Uganda Shilling                          | 0        |
| `USD` | United States Dollar                     | 2        |
| `UYU` | Uruguay Peso                             | 2        |
| `UZS` | Uzbekistan Som                           | 2        |
| `VES` | Venezuelan Bolívar                       | 2        |
| `VND` | Vietnam Dong                             | 0        |
| `VUV` | Vanuatu Vatu                             | 0        |
| `WST` | Samoa Tala                               | 2        |
| `XAF` | Central African Republic Franc           | 0        |
| `XCD` | East Caribbean Dollar                    | 2        |
| `XOF` | West African CFA Franc                   | 0        |
| `XPF` | CFP Franc                                | 0        |
| `YER` | Yemen Rial                               | 2        |
| `ZAR` | South Africa Rand                        | 2        |
| `ZMW` | Zambia Kwacha                            | 2        |

## Main crypto (`main_crypto`)

19 currencies.

| Code    | Name               | Decimals |
| ------- | ------------------ | -------- |
| `ADA`   | Cardona Credits    | 6        |
| `BCH`   | Bitcoin Cash Coins | 8        |
| `BNB`   | Binance Coin       | 8        |
| `BTC`   | Bitcoin            | 8        |
| `DOGE`  | Dogecoin           | 8        |
| `DOT`   | Polkadot Points    | 0        |
| `ETH`   | Ethereum           | 18       |
| `LTC`   | Litecoin           | 8        |
| `LUNA`  | Luna Lumens        | 0        |
| `MATIC` | Polygon (MATIC)    | 18       |
| `SHIB`  | Shiba Inu          | 0        |
| `SOL`   | Solana             | 9        |
| `TON`   | Toncoin            | 9        |
| `TRX`   | TRON               | 6        |
| `UNI`   | Uniswap Units      | 0        |
| `USDC`  | USD Coin (USDC)    | 6        |
| `USDT`  | Tether USDt        | 6        |
| `XLM`   | Stellar Sparks     | 0        |
| `XRP`   | Ripple Radiants    | 6        |

## Crypto sub-units (`sub_crypto`)

9 currencies.

A sub-unit is the **same coin re-denominated smaller**, so that everyday amounts stay readable: `1 BTC = 1,000 mBTC`. It is not a separate currency — its exchange rate is derived from its base coin. Grouped below by base.

| Code       | Name                     | Base  | Conversion                        | Decimals |
| ---------- | ------------------------ | ----- | --------------------------------- | -------- |
| `mBCH`     | Milli Bitcoin Cash Coins | `BCH` | 1 `BCH` = 1,000 `mBCH`            | 5        |
| `mBTC`     | Millibitcoin             | `BTC` | 1 `BTC` = 1,000 `mBTC`            | 5        |
| `uBTC`     | Microbitcoin             | `BTC` | 1 `BTC` = 1,000,000 `uBTC`        | 2        |
| `mETH`     | Milliether               | `ETH` | 1 `ETH` = 1,000 `mETH`            | 15       |
| `uETH`     | Microether               | `ETH` | 1 `ETH` = 1,000,000 `uETH`        | 12       |
| `mLTC`     | Milli Litecoin           | `LTC` | 1 `LTC` = 1,000 `mLTC`            | 5        |
| `milliTON` | Milli Toncoin            | `TON` | 1 `TON` = 1,000 `milliTON`        | 6        |
| `microTON` | Micro Toncoin            | `TON` | 1 `TON` = 1,000,000 `microTON`    | 3        |
| `nanoTON`  | Nano Toncoin             | `TON` | 1 `TON` = 1,000,000,000 `nanoTON` | 0        |

## Virtual currencies (`virtual`)

Virtual currencies have **no real exchange rate** and carry no monetary value. They are used for demo and fun-mode play, and are **not** returned by [Get Games Information](/core/get-games-information) unless you ask for them explicitly with `currencyFilters=virtual`.

| Code  | Name             | Decimals |
| ----- | ---------------- | -------- |
| `FUN` | Fun-mode credits | 2        |
