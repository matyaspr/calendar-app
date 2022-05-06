const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { actualizarEvento, eliminarEvento, crearEvento, getEventos } = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");



const router = Router();

// Aplica el middlewares en forma general a cada ruta
// router.use(validarJWT);


router.get(
    '/', 
    [
        validarJWT,
        check('email', 'El email es obligatorio').isEmail(),
    ],
    getEventos
)


router.post(
    '/', 
    [
        validarJWT,
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('start', 'La fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
)


router.put(
    '/:id', 
    [
        validarJWT,
        check('email', 'El email es obligatorio').isEmail(),
    ],
    actualizarEvento
)


router.delete(
    '/:id', 
    [
        validarJWT,
        check('email', 'El email es obligatorio').isEmail(),
    ],
    eliminarEvento
)




module.exports = router;