import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'


import{ currentUserRouter } from './router/current-user'
import{ signoutRouter} from './router/signout'
import{ signinRouter } from './router/signin'
import{ signupRouter } from './router/signup'
import{ errorHandler } from './middleware/error-handler'
import{ NotFoundError} from './errors/not-found-error'



const app = express()
app.set('trust proxy',true)
app.use(json())
app.use(
	cookieSession({
		signed:false,
		secure: true
	})
)



app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.get('*',()=>{
	throw new NotFoundError()
})

app.use(errorHandler)


const start = async ()=>{

	if(!process.env.JWT_KEY)
		throw new Error("JWT_KEY must be defined")

	try{
		await mongoose.connect('mongoose://auth-mongo-srv:27017/auth',{
		useNewUrlParser : true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})

	}catch(err){
		con.error(err)
	}

	console.log("Connected To MongoDB")

	app.listen(3000,()=>{
		console.log('Listening on port: 3000 !!')
	})
	
}

start()