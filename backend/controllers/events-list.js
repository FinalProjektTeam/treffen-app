const Event = require("../models/Event")
const User = require("../models/User")
const Comment = require('../models/Comment')
require('express-async-errors')


exports.getEvents = async(req, res, next) =>{
    const events = await Event.find().populate('user')

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
    event.team.push(userID)
    // token kommt von auth middleware, so kennen wir den User
    event.user = user
    user.events.push(event._id)


    await event.save()
    await user.save()
    res.status(200).send(event)
}

exports.getSingleEvent = async(req, res, next)=>{
    const {id} = req.params
    const event = await Event.findById(id).populate('comments').populate('team').populate('user')

    if(!event){
        const error = new Error('Event are not available anymore!!')
        error.status = 400
        return next(error)
    }
 
    await Promise.all( event.comments.map((e)=>e.populate('user')) )
    await event.save()

    res.status(200).send(event)
}


exports.joinEvent = async(req,res,next)=>{
    
    const userID = req.user._id
    console.log(userID);
  
    const user = await User.findById(userID)

    if(!user){
        const error = new Error('Authorization USER failed!!!')
        error.status = 401
        return next(error)
    }
    const eventID = req.body.id

    const event = await Event.findById(eventID).populate('team').populate('user')

    if(!event){
        const error = new Error('Event ID failed')
        error.status = 400
        return next(error)
    }

    const isInTeam = Boolean(event.team.find(member=> member._id.toString() === userID.toString()))

    console.log(event.team);
    
    if(!isInTeam){
        console.log('Danke für die Teilnahme');
        event.team.push(user)
        user.eventslist.push(eventID)
        event.exist = false
    } else if(isInTeam) {
        console.log('you are already in team!!');

        event.exist = true
    }

    await user.save()
    await event.save()

    res.status(200).send(event)
}

exports.deleteEvent = async (req,res,next)=>{

    const event = await Event.findById(req.body.id)

    const user = await User.findById(req.user._id)


    if(!user){
        const error = new Error('Authorization failed bro!')
        error.status = 401
        return next(error)
    }

    console.log(event);
    console.log(user);

    user.events.filter(e => e !== event._id)

    await event.remove()
    await user.save()

    res.status(200).send(user)
}