import express from 'express'
import passport from 'passport'

const router = express.Router();

router.use(passport.initialize())
router.use(passport.session())