const express = require('express');
const ObjectID = require('mongodb').ObjectID;




const createRouter = function(collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
    .findOne({ _id: ObjectID(id) })
    .then((doc) => res.json(doc))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  router.post('/', (req, res) => {
    // REMEMBER TO INCLUDE BODY PARSER
    const newData = req.body;
    // console.log('🌲🌲🌲🌲🌲new data:', newData); - good way to debug, checking result on terminal.
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

  return router;
};

module.exports = createRouter;
