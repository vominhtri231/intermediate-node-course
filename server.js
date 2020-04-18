const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`)
})

const User = require('./models/User');
mongoose.connect('mongodb://localhost/intermediateNode');

// CREATE
app.post('/users', (req, res) => {
  const createdUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  User.create(createdUser, (err, data) => {
    if (err) {
      res.json({ success: false, message: err });
      return;
    }
    if (!data) {
      res.json({ success: false, message: "Not found" });
      return;
    }
    res.json({ success: true, data: data });
  });
});

app.route('/users/:id')
  // READ
  .get((req, res) => {
    User.findById(req.params.id, (err, data) => {
      if (err) {
        res.json({
          success: false,
          message: err
        });
        return;
      }
      if (!data) {
        res.json({
          success: false,
          message: "Not found"
        });
        return;
      }
      res.json({
        success: true,
        data: data
      });
    });
  })
  // UPDATE
  .put((req, res) => {
    // User.findByIdAndUpdate()
  })
  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
  })