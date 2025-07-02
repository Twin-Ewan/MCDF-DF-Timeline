import { info, table } from 'console';
import express from 'express';
import TimelinesChart from 'timelines-chart';
import fs from 'fs';
import { parse } from 'path';
import { exit } from 'process';
import { start } from 'repl';
import { version } from 'os';

const app = express()
const port = 3000

app.use(express.raw({type:"text/plain"}))

app.use(express.static("./src"))

interface ArticleData {

  Title: string;
  Edition: string;

  FullReleaseDate: Date; 

  StartVer: string[];
  StartDate: Date[];
  EndVer: string[];
  EndDate: Date[];
}



app.get('/', async (req, res) => {

  let mcdf_URL = "https://mcdf.wiki.gg/wiki/Special:CargoExport?tables=Version_Range%2C&&fields=Version_Range._pageName%2C+Version_Range.Start%2C+Version_Range.End%2C&&order+by=&limit=2000&format=json";

  // Thank god for tutorials
  let settings = { method: "Get" };
  let mcdfRes = await fetch(mcdf_URL, settings)
  let mcdf = await mcdfRes.json();

  // Sanitise data
  for(let i = 0; i < mcdf.length; i++)
  {

    // Only displays java edition
    if(mcdf[i]._pageName.includes("User:")) 
    {
      // Finds first occurrence of a Java Edition page
      let Editionindex = (Edition: any) => Edition._pageName.includes("Java Edition:");
      mcdf = mcdf.slice(mcdf.findIndex(Editionindex), i);
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


    // Lowercases update names like Omni
    if(mcdf[i].Start != null) mcdf[i].Start = (mcdf[i].Start as string).toLowerCase();
    if(mcdf[i].End != null) mcdf[i].End = (mcdf[i].End as string).toLowerCase();

    mcdf[i].Start = UpdateVersionID(mcdf[i].Start);
    mcdf[i].End = UpdateVersionID(mcdf[i].End);

    console.log(i + ": " + mcdf[i].Start + " - " + mcdf[i].End);
  }

  // Grabs version info from omniarchive (thank you so much Ouroya!)
  let Omni_URL = "https://meta.omniarchive.uk/v1/manifest.json";

  settings = { method: "Get" };
  let omniRes = await fetch(Omni_URL, settings)
  let Omni = await omniRes.json();
    
  // Sets omni to be version data only instead of including latest update
  Omni = Omni.versions;

  for(let i = 0; i < Omni.length; i++)
  {
    // Changes 2013 rereleases to fake dates so they're together with their equivelent versions
    if(Omni.id == "c0.0.11a-launcher") Omni.releaseTime = "2009-05-18T00:00:00+00:00";
    else if (Omni.id == "c0.0.13a-launcher") Omni.releaseTime = "2009-05-21T00:00:00+00:00";

    // Changes c0.30-c-1900-renew's date because they decided to make another in 2011
    else if(Omni.id == "c0.30-c-1900-renew") Omni.releaseTime = "2009-12-01T00:00:00+00:00";
  }

  // Create Article Data
  let Articles: ArticleData[] = [];
  for(let i = 0; i < mcdf.length; i++)
  {
    // Precomputes info
    let UpdateIndex
    UpdateIndex = (UpdateInfo: any) => UpdateInfo.id == mcdf[i].start;
    let StartUpdateInfo = Omni[Omni.findIndex(UpdateIndex)];
    
    let FullReleaseUpdate
    if(StartUpdateInfo.phase != "post-1.0") FullReleaseUpdate = StartUpdateInfo.phase;
    else FullReleaseUpdate = "test";

    let newArticle: ArticleData = {

    StartVer: mcdf[i].Start,
    EndVer: mcdf[i].End,

    // Removes the "Java Edition:" from page names
    Title: mcdf[i]._pageName.substring(mcdf[i]._pageName.indexOf(":") + 1),

    // Assigns it the edition
    Edition: mcdf[i]._pageName.split(':')[0],

    // Grabs the version date from Omni

    StartDate: StartUpdateInfo.Date,
    EndDate: Omni[Omni.indexOf(mcdf.End)].Date,

    FullReleaseDate: FullReleaseUpdate,

    };

  };


  res.send(Articles);

});

let previousVer: string // Only used when end ver is null signifying that it was only for the one version
function UpdateVersionID(Version: string)
{
    // Edits the start day to follow omni's scheme
    if(Version != null)
    {
      // Pre-Classic
      if(Version.includes("pre-classic rd-")) 
      {
        // Pre-classic is messured from CEST (local time Sweden) instead of UTC
        // like literally everything else is later, Omni uses UTC
        let Timecode;
        if(Version.includes("132211")) Timecode = "132011";
        else if(Version.includes("132328")) Timecode = "132128";
        else if(Version.includes("160052")) Timecode = "152252";
        else if(Version.includes("161348")) Timecode = "161148";

        Version = "pc-" + Timecode + "-launcher"

        previousVer = Version;
        return Version;
      }

      // Classic
      else if(Version.includes("classic")) 
      {
        Version = "c" + Version.substring(8);

        if(Version == "c0.0.13a/development") Version = "c0.0.13a-launcher";

        // Glass page my new detested 
        if(Version == "c0.0.19") Version = "c0.0.19_04a";

        // Turns Survial Tests into st
        if(Version.includes("survival test")) 
        {
          
          if(Version.includes("25")) Version + "_05";

          // Turns Survial Tests into st
          Version = Version.split(" ")[0] + "_st";

          // 24 has it at the end??
          if(Version.includes("24")) Version + "_03";
        }

        if(Version == "c0.28") Version = "c0.28_01";

        // What does "renew" even mean
        if(Version.includes("c0.30-c")) 
        {
          if(Version.includes("c-2")) 
          {
            Version = "c0.30-1900-renew";
          }
          else Version += "-1900";
        }

        previousVer = Version;
        return Version;
      }

      previousVer = Version
      return Version;
    }
    else return Version = previousVer; // If null then it only worked for one verison
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})