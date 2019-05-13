const mock = require('mock-require')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const sinon = require('sinon')
const moment = require('moment')
const should = chai.should()
const expect = chai.expect
chai.use(sinonChai)

describe('Transform', function() {

	function generateMessage() {
		return {
			device: {
				id: 'test-device',
				index: 0,
				name: 'Test Device',
				description: 'Device Description'
			},
			time: {
				unix: new Date().getTime(),
				iso: new Date().toISOString(),
			},
			readings: {
				temperature: { value: 10, unit: 'degree' },
				humidity: { value: 40, unit: 'percent' },
			}
		}
	}

	const TRANSFORMATION = {
		path: '.',
		as: {
			time: {
				path: 'time',
				value: 'iso'
			},
			device: {
				path: 'device',
				value: 'name'
			},
		}
	}

	const transform = require('./index')

	it('should initialize', () => {
		transform.prepare()
		transform.load()
		transform.getCapabilities()
		transform.start()
	})

	it('should deinitialize', () => {
		transform.stop()
		transform.unload()
		transform.cleanup()
	})

	it('should handle lifecycle methods', () => {
		transform.start()
		transform.suspend()
	})

	it('should process message', async () => {
		const contextStub = {
			topic: 'transform',
			message: generateMessage(),
			appId: 'abc', 
			gatewayId: 'def',
		}
		let output = await transform.process(TRANSFORMATION, false, contextStub)
		output.should.be.an('object')
	})

	it('should process message and return JSON', async () => {
		const contextStub = {
			topic: 'transform',
			message: JSON.stringify(generateMessage()),
			appId: 'abc', 
			gatewayId: 'def',
		}
		let output = await transform.process(TRANSFORMATION, true, contextStub)
		output.should.be.a('string')
	})

})
