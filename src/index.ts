import { verify } from 'crypto';
import express from 'express';
import { version } from 'os';
// import TimelinesChart from 'timelines-chart';

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

interface MCDF_Article {
  _pageName: string;
  Start: string;
  End: string;
}

type MCDF_Articles = MCDF_Article[];

interface OmniVer {
  phase: string;
  releaseTime: Date;
  id: string;
}

type OmniVerions = OmniVer[];

app.get('/', async (req, res) => {

});

let previousVer: string // Only used when end ver is null signifying that it was only for the one version
function UpdateVersionID(Version: string)
{
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

      // Indev
      else if(Version.includes("indev")) 
      {

        // Turns "Indev 0.31 [timecode]" and "Indev [timecode]" into "In-[timecode]"
        if(Version.substring(6, 10) == "0.31") Version = "in-" + Version.substring(11);
        else Version = "in-" + Version.substring(6);

        // Updates it into versions we have
        if(Version == "in-20100124") Version = "in-20100124-2310";
        else if(Version == "in-20100205") Version = "in-20100206-2103";
        else if(Version == "in-20100128") Version = "in-20100128-2304";
        else if(Version == "in-20100201") Version = "in-20100201-0025";
        else if(Version == "in-20100125-1" // Shoutup duplication page
          || Version == "in-20100122" 
          || Version == "in-20100114") Version = "in-20100124-2310"; 
        else if(Version == "in-20100131" || Version == "in-20100131-2156") Version = "Indev_0.31_20100131-2310";
        
      }

      // Infdev
      else if(Version.includes("infdev")) 
      {
        // Turns "Infdev [timecode]"  into "In-[timecode]"
        Version = "inf-" + Version.substring(7);

        if(Version == "inf-20100413" || Version == "inf-20100413-1949") Version = "inf-20100413-1953";
      }

      // Alpha
      else if(Version.includes("alpha")) Version = "a" + Version.substring(7);

      // Beta
      else if(Version.includes("beta"))
      {
        let UpdateNum: string = Version.substring(5, 8);

        if(Version == "beta 1.6 test build 3") Version = "b1.6-tb3";

        // Converts "beta 1.9 Prelease"
        else if(UpdateNum == "1.9")
        {
          
          const PrereleaseNum: string = Version.substring(20, 21)

          if(PrereleaseNum == "3")
          {
            if(Version.includes("3-1")) Version = "b" + UpdateNum + "-pre" + PrereleaseNum + "-1350"
            else Version = "b" +  UpdateNum + "-pre" + PrereleaseNum + "-1402"
          }
          else if(PrereleaseNum == "4")
          {
            if(Version.includes("4-1")) Version = "b" + UpdateNum + "-pre" + PrereleaseNum + "-1415"
            else Version = "b" + UpdateNum + "-pre" + PrereleaseNum + "-1435"
          }
          else Version = "b" + UpdateNum + "-pre" + PrereleaseNum;  
        }

        // Converts "beta 1.8 Pre-release"
        else if(UpdateNum == "1.8")
        {
          const PrereleaseNum: string = Version.substring(21, 22)
          
          if(PrereleaseNum == "2") Version = "b1.8-pre2-131225";
          else if(Version == "beta 1.8 Pre-release-1") Version = "b1.8-pre1-081459" // Shoutout Silverfish 
          else Version ="b1.8-pre1-091358";
        }

        // Shout Lock Chest Page 
        else if(UpdateNum == "1.4")
        {
          const PrereleaseNum: string = Version.substring(9, 10)
          
          if(PrereleaseNum == "1") Version = "b1.4-1634";
          else Version ="b1.4-1507";
        }

        // So many beta 1.3s
        else if(UpdateNum == "1.3")
        {
          const PrereleaseNum: string = Version.substring(9, 10)
          
          if(PrereleaseNum == "1") Version = "b1.3-1713";
          else Version ="b1.3-1750";
        }

        else Version = "b" + Version.split(' ')[1];
      }

      // 1.0 Release candidate 
      else if(Version.substring(0, 1) == "rc")
      {
        if(Version == "rc2") Version = "rc2-1656";
        Version = "1.0.0-" + Version;
      }

      // Changes post 1.0 Releases to omni format
      Version = Version.replace(" pre-release ", "-pre");
      Version = Version.replace(" (pre-release)", "-pre"); // Thanks 1.6.2

      // Changes every release candidate verion
      Version = Version.replace(" release candidate ", "-rc");

      // Changes every release experimental snapshot
      Version = Version.replace(" experimental snapshot ", "-exp");

      // Changes every combat verion
      Version = Version.replace("combat test ", "combat");


      // Random Reuploads
      switch(Version)
      {
        case "12w05a-1": Version = "12w05a-1354";
        case "12w05a":
        case "12w05a-2": Version = "12w05a-1442";

        // Wiki says nothing of a rerelease?
        case "12w17a":
        case "12w17a-1":
        case "12w17a-1": Version = "12w17a-1424";

        // Wiki says nothing of a rerelease?
        case "1.3-pre":
        case "1.3-pre-1":
        case "1.3-pre-2": Version = "1.3-pre-1249";

        // Wiki says nothing of a rerelease?
        case "12w32a":
        case "12w32a-1":
        case "12w32a-2": Version = "12w32a-1532";

        case "1.4.1-pre":
        case "1.4.1-pre-1":
        case "1.4.1-pre-2": Version = "1.4.1-pre-1338";

        case "1.4.6-pre":
        case "1.4.6-pre-2": Version = "1.4.6-pre-1521";

        case "1.4.5-pre":
        case "1.4.5-pre-1": Version = "1.4.5-pre-160924";

        case "1.4.6-pre-1": Version = "1.4.6-pre-1428";
        case "1.4.6-pre":
        case "1.4.6-pre-2": Version = "1.4.6-pre-1521";

        case "13w02a-2": Version = "13w02a-whitetexturefix";
        case "13w02a-1":
        case "13w02a": Version = "13w06a-1636";

        // Original was lost </3, funny bug tho
        case "13w03a-2": Version = "13w03a-1613";
        case "13w03a-1": Version == "13w03a-3"
        case "13w03a": Version = "13w03a-1647";

        case "13w04a-2": Version = "13w04a-whitelinefix";
        case "13w04a-1":
        case "13w04a": Version = "13w04a-2";

        case "13w05a-1": Version = "13w05a-1504";
        case "13w05a-2":
        case "13w04a": Version = "13w05a-1538";

        case "13w06a-1": Version = "13w06a-1559";
        case "13w06a-2":
        case "13w06a": Version = "13w06a-1636";

        case "13w36a-1": Version = "13w36a-1234";
        case "13w36a-2":
        case "13w36a": Version = "13w36b-1446";

        // 3rd times the charm
        case "1.5-pre-1":
        case "1.5-pre": Version = "1.5-pre-071309";
        case "1.5-pre-2": Version = "1.5-pre-whitelinefix";

        // Temporary or otherwise why break the scheme :(
        case "13w12~":
        case "13w12a":
        case "13w12~-1":
        case "13w12~-2": Version = "1.5-pre-071309";

        case "1.5.1-pre":
        case "1.5.1-pre-1": Version = "1.5.1-pre-191519";
        case "1.5.1-pre-2": Version = "1.5.1";

        case "2":
        case "2.0": Version = "2.0-purple";

        // How do you mess up this badly
        case "13w16a-2": Version = "13w16a-181812";
        case "13w16a-3": Version = "13w16a-191517";
        case "13w16a-4":
        case "13w16a-1":
        case "13w16a": Version = "13w16a-192037";
        
        case "13w16b-2":
        case "13w16b-1":
        case "13w16b": Version = "13w16b-2151";
        
        case "1.5.2-pre-1":
        case "1.5.2-pre": Version = "1.5.2-pre-250703";
        case "1.5.2-pre-2": Version = "1.5.2";
        
        case "13w23b-2":
        case "13w23b-1":
        case "13w23b": Version = "13w23b-0101";

        case "1.6-pre-1":
        case "1.6-pre-2": 
        case "1.6-pre": Version = "1.6-pre-1517";

        case "1.6.2-pre-1":
        case "1.6.2-pre-2":
        case "1.6.2-pre": Version = "1.6.2-pre-1426";

        case "1.6.2-1": Version = "1.6.2-080933";
        case "1.6.2-2":
        case "1.6.2": Version = "1.6.2-091847";

        case "13w36a-1": Version = "13w36a-1234";
        case "13w36a-2":
        case "13w36a": Version = "13w36a-1446";
        
        case "13w36b-1":
        case "13w36b-2":
        case "13w36b": Version = "13w36b-1307";
        
        case "13w36b-1":
        case "13w36b-2":
        case "13w36b-3":
        case "13w36b": Version = "13w36b-1307";
            
        case "1.6.3-pre-1": Version = "1.6.3-pre-131100";
        case "1.6.3-pre-2":
        case "1.6.3-pre": Version = "1.6.3-pre-171231";
        
        case "13w38c-1":
        case "13w38c-2":
        case "13w38c": Version = "13w38c-1516";

        case "1.7-pre-1":
        case "1.7-pre-2":
        case "1.7-pre": Version = "1.7-pre-1602";

        case "1.7-pre-1":
        case "1.7-pre-2":
        case "1.7-pre": Version = "1.7-pre-1602";

        case "1.7.7-1": Version = "1.7.7-091529";
        case "1.7.7-2":
        case "1.7.7": Version = "1.7.7-101331";

        case "14w11b-1":
        case "14w11b-2":
        case "14w11b": Version = "14w11b-1650";

        case "1.7.10-pre2-1":
        case "1.7.10-pre2-2": 
        case "1.7.10-pre2": Version = "1.7.10-pre2-1045";

        case "14w27b-1":
        case "14w27b-2":
        case "14w27b": Version = "14w27b-1646";
        
        case "14w27b-1":
        case "14w27b-2":
        case "14w27b": Version = "14w27b-1646";

        case "14w34c-1":
        case "14w34c-2":
        case "14w34c": Version = "14w34c-1549";
        
        case "17w13a-1": Version = "17w13a-0805";
        case "17w13a-2":
        case "17w13a": Version = "17w13a-0932";
        
        case "1.12-pre3-1": Version = "1.12-pre3-1316";
        case "1.12-pre3-2":
        case "1.12-pre3": Version = "1.12-pre3-1409";
        
        case "1.14.2-pre4-1": Version = "1.14.2-pre4-24154";
        case "1.14.2-pre4-2":
        case "1.14.2-pre4": Version = "1.14.2-pre4-270720";

        // Its normally "deep dark experimental snapshot 1" but 
        case "deep dark-exp": Version = "1.19-exp1";
        
        case "20w14∞": Version = "20w14infinite";
        
        case "1.16-1": Version = "1.16-221349";
        case "1.16-2":
        case "1.16": Version = "1.16-231620";
        
        case "1.16.5-rc-1": Version = "1.16.5-rc1-1005";
        case "1.16.5-rc1-2":
        case "1.16.5-rc1": Version = "1.16.5-rc1-1558";
        
        case "1.16.5-rc-1": Version = "1.16.5-rc1-1005";
        case "1.16.5-rc1-2":
        case "1.16.5-rc1": Version = "1.16.5-rc1-1558";
        
        case "23w13a_or_b-1": Version = "23w13a_or_b-0722";
        case "23w13a_or_b-2":
        case "23w13a_or_b": Version = "23w13a_or_b-1249";
        
        case "24w14potato-1": Version = "24w14potato-0838";
        case "24w14potato-2":
        case "24w14potato": Version = "24w14potato-1104";
      }



      previousVer = Version
      return Version;
    }
    else return Version = previousVer; // If null then it only worked for one verison
}


let BannedSymboles: string[] = ["≤", "≈", ""];

async function CreateVerFile() {
  
  // Grabs version info from omniarchive (thank you so much Ouroya!)
  const Omni_URL = "https://meta.omniarchive.uk/v1/manifest.json";

  const settings = { method: "Get" };
  let omniRes = await fetch(Omni_URL, settings)
  let OmniComplete = await omniRes.json();
    
  // Sets omni to be version data only instead of including latest update
  let Omni: OmniVerions = OmniComplete.versions;

  for(let i = 0; i < Omni.length; i++)
  {
    // Changes 2013 rereleases to fake dates so they're together with their equivelent versions
    if(Omni[i].id == "c0.0.11a-launcher") Omni[i].releaseTime = new Date("2009-05-18T00:00:00+00:00");
    else if (Omni[i].id == "c0.0.13a-launcher") Omni[i].releaseTime = new Date("2009-05-21T00:00:00+00:00");

    // Changes c0.30-c-1900-renew's date because they decided to make another in 2011
    else if(Omni[i].id == "c0.30-c-1900-renew") Omni[i].releaseTime = new Date("2009-12-01T00:00:00+00:00");
  }

  const mcdf_URL = "https://mcdf.wiki.gg/wiki/Special:CargoExport?tables=Version_Range%2C&&fields=Version_Range._pageName%2C+Version_Range.Start%2C+Version_Range.End%2C&&order+by=&limit=2000&format=json";

  // Thank god for tutorials
  const mcdfRes = await fetch(mcdf_URL, settings)
  let mcdf: MCDF_Articles = await mcdfRes.json();

  // Sanitise data
  for(let i = 0; i < mcdf.length; i++)
  {

    // Skips null data
    if(mcdf[i].Start == null || mcdf[i].End == null) continue;

    // Converts it into string
    mcdf[i].Start = mcdf[i].Start.toString();
    mcdf[i].End = mcdf[i].End.toString();

    // Removes "≤" if there, for some reason mcdf[i].Start.Replace("≤", "") didn't work </3
    if(mcdf[i].Start.includes("≤")) mcdf[i].Start = mcdf[i].Start.substring(1);

    // Removes any deleted - reintroduced ranges
    if(mcdf[i].End == "{{{reintoducedversion}}}" || !mcdf[i]._pageName.includes("Java Edition:"))
    {
      mcdf.splice(i, 1);
      continue;
    }

    // special code for "entity.KillerBuggy.name"
    if(mcdf[i]._pageName == "Java Edition:&quot;entity.KillerBunny.name&quot; Named Regular Rabbit") 
      mcdf[i]._pageName = "Java Edition:\"entity.KillerBunny.name\" Named Regular Rabbit";

    // Removes "Needs Tested" and such
    if(mcdf[i].Start != null)
    {
      if(mcdf[i].Start.includes('&')) 
        mcdf[i].Start = mcdf[i].Start.split('&')[0];
    }

    if(mcdf[i].End != null)
    {
      // If it uses present template then manually update it to current
      if((mcdf[i].End).includes("present") ) mcdf[i].End = Omni[0].id;

      if(mcdf[i].End.includes('&')) 
        mcdf[i].End = mcdf[i].End.split('&')[0];
    }


    // Lowercases update names like Omni
    if(mcdf[i].Start != null) mcdf[i].Start = (mcdf[i].Start).toLowerCase();
    if(mcdf[i].End != null) mcdf[i].End = (mcdf[i].End).toLowerCase();

    mcdf[i].Start = UpdateVersionID(mcdf[i].Start);
    mcdf[i].End = UpdateVersionID(mcdf[i].End);

    console.log(mcdf[i]._pageName + " (" + i + "), " + mcdf[i].Start + " - " + mcdf[i].End);
  }

  // Create Article Data
  let Articles: ArticleData[] = [];
  for(let i = 0; i < mcdf.length; i++)
  {
    // Precomputes info
    let UpdateIndex
    UpdateIndex = (UpdateInfo: OmniVer) => UpdateInfo.id == mcdf[i].Start;
    const StartUpdateInfo = Omni[Omni.findIndex(UpdateIndex)];

    UpdateIndex = (UpdateInfo: OmniVer) => UpdateInfo.id == mcdf[i].End;
    const EndUpdateInfo = Omni[Omni.findIndex(UpdateIndex)];
    
    let FullReleaseUpdate
    if(StartUpdateInfo.phase != "post-1.0") 
    {
      UpdateIndex = (UpdateInfo: OmniVer) => UpdateInfo.id == StartUpdateInfo.id;
      FullReleaseUpdate = Omni[Omni.findIndex(UpdateIndex)].releaseTime;
    }
    else FullReleaseUpdate = new Date();

    let newArticle: ArticleData = {

    StartVer: [mcdf[i].Start],
    EndVer: [mcdf[i].End],

    // Removes the "Java Edition:" from page names
    Title: mcdf[i]._pageName.substring(mcdf[i]._pageName.indexOf(":") + 1),

    // Assigns it the edition
    Edition: mcdf[i]._pageName.split(':')[0],

    // Grabs the version date from Omni

    StartDate: [StartUpdateInfo.releaseTime],
    EndDate: [EndUpdateInfo.releaseTime],

    FullReleaseDate: FullReleaseUpdate,

    };

  };

}

app.listen(port, () => {
  CreateVerFile();
  console.log(`Example app listening on port ${port}`);
})