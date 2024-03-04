import express, { application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DynamoDBClient, GetItemCommand, PutItemCommand, CreateTableCommand, DeleteTableCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import session from 'express-session';
import bodyParser from 'body-parser';
import * as XLSX from 'xlsx';

dotenv.config({ path: '.env' });

const app = express();
app.use(cors());
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

app.get("/getCompletionComplianceData/:startDate/:endDate", async(req, res) => {
    let startDate = new Date(decodeURIComponent(req.params.startDate));
    let endDate = new Date(decodeURIComponent(req.params.endDate));

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
        let entryDate;
        for (let i = 0; i < data.length; i++) {
            entryDate = new Date(data[i].Date);
            if ( startDate.toString() === 'Invalid Date' || 
                endDate.toString() === 'Invalid Date' ||
                entryDate >= startDate && entryDate <= endDate
            ){
                responseData[0] += data[i].complianceData.testComplete;
                responseData[1] += data[i].complianceData.testFailure;
                responseData[2] += data[i].complianceData.testBounce;
            }
        }
        res.status(200).send(responseData);
    } catch (err) {
        console.log(err);
    }
});

app.get("/getScanTimeComplianceData/:startDate/:endDate", async(req, res) => {
    let startDate = new Date(decodeURIComponent(req.params.startDate));
    let endDate = new Date(decodeURIComponent(req.params.endDate));

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
        let data = unmarshall(response.Item).data;
        let responseData = [];
        let entryDate;
        for (let i = 0; i < data.length; i++) {
            entryDate = new Date(data[i].Date);
            if ( startDate.toString() === 'Invalid Date' || 
                endDate.toString() === 'Invalid Date' ||
                entryDate >= startDate && entryDate <= endDate
            ){
                responseData.push(data[i].complianceData.barcodeScanTime.averageTime/1000);
            }
        }
        res.status(200).send(responseData);
    } catch (err) {
        console.log(err);
    }
});

app.get("/getStepTimeData/:startDate/:endDate", async(req, res) => {
    let startDate = new Date(decodeURIComponent(req.params.startDate));
    let endDate = new Date(decodeURIComponent(req.params.endDate));

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
        let data = unmarshall(response.Item).data;
        let responseData = [];
        let entryDate;
        for (let i = 0; i < data.length; i++) {
            entryDate = new Date(data[i].Date);
            if ( startDate.toString() === 'Invalid Date' || 
                endDate.toString() === 'Invalid Date' ||
                entryDate >= startDate && entryDate <= endDate
            ){
                responseData.push(data[i].timeData.stepTime);
            }
        }
        res.status(200).send(responseData);
    } catch (err) {
        console.log(err);
    }
});

app.get("/getTestTimeData/:startDate/:endDate", async(req, res) => {
    let startDate = new Date(decodeURIComponent(req.params.startDate));
    let endDate = new Date(decodeURIComponent(req.params.endDate));

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
        let data = unmarshall(response.Item).data;
        let responseData = [];
        let entryDate;
        for (let i = 0; i < data.length; i++) {
            entryDate = new Date(data[i].Date);
            if ( startDate.toString() === 'Invalid Date' || 
                endDate.toString() === 'Invalid Date' || 
                entryDate >= startDate && entryDate <= endDate
            ){
                responseData.push(data[i].timeData.testTime.averageTime/1000);
            }
        }
        res.status(200).send(responseData);
    } catch (err) {
        console.log(err);
    }
});

app.get("/getFormTimeData/:startDate/:endDate", async(req, res) => {
    let startDate = new Date(decodeURIComponent(req.params.startDate));
    let endDate = new Date(decodeURIComponent(req.params.endDate));

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
        let data = unmarshall(response.Item).data;
        let responseData = [];
        let entryDate;
        for (let i = 0; i < data.length; i++) {
            entryDate = new Date(data[i].Date);
            if ( startDate.toString() === 'Invalid Date' || 
                endDate.toString() === 'Invalid Date' ||
                entryDate >= startDate && entryDate <= endDate
            ){
                responseData.push(data[i].timeData.formTime.averageTime/1000);
            }
        }
        res.status(200).send(responseData);
    } catch (err) {
        console.log(err);
    }
});

app.get("/getTroubleShootingRequestsData/:startDate/:endDate", async(req, res) => {
    let startDate = new Date(decodeURIComponent(req.params.startDate));
    let endDate = new Date(decodeURIComponent(req.params.endDate));

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
        let data = unmarshall(response.Item).data;
        let responseData = [0,0,0,0,0,0,0];
        let entryDate;
        for (let i = 0; i < data.length; i++) {
            entryDate = new Date(data[i].Date);
            if ( (startDate.toString() === 'Invalid Date' || 
                endDate.toString() === 'Invalid Date') ||
                entryDate >= startDate && entryDate <= endDate
             ){
                responseData[0] += data[i].customerSupportData.troubleShootingRequests[0];
                responseData[1] += data[i].customerSupportData.troubleShootingRequests[1];
                responseData[2] += data[i].customerSupportData.troubleShootingRequests[2];
                responseData[3] += data[i].customerSupportData.troubleShootingRequests[3];
                responseData[4] += data[i].customerSupportData.troubleShootingRequests[4];
                responseData[5] += data[i].customerSupportData.troubleShootingRequests[5];
                responseData[6] += data[i].customerSupportData.troubleShootingRequests[6];
            }
        }
        res.status(200).send(responseData);
    } catch (err) {
        console.log(err);
    }
});

app.get("/getPatientFeedbackData/:startDate/:endDate", async(req, res) => {
    let startDate = new Date(decodeURIComponent(req.params.startDate));
    let endDate = new Date(decodeURIComponent(req.params.endDate));

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
        let data = unmarshall(response.Item).data;
        let responseData = [];
        let entryDate;
        for (let i = 0; i < data.length; i++) {
            entryDate = new Date(data[i].Date);
            if ( (startDate.toString() === 'Invalid Date' || 
                endDate.toString() === 'Invalid Date') ||
                entryDate >= startDate && entryDate <= endDate
             ){
                responseData.push(data[i].customerSupportData.patientFeedback[0]);
            }
        }
        res.status(200).send(responseData);
    } catch (err) {
        console.log(err);
    }
});

app.get("/download", async(req, res) => {
    try {

        // request data from table
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
        console.log(data);

        // extract and format data from response
        const complianceData = [
            ['tests completed', 'tests bounced', 'tests incomplete'],
        ];

        const timeData = [
            ['test time', 'form time', 'barcode scan time'],
        ];

        const troubleShootingData = [
            ['Which end of the swab do I open?', 'How far do I peel open the wrapper?','How hard do I rub my cheek with the swab?', 'How do I switch to the other cheek to collect?', 'How do I package the swab after I finish collecting?', 'How do I open the GenDry foil pouch', 'How do I seal the return pouch?'],
        ];

        const patientFeedbackData = [

        ]

        for (let i = 0; i < data.length; i++) {
            complianceData.push([data[i].complianceData.testComplete, data[i].complianceData.testBounce, data[i].complianceData.testFailure]);
            timeData.push([data[i].timeData.testTime.averageTime, data[i].timeData.formTime.averageTime, data[i].complianceData.barcodeScanTime.averageTime]);
            troubleShootingData.push(data[i].customerSupportData.troubleShootingRequests);
            patientFeedbackData.push(data[i].customerSupportData.patientFeedback);
        }

        // convert to xlsx format
        const complianceWorksheet = XLSX.utils.aoa_to_sheet(complianceData)
        const timeWorksheet = XLSX.utils.aoa_to_sheet(timeData);
        const troubleShootingWorksheet = XLSX.utils.aoa_to_sheet(troubleShootingData);
        const patientFeedbackWorksheet = XLSX.utils.aoa_to_sheet(patientFeedbackData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, complianceWorksheet, 'compliance data');
        XLSX.utils.book_append_sheet(workbook, timeWorksheet, 'time data');
        XLSX.utils.book_append_sheet(workbook, troubleShootingWorksheet, 'trouble shooting data');
        XLSX.utils.book_append_sheet(workbook, patientFeedbackWorksheet, 'patient feedback');
        const buf = XLSX.write(workbook, {type:"buffer", bookType:"xlsx"});

        res.statusCode = 200;
        res.setHeader('Content-Disposition', 'attachment; filename="SheetJSNode.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.ms-excel');
        res.end(buf);
    } catch (err) {
        console.log(err);
    }
});

const PORT = port || 5005;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});