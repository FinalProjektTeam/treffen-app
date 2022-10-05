
const Chat = require('../models/Messenger')
const User = require('../models/User')

exports.readChat = async (req, res, next)=>{

    const user = req.user
    console.log(user);

    const {friendID, message} = req.body

    const chat = await Chat.findOne({me: user._id.toString(), friend: friendID})

    const friend = await User.findById(friendID)


    res.status(200).send(chat)
}

exports.addChat = async (req, res, next)=>{

    const user = req.user
    const {friendID, message} = req.body

    const chat = new Chat(req.body).populate('me').populate('friend')
    chat.me = user
    chat.friend = friendID

    user.messenger.push(chat)
    user.messenger.chat.push(message)

    const friend = await User.findById(friendID)

    friend.messenger.push(chat)
    friend.messenger.chat.push(message)


    await chat.save()
    await user.save()
    await friend.save()

    res.status(200).send(chat)

    
}