
const isOpera = () => {
    try {
        return (!!window.opr && !!window.opr.addons) ||
            !!window.opera ||
            navigator.userAgent.indexOf(' OPR/') >= 0;
    } catch (error) {
        return false;
    }
}

const isFirefox = () => {
    try {
        return typeof InstallTrigger !== 'undefined';
    } catch (error) {
        return false;
    }
}

const isAppleSafari = () => {
    try {
        return /constructor/i.test(window.HTMLElement) ||
            (function (p) {
                return p.toString() === '[object SafariRemoteNotification]';
            })(!window.safari || (typeof safari !== 'undefined' && window.safari.pushNotification));
    } catch (error) {
        return false;
    }
}

const isInternetExplorer = () => {
    try {
        return /* @cc_on!@ */ false || !!document.documentMode;
    } catch (error) {
        return false;
    }
}

const isMicrosoftEdge = () => {
    try {
        return !isIE && !!window.StyleMedia;
    } catch (error) {
        return false;
    }
}

const isChromiumEdge = () => {
    try {
        return isChrome && navigator.userAgent.indexOf('Edg') !== -1;
    } catch (error) {
        return false;
    }
}

const isGoogleChrome = () => {
    try {
        return !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    } catch (error) {
        return false;
    }
}

const browsers = {
    opera: { name: "Opera", detectionMethod: isOpera },
    chrome: { name: "Google Chrome", detectionMethod: isGoogleChrome },
    firefox: { name: "Mozilla Firefox", detectionMethod: isFirefox },
    safari: { name: "Apple Safari", detectionMethod: isAppleSafari },
    ie: { name: "Internet Explorer", detectionMethod: isInternetExplorer },
    edge: { name: "Microsoft Edge", detectionMethod: isMicrosoftEdge },
    newEdge: { name: "Chromium Edge", detectionMethod: isChromiumEdge }
}

const detectBrowserType = () => {
    Object.keys(browsers).forEach(browser => {
        if (browsers[browser].detectionMethod()) {
            return browsers[browser].name
        }
    })
    return 'Browser type could not be detected';
}

module.exports.detectBrowserType = detectBrowserType;