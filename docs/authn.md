---
id: authn
title: Authentication
slug: /authn
---

During the registration process you will receive an API `token key`.
This key is used to sign your requests to our APIs.

In all requests (both `Core Public API` and `Swipe Games Integration Adapter API`) we use the `X-REQUEST-SIGN` header which must contain the signature of the request.

## Overview

Authentication uses HMAC-SHA256 signature generation with your API `token key` as the secret key.

**CRITICAL: All request payloads MUST be converted to canonical JSON form before signing.**

This is the most common source of authentication errors. The signature is generated from the canonical JSON representation, not the original JSON.

## JSON Canonical Form

### What is Canonical JSON?

Canonical JSON is a normalized JSON representation that ensures consistent ordering and formatting. This is essential for generating identical signatures across different systems and programming languages.

**Canonical JSON requirements:**

1. **Keys are sorted alphabetically** (ascending order)
2. **No whitespace** between keys, values, or structural characters
3. **No trailing whitespace or newlines**
4. **Consistent encoding** (UTF-8)
5. **Standard JSON escaping** for special characters

### Why Canonical JSON?

Different JSON libraries may serialize the same data differently:
- Different key ordering
- Different spacing/indentation
- Different escaping rules

Without canonicalization, the same data would produce different signatures, causing authentication to fail.

### Example: Regular JSON vs Canonical JSON

**Regular JSON (invalid for signing):**
```json
{
  "gameID": "sg_catch_97",
  "platform": "desktop",
  "currency": "USD",
  "demo": true,
  "cID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "extCID": "your_ext_id",
  "locale": "en-US",
  "returnURL": "https://your-site.com/game-lobby"
}
```

**Canonical JSON (correct for signing):**
```json
{"cID":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","currency":"USD","demo":true,"extCID":"your_ext_id","gameID":"sg_catch_97","locale":"en-US","platform":"desktop","returnURL":"https://your-site.com/game-lobby"}
```

Notice:
- Keys are alphabetically sorted: `cID`, `currency`, `demo`, `extCID`, `gameID`, `locale`, `platform`, `returnURL`
- No spaces or newlines
- Compact representation

### Another Example with Nested Objects

**Regular JSON:**
```json
{
  "gameID": "sg_catch_97",
  "currency": "USD",
  "user": {
    "nickName": "player123",
    "id": "ext_user_456",
    "firstName": "John"
  }
}
```

**Canonical JSON:**
```json
{"currency":"USD","gameID":"sg_catch_97","user":{"firstName":"John","id":"ext_user_456","nickName":"player123"}}
```

Notice:
- Outer keys sorted: `currency`, `gameID`, `user`
- Inner keys (in `user`) sorted: `firstName`, `id`, `nickName`
- Completely compact

## How Authentication Works

### For POST Requests:

1. **Prepare your JSON payload** with the required parameters
2. **Convert to canonical JSON form** (sort keys, remove whitespace)
3. **Generate HMAC-SHA256 signature** using canonical JSON and your API token
4. **Send the request** with:
   - Header: `X-REQUEST-SIGN` containing the signature
   - Body: The same canonical JSON used for signing

### For GET Requests:

1. **Prepare query parameters**
2. **Convert query parameters to a JSON object**
3. **Convert to canonical JSON form**
4. **Generate HMAC-SHA256 signature** using canonical JSON and your API token
5. **Send the request** with:
   - Header: `X-REQUEST-SIGN` containing the signature
   - URL: Query parameters as usual (not JSON)

## Code Examples

### JavaScript/Node.js

#### Complete POST Request Example

```javascript
const crypto = require('crypto');

// Step 1: Convert object to canonical JSON
function toCanonicalJSON(obj) {
    // Sort keys alphabetically and remove whitespace
    return JSON.stringify(obj, Object.keys(obj).sort());
}

// Step 2: Generate HMAC-SHA256 signature
function sign(payload, token) {
    const hmac = crypto.createHmac('sha256', token);
    hmac.update(payload);
    return hmac.digest('hex');
}

// Step 3: Complete example
const apiToken = 'your-api-token-here';
const requestData = {
    cID: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    extCID: 'your_ext_id',
    gameID: 'sg_catch_97',
    demo: true,
    returnURL: 'https://your-site.com/game-lobby',
    platform: 'desktop',
    currency: 'USD',
    locale: 'en-US'
};

// Convert to canonical JSON
const canonicalJSON = toCanonicalJSON(requestData);
console.log('Canonical JSON:', canonicalJSON);
// Output: {"cID":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","currency":"USD","demo":true,"extCID":"your_ext_id","gameID":"sg_catch_97","locale":"en-US","platform":"desktop","returnURL":"https://your-site.com/game-lobby"}

// Generate signature
const signature = sign(canonicalJSON, apiToken);
console.log('Signature:', signature);

// Make the request
fetch('https://staging.platform.0.swipegames.io/api/v1/create-new-game', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-REQUEST-SIGN': signature
    },
    body: canonicalJSON  // Send the same canonical JSON used for signing
});
```

#### Complete GET Request Example

```javascript
const crypto = require('crypto');

function toCanonicalJSON(obj) {
    return JSON.stringify(obj, Object.keys(obj).sort());
}

function sign(payload, token) {
    const hmac = crypto.createHmac('sha256', token);
    hmac.update(payload);
    return hmac.digest('hex');
}

// For GET requests
const apiToken = 'your-api-token-here';
const queryParams = {
    sessionID: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
};

// Convert to canonical JSON for signing
const canonicalJSON = toCanonicalJSON(queryParams);
// Output: {"sessionID":"a1b2c3d4-e5f6-7890-abcd-ef1234567890"}
const signature = sign(canonicalJSON, apiToken);

// Build URL with query parameters
const url = new URL('https://your-integration-url.com/balance');
Object.keys(queryParams).forEach(key =>
    url.searchParams.append(key, queryParams[key])
);

// Make the request
fetch(url, {
    method: 'GET',
    headers: {
        'X-REQUEST-SIGN': signature
    }
});
```

### Python

#### Complete POST Request Example

```python
import hmac
import hashlib
import json
import requests

def to_canonical_json(data):
    """Convert dict to canonical JSON string"""
    # sort_keys=True ensures alphabetical ordering
    # separators removes whitespace
    return json.dumps(data, sort_keys=True, separators=(',', ':'))

def sign(payload, token):
    """Generate HMAC-SHA256 signature"""
    signature = hmac.new(
        token.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    )
    return signature.hexdigest()

# Example usage
api_token = 'your-api-token-here'
request_data = {
    'cID': 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'extCID': 'your_ext_id',
    'gameID': 'sg_catch_97',
    'demo': True,
    'returnURL': 'https://your-site.com/game-lobby',
    'platform': 'desktop',
    'currency': 'USD',
    'locale': 'en-US'
}

# Convert to canonical JSON
canonical_json = to_canonical_json(request_data)
print(f'Canonical JSON: {canonical_json}')
# Output: {"cID":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","currency":"USD","demo":true,"extCID":"your_ext_id","gameID":"sg_catch_97","locale":"en-US","platform":"desktop","returnURL":"https://your-site.com/game-lobby"}

# Generate signature
signature = sign(canonical_json, api_token)
print(f'Signature: {signature}')

# Make the request
response = requests.post(
    'https://staging.platform.0.swipegames.io/api/v1/create-new-game',
    headers={
        'Content-Type': 'application/json',
        'X-REQUEST-SIGN': signature
    },
    data=canonical_json  # Send the same canonical JSON used for signing
)
```

#### Complete GET Request Example

```python
import hmac
import hashlib
import json
import requests

def to_canonical_json(data):
    return json.dumps(data, sort_keys=True, separators=(',', ':'))

def sign(payload, token):
    signature = hmac.new(
        token.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    )
    return signature.hexdigest()

# For GET requests
api_token = 'your-api-token-here'
query_params = {
    'sessionID': 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
}

# Convert to canonical JSON for signing
canonical_json = to_canonical_json(query_params)
# Output: {"sessionID":"a1b2c3d4-e5f6-7890-abcd-ef1234567890"}
signature = sign(canonical_json, api_token)

# Make the request with query parameters
response = requests.get(
    'https://your-integration-url.com/balance',
    headers={
        'X-REQUEST-SIGN': signature
    },
    params=query_params
)
```

### Go

#### Complete POST Request Example

```go
package main

import (
    "bytes"
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "encoding/json"
    "net/http"
    "sort"
)

// ToCanonicalJSON converts a map to canonical JSON string
func ToCanonicalJSON(data map[string]interface{}) (string, error) {
    // Create a sorted slice of keys
    keys := make([]string, 0, len(data))
    for k := range data {
        keys = append(keys, k)
    }
    sort.Strings(keys)

    // Build canonical JSON manually to ensure no whitespace
    // Or use json.Marshal which in Go produces compact output
    jsonBytes, err := json.Marshal(data)
    if err != nil {
        return "", err
    }

    return string(jsonBytes), nil
}

// Sign calculates HMAC-SHA256 signature
func Sign(payload, token string) string {
    hash := hmac.New(sha256.New, []byte(token))
    hash.Write([]byte(payload))
    return hex.EncodeToString(hash.Sum(nil))
}

func main() {
    apiToken := "your-api-token-here"

    requestData := map[string]interface{}{
        "cID":       "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "extCID":    "your_ext_id",
        "gameID":    "sg_catch_97",
        "demo":      true,
        "returnURL": "https://your-site.com/game-lobby",
        "platform":  "desktop",
        "currency":  "USD",
        "locale":    "en-US",
    }

    // Convert to canonical JSON
    canonicalJSON, _ := ToCanonicalJSON(requestData)
    // Output: {"cID":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","currency":"USD","demo":true,"extCID":"your_ext_id","gameID":"sg_catch_97","locale":"en-US","platform":"desktop","returnURL":"https://your-site.com/game-lobby"}

    // Generate signature
    signature := Sign(canonicalJSON, apiToken)

    // Make the request
    req, _ := http.NewRequest(
        "POST",
        "https://staging.platform.0.swipegames.io/api/v1/create-new-game",
        bytes.NewBuffer([]byte(canonicalJSON)),
    )
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("X-REQUEST-SIGN", signature)

    client := &http.Client{}
    client.Do(req)
}
```

#### Complete GET Request Example

```go
package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "encoding/json"
    "net/http"
    "net/url"
)

func Sign(payload, token string) string {
    hash := hmac.New(sha256.New, []byte(token))
    hash.Write([]byte(payload))
    return hex.EncodeToString(hash.Sum(nil))
}

func URLValuesToCanonicalJSON(values url.Values) (string, error) {
    // Convert url.Values to a simple map
    flattened := make(map[string]string)
    for key, vals := range values {
        if len(vals) > 0 {
            flattened[key] = vals[0]
        }
    }

    // Marshal to canonical JSON
    jsonData, err := json.Marshal(flattened)
    if err != nil {
        return "", err
    }

    return string(jsonData), nil
}

func main() {
    apiToken := "your-api-token-here"

    // Prepare query parameters
    params := url.Values{}
    params.Set("sessionID", "a1b2c3d4-e5f6-7890-abcd-ef1234567890")

    // Convert to canonical JSON for signing
    canonicalJSON, _ := URLValuesToCanonicalJSON(params)
    // Output: {"sessionID":"a1b2c3d4-e5f6-7890-abcd-ef1234567890"}

    // Generate signature
    signature := Sign(canonicalJSON, apiToken)

    // Make the request
    baseURL := "https://your-integration-url.com/balance"
    fullURL := baseURL + "?" + params.Encode()

    req, _ := http.NewRequest("GET", fullURL, nil)
    req.Header.Set("X-REQUEST-SIGN", signature)

    client := &http.Client{}
    client.Do(req)
}
```

### PHP

#### Complete POST Request Example

```php
<?php

function toCanonicalJSON($data) {
    // JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE for standard encoding
    return json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

function sign($payload, $token) {
    return hash_hmac('sha256', $payload, $token);
}

// Example usage
$apiToken = 'your-api-token-here';
$requestData = [
    'cID' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'extCID' => 'your_ext_id',
    'gameID' => 'sg_catch_97',
    'demo' => true,
    'returnURL' => 'https://your-site.com/game-lobby',
    'platform' => 'desktop',
    'currency' => 'USD',
    'locale' => 'en-US'
];

// PHP automatically sorts array keys when encoding to JSON
ksort($requestData); // Ensure alphabetical order

// Convert to canonical JSON
$canonicalJSON = toCanonicalJSON($requestData);
echo "Canonical JSON: " . $canonicalJSON . "\n";
// Output: {"cID":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","currency":"USD","demo":true,"extCID":"your_ext_id","gameID":"sg_catch_97","locale":"en-US","platform":"desktop","returnURL":"https://your-site.com/game-lobby"}

// Generate signature
$signature = sign($canonicalJSON, $apiToken);
echo "Signature: " . $signature . "\n";

// Make the request
$ch = curl_init('https://staging.platform.0.swipegames.io/api/v1/create-new-game');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $canonicalJSON);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-REQUEST-SIGN: ' . $signature
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);
?>
```

## Common Pitfalls and Solutions

### Problem 1: Different signature on client vs server
**Cause:** JSON not properly canonicalized before signing

**Solution:** Always verify your canonical JSON output:
```javascript
const canonical = toCanonicalJSON(data);
console.log('Signing this exact string:', canonical);
// Should be compact with sorted keys, no spaces
```

### Problem 2: Special characters causing issues
**Cause:** Incorrect JSON escaping or encoding

**Solution:** Use standard JSON libraries with UTF-8 encoding. Don't manually construct JSON strings.

### Problem 3: Numeric precision issues
**Cause:** Different serialization of numbers (100 vs 100.0)

**Solution:** Be consistent with number types. Integers should be integers, floats should be floats.

### Problem 4: Array ordering
**Cause:** Arrays with different ordering

**Solution:** Arrays maintain their order in canonical JSON. Only object keys are sorted.

## Testing Your Implementation

1. **Start with a simple test case:**
```json
{"cID":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","currency":"USD","demo":true,"extCID":"your_ext_id","gameID":"sg_catch_97","locale":"en-US","platform":"desktop","returnURL":"https://your-site.com/game-lobby"}
```

2. **Verify the canonical form** - it should be exactly as shown above (compact, sorted keys)

3. **Generate the signature** using your implementation

4. **Compare** with a known-good implementation or contact support with your test data

5. **Log everything** during development:
   - Original data
   - Canonical JSON string
   - Generated signature
   - Request headers and body
