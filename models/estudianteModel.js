import { pool } from "../models/db.js";

const getAll = async () => {
    const [rows] = await pool.query(`
        SELECT e.*, t.sangre
        FROM estudiantes e
        JOIN tipos_sangre t ON t.id_tipo_sangre = e.id_tipo_sangre
        ORDER BY e.id_estudiante DESC
        `);
    return rows;
};

const getTiposSangre = async () => {
    const [rows] = await pool.query('SELECT * FROM tipos_sangre ORDER BY sangre');
    return rows;
};

const create = async (data) => {
    const { carne, nombres, apellidos, direccion, telefono, correo_electronico, id_tipo_sangre, fecha_nacimiento } = data;
    const [res] = await pool.query(
        `INSERT INTO estudiantes (carne, nombres, apellidos, direccion, telefono, correo_electronico, id_tipo_sangre, fecha_nacimiento)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [carne, nombres, apellidos, direccion, telefono, correo_electronico, id_tipo_sangre, fecha_nacimiento || null]
    );
    return res.insertId;
};

const getById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM estudiantes WHERE id_estudiante = ?', [id]);
    return rows[0];
};

const update = async (id, data) => {
    const { carne, nombres, apellidos, direccion, telefono, correo_electronico, id_tipo_sangre, fecha_nacimiento } = data;
    const [res] = await pool.query(
        `UPDATE estudiantes SET carne=?, nombres=?, apellidos=?, direccion=?, telefono=?, correo_electronico=?, id_tipo_sangre=?, fecha_nacimiento=?
        WHERE id_estudiante=?`,
        [carne, nombres, apellidos, direccion, telefono, correo_electronico, id_tipo_sangre, fecha_nacimiento || null, id]
    );
    return res.affectedRows;
};

const remove = async (id) => {
    const [res] = await pool.query('DELETE FROM estudiantes WHERE id_estudiante = ?', [id]);
    return res.affectedRows;
};

module.exports = {
  getAll,
  getTiposSangre,
  create,
  getById,
  update,
  remove
};