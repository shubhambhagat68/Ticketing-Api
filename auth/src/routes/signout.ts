import express from 'express';
import {json} from 'body-parser';


const router = express.Router()

router.post('/api/users/signout',(req,res)=>{
	res.send('hi there!')
})

export{router as signoutRouter}
