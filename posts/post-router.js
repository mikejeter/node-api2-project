const express = require('express');
const db = require('../data/db.js');


const router = express.Router();

// // R - Read (CRUD)

router.get('/', (req, res) => {
    db.find()
    .then(post => {
        res.status(200).json({post});
    })
    .catch(err => {
    res.status(500).json({success:false, err});
    });  
});

// C Create (CRUD)
router.post('/', (req, res) => {
    const postInfo = req.body;

    db.insert(postInfo)
        .then(post => {
            res.status(201).json({success:true, post})
        })
        .catch(err => {
            res.status(500).json({success:false, err});
        });
});

router.post('/:id/comments', (req, res) => {
    const postInfoId = req.body;
    const {id} = req.params;
    db.insertComment(id, postInfoId)
        .then(comment => {
            res.status(201).json({success:true, comment})
        })
        .catch(err => {
            res.status(500).json({success:false, err});
        });
});

// D DELETE (CRUD)  /hubs/5

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).end();
                } else {
                    res.status(404).json({
                        success: false,
                        message: 'The post with the specified ID does not exist.'
                    });
                }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err: 'The post could not be removed'
            });
        });
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    db.update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json({success:true, updated});
                } else {
                    res.status(404).json({success:false, message:'id not found'});
                }
        })
        .catch(err => {
            res.status(500).json({success:false, err});
        });
})

router.patch('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    db.update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json({success:true, updated});
                } else {
                    res.status(404).json({success:false, message:'id not found'});
                }
        })
        .catch(err => {
            res.status(500).json({success:false, err});
        });
})
module.exports = router;