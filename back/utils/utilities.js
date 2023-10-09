import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, GetCommand, PutCommand, } from '@aws-sdk/lib-dynamodb';
// import { DefaultProvider } from '@aws-sdk/credential-provider-node'
import dotenv from 'dotenv';
import aws from '@aws-sdk/client-ses';
dotenv.config({ path: '.env' });
const ddbClient = new DynamoDBClient
({
    //@ts-ignore
    credentials: { accessKeyId: process.env.DB_KEY ?? "", secretAccessKey: process.env.DB_SECRET_KEY ?? ""},
    region: process.env.DB_REGION,
    apiVersion: 'latest'
});

const DBController = {
    get: async id => {
      try {
        const params = {
          TableName: process.env.DB_NAME,
          Key: {
            Items: {
                S: "testData",
            },
          },
        }
        const result = await ddbClient.send(new GetCommand(params))
        if (!result.Item) {
          return;
        }
        console.log(result);
        return result.Item.attributes
      } catch (err) {
        console.log(err)
      }
    },
  
    put: async (id, attributes) => {
      try {
        const params = {
          TableName: process.env.DB_NAME,
          Item: {
            id: id,
            attributes: attributes
          }
        }
  
        await ddbClient.send(new PutCommand(params))
      } catch (err) {
        console.log(err)
      }
    },
  
    delete: async id => {
      try {
        const params = {
          TableName: process.env.DB_NAME,
          Key: {
            id: id
          }
        }
  
        await ddbClient.send(new DeleteCommand(params))
      } catch (err) {
        if (err) throw err
      }
    },

    create: async () => {
        try {
            const params = {

            };
        } catch (err) {
            console.log(err);
        }
    },
  }
  

export {
    DBController,
}