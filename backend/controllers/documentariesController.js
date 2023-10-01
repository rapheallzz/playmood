const asyncHandler = require ('express-async-handler')

const Documentaries = require('../models/documentariesModel')

// @desc Get Documentaries
// @route GET /api/documentaries
// @access Private

const getDocumentaries = asyncHandler(async (req, res) => {
      
    const documentaries = await Documentaries.find()

    res.status(200).json(documentaries)
})

// @desc Post Documentaries
// @route POST /api/documentaries
// @access Private

const postDocumentaries = asyncHandler(async (req, res) => {
    try {
        
        if (!req.body.img || !req.body.video || !req.body.desc || !req.body.creditss || !req.body.creditsss || !req.body.title) {
            res.status(400).json({ error: 'Please provide img, and video fields' });
            return;
        }

        const documentaries = await Documentaries.create({
            img: req.body.img,
            video: req.body.video,
            desc: req.body.desc,
            creditss: req.body.creditss,
            creditsss: req.body.creditsss,
            title: req.body.title, 
        });
            

        res.status(200).json(documentaries);
    } catch (error) {
        console.error(error); // Log any errors to the console for debugging
        res.status(500).json({ error: 'Server error' });
    }
});


// @desc Update Documentaries 
// @route UPDATE /api/documentaries /:id
// @access Private

const updateDocumentaries = asyncHandler(async (req, res) => {
    try {
        const documentariesId = req.params.id;
        
        // Check if the Interview document with the given ID exists
        const documentaries = await Documentaries.findById(documentariesId);

        if (!documentaries) {
            res.status(400).json({ error: 'Documentaries document not found' });
            return;
        }

        if (req.body.img) {
            documentaries.img = req.body.img;
        }
        if (req.body.video) {
            documentaries.video = req.body.video;
        }
        if (req.body.desc) {
            documentaries.desc = req.body.desc;
        }
        if (req.body.creditss) {
            documentaries.creditss = req.body.creditss;
        }
        if (req.body.creditsss) {
            documentaries.creditsss = req.body.creditsss;
        }
        if (req.body.title) {
            documentaries.title = req.body.title;
        }

        // Save the updated document
        await documentaries.save();

        res.status(200).json(documentaries);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

// @desc Delete Documentaries 
// @route DELETE /api/documentaries /:id
// @access Private

const deleteDocumentaries = asyncHandler(async (req, res) => {
    try {
        const documentariesId = req.params.id;

        console.log('Documentaries ID:', documentariesId); 

        const fashion = await Documentaries.findById(documentariesId);

        if (!documentaries) {
            res.status(404).json({ error: 'Documentaries document not found' });
            return;
        }

        // Delete the documentaries  document
        await documentaries.remove();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' });
    }
})

 module.exports = {
    getDocumentaries,
    postDocumentaries,
    updateDocumentaries,
    deleteDocumentaries,
 }