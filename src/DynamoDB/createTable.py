import boto3

def create_state_table(dynamodb=None):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.create_table(
        TableName='Books',
        KeySchema=[
            {
                'AttributeName': 'state_abbr',
                'KeyType': 'HASH'
            },
            {
                'AttributeName': 'state_id',
                'KeyType': 'RANGE'
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'state_abbr',
                'AttributeType': 'S'
            },
            {
                'AttributeName': 'state_id',
                'AttributeType': 'S'
            }
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 10,
            'WriteCapacityUnits': 10
        }
    )
    return table

if ___name___ == '__main__':
    state_table = create_state_table()
    print("Status:", state_table.table_status)