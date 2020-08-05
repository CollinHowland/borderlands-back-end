import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import bodyParser from 'body-parser'
import { helloHandler } from "./handlers/helloHandler"
import neo4j from "neo4j-driver"
import { initializeDriver } from "./gateways/neo4jGateway"

// Config Environment
dotenv.config();

// App Variables

// Check PORT was loaded from environment config
if (!process.env.SERVER_PORT) {
    process.exit(1);
}

const SERVER_PORT: number = parseInt(process.env.SERVER_PORT as string);

const app = express();



//  App Configuration

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use("/api/hello", helloHandler);



// Server and Database Activation

initializeDriver((driverError: any) => {
    if (driverError) {
        throw driverError
        // TODO Exit program?
    }
    app.listen(SERVER_PORT, (serverError) => {
        if (serverError) {
            throw serverError
        }
        console.log(`Listening on port ${SERVER_PORT}`)
    })
})


// const server = app.listen(SERVER_PORT, () => {
//     console.log(`Listening on port ${SERVER_PORT}`);
// });




// var insertQuery = 
//   "UNWIND {pairs} as pair \
//    MERGE (p1:Person {name:pair[0]}) \
//    MERGE (p2:Person {name:pair[1]}) \
//    MERGE (p1)-[:KNOWS]-(p2)";

//    var foafQuery = 
//  "MATCH (person:Person)-[:KNOWS]-(friend)-[:KNOWS]-(foaf) \
//   WHERE person.name = {name} \
//    AND NOT (person)-[:KNOWS]-(foaf) \
//   RETURN foaf.name AS name";

// var commonFriendsQuery =
// "MATCH (user:Person)-[:KNOWS]-(friend)-[:KNOWS]-(foaf:Person) \
//  WHERE user.name = {name1} AND foaf.name = {name2} \
//  RETURN friend.name AS friend";

// var connectingPathsQuery =
// "MATCH path = shortestPath((p1:Person)-[:KNOWS*..6]-(p2:Person)) \
//  WHERE p1.name = {name1} AND p2.name = {name2} \
//  RETURN [n IN nodes(path) | n.name] as names";

// var data = [["Jim","Mike"],["Jim","Billy"],["Anna","Jim"],
//             ["Anna","Mike"],["Sally","Anna"],["Joe","Sally"],
//             ["Joe","Bob"],["Bob","Sally"]];

// function query(query: any, params: any, column: any, cb: any) {
//     function callback(err: any, results: any) {
//         if (err || !results) throw err;
//         if (!column) cb(results)
//         else results.forEach(function(row: any) { cb(row[column]) });
//     };
//     db.cypher({ query: query, params: params}, callback);
// }

// query(insertQuery, {pairs: data}, null, function () {
//     query(foafQuery, {name: "Joe"},"name", console.log); 
//     query(commonFriendsQuery, {name1: "Joe", name2:"Sally"},"friend",console.log);
//     query(connectingPathsQuery, {name1: "Joe", name2:"Billy"}, "names", 
//           function(res: any) { console.log(res)});
// });

// await driver.close()
