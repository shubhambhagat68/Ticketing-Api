import {ValidaionError} from 'express-validator'
import { CustomError } from './custom-error'

export class RequestValidationError extends CustomError{
	statusCode=400

	constructor(public errors: ValidaionError[]){
		super()

		Object.setPrototypeOf(this, RequestValidationError.prototype)
	}

	serializeErrors(){
		return this.errors.map(error =>{
			return {message:err.msg , field:error.param }
		})
	}
}