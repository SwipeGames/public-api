---
id: authn
title: Authentication
slug: /authn
---

During the registration process you will recieve API `token key`.
This key is used to sign your requests to our APIs.

In all requests (both `Core Public API` and `Swipe Games Integration Adapter API`) we use `X-REQUEST-SIGN` header which should contain the signature of the request.

For signature generation we use HMAC-SHA256 algorithm with your API `token key` as a `secret key`.

The whole request payload (canonical JSON) should be signed, in case of `GET` requests, the payload is virtual - we use query parameters to construct the JSON, convert it into canonical form and use that JSON for signing.
**Please notice** We don't use `request body` for signing, only the payload in canonical JSON form.

### JSON canonical form

Canonical JSON is a JSON representation that is normalized to ensure consistent ordering of keys and formatting. This is crucial for generating a consistent signature across different requests.
The canonical JSON format requires that:

-   All keys are sorted in ascending order.
-   All string values are enclosed in double quotes.
-   No whitespace is allowed between keys and values.

### Payload sign (POST requestss) example in `Go`

```go
// Sign calculates signature for the payload using the token. Payload here is your stringified canonical JSON.
func Sign(payload, token string) string {
	hash := hmac.New(sha256.New, []byte(token))
	hash.Write([]byte(payload))
return hex.EncodeToString(hash.Sum(nil))
}
```

### GET requests sign example in `Go`

```go
func Sign(queryParams url.Values, token string) string {
  reqJSON, err := URLValuesFlattenedToJSON(params)
  _ = err
	hash := hmac.New(sha256.New, []byte(token))
	hash.Write([]byte(reqJSON))
return hex.EncodeToString(hash.Sum(nil))
}

func URLValuesFlattenedToJSON(values url.Values) ([]byte, error) {
	flattened := make(map[string]string)
	for key, vals := range values {
		if len(vals) > 0 {
			flattened[key] = vals[0]
		}
	}

	jsonData, err := json.Marshal(flattened)
	if err != nil {
		return nil, err
	}

	return jsonData, nil
}
```

### Sign example in `JavaScript`

```javascript
const crypto = require("crypto");

function sign(payload, token) {
    const hmac = crypto.createHmac("sha256", token);
    hmac.update(payload);
    const hash = hmac.digest("hex");
    return hash;
}

const payload = "your payload";
const token = "your api token";
const signature = sign(payload, token);
console.log(signature);
```
