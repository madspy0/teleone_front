import * as React from "react"
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64url from 'crypto-js/enc-base64url';
import Utf8 from 'crypto-js/enc-utf8'

export default function MeToken (username) {
    const header = {
        "alg": "HS256",
        "typ": "JWT"
    }
    const payload = {
        "mercure": {
            "publish": [
                "*"
            ],
            "subscribe": [
                "https://demo/"+username,
                "{scheme}://{+host}/demo/books/{id}.jsonld",
                "/.well-known/mercure/subscriptions{/topic}{/subscriber}"
            ],
            "payload": {
                "user": "https://example.com/users/"+ username,
                "remoteAddr": "127.0.0.1"
            }
        }
    }
    const encodeHeaderWord = Utf8.parse(JSON.stringify(header)); // encodedWord Array object
    const encodedHeader = Base64url.stringify(encodeHeaderWord);
    const encodePayloadWord = Utf8.parse(JSON.stringify(payload)); // encodedWord Array object
    const encodedPayload = Base64url.stringify(encodePayloadWord);
    const data = encodedHeader + "." + encodedPayload
    const digest = hmacSHA256(data, '!ChangeMe!', { expiresIn: '1h' })

    return (data + "." + Base64url.stringify(digest))
}