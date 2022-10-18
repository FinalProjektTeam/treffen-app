
const Chat = require('../models/Messenger')
const User = require('../models/User')
require('express-async-errors')


exports.readChat = async (req, res, next)=>{
    const {chatID} = req.query
    console.log('QUERY => ',chatID);

    const chat = await Chat.findById(chatID).populate('participants').populate('messages.user')

    if(!chat ){
       return  res.status(201).send(null)
    }
    if(!chatID ){
        return  res.status(201).send(null)
     }
    console.log('CHAT Read Chat: ',chat);
    res.status(200).send(chat)
}

exports.setChat = async (req, res, next)=>{
    const {friend} = req.body
    const user = await User.findById(req.user._id.toString())
    console.log('USER REQ: ',user.firstname);

    let chat = await Chat.findOne({ $or: [ { participants: {$elemMatch:{$eq: friend}} } , { participants: {$elemMatch:{$eq: user._id}}} ] }).populate('messages.user').populate('participants')


    if(!chat){
        chat  = await new Chat()

        chat.participants = [friend, user._id.toString()]
        chat.messages.push({message:'Chat Started', user: user._id})
        console.log('look here', chat);
       
    }

    // here
    user.messenger.push(chat._id)

    console.log('CHAT STATUS IS=>: ', chat);
    // console.log('Friend STATUS is: ',friend);
    
    await user.save()
    await chat.save()
    res.status(200).send(chat)
}

exports.sendMessage = async(req,res,next) =>{

    const {friend, chatID, message} = req.body
    const user = await User.findById(req.user._id)

    const chat = await Chat.findById(chatID).populate('participants').populate('messages.user')

    if(!chat){
        const error = new Error('Chat went wrong')
        error.status = 400
        return next(error)
    }
    if(!user){
        const error = new Error('User not found')
        error.status = 400
        return next(error)
    }

    chat.messages.push({user:user, message: message})


    console.log('Haupt USER', user._id);

    const receivers = chat.participants.filter(p => p._id != user._id.toString());
    console.log('Rreceivers', receivers);

    const userReceive = await User.findById(receivers[0]._id.toString());

    userReceive.notification = true
    //here
    userReceive.chatting = user._id

    userReceive.messenger.push(chat._id)

    await userReceive.save()

    console.log('Real User Receive: ===> ', userReceive);
    // console.log('START CHAT Result=> ',chat);

    await chat.save()
    res.status(200).json(chat)
}