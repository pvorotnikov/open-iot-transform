const CSON = require('cson')
const { ObjectTemplate } = require('json2json')

class Transformer {

    constructor(transformationObj, originalMessage) {
        this.transformationObj = transformationObj
        this.originalMessage = originalMessage

        // try parsing the message and the transformation
        const messageType = Object.prototype.toString.call(originalMessage)
        if (messageType === '[object String]' || messageType === '[object Uint8Array]') {
            this.message = this.tryJson()
        } else {
            this.message = originalMessage
        }
        if (this.message) {
            this.transformation = this.tryTransformation()
        }

        // do the actual transformation if needed
        this.transformedMessage = null
        if (this.message && this.transformation) {
            this.transformedMessage = this.transform()
        } else {
            this.transformedMessage = this.originalMessage
        }
    }

    transform() {
        const o = new ObjectTemplate(this.transformation)
        const t = o.transform(this.message)
        return t
    }

    tryJson() {
        let result = null
        try {
            result = JSON.parse(this.originalMessage)
        } catch (err) {
            console.log('Unparsable message. Transformation not applicable')
        }
        return result
    }

    tryTransformation() {

        if (!this.transformationObj) {
            console.log('No transformation specified')
            return null
        }

        let transformation = null

        if (Object.prototype.toString.call(this.transformationObj) === '[object Object]') {
            transformation = this.transformationObj
        } else {
            try {
                transformation = JSON.parse(this.transformationObj)
            } catch (err) {
                if (err instanceof SyntaxError) {
                    let result = CSON.parse(this.transformationObj)
                    if (result instanceof Error) {
                        console.error('Unparsable transformation')
                    } else {
                        transformation = result
                    }
                } else {
                    console.error(err.message)
                }
            }
        }

        return transformation
    }

    getTransformedMessage() {
        return this.transformedMessage
    }

}

module.exports = Transformer
