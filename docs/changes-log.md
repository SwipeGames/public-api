---
id: changes-log
title: Changes Log
slug: /changes-log
---

# Changes Log

## 1.2.0

- Added optional `initDemoBalance` field to `/create-new-game` request. Allows setting initial demo balance for demo mode games. Default is 10 000 USD equivalent.

## 1.1.2

- Added more information about free rounds processing.

## 1.1.1

- Made `returnUrl` parameter optional in `/create-new-game`. The field is only used when games are launched via redirect (no iframe), so it should not always be required.

## 1.1.0

- Added new `GET /games` method to retrieve games list with related information (including game images).

## 1.0.1

-   Added optional error code for core error responses.
    It allows game clients to programmatically handle specific error scenarios.

## 1.0.0

-   Initial release of the Swipe Games Public API documentation.
