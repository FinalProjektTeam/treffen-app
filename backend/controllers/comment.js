const Comment = require('../models/Comment')
const Event = require('../models/Event')

exports.createComment = async(req, res, next)=>{

    const comment = await new Comment(req.body).populate('user')
    comment.user = req.user

    // await comment.populate('user')
    
    if(!comment.user){
        const error = new Error('user not found!')
        error.status = 400
        return next(error)
    }
    
    const event = await Event.findById(comment.event).populate('comments').populate('user')

    if(!event){
        const error = new Error('Event is not avaiable anymore!')
        error.status = 400
        return next(error)
    }
    

    event.comments.push(comment.id)

    await comment.save()
    await event.save()

    res.status(200).send(comment)
}


