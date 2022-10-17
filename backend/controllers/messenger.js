
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
    // const user = req.user
    // const {friend, message} = req.body

    const {chatID} = req.query
    console.log('QUERY => ',chatID);

    const chat = await Chat.findById(chatID).populate('me').populate('friend').populate('messages.user')

    if(!chat){
        // const error = new Error('Chat not found!')
        // error.status = 400
        // return next(error)
       return  res.status(200).send('Chat not found')
    }

    // console.log('USer ID: ',user._id);
    // console.log('Friend id: ', friend);

    res.status(200).send(chat)
}

exports.startChat = async(req,res,next) =>{

    const {friend, chatID, message} = req.body
    // const user = req.user

    const user = await User.findById(req.user._id)

    const chat = await Chat.findById(chatID).populate('friend').populate('me').populate('messages.user')

    if(!chat){
        const error = new Error('Chat went wrong')
        error.status = 400
        return next(error)
    }

    chat.messages.push({user:user, message: message})

    // if(!chat.friend.notification){
    //     chat.friend.notification = []
    // }
    // chat.friend.notification.push('1 more notification')

    console.log('ID USER', user._id);
    
    if(chat.friend._id !== user._id){

        chat.friend.notification = true
        const realUser = await User.findById(chat.friend._id)
        realUser.notification = true
        realUser.chatting = chat.me._id

        await realUser.save()

    } else{
        chat.me.notification = true
        const realUser = await User.findById(chat.me._id)
        realUser.notification = true
        realUser.chatting = chat.friend._id

        await realUser.save()
    }

    console.log('START CHAT Result=> ',chat);

    await chat.save()
    res.status(200).json(chat)
}

exports.setChat = async (req, res, next)=>{

    const {friend} = req.body
    const user = req.user

    console.log('USER REQ: ',user._id);

    let chat = await Chat.findOne({me: user._id.toString(), friend: friend}).populate('friend').populate('me').populate('messages.user')

    if(!chat){
         chat = await Chat.findOne({friend: user._id.toString(), me: friend}).populate('friend').populate('me').populate('messages.user')

        //  chat.me = friend
        //  chat.friend = user._id

        if( !chat){
            chat = await (await (await new Chat(req.body).populate('friend')).populate('me')).populate('messages.user')
   
            chat.friend = friend
            chat.me = user._id
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


// exports.setChatNew = async (req, res, next)=>{

//     const friend = req.body.friend
//     let chat = await Chat.findOne({me: user._id.toString(), friend: friend}).populate('friend').populate('me').populate('messages.user')


//     if(chat.me._id !== req.user._id){

//     }

// }