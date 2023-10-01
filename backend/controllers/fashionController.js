
const asyncHandler = require ('express-async-handler')

const Fashion = require('../models/fashionModel')

// @desc Get Fashion
// @route GET /api/fashion
// @access Private

const getFashion = asyncHandler(async (req, res) => {
      
    const fashions = await Fashion.find()

    res.status(200).json(fashions)
})

// @desc Post Fashion
// @route POST /api/fashion
// @access Private

const postFashion = asyncHandler(async (req, res) => {
    try {
        
        if (!req.body.img || !req.body.video || !req.body.desc || !req.body.creditss || !req.body.creditsss || !req.body.title) {
            res.status(400).json({ error: 'Please provide img, and video fields' });
            return;
        }

        const fashion = await Fashion.create({
            img: req.body.img,
            video: req.body.video,
            desc: req.body.desc,
            creditss: req.body.creditss,
            creditsss: req.body.creditsss,
            title: req.body.title, 
        });
            

        res.status(200).json(fashion);
    } catch (error) {
        console.error(error); // Log any errors to the console for debugging
        res.status(500).json({ error: 'Server error' });
    }
});


// @desc Update Fashion
// @route UPDATE /api/fashion/:id
// @access Private

const updateFashion = asyncHandler(async (req, res) => {
    try {
        const fashionId = req.params.id;
        
        // Check if the top document with the given ID exists
        const fashion = await Fashion.findById(fashionId);

        if (!fashion) {
            res.status(400).json({ error: 'Fashion document not found' });
            return;
        }

        if (req.body.img) {
            fashion.img = req.body.img;
        }
        if (req.body.video) {
            fashion.video = req.body.video;
        }
        if (req.body.desc) {
            fashion.desc = req.body.desc;
        }
        if (req.body.creditss) {
            fashion.creditss = req.body.creditss;
        }
        if (req.body.creditsss) {
            fashion.creditsss = req.body.creditsss;
        }
        if (req.body.title) {
            fashion.title = req.body.title;
        }

        // Save the updated document
        await fashion.save();

        res.status(200).json(fashion);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

// @desc Delete Fashion
// @route DELETE /api/fashion/:id
// @access Private

const deleteFashion = asyncHandler(async (req, res) => {
    try {
        const fashionId = req.params.id;

        console.log('Fashion ID:', fashionId);

        const fashion = await Fashion.findById(fashionId);

        if (!fashion) {
            res.status(404).json({ error: 'Fashion document not found' });
            return;
        }

        // Delete the fashion document
        await fashion.remove();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' });
    }
})

 module.exports = {
    getFashion,
    postFashion,
    updateFashion,
    deleteFashion,
 }