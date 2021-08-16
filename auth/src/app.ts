import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
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
		secure: process.env.NODE_ENV !=='test'
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

export { app }