const Chat = require('../models/Messenger')
const User = require('../models/User')
require('express-async-errors')


exports.readChat = async (req, res, next)=>{
    const user = req.user
    const {friendID, message} = req.body

    console.log('USer ID: ',user._id);
    console.log('Friend id: ', friendID);
    console.log('Message : ', message);

    const chat = await Chat.findOne({me: user._id.toString(), friend: friendID}).populate('friend')
    const friend = await User.findById(friendID)
    chat.friend = friend

    // const friend = await User.findById(friendID)

    res.status(200).json(chat)
}

exports.setChat = async (req, res, next)=>{

    const {friend} = req.body

    const chat = new Chat().populate('friend')
    chat.friend = friend
    chat.user = req.user

    await Chat.save()

    console.log('Friend: ',friend);
    console.log('Chat: ',chat);

    res.status(200).send(chat)
}

exports.addChat = async (req, res, next)=>{

    const chat = await new Chat(req.body).populate('friend')
    const user = req.user
    const {friend, message} = req.body

    chat.me = user
    chat.friend = friend
    chat.message.push(message)

    console.log(user);
    user.messenger.push(chat._id)
    // user.messenger.chat.push(message)

    const friendUser = await User.findById(friend)

    friendUser.messenger.push(chat._id)

    await chat.save()
    await user.save()
    await friendUser.save()

    res.status(200).send(chat)
}