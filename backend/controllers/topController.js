
const asyncHandler = require ('express-async-handler')

const Top = require('../models/topModel')

// @desc Get Top
// @route GET /api/top
// @access Private

const getTop = asyncHandler(async (req, res) => {
      
    const tops = await Top.find()

    res.status(200).json(tops)
})

// @desc Post Top
// @route POST /api/top
// @access Private

const postTop = asyncHandler(async (req, res) => {
    try {
        
        if (!req.body.img || !req.body.video || !req.body.desc || !req.body.creditss || !req.body.creditsss || !req.body.title) {
            res.status(400).json({ error: 'Please provide img, and video fields' });
            return;
        }

        const top = await Top.create({
            img: req.body.img,
            video: req.body.video,
            desc: req.body.desc,
            creditss: req.body.creditss,
            creditsss: req.body.creditsss,
            title: req.body.title, 
        });
            

        res.status(200).json(top);
    } catch (error) {
        console.error(error); // Log any errors to the console for debugging
        res.status(500).json({ error: 'Server error' });
    }
});


// @desc Update Top
// @route UPDATE /api/top/:id
// @access Private

const updateTop = asyncHandler(async (req, res) => {
    try {
        const topId = req.params.id;
        
        // Check if the top document with the given ID exists
        const top = await Top.findById(topId);

        if (!top) {
            res.status(400).json({ error: 'Top document not found' });
            return;
        }

        // Update the fields you want to change
        if (req.body.img) {
            top.img = req.body.img;
        }
        if (req.body.video) {
            top.video = req.body.video;
        }
        if (req.body.desc) {
            top.desc = req.body.desc;
        }
        if (req.body.creditss) {
            top.creditss = req.body.creditss;
        }
        if (req.body.creditsss) {
            top.creditsss = req.body.creditsss;
        }
        if (req.body.title) {
            top.title = req.body.title;
        }

        // Save the updated document
        await top.save();

        res.status(200).json(top);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

// @desc Delete Top
// @route DELETE /api/top/:id
// @access Private

const deleteTop = asyncHandler(async (req, res) => {
    try {
        const topId = req.params.id; 
        
        const top = await Top.findById(topId);

        if (!top) {
            res.status(400).json({ error: 'Top document not found' });
            return;
        }

        // Delete the top document
        await top.remove()

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})


 module.exports = {
    getTop,
    postTop,
    updateTop,
    deleteTop,
 }