import boto3

def create_books_table(dynamodb=None):
    dynamodb = boto3.resource('dynamodb')