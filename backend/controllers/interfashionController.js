
const asyncHandler = require ('express-async-handler')

const Interfashion = require('../models/InterfashionModel')

// @desc Get Interfashion
// @route GET /api/interfashion
// @access Private

const getInterfashion = asyncHandler(async (req, res) => {
      
    const interfashion = await Interfashion.find()

    res.status(200).json(interfashion)
})

// @desc Post Interfashion
// @route POST /api/interfashion
// @access Private

const postInterfashion = asyncHandler(async (req, res) => {
    try {
        
        if (!req.body.img || !req.body.video || !req.body.desc || !req.body.creditss || !req.body.creditsss || !req.body.title) {
            res.status(400).json({ error: 'Please provide img, and video fields' });
            return;
        }

        const interfashion = await Interfashion.create({
            img: req.body.img,
            video: req.body.video,
            desc: req.body.desc,
            creditss: req.body.creditss,
            creditsss: req.body.creditsss,
            title: req.body.title, 
        });
            

        res.status(200).json(interfashion);
    } catch (error) {
        console.error(error); // Log any errors to the console for debugging
        res.status(500).json({ error: 'Server error' });
    }
});


// @desc Update Social
// @route UPDATE /api/social/:id
// @access Private

const updateInterfashion = asyncHandler(async (req, res) => {
    try {
        const interfashionId = req.params.id;
        
        // Check if the top document with the given ID exists
        const interfashion = await Interfashion.findById(interfashionId);

        if (!interfashion) {
            res.status(400).json({ error: 'Fashion document not found' });
            return;
        }
        if (req.body.img) {
            interfashion.img = req.body.img;
        }
        if (req.body.video) {
            interfashion.video = req.body.video;
        }
        if (req.body.desc) {
            interfashion.desc = req.body.desc;
        }
        if (req.body.creditss) {
            interfashion.creditss = req.body.creditss;
        }
        if (req.body.creditsss) {
            interfashion.creditsss = req.body.creditsss;
        }
        if (req.body.title) {
            interfashion.title = req.body.title;
        }

        // Save the updated document
        await interfashion.save();

        res.status(200).json(interfashion);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

// @desc Delete Interfashion
// @route DELETE /api/interfashion/:id
// @access Private

const deleteInterfashion= asyncHandler(async (req, res) => {
    try {
        const interfashionId = req.params.id;

        console.log('interfashion ID:', interfashionId);

        const interfashion = await Interfashion.findById(interfashionId);

        if (!interfashion) {
            res.status(404).json({ error: 'interfashion document not found' });
            return;
        }

        // Delete the fashion document
        await interfashion.remove();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' });
    }
})

 module.exports = {
    getInterfashion,
    postInterfashion,
    updateInterfashion,
    deleteInterfashion,
 }
