const connection = require('../config/conn');
const bcrypt = require('bcrypt');
const registerUser =async(req, res) => {
const{name,email,password} = req.body;
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
connection.query(sql, [name, email, hashedPassword], (err, results) => {
if (err) {
console.error('Error registering user:', err);
return res.render('auth', { message: ['Error registering user. Please try again.'] });
}
 return res.render('auth', { message: ['Registration successful! Please log in.'] });
 
}
);
}
module.exports = { registerUser };