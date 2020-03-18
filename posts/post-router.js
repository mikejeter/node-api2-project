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
    res.status(500).json({success:false, err: 'The posts information could not be retrieved.'});
    });  
});

router.get('/:id', (req, res) => {
    const postId = req.params.id;
    db.findById(postId)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ message: 'The post with the specified ID does not exist.'});
            } else {
                res.status(200).json(post);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err: 'The post information could not be retrieved.'});
        });
});

router.get('/:id/comments', (req, res) => {
    const postId = req.params.id;
    db.findPostComments(postId)
        .then(comments => {
            if (comments.length === 0) {
                res.status(404).json({ message: 'The post with the specified ID does not exist.'});
            } else {
                res.status(200).json(comments);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err: 'The comments information could not be retrieved.'});
        });
});

// C Create (CRUD)
router.post('/', (req, res) => {
    const { title, contents } = req.body;

    db.insert(req.body)
        .then(post => {
            if (!title || !contents) {
                res.status(400).json({ message: 'Please provide title and contents for the post.'});
            } else {
                res.status(201).json(post);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err: 'There was an error while saving the post to the database'});
        });
});



router.post('/:id/comments', (req, res) => {
    const { text, post_id } = req.body;
    db.insertComment(req.body)
    .then(newComment => {
        if (!post_id) {
            res.status(404).json({ message: 'The post with the specified ID does not exist.'});
        } else if (!text) {
            res.status(400).json({ message: 'Please provide text for the comment.'});
        } else {
            res.status(201).json(newComment);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ err: 'There was an error while saving the comment to the database'});
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
});

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
});

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
});
module.exports = router;