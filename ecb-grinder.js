// Ender-Craft BD Server
const mineflayer = require('mineflayer')

const host = process.env.MC_SERVER
const username = process.env.USERNAME2
const password = process.env.PASSWORD2

const bot = mineflayer.createBot({
	host,
	username,
	version: 1.18,
})
bot.on('kicked', console.log)
bot.on('error', console.log)

//// Grinding Process
async function startGrinding() {
	try {
		while (1) {
			// Grinding Function
		}
	} catch (e) {
		console.log(e)
	}
	setTimeout(startGrinding, 1000)
}

//// Mimic ECB Login
bot.once('spawn', async () => {
	await bot.waitForChunksToLoad()
	await bot
		.waitForTicks(12)
		.then(() => bot.chat('/login ' + password))
		.then(() =>
			console.log(
				' ┌──────────────────────────────┐\n',
				'|           Logged In          |\n',
				'└──────────────────────────────┘'
			)
		)
	await bot
		.waitForTicks(12)
		.then(() => bot.chat('/server Survival'))
		.then(() =>
			console.log(
				' ┌──────────────────────────────┐\n',
				'|       Going to Survival      |\n',
				'└──────────────────────────────┘'
			)
		)
	await bot
		.waitForTicks(20)
		.then(() =>
			console.log(
				' ┌──────────────────────────────┐\n',
				'|        Start Grinding        |\n',
				'└──────────────────────────────┘'
			)
		)
		.then(() => startGrinding())
})

//// Read Server Chat Messages
bot.on('message', async jsonMsg => {
	if (jsonMsg['extra'] && jsonMsg['extra'].length === 9) return
	let ansiText = jsonMsg.toAnsi()
	console.log(ansiText)
})
//// Read Terminal Input
const readline = require('readline')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})
async function readTerminal() {
	try {
		rl.on('line', input => {
			switch (input) {
				case '#':
					bot.end()
				default:
					bot.chat(input)
			}
		})
	} catch (e) {
		console.log(e)
		rl.close()
	}
}
readTerminal()
