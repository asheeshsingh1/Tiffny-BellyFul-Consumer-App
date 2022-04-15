const express = require('express')
const consumerRouter = express.Router()
const db = require('../db/connPostGreSQL')
const Consumer = require('../models/consumerModel')
const auth = require('../middleware/auth')

//Consumer Routes
consumerRouter.post('/consumer',async (req,res)=>{
    try {  
        const consumer = await new Consumer(req.body)
        await consumer.generateJWT()
        await consumer.validate()
        const queryInsertConsumer = `insert into consumers(_id,name,email,password,token) values('${consumer._id}','${consumer.name}','${consumer.email}','${consumer.password}','${consumer.token}');`;
        await db.query(queryInsertConsumer);
        res.status(201).send({status:"Consumer Created Successfully",consumer})
    } catch (e) {
        res.status(400).send({
          status:e.name,
          statusMessage:e.message
        })
    }
})

consumerRouter.post('/consumer/login',async (req, res)=>{
    try{
      const result = await Consumer.findByCredentials(req.body.email,req.body.password)
      const consumer = new Consumer(result);
      console.log(consumer)
      await consumer.generateJWT()
      const queryUpdateToken = `update consumers set token = '${consumer.token}' where email = '${consumer.email}';`;
      await db.query(queryUpdateToken);
      res.send({status:"Logged in Successfully",consumer})
    }catch(e){
      res.status(400).send({
          message:"Invalid Credentials"
        })
    }
})

consumerRouter.get('/consumer/myprofile',auth, async (req,res)=>{
    const consumer = new Consumer(req.consumer);
  res.send({status:"Fetched Consumer Data Successfully",consumer:consumer})
})

consumerRouter.post('/consumer/logout',auth,async (req, res)=>{
    try{
        const consumer = new Consumer(req.consumer)
        consumer.token = undefined
      await db.query(`update consumers set token = null where _id = '${consumer._id}';`)
      res.send({status:"Logged out Successfully",consumer})
    }catch(e){
      res.status(500).send({
          message:"Logout Failed"
        })
    }
})

consumerRouter.patch('/consumer/myprofile',auth, async (req,res)=>{
  const reqKeys = Object.keys(req.body)
  const allowedKeys = ['name','password']
  const isValidKey = reqKeys.every((update)=> allowedKeys.includes(update))

  if(!isValidKey){
    return res.status(404).send({errorMessage:"Invalid Key Present"})
  }
  try{
    const consumer = new Consumer(req.consumer)
    reqKeys.forEach((update) => consumer[update] = req.body[update])
    await consumer.validate()
    await db.query(`update consumers set name = '${consumer.name}', password = '${consumer.password}' where _id = '${consumer._id}';`)
    res.send({status:"Consumer Updated Successfully",consumer})
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

consumerRouter.delete('/consumer/myprofile',auth, async (req,res)=>{
  try{
    const consumer = new Consumer(req.consumer)
    await db.query(`delete from consumers where _id = '${consumer._id}';`)
    res.send({status:"Consumer Deleted Successfully",consumer})
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

module.exports = consumerRouter;