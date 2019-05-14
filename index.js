/*
 * Module name: net.vorotnikov.transform
 * Module author: Petar Vorotnikov 
 */

const MODULE_NAME = 'net.vorotnikov.transform'
const Transformer = require('./transformer')

async function prepare() {
    console.log(`${MODULE_NAME}.prepare() called`)
}

async function load() {
    console.log(`${MODULE_NAME}.load() called`)
}

async function getCapabilities() {
    console.log(`${MODULE_NAME}.getCapabilities() called`)
}

async function start() {
    console.log(`${MODULE_NAME}.start() called`)
}

async function suspend() {
    console.log(`${MODULE_NAME}.suspend() called`)
}

async function resume() {
    console.log(`${MODULE_NAME}.resume() called`)
}

async function stop() {
    console.log(`${MODULE_NAME}.stop() called`)
}

async function unload() {
    console.log(`${MODULE_NAME}.unload() called`)
}

async function cleanup() {
    console.log(`${MODULE_NAME}.cleanup() called`)
}

/**
 * Process incoming message
 * @param {Object} context 
 * @param {Object} context.arguments
 * @param {Object} context.arguments.transformation
 * @param {Boolean} context.arguments.json
 */
async function _process(context) {
    console.log(`${MODULE_NAME}.process() called`)
    const { topic, message, appId, gatewayId, arguments } = context
    const { transformation, json } = context.arguments

    const transformer = new Transformer(transformation, message)
    const transformedMessage = transformer.getTransformedMessage()

    return json ? JSON.stringify(transformedMessage) : transformedMessage
}

// mandatory interface
module.exports = {
    prepare,
    load,
    getCapabilities,
    start,
    suspend,
    resume,
    stop,
    unload,
    cleanup,
    process: _process,
}
