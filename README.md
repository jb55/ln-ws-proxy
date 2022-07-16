
# ln-ws-proxy

A websockets to lightning proxy

## Usage

PORT=8085 ./ln-ws-proxy

requests to `ws://127.0.0.1/24.84.152.187` will be proxied to `24.84.152.187:9735` over a real (non-websocket) connection
