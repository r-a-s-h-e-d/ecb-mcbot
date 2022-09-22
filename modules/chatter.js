const mineflayer = require('mineflayer')

const username = process.env.USERNAME1

const readline = require('readline')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

const bot = mineflayer.createBot({
	host: 'localhost',
	username,
	port: 13311,
	version: 1.18,
})

//// READ ALL MESSAGES
bot.on('message', async jsonMsg => {
	let ansiText = jsonMsg.toAnsi()
	let rawText = jsonMsg.toString()

	// console.log('JSON', jsonMsg.with[0].text,":",jsonMsg.with[1].text)

	console.log('[', ansiText, ']')

	// if (rawText == 'slow') {
	// 	bot.chat('...slowed')
	// }
})

//// READ CONS0LE
async function readTerminal() {
	try {
		// rl.prompt(true)
		rl.on('line', input => {
			switch (input) {
				case 'quit':
					bot.end()
				default:
					bot.chat(input)
			}
		})
	} catch (e) {
		console.log(e)
	}
}
readTerminal()
