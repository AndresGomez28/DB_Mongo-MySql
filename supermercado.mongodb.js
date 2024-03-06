/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'admin';
const collection = 'NEW_COLLECTION_NAME';

// The current database to use.
use(database);

// Create a new collection.
db.createCollection(collection);

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/


// Crear colección de productos
db.createCollection("productos");

// Insertar datos en la colección de productos
db.productos.insertMany([
    {
        id: 1,
        nombre: "Arroz",
        cantidad: 100,
        precio: 1200,
        tipo: "Granos"
    },
    {
        id: 2,
        nombre: "Leche",
        cantidad: 50,
        precio: 3800,
        tipo: "Lacteos"
    },
    {
        id: 3,
        nombre: "Papel Higienico",
        cantidad: 200,
        precio: 2500,
        tipo: "Aseo"
    },
    {
        id: 4,
        nombre: "Atun",
        cantidad: 80,
        precio: 4200,
        tipo: "Enlatados"
    },
    {
        id: 5,
        nombre: "Pierna de Cerdo",
        cantidad: 20,
        precio: 8500,
        tipo: "Carnicos"
    },
]);

// Crear colección de clientes
db.createCollection("clientes");

// Insertar datos en la colección de clientes
db.clientes.insertMany([
    {
        id: 1,
        nombre: "Juan Velez",
        telefono: "31066588749",
        direccion: "Calle 32 # 65-78"
    },
    {
        id: 2,
        nombre: "María Arenas",
        telefono: "3136587741",
        direccion: "Avenida 10 - 45-78"
    },
    {
        id: 3,
        nombre: "Andres Gomez",
        telefono: "3126547895",
        direccion: "Calle 1 # 12-13"
    },
    {
        id: 4,
        nombre: "Pepito Perez",
        telefono: "3116574892",
        direccion: "Avenida 98a # 23-55"
    }
]);

// Crear colección de pedidos
db.createCollection("pedidos");

// Insertar datos en la colección de pedidos
db.pedidos.insertMany([
{
    cliente_id: 1,
    producto_id: 1,
    cantidad: 5,
    precio_id: 1,
    fecha_pedido: ISODate("2024-03-05"),
    estado_pedido: "Entregado",
    total: Number,
},
{
    cliente_id: 2,
    producto_id: 2,
    cantidad: 3,
    precio_id: 2,
    fecha_pedido: ISODate("2024-03-06"),
    estado_pedido: "En ruta",
    total: Number,
},
]);

//consulta detallada de pedidos
db.pedidos.aggregate([
    {
        $lookup: {
            from: "productos",
            localField: "producto_id",
            foreignField: "id",
            as: "producto"
        }
    },
    {
        $unwind: "$producto"
    },
    {
        $lookup: {
            from: "clientes",
            localField: "cliente_id",
            foreignField: "id",
            as: "cliente"
        }
    },
    {
        $unwind: "$cliente"
    },
    {
        $project: {
            _id: 0,
            "Pedido ID": "$_id",
            "Fecha de Pedido": "$fecha_pedido",
            "Estado del Pedido": "$estado_pedido",
            "Cliente": "$cliente.nombre",
            "Teléfono del Cliente": "$cliente.telefono",
            "Dirección del Cliente": "$cliente.direccion",
            "Producto": "$producto.nombre",
            "Cantidad": "$cantidad",
            "Precio Unitario": "$producto.precio",
            "Total": { $multiply: ["$cantidad", "$producto.precio"] }
        }
    }
]);

