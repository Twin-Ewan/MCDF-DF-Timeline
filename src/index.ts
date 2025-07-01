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

interface ArticleData {

  Title: string;
  Edition: string;

  StartVer: string[];
  StartDate: Date[];
  EndVer: string[];
  EndDate: Date[];
}



app.get('/', async (req, res) => {

  let mcdf_URL = "https://mcdf.wiki.gg/wiki/Special:CargoExport?tables=Version_Range%2C&&fields=Version_Range._pageName%2C+Version_Range.Start%2C+Version_Range.End%2C&&order+by=&limit=2000&format=json";

  // Thank god for tutorials
  let settings = { method: "Get" };
  fetch(mcdf_URL, settings)
    .then(res => res.json())
    .then((mcdf) => {

      // Sanitise data
      for(let i = 0; i < mcdf.length; i++)
      {
        // Stops once at user pages
        if(mcdf[i]._pageName.includes("User:")) 
        {
          mcdf = mcdf.slice(0, i);
          break;
        }

        // Convert everything into text
        if(!isNaN(mcdf[i].Start) && mcdf[i].Start != null) mcdf[i].Start = (mcdf[i].Start as number).toString();
        if(!isNaN(mcdf[i].End) && mcdf[i].End != null) mcdf[i].End = (mcdf[i].End as number).toString();

        // Removes "Needs Tested" and such
        if(mcdf[i]._pageName != null)
        {
          if((mcdf[i]._pageName as String).includes('&')) 
            mcdf[i]._pageName = mcdf[i]._pageName.split('&')[0];
        }

        if(mcdf[i].Start != null)
        {
          if((mcdf[i].Start as String).includes('&')) 
            mcdf[i].Start = mcdf[i].Start.split('&')[0];
        }

        if(mcdf[i].End != null)
        {
          if((mcdf[i].End as String).includes('&')) 
            mcdf[i].End = mcdf[i].End.split('&')[0];
        }

      }

      res.send(Articles);

});