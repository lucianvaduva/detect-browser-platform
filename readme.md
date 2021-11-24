## **Welcome**

This module is intended to detect information about **Browser brand and version, Operating System and Platform**. The detection logic is based on checking browser specific features together with User agent information.

**How to install**

    npm i detect-browser-platform

**How to use it**

    import { getEnvironmentInformation } from  'detect-browser-platform';
    
    const { browserInfo: { brand, version } } = getEnvironmentInformation();
    console.log(`Browser name: ${brand}`);
    console.log(`Browser version: ${version}`);

**Working at this moment:**

 - [x] Google Chrome  
 - [x] Mozilla Firefox  
 - [x] Opera  
 - [x] Microsoft Edge (Chromium)        
 - [x] Microsoft Edge  
 - [x] Apple Safari  
 - [x] Internet Explorer
