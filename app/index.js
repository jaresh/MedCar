var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/addPost', function(req, res) {
  res.render('partials/addPost');
});

router.get('/deletePost/:id', function(req, res) {
  res.render('partials/deletePost/:id');
});

router.get('/api/posts', function(req, res) {
    var db = req.db;
    db.collection('userlist').find().toArray(function (err, customers) {
        res.json(
        	{customers: customers}
        	);
    });
});

/*
 * POST to adduser.
 */
router.post('/api/post', function(req, res) {
    var db = req.db;
    db.collection('userlist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/api/post/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').remove({name: userToDelete}, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;