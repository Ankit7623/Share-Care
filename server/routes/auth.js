import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, location } = req.body;

        // Validation
        if (!name || !email || !password || !location) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            location,
            avatar: name.charAt(0).toUpperCase()
        });

        const savedUser = await newUser.save();

        // Create JWT Token
        const token = jwt.sign(
            { id: savedUser._id, email: savedUser.email }, 
            process.env.JWT_SECRET || 'fallback_secret', 
            { expiresIn: '7d' }
        );

        // Prepare response user
        const userResponse = {
            id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            location: savedUser.location,
            avatar: savedUser.avatar,
            donations: savedUser.donations,
            requests: savedUser.requests,
            createdAt: savedUser.createdAt
        };

        res.status(201).json({ success: true, message: 'Account created successfully!', token, user: userResponse });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ success: false, message: 'No account found with this email. Sign up first!' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Incorrect password. Please try again.' });
        }

        // Create JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET || 'fallback_secret', 
            { expiresIn: '7d' }
        );

        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            location: user.location,
            avatar: user.avatar,
            donations: user.donations,
            requests: user.requests,
            createdAt: user.createdAt
        };

        res.status(200).json({ success: true, message: 'Welcome back!', token, user: userResponse });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

export default router;
