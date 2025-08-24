const {validationResult} = require('express-validator');
const Estudiantes = require('../models/estudianteModel')

const index = async (req, res) => {
    try{
        const [list, tipos] = await Promise.all([Estudiantes.getAll(), Estudiantes.getTiposSangre()]);
        res.render('estudiantes/index', {
            title: 'Estudiantes',
            estudiantes: list,
            tiposSangre: tipos,
            errors: [],
            old: {}
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar estudiantes');
    }
};

const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const [list, tipos] = await Promise.all([Estudiantes.getAll(), Estudiantes.getTiposSangre()]);
        return res.status(422).render('estudiantes/index', {
            title: 'Estudiantes',
            estudiantes: list,
            tiposSangre: tipos,
            errors: errors.array(),
            old: req.body
        });
    }
    try{
        await Estudiantes.create(req.body);
        res.redirect('/estudiantes');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al crear estudiante');
    }
};

const update = async (req, res) => {
    const errors = validationResult(req);
    const id = req.params.id;
    if(!errors.isEmpty()) {
        const [list, tipos] = await Promise.all([Estudiantes.getAll(), Estudiantes.getTiposSangre()]);
        return res.status(422).render('estudiantes/index', {
            title: 'Estudiantes',
            estudiantes: list,
            tiposSangre: tipos,
            error: errors.array(),
            old: {...req.body, id_estudiante: id}
        });
    }
    try{
        await Estudiantes.update(id, req.body);
        res.redirect('/estudiantes');
    } catch(err) {
        console.error(err);
        res.status(500).send('Error al actualizar estudiante');
    }
};

const destroy = async (req, res) => {
    try {
        await Estudiantes.remove(req.params.id);
        res.redirect('/estudiantes');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar estudiante');
    }
};

module.exports = {
    index,
    store,
    update,
    destroy
}