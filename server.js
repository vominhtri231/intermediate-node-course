const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();

const User = require('./models/User');
mongoose.connect('mongodb://localhost/intermediateNode');

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`)
})

app.post('/users', (req, res) => {
  const createdUser = { ...req.body };
  User.create(createdUser, createModelCallback(res));
});

app.route('/users/:id')
  .get((req, res) => {
    const id = req.params.id;
    User.findById(id, createModelCallback(res));
  })
  .put((req, res) => {
    const id = req.params.id;
    const updatedUser = { ...req.body };
    User.findByIdAndUpdate(id, updatedUser, { new: true }, createModelCallback(res));
  })
  .delete((req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id, createModelCallback(res));
  })

const createModelCallback = res => (err, data) => {
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
