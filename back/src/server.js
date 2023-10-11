import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DynamoDBClient, GetItemCommand, PutItemCommand, CreateTableCommand, DeleteTableCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

dotenv.config({ path: '.env' });
const app = express();
const corsOptions = {
    origin: 'http://localhost:4000',
    credentials: true,
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));

const ddbClient = new DynamoDBClient
({
    credentials: { accessKeyId: process.env.DB_KEY ?? "", secretAccessKey:process.env.DB_SECRET_KEY ?? ""},
    region: process.env.DB_REGION,
    apiVersion: 'latest'
});

const port = 3000;

app.get("/createTable", async(req, res) => {
    try {
        const command = new CreateTableCommand({
            TableName: process.env.DB_NAME,
            AttributeDefinitions: [
                {
                    AttributeName: "DrinkName",
                    AttributeType: "S",
                },
            ],
            KeySchema: [
                {
                    AttributeName: "DrinkName",
                    KeyType: "HASH",
                },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
        });

        const response = await ddbClient.send(command);
        res.status(200).send(response);
    } catch(err) {
        console.log(err);
    }
});

app.get("/putItem", async(req, res) => {
    try {
        const command = new PutItemCommand({
            TableName: process.env.DB_NAME,
            Item: {
                DrinkName: { S: "Mocha"},
                Variants: { SS: ["White Chocolate", "Dark Chocolate", "Milk Chocolate"] },
            },
        });

        const response = await ddbClient.send(command);
        res.status(200).send(response);
    } catch(err) {
        console.log(err);
    }
});

app.get("/getItem/:itemName", async(req, res) => {
    try {
        const command = new GetItemCommand({
            TableName: process.env.DB_NAME,
            Key: {
                DrinkName: { S: req.params.itemName },
            },
        });

        const response = await ddbClient.send(command);
        if(! response.Item) return;
        console.log(response)
        res.status(200).send(unmarshall(response.Item));
    } catch (err) {
        console.log(err);
    }
});

app.get("/test", (req, res) => {
    return res.status(200).send('hello')
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});