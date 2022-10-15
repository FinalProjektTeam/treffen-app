
const Chat = require('../models/Messenger')
const User = require('../models/User')
require('express-async-errors')


// exports.readChat = async (req, res, next)=>{
//     const user = req.user
//     const {friend, message} = req.body

//     console.log('USer ID: ',user._id);
//     console.log('Friend id: ', friend);


//        let chat =  await Chat.findOne({me: user._id.toString(), friend: friend}).populate('friend')

//        if(!chat){
//         chat = await Chat.findOne({friend: user._id.toString(), me: friend}).populate('friend')
//         console.log('XXX =>: ', chat);
//        }
   
//     console.log(chat);
    
//     res.status(200).json(chat)
// }

exports.readChat = async (req, res, next)=>{
    const user = req.user
    const {friend, message} = req.body

    const {chatID} = req.query

    const chat = await Chat.findById(chatID)

    if(!chat){
        const error = new Error('Chat not found!')
        error.status = 400
        return next(error)
    }

    console.log('USer ID: ',user._id);
    console.log('Friend id: ', friend);

}

exports.startChat = async(req,res,next) =>{

    const {friend, chatID, message} = req.body

    const user = req.user
  

    const chat = await Chat.findById(chatID).populate('friend').populate('me').populate('messages.user')


    chat.messages.push({user:user, message: message})

    console.log('START CHAT Result=> ',chat);

    await chat.save()

    res.status(200).send(chat)
}

exports.setChat = async (req, res, next)=>{

    const {friend} = req.body
    const user = req.user

    console.log('USER REQ: ',user._id);

    // const chat = new Chat().populate('friend')
    let chat = await Chat.findOne({me: user._id.toString(), friend: friend}).populate('friend').populate('me').populate('messages.user')

    if(!chat){
         chat = await Chat.findOne({friend: user._id.toString(), me: friend}).populate('friend').populate('me').populate('messages.user')

         if(chat){
             chat.me = friend
             chat.friend = user._id.toString()
        }

         if( !chat){
            chat = await (await (await new Chat(req.body).populate('friend')).populate('me')).populate('messages.user')
   
            chat.friend = friend
            chat.me = user._id.toString()
            chat.messages.push({message:'Chat Started', user: user._id.toString()})
       }
    }
    console.log('CHAT STATUS IS=>: ', chat);
    console.log('Friend STATUS is: ',friend);

    if(friend == user._id.toString()){

        res.status(200).send(null)
    }
    
    await chat.save()

    res.status(200).send(chat)
}
