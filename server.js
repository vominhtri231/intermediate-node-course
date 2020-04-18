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
  User.create(createdUser, modelCallbackCreater(res));
});

app.route('/users/:id')
  // READ
  .get((req, res) => {
    const id = req.params.id;
    User.findById(id, modelCallbackCreater(res));
  })
  // UPDATE
  .put((req, res) => {
    const id = req.params.id;
    const updatedUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    User.findByIdAndUpdate(id, updatedUser, { new: true }, modelCallbackCreater(res));
  })
  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
  })

const modelCallbackCreater = res => (err, data) => {
  if (err) {
    res.json({ success: false, message: err });
    return;
  }
  if (!data) {
    res.json({ success: false, message: "Not found" });
    return;
  }
  res.json({
    success: true, data: data
  })
};
