const { populate } = require("../models/Event")
const Event = require("../models/Event")
const User = require("../models/User")


exports.getEvents = async(req, res, next) =>{

    const events = await Event.find({}, '').populate('user', 'firstname lastname')

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
    user.events.push(event._id)

    await event.save()
    await user.save()
    res.status(200).send(event)
}

exports.getSingleEvent = async(req, res, next)=>{

    const {id} = req.params
    
    const event = await Event.findById(id).populate('user','-password').populate('comments')

    if(!event){
        const error = new Error('Event are not available anymore!!')
        error.status = 400
        return next(error)
    }
    res.status(200).send(event)
}

// Ahmad ID => 6319ddc1d76548cd1be78613

// {
//     "category": "Erwachsene",
//     "title": "Ahmad Title",
//     "description": "som description about event",
//     "adresse": "Hamburg",
//     "datum": "02/02/2022"
//   }

exports.joinEvent = async(req,res,next)=>{
    
    // const userID = req.user._id
    // if(!userID){
    //     const error = new Error('Auth Failed, u have to login first!')
    //     error.status = 401
    //     return next(error)
    // }
    const user = await User.findById(req.user._id)

    if(!user){
        const error = new Error('Authorization USER failed!!!')
        error.status = 401
        return next(error)
    }

    const eventID = req.body.id

    const event = await Event.findById(eventID).populate('team')
    if(!event){
        const error = new Error('Event ID failed')
        error.status = 400
        return next(error)
    }

    // if(!event.team.filter(x=> x.includes(userID) )){
    // ---!event.team.map( member => member === userID)------
    //     event.team.push(userID)
    //     console.log('You already in Team!');
    // }

    if(event.team.includes(user._id)){
        const error = new Error('User ist schon im Team!')
        error.status = 400
        return next(error)
    } 

    event.team.push(user)

    await user.save()
    await event.save()

    res.status(200).send(event)
}