const Comment = require('../models/Comment')
const Event = require('../models/Event')

exports.createComment = async(req, res, next)=>{

    const comment = await new Comment(req.body).populate('user')
    comment.user = req.user._id
    // comment.event = req.body.event
    // comment.comment = req.body.comment

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
    
    // How to insert Event ID in a Comment? =>{ do it in frontend, req.body, it comes with body}!
    // comment.event = 

     event.comments.push(comment.id)

    await comment.save()
    await event.save()

    res.status(200).send(comment)
}

// "comment": "Hali Halo!",
// "event": "6319e10928c27d4864dcb865"

// {
//     "password": "123456",
//     "email": "ahmad@mail.de"
//   }


