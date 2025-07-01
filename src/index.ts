import { info, table } from 'console';
import express from 'express';
import TimelinesChart from 'timelines-chart';
import fs from 'fs';
import { parse } from 'path';
import { exit } from 'process';

const app = express()
const port = 3000

app.use(express.raw({type:"text/plain"}))

app.use(express.static("./src"))

app.get('/', async (req, res) => {
      res.send("test");

});