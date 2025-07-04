import express from 'express';
import fs from 'fs';
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
let Omni: OmniVerions;

app.get('/', async (req, res) => {
  res.send(fs.readFileSync("./src/website/index.html").toString())
});

let previousVer: string // Only used when end ver is null signifying that it was only for the one version
function UpdateVersionID(Version: string)
{
  switch(Version)
  {
    // #region Pre-Classic
    // Unreleased
    case "cave game tech test":
    case "cave game": 

    case "rd-132211": // CEST
    case "rd-132011": // UTC
    case "pre-classic rd-132211": // CEST
    case "pre-classic rd-132011": Version = "pc-132011-launcher"; // UTC

    case "rd-132328": // CEST
    case "rd-132128": // UTC
    case "pre-classic rd-132128": // CEST
    case "pre-classic rd-132011": Version = "pc-132011-launcher";

    // Unreleased
    case "rd-20090515": // CEST
    case "rd-20090315": // UTC
    case "rd-160015": // CEST
    case "rd-152215": // UTC
    case "pre-classic rd-20090515": // CEST
    case "pre-classic rd-20090315": // UTC
    case "pre-classic rd-160015": // CEST
    case "pre-classic rd-152215": // UTC

    case "rd-160052": // CEST
    case "rd-152252": // UTC
    case "pre-classic rd-152252": // CEST
    case "pre-classic rd-160052": Version = "pc-152252-launcher"; // UTC

    case "rd-161348": // CEST
    case "rd-161148": // UTC
    case "pre-classic rd-161348": // CEST
    case "pre-classic rd-161148": Version = "pc-161148-launcher"; // UTC

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

    // Skip
    case "classic 0.0.1a":
    case "c0.0.1a":

    // Unreleased
    case "classic 0.0.2a":
    case "c0.0.2a":

    // Unreleased
    case "classic 0.0.3a":
    case "c0.0.3a":

    // Skipped
    case "classic 0.0.4a":
    case "c0.0.4a":
    case "classic 0.0.5a":
    case "c0.0.5a":
    case "classic 0.0.6a":
    case "c0.0.6a":
    case "classic 0.0.7a":
    case "c0.0.7a":
    case "classic 0.0.8a":
    case "c0.0.8a":

    // Unreleased
    case "classic 0.0.9a":
    case "c0.0.9a":

    // Unreleased
    case "classic 0.0.10a":
    case "c0.0.10a":
      
    // Lost bar early dev of 12a
    case "classic 0.0.11a":
    case "c0.0.11a":
    case "classic 0.0.11a-launcher": Version = "c0.0.11a-launcher";
    
    // Lost
    case "classic 0.0.12a":
    case "c0.0.12a":

    // Lost
    case "classic 0.0.12a_01":
    case "c0.0.12a_01":

    // Lost
    case "classic 0.0.12a_02":
    case "c0.0.12a_02":

    // Lost
    case "classic 0.0.12a_03-1":
    case "c0.0.12a_03-1":
    case "classic 0.0.12a_03-2":
    case "c0.0.12a_03-2":
    case "classic 0.0.12a_03": Version = "c0.0.12a_03-200018";

    case "classic 0.0.13a":
    case "c0.0.13a": Version = "c0.0.13a-launcher"
    
    // Skipped
    case "classic 0.0.13a_01":
    case "c0.0.13a_01":
    case "classic 0.0.13a_02":
    case "c0.0.13a_02":
    
    // Lost
    case "classic 0.0.13a_03-1":
    case "classic 0.0.13a_03": Version = "c0.0.13a_03";
    
    case "classic 0.0.13a_03-2":
    case "classic 0.0.13a-launcher": Version = "c0.0.13a_03-launcher";
    
    // Lost
    case "classic 0.0.14a":
    case "c0.0.14a":
    
    // Lost
    case "classic 0.0.14a_01":
    case "c0.0.14a_01":
    
    // Unknown
    case "classic 0.0.14a_02":
    case "c0.0.14a_02":

    // Lost
    case "classic 0.0.14a_03":
    case "c0.0.14a_03":

    // Lost
    case "classic 0.0.14a_04":
    case "c0.0.14a_04":

    // Lost
    case "classic 0.0.14a_05":
    case "c0.0.14a_05":

    // Lost
    case "classic 0.0.14a_06":
    case "c0.0.14a_06":

    // Lost
    case "classic 0.0.14a_07":
    case "c0.0.14a_07":
      
    case "classic 0.0.14a_08": Version = "c0.0.14a_08";
    
    // #region Multiplayer Tests
    // Lost bar rerelease
    case "classic 0.0.15a-1":
    case "c0.0.15a-1":
    case "classic 0.0.15a":
    case "c0.0.15a": Version = "c0.0.15a-05311904";
    
    // Lost
    case "classic 0.0.15a-2":
    case "c0.0.15a-2":
    
    // Lost
    case "classic 0.0.15a-3":
    case "c0.0.15a-3":
    
    // Lost
    case "classic 0.0.15a-4":
    case "c0.0.15a-4":
    
    // Lost
    case "classic 0.0.15a-5":
    case "c0.0.15a-5":
    
    // Lost
    case "classic 0.0.15a-6":
    case "c0.0.15a-6":
    
    // Lost
    case "classic 0.0.15a-7":
    case "c0.0.15a-7":
    
    // Lost
    case "classic 0.0.15a-8":
    case "c0.0.15a-8":

    // #endregion
    
    // Lost
    case "classic 0.0.15a_01":
    case "c0.0.15a_01":

    // Lost
    case "classic 0.0.15a_01":
    case "c0.0.15a_01":

    // Lost
    case "classic 0.0.15a_02":
    case "c0.0.15a_02":

    // Unknown
    case "classic 0.0.15a_03":
    case "c0.0.15a_03":

    // Lost
    case "classic 0.0.16a":
    case "c0.0.16a":

    // Lost
    case "classic 0.0.16a_01":
    case "c0.0.16a_01":

    // Lost
    case "classic 0.0.16a_02-1":
    case "c0.0.16a_02-1":
    case "classic 0.0.16a_02-2":
    case "c0.0.16a_02-2":
    case "classic 0.0.16a_02-3":
    case "c0.0.16a_02-3":
    case "classic 0.0.16a_02-4":
    case "c0.0.16a_02-4":
    case "classic 0.0.16a_02":
    case "c0.0.16a_02": Version = "c0.0.16a_02-081047"

    // Seemingly no rerelease and yet numbered
    case "classic 0.0.17a-1":
    case "c0.0.17a-1":
    case "classic 0.0.17a-2":
    case "c0.0.17a-2":
    case "classic 0.0.17a":
    case "c0.0.17a": Version = "c0.0.17a-2014"
    
    // Lost
    case "classic 0.0.18a":
    case "c0.0.18a":

    // Lost
    case "classic 0.0.18a_01":
    case "c0.0.18a_01":
      
    case "classic 0.0.18a_02": Version = "c0.0.18a_02";
    
    // Lost
    case "classic 0.0.19":
    case "c0.0.19a":

    // Unkown
    case "classic 0.0.19a_01":
    case "c0.0.19a_01":

    // Lost
    case "classic 0.0.19a_02":
    case "c0.0.19a_02":

    // Lost
    case "classic 0.0.19a_03":
    case "c0.0.19a_03":

    case "classic 0.0.19a_04": Version = "c0.0.19a_04";

    // Lost
    case "classic 0.0.19a_05":
    case "c0.0.19a_05":

    // Lost bar rerelease
    case "classic 0.0.19a_06-1":
    case "c0.0.19a_06-1":
    case "classic 0.0.19a_06-2":
    case "c0.0.19a_06-2": Version = "c0.0.19a_06-0137";

    // Lost
    case "classic 0.0.20a":
    case "c0.0.20a": 

    case "classic 0.0.20a_01": Version = "c0.0.20a_01";

    case "classic 0.0.20a_02": Version = "c0.0.20a_02";

    // Lost bar rerelease
    case "classic 0.0.21a-1":
    case "c0.0.21a-1":
    case "classic 0.0.21a-2":
    case "c0.0.21a-2":
    case "classic 0.0.21a":
    case "c0.0.21a": Version = "c0.0.21a-2008";
    
    // Lost
    case "classic 0.0.21a_01":
    case "c0.0.21a_01":

    // Lost
    case "classic 0.0.21a_02":
    case "c0.0.21a_02":

    // Lost
    case "classic 0.0.22a-1":
    case "c0.0.22a-1":
    case "classic 0.0.22a-2":
    case "c0.0.22a-2":
    case "classic 0.0.22a":
    case "c0.0.22a":

    // Lost
    case "classic 0.0.22a_01":
    case "c0.0.22a_01":

    // Lost
    case "classic 0.0.22a_02":
    case "c0.0.22a_02":

    // Lost
    case "classic 0.0.22a_03":
    case "c0.0.22a_03":

    // Lost
    case "classic 0.0.22a_04":
    case "c0.0.22a_04":
      
    case "classic 0.0.22a_05": Version = "c0.0.22a_05";
    
    // Lost
    case "classic 0.0.23a":
    case "c0.0.23a":
      
    case "classic 0.0.23a_01": Version = "c0.0.23a_01";

    // #region Survival Test
    // Lost
    case "classic 0.0.24a":
    case "c0.0.24a":
    case "classic 0.0.24a_survial_test":
    case "c0.0.24a_survial_test":
    case "classic 0.0.24a_st":
    case "c0.0.24a_st":

    // Lost
    case "classic 0.24a_01":
    case "c0.24a_01":
    case "classic 0.24a_survial_test_01":
    case "c0.24a_survial_test_01":
    case "classic 0.24a_st_01":
    case "c0.24a_st_01":

    // Lost
    case "classic 0.24a_02-1":
    case "c0.24a_02-1":
    case "classic 0.0.24a_survial_test_02-1":
    case "c0.0.24a_survial_test_02-1":
    case "classic 0.0.24a_st_02-1":
    case "c0.0.24a_st_02-1":

    case "classic 0.24a_02-2":
    case "c0.0.24a_02-2":
    case "classic 0.0.24a_survial_test_02-2":
    case "c0.0.24a_survial_test_02-2":
    case "classic 0.0.24a_st_02-2":
    case "c0.0.24a_st_02-2":

    case "classic 0.24a_02":
    case "c0.24a_02":
    case "classic 0.24a_survial_test_02":
    case "c0.24a_survial_test_02":
    case "classic 0.24a_st_02":
    case "c0.24a_st_02":

    case "classic 0.24a_03":
    case "c0.24a_03":
    case "classic 0.24a_survial_test_03":
    case "c0.24a_survial_test_03":
    case "classic 0.24a_st_03": Version = "c0.24_st_03"

    // Lost
    case "classic 0.25a":
    case "c0.25a":
    case "classic 0.25a_survial_test":
    case "c0.25a_survial_test":
    case "classic 0.25a_st":
    case "c0.25a_st":

    // Unknown
    case "classic 0.25a_01":
    case "c0.25a_01":
    case "classic 0.25a_01_survial_test":
    case "c0.25a_01_survial_test":
    case "classic 0.25a_01_st":
    case "c0.25a_01_st":

    // Lost
    case "classic 0.25a_02":
    case "c0.25a_02":
    case "classic 0.25a_02_survial_test":
    case "c0.25a_02_survial_test":
    case "classic 0.25a_02_st":
    case "c0.25a_02_st":

    // Lost
    case "classic 0.25a_03":
    case "c0.25a_03":
    case "classic 0.25a_03_survial_test":
    case "c0.25a_03_survial_test":
    case "classic 0.25a_03_st":
    case "c0.25a_03_st":

    // Lost
    case "classic 0.25a_04":
    case "c0.25a_04":
    case "classic 0.25a_04_survial_test":
    case "c0.25a_04_survial_test":
    case "classic 0.25a_04_st":
    case "c0.25a_04_st":

    case "classic 0.25a_05":
    case "c0.25a_05":
    case "classic 0.25a_05_survial_test":
    case "c0.25a_05_survial_test":
    case "classic 0.25a_05_st": Version = "c0.25_05_st";

    // Lost
    case "classic 0.26a":
    case "c0.26a":
    case "classic 0.26a_survial_test":
    case "c0.26a_survial_test":
    case "classic 0.26a_st":
    case "c0.26a_st":

    // #endregion

    // #endregion

    // #region Late Classic Creative
    case "classic 0.27a":
    case "c0.27a":
    case "classic 0.27a_survial_test":
    case "c0.27a_survial_test":
    case "classic 0.27a_st": Version = "c0.27_st";

    // Lost
    case "classic 0.28a":
    case "c0.28a":
      
    case "classic 0.28a_01": Version = "c0.28_01";

    case "classic 0.29a":
    case "c0.29a":
    case "classic 0.29": Version = "c0.29a";

    case "classic 0.29a_01":
    case "c0.29a_01":
    case "classic 0.29_01": Version = "c0.29_01";

    case "classic 0.29a_02":
    case "c0.29a_021":
    case "classic 0.29_02": Version = "c0.29_02";

    // What does renew even mean here
    case "classic 0.30a":
    case "c0.30a":
    case "classic 0.30": 
    case "c0.30": 
    case "classic 0.30-c": 
    case "c0.30-c": 
    case "classic 0.30c": 
    case "c0.30c": 
    case "classic 0.30-c-2": 
    case "c0.30-c-2": Version = "c0.30-c-1900-renew";

    case "classic 0.30-c-1": 
    case "c0.30-c-1": Version = "c0.30-c-1900";

    // #endregion

    // #region Indev
    // #region Indev 0.31

    // Lost
    case "indev 0.31 20091223-0040":
    case "indev 20091223-0040":
    case "indev 0.31 20091223-1":
    case "indev 20091223-1":

    // Lost
    case "indev 0.31 20091223-1457":
    case "indev 20091223-1457":
    case "indev 0.31 20091223-2":
    case "indev 20091223-2":

    case "indev 0.31 20091223-1459":
    case "indev 20091223-1459":
    case "indev 0.31 20091223-3":
    case "indev 20091223-3":
    case "indev 0.31 20091223":
    case "indev 20091223": Version = "in-20091223-1459";

    // Lost
    case "indev 0.31 20091231-1856":
    case "indev 20091231-1856":
    case "indev 0.31 20091231-1":
    case "indev 20091223-1":

    // Lost
    case "indev 0.31 20091231-2004":
    case "indev 20091231-2004":
    case "indev 0.31 20091231-2":
    case "indev 20091223-2":

    // Lost
    case "indev 0.31 20091231-2013":
    case "indev 20091231-2013":
    case "indev 0.31 20091231-3":
    case "indev 20091223-3":

    // Lost
    case "indev 0.31 20091231-2033":
    case "indev 20091231-2033":
    case "indev 0.31 20091231-4":
    case "indev 20091223-4":
    
    // Lost
    case "indev 0.31 20091231-2147":
    case "indev 20091231-2147":
    case "indev 0.31 20091231-5":
    case "indev 20091223-5":

    case "indev 0.31 20091231-2255":
    case "indev 20091231-2255":
    case "indev 0.31 20091231-6":
    case "indev 20091223-6":
    case "indev 0.31 20091231":
    case "indev 20091223": Version = "in-20091231-2255";

    // Lost
    case "indev 0.31 20100104-2154":
    case "indev 20100104-2154":
    case "indev 0.31 20100104-1":
    case "indev 20100104-1":

    case "indev 0.31 20100104-2258":
    case "indev 20100104-2258":
    case "indev 0.31 20100104-2":
    case "indev 20100104-2":
    case "indev 0.31 20100104":
    case "indev 20100104": Version = "in-20100104-2258";

    // Lost
    case "indev 0.31 20100106-1655":
    case "indev 20100106-1655":
    case "indev 0.31 20100106-1":
    case "indev 20100106-1":

    // Lost
    case "indev 0.31 20100106-2158":
    case "indev 20100106-2158":
    case "indev 0.31 20100106-2":
    case "indev 20100106-2":

    // Lost
    case "indev 0.31 20100106-2220":
    case "indev 20100106-2220":
    case "indev 0.31 20100106-3":
    case "indev 20100106-3":
    case "indev 0.31 20100106":
    case "indev 20100106":

    // Lost
    case "indev 0.31 20100107-1851":
    case "indev 20100107-1851":
    case "indev 0.31 20100107-1":
    case "indev 20100107-1":

    // Lost
    case "indev 0.31 20100107-1947":
    case "indev 20100107-1947":
    case "indev 0.31 20100107-2":
    case "indev 20100107-2":

    // Lost
    case "indev 0.31 20100107-2010":
    case "indev 20100107-2010":
    case "indev 0.31 20100107-3":
    case "indev 20100107-3":
    case "indev 0.31 20100107":
    case "indev 20100107":

    // Lost
    case "indev 0.31 20100109-1939":
    case "indev 20100109-1939":
    case "indev 0.31 20100109-1":
    case "indev 20100109-1":

    // Lost
    case "indev 0.31 20100109-2000":
    case "indev 20100109-2000":
    case "indev 0.31 20100109-2":
    case "indev 20100109-2":
    case "indev 0.31 20100109":
    case "indev 20100109":

    case "indev 0.31 20100110-1939":
    case "indev 20100110-1939":
    case "indev 0.31 20100110-1":
    case "indev 20100110-1":
    case "indev 0.31 20100110":
    case "indev 20100110": Version = "in-20100110"

    // Lost
    case "indev 0.31 20100111-2210":
    case "indev 20100111-2210":
    case "indev 0.31 20100111-1":
    case "indev 20100111-1":
    case "indev 0.31 20100111":
    case "indev 20100111":

    // Lost
    case "indev 0.31 20100112-0826":
    case "indev 20100112-0826":
    case "indev 0.31 20100112-1":
    case "indev 20100112-1":

    // Lost
    case "indev 0.31 20100112-1949":
    case "indev 20100112-1949":
    case "indev 0.31 20100112-2":
    case "indev 20100112-2":
    case "indev 0.31 20100112":
    case "indev 20100112":

    // Lost
    case "indev 0.31 20100113-2015":
    case "indev 20100113-2015":
    case "indev 0.31 20100113-1":
    case "indev 20100113-1":

    // Lost
    case "indev 0.31 20100113-2244":
    case "indev 20100113-2244":
    case "indev 0.31 20100113-2":
    case "indev 20100113-2":
    case "indev 0.31 20100113":
    case "indev 20100113":

    // Lost
    case "indev 0.31 20100114":
    case "indev 20100114":

    // Lost
    case "indev 0.31 20100122-1708":
    case "indev 20100122-1708":
    case "indev 0.31 20100122-1":
    case "indev 20100122-1":

    // Lost
    case "indev 0.31 20100122-2251":
    case "indev 20100122-2251":
    case "indev 0.31 20100122-2":
    case "indev 20100122-2":
    case "indev 0.31 20100122":
    case "indev 20100122":

    // Lost
    case "indev 0.31 20100124-2119":
    case "indev 20100124-2119":
    case "indev 0.31 20100124-1":
    case "indev 20100124-1":

    // Lost
    case "indev 0.31 20100124-2134":
    case "indev 20100124-2134":
    case "indev 0.31 20100124-2":
    case "indev 20100124-2":

    case "indev 0.31 20100124-2310":
    case "indev 20100124-2310":
    case "indev 0.31 20100124-3":
    case "indev 20100124-3":
    case "indev 0.31 20100124":
    case "indev 20100124": Version = "in-20100124-2310";

    case "indev 0.31 20100125":
    case "indev 20100125":
    case "indev 0.31 20100125-2154":
    case "indev 20100125-2154": Version = "in-20100125";

    // Lost
    case "indev 0.31 20100128-2200":
    case "indev 20100128-2200":
    case "indev 0.31 20100128-1":
    case "indev 20100128-1":

    case "indev 0.31 20100128-2304":
    case "indev 20100128-2304":
    case "indev 0.31 20100128-2":
    case "indev 20100128-2":
    case "indev 0.31 20100128":
    case "indev 20100128": Version = "in-20100128-2304";

    // Lost
    case "indev 0.31 20100129-1447":
    case "indev 20100129-1447":
    case "indev 0.31 20100129-1":
    case "indev 20100129-1":

    case "indev 0.31 20100129-1452":
    case "indev 20100129-1452":
    case "indev 0.31 20100129-2":
    case "indev 20100129-2":
    case "indev 0.31 20100129":
    case "indev 20100129": Version = "in-20100129-1452";

    // Lost
    case "indev 0.31 20100129-2129":
    case "indev 20100129-2129":
    case "indev 0.31 20100129-3":
    case "indev 20100129-3":

    // Lost
    case "indev 0.31 20100129-2134":
    case "indev 20100129-2134":
    case "indev 0.31 20100129-4":
    case "indev 20100129-4":
      
    // Lost
    case "indev 0.31 20100129-2158":
    case "indev 20100129-2158":
    case "indev 0.31 20100129-6":
    case "indev 20100129-6":
      
    // Lost
    case "indev 0.31 20100129-2209":
    case "indev 20100129-2209":
    case "indev 0.31 20100129-7":
    case "indev 20100129-7":
      
    // Lost
    case "indev 0.31 20100129-2332":
    case "indev 20100129-2332":
    case "indev 0.31 20100129-8":
    case "indev 20100129-8":

    // Lost
    case "indev 0.31 20100130-0057":
    case "indev 20100130-0057":
    case "indev 0.31 20100130-1":
    case "indev 20100130-1":
    case "indev 0.31 20100130-0109":
    case "indev 20100130-0109":
    case "indev 0.31 20100130-2":
    case "indev 20100130-2":
    case "indev 0.31 20100130":
    case "indev 20100130": Version = "in-20100130"

    // Lost
    case "indev 0.31 20100131-2156":
    case "indev 20100131-2156":
    case "indev 0.31 20100131-1":
    case "indev 20100131-1":
    case "indev 0.31 20100131-2229":
    case "indev 20100131-2229":
    case "indev 0.31 20100131-2":
    case "indev 20100131-2":
    case "indev 0.31 20100131-2236":
    case "indev 20100131-2236":
    case "indev 0.31 20100131-3":
    case "indev 20100131-3":

    // Lost
    case "indev 0.31 20100131-2241":
    case "indev 20100131-2241":
    case "indev 0.31 20100131-4":
    case "indev 20100131-4":
    
    case "indev 0.31 20100131-2244":
    case "indev 20100131-2244":
    case "indev 0.31 20100131-5":
    case "indev 20100131-5":
    case "indev 0.31 20100131":
    case "indev 20100131": Version = "in-20100131-2244";

    case "indev 0.31 20100201-0025":
    case "indev 20100201-0025":
    case "indev 0.31 20100201-1":
    case "indev 20100201-1": Version = "in-20100201-0025";

    case "indev 0.31 20100201-2227":
    case "indev 20100201-2227":
    case "indev 0.31 20100201-2":
    case "indev 20100201-2": Version = "in-20100201-2227";

    case "indev 0.31 20100202-2157":
    case "indev 20100202-2157":
    case "indev 0.31 20100202-1":
    case "indev 20100202-1":
    case "indev 0.31 20100202-2311":
    case "indev 20100202-2311":
    case "indev 0.31 20100202-2":
    case "indev 20100202-2":
    case "indev 0.31 20100202-2326":
    case "indev 20100202-2326":
    case "indev 0.31 20100202-3":
    case "indev 20100202-3":
    case "indev 0.31 20100202-2330":
    case "indev 20100202-2330":
    case "indev 0.31 20100202-4":
    case "indev 20100202-4":
    case "indev 0.31 20100202":
    case "indev 20100202": Version = "in-20100202-2330";

    // Lost
    case "indev 0.31 20100204-1541":
    case "indev 20100204-1541":
    case "indev 0.31 20100204-1":
    case "indev 20100204-1":

    // Lost
    case "indev 0.31 20100204-2027":
    case "indev 20100204-2027":
    case "indev 0.31 20100204-2":
    case "indev 20100204-2":

    // Lost
    case "indev 0.31 20100204-2153":
    case "indev 20100204-2153":
    case "indev 0.31 20100204-3":
    case "indev 20100204-3":
    case "indev 0.31 20100204":
    case "indev 20100204":

    // Lost
    case "indev 0.31 20100205-1558":
    case "indev 20100205-1558":
    case "indev 0.31 20100205-1":
    case "indev 20100205-1":

    // Lost
    case "indev 0.31 20100205-2241":
    case "indev 20100205-2241":
    case "indev 0.31 20100205-2":
    case "indev 20100205-2":

    // Lost
    case "indev 0.31 20100206-1437":
    case "indev 20100206-1437":
    case "indev 0.31 20100205-1":
    case "indev 20100205-1":

    // #endregion

    // Lost
    case "indev 0.31 20100206-2034":
    case "indev 20100206-2034":
    case "indev 0.31 20100205-2":
    case "indev 20100205-2":

    case "indev 0.31 20100206-2103":
    case "indev 20100206-2103":
    case "indev 0.31 20100205-3":
    case "indev 20100205-3":
    case "indev 0.31 20100205":
    case "indev 20100205": Version = "in-20100206-2103"

    // Lost
    case "indev 0.31 20100207-1057":
    case "indev 20100207-1057":
    case "indev 0.31 20100207-1":
    case "indev 20100207-1":
      
    case "indev 0.31 20100207-1101":
    case "indev 20100207-1101":
    case "indev 0.31 20100207-2":
    case "indev 20100207-2": Version = "in-20100207-1101";

    // Lost
    case "indev 0.31 20100207-1647":
    case "indev 20100207-1647":
    case "indev 0.31 20100207-3":
    case "indev 20100207-3":

    case "indev 0.31 20100207-1703":
    case "indev 20100207-1703":
    case "indev 0.31 20100207-4":
    case "indev 20100207-4": Version = "in-20100207-1703";

    // Lost
    case "indev 0.31 20100211-2327":
    case "indev 20100211-2327":
    case "indev 0.31 20100211-1":
    case "indev 20100211-1":

    // Lost
    case "indev 0.31 20100211-2333":
    case "indev 20100211-2333":
    case "indev 0.31 20100211-2":
    case "indev 20100211-2":

    // Lost
    case "indev 0.31 20100211-2340":
    case "indev 20100211-2340":
    case "indev 0.31 20100211-3":
    case "indev 20100211-3":

    case "indev 0.31 20100212-1210":
    case "indev 20100212-1210":
    case "indev 0.31 20100212-1":
    case "indev 20100212-1": Version = "in-20100212-1210";

    case "indev 0.31 20100212-1622":
    case "indev 20100212-1622":
    case "indev 0.31 20100212-2":
    case "indev 20100212-2": Version = "in-20100212-1622";

    case "indev 0.31 20100213-2258":
    case "indev 20100213-2258":
    case "indev 0.31 20100213-1":
    case "indev 20100213-1":
    case "indev 0.31 20100213":
    case "indev 20100213": Version = "in-20100213";

    case "indev 0.31 20100214-2143":
    case "indev 20100214-2143":
    case "indev 0.31 20100214-1":
    case "indev 20100214-1":
    case "indev 0.31 20100214":
    case "indev 20100214": Version = "in-20100214";

    // Lost
    case "indev 0.31 20100218-0011":
    case "indev 20100218-0011":
    case "indev 0.31 20100218-1":
    case "indev 20100218-1":
      
    case "indev 0.31 20100218-0016":
    case "indev 20100218-0016":
    case "indev 0.31 20100218-2":
    case "indev 20100218-1":
    case "indev 0.31 20100218":
    case "indev 20100218": Version = "in-20100218-0016";

    case "indev 0.31 20100219":
    case "indev 20100219":
    case "indev 0.31 20100219-1":
    case "indev 20100219-1": Version = "20100219";

    case "indev 0.31 20100223":
    case "indev 20100223":
    case "indev 0.31 20100223-1":
    case "indev 20100223-1": Version = "20100223";

    // #endregion
    }

    // Infdev
    if(Version.includes("infdev")) 
    {
      // Turns "Infdev [timecode]"  into "In-[timecode]"
      Version = "inf-" + Version.substring(7);

      if(Version == "inf-20100413" || Version == "inf-20100413-1949") Version = "inf-20100413-1953";
      if(Version == "inf-20100227-1414" || Version == "inf-20100227") Version = "inf-20100227-1433";
      if(Version == "inf-20100128") Version = "in-20100128-2304";
    }

    // Alpha
    else if(Version.includes("alpha")) 
    {
      Version = "a" + Version.substring(7);

      switch(Version)
      {
        case "a1.0.1":
        case "a1.0.0": Version = "a1.0.1_01";

        case "a1.0.4": Version = "a1.0.4-launcher";

        case "a1.0.5-1":
        case "a1.0.5-2":
        case "a.0.5": // Delete later
        case "a1.0.5": Version = "a1.0.5-2149";

        case "a1.0.6_02": Version = "a1.0.6_03";

        case "a1.0.13_01-1": Version = "a1.0.13_01-1038";
        case "a1.0.13_01-2":
        case "a1.0.13_01": Version = "a1.0.13_01-1444";


        case "a1.0.14-1": Version = "a1.0.14-1603";
        case "a1.0.14-2": Version = "a1.0.14-1659";
        case "a1.0.14-3":
        case "a1.0.14": Version = "a1.0.14-1659-launcher";

        case "a1.1.0-1": Version = "a1.1.0-101847";
        case "a1.1.0-2": Version = "a1.1.0-101847-launcher";
        case "a1.1.0-3": Version = "a1.1.0-131933";
        case "a1.1.0": Version = "a1.1.0-131933";

        case "a1.2.0":
        case "a1.2.0-1":
        case "a1.2.0-2": Version = "a1.1.0-131933";

        case "a1.2.0-_02-1": Version = "a1.2.0_02";
        case "a1.2.0-_02-2":
        case "a1.2.0-_02": Version = "a1.2.0_02-launcher";

        case "a1.2.2a": Version = "a1.2.2-1624";
        case "a1.2.2b":
        case "a1.2.2": Version = "a1.2.2-1938";

        case "a1.2.3_01-1": Version = "a1.2.3_01-0956"
        case "a1.2.3_01-2": 
        case "a1.2.3_01": Version = "a1.2.3_01-0958"
      }
    }

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
        else if(PrereleaseNum == "") Version = "b" + UpdateNum + "-pre1";
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
    Version = Version.replace(" prerelease ", "-pre");
    Version = Version.replace(" (pre-release)", "-pre"); // Thanks 1.6.2

    // Changes every release candidate verion
    Version = Version.replace(" release candidate ", "-rc");

    // Changes every release experimental snapshot
    Version = Version.replace(" experimental snapshot ", "-exp");

    // Changes every combat verion
    Version = Version.replace("combat test ", "combat");

    if(Version == "c0.0.14a") Version = "c0.0.14a_08" // Delete later

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
      case "1.3-pre-2":
      case "1.3": Version = "1.3-pre-1249";

      // Wiki says nothing of a rerelease?
      case "12w32a":
      case "12w32a-1":
      case "12w32a-2": Version = "12w32a-1532";

      case "1.4.1-pre":
      case "1.4.1-pre-1":
      case "1.4.1-pre-2": Version = "1.4.1-pre-1338";

      case "1.4.3": Version = "1.4.3-pre";

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
      case "13w05a": Version = "13w05a-1538";

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
      case "1.6.2-pre-3":
      case "1.6.2-pre": Version = "1.6.2-pre-1426";

      case "1.6.2-1": Version = "1.6.2-080933";
      case "1.6.2-2":
      case "1.6.2": Version = "1.6.2-091847";

      case "1.6.3-pre-1": Version = "1.6.3-pre-131100";
      case "1.6.3-pre-2":
      case "1.6.3-pre":
      case "1.6.3": Version = "1.6.3-pre-171231";

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
      case "1.7":
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

      case "15w48a": Version = "15w47c"; // Delete Later
      
      case "17w13a-1": Version = "17w13a-0805";
      case "17w13a-2":
      case "17w13a": Version = "17w13a-0932";
      
      case "1.12-pre3-1": Version = "1.12-pre3-1316";
      case "1.12-pre3-2":
      case "1.12-pre3": Version = "1.12-pre3-1409";

      case "19w13b-1": Version = "19w13b-1316";
      case "19w13b-2":
      case "19w13b": Version = "19w13b-1653";

      case "3d shareware v1.34": Version = "3D Shareware v1.34";
      
      case "1.14.2-pre4-1": Version = "1.14.2-pre4-24154";
      case "1.14.2-pre4-2":
      case "1.14.2-pre4": Version = "1.14.2-pre4-270720";

      // Its normally "deep dark experimental snapshot 1" but 
      case "deep dark-exp1": Version = "1.19-exp1";
      
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
      
      case "22w12oneblockatatime":
      case "22w13aoneblockatatime": Version = "22w13oneblockatatime"; // Remove later

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

async function CreateVerFile() {
  
  // Grabs version info from omniarchive (thank you so much Ouroya!)
  const Omni_URL = "https://meta.omniarchive.uk/v1/manifest.json";

  const settings = { method: "Get" };
  let omniRes = await fetch(Omni_URL, settings)
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

  const mcdf_URL = "https://mcdf.wiki.gg/wiki/Special:CargoExport?tables=Version_Range%2C&&fields=Version_Range._pageName%2C+Version_Range.Start%2C+Version_Range.End%2C&&order+by=&limit=2000&format=json";

  // Thank god for tutorials
  const mcdfRes = await fetch(mcdf_URL, settings)
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

    // Removed banned symbols
    BannedSymbols.forEach(banned => {
      mcdf[i].Start = mcdf[i].Start.replace(banned, "");
      mcdf[i].End = mcdf[i].End.replace(banned, "");
    });

    // special code for "entity.KillerBuggy.name"
    if(mcdf[i]._pageName == "Java Edition:&quot;entity.KillerBunny.name&quot; Named Regular Rabbit") 
      mcdf[i]._pageName = "Java Edition:\"entity.KillerBunny.name\" Named Regular Rabbit";

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
    if("Java Edition:" + previousArticle.Title == mcdf[i]._pageName)
    {
      let UpdateIndex
      UpdateIndex = (UpdateInfo: OmniVer) => UpdateInfo.id == mcdf[i].Start;
      const StartTime = Omni[Omni.findIndex(UpdateIndex)].releaseTime;

      let EndTime

      // If null then it only existed for 1 version and if its ? then say screw it
      if(mcdf[i].End != mcdf[i].Start)
      {
        UpdateIndex = (UpdateInfo: OmniVer) => UpdateInfo.id == mcdf[i].End;
        EndTime = Omni[Omni.findIndex(UpdateIndex)].releaseTime;
      }
      else EndTime = StartTime;


      previousArticle.StartDate.push(StartTime);
      previousArticle.EndDate.push(EndTime);

      previousArticle.StartVer.push(mcdf[i].Start);
      previousArticle.EndVer.push(mcdf[i].End);
    }
    else 
    {
      Articles.push(CreateArticle(mcdf[i]));
      previousArticle = Articles[Articles.length - 1]
    }
  };

  Articles.forEach(article => {

    let Output = article.Title + ": ";
    for(let i = 0; i < article.StartVer.length; i++)
    {
      Output += article.StartVer[i] + " - " + article.EndVer[i];

      if(article.StartVer.length > i + 1) Output += ", "
    }

    console.log(Output);
  });
}

function CreateArticle(Data: MCDF_Article)
{

  // Precomputes info
  let UpdateIndex
  UpdateIndex = (UpdateInfo: OmniVer) => UpdateInfo.id == Data.Start;
  const StartUpdateInfo = Omni[Omni.findIndex(UpdateIndex)];

  UpdateIndex = (UpdateInfo: OmniVer) => UpdateInfo.id == Data.End;
  const EndUpdateInfo = Omni[Omni.findIndex(UpdateIndex)];
  
  let FullReleaseUpdate
  if(StartUpdateInfo.phase != "post-1.0") FullReleaseUpdate = StartUpdateInfo.releaseTime;
  else FullReleaseUpdate = new Date();

  return {

  StartVer: [Data.Start],
  EndVer: [Data.End],

  // Removes the "Java Edition:" from page names
  Title: Data._pageName.substring(Data._pageName.indexOf(":") + 1),

  // Assigns it the edition
  Edition: Data._pageName.split(':')[0],

  // Grabs the version date from Omni

  StartDate: [StartUpdateInfo.releaseTime],
  EndDate: [EndUpdateInfo.releaseTime],

  FullReleaseDate: FullReleaseUpdate,

  };
}


app.listen(port, () => {
  CreateVerFile();
  console.log(`Example app listening on port ${port}`);
})