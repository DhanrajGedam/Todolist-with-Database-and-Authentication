const express = require("express")
const cors = require("cors")
const mysql = require("mysql")

const app = express();
app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "new_root",
    password: "root",
    database: "todolist"
})


//Logic for Login and Signup
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)"

    const values = [
        req.body.name,
        req.body.email,
        req.body.password, // Consider hashing the password before storing
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'An error occurred while signing up' });
        }
        console.log('User signed up successfully');
        return res.status(201).json({ message: 'User signed up successfully' });
    });
});
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM LOGIN WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'An error occurred while logging in' });
        }
        if (data.length > 0) {
            // Assuming the first row contains the user data
            const user = data[0];
            // Here you should implement your logic to handle a successful login
            // For example, you might want to send back a success message or a token
            console.log('Login successful');
            return res.status(200).json({ message: 'Login successful' });
        } else {
            // If no user is found, return an error
            console.log('Login failed: User not found');
            return res.status(401).json({ error: 'Login failed: User not found' });
        }
    });
});
app.post('/test', (req, res) => {
    res.status(200).json({ message: 'Test route' });
});



// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });






//Logic for TodoList
app.get("/", (req,res)=>{
    const sql = "SELECT * FROM task";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err, "Error");
        return res.json(data);
    })
})

  

app.post('/create', (req,res)=>{
    const sql = "INSERT INTO task (`Name`) VALUES (?)";
    const values = [
        req.body.name,   
    ]
    db.query(sql,values, (err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
    })
})  

app.put('/update/:id', (req,res)=>{
    const sql = "UPDATE task SET `Name` = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.params.id   
    ]
    db.query(sql,values, (err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.delete('/task/:id', (req, res) => {
    const sql = "DELETE FROM task WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        return res.json({ message: "Task deleted successfully" });
    });
});

// Get by ID

 app.listen(3001, ()=>{
    console.log("Listening to Port 3001, Happy Coding :)")
    console.log("Connected to Database")
 })
