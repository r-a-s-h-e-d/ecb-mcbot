const { Vec3 } = require('vec3')
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
	host: 'localhost',
	username: 'Farmer',
	port: 9540,
	version: 1.18,
})

const carrots = 319
const farmland = 160
const carrot = 947

function blockToSow() {
	return bot.findBlock({
		point: bot.entity.position,
		matching: farmland,
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
			return block && block.type === carrots && block.metadata === 7
		},
	})
}
async function startFarming() {
	try {
		while (1) {
			const toHarvest = blockToHarvest()
			if (toHarvest) {
				await bot.dig(toHarvest)
			} else {
				break
			}
		}
		while (1) {
			const toSow = blockToSow()
			if (toSow) {
				await bot.equip(carrot, 'hand')
				await bot.waitForTicks(1)
				await bot.placeBlock(toSow, new Vec3(0, 1, 0))
			} else {
				break
			}
		}
	} catch (e) {
		console.log(e)
	}
	// No block to harvest or sow. Postpone next loop a bit
	setTimeout(startFarming, 1000)
}
bot.once('login', startFarming)
