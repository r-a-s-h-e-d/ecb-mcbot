// Ender-Craft BD Server
const { Vec3 } = require('vec3')
const mineflayer = require('mineflayer')
const mcData = require('minecraft-data')(1.18)

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

//// <-- Farming Functions -->
function blockToSow() {
	return bot.findBlock({
		point: bot.entity.position,
		matching: mcData.blocksByName.farmland.id,
		maxDistance: 6,
		useExtraInfo: block => {
			const blockAbove = bot.blockAt(block.position.offset(0, 1, 0))
			return !blockAbove || blockAbove.type === 0
		},
	})
}
function blockToHarvest() {
	return bot.findBlock({
		point: bot.entity.position,
		maxDistance: 6,
		matching: block => {
			return block && block.type === mcData.blocksByName.carrots.id && block.metadata === 7
		},
	})
}
async function startFarming() {
	try {
		while (1) {
			const toHarvest = blockToHarvest()
			if (toHarvest) {
				await bot.dig(toHarvest)
				console.log('█ Harvesting █')
			} else {
				break
			}
		}
		while (1) {
			const toSow = blockToSow()
			if (toSow) {
				await bot.equip(mcData.itemsByName.carrot.id, 'hand')
				await bot.waitForTicks(3)
				await bot.placeBlock(toSow, new Vec3(0, 1, 0))
			} else {
				break
			}
		}
	} catch (e) {
		console.log(e)
	}
	setTimeout(startFarming, 1000)
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
				'|         Start Farming        |\n',
				'└──────────────────────────────┘'
			)
		)
		.then(() => startFarming())
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
				case 'quit':
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
