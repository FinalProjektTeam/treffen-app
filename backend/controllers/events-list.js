const Event = require("../models/Event")
const User = require("../models/User")


exports.getEvents = async(req, res, next) =>{

    const events = await Event.find({}, '-datum').populate('user', '-_id')

    res.status(200).send(events)
}

exports.addEvent = async(req, res, next)=>{

    const userID = req.user._id
    
    if(!userID ){
        const error = new Error('Authorization User ID failed!!!')
        error.status = 401
        return next(error)
    }

    const user = await User.findById(userID)
    if(!user){
        const error = new Error('Authorization USER failed!!!')
        error.status = 401
        return next(error)
    }
    const event = new Event(req.body)
    // token kommt von auth middleware, so kennen wir den User
    event.user = user

    await event.save()
    res.status(200).send(event)
}

exports.getSingleEvent = async(req, res, next)=>{

    const {id} = req.params
    
    const event = await Event.findById(id, '-datum').populate('user','-password')

    if(!event){
        const error = new Error('Event are not available anymore!!')
        error.status = 400
        return next(error)
    }

    res.status(200).send(event)

}

// Ahmad ID => 6319ddc1d76548cd1be78613

// {
//     "category": "Kinder",
//     "title": "Ahmad Title",
//     "description": "som description about event",
//     "adresse": "Hamburg",
//     "datum": "02/02/2022"
//   }