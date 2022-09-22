const mineflayer = require('mineflayer')

const username = process.env.USERNAME1
const password = process.env.PASSWORD1

const bot = mineflayer.createBot({
	host: 'localhost',
	username,
	port: 4899,
	version: 1.18,
})

bot.once('spawn', async () => {
	await bot.waitForChunksToLoad()
	await bot.waitForTicks(12)
	bot.chat('/login ' + password)
	console.log(
		'  ------------------------------\n',
		'|           Logged In           |\n',
		' ------------------------------'
	)
	await bot.waitForTicks(12)
	bot.chat('/server Survival')
	console.log(
		'  ------------------------------\n',
		'|       Going to Survival      |\n',
		' ------------------------------'
	)
})
