// importar un par de métodos del paquete mongodb para conectarnos a la base de datos
const { MongoClient, ServerApiVersion } = require("mongodb");

// Connection string: el string donde especificámos usuario:contraseña y URL de conexión 
const url = "mongodb+srv://dani:dani@cluster0.hyxsuo4.mongodb.net/";

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
async function run(){
    try {

        await client.connect();

        const database = client.db("companiesDB");
        const companies = database.collection("companies");

        const query = { number_of_employees: { $gte: 5000 } }; // objeto para filtrar las empresas por aquellas con más de 500 empleados

        const options = { 
            projection: { _id: 0, name: 1 }, // objeto para seleccionar solo el campo name
            limit: 20
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








// 3. All the companies founded between 2000 and 2005, both years included. Retrieve only the name and founded_year fields.

async function run() {
    try {
        await client.connect();

        const database = client.db("companiesDB");
        const companies = database.collection("companies");
        const query = {$and: [{founded_year: {$gte: 2000}}, {founded_year:{$lte: 2005}}]}
        const options = {
            projection: { _id: 0, name: 1, founded_year: 1}
        }

        const cursor = companies.find(query, options);
        if ((await companies.countDocuments(query)) === 0){
            console.log("No documents found!");
        }

        for await (const doc of cursor){
            console.dir(doc);
        }
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);

// 4. All the companies that had a IPO Valuation Amount of more than 100,000,000 and have been founded before 2010. Retrieve only the name and ipo fields.



// 5. All the companies that don't include the partners field.

async function run(params) {
    try {
        await client.connect();

        const database = client.db("companiesDB");
        const companies = database.collection("companies");
        const query = {partners: {$exists: false}};
        const cursor = companies.find(query);

        if ((await companies.countDocuments(query)) === 0) {
            console.log("No documents found!");
        };

        for await (const doc of cursor) {
            console.dir(doc);
        };
    }
    finally{
        await client.close();
    }
}
run().catch(console.dir);

// 6. All the companies that have a null type of value on the category_code field.

async function run() {
    try {
        await client.connect();

        const database = client.db("companiesDB");
        const companies = database.collection("companies");
        const query = {category_code: {$type: null}};
        const cursor = companies.find(query);

        if ((await companies.countDocuments(query)) === 0) {
            console.log("No documents found!");
        };

        for await (const doc of cursor) {
            console.dir(doc);
        };
    }
    finally{
        await client.close();
    }
}
run().catch(console.dir);

// 7. Order all the companies by their IPO price in descending order.




// 8. Retrieve the 10 companies with the most employees, order by the number of employees.



// 9. All the companies founded in the second semester of the year (July to December). Limit your search to 1000 companies.



// 10. All the companies that have been founded on the first seven days of the month, including the seventh. Sort them by their acquisition price in descending order. Limit the search to 10 documents.
