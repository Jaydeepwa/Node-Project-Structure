import path from "path";
import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "Node-Project",
    },
    hosts: "http://localhost:9500/api/v1",
    servers: [
        {
            url: "http://localhost:9500/api/v1",
            description: "local-server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        "@schemas": {}
    },
    default: "http://localhost:9500/api/v1",
}

const outputFile = "./swagger-output.json";
const endpointsFiles = [
    path.join(__dirname, `routes/*.ts`),
    path.join(__dirname, `server.ts`),
    path.join(__dirname, `routes/index`),
];
swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);