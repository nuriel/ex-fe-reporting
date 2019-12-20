//
// REPORTING SERVICE
// exactius + pumpkin care
//

// list of standard events according to FB's specifications:
// https://www.facebook.com/business/help/402791146561655
var StandardFBEvents = ['AddPaymentInfo','AddToCart','AddToWishlist','CompleteRegistration','Contact','CustomizeProduct','Donate','InitiateCheckout','Lead','Purchase','PageView', 'Schedule','Search','StartTrial','SubmitApplication','Subscribe','ViewContent'];
// set current date to initialize and validate all data structures
var currDate = new Date().getTime();

// COMMON FUNCTIONS
// TODO: Refactor to a differnt file

// Get a hash of all url params
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

/*!
 * Merge two or more objects together.
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param   {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
 * @param   {Object}   objects  The objects to merge together
 * @returns {Object}            Merged values of defaults and options
 *
 * usage:
 * var shallowMerge = extend(obj1, obj2);
 * var deepMerge = extend(true, obj1, obj2);
 */
var extend = function () {

  // Variables
  var extended = {};
  var deep = false;
  var i = 0;

  // Check if a deep merge, according to the first argument
  if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
      deep = arguments[0];
      i++;
  }

  // Merge the object into the extended object
  var merge = function (obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        // If property is an object, merge properties
        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          extended[prop] = extend(extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for (; i < arguments.length; i++) {
    merge(arguments[i]);
  }

  return extended;

};

// Generate unique IDs for use as pseudo-private/protected names.
// Use:
//     var privateName = ID();
//     var o = { 'public': 'foo' };
//     o[privateName] = 'bar';
var ID = function () {
  // Math.random should be unique because of its seeding algorithm + we're adding timestamp to the mix
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

// checks if a variable is defined
var isDefined = function(toCheck) {
  return (typeof toCheck !== 'undefined');
}

// Returns 'mobile' or 'desktop', depending on the user agent
var userAgent = function() {
  var isMobile = false; //initiate as false
  // device detection
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
      isMobile = true;
  }
  return isMobile ? 'mobile' : 'desktop';
}

// Returns the user's browser, Detecting browsers by ducktyping
// https://stackoverflow.com/a/9851769/690866
var userBrowser = function() {
  var browser = null;
  // Chrome 1 - 71
  var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  if (isChrome) {
    browser = 'chrome';     // Chrome 1 - 71
  } else if (typeof InstallTrigger !== 'undefined') {
    browser = 'firefox';    // Firefox 1.0+
  } else if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))) {
    browser = 'safari';     // Safari 3.0+ "[object HTMLElementConstructor]"
  } else if (/*@cc_on!@*/false || !!document.documentMode) {
    browser = 'IE';         // Internet Explorer 6-11
  } else if (!isIE && !!window.StyleMedia) {
    browser = 'edge';       // Edge 20+
  } else if (isOpera) {
    browser = 'Opera';    // Opera 8.0+
  } else if ((isChrome || isOpera) && !!window.CSS) {
    browser = 'Opera';    // Blink engine detection
  }
  return browser;
}

// Common function to make a request returned as a promise
var makeRequest = function (url, method) {
  // Create the XHR request
  var request = new XMLHttpRequest();
  // Return it as a Promise
  return new Promise(function (resolve, reject) {
    // Setup our listener to process compeleted requests
    request.onreadystatechange = function () {
      // Only run if the request is complete
      if (request.readyState !== 4) return;
      // Process the response
      if (request.status >= 200 && request.status < 300) {
        // If successful
        resolve(request);
      } else {
        // If failed
        reject({
          status: request.status,
          statusText: request.statusText
        });
      }
    };
    // Setup our HTTP request
    request.open(method || 'GET', url, true);
    // Send the request
    request.send();
  });
};

// END OF COMMON FUNCTIONS //

// Beginning of exactius reporting service
var reportingService = new function () {
  // Returns the page. Will return "localhost" or "staging" if not running on unbounce
  var getPageVariant = function() {
    if (typeof ub !== 'undefined') {
      return ub.page.variantId;
    } else if (window.location.href.indexOf("localhost") > -1) {
      return 'localhost'
    } else {
      return 'staging'
    }
  }

  // sets a cookie with unique UID
  function initCookie() {
    var cookie = Cookies.getJSON(clientSettings['cookieName']);
    if (typeof cookie == 'undefined') {
      exactiulog('initializing cookie and other services');
      Cookies.set(clientSettings['cookieName'], {uid: ID()}, { expires: clientSettings.expireAfterDays });
      exactiulog('NEW cookie generated', getCookie('uid'), getCookie());
    }
    return cookie;
  }

  // get context params from the cookie. These params will be chained to all
  // events so we could easily filter and segment according to it
  var getContextParams = function(keySubstring) {
    var contextParams = {};
    var key;
    for (var i = 0; i < clientSettings.contextParamsKeys.length; i++) {
      key = clientSettings.contextParamsKeys[i];
      if (!keySubstring || key.indexOf(keySubstring) !== -1) {
        var val = getValue(key);
        if (val) {
          contextParams[key] = val;
        }
      }
    }
    return contextParams;
  };

  // get the entire cookie or a specific value.
  function getCookie(key) {
    var cookie = initCookie(); // get or initialize the cookie
    return isDefined(key) ? cookie[key] : cookie;
  }

  // set the cookie and datalayer with hash of values
  function setCookie(obj) {
    var newCookie = extend(true, getCookie(), obj);
    Cookies.set(clientSettings['cookieName'], newCookie, { expires: 90 });
    // exactiulog('cookie set:', obj, 'new cookie', Cookies.getJSON(clientSettings['cookieName']));
    return Cookies.getJSON(clientSettings['cookieName']);
  }

  // get the uid (this will also init everything if needed)
  function getUID() {
    return getValue('uid');
  }

  function fbInit() {
    if(typeof fbq === 'undefined') {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');

      var fbPixelId = clientSettings.fbPixelId;

      if (!!fbPixelId) {
        // init with uid, so we could add custom attributes
        fbq('init', fbPixelId, {uid: getUID()});
        exactiulog('FB (fbq) initialized');
      } else {
        console.error('Please define FB pixel id in the client settings');
      }
    }
  }

  var triggerHotjar = function(trigger) {
    if (typeof hj !== 'undefined') {            // check if hotjar is defined
        hj('trigger', trigger);               // trigger the event
    } else {                        // or "force load" and try again
      exactiulog('no hotjar variable, hacking something up')
      window.hj=window.hj||function(){(hj.q=hj.q||[]).push(arguments)};
      if (typeof hj !== 'undefined') {
        hj('trigger', trigger);
        exactiulog('secondary hotjar try successful')
      } else {
        exactiulog('no hotjar detected - trigger failed')
      }
    }
  }

  function hjInit() {
    (function(h,o,t,j,a,r){
         h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
         h._hjSettings={hjid:clientSettings.hjid,hjsv:6};
         a=o.getElementsByTagName('head')[0];
         r=o.createElement('script');r.async=1;
         r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
         a.appendChild(r);
     })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

     var pageName = '';
     if (typeof ub !== 'undefined') {   // check if unbounce global variable is available
        pageName = ub.page.name.split(" ").join("_"); // get the page name from unbounce, replace space with underscores
      } else {
        // Use path without slashes, also, consider adding more path details via window.location.hostname +
        pageName = window.location.pathname.replace(/\//g,'');
        exactiulog('no unbounce variable, tagging as generic page: ', pageName)
      }
      pageName = pageName+"_"+getPageVariant()
      triggerHotjar(pageName);
      exactiulog("page name triggered in hj >>>", pageName);
  }

  var propagationInit = function() {
    if (clientSettings['propagation'] == true) {
      if (typeof fbq == 'undefined' &&
          clientSettings['propagateTo'].indexOf('fb') !== -1) {
            exactiulog('initializing FB');
            fbInit();
      }
      if (typeof hj == 'undefined' &&
          clientSettings['propagateTo'].indexOf('hj') !== -1) {
            hjInit();
            exactiulog('initialized HJ', !!hj);
      }
    }
  }

  function fbReportEvent(eventName, params) {
    if(typeof fbq === 'undefined') {
      fbInit();
    }
    params = params || {};
    var paramsWithContext = extend(true, getContextParams(), params);
    if (StandardFBEvents.indexOf(eventName) !== -1) {
      exactiulog('standard event', eventName, paramsWithContext);
      fbq('track', eventName, paramsWithContext);
    } else {
      exactiulog('custom fb event', eventName, paramsWithContext);
      fbq('trackCustom', eventName, paramsWithContext);
    }
  }

  // A-sync push of a single variable to dataLayer
  var setDLVar = function(variable, value) {
    if (typeof dataLayer !== 'undefined') {
      var obj = {};
      obj[variable] = value;
      var result = dataLayer.push(obj);
      return result
    } else {
      console.error('Datalayer undefined');
      return false;
    }
  }

  // Expire the entire localStorage to prevent stale data, this is a catch all method to
  // clean the data on load, even if not accessed yet.
  function localStorageExpiry() {
    var days = clientSettings.expireAfterDays; // Reset when storage is more than 90 days
    var now = new Date().getTime();
    var setupTime = getFromStorage('lastSetupTime');
    if (setupTime == null) {
        addToStorage('lastSetupTime', now);
        exactiulog('expired localStorage, added lastSetupTime: ', now);
    } else {
        if(now-setupTime > days*24*60*60*1000) {
            localStorage.clear()
            addToStorage('setupTime', now);
            exactiulog('cleared storage - data expired ' + days + ' days.');
        }
    }
  }

  // Push to local storage with expiration date
  function addToStorage(key, value) {
     var expiryPeriod = clientSettings.expireAfterDays * 24 * 60 * 60 * 1000; // 90 day expiry in milliseconds
     var expiryDate = new Date().getTime() + expiryPeriod;

     var record = { value: value, expiryDate: expiryDate };

     localStorage.setItem(key, JSON.stringify(record));
   }
   // Get value from localStorage if fresh to consume. Expire otherwise.
   function getFromStorage(key, entireObject) {
     var value = null;
     var localVal = localStorage.getItem(key);
     var obj;
     try {
       obj = JSON.parse(localVal);
     } catch (e) {
       exactiulog('ERROR parsing JSON: ', e, ' Trying to generate a fake entry if value exists');
       obj = ( localVal !== null && isDefined(localVal)) ?
              {value: localVal, expiryDate: (new Date().getTime())*2 }
              : null;
     };
     if (!isDefined(obj)) {
       console.error('Object is not defined for key', key);
     } else if (obj === null) {
       // exactiulog('Object does not exist for key', key);
     } else {
       // check if data is still fresh
       if (currDate < obj.expiryDate) {
         value = obj.value;
       } else {
         // expire this value
         localStorage.removeItem(key);
         value = null;
       }
     }
     return value;
   }

   // Try to get the value from the cookie and fallback to localStorage if it doesn't exist.
   function getValue(key) {
     if (!isDefined(key)) {
       return ;
     }
     // try to get value from the cookie first
     var value = getCookie(key);
     // if it fails, fallback to localStorage
     if (!isDefined(value)) {
       // This will also handle deleting the localStorage value if it's expired
       value = getFromStorage(key);
     }
     return value;
   }

   // Persist the data locally in the cookie, DL and localStorage
   function setValue(key, value) {
     var obj = {}
     obj[key] = value;
     // Set in dataLayer
     setDLVar(clientSettings.dlPrefix + key, value);
     // Set in cookie
     setCookie(obj);
     // Set in localStorage
     addToStorage(key, value);
   }

  // Sets user attributes, and can also propagate those attributes to other systems
  var setUserAttribute = function(attr, value, propagationArray) {
    setValue(attr, value);
    // exactiulog('Monitoring localStorage, expecting ', value, 'got: ', getFromStorage(attr));
    // initiate propagation of this attribute
    if (typeof propagationArray !== 'undefined') {
      propagationArray.map(function(e) {
        var key = Object.keys(e)[0]; // the system to propagte to (fb, hj, etc)
        var propagatedKey = e[Object.keys(e)[0]]; // this key we should use there for this attribute (will replace attr)
        if ( key === 'fb') {
          exactiulog('propagate attribute to FB', propagatedKey, value);
          var fbObj = {};
          fbObj[propagatedKey] = value;
          if(typeof fbq === 'undefined') {
            fbInit();
          }

          if (typeof fbq !== 'undefined') {
            fbq('setUserProperties', clientSettings['fbPixelId'], fbObj);
          }
        }
        else if ( key === 'hj') {
          if (!!hj) {
            // report to hotjar
            exactiulog('propagate attribute to hj', [propagatedKey + ':' + value ]);
            hj('tagRecording', [propagatedKey + ':' + value]);
          } else {
            console.error('Hotjar (hj) not defined');
          }
        }
      });
    }
    // set ga custom dimension if applicable
    if (clientSettings.ga_dimensions && clientSettings.ga_dimensions[attr]) {
      var dimensionKey = clientSettings.ga_dimensions[attr];
      exactiulog('dimensionKey>>>>', dimensionKey)
      if (dimensionKey === Object(dimensionKey) ) {
        var conditions = dimensionKey.conditions;
        for (var i = 0; i < conditions.length; i++) {
          exactiulog(conditions);
          var condition = conditions[i];
          var val1 = condition.field == 'path' ? window.location.pathname : dimensionKey['field'];
          var val2 = condition.target
          var comparators = {
              "eq": function(a, b) { return a === b; },
              "contains": function(a, b) {return a.indexOf(b) > -1}
          };
          if (comparators[condition.compare](val1, val2)) {
            i = conditions.length; // stop the loop
            dimensionKey = condition.value;
            exactiulog('condition assesed and decided - dimension'+dimensionKey);
          }
        }
      } else {
        exactiulog('No condition set GA custom dimension for cd' + clientSettings.ga_dimensions[attr] + ' with value: ' + value);
      }
      // Set value for custom dimension at index dimensionKey.
      setValue('dimension'+ dimensionKey, value);
      // set dimension in the dataLayer. This should also be sent with the context for hit based dimensions.
      // setDLVar("dimension"+ dimensionKey, value);
      // ga('set', 'dimension'+ dimensionKey, value);
    }
  }

  var injectLocationParams = function(_callback) {
    // This is an a-sync function, listen to geo_context_injected to run things after it completes
    // https://gomakethings.com/custom-events-with-vanilla-javascript/
    var event = document.createEvent('Event');
    // Define that the event name is 'geo_context_injected'.
    event.initEvent('geo_context_injected', true, true)
    var t0 = performance.now();
    makeRequest('https://geoip-db.com/json/')
      .then(function (location) {
        var locationParams = JSON.parse(location.response);
        var visitorIp = locationParams.IPv4;
        exactiulog('>>>>>>>>LOCATION>>>>>>', locationParams);
        // set location attributes to the data layer
        setUserAttribute('IP', visitorIp, [{fb: 'visitorIp'}]);
        setUserAttribute('country', locationParams.country_name);
        setUserAttribute('countryCode', locationParams.country_code, [{fb: '$country'}]);
        setUserAttribute('region', locationParams.state, [{fb: '$state'}]);
        setUserAttribute('city', locationParams.city, [{fb: '$city'}]);
        setUserAttribute('latitude', locationParams.latitude);
        setUserAttribute('longitude', locationParams.longitude);
        // flag IP if needed
        var ipBlackList = clientSettings['ipBlackList'] || [];
        var ipFlag = ipBlackList.includes(visitorIp) ? "yes" : "no";
        // set IP flag in the data layer
        setUserAttribute('IP_flag', ipFlag, [{fb: 'IPflag'}]);

        // benchmark
        var t1 = performance.now();
        // dispatch event and set cookie
        document.dispatchEvent(event);
        setValue('geo_context_injected', true);
        exactiulog("IP cycle" + (t1 - t0) + " milliseconds. Result:", locationParams)
      })
      .catch(function (error) {
        exactiulog('Something went wrong with the location service', error);
      });
  }

  var getLocation = function(key) {
    var locObj = {
      country_name: getValue('country'),
      state: getValue('region'),
      region: getValue('region'),
      city: getValue('city'),
      latitude: getValue('latitude'),
      longitude: getValue('longitude'),
      'IPv4': getValue('IP'),
      'IP': getValue('IP'),
      'IP_flag': getValue('IP_flag')
    }
    return isDefined(key) ? locObj[key] : locObj;
  }

  // Extract the utms and gclid from the url
  // TODO - move to common function
  var extractUtms = function() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var utms = {};

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      // capture each UTM
      if (pair[0].indexOf('utm') == 0 ||
          pair[0].indexOf('gclid') == 0 || pair[0].indexOf('gclsrc') == 0) {
        utms[pair[0]] = pair[1];
      }
    }
    // if no UTMs return null
    return Object.keys(utms).length > 0 ? utms : null;
  }

  var returnAllUTMs = function() {
    var utms = getContextParams('utm_');
    return utms;
  }

  // get UTMs and store in the cookie and the dataLayer.
  // notice: if a user comes in from different utm (not empty), it will overwrite the previous ones
  var updateUTMs = function(utmHash) {
    if (utmHash) {
      // update the hash in the datalayer. competible with old browsers.
      for (var key in utmHash){
          if (typeof utmHash[key] !== 'function') {
            setUserAttribute(key, utmHash[key], [{fb: key}]);
            exactiulog("Key is " + key + ", value is: " + utmHash[key]);
          }
      }
    }
    return utmHash;
  }

  // Main function for event reporting
  // Generic report event to DL and other propagated services
  var reportEvent = function(rawEvent, eventName) {
    if (typeof dataLayer !== 'undefined') {
      var mergedEvent = {};
      var eventAction = rawEvent.action || rawEvent.event; // get action, or fallback to the event attribute
      eventName = (eventName || eventAction); // The key to all hashes
      var defaults = clientSettings['events'][eventName] ? clientSettings['events'][eventName]['defaults'] : {}; // get customer defaults
      mergedEvent = extend(true, defaults, rawEvent);
      // exactiulog('after merge',mergedEvent);
      // exactiulog('EVENT NAME TO REPORT', eventName);
      var eventNamePrefixed = clientSettings.eventPrefix + '_' + eventName; // the name to send
      console.assert(eventNamePrefixed, eventNamePrefixed);
      var dlObject = {
        event: eventNamePrefixed,
        category: mergedEvent.category || undefined,
        action: eventAction,
        label: mergedEvent.label || undefined,
        value: mergedEvent.value || undefined,
        nonInteraction: (mergedEvent.nonInteraction != null) ? mergedEvent.nonInteraction : 'false' // default is false for this one
      }
      dlObjWithContext = extend(true, getContextParams(), dlObject);
      // push the event to the Data Layer
      dataLayer.push(dlObjWithContext);
      exactiulog('Event reported to DL - ', dlObjWithContext);
      if (clientSettings['events'][eventName]) {
        try {
          var propagationArray = rawEvent['propagate'] || clientSettings['events'][eventName]['propagate'];
          exactiulog('propagation', propagationArray);
          if (propagationArray) {
            propagationArray.map(function(e) {
              exactiulog(e);
              var key = Object.keys(e)[0];
              if (key === 'fb') {
                fbParams = {
                  content_category: dlObject.category,
                  content_name: dlObject.label,
                  value: dlObject.value,
                  action: eventAction
                };
                exactiulog('propagate event to FB', e[key], fbParams);
                fbReportEvent(e[key], fbParams);
              } else if (Object.keys(e)[0] === 'hj') {
                if (!!hj) {
                  // report to hotjar
                  exactiulog('propagate event to hj', [eventAction + ':' + (dlObject.label || '')]);
                  hj('tagRecording', [e[key] + ':' + (dlObject.label || '')]);
                } else {
                  console.error('Hotjar (hj) not defined');
                }
              }
            });
          }
        } catch(error) {
          exactiulog('error in propagation for ', eventName, error);
        }

        // propogate dimensions
        try {
          var dimensionsToSet = rawEvent['setUserDimensions'] || clientSettings['events'][eventName]['setUserDimensions'];
          exactiulog('dimensionsToSet', dimensionsToSet);
          if (dimensionsToSet) {
            for (var i = 0; i < dimensionsToSet.length; i++) {
              var attrToSet = dimensionsToSet[i][0];
              var attrVal = dimensionsToSet[i][1];
              var propagateDimensionTo = dimensionsToSet[i][2];
              setUserAttribute(mergedEvent[attrToSet] || attrToSet, mergedEvent[attrVal] || attrVal, propagateDimensionTo);
            };
          }
        } catch(error) {
          exactiulog('error dimensions set for event', eventName, error);
        }
      }
      return dlObject;
    } else {
      console.error('no data layer defined');
      return false;
    }
  }

  // Get or set the "accept cookies cookie"
  // Returns true if approved value is 'true', false otherwise
  var notificationsCookie = function(value) {
    var cookieName = clientSettings.notificationsCookieName || 'CookieNotificationCookie';
    if (isDefined(value)) {
      // set notifications cookie
      Cookies.set(cookieName, value, { expires: 365 });
    }
    return Cookies.get(cookieName) === 'true';
  }

  var setFirstVisit = function() {
    var dt = new Date();
    var month = dt.getMonth()+1;
    var day = dt.getDate();
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds()
    var fvDay = ((''+month).length<2 ? '0' : '') + month + '/' +  ((''+day).length<2 ? '0' : '') + day + '/' + dt.getFullYear();
    var fvTime = ((''+hours).length<2 ? '0' : "") + hours + ':' + ((''+minutes).length<2 ? '0' : "") + minutes + ':' + ((''+seconds).length<2 ? '0' : "") + seconds;
    if (Cookies.getJSON('fvTime')) {
      Cookies.set('fvTime', fvTime, { expires: 365 });
      Cookies.set('fvDay', fvDay, { expires: 365 });
    }
    if(!localStorage.getItem('vftime')){
      localStorage.setItem('fvTime', fvTime);
      localStorage.setItem('fvDay', fvDay);
      // Legacy - TODO - remove
      localStorage.setItem('vftime', fvTime);
      localStorage.setItem('vfday', fvDay);
    }
  }

  // Get the first visit date or time. Initialize if not available
  // Date retrieval hirerachy - Cookie, localStorage new, localStorage legacy
  var getFirstVisit = function(dateOrTime) {
    if (!Cookies.getJSON('fvTime') && !localStorage.getItem('fvTime')) { setFirstVisit() }
    if (dateOrTime === 'date') {
      return Cookies.getJSON('fvDay') || localStorage.getItem('fvDay') || localStorage.getItem('vfday') // TODO - legacy vfday remove
    } else if (dateOrTime === 'time') {
      return Cookies.getJSON('fvTime') || localStorage.getItem('fvTime') || localStorage.getItem('vftime') // TODO - legacy vftime remove
    }
  }

  // keep initializing after context injected (usually async)
  var initializeAfterContext = function() {
    localStorageExpiry(); // Expire localStorage
    // set variant on this page
    setUserAttribute('variant', getPageVariant());
    // update the cookie and DL with the current UTMs
    updateUTMs(extractUtms());
    var cookie = Cookies.getJSON(clientSettings['cookieName']);
    // Report PageView after context is ready so we have all data
    fbReportEvent('PageView')
    // Report that the cookies is initialized and populated.
    var cookieReadyEvent = document.createEvent('Event');
    // Define that the event name is 'report.cookieReady'.
    cookieReadyEvent.initEvent('report.cookieReady', true, true)
    // Notify the system that the cookie is ready to consume
    document.dispatchEvent(cookieReadyEvent);
  }

  var clearAllMemory = function(){
    Cookies.remove(clientSettings.cookieName);
    Cookies.remove(clientSettings.notificationsCookieName || CookieNotificationCookie);
    Cookies.remove('fvTime');
    Cookies.remove('fvDay');
    localStorage.clear();
    exactiulog('DEBUG MODE - cookie and localStorage cleared!!');
  }

  var initReportingService = function() {
    DEBUG_MODE = getUrlVars()['debug'] == 'true';
    if (typeof clientSettings == 'undefined') {
      console.error('clientSettings could not be found, analytics service will not initiate');
    } else {
      if (DEBUG_MODE) {
        clearAllMemory();
      }
      // try to get the cookie, or initialize a new one
      var cookie = getCookie();
      // update the cookie with current location
      injectLocationParams();
      // this will initialize the propagation layer - DL, fbq, hj, etc
      propagationInit();
      // Listen for injectLocationParams callback event and keep initializing
      if (getValue('geo_context_injected')) {
        initializeAfterContext();
      } else {
        // context not ready yet, wait for it and then continue
        document.addEventListener('geo_context_injected', initializeAfterContext, false);
      }
      setValue('userAgent', userAgent());
      setValue('userBrowser', userBrowser());
      setValue('cookieEnabled', navigator.cookieEnabled);
      setValue('platform', navigator.platform);
      setValue('browserLanguage', navigator.language);
    }
    exactiulog('UTMs from cookie', returnAllUTMs());
  }

  // System initialize on load
  window.addEventListener('load', initReportingService);

  this.getCookie = getCookie;
  this.getValue = getValue;
  this.notificationsCookie = notificationsCookie;
  this.reportEvent = reportEvent;
  this.setUserAttribute = setUserAttribute;
  this.getUrlVars = getUrlVars;
  this.getLocation = getLocation;
  this.getFirstVisit = getFirstVisit;
  this.returnAllUTMs = returnAllUTMs;
  this.getPageVariant = getPageVariant;
};
