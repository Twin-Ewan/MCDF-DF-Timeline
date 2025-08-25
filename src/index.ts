import express from 'express';
import fs from 'fs';

const app = express()
const port = 3000

app.use(express.raw({type:"text/plain"}))

app.use(express.static("./src"))

interface ArticleData {

  Title: string;
  Edition: string;

  FullReleaseDate: Date; 

  Range: VersionData[]
}

interface VersionData {
  StartId: string;
  StartDisplay: string;
  StartDate: Date;
  StartRelease: string;

  EndId: string;
  EndDisplay: string;
  EndDate: Date;
  EndRelease: string;
}

interface MCDF_Article {
  _pageName: string;
  Start: string;
  StartDisplay: string;
  End: string;
  EndDisplay: string;
}

type MCDF_Articles = MCDF_Article[];

interface OmniVer {
  phase: string;
  type: String;
  releaseTime: Date;
  id: string;
}

type OmniVerions = OmniVer[];
let Omni: OmniVerions;

let ReleaseVersion: Date[] = [];

app.get('/', async (req, res) => {
  res.send(fs.readFileSync("./src/website/index.html").toString())
});

let previousVer: string // Only used when end ver is null signifying that it was only for the one version
export function UpdateVersionID(Version: string)
{

  // Changes rd into pc
  Version = Version.replace("pre-classic rd-", "pc-");
  Version = Version.replace("rd-", "pc-");

  // Changes classic into c
  Version = Version.replace("classic ", "c");
  Version = Version.replace(" survival test", "_st");

  // Indev [numbers] to in-[numbers]
  Version = Version.replace("indev 0.31 ", "in-");
  Version = Version.replace("indev ", "in-");

  // inf-[numbers] to in-[numbers]
  Version = Version.replace("infdev ", "inf-");

  // Changes alpha into a
  Version = Version.replace("alpha v", "a");
  Version = Version.replace("alpha ", "a");

  // Changes beta into b
  Version = Version.replace("beta ", "b");

  // Changes post 1.0 Releases to omni format
  Version = Version.replace(" pre-release ", "-pre");
  Version = Version.replace(" pre-release", "-pre"); // b1.8 pre-releases
  Version = Version.replace(" prerelease ", "-pre");
  Version = Version.replace(" prerelease", "-pre"); // b1.9 prereleases
  Version = Version.replace(" (pre-release)", "-pre"); // Thanks 1.6.2

  // Changes every release candidate verion
  Version = Version.replace(" release candidate ", "-rc");

  // Changes every release experimental snapshot
  Version = Version.replace(" experimental snapshot ", "-exp");

  // Changes every combat verion
  Version = Version.replace("combat test ", "combat");

  switch(Version)
  {
    // #region Pre-Classic
    // Unreleased
    case "cave game tech test":
    case "cave game": 

    case "pc-132211": // CEST
    case "pc-132011": // UTC
      Version = "pc-132011-launcher";
      break;

    case "rd-132328": // CEST
    case "rd-132128": // UTC
      Version = "pc-132011-launcher";
      break;

    // Unreleased
    case "pc-20090515": // CEST
    case "pc-20090315": // UTC
    case "pc-1160015": // CEST
    case "pc-1152215": // UTC

    case "pc-160052": // CEST
    case "pc-152252": // UTC    
      Version = "pc-152252-launcher";
      break;

    case "pc-161348": // CEST
    case "pc-161148": // UTC  
      Version = "pc-161148-launcher";
      break;

    // #endregion

    // #region Early Classic
    // Unreleased
    case "mc-161607":
    case "classic mc-161607":
      
    // Unreleased
    case "mc-161616":
    case "classic mc-161616":

    // Unreleased
    case "mc-161625":
    case "classic mc-161625":

    // Unreleased
    case "mc-161648":
    case "classic mc-161648":

    // Skiped
    case "c0.0.1a":

    // Unreleased
    case "c0.0.2a":

    // Unreleased
    case "c0.0.3a":

    // Skipped
    case "c0.0.4a":
    case "c0.0.5a":
    case "c0.0.6a":
    case "c0.0.7a":
    case "c0.0.8a":

    // Unreleased
    case "c0.0.9a":

    // Unreleased
    case "c0.0.10a":
      
    // Lost bar early dev of 12a
    case "c0.0.11a": 
      Version = "c0.0.11a-launcher";
      break;
    
    // Lost
    case "c0.0.12a":

    // Lost
    case "c0.0.12a_01":

    // Lost
    case "c0.0.12a_02":

    // Lost
    case "c0.0.12a_03-1":
    case "c0.0.12a_03-2":
    case "c0.0.12a_03": 
      Version = "c0.0.12a_03-200018";
      break;

    case "c0.0.13a": 
      Version = "c0.0.13a-launcher";
      break;
    
    // Skipped
    case "c0.0.13a_01":
    case "c0.0.13a_02":
    
    case "c0.0.13a_03-1": 
      Version = "c0.0.13a_03";
      break;
    
    case "c0.0.13a_03-2":
    case "c0.0.13a-launcher": 
      Version = "c0.0.13a_03-launcher";
      break;
    
    // Lost
    case "c0.0.14a":
    
    // Lost
    case "c0.0.14a_01":
    
    // Unknown
    case "c0.0.14a_02":

    // Lost
    case "c0.0.14a_03":

    // Lost
    case "c0.0.14a_04":

    // Lost
    case "c0.0.14a_05":

    // Lost
    case "c0.0.14a_06":

    // Lost
    case "c0.0.14a_07": 
      Version = "c0.0.14a_08";
      break;
    
    // #region Multiplayer Tests
    // Lost bar rerelease
    case "c0.0.15a-1":
    case "c0.0.15a": 
      Version = "c0.0.15a-05311904";
      break;
    
    // Lost
    case "c0.0.15a-2":
    
    // Lost
    case "c0.0.15a-3":
    
    // Lost
    case "c0.0.15a-4":
    
    // Lost
    case "c0.0.15a-5":
    
    // Lost
    case "c0.0.15a-6":
    
    // Lost
    case "c0.0.15a-7":
    
    // Lost
    case "c0.0.15a-8":

    // #endregion
    
    // Lost
    case "c0.0.15a_01":

    // Lost
    case "c0.0.15a_01":

    // Lost
    case "c0.0.15a_02":

    // Unknown
    case "c0.0.15a_03":

    // Lost
    case "c0.0.16a":

    // Lost
    case "c0.0.16a_01":

    // Lost
    case "c0.0.16a_02-1":
    case "c0.0.16a_02-2":
    case "c0.0.16a_02-3":
    case "c0.0.16a_02-4":
    case "c0.0.16a_02": 
      Version = "c0.0.16a_02-081047";
      break;

    // Seemingly no rerelease and yet numbered
    case "c0.0.17a-1":
    case "c0.0.17a-2":
    case "c0.0.17a": 
      Version = "c0.0.17a-2014";
      break;
    
    // Lost
    case "c0.0.18a":

    case "c0.0.18a_01": 
      Version = "c0.0.18a_02";
      break;
    
    // Lost
    case "c0.0.19a":

    // Unkown
    case "c0.0.19a_01":

    // Lost
    case "c0.0.19a_02":

    // Lost
    case "c0.0.19a_03": 
      Version = "c0.0.19a_04";
      break;

    // Lost
    case "c0.0.19a_05":

    // Lost bar rerelease
    case "c0.0.19a_06-1":
    case "c0.0.19a_06-2":
    case "c0.0.19a_06": 
      Version = "c0.0.19a_06-0137";
      break;

    // Lost
    case "c0.0.20a": 

    // Lost bar rerelease
    case "c0.0.21a-1":
    case "c0.0.21a-2":
    case "c0.0.21a": 
      Version = "c0.0.21a-2008";
      break;
    
    // Lost
    case "c0.0.21a_01":

    // Lost
    case "c0.0.21a_02":

    // Lost
    case "c0.0.22a-1":
    case "c0.0.22a-2":
    case "c0.0.22a":

    // Lost
    case "c0.0.22a_01":

    // Lost
    case "c0.0.22a_02":

    // Lost
    case "c0.0.22a_03":

    // Lost
    case "c0.0.22a_04": 
      Version = "c0.0.22a_05";
      break;
    
    // Lost
    case "c0.0.23a":

    // #endregion

    // #region Survival Test
    // Lost
    case "c0.24a":
    case "c0.24a_st":

    // Lost
    case "c0.24_01":
    case "c0.24a_01":
    case "c0.24a_st_01":

    // Lost
    case "c0.24_02":
    case "c0.24a_02":
    case "c0.24a_st_02":
    case "c0.24_02-1":
    case "c0.24a_02-1":
    case "c0.24a_st_02-1":

    case "c0.24_02-2":
    case "c0.24a_02-2":
    case "c0.24a_st_02-2":

    case "c0.25":
    case "c0.25a":
    case "c0.25_st":
    case "c0.25a_st": 
      Version = "c0.24_st_03";
      break;

    // Lost
    case "c0.25":
    case "c0.25a":
    case "c0.25_st":
    case "c0.25a_st":

    // Unknown
    case "c0.25_01":
    case "c0.25a_01":
    case "c0.25_st_01":
    case "c0.25a_st_01":

    // Lost
    case "c0.25_02":
    case "c0.25a_02":
    case "c0.25_st_02":
    case "c0.25a_st_02":

    // Lost
    case "c0.25_03":
    case "c0.25a_03":
    case "c0.25_st_03":
    case "c0.25a_st_03":

    // Lost
    case "c0.25_04":
    case "c0.25a_04":
    case "c0.25_st_04":
    case "c0.25a_st_04":

    case "c0.25_05":
    case "c0.25a_05":
    case "c0.25_05":
    case "c0.25a_st_05": 
      Version = "c0.25_05_st";
      break;

    // Lost
    case "c0.26":
    case "c0.26a":
    case "c0.26_st":
    case "c0.26a_st":

    case "c0.27":
    case "c0.27a":
    case "c0.27_st":
    case "c0.27a_st":

    // #endregion

    // #region Late Classic
    case "c0.27a": 
      Version = "c0.27_st";
      break;

    // Lost
    case "c0.28":
    case "c0.28a":

    case "c0.29a": 
      Version = "c0.29";
      break;

    case "c0.29a_01": 
      Version = "c0.29_01";
      break;

    case "c0.29a_02": 
      Version = "c0.29_02";
      break;

    case "c0.30-s": 
      Version = "c0.30-s-1858";
      break;

    // What does renew even mean here
    case "c0.30a":
    case "c0.30":
    case "c0.30-c":
    case "c0.30c":
    case "c0.30-c-2": 
      Version = "c0.30-c-1900-renew";
      break;

    case "c0.30-c-1": 
      Version = "c0.30-c-1900";
      break;

    // #endregion

    // #region Indev
    // #region Indev 0.31

    // Lost
    case "in-20091223-0040":
    case "in-20091223-1":

    // Lost
    case "in-20091223-1457":
    case "in-20091223-2":

    case "in-20091223-3":
    case "in-20091223":
    case "in-20091223": 
      Version = "in-20091223-1459";
      break;

    // Lost
    case "in-20091231-1856":
    case "in-20091231-1":

    // Lost
    case "in-20091231-2004":
    case "in-20091231-2":

    // Lost
    case "in-20091231-2013":
    case "in-20091231-3":

    // Lost
    case "in-20091231-2033":
    case "in-20091231-4":
    
    // Lost
    case "in-20091231-2147":
    case "in-20091223-5":

    case "in-20091231-6":
    case "in-20091231": 
      Version = "in-20091231-2255";
      break;

    // Lost
    case "in-20100104-2154":
    case "in-20100104-1":

    case "in-20100104-2":
    case "in-20100104": 
      Version = "in-20100104-2258";
      break;

    // Lost
    case "in-20100106-1655":
    case "in-20100106-1":

    // Lost
    case "in-20100106-2158":
    case "in-20100106-2":

    // Lost
    case "in-20100106-2220":
    case "in-20100106-3":
    case "in-20100106":

    // Lost
    case "in-20100107-1851":
    case "in-20100107-1":

    // Lost
    case "in-20100107-1947":
    case "in-20100107-2":

    // Lost
    case "in-20100107-2010":
    case "in-20100107-3":
    case "in-20100107":

    // Lost
    case "in-20100109-1939":
    case "in-20100109-1":

    // Lost
    case "in-20100109-2000":
    case "in-20100109-2":
    case "in-20100109":

    case "in-20100110-1939":
    case "in-20100110-1": 
      Version = "in-20100110";
      break;

    // Lost
    case "in-20100111-2210":
    case "in-20100111-1":
    case "in-20100111":

    // Lost
    case "in-20100112-20826":
    case "in-20100112-1":

    // Lost
    case "in-20100112-1949":
    case "in-20100112-2":
    case "in-20100112":

    // Lost
    case "in-20100113-2015":
    case "in-20100113-1":

    // Lost
    case "in-20100113-2244":
    case "in-20100113-2":
    case "in-20100113":

    // Lost
    case "in-20100114":

    // Lost
    case "in-20100122-1708":
    case "in-20100122-1":

    // Lost
    case "in-20100122-2251":
    case "in-20100122-2":
    case "in-20100122":

    // Lost
    case "in-20100124-2119":
    case "in-20100124-1":

    // Lost
    case "in-20100124-2134":
    case "in-20100124-2":

    case "in-20100124-3":
    case "in-20100124": 
      Version = "in-20100124-2310";
      break;

    case "in-20100125-2154": 
      Version = "in-20100125";
      break;

    // Lost
    case "in-20100128-2200":
    case "in-20100128-1":

    case "in-20100128-2":
    case "in-20100128": 
      Version = "in-20100128-2304";
      break;

    // Lost
    case "in-20100129-1447":
    case "in-20100129-1":

    case "in-20100129-2":
    case "in-20100129": 
      Version = "in-20100129-1452";
      break;

    // Lost
    case "in-20100129-2129":
    case "in-20100129-3":

    // Lost
    case "in-20100129-2134":
    case "in-20100129-4":

    // Lost
    case "in-20100129-2138":
    case "in-20100129-5":
      
    // Lost
    case "in-20100129-2158":
    case "in-20100129-6":
      
    // Lost
    case "in-20100129-2209":
    case "in-20100129-7":
      
    // Lost
    case "in-20100129-2332":
    case "in-20100129-8":

    // Lost
    case "in-20100130-0057":
    case "in-20100130-1":
    case "in-20100130-0109":
    case "in-20100130-2": 
      Version = "in-20100130";
      break;

    // Lost
    case "in-20100131-2156":
    case "in-20100131-1":
    case "in-20100131-2229":
    case "in-20100131-2":
    case "in-20100131-2236":
    case "in-20100131-3":

    // Lost
    case "in-20100131-2241":
    case "in-20100131-4":
    
    case "in-20100131-5":
    case "in-20100131": 
      Version = "in-20100131-2244";
      break;

    case "in-20100201-1": 
      Version = "in-20100201-2025";
      break;

    case "in-20100201-2": 
      Version = "in-20100201-2227";
      break;

    case "in-20100202-2157":
    case "in-20100202-1":
    case "in-20100202-2311":
    case "in-20100202-2":
    case "in-20100202-2326":
    case "in-20100202-3":
    case "in-20100202-4":
    case "in-20100202": 
      Version = "in-20100202-2330";
      break;

    // Lost
    case "in-20100204-1541":
    case "in-20100204-1":

    // Lost
    case "in-20100204-2027":
    case "in-20100204-2":

    // Lost
    case "in-20100204-2153":
    case "in-20100204-3":
    case "in-20100204":

    // Lost
    case "in-20100205-1558":
    case "in-20100205-1":

    // Lost
    case "in-20100205-2241":
    case "in-20100205-2":
    case "in-20100205":

    // Lost
    case "in-20100206-1437":
    case "in-20100206-1":

    // #endregion

    // Lost
    case "in-20100206-2034":
    case "in-20100206-2":

    case "in-20100206-3":
    case "in-20100206": 
      Version = "in-20100206-2103";
      break;

    // Lost
    case "in-20100207-1057":
    case "in-20100207-1":
      
    case "in-20100207-2": 
      Version = "in-20100207-1101";
      break;

    // Lost
    case "in-20100207-1647":
    case "in-20100207-3":

    case "in-20100207-4": 
      Version = "in-20100207-1703";
      break;

    // Lost
    case "in-20100211-2327":
    case "in-20100211-1":

    // Lost
    case "in-20100211-2333":
    case "in-20100211-2":

    // Lost
    case "in-20100211-2340":
    case "in-20100211-3":
    case "in-20100211":

    case "in-20100212-1": 
      Version = "in-20100212-1210";
      break;

    case "in-20100212-2": 
      Version = "in-20100212-1622";
      break;

    case "in-20100213-2258":
    case "in-20100213-1":
    case "in-20100213": 
      Version = "in-20100213";
      break;

    case "in-20100214-2143":
    case "in-20100214-1": 
      Version = "in-20100214";
      break;

    // Lost
    case "in-20100218-20011":
    case "in-20100218-1":
      
    case "in-20100218-2":
    case "in-20100218": 
      Version = "in-20100218-2016";
      break;

    case "in-20100219-1": 
      Version = "in-20100219";
      break;

    case "in-20100223-1": 
      Version = "in-20100223";
      break;

    // #endregion

    // #region Infdev

    // Lost
    case "inf-20100227-1414":
    case "inf-20100227-1":

    case "inf-20100227-2": 
      Version = "inf-20100227-1433";
      break;

    case "inf-20100313-1": 
      Version = "inf-20100313";
      break;

    case "inf-20100316-1": 
      Version = "inf-20100316";
      break;

    case "inf-20100320-1": 
      Version = "inf-20100320";
      break;

    case "inf-20100321-1": 
      Version = "inf-20100321-1817";
      break;

    // Lost
    case "inf-20100325-1545":
    case "inf-20100325-1":
    
    case "inf-20100325-2":
    case "inf-20100325": 
      Version = "inf-20100325-1640";
      break;

    case "inf-20100327-1": 
      Version = "inf-20100327";
      break;

    // Lost
    case "inf-20100330-1203":
    case "inf-20100330-1":

    // Not perfect but exists
    case "inf-20100330-2":
    case "inf-20100330": 
      Version = "inf-20100330-1511";
      break;

    // Lost
    case "inf-20100413-1949":
    case "inf-20100413-1":
    
    case "inf-20100413-2":
    case "inf-20100413": 
      Version = "inf-20100413-1953";
      break;
    
    case "inf-20100414-1":
      Version = "inf-20100414";
      break;
    
    case "inf-20100415-1":
      Version = "inf-20100415";
      break;
    
    case "inf-20100420-1":
      Version = "inf-20100420";
      break;
    
    case "inf-20100607-1":
      Version = "inf-20100607";
      break;
    
    case "inf-20100608-1":
      Version = "inf-20100608";
      break;
    
    case "inf-20100611-1":
      Version = "inf-20100611";
      break;
    
    case "inf-20100615-1":
      Version = "inf-20100615";
      break;
    
    case "inf-20100616-1":
    case "inf-20100616": 
      Version = "inf-20100616-1808";
      break;
    
    // Lost
    case "inf-20100616-2210":
    case "inf-20100616-2": 
    
    case "inf-20100617-1": 
      Version = "inf-20100617-1205";
      break;
    
    case "inf-20100617-2": 
      Version = "inf-20100617-1531";
      break;
    
    case "inf-20100618-1": 
      Version = "inf-20100618";
      break;
    
    case "inf-20100624-1": 
      Version = "inf-20100624";
      break;
    
    case "inf-20100625-1": 
      Version = "inf-20100625-0922";
      break;
    
    case "inf-20100625-2": 
      Version = "inf-20100625-1917";
      break;
    
    case "inf-20100627-1": 
      Version = "inf-20100627";
      break;
    
    case "inf-20100629-1": 
      Version = "inf-20100629";
      break;
    
    case "inf-20100630-1": 
      Version = "inf-20100630-1340";
      break;
    
    case "a1.0.0":
    case "inf-20100630-2": 
      Version = "inf-20100630-1835";
      break;

    // #endregion

    // #region Alpha

    // Lost
    case "a1.0.1": 
      Version = "a1.0.1_01";
      break;

    // Lost
    case "a1.0.2": 
      Version = "a1.0.2_01";
      break;

    case "a1.0.4-1": 
      Version = "a1.0.4";
      break;

    case "a1.0.4":
    case "a1.0.4-2": 
      Version = "a1.0.4-launcher";
      break;

    case "a1.0.5":
    case "a1.0.5-1":
    case "a1.0.5-2": 
      Version = "a1.0.5-2149";
      break;

    // Lost
    case "a1.0.6_02": 
      Version = "a1.0.6_03";
      break;

    // Lost
    case "a1.0.8": 
      Version = "a1.0.8_01";
      break;

    case "a1.0.13_01":
    case "a1.0.13_01-1": 
      Version = "a1.0.13_01-1038";
      break;

    case "a1.0.13_01-2": 
      Version = "a1.0.13_01-1444";
      break;

    case "a1.0.14-1": 
      Version = "a1.0.14-1603";
      break;

    case "a1.0.14":
    case "a1.0.14-2": 
      Version = "a1.0.14-1659";
      break;

    case "a1.0.14-3": 
      Version = "a1.0.14-1659-launcher";
      break;

    // Lost
    case "a1.0.17":

    // Lost
    case "alpha 1.0.17_01": 
      Version = "a1.0.17_02";
      break;

    case "a1.1.0-1": 
      Version = "a1.1.0-101847";
      break;

    case "a1.1.0":
    case "a1.1.0-2": 
      Version = "a1.1.0-131933";
      break;

    case "a1.1.0-3": 
      Version = "a1.1.0-101847-launcher";
      break;

    // Lost
    case "a1.2.0-1":
    case "a1.2.0 (preview)":
    case "a1.2.0 (pc gamer)":

    case "a1.2.0":
    case "a1.2.0-2":
    case "a1.2.0-3": 
      Version = "a1.2.0-2057";
      break;

    case "a1.2.0_02":
    case "a1.2.0_02-1":
      Version = "a1.2.0_02";
      break;

    case "a1.2.0_02-2": 
      Version = "a1.2.0_02-launcher";
      break;

    // Lost
    case "a1.2.1": 
      Version = "a1.2.1_01";
      break;

    case "a1.2.2-1": 
      Version = "a1.2.2-1624";
      break;

    case "a1.2.2":
    case "a1.2.2-2": 
      Version = "a1.2.2-1938";
      break;

    case "a1.2.3_01-1": 
      Version = "a1.2.3_01-0956";
      break;

    case "a1.2.3_01":
    case "a1.2.3_01-2": 
      Version = "a1.2.3_01-0958";
      break;

    // Unknown
    case "a1.2.3_03": 
      Version = "a1.2.3_04";
      break;

    // how many times are they gonna leave debug stuff in
    case "a1.2.4": 
      Version = "a1.2.4_01";
      break;

    // #endregion

    // #region Beta

    case "b1.0_02":
    case "b1.0_02-1":
    case "b1.0_02-2": 
      Version = "b1.0.2-0841";
      break;

    case "b1.1-1": 
      Version = "b1.1-1245";
      break;

    case "b1.1-2": 
      Version = "b1.1-1255";
      break;

    case "b1.1.1": 
      Version = "b1.1_01";
      break;

    case "b1.1.2": 
      Version = "b1.1_02";
      break;

    case "b1.2.1": 
      Version = "b1.2_01";
      break;

    case "b1.2.2":
    case "b1.2_02-1": 
      Version = "b1.2_02";
      break;

    case "b1.2_02-2": 
      Version = "b1.2_02-launcher";
      break;

    case "b1.2_02 (20110517)":
    case "b1.2_02-20110517":
    case "b1.2_02-3": 
      Version = "b1.2_02-dev";
      break;

    case "b1.3-1": 
      Version = "b1.3-1713";
      break;

    case "b1.3-2": 
      Version = "b1.3-1733";
      break;
    
    case "b1.3":
    case "b1.3-3": 
      Version = "b1.3-1750";
      break;

    // Check back later to see if its 1.3_01 or 1.3
    case "b1.3 demo": 
    case "b1.3 pc gamer": 
    case "b1.3_01 demo": 
    case "b1.3_01 pc gamer": 
    case "b1.3-4": 
      Version = "b1.3-demo";
      break;

    case "b1.3.1": 
      Version = "b1.3_01";
      break;

    case "b1.4-1": 
      Version = "b1.4-1507";
      break;

    case "b1.4":
    case "b1.4-2": 
      Version = "b1.4-1634";
      break;

    case "b1.4.1": 
      Version = "b1.4_01";
      break;

    case "b1.5.1": 
      Version = "b1.5_01";
      break;

    case "b1.6 test build 3": 
    case "b1.6 test build": 
    case "b1.6 tb3": 
      Version = "b1.6-tb3";
      break;

    case "b1.6_01": 
      Version = "b1.6.1";
      break;

    case "b1.6_02": 
      Version = "b1.6.2";
      break;

    case "b1.6_03": 
      Version = "b1.6.3";
      break;

    case "b1.6_04": 
      Version = "b1.6.4";
      break;

    case "b1.6_05": 
      Version = "b1.6.5";
      break;

    case "b1.6_06": 
      Version = "b1.6.6";
      break;

    case "b1.7.1": 
      Version = "b1.7_01";
      break;

    case "b1.7_02": 
      Version = "b1.7.2";
      break;

    case "b1.7_03": 
      Version = "b1.7.3";
      break;

    case "b1.8-pre-1":
    case "b1.8-pre1-1": 
      Version = "b1.8-pre1-081459";
      break;

    case "b1.8-pre":
    case "b1.8-pre1":
    case "b1.8-pre1-2": 
      Version = "b1.8-pre1-091358";
      break;

    case "b1.8-pre2-1": 
      Version = "b1.8-pre2-121559"
      break;

    case "b1.8-pre2 ;)":
    case "b1.8-pre2":
    case "b1.8-pre2-2": 
      Version = "b1.8-pre2-131225";
      break;

    case "b1.8_01": 
      Version = "b1.8.1";
      break;

    case "b1.9":
    case "b1.9-pre": 
      Version = "b1.9-pre1";
      break;

    case "b1.9-pre3-1":
    case "b1.9-pre3-2": 
      Version = "b1.9-pre3-1350";
      break;

    case "b1.9-pre3":
    case "b1.9-pre3-3": 
      Version = "b1.9-pre3-1402";
      break;

    case "b1.9-pre4-1": 
      Version = "b1.9-pre4-1415";
      break;

    case "b1.9-pre4":
    case "b1.9-pre4-2": 
      Version = "b1.9-pre4-1435";
      break;

    case "rc1":  
      Version = "1.0.0-rc1";
      break;

    case "rc2-1": 
      Version = "1.0.0-rc2-1633";
      break;

    case "rc2-2": 
      Version = "1.0.0-rc2-1649";
      break;

    case "rc2":
    case "rc2-3": 
      Version = "1.0.0-rc2-1656";
      break;

    case "1.0.0 tominecon":
    case "1.0 tominecon": 
      Version = "1.0.0-tominecon";
      break;

    case "1.0": 
      Version = "1.0.0";
      break;

    // #endregion

    // #region Random Reuploads
      case "12w05a-1": 
        Version = "12w05a-1354";
        break;

      case "12w05a":
      case "12w05a-2": 
        Version = "12w05a-1442";
        break;

      // Wiki says nothing of a rerelease?
      case "12w17a":
      case "12w17a-1":
      case "12w17a-1": 
        Version = "12w17a-1424";
        break;

      // Wiki says nothing of a rerelease?
      case "1.3-pre":
      case "1.3-pre-1":
      case "1.3-pre-2":
      case "1.3": 
        Version = "1.3-pre-1249";
        break;

      // Wiki says nothing of a rerelease?
      case "12w32a":
      case "12w32a-1":
      case "12w32a-2": 
        Version = "12w32a-1532";
        break;

      case "1.4.1-pre":
      case "1.4.1-pre-1":
      case "1.4.1-pre-2": 
        Version = "1.4.1-pre-1338";
        break;

      case "1.4.3": 
        Version = "1.4.3-pre";
        break;

      case "1.4.6-pre":
      case "1.4.6-pre-2": 
        Version = "1.4.6-pre-1521";
        break;

      case "1.4.5-pre":
      case "1.4.5-pre-1": 
        Version = "1.4.5-pre-160924";
        break;

      case "1.4.6-pre-1": 
        Version = "1.4.6-pre-1428";
        break;

      case "1.4.6-pre":
      case "1.4.6-pre-2": 
        Version = "1.4.6-pre-1521";
        break;

      case "13w02a-1":
      case "13w02a": 
        Version = "13w06a-1636";
        break;

      case "13w02a-2": 
        Version = "13w02a-whitetexturefix";
        break;

      // Original was lost </3, funny bug tho
      case "13w03a-2": 
        Version = "13w03a-1613";
        break;

      case "13w03a-1":
      case "13w03a-3":
      case "13w03a": 
        Version = "13w03a-1647";
        break;

      case "13w04a-2": 
        Version = "13w04a-whitelinefix";
        break;

      case "13w04a-1":
        Version = "13w04a";
        break;

      case "13w05a-1": 
        Version = "13w05a-1504";
        break;

      case "13w05a-2":
      case "13w05a": 
        Version = "13w05a-1538";
        break;

      case "13w06a-1": 
        Version = "13w06a-1559";
        break;

      case "13w06a-2":
      case "13w06a": 
        Version = "13w06a-1636";
        break;

      case "13w36a-1": 
        Version = "13w36a-1234";
        break;

      case "13w36a-2":
      case "13w36a": 
        Version = "13w36a-1446";
        break;

      // 3rd times the charm
      case "1.5-pre-1":
      case "1.5-pre": 
        Version = "1.5-pre-071309";
        break;

      case "1.5-pre-2": 
        Version = "1.5-pre-whitelinefix";
        break;

      // Temporary or otherwise why break the scheme :(
      case "13w12~":
      case "13w12a":
      case "13w12~-1":
      case "13w12~-2": 
        Version = "13w12~-1439";
        break;

      case "1.5.1-pre":
      case "1.5.1-pre-1": 
        Version = "1.5.1-pre-191519";
        break;

      case "1.5.1-pre-2": 
        Version = "1.5.1";
        break;

      case "2":
      case "2.0": 
        Version = "2.0-purple";
        break;

      // How do you mess up this badly
      case "13w16a-2": 
        Version = "13w16a-181812";
        break;

      case "13w16a-3": 
        Version = "13w16a-191517";
        break;

      case "13w16a-4":
      case "13w16a-1":
      case "13w16a": 
        Version = "13w16a-192037";
        break;
      
      case "13w16b-2":
      case "13w16b-1":
      case "13w16b": 
        Version = "13w16b-2151";
        break;
      
      case "1.5.2-pre-1":
      case "1.5.2-pre": 
        Version = "1.5.2-pre-250703";
        break;

      case "1.5.2-pre-2": 
        Version = "1.5.2";
        break;
      
      case "13w23b-2":
      case "13w23b-1":
      case "13w23b": 
        Version = "13w23b-0101";
        break;

      case "1.6-pre-1":
      case "1.6-pre-2": 
      case "1.6-pre": 
        Version = "1.6-pre-1517";
        break;

      case "1.6.2-pre-1":
      case "1.6.2-pre-2":
      case "1.6.2-pre-3":
      case "1.6.2-pre": 
        Version = "1.6.2-pre-1426";
        break;

      case "1.6.2-1": 
        Version = "1.6.2-080933";
        break;

      case "1.6.2-2":
      case "1.6.2": 
        Version = "1.6.2-091847";
        break;

      case "1.6.3-pre-1": 
        Version = "1.6.3-pre-131100";
        break;

      case "1.6.3-pre-2":
      case "1.6.3-pre":
      case "1.6.3": 
        Version = "1.6.3-pre-171231";
        break;

      case "13w36a-1": 
        Version = "13w36a-1234";
        break;

      case "13w36a-2":
      case "13w36a": 
        Version = "13w36a-1446";
        break;
      
      case "13w36b-1":
      case "13w36b-2":
      case "13w36b": 
        Version = "13w36b-1307";
        break;
      
      case "13w36b-1":
      case "13w36b-2":
      case "13w36b-3":
      case "13w36b": 
        Version = "13w36b-1307";
        break;
          
      case "1.6.3-pre-1": 
        Version = "1.6.3-pre-131100";
        break;

      case "1.6.3-pre-2":
      case "1.6.3-pre": 
        Version = "1.6.3-pre-171231";
        break;
      
      case "13w38c-1":
      case "13w38c-2":
      case "13w38c": 
        Version = "13w38c-1516";
        break;

      case "1.7-pre-1":
      case "1.7-pre-2":
      case "1.7":
      case "1.7-pre": 
        Version = "1.7-pre-1602";
        break;

      case "1.7-pre-1":
      case "1.7-pre-2":
      case "1.7-pre": 
        Version = "1.7-pre-1602";
        break;

      case "1.7.7-1": 
        Version = "1.7.7-091529";
        break;

      case "1.7.7-2":
      case "1.7.7": 
        Version = "1.7.7-101331";
        break;

      case "14w11b-1":
      case "14w11b-2":
      case "14w11b": 
        Version = "14w11b-1650";
        break;

      case "1.7.10-pre2-1":
      case "1.7.10-pre2-2": 
      case "1.7.10-pre2": 
        Version = "1.7.10-pre2-1045";
        break;

      case "14w27b-1":
      case "14w27b-2":
      case "14w27b": 
        Version = "14w27b-1646";
        break;
      
      case "14w27b-1":
      case "14w27b-2":
      case "14w27b": 
        Version = "14w27b-1646";
        break;

      case "14w34c-1":
      case "14w34c-2":
      case "14w34c": 
        Version = "14w34c-1549";
        break;

      case "15w48a": 
        Version = "15w47c";
        break; // Delete Later
              
      case "17w13a-1": 
        Version = "17w13a-0805";
        break;

      case "17w13a-2":
      case "17w13a": 
        Version = "17w13a-0932";
        break;
      
      case "1.12-pre3-1": 
        Version = "1.12-pre3-1316";
        break;

      case "1.12-pre3-2":
      case "1.12-pre3": 
        Version = "1.12-pre3-1409";
        break;

      case "19w13b-1": 
        Version = "19w13b-1316";
        break;

      case "19w13b-2":
      case "19w13b": 
        Version = "19w13b-1653";
        break;

      case "3d shareware v1.34": 
        Version = "3D Shareware v1.34";
        break;
      
      case "1.14.2-pre4-1": 
        Version = "1.14.2-pre4-24154";
        break;

      case "1.14.2-pre4-2":
      case "1.14.2-pre4": 
        Version = "1.14.2-pre4-270720";
        break;
      
      case "20w14∞": 
        Version = "20w14infinite";
        break;
      
      case "1.16-1": 
        Version = "1.16-221349";
        break;

      case "1.16-2":
      case "1.16": 
        Version = "1.16-231620";
        break;
      
      case "1.16.5-rc-1": 
        Version = "1.16.5-rc1-1005";
        break;

      case "1.16.5-rc1-2":
      case "1.16.5-rc1": 
        Version = "1.16.5-rc1-1558";
        break;
      
      case "1.16.5-rc-1": 
        Version = "1.16.5-rc1-1005";
        break;

      case "1.16.5-rc1-2":
      case "1.16.5-rc1": 
        Version = "1.16.5-rc1-1558";
        break;

      case "1.19 deep dark-exp1":
      case "deep dark-exp1":
        Version = "1.19-exp1"
        break;
      
      case "22w12oneblockatatime":
      case "22w13aoneblockatatime": 
        Version = "22w13oneblockatatime";
        break; // Remove later

      case "23w13a_or_b-1": 
        Version = "23w13a_or_b-0722";
        break;

      case "23w13a_or_b-2":
      case "23w13a_or_b": 
        Version = "23w13a_or_b-1249";
        break;
      
      case "24w14potato-1": 
        Version = "24w14potato-0838";
        break;

      case "24w14potato-2":
      case "24w14potato": 
        Version = "24w14potato-1104";
        break;

      // #endregion
    }

    previousVer = Version
    return Version;
}

export async function CreateVerFile() {
  
  // Grabs version info from omniarchive (thank you so much Ouroya!)
  const Omni_URL = "https://corsproxy.io/?url=https://meta.omniarchive.uk/v1/manifest.json";

  let omniRes = await fetch(Omni_URL, { method: "Get" })
  let OmniComplete = await omniRes.json();
    
  // Sets omni to be version data only instead of including latest update
  Omni = OmniComplete.versions;

  for(let i = 0; i < Omni.length; i++)
  {
    // Changes 2013 rereleases to fake dates so they're together with their equivelent versions
    if(Omni[i].id == "c0.0.11a-launcher") Omni[i].releaseTime = new Date("2009-05-18T00:00:00+00:00");
    else if (Omni[i].id == "c0.0.13a-launcher") Omni[i].releaseTime = new Date("2009-05-21T00:00:00+00:00");

    // Changes c0.30-c-1900-renew's date because they decided to make another in 2011
    else if(Omni[i].id == "c0.30-c-1900-renew") Omni[i].releaseTime = new Date("2009-12-01T00:00:00+00:00");
  }

  const mcdf_URL = "https://corsproxy.io/?url=https://mcdf.wiki.gg/wiki/Special:CargoExport?tables=Version_Range%2C&&fields=Version_Range._pageName%2C+Version_Range.Start%2C+Version_Range.End%2C&&order+by=&limit=2000&format=json";

  // Thank god for tutorials
  const mcdfRes = await fetch(mcdf_URL, { method: "Get" })
  let mcdf: MCDF_Articles = await mcdfRes.json();

  let BannedSymbols: string[] = ["≤ ", "≤", "≈", "≈ ", "~", "~ ", "≥", "≥ "];
  let CutoffSymbols: string[] = ["&", "/"];

  // Sanitise data
  for(let i = 0; i < mcdf.length; i++)
  {
    // Converts it into string
    if(mcdf[i].Start != null) mcdf[i].Start = mcdf[i].Start.toString();
    if(mcdf[i].End != null) mcdf[i].End = mcdf[i].End.toString();

    // If null or ? convert it to the other one
    if(mcdf[i].End == null) mcdf[i].End = mcdf[i].Start;
    else if (mcdf[i].End.substring(0, 1) == "?") mcdf[i].End = mcdf[i].Start;
    
    if(mcdf[i].Start == null) mcdf[i].Start = mcdf[i].End;
    else if (mcdf[i].Start.substring(0, 1) == "?") mcdf[i].Start = mcdf[i].End;

    // Removes any deleted - reintroduced ranges
    if(mcdf[i].End.includes("reintoducedversion") || mcdf[i].End.includes("server") || !mcdf[i]._pageName.includes("Java Edition:"))
    {
      mcdf.splice(mcdf.indexOf(mcdf[i]), 1);
      i--;
      continue;
    }

    // Removes Lost Version Discontinued Feature as otherwise it'd link to a real version and will confuse people
    if(mcdf[i]._pageName == "Java Edition:Lost Version Discontinued Feature") 
    {
      mcdf.splice(mcdf.indexOf(mcdf[i]), 1);
      i--;
      continue;
    }


    // Removed banned symbols
    BannedSymbols.forEach(banned => {
      mcdf[i].Start = mcdf[i].Start.replace(banned, "");
      mcdf[i].End = mcdf[i].End.replace(banned, "");
    });

    mcdf[i]._pageName = mcdf[i]._pageName.replace("&quot", '"');
    mcdf[i]._pageName = mcdf[i]._pageName.replace("&#039;", "'");

    // If it uses present template then manually update it to current
    if((mcdf[i].End).includes("present") ) mcdf[i].End = Omni[0].id;

    // Removes "Needs Tested" and Removes space before &.
    // I.e (1.4.4 &[text]) into (1.4.4) if there is else just removes &
    CutoffSymbols.forEach(cutoff => {
      if(mcdf[i].Start.includes(cutoff))
      {
        let abseantIndex = mcdf[i].Start.indexOf(cutoff) - 1;
        if(mcdf[i].Start.substring(abseantIndex, abseantIndex + 1) == " ") mcdf[i].Start = mcdf[i].Start.substring(0, mcdf[i].Start.indexOf(cutoff) - 1);
        else mcdf[i].Start = mcdf[i].Start.split(cutoff)[0];
      }
      
      if(mcdf[i].End.includes(cutoff))
      {
        let abseantIndex = mcdf[i].End.indexOf(cutoff) - 1;
        if(mcdf[i].End.substring(abseantIndex, abseantIndex + 1) == " ") mcdf[i].End = mcdf[i].End.substring(0, mcdf[i].End.indexOf(cutoff) - 1);
        else mcdf[i].End = mcdf[i].End.split(cutoff)[0];
      }
    });

    mcdf[i].StartDisplay = mcdf[i].Start;
    mcdf[i].EndDisplay = mcdf[i].End;

    // Lowercases update names like Omni
    mcdf[i].Start = (mcdf[i].Start).toLowerCase();
    mcdf[i].End = (mcdf[i].End).toLowerCase();

    mcdf[i].Start = UpdateVersionID(mcdf[i].Start);
    mcdf[i].End = UpdateVersionID(mcdf[i].End);
  }

  // Snips off the start and end item as theres some stragglers
  mcdf = mcdf.splice(1, mcdf.length - 2);

  // Create Article Data
  let Articles: ArticleData[] = [];
  let previousArticle: ArticleData = CreateArticle(mcdf[0]);
  Articles.push(previousArticle);
  for(let i = 1; i < mcdf.length; i++)
  {
    // Checks if is a diffrent range the same article
    console.log(mcdf[i]);
    if("Java Edition:" + previousArticle.Title == mcdf[i]._pageName)
    {
      let UpdateIndex
      UpdateIndex = (UpdateInfo: OmniVer) => UpdateInfo.id == mcdf[i].Start;
      const StartUpdateInfo = Omni[Omni.findIndex(UpdateIndex)];

      let EndUpdateInfo;

      // If null then it only existed for 1 version and if its ? then say screw it
      if(mcdf[i].End != mcdf[i].Start)
      {
        UpdateIndex = (UpdateInfo: OmniVer) => UpdateInfo.id == mcdf[i].End;
        EndUpdateInfo = Omni[Omni.findIndex(UpdateIndex)];
      }
      else EndUpdateInfo = StartUpdateInfo;

      let StartRelease = "";
      let EndRelease = "";
      if(StartUpdateInfo.phase == "post-1.0") 
      {
        StartRelease = FindReleaseUpdate(StartUpdateInfo.id).id;
        StartRelease = StartRelease.split("-")[0] // cuts off before the timecode (thanks 1.16)
      }
      if(EndUpdateInfo.phase == "post-1.0") 
      {
        EndRelease = FindReleaseUpdate(EndUpdateInfo.id).id;
        EndRelease = EndRelease.split("-")[0] // cuts off before the timecode (thanks 1.16)
      }

      previousArticle.Range.push({
        StartId: mcdf[i].Start,
        StartDisplay: mcdf[i].StartDisplay,
        StartDate: StartUpdateInfo.releaseTime,
        StartRelease: StartRelease,

        EndId: mcdf[i].End,
        EndDisplay: mcdf[i].EndDisplay,
        EndDate: EndUpdateInfo.releaseTime,
        EndRelease: EndRelease,
      });

    }
    else 
    {
      Articles.push(CreateArticle(mcdf[i]));
      previousArticle = Articles[Articles.length - 1]
    }
  };

  // Sorts each range by date of first occurance
  Articles.forEach(article => {
    article.Range.sort((a, b) => new Date(a.StartDate).getTime() - new Date(b.StartDate).getTime());
  });

  // Sorts each article in order (new Date([VersionDate]) neccessary because of https://stackoverflow.com/questions/2627650/why-javascript-gettime-is-not-a-function)
  Articles.sort((a, b) => new Date(a.Range[0].StartDate).getTime() - new Date(b.Range[0].StartDate).getTime());

  return Articles;
}

export function CreateArticle(Data: MCDF_Article)
{
  // Precomputes info
  let StartUpdateIndex, EndUpdateIndex;

  StartUpdateIndex = (UpdateInfo: OmniVer) => UpdateInfo.id == Data.Start;
  const StartUpdateInfo = Omni[Omni.findIndex(StartUpdateIndex)];

  EndUpdateIndex = (UpdateInfo: OmniVer) => UpdateInfo.id == Data.End;
  const EndUpdateInfo = Omni[Omni.findIndex(EndUpdateIndex)];

  console.log(Data.End)

  // Assings dummy date as it will be done later after sorting all articles and sorting their ranges
  let FullReleaseDate: Date = new Date(); 

  let StartRelease = "";
  let EndRelease = "";
  if(StartUpdateInfo.phase == "post-1.0") 
  {
    StartRelease = FindReleaseUpdate(StartUpdateInfo.id).id;
    StartRelease = StartRelease.split("-")[0] // cuts off before the timecode (thanks 1.16)
  }
  if(EndUpdateInfo.phase == "post-1.0") 
  {
    EndRelease = FindReleaseUpdate(EndUpdateInfo.id).id;
    EndRelease = EndRelease.split("-")[0] // cuts off before the timecode (thanks 1.16)
  }

  return {

  Range: [({
      StartId: Data.Start,
      StartDisplay: Data.StartDisplay,
      StartDate: StartUpdateInfo.releaseTime,
      StartRelease: StartRelease,

      EndId: Data.End,
      EndDisplay: Data.EndDisplay,
      EndDate: EndUpdateInfo.releaseTime,
      EndRelease: EndRelease,
    })],
    
  // Removes the "Java Edition:" from page names
  Title: Data._pageName.substring(Data._pageName.indexOf(":") + 1),

  // Assigns it the edition
  Edition: Data._pageName.split(':')[0],

  FullReleaseDate: FullReleaseDate,

  };
}

export function FindReleaseUpdate(Update: string)
{
  let UpdateIndex;
  UpdateIndex = (Info: OmniVer) => Info.id == Update;
  const UpdateInfo = Omni[Omni.findIndex(UpdateIndex)];

  let FullRelease: OmniVer = { phase: "", type: "", releaseTime: new Date(), id: "", };
  if(UpdateInfo.phase != "post-1.0") return UpdateInfo;
  else
  {
    for(let i = Omni.findIndex(UpdateIndex); i > 0; i--)
    {
      if(Omni[i].type == "release" || i <= 0) return FullRelease = Omni[i];
    }
  }

  return Omni[0]; // Only when latest
}

app.listen(port, () => {
  CreateVerFile() // Creates new ver on start
  console.log(`Example app listening on port ${port}`);
})