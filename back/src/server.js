const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4000',
    credentials: true,
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2'})
const client = new AWS.DynamoDB.DocumentClient();
const tableName = 'DashboardData';

const port = 3000;

app.get("/", (req, res) => {
    var params = {
        TableName: tableName
    };
    
    client.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var items = [];
            for (var i in data.Items)
                items.push(data.Items[i]);
            res.contentType = 'application/json'
            res.send(items);
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});