SHOW DATABASES;

CREATE TABLE productos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20),
    tipo VARCHAR(20),
    precio_unidad INT(6),
    cantidad INT(4)
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    telefono INT(12)
);

CREATE TABLE pedidos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    telefono_cliente_id INT,
    nombre_producto_id INT,
    tipo_producto_id INT,
    precio_unidad_id INT,
    cantidad INT(4),
    total_pedido INT,
    fecha_pedido DATE,
    estado_pedido VARCHAR(20)
);

INSERT INTO productos (nombre, tipo, precio_unidad, cantidad) VALUES
("Arroz", "Granos", 2000, 100),
("Huevos", "Despensa", 300, 2000),
("Leche", "Lacteos", 3800, 150),
("Atun", "Enlatados", 4000, 120),
("Pierna de cerdo", "Carnicos", 8500, 50),
("Aceite", "Despensa", 8000, 90),
("Queso", "Lacteos", 7800, 30),
("Frijoles", "Granos", 4500, 95);

INSERT INTO clientes (nombre, telefono)VALUES
("Andres Gomez", 31254786),
("Felipe Piedrahita", 31156478),
("Pepito Perez", 31062543),
("Julian Ramirez", 31365478),
("Alexander", 31024583);

ALTER TABLE pedidos
ADD FOREIGN KEY (cliente_id) REFERENCES clientes (id);
ALTER TABLE pedidos
ADD FOREIGN KEY (telefono_cliente_id) REFERENCES clientes (id);
ALTER TABLE pedidos
ADD FOREIGN KEY (nombre_producto_id) REFERENCES productos (id);
ALTER TABLE pedidos
ADD FOREIGN KEY (tipo_producto_id) REFERENCES productos (id);
ALTER TABLE pedidos
ADD FOREIGN KEY (precio_unidad_id) REFERENCES productos (id);



--consultas
SELECT * FROM productos;

SELECT * FROM clientes;

SELECT * FROM pedidos;

--consulta de pedidos
SELECT 
    clientes.nombre AS nombre_cliente,
    productos.nombre AS nombre_producto,
    productos.precio_unidad AS precio_unitario,
    pedidos.cantidad AS cantidad_pedido,
    pedidos.fecha_pedido AS fecha_pedido,
    (pedidos.cantidad * productos.precio_unidad) AS total_pedido,
    pedidos.estado_pedido AS estado_pedido
FROM 
    pedidos
JOIN 
    clientes ON pedidos.cliente_id = clientes.id
JOIN 
    productos ON pedidos.nombre_producto_id = productos.id;
