const express = require('express')
const mysql = require('mysql')

const app = express()
app.use(express.json())

//Connect Database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_node_crud',
    post: '3306'
})

//ตรวจสอบการเชื่อมต่อ Database
connection.connect((err) => {
    if (err) {
        console.log('Error', err)
    } else {
        console.log('Mysql successfully connected...')
    }
})


//Create Data
app.post('/create', async (req, res) => {
    const {name, phone} = req.body
    try {
        connection.query('INSERT INTO users(name, phone) VALUES(?,?)', [name, phone], (err, results, fields) => {
            if (err) {
                console.log('Error', err)
                return res.status(400).send()
            } else {
                return res.status(201).json({message: 'New user data'}).send(results)
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})


//Read data
app.get('/read', async (req, res) => {
    try {
        connection.query('SELECT * FROM users', (err, results, fields) => {
            if (err) {
                console.log(err)
                return res.status(400).send()
            } else {
                res.status(200).json(results)
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})


//Read data Id
app.get('/read/:id', async (req, res) => {
    const id = req.params.id
    try {
        connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results, fields) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send()
                } else {
                    return res.status(200).json(results)
                }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})


//Update data
app.put('/update/:id', async (req, res) => {
    const id = req.params.id
    const newPhone = req.body.newPhone
    try {
        connection.query('UPDATE users SET phone = ? WHERE id = ?', [newPhone, id], (err, results, fields) => {
            if (err) {
                console.log(err)
                return res.status(400).send()
            } else {
                return res.status(200).json({ message: "Update data successfully"})
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})


//Delete data
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        connection.query('DELETE FROM users WHERE id = ?', [id], (err, results, fields) => {
            if (err) {
                console.log(err)
                return res.status(400).send()
            } else {
                return res.status(200).json({message: "Delete data successfully"})
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})



app.listen(3000, () => {
    console.log('Server connected...')
})