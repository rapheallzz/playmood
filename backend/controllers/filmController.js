
const asyncHandler = require ('express-async-handler')

const Film = require('../models/filmModel')

// @desc Get film
// @route GET /api/film
// @access Private

const getFilm = asyncHandler(async (req, res) => {
      
    const films = await Film.find()

    res.status(200).json(films)
})

// @desc Post Film
// @route POST /api/film
// @access Private

const postFilm = asyncHandler(async (req, res) => {
    try {
        
        if (!req.body.img || !req.body.video || !req.body.title ) {
            res.status(400).json({ error: 'Please provide img, and video fields' });
            return;
        }

        const film = await Film.create({
            img: req.body.img,
            video: req.body.video,
            title: req.body.video
        });
            

        res.status(200).json(film);
    } catch (error) {
        console.error(error); // Log any errors to the console for debugging
        res.status(500).json({ error: 'Server error' });
    }
});


// @desc Update Film
// @route UPDATE /api/film/:id
// @access Private

const updateFilm = asyncHandler(async (req, res) => {
    try {
        const filmId = req.params.id;
        
        // Check if the top document with the given ID exists
        const film = await Film.findById(filmId);

        if (!film) {
            res.status(400).json({ error: 'Film document not found' });
            return;
        }

        if (req.body.img) {
            film.img = req.body.img;
        }
        if (req.body.video) {
            film.video = req.body.video;
        }

        // Save the updated document
        await film.save();

        res.status(200).json(film);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

// @desc Delete social
// @route DELETE /api/social/:id
// @access Private

const deleteFilm = asyncHandler(async (req, res) => {
    try {
        const filmId = req.params.id;

        console.log('Social ID:', filmId);

        const film = await Film.findById(filmId);

        if (!film) {
            res.status(404).json({ error: 'Film document not found' });
            return;
        }

        // Delete the fashion document
        await film.remove();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' });
    }
})

 module.exports = {
    getFilm,
    postFilm,
    updateFilm,
    deleteFilm,
 }