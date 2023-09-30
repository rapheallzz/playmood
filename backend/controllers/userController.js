const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const asyncHandler = require ('express-async-handler')
const User = require ('../models/userModel')

// @desc Register new users
// @route post /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log(`Registering user: ${name}, ${email}`); // Log entry point

        if (!name || !email || !password) {
            console.log('Validation failed: Please add all fields');
            res.status(400);
            throw new Error('Please add all fields');
        }

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log('User already exists:', email);
            res.status(400);
            throw new Error('User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            console.log('User created:', user.email);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            console.log('User creation failed');
            res.status(400);
            throw new Error('Invalid user data');
        }

        console.log('User registration completed'); // Log exit point

      

    } catch (error) {
        console.error('Error:', error.message); // Log errors
        res.status(500).json({ error: 'Server error' });
    }
})


// @desc Authenticate a user
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(404).json({ error: 'User not found or invalid credentials' });
    }
});

// @desc Get user data
// @route GET/api/users/me
// @access Public

const getMe = asyncHandler( async (req, res) => {
   const {_id, name, email} = await User.findById(req.user.id)
     
   res.status(200).json({
    id:_id,
    name,
    email,
   })
} )

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}