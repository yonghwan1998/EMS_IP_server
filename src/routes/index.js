'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./controller');

router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login);
router.get('/logout', ctrl.output.logout);
router.get('/chatting', ctrl.output.chatting);
router.get('/signUp', ctrl.output.signUp);
router.get('/findID', ctrl.output.findID);
router.get('/findPW', ctrl.output.findPW);
router.get('/resetPW', ctrl.output.resetPW);

router.post('/login', ctrl.process.login);
router.post('/signUp', ctrl.process.signUp);
router.post('/findID', ctrl.process.findID);
router.post('/sendVerificationCode', ctrl.process.sendVerificationCode);
router.post('/confirmCode', ctrl.process.confirmCode);
router.post('/resetPW', ctrl.process.resetPW);


router.get('/testPage', ctrl.output.testPage);
router.post('/test', ctrl.process.test);

router.get('/location', ctrl.output.location);

module.exports = router;