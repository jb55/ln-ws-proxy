

const WebSocket = require('ws')
const net = require('net')

const {WebSocketServer} = WebSocket

function ln_ws_proxy_server(opts={}) {
	opts.port = opts.port || process.env.PORT || 8080

	const server = new WebSocketServer(opts)

	server.on('connection', handle_connection)

	return server
}

function handle_open(ws, req) {
	//console.log("open", req)
	console.log("open")
}

function parse_ip(str)
{
	const parts = str.split(":")
	return {host: parts[0], port: parts[1] || 9735}
}

async function handle_connection(ws, req) {
	let socket = null
	try {
		const url = new URL(`wss://${req.headers.host}${req.url}`)
		const dest = url.pathname.substring(1)
		if (!dest) {
			ws.close()
			return
		}

		const {host, port} = parse_ip(dest)
		console.log("serving", host, port)
		const is_resolved = false

		const connected = new Promise((resolve, reject) => {
			const conn = net.createConnection(port, host, () => {
				socket = conn
				resolve(conn)
			})
		});

		let messages = []
		ws.on('message', async (msg) => {
			if (socket) {
				socket.write(msg)
				return 
			}

			messages.push(msg)
		})

		// queue up messages until we're connected
		socket = await connected
		socket.on('data', (d) => ws.send(d))

		for (const message of messages) {
			socket.write(message)
		}
		messages = null
	} catch (e) {
		console.error("error: ", e)
	}
}

module.exports = ln_ws_proxy_server
