---
id: currencies
title: Currencies
slug: /currencies
---

import CurrencyTable from '@site/src/components/CurrencyTable';

# Currencies

We support the currencies listed below.

A currency is identified by a short **currency code**, chosen by you in [Create New Game](/core/create-new-game) and fixed for the lifetime of the game session.

<CurrencyTable />

## Currency types

Every currency has a type. These are the values accepted by the `currencyFilters` query parameter of [Get Games Information](/core/get-games-information), which controls the `currencies` and `betLines` returned for each game. Use the filter buttons above to see exactly which codes each one returns.

| `currencyFilters` value | Meaning                                                      |
| ----------------------- | ------------------------------------------------------------ |
| `main`                  | `main_fiat` + `main_crypto`                                  |
| `main_fiat`             | National fiat currencies                                     |
| `main_crypto`           | Crypto currencies                                            |
| `sub_fiat`              | Denomination-scaled fiat units                               |
| `sub_crypto`            | Crypto sub-units                                             |
| `virtual`               | Virtual currencies (no exchange rate)                        |

Two behaviours worth knowing:

- **Omitting `currencyFilters` returns all non-virtual currencies** — every type except `virtual`. This is the default, and matches the behaviour from before the parameter existed.
- `additionalCurrencies` adds specific codes on top of whatever `currencyFilters` matched. An unknown code there is rejected with a `400`.

### Scaled fiat (`sub_fiat`)

A scaled unit is the **same money re-denominated**, for currencies whose everyday amounts run to large numbers. It is not a separate currency — its exchange rate is derived from its base currency, and it carries the same number of decimals as its base.

- **`#` — kilo:** 1,000× larger than its base. `1 COP# = 1,000 COP`, so a balance of `COP# 5.00` is the same money as `COP 5,000.00`.
- **`PHPT` — 1:1** with `PHP`. No scaling at all.
- **`MYR2` and `MMK3` — hecto:** 100× larger than their base.
- **`TWD2` — the other way:** 130× *smaller* than `TWD`, not larger.

The code is not a reliable guide — always use the conversion shown under each code in the table above.

Five units have **two codes for the same thing** — `IDR#`/`KIDR`, `IRR#`/`KIRR`, `LAK#`/`KLAK`, `UZS#`/`KUZS`, `VND#`/`KVND`. Both spellings are accepted, and **both are returned**, so deduplicate before rendering a currency picker or the same currency will appear twice.

### Crypto sub-units (`sub_crypto`)

A sub-unit is the **same coin re-denominated smaller**, so that everyday amounts stay readable: `1 BTC = 1,000 mBTC`. It is not a separate currency — its exchange rate is derived from its base coin. The conversion is shown under each sub-unit's name in the table above.

### Virtual currencies (`virtual`)

Virtual currencies have **no real exchange rate** and carry no monetary value. They are used for demo and fun-mode play, and are **not** returned by [Get Games Information](/core/get-games-information) unless you ask for them explicitly with `currencyFilters=virtual`.

## Decimal places

Amounts in the Core API and the Integration Adapter API are **decimal strings in the currency's main unit, not in cents** — `"0.90"` means €0.90, not €0.0090.

- **Fiat carries up to 2 decimal places.** Up to, not exactly — see below.
- **Crypto carries up to its own precision** (e.g. `BTC` 8, `ETH` 18).

The **Decimals** column in the table above is the number of decimal places we actually honour. Two cases catch integrators out:

**Zero-decimal fiat.** These 16 currencies carry **no** decimal places — a fractional amount is not meaningful and will be rounded away:

`BIF` `CLP` `DJF` `GNF` `ISK` `JPY` `KMF` `KRW` `PYG` `RWF` `UGX` `VND` `VUV` `XAF` `XOF` `XPF`

**Conventionally 3-decimal fiat is handled at 2.** `BHD`, `IQD`, `JOD`, `KWD`, `LYD`, `OMR` and `TND` have three decimal places by banking convention, but Swipe Games processes them at **2**. A third decimal you send will be rounded away.
