"use strict";

var isOpera = function isOpera() {
  var checked = false;

  try {
    checked = !!window.opr && !!window.opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  } catch (error) {
    checked = false;
  }

  return checked;
};

var isFirefox = function isFirefox() {
  var checked = false;

  try {
    checked = typeof InstallTrigger !== 'undefined';
  } catch (error) {
    checked = false;
  }

  return checked;
};

var isAppleSafari = function isAppleSafari() {
  var checked = false;

  try {
    checked = /constructor/i.test(window.HTMLElement) || function (p) {
      return p.toString() === '[object SafariRemoteNotification]';
    }(!window.safari || typeof safari !== 'undefined' && window.safari.pushNotification);
  } catch (error) {
    checked = false;
  }

  return checked;
};

var isInternetExplorer = function isInternetExplorer() {
  var checked = false;

  try {
    checked =
    /* @cc_on!@ */
    false || !!document.documentMode;
  } catch (error) {
    checked = false;
  }

  return checked;
};

var isMicrosoftEdge = function isMicrosoftEdge() {
  var checked = false;

  try {
    checked = !isIE && !!window.StyleMedia;
  } catch (error) {
    checked = false;
  }

  return checked;
};

var isChromiumEdge = function isChromiumEdge() {
  var checked = false;

  try {
    if (window.chrome) {
      var userAgentData = window.navigator.userAgentData;

      if (userAgentData.brands) {
        if (userAgentData.brands.find(function (brandEntry) {
          return brandEntry.brand === 'Chromium';
        }) && userAgentData.brands.find(function (brandEntry) {
          return brandEntry.brand === 'Microsoft Edge';
        })) {
          checked = true;
        }
      }
    }
  } catch (error) {
    checked = false;
  }

  return checked;
};

var isGoogleChrome = function isGoogleChrome() {
  var checked = false;

  try {
    if (window.chrome) {
      var userAgentData = window.navigator.userAgentData;

      if (userAgentData.brands) {
        if (userAgentData.brands.find(function (brandEntry) {
          return brandEntry.brand === 'Chromium';
        }) && userAgentData.brands.find(function (brandEntry) {
          return brandEntry.brand === 'Google Chrome';
        })) {
          checked = true;
        }
      }
    }
  } catch (error) {
    checked = false;
  }

  return checked;
};

var browsers = {
  opera: {
    name: "Opera",
    detectionMethod: isOpera,
    userAgentTag: 'Opera'
  },
  chrome: {
    name: "Google Chrome",
    detectionMethod: isGoogleChrome,
    userAgentTag: 'Chrome'
  },
  firefox: {
    name: "Mozilla Firefox",
    detectionMethod: isFirefox,
    userAgentTag: 'Firefox'
  },
  safari: {
    name: "Apple Safari",
    detectionMethod: isAppleSafari,
    userAgentTag: 'Safari'
  },
  ie: {
    name: "Internet Explorer",
    detectionMethod: isInternetExplorer,
    userAgentTag: 'MSIE'
  },
  edge: {
    name: "Microsoft Edge",
    detectionMethod: isMicrosoftEdge,
    userAgentTag: null
  },
  newEdge: {
    name: "Chromium Edge",
    detectionMethod: isChromiumEdge,
    userAgentTag: 'Chrome'
  }
};

var getEnvironmentInformation = function getEnvironmentInformation() {
  var browserInfo = {
    brand: 'N/A',
    version: 'N/A'
  };
  var detectedBrowser = null;
  var userAgent = window.navigator.userAgent;
  Object.keys(browsers).forEach(function (browser) {
    if (browsers[browser].detectionMethod()) {
      detectedBrowser = browsers[browser];
    }
  });

  if (detectedBrowser) {
    var browserVersion = 'N/A';
    browserInfo.brand = detectedBrowser.name;

    if (detectedBrowser.userAgentTag) {
      if (detectedBrowser.userAgentTag === browsers.ie.userAgentTag) {
        if (navigator.userAgent.indexOf(browsers.ie.userAgentTag) != -1) {
          browserVersion = navigator.userAgent.substr(navigator.userAgent.indexOf(browsers.ie.userAgentTag) + 5, 4);
        }
      } else {
        browserVersion = userAgent.split(" ").find(function (el) {
          return el.includes(detectedBrowser.userAgentTag);
        }).split("/")[1];
      }

      if (browserVersion) {
        browserInfo.version = browserVersion;
      }
    }
  }

  return {
    browserInfo: browserInfo
  };
};

module.exports.getEnvironmentInformation = getEnvironmentInformation;