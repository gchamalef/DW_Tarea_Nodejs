# DW_Tarea_Nodejs

```sql

create database universidad;
use universidad;
CREATE TABLE IF NOT EXISTS tipos_sangre (
  id_tipo_sangre INT AUTO_INCREMENT PRIMARY KEY,
  sangre VARCHAR(3) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS estudiantes (
  id_estudiante INT AUTO_INCREMENT PRIMARY KEY,
  carne CHAR(4) NOT NULL UNIQUE,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  direccion VARCHAR(255),
  telefono VARCHAR(20),
  correo_electronico VARCHAR(120),
  id_tipo_sangre INT NOT NULL,
  fecha_nacimiento DATE,
  CONSTRAINT fk_tipo_sangre
    FOREIGN KEY (id_tipo_sangre) REFERENCES tipos_sangre(id_tipo_sangre)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

```
