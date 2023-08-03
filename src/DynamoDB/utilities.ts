// import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
// import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
// import schedule from 'node-schedule';
// import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config({ path: '.env' });
// const ddbClient = new DynamoDBClient
// ({
//     //@ts-ignore
//     credentials: { accessKeyId: process.env.DB_KEY, secretAccessKey: process.env.DB_SECRET_KEY},
//     region: process.env.DB_REGION,
//     apiVersion: 'latest'
// });

// const DBController = 
// {
//     read: async(id: string) =>
//     {
//         try
//         {
//             const params: {TableName: any, Key: {[key: string]: any}, removeUndefinedValues: boolean} = 
//             {
//                 TableName: process.env.DB_NAME,
//                 Key:
//                 {
//                     id: id
//                 },
//                 removeUndefinedValues: true
//             };
//             const result = await ddbClient.send(new GetCommand(params));
//             if(!result.Item)
//             {
//                 return;
//             };
//             console.log(result);
//             return result.Item.attributes
//         }catch(err)
//         {
//             console.log(err);
//         }
//     },

//     write: async(id: string, attributes: {[key: string]: any}) =>
//     {
//         try
//         {
//             const params: {TableName: any, Item: {[key: string]: any}} =
//             {
//                 TableName: process.env.DB_NAME,
//                 Item:
//                 {
//                     id: id,
//                     attributes: attributes
//                 }
//             };

//             await ddbClient.send(new PutCommand(params));
//         }catch(err)
//         {
//             console.log(err);
//         }
//     }
// };

// const getPrediction = async(utterance: string) =>
// {
//     if(!utterance || utterance.trim() === ' ') return 'Help Intent';

//     const body = 
//     {
//         kind: "Conversation",
//         analysisInput: {
//             conversationItem: {
//             id: "1",
//             participantId: "1",
//             text: utterance
//             }
//         },
//         parameters: {
//             projectName: `${process.env.PROJECT_NAME}`,
//             deploymentName: `${process.env.DEPLOYMENT_NAME}`,
//             stringIndexType: "TextElement_V8"
//         }
//     };

//     try
//     {
//         let prediction = await axios.post(`${process.env.CLU_ENDPOINT}`, body, 
//         {
//             headers: {"Ocp-Apim-Subscription-Key": process.env.CLU_PREDICTION_KEY}
//         });

//         console.log('Returning prediction');
//         console.log(prediction.data);

//         return prediction.data;
//     }catch(err)
//     {
//         console.log(err);
//     }
// };

// const newSessionInterceptor = async(id: string) =>
// {
//     const sessionAttributes = await DBController.read(id) || {};
//     console.log(`Retrieving session attributes: ${JSON.stringify(sessionAttributes)}`);
//     if(Object.keys(sessionAttributes).length === 0)
//     {
//         sessionAttributes.lastSpeechText = "";
//         sessionAttributes.launchCount = 0;
//         sessionAttributes.errorCount = 0;
//         sessionAttributes.barcodeId = "";
//         sessionAttributes.used = false;
//         sessionAttributes.state = "NEW USER";
//         sessionAttributes.lastUsed = `${new Date()}`;
//         sessionAttributes.index = 0;
//         sessionAttributes.authenticated = false;

//         sessionAttributes.state = "";
//         sessionAttributes.prevState = "";
//         sessionAttributes.stepState = {};
//         sessionAttributes.takingTest = false;
//         sessionAttributes.takingPresale = false;
//         sessionAttributes.presaleIndex = 0;
//         sessionAttributes.instructionsIndex = 0;
//     }
//     else
//     {
//         sessionAttributes.launchCount = sessionAttributes.launchCount + 1;
//     };

//     DBController.write(id, sessionAttributes);
// }



// const handlerMapHelper = (obj: {[Symbol.iterator]: any}, result: string, message: string) =>
//     {
//         for(let [key, value] of obj)
//         {
//             if(key === result)
//             {
//                 return value(message);
//             }
//         }
//     };

// const SMS = (number: string, barcode: string) =>
// {
//     const accountSid = process.env.TWILIO_ACCOUNT_SID;
//     const authToken = process.env.TWILIO_AUTH_TOKEN;

//     const client = require('twilio')(accountSid, authToken);

//     client.messages.create({
//         to: `+1${number}`,
//         from: '+16089753565',
//         body: `Customer: ${barcode} has completed their test`
//     }).then((message: {[key: string]: string}) => console.log(message.status));
// };

// const scheduleNotifications = (waitTime: number, phoneNumber: string, barcode: string) =>
// {
//     let time: number = new Date().getMinutes();

//     if(time + waitTime >= 60)
//     {
//         let diff = 60 - time;
//         time = waitTime - diff;
//     };

//     time = time + waitTime;

//     let job: any = schedule.scheduleJob(`${time} * * * *`, () => 
//     {
//         console.log(`Sending SMS Notification`);
//         SMS(phoneNumber, barcode);
//         job.cancel();
//         job = null;
//     });
// };

// export {
//     DBController,
//     getPrediction,
//     newSessionInterceptor,
//     handlerMapHelper,
//     scheduleNotifications,
//     SMS
// }