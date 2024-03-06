// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
// use("test");

// Create a new document in the collection.
db.getCollection("users").insertOne({});

//1 Listado de todos los usuarios con solo los nombres, apellidos y edad, que tengan 20 años de edad
db.users.find({ edad: 20 }, { nombres: 1, apellidos: 1, edad: 1 });

//2 istado de todas las mujeres en la base de datos que tengan entre 20 y 30 años de edad
db.users.find(
  { genero: "M", edad: { $gte: 20, $lte: 30 } },
  { nombres: 1, apellidos: 1, edad: 1, genero: 1 }
);

//3 Quién es la persona con menos edad de la base de datos
db.users.find({ edad: 1 }, { nombres: 1, apellidos: 1, edad: 1 });

//4 Cuantos usuarios hay registrados en la base de datos
db.users.count();

//5 Traer los 5 primeros usuarios de la base de datos
db.users.find({}, { id: 1, nombres: 1 }).sort({ id: 1 }).limit(5);

//6 Traer los 10 últimos usuarios de la base de datos
db.users.find({}, { id: 1, nombres: 1 }).sort({ id: -1 }).limit(10);

//7 Listar usuarios que su correo finalice en .net
db.users.find({ correo: /.net$/ }, { nombres: 1, apellidos: 1, correo: 1 });

//8 Listar usuarios no vivan en  colombia
db.users.find(
  { pais: { $ne: "colombia" } },
  { nombre: 1, apellido: 1, pais: 1 }
);

//9 Listar usuarios que no vivan en ecuador y panamá
db.users.find(
  { pais: { $nin: ["colombia", "panama"] } },
  { nombres: 1, apellidos: 1, pais: 1 }
);

//10 Cuantos(numero) usuarios son de colombia y les gusta el rock
db.users.count({ pais: "colombia", musica: "rock" });

//11 Actualizar el género musical de todos los usuarios de la base de datos de "metal" a "carranga".
db.users.updateMany({ musica: "metal" }, { $set: { musica: "carranga" } });

//12 Listado de hombres que les guste la "carranga" sean de colombia y tengan entre 10 y 20 años de edad.
db.users.find(
  {
    genero: "H",
    musica: "carranga",
    pais: "colombia",
    edad: { $gte: 10, $lte: 20 },
  },
  { nombres: 1, apellidos: 1, genero: 1, musica: 1, pais: 1, edad: 1 }
);

//13 Actualizar a todos los usuarios que tengan 99 años, su nuevo género musical favorito será la "carranga"
db.users.updateMany({ edad: 99 }, { $set: { musica: "carranga" } });

//14 Listar todos los usuarios que su nombre inicie con "a","A"
db.users.find({ nombres: /^a|^A/ }, { nombres: 1 });

//15 Listar todos los usuarios que su apellido finalice en "z","Z"
db.users.find({ apellidos: /z$/i }, { apellidos: 1 });

//16 Actualizar los usuarios que tengan 50 años de edad su nuevo género musical será NULL
db.users.updateMany({ edad: 50 }, { $set: { musica: null } });

//17 Listar todos los usuarios que su género musical sea igual a NULL
db.users.find({ musica: null }, { nombres: 1, apellidos: 1, musica: 1 });

//18 Cual es el resultado de la suma de todas las edades de la base de datos.
db.users.aggregate([{ $group: { _id: null, total: { $sum: "$edad" } } }]);

//19 Cuantos usuarios tenemos registrados de "ecuador"
db.users.count({ pais: "ecuador" });

//20 Cuántos usuarios son de Colombia y les gusta el vallenato
db.users.count({ pais: "colombia", musica: "vallenato" });
