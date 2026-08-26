---
id: locales
title: Locales
slug: /locales
---

# Locales

Locale codes follow the IETF BCP 47 standard (ISO 639-1 language code with optional ISO 3166-1 country code), using underscore as separator.

Currently we support the following locales:

| Code  | Locale                      |
| ----- | --------------------------- |
| en_us | English (United States)     |
| es    | Spanish                     |
| es_mx | Spanish (Mexico)            |
| pt_br | Portuguese (Brazil)         |
| hi    | Hindi                       |
| zh_cn | Chinese Simplified          |
| zh_tw | Chinese Traditional         |
| ru    | Russian                     |
| fr    | French                      |
| de    | German                      |
| id    | Indonesian                  |
| ja    | Japanese                    |
| vi    | Vietnamese                  |
| tr    | Turkish                     |
| ko    | Korean                      |
| th    | Thai                        |
| it    | Italian                     |
| pl    | Polish                      |
| uz    | Uzbek                       |
| cs    | Czech                       |
| hu    | Hungarian                   |
| el    | Greek                       |
| fi    | Finnish                     |
| no    | Norwegian                   |

The default locale is **`en_us`**.

## Unsupported locales

When you request a game with an unsupported `locale` in [Create new game](/core/create-new-game), the
request fails with `400` and code `locale_not_supported`. To create the game with the default locale
(`en_us`) instead of receiving the error, set `fallbackToDefaultLocale: true` in the request.
