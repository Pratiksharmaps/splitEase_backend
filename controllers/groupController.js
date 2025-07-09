const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const {user} = db;



const createGroup = async(req, res)=>{

const {userId , groupName,profilePhoto}= req.body;




}