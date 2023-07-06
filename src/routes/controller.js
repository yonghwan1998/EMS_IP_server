'use strict';

const User = require('../models/User');

const output = {
  home: (req, res) => {
    res.render('index');
  },
  login: (req, res) => {
    // if (req.session.name) {
    //   console.log(`name: ${req.session.name} 로그인 된 상태입니다.`);
    //   res.redirect('/chatting');
    // } else {
    //   res.render('login');
    // }
    res.render('login');
  },
  logout: (req, res) => {
    if (req.session.name) {
      res.redirect('/');
      req.session.destroy((err) => {
        if (err) throw err;
        console.log('세션 삭제하고 로그아웃됨');
      });
    } else {
      console.log('로그인 상태 아님');
      res.redirect('/');
    }
  },
  chatting: (req, res) => {
    if (req.session.name) {
      let cookie = req.session.name;
      res.render('chatting', { cookie: cookie });
    } else {
      res.redirect('/login');
    }
  },
  signUp: (req, res) => {
    res.render('signUp');
  },
  findID: (req, res) => {
    res.render('findID');
  },
  findPW: (req, res) => {
    res.render('findPW');
  },
  resetPW: (req, res) => {
    res.render('resetPW');
  },
  // complete
  location: (req, res) => {
    res.render('location');
  },

  testPage: (req, res) => {
    res.render('testPage');
  },

};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login(req, res);

    return res.json(response);
  },
  signUp: async (req, res) => {
    const user = new User(req.body);
    const response = await user.signUp(req, res);

    return res.json(response);
  },
  findID: async (req, res) => {
    const inform = new User(req.body);
    const response = await inform.findID(req, res);

    return res.json(response);
  },
  sendVerificationCode: async (req, res) => {
    const input = new User(req.body);
    const response = await input.sendVerificationCode(req, res);

    return res.json(response);
  },
  confirmCode: async (req, res) => {
    const input = new User(req.body);
    const response = await input.confirmCode(req, res);

    return res.json(response);
  },
  resetPW: async (req, res) => {
    const input = new User(req.body);
    const response = await input.resetPW(req, res);

    return res.json(response);
  },
  // complete

  test: async (req, res) => {
    const test = new User(req.body);
    const response = await test.test(req, res);

    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};