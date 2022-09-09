const Comment = require('../models/Comment')
const Event = require('../models/Event')

exports.createComment = async(req, res, next)=>{

    const comment = await new Comment(req.body).populate('user', 'firstname lastname')
    comment.user = req.user._id

    if(!comment.user){
        const error = new Error('user not found!')
        error.status = 400
        return next(error)
    }

    const event = await Event.findById(comment.event).populate('comment')

    if(!event){
        const error = new Error('Event is not avaiable anymore!')
        error.status = 400
        return next(error)
    }
    
    // How to insert Event ID in a Comment? =>{ do it in frontend, req.body, it comes with body}!
    // comment.event = 

    event.comment.push(comment.id)

    await comment.save()
    await event.save()

    res.status(200).send({
        comment: comment,
        event: event
    })
}

// "comment": "Hali Halo!",
// "event": "6319e10928c27d4864dcb865"

// {
//     "password": "123456",
//     "email": "ahmad@mail.de"
//   }