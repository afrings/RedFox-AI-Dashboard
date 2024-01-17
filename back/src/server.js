import express, { application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DynamoDBClient, GetItemCommand, PutItemCommand, CreateTableCommand, DeleteTableCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import session from 'express-session';
import bodyParser from 'body-parser';

dotenv.config({ path: '.env' });

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "skdf;NL:*ILLK!kl123j1lk3nml'.?ds;ksdf",
    resave: true,
    saveUninitialized: true,
}));

const ddbClient = new DynamoDBClient
({
    credentials: { accessKeyId: process.env.DB_KEY ?? "", secretAccessKey:process.env.DB_SECRET_KEY ?? ""},
    region: process.env.DB_REGION,
    apiVersion: 'latest'
});

const port = process.env.PORT || 5005;

app.get("/healthCheck", (req, res) => {
    res.status(200).send("Application Status: Healthy");
});

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
                id: { S: req.params.itemName },
                // attributes: { S: req.params.itemName },
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

app.get("/getComplianceCompletionData", async(req, res) => {
    try {
        const command = new GetItemCommand({
            TableName: process.env.DB_NAME,
            Key: {
                id: { S: "Gentueri" },
                customer: { S: "Gentueri" },
            },
        });

        const response = await ddbClient.send(command);
        if(! response.Item) return;
        var data = unmarshall(response.Item).data;
        let responseData = [0,0,0];
        for (let i = 0; i < data.length; i++) {
            responseData[0] += data[i].complianceData.testComplete;
            responseData[1] += data[i].complianceData.testFailure;
            responseData[2] += data[i].complianceData.testBounce;
        }
        res.status(200).send(responseData);
    } catch (err) {
        console.log(err);
    }
});

app.get("/getComplianceScanTimeData", async(req, res) => {
    try {
        const command = new GetItemCommand({
            TableName: process.env.DB_NAME,
            Key: {
                id: { S: "Gentueri" },
                customer: { S: "Gentueri" },
            },
        });

        const response = await ddbClient.send(command);
        if(! response.Item) return;
        // console.log(response)
        let data = unmarshall(response.Item).data;
        let responseData = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].complianceData.barcodeScanTime.times.length; j++) {
                responseData.push(data[i].complianceData.barcodeScanTime.times[j]);
            }
        }
        console.log(responseData)
        res.status(200).send(responseData);
    } catch (err) {
        console.log(err);
    }
});

const PORT = port || 5005;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});