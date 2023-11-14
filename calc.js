const math = require('mathjs');
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');


function evaluateExpression(expression) {
    try {
        // Use math.evaluate to parse and evaluate the expression
        const result = math.evaluate(expression);
        return result;
    } catch (error) {
        // Handle any parsing or evaluation errors
        console.error('Error:', error.message);
        return null;
    }
}


const app = express();
app.use(express.json());

app.get("/calc",(request,response)=>{
    var connection = mysql.createConnection({
        host:'localhost',
        database:'dmc',
        user:'W3_80778_Tushar',
        password:'tushar'
    })

    var statement = "select * from calculator_history";
    connection.query(statement,(error,result)=>{
        if(error == null){
            response.setHeader("Content-Type","application/json");
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }
        else{
            response.setHeader("Content-Type","application/json");
            response.write(JSON.stringify(error));
            connection.end();
            response.end();
        }
    })

});

app.post("/calc",(request,response)=>{
    var connection = mysql.createConnection({
        host:'localhost',
        database:'dmc',
        user:'W3_80778_Tushar',
        password:'tushar'
    })
    //var id = request.body.id;
    var expression = request.body.expression;
    // var result = request.body.reslut;
    const result = evaluateExpression(expression);
    var timestamp = new Date();


    var statement = 'INSERT INTO calculator_history (expression, result, timestamp) VALUES (?, ?, ?)';
    connection.query(statement, [expression, result, timestamp],(error,result1)=>{
        if(error == null){
            response.setHeader("Content-Type","application/json");
            response.write(JSON.stringify(result1));
            connection.end();
            response.end();
        }
        else{
            response.setHeader("Content-Type","application/json");
            response.write(JSON.stringify(error));
            connection.end();
            response.end();
        }
    })
});

app.listen(9999,()=>{console.log("server chalu aaahe 9999 la!!!")})
