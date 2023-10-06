import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
// import { DefaultProvider } from '@aws-sdk/credential-provider-node'
import dotenv from 'dotenv';
const aws = require('@aws-sdk/client-ses');
dotenv.config({ path: '.env' });
const ddbClient = new DynamoDBClient
({
    //@ts-ignore
    credentials: { accessKeyId: process.env.DB_KEY ?? "", secretAccessKey: process.env.DB_SECRET_KEY ?? ""},
    region: process.env.DB_REGION,
    apiVersion: 'latest'
});

const DBController = 
{
    get: async(id: string) =>
    {
        try
        {
            const params: {TableName: any, Key: {[key: string]: any}, removeUndefinedValues: boolean} = 
            {
                TableName: process.env.DB_NAME,
                Key:
                {
                    id: id
                },
                removeUndefinedValues: true
            };
            const result = await ddbClient.send(new GetCommand(params));
            if(!result.Item)
            {
                return;
            };
            //console.log(result);
            return result.Item.attributes
        }catch(err)
        {
            console.log(err);
        }
    },

    put: async(id: string, attributes: {[key: string]: any}) =>
    {
        try
        {
            const params: {TableName: any, Item: {[key: string]: any}} =
            {
                TableName: process.env.DB_NAME,
                Item:
                {
                    id: id,
                    attributes: attributes
                }
            };

            await ddbClient.send(new PutCommand(params));
        }catch(err)
        {
            console.log(err);
        }
    },

    delete: async(id: string) =>
    {
        try
        {
            const params: any =
            {
                TableName: process.env.DB_NAME,
                Key:
                {
                    id: id
                }
            };

            await ddbClient.send(new DeleteCommand(params));
        }catch(err)
        {
            if(err) throw err;
        }
    }
};

export {
    DBController,
}