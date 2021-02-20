console.log('Hello World');

//import models into our code
const express = require('express');

//Cross Origin Resource Sharing, Bypass browser protection
const cors = require('cors');

//take input from the user
const bodyParser = require('body-parser');

//gives us everything we need to set up our server
const server = express();

//bypass browser protection
server.use(cors());

//take body the user sent over and store it in req.body
server.use(bodyParser.json());

//creating a GET request handler
//req: request
//res: response
server.get('/abc', (req, res) => {
    res.send('Hello, world!');
});

server.post('/abc', (req, res) => {
    res.send('post request');
});

//Requirement for pizza app:
// Get, Post, PUt, Patch, Delete
//- retreive all outstanding orders
//    GET /orders
//- create new order
//  POST /orders
// - delete orders
//  DELETE /orders/<order id>
// update an order 
//  PATCH /orders/<order id>

const orders = [
    {
        id: 0,
        customerName: 'aditya',
        cheese: 'mozarella',
        sauce: 'tomato',
        toppiings: ['basil'],
    },
];
let currentId = 1;

server.get('/orders', (req, res) => {
    res.send(orders);
});

//'/orders is the endpoint
server.post('/orders', (req, res) => {
    //give everything that is passed into the request body
    const order = req.body;
    order.id = currentId;
    currentId++;
    orders.push(order);
    res.send({ success: true });
});

server.delete('/orders/:orderId', (req, res) => {
    const orderId = parseInt(req.params.orderId); // '0' or 1 or 2 etc

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === orderId) {
            orders.splice(i, 1);
            res.send({ success: true });
        }
    }
});

server.patch('/orders/:orderId', (req, res) => {
    const orderId = parseInt(req.params.orderId); // '0' or 1 or 2 etc

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === orderId) {
            Object.assign(order[i], req.body);
            res.send({ success: true });
        }
    }
});

//start up the server at core 3000
server.listen(3000, () => {
    console.log('Server has started');
});