// importar un par de métodos del paquete mongodb para conectarnos a la base de datos
const { MongoClient, ServerApiVersion } = require("mongodb");

// Connection string: el string donde especificámos usuario:contraseña y URL de conexión 
const url = "mongodb+srv://oscar:oscar@cluster0.c8tq0vp.mongodb.net/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);
/**
 * Iteration 2
 */

// 1. All the companies whose name match 'Babelgum'. Retrieve only their name field.
async function run(){
    try {

        await client.connect(); // connect to the MongoDB cluster

        const database = client.db("companiesDB"); // selección de la bbdd
        const companies = database.collection("companies"); // método .collection 

        const query = { name: "Babelgum" }; // objeto para filtrar por las empresas

        const options = { 
            projection: { _id: 0, name: 1 } // objeto para seleccionar solo el campo name
        }; 

        // Ejecutar la consulta 
        const cursor = companies.find(query, options);
        // Print a message if no documents were found
        if ((await companies.countDocuments(query)) === 0) {
            console.log("No documents found!");
        }

        // Print returned documents
        // El for va a hacer iterar el cursor por todos los resultados de la query. Cuando consultamos una posición de este cursor lo que hacemos es materializar un documento en nuestra aplicación nodejs. 
        for await (const doc of cursor) {
            console.dir(doc);
        }
    }
    finally{
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir); // ejetuamos la función y como es una función asíncrona, concatenamos la palabra reserva "catch" para capturar cualquier tipo de excepción que suelte nuestro código


// 2. All the companies that have more than 5000 employees. Limit the search to 20 companies and sort them by number of employees.




// 3. All the companies founded between 2000 and 2005, both years included. Retrieve only the name and founded_year fields.



// 4. All the companies that had a IPO Valuation Amount of more than 100,000,000 and have been founded before 2010. Retrieve only the name and ipo fields.



// 5. All the companies that don't include the partners field.



// 6. All the companies that have a null type of value on the category_code field.



// 7. Order all the companies by their IPO price in descending order.




// 8. Retrieve the 10 companies with the most employees, order by the number of employees.



// 9. All the companies founded in the second semester of the year (July to December). Limit your search to 1000 companies.



// 10. All the companies that have been founded on the first seven days of the month, including the seventh. Sort them by their acquisition price in descending order. Limit the search to 10 documents.


// función asíncrona
// async function run() {
//     try {
//         // Connect the client to the server (optional starting in v4.7)
//         await client.connect();

//         // Una vez nos hemos conectado seleccionamos la base de datos 'companiesDB'
//         const database = client.db("companiesDB");

//         // El objeto database ahora guarda una referencia a la base de datos 'companies'. Podemos usar el método collection para seleccionar la colección 'movies'
//         const movies = database.collection("companies");

//         // He creado un objeto para poder filtrar por las películas cuyo año de lanzamiento fue superior a 1990
//         const query = { year: { $gte: 1990 } };

//         // Objeto de opciones
//         const options = {
//             // Quiero quedarme solamente con el campo title y year 
//             projection: { _id: 0, title: 1, year: 1 },
//             // Queremos ordenar por año de lanzamiento de forma decreciente
//             sort: { year: 1 },
//             // propiedad limit limita el número de documentos que queremos recuperar

//         };

//         // Ejecutar la consulta 
//         const cursor = movies.find(query, options);
//         // Print a message if no documents were found
//         if ((await movies.countDocuments(query)) === 0) {
//             console.log("No documents found!");
//         }

//         // Print returned documents
//         // El for va a hacer iterar el cursor por todos los resultados de la query. Cuando consultamos una posición de este cursor lo que hacemos es materializar un documento en nuestra aplicación nodejs. 
//         for await (const doc of cursor) {
//             console.dir(doc);
//         }

//     // finally es una palabra reservada que significa finalmente. Este bloque de código se ejecuta SIEMPRE , tanto si se ha producido un error como si todo ha ido bien.
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);
// ejetuamos la función y como es una función asíncrona, concatenamos la palabra reserva "catch" para capturar cualquier tipo de excepción que suelte nuestro código