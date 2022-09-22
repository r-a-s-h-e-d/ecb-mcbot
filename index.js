// Ender-Craft BD
const mineflayer = require('mineflayer')

const host = process.env.MC_SERVER
const username = process.env.USERNAME1
const password = process.env.PASSWORD1

const bot = mineflayer.createBot({
	host,
	username,
	version: 1.18,
	// port: 11500,
})
bot.on('kicked', console.log)
bot.on('error', console.log)

//// Mimic ECB Login
bot.once('spawn', async () => {
	await bot.waitForChunksToLoad()
	await bot
		.waitForTicks(12)
		.then(() => bot.chat('/login ' + password))
		.then(() =>
			console.log(
				' ------------------------------\n',
				'|           Logged In          |\n',
				' ------------------------------'
			)
		)
	await bot
		.waitForTicks(12)
		.then(() => bot.chat('/server Survival'))
		.then(() =>
			console.log(
				' ------------------------------\n',
				'|       Going to Survival      |\n',
				' ------------------------------'
			)
		)
})

//// <-- Look at Player -->
function lookAtPlayer() {
	const playerFilter = entity => entity.type === 'player'
	const playerEntity = bot.nearestEntity(playerFilter)

	if (!playerEntity) return

	const plrPos = playerEntity.position.offset(0, playerEntity.height, 0)
	bot.lookAt(plrPos)
}
bot.on('physicTick', lookAtPlayer)
