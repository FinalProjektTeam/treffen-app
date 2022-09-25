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


exports.deleteComment = async(req, res, next)=>{

    const comment = await Comment.findById(req.body.id).populate('user')
    
    const event = await Event.findById(req.body.event).populate('user').populate('comments')

    if( !(comment.user._id.toString() === req.user._id.toString())){  
        return res.status(201).send('Its not your comment')
    } 
    
    event.comments.filter( e => e !== req.body.id )
    await Promise.all( event.comments.map((e)=>e.populate('user')) )

    await comment.remove()

    event.comments.remove(req.body.id)
    await event.save()

    res.status(200).send(event)
}