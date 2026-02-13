---
id: free-rounds
title: Free Rounds
slug: /free-rounds
---

# Free Rounds

Free rounds are promotional game opportunities offered to players in games. Unlike traditional slot machine free spins, free rounds represent pre-funded gameplay sessions where players can participate without risking their own money while still having the chance to win real rewards.

- **Cost Nothing to Play**: Players don't use their own balance
- **Offer Real Rewards**: Winnings from free rounds are credited to player accounts
- **Follow Game Rules**: Subject to the same game mechanics as regular gameplay
- **Have Predetermined Parameters**: Bet amounts and multiplier limits are pre-configured

## How to setup Free Rounds

You can use Free Rounds endpoints in our [Core API](/core) to configure the free rounds for all games.  
You can set up free rounds and also cancel them at any time. Please note that if you cancel a free rounds campaign, all users who have already started free rounds will still have them available.

You can setup Free Rounds for specific games and for specific users. Also for all games and all users.

## Free Rounds Bet Lines Configuration

Before setting up Free Rounds you can share with us global `Bet Lines` configuration, per `game` or per `currency` - we will setup them for you and you can use
then to issue Free Rounds. By default we setup initial configuration which is OK for most use cases.
More information about Bet Lines you can find in related section:
[Bet Lines](/free-rounds-bet-lines).

## How to handle Free Rounds on integration

During Free Rounds, we send `bet` and `win` requests to the integration with type=`free` and the associated `frID` (the external Free Rounds ID you used when creating Free Rounds). These requests are **for tracking purposes only** — the integration should not modify the player's balance for free `bets`/`wins`. On SwipeGames' side, we track them on the player's `bonus balance`.

Once all Free Rounds are completed, we issue a `bonus withdrawal` request. It is sent as a `win` request with type=`regular` and the associated `frID`. This is the only request that should be added to the player's balance — it represents the total Free Rounds bonus.
