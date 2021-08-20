import mongoose from 'mongoose'

import { app } from 'app'

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