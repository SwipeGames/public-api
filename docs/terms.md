---
id: terms
title: Terms
slug: /terms
---

# Terms

### Game provider (Swipe Games)

Swipe Games is game provider that supplies games through this Public API.

### Integrator

An integrator is a company or individual that integrates Swipe Games into their platform, allowing players to access and play games provided by Swipe Games.  
Integrators are responsible for implementing the API and ensuring that it functions correctly within their systems.

### Client ID (CID)

A Client ID (CID) is a unique identifier assigned to each integrator. It is used to authenticate requests made to the Swipe Games Public API. We provide a unique CID for each integrator.

### External Client ID (ExtCID)

An External Client ID (ExtCID) is a unique identifier for clients of integrators. In simple words, it's integrator's clients. It is used to identify clients in the context of the integrator's platform. We support configurations and settings per ExtCID, allowing integrators to manage their clients effectively.

### Game Type

A Game Type identifies the game mechanics (e.g., `catch` or `swipe`). Multiple games with different names and Game IDs can share the same game type. See [Games](/games) for the list of available game types.

### Game ID

A Game ID is a unique identifier for each game provided by Swipe Games. It is used to reference specific games in API requests and responses. Default games use the `sg_` prefix (e.g., `sg_catch_97`), while customized games use a client-specific prefix (e.g., `cv_catch_97`). To retrieve the list of games available for your integration, use the [Get Games](/core/get-games-information) API endpoint. See [Games](/games) for more details.
