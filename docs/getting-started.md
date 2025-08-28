---
id: getting-started
title: Getting Started
slug: /
---

# Swipe Games Public API Documentation

> ⚠️ **IMPORTANT INFORMATION**
> 
> Swipe Games API is currently in BETA and will be undergoing regular maintenance to increase data offerings and improve performance.
> 
> Swipe Games reserves the right to revoke or restrict API access.
> 
> For any questions or support, please email us at tech@swipegames.io

This documentation provides a comprehensive guide to the Swipe Games Public API, detailing its features, endpoints, and usage.  
Whether you're a developer looking to integrate with our platform or simply curious about our API capabilities, you'll find all the information you need here.

### Learn about this documentation, API, platform and integration process

-   To learn about Terms used in this API please refer to the [Terms](/terms).

-   Swipe Games Public API consists of two APIs. To learn about each of them, please refer to the following sections:

    -   [Core Public API](/core)
        This is the main integration API (direct) that allows you to create and manage games, free rounds and other core functionalities.

    -   [Swipe Games Integration Adapter API](/swipegames-integration)
        This is an Adapter API (reverse integration) you need to implement in your game server to allow Swipe Games to communicate with your game server. Please follow the link and use our OpenAPI specification for simpler integration.

-   we have 2 stable [Environments](/core#environments) you could use for integration and testing: `staging` and `production`.

## Integration Process

Integration process consists of the following steps:

-   Registering and providing us with your integration details.
-   Integrating [Core Public API](/core) into your back end.
-   Implementing [Swipe Games Integration Adapter API](/swipegames-integration) on your back end.

### Registration and Integration Details

To start using our Public API, you need to register an account on our portal (or request via any communication channel)
and provide us the following details:

-   your IP addresses or range of IP addresses that will be used to access the Public API (for both evironments: staging and production)
-   base URL to your back end that will be used for reverse integration with Swipe Games Integration Adapter API (our calls to your). URL should support HTTPS and be accessible from our servers (if you have white lists).
-   API key that we should use to authenticate our requests to your back end (for reverse integration with Swipe Games Integration Adapter API).
    (see [Authentication](/authn) for more details).

From our side, we will provide you with the following details:

-   client ID (CID) - this is your unique identifier in our system that will be used to identify your integration.
-   your API key that will be used to authenticate your requests to the Public API (see [Authentication](/authn) for more details).
-   list of our IP addresses or range of IP addresses that will be used to access your back end (for reverse integration with Swipe Games Integration Adapter API). You can find this information also in [IP Addresses](/swipegames-integration#please-whitelist-our-ip-addresses-to-allow-requests-from-our-servers-to-your-api) section.
