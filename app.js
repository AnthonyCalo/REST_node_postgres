const express = require('express');

//lets me communicate with postgres Database
const pool = require("./db");
const app = express();

app.use(express.json());

//get all users

app.get('/users', async (req, res) =>{
    try {
        console.log("HERE");
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch(err){
        console.log(err);
    }
    
} )

//get specific users
app.get("/users/:id", async (req, res) =>{
    try{
        const userID = req.params.id;
        console.log(userID);
        const specUser = await pool.query("SELECT * FROM users WHERE user_id=($1)",[userID]);
        res.json(specUser.rows[0]);
        console.log(specUser.rows[0]);
    }catch(err){
        console.log(err);
    }
})

//update a user
app.put('/users/:id', async (req, res) => {
    try{
        const userID = req.params.id;
        const { firstName, lastName, email } = req.body;
        const updateUser = await pool.query("UPDATE users SET firstName=$1, lastName=$2, user_email=$3 WHERE user_id=$4",
            [firstName, lastName, email, userID]);
        console.log(updateUser);
        
        res.json(updateUser.rows[0]);
    }catch(err){
        console.log(err);
    }
})


//create a user
app.post('/users', async function(req, res){
    try{
        const { firstName, lastName, email } = req.body;
        console.log(firstName, lastName, email);
        const newUser = await pool.query('INSERT INTO users (firstName, lastName, user_email) VALUES ($1, $2, $3) RETURNING *', 
        [firstName, lastName, email]);
        res.json(newUser);
    }catch(err){
        console.log(err);
    }
})
//delete a user
app.delete('/users/:id', async function(req, res){
    try{
        const userID = req.params.id;
        const deleteUser= await pool.query("DELETE FROM users WHERE user_id=$1",[userID])
        res.send("User with userID: " + userID + " was deleted");
    }catch(err){
        console.log(err);
    }
})



app.listen(3000, function(){
    console.log("Listening on port 3000");
})


