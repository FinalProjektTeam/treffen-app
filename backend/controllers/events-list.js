const Event = require("../models/Event")
const User = require("../models/User")
const Comment = require('../models/Comment')
require('express-async-errors')

exports.getEvents = async(req, res, next) =>{
    const events = await Event.find().populate('user', '-token -password -__v')
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
    event.user = user
    user.events.push(event._id)
    user.eventslist.push(event._id)

    console.log('REquest FILE:  ',req.file);
    event.bild = req.file?.path

    await event.save()
    await user.save()
    res.status(200).send(event)
}

exports.getSingleEvent = async(req, res, next)=>{
    const {id} = req.params
    const event = await Event.findById(id).populate('comments').populate('team', '-token -password -__v').populate('user', '-token -password -__v')

    if(!event){
        const error = new Error('Event are not available anymore!!')
        error.status = 400
        return next(error)
    }
 
    await Promise.all( event.comments.map((e)=>e.populate('user', '-token -password -__v')) )
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

    const event = await Event.findById(eventID).populate('team', '-token -password -__v').populate('user', '-token -password -__v')

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

        event.team = event.team.filter((member )=> member._id.toString() !== userID.toString())
        user.eventslist = user.eventslist.filter(joinedEvent => joinedEvent._id.toString() !== eventID.toString())
        event.exist = true

        
        console.log('Event not joined');
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

    console.log('User.Event',user.event);
    console.log('User.Eventslist',user.eventslist);

    user.events = user.events.filter(e => e !== event._id)
    user.eventslist = user.eventslist.filter(e => e !== event._id)


    await event.remove()
    await user.save()

    console.log('Deleted Event: ',event);
    console.log('Deleting Event in USER: ',user);

    res.status(200).send(user)
}

exports.updateEvent = async(req,res,next)=>{
    const {id} = req.params
    const {title, datum, category, description} = req.body

    const event = await Event.findById(id).populate('comments').populate('team', '-token -password -__v').populate('user', '-token -password -__v')

    event.title = title ? title : event.title
    event.datum = datum ? datum : event.datum
    event.category = category ? category : event.category
    event.description = description ? description : event.description

    if(req.file?.path ){

        event.bild = req.file?.path
    }

    await Promise.all( event.comments.map((e)=>e.populate('user', '-token -password -__v')) )

    await event.save()

    res.status(200).send(event)
}
