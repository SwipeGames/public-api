---
id: changes-log
title: Changes Log
slug: /changes-log
---

# Changes Log

## 1.3.1

- no changes

## 1.3.0

- Add new games to the games list: `Catch Ahegao`, `Tuna Bomber`, `Swipe Football`.

## 1.2.26

- Remove the following languages from API snippets: Swift, Kotlin, Dart, Objective-C, C, OCaml, and R.

## 1.2.25

- no changes

## 1.2.24

- no changes

## 1.2.23

- no changes

## 1.2.22

- no changes

## 1.2.21

- no changes

## 1.2.20

- no changes

## 1.2.19

- Add [Integration SDKs](https://swipegames.github.io/public-api/sdks) page to the documentation.

## 1.2.18

- no changes

## 1.2.17

- Update the "Refund" section in [Swipe Games Public Integration Adapter API page](https://swipegames.github.io/public-api/swipegames-integration#refund). The documentation clarify that when sending a 200 OK response to a `/refund` request, this should always have a valid body.

## 1.2.16

- no changes

## 1.2.15

- Add new game `Tripple Nipple` to the games list.

## 1.2.14

- no changes

## 1.2.13

- no changes

## 1.2.12

- no changes

## 1.2.11

- Update regEx pattern for the `amount` field in `BetRequest` to allow decimals.

## 1.2.10

- no changes

## 1.2.9

- no changes

## 1.2.8

- Add documentation about 30-day limit for finite free rounds campaigns. Free rounds with a `validUntil` date must not exceed 30 days. Infinite free rounds (no `validUntil`) are still supported.

## 1.2.7

- no changes

## 1.2.6

- no changes

## 1.2.5

- no changes

## 1.2.4

- no changes

## 1.2.3

- no changes

## 1.2.2

- no changes

## 1.2.1

- Add sequence diagrams to "Swipe Games Public Integration Adapter API" page (/swipegames-integration)

## 1.2.0

- Added optional `initDemoBalance` field to `/create-new-game` request. Allows setting initial demo balance for demo mode games. Default is 10 000 USD equivalent.

## 1.1.2

- Added more information about free rounds processing.8

## 1.1.1

- Made `returnUrl` parameter optional in `/create-new-game`. The field is only used when games are launched via redirect (no iframe), so it should not always be required.

## 1.1.0

- Added new `GET /games` method to retrieve games list with related information (including game images).

## 1.0.1

- Added optional error code for core error responses.
  It allows game clients to programmatically handle specific error scenarios.

## 1.0.0

- Initial release of the Swipe Games Public API documentation.
