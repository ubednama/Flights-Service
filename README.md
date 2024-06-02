# Flight Service

The Flight Service microservice is responsible for managing flight data within the Flight Management System. It provides endpoints for retrieving information about flights, airports, airplanes, etc.

### Technologies Used
- Node.js
- Express.js
- Sequelize (for SQL queries)
- MySQL (relational database)

## Micro-services
- [Flight API Gateway](https://github.com/ubednama/Flight-API-Gateway)
- [Flight Booking Service](https://github.com/ubednama/Flight-Booking-Service)
- [Flight-Notification-Service](https://github.com/ubednama/Flight-Notification-Service)
- [Flights-Service](https://github.com/ubednama/Flights-Service)

Postman Collection to check [APIs](https://www.postman.com/dark-eclipse-727260/workspace/flights-apis)
### System Design
[Link](https://lucid.app/lucidchart/a0ba6385-5ce1-4b63-8103-f3a4bc5d7b41/edit?viewport_loc=-470%2C-33%2C2681%2C1486%2C0_0&invitationId=inv_df908cd0-6537-438a-b54b-e9b1a9842b05)

### Installation

**Install dependencies:**

    ```sh
    npm install
    ```

Setup .env file and run the project with other microservices

## Database Setup
Run following commands to setup database
```sh
cd src
```
```sh
npx sequelize init
```
```sh
npx sequelize db:create
```
```sh
npx sequelize db:migrate
```
