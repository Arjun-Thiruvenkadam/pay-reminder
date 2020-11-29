# Pay Reminder API

## Description

  HyperVerge SDE hackathon 2020 solution.

## Problem statement

  Collections - Can the user enable auto-pay using UPI over whatsapp or using instructions over Whatsapp?

## Stack

- NodeJS
- Express
- MongoDB

## Environment Variables Used

- TWILIO_ACCOUNT_SID : Messaging service id
- TWILIO_AUTH_TOKEN : Messaging service token
- EMAIL : email username
- PASSWORD : email password

## Additional Information

The folder db_trigger is not part of the REST API. It's the code for database trigger working on atlas. Uploaded for review purposes.

## Deploy

The REST API is deployed at heroku. https://pay-reminder.herokuapp.com/

## Endpoints

- POST /mail
  - Body
    - email
    - message

- POST /message
  - Body
    - message
    - phone

## Installation

```bash
# Install
$ git clone https://github.com/Arjun-Thiruvenkadam/pay-reminder.git

$ cd <PROJECT_NAME>

$ npm install
```

## Running the app

```bash
# development
$ npm start
```
