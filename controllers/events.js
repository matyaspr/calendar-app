const { response } = require("express")
const Evento = require('../models/Evento');




const crearEvento = async( req, res = response) => {

    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        
        const eventoGuardado = await evento.save();



        res.status(200).json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'comunicarse con el admin'
        })
    }
}



const getEventos = async( req, res = response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name email)');

    res.status(200).json({
        ok: true,
        eventos: eventos 
    })
}



const actualizarEvento = async( req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Evento.findById(eventId);

        if (!event) {
            res.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            })
        }
        if ( event.user.toString() !== uid ) {
            res.status(401).json({
                ok: false,
                msg: 'No tienes permisos para actualizar este evento'
            })
        }
        
        const updateEvent = {
            ...req.body,
            user: uid
        };
        
        const eventoUpdated = await Evento.findByIdAndUpdate(eventId, updateEvent, { new: true });
        
        res.status(200).json({
            ok: true,
            evento: eventoUpdated
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el evento' 
        })
    }

    
}



const eliminarEvento = async( req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Evento.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            })
        }
        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permisos para eliminar este evento'
            })
        }
        
        
        const eventDeleted = await Evento.findByIdAndDelete(eventId);
        
        res.status(200).json({
            ok: true,
            evento: eventDeleted
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el evento' 
        })
    }
}



module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}







