// By creating a RESTful API we are able to create a back-end service for our front-end applications to consume.

// router handles request and interacts with the database


const express = require('express');
const ObjectID = require('mongodb').ObjectID;


const createRouter = function (collection) {

  const router = express.Router();

    // index route
    router.get('/', (req, res) => {
      // find returns cursor obj and we want array:
      collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err)
        res.status(500);
        res.json({status: 500, error: err});
      })
    })

    // show route
    router.get('/:id', (req, res) => {
      const id = req.params.id;
      collection.findOne({_id: ObjectID(id)})
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({status: 500, error: err})
      })
    })

    // create route
    router.post('/', (req, res) => {
      const newData = req.body;
      collection
      .insertOne(newData)
      .then((result) => res.json(result.ops[0]))
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({status: 500, error: err})
      })
      // test with insomnia if front end not present
    })

    // destroy

    router.delete('/:id', (req, res) => {
      const id = req.params.id;

      collection
      .deleteOne({_id: ObjectID(id)})
      .then(result => {
      res.json(result)
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({status: 500, error: err})
      })
    })

    // update
    router.put('/:id', (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;

      collection.findOneAndUpdate(
        {_id: ObjectID(id)},
        {$set: updatedData},
        {returnOriginal: false} //returns a new obj instead of old pre-upd
      ).then((result) => res.json(result.value))
        .catch((err) => {
          console.error(err);
          res.status(500);
          res.json({status: 500, error: err})
        })

    })

  return router;

};

module.exports = createRouter;
