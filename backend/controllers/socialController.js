
const asyncHandler = require ('express-async-handler')

const Social = require('../models/socialModel')

// @desc Get Social
// @route GET /api/Social
// @access Private

const getSocial = asyncHandler(async (req, res) => {
      
    const socials = await Social.find()

    res.status(200).json(socials)
})

// @desc Post Social
// @route POST /api/social
// @access Private

const postSocial = asyncHandler(async (req, res) => {
    try {
        
        if (!req.body.img || !req.body.video || !req.body.desc || !req.body.creditss || !req.body.creditsss || !req.body.title) {
            res.status(400).json({ error: 'Please provide img, and video fields' });
            return;
        }

        const social = await Social.create({
            img: req.body.img,
            video: req.body.video,
            desc: req.body.desc,
            creditss: req.body.creditss,
            creditsss: req.body.creditsss,
            title: req.body.title, 
        });
            

        res.status(200).json(social);
    } catch (error) {
        console.error(error); // Log any errors to the console for debugging
        res.status(500).json({ error: 'Server error' });
    }
});


// @desc Update Social
// @route UPDATE /api/social/:id
// @access Private

const updateSocial = asyncHandler(async (req, res) => {
    try {
        const socialId = req.params.id;
        
        // Check if the top document with the given ID exists
        const social = await Social.findById(socialId);

        if (!social) {
            res.status(400).json({ error: 'Social document not found' });
            return;
        }

        if (req.body.img) {
            social.img = req.body.img;
        }
        if (req.body.video) {
            social.video = req.body.video;
        }
        if (req.body.desc) {
            social.desc = req.body.desc;
        }
        if (req.body.creditss) {
            social.creditss = req.body.creditss;
        }
        if (req.body.creditsss) {
            social.creditsss = req.body.creditsss;
        }
        if (req.body.title) {
            social.title = req.body.title;
        }

        // Save the updated document
        await social.save();

        res.status(200).json(social);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

// @desc Delete social
// @route DELETE /api/social/:id
// @access Private

const deleteSocial = asyncHandler(async (req, res) => {
    try {
        const socialId = req.params.id;

        console.log('Social ID:', socialId);

        const social = await Social.findById(socialId);

        if (!social) {
            res.status(404).json({ error: 'Social document not found' });
            return;
        }

        // Delete the fashion document
        await social.remove();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' });
    }
})

 module.exports = {
    getSocial,
    postSocial,
    updateSocial,
    deleteSocial,
 }