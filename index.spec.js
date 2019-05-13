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
		return {}
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
		let output = await transform.process(contextStub)
		output.should.be.an('object')
	})

})
