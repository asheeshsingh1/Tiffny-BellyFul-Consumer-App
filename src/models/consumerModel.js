const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const db = require('../db/connPostGreSQL');
const jwt = require('jsonwebtoken')

//Consumer Data Model
const consumerSchema = new mongoose.Schema({
    name:{
        type: String,
        trim : true,
        required: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isLength(value,6)){
                throw new Error('Password must be between 6 to 25 characters long');
            }
            if(validator.isEmpty(value)){
                throw new Error('Password can not be empty')
            }
            else if(validator.equals(value.toLowerCase(),"password")){
                throw new Error('Password should not be password!')
            }
            else if(validator.contains(value.toLowerCase(), "password")){
                throw new Error('Password should not contain password!')
            }
        }
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not Valid');
            }
        }
    },
    token:{
        type: String,
        required: true,
    }
})

consumerSchema.methods.toJSON = function(){
    const consumer = this
    const consumerSchemaObject = consumer.toObject()
    delete consumerSchemaObject.password
    return consumerSchemaObject;
}

consumerSchema.post('validate', async function (){
    const consumer = this
    if(consumer.isModified('password')){
        consumer.password = await bcrypt.hash(consumer.password,8);
    }
})

consumerSchema.statics.findByCredentials = async (email,password) =>{
    const consumer = await db.query(`select * from consumers where email = '${email}'`);
    if(!consumer.rowCount){
        throw new Error('Invalid Credentials');
    }
    const correctConsumerCreds = await bcrypt.compare(password,consumer.rows[0].password)
    if(!correctConsumerCreds){
        throw new Error('Invalid Credentials');
    }
    return consumer.rows[0];
}

consumerSchema.methods.generateJWT = async function(){
    const consumer = this
    const token = jwt.sign({_id: consumer.id.toString()}, process.env.JWT_TOKEN_HASH)
    consumer.token = token
    return token;
}

const Consumer = mongoose.model('Consumer',consumerSchema)

module.exports = Consumer;