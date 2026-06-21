require("dotenv").config();
const {faker} = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
// fake data creation
let getUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Home route
app.get('/', (req, res) => {
    let q=`SELECT COUNT(*)  FROM users`;
    
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let count=result[0]['COUNT(*)'];
            res.render("home.ejs", { totalUsers: count });
        });
    } catch (error) {
        console.error('Error executing query:', error);
    }
    // res.send('Welcome to the Home Page!');
});
// Users route
app.get('/user', (req, res) => {
    let q=`SELECT * FROM users`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.render("showusers.ejs", { users: result });
        });
    } catch (error) {
        console.error('Error executing query:', error);
    }
    
});
// Edit user route
app.get('/user/:id/edit', (req, res) => {
    const userId = req.params.id;  
    const q = `SELECT * FROM users WHERE id = ?`;
    try {
        connection.query(q, [userId], (err, result) => {
            if (err) throw err;
            const user = result[0];
            if (!user) {
                return res.status(404).send('User not found.');
            }
            res.render('edit.ejs', { user });
        });
    } catch (error) {
        console.error('Error executing query:', error);
        res.send('An error occurred while fetching user data.');
    }
});

const handleEditUser = (req, res) => {
    const userId = req.params.id;
    const q = `SELECT * FROM users WHERE id = ?`;
    const { password: formpassword, username: newUsername } = req.body;
    try {
        connection.query(q, [userId], (err, result) => {
            if (err) throw err;
            const user = result[0];
            if (!user) {
                return res.status(404).send('User not found.');
            }

            if (user.password === formpassword) {
                const updateQuery = `UPDATE users SET username = ? WHERE id = ?`;
                connection.query(updateQuery, [newUsername, userId], (err, result) => {
                    if (err) throw err;
                    res.redirect('/user');
                });
            } else {
                res.send('Incorrect password.');
            }
        });
    } catch (error) {
        console.error('Error executing query:', error);
        res.send('An error occurred while fetching user data.');
    }
};

// Update user route
app.patch('/user/:id/edit', handleEditUser);
app.post('/user/:id/edit', handleEditUser);
// New user route
app.get('/user/new', (req, res) => {
    res.render('new.ejs');
});
// Create new user route
app.post('/user/new', (req, res) => {
    const { username, email, password } = req.body;
    const id = faker.string.uuid();

    const insertQ = `INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)`;
    try {
        connection.query(insertQ, [id, username, email, password], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                // handle duplicate username/email gracefully
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.send('Username or email already exists.');
                }
                return res.send('An error occurred while creating the user.');
            }
            res.redirect('/');
        });
    } catch (error) {
        console.error('Error executing query:', error);
        res.send('An error occurred while creating the user.');
    }
});
// Delete user route
app.get('/user/:id/delete', (req, res) => {
    const userId = req.params.id;
    const q = `SELECT * FROM users WHERE id = ?`;
    try {
        connection.query(q, [userId], (err, result) => {
            if (err) throw err;
            const user = result[0];
            res.render('delete.ejs', { user });
        });
    } catch (error) {
        console.error('Error executing query:', error);
        res.send('An error occurred while fetching user data.');
    }
});
// Handle user deletion
app.delete('/user/:id/delete', (req, res) => {
    const userId = req.params.id;
    const enteredPassword = req.body.password;
    const getUserQ = `SELECT * FROM users WHERE id = ?`;
    const deleteQ = `DELETE FROM users WHERE id = ?`;
    try {
        connection.query(getUserQ, [userId], (err, result) => {
            if (err) throw err;
            const user = result[0];
            if (!user) {
                return res.send('User not found.');
            }

            if (user.password === enteredPassword) {
    connection.query(deleteQ, [userId], (err, result) => {
        if (err) throw err;

        res.send(`
            <script>
                alert('User deleted successfully!');
                window.location.href='/user';
            </script>
        `);
    });
} else {
    res.send(`
        <script>
            alert('Incorrect password!');
            window.history.back();
        </script>
    `);
}
});
    } catch (error) {
        console.error('Error executing query:', error);
        res.send('An error occurred while fetching user data.');
    }
});