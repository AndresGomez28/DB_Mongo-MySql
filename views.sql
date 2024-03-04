--1
CREATE VIEW usuarios_mayores_de_edad AS
SELECT * FROM users WHERE edad >18;

--2
CREATE VIEW nacionalidad AS
SELECT * FROM users WHERE pais = 'colombia';

--3
CREATE VIEW usuarios_mujeres AS
SELECT * FROM users WHERE genero = 'M';

--4
CREATE VIEW usuarios_musica_rock AS
SELECT * FROM users WHERE musica = 'rock';

--5
CREATE VIEW orden_usuarios_por_creacion AS
SELECT * FROM users ORDER BY created_at DESC;




--1
DELIMITER $$
CREATE PROCEDURE insertar_usuario(
    IN nombre VARCHAR(255),
    IN apellido VARCHAR(255),
    IN correo VARCHAR(255),
    IN edad INT,
    IN genero VARCHAR(255),
    IN pais VARCHAR(255),
    IN musica VARCHAR(255)
)
BEGIN
    INSERT INTO users (nombres, apellidos, correo, edad, genero, pais, musica, created_at)
    VALUES (nombre, apellido, correo, edad, genero, pais, musica, NOW());
END$$
DELIMITER ;


--2
DELIMITER $$
CREATE PROCEDURE actualizar_usuario(
    IN user_id BIGINT,
    IN nombre VARCHAR(255),
    IN apellido VARCHAR(255),
    IN correo VARCHAR(255),
    IN edad INT,
    IN genero VARCHAR(255),
    IN pais VARCHAR(255),
    IN musica VARCHAR(255)
)
BEGIN
    UPDATE users
    SET nombres = nombre,
        apellidos = apellido,
        correo = correo,
        edad = edad,
        genero = genero,
        pais = pais,
        musica = musica,
        updated_at = NOW()
    WHERE id = user_id;
END$$
DELIMITER ;


--3
DELIMITER $$
CREATE PROCEDURE eliminar_usuario(IN user_id BIGINT)
BEGIN
    DELETE FROM users WHERE id = user_id;
END$$
DELIMITER ;


--4
DELIMITER $$
CREATE PROCEDURE obtener_cantidad_usuarios(OUT total_usuarios INT)
BEGIN
    SELECT COUNT(*) INTO total_usuarios FROM users;
END$$
DELIMITER ;


--5
DELIMITER $$
CREATE PROCEDURE buscar_usuario_por_correo(IN correo_buscar VARCHAR(255))
BEGIN
    SELECT * FROM users WHERE correo = correo_buscar;
END$$
DELIMITER ;


