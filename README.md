
# ln-ws-proxy

A websockets to lightning proxy

## Usage

`PORT=8085 ./ln-ws-proxy`

requests to `ws://127.0.0.1:8085/24.84.152.187` will be proxied to `24.84.152.187:9735` over a real (non-websocket) connection

## Use cases

- Using [lnsocket.js][lnsocket] in the browser in https mode without having to run a server, you can use a free or paid proxy

- Hiding your lightning node when using [lnsocket.js][lnsocket] by replacing the ip with a hidden lookup string

- Using [lnsocket.js][lnsocket] to connect to LND nodes which don't support direct websocket connections

[lnsocket]: https://github.com/jb55/lnsocket
