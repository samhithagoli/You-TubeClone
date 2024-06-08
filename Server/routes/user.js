import express from 'express';

import {login} from "../controllers/auth.js";
import {updateChannelData,getAllChanels} from '../controllers/channel.js'

const routes = express.Router();
 routes.post('/login',login);
 routes.patch('/update/:id',updateChannelData);
 routes.get('/getAllChanels',getAllChanels)
export default routes;
