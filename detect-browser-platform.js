const isOpera = () => {
    let checked = false;
    try {
        checked = (!!window.opr && !!window.opr.addons) ||
            !!window.opera ||
            navigator.userAgent.indexOf(' OPR/') >= 0;
    } catch (error) {
        checked = false;
    }
    return checked;
}

const isFirefox = () => {
    let checked = false;
    try {
        checked = typeof InstallTrigger !== 'undefined';
    } catch (error) {
        checked = false;
    }
    return checked;
}

const isAppleSafari = () => {
    let checked = false;
    try {
        checked = /constructor/i.test(window.HTMLElement) ||
            (function (p) {
                return p.toString() === '[object SafariRemoteNotification]';
            })(!window.safari || (typeof safari !== 'undefined' && window.safari.pushNotification));
    } catch (error) {
        checked = false;
    }
    return checked;
}

const isInternetExplorer = () => {
    let checked = false;
    try {
        checked = /* @cc_on!@ */ false || !!document.documentMode;
    } catch (error) {
        checked = false;
    }
    return checked;
}

const isMicrosoftEdge = () => {
    let checked = false;
    try {
        chekced = !isIE && !!window.StyleMedia;
    } catch (error) {
        chekced = false;
    }
    return checked;
}

const isChromiumEdge = () => {
    let checked = false;
    try {
        if (window.chrome) {
            const { userAgentData } = window.navigator;
            if (userAgentData.brands) {
                if (userAgentData.brands.find((brandEntry) => brandEntry.brand === 'Chromium') && userAgentData.brands.find((brandEntry) => brandEntry.brand === 'Microsoft Edge')) {
                    checked = true;
                }
            }
        }
    } catch (error) {
        checked = false;
    }
    return checked;
}

const isGoogleChrome = () => {
    let checked = false;
    try {
        if (window.chrome) {
            const { userAgentData } = window.navigator;
            if (userAgentData.brands) {
                if (userAgentData.brands.find((brandEntry) => brandEntry.brand === 'Chromium') && userAgentData.brands.find((brandEntry) => brandEntry.brand === 'Google Chrome')) {
                    checked = true;
                }
            }
        }
    } catch (error) {
        checked = false;
    }
    return checked;
}

const browsers = {
    opera: { name: "Opera", detectionMethod: isOpera, userAgentTag: 'Opera' },
    chrome: { name: "Google Chrome", detectionMethod: isGoogleChrome, userAgentTag: 'Chrome' },
    firefox: { name: "Mozilla Firefox", detectionMethod: isFirefox, userAgentTag: 'Firefox' },
    safari: { name: "Apple Safari", detectionMethod: isAppleSafari, userAgentTag: 'Safari' },
    ie: { name: "Internet Explorer", detectionMethod: isInternetExplorer, userAgentTag: null },
    edge: { name: "Microsoft Edge", detectionMethod: isMicrosoftEdge, userAgentTag: null },
    newEdge: { name: "Chromium Edge", detectionMethod: isChromiumEdge, userAgentTag: 'Chrome' }
}

const getEnvironmentInformation = () => {
    let browserInfo = {
        brand: 'N/A',
        version: 'N/A'
    }
    let detectedBrowser = null;
    const { userAgent } = window.navigator;
    Object.keys(browsers).forEach(browser => {
        if (browsers[browser].detectionMethod()) {
            detectedBrowser = browsers[browser];
        }
    })
    if (detectedBrowser) {
        browserInfo.brand = detectedBrowser.name;
        if (detectedBrowser.userAgentTag) {
            const browserVersion = userAgent.split(" ").find(el => el.includes(detectedBrowser.userAgentTag)).split("/")[1];
            if (browserVersion) {
                browserInfo.version = browserVersion
            }
        }

    }
    return { browserInfo };

}

module.exports.getEnvironmentInformation = getEnvironmentInformation;