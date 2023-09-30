
const asyncHandler = require ('express-async-handler')

const Interview = require('../models/interviewModel')

// @desc Get Interview
// @route GET /api/interview
// @access Private

const getInterview = asyncHandler(async (req, res) => {
      
    const interviews = await Interview.find()

    res.status(200).json(interviews)
})

// @desc Post Interview
// @route POST /api/interview
// @access Private

const postInterview = asyncHandler(async (req, res) => {
    try {
        
        if (!req.body.img || !req.body.video || !req.body.desc || !req.body.creditss || !req.body.creditsss || !req.body.title) {
            res.status(400).json({ error: 'Please provide img, and video fields' });
            return;
        }

        const interview = await Interview.create({
            img: req.body.img,
            video: req.body.video,
            desc: req.body.desc,
            creditss: req.body.creditss,
            creditsss: req.body.creditsss,
            title: req.body.title, 
        });
            

        res.status(200).json(interview);
    } catch (error) {
        console.error(error); // Log any errors to the console for debugging
        res.status(500).json({ error: 'Server error' });
    }
});


// @desc Update Interview
// @route UPDATE /api/interview/:id
// @access Private

const updateInterview = asyncHandler(async (req, res) => {
    try {
        const interviewId = req.params.id;
        
        // Check if the Interview document with the given ID exists
        const interview = await Interview.findById(interviewId);

        if (!interview) {
            res.status(400).json({ error: 'Fashion document not found' });
            return;
        }

        if (req.body.img) {
            interview.img = req.body.img;
        }
        if (req.body.video) {
            interview.video = req.body.video;
        }
        if (req.body.desc) {
            interview.desc = req.body.desc;
        }
        if (req.body.creditss) {
            interview.creditss = req.body.creditss;
        }
        if (req.body.creditsss) {
            interview.creditsss = req.body.creditsss;
        }
        if (req.body.title) {
            interview.title = req.body.title;
        }

        // Save the updated document
        await interview.save();

        res.status(200).json(interview);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

// @desc Delete Interview
// @route DELETE /api/interview/:id
// @access Private

const deleteInterview = asyncHandler(async (req, res) => {
    try {
        const interviewId = req.params.id;

        console.log('Interview ID:', interviewId); 

        const fashion = await Interview.findById(interviewId);

        if (!interview) {
            res.status(404).json({ error: 'Fashion document not found' });
            return;
        }

        // Delete the Interview document
        await interview.remove();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' });
    }
})

 module.exports = {
    getInterview,
    postInterview,
    updateInterview,
    deleteInterview,
 }