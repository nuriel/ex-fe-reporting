var setUpAutofill = function() {
  retrieveFormData();
  // On click of form button / on form submit, save all available data to local storage
  $(".lp-pom-form .lp-pom-button").click(function(){
  	// console.log("Button was clicked");
  	setTimeout(saveFormData, 100);
  });
}

var postCookieInit = function() {
  console.log('DLService >> cookie is ready and populated:', reportingService.getLocation());
	if (typeof $ !== 'undefined') { setUpAutofill() };

	var location = reportingService.getLocation();
  var country = location.country_name;
  var region = location.state;
  var city = location.city;
  var lat = location.latitude;
  var long = location.longitude;
  var visitorIp = location.IPv4;
	var ipFlag = reportingService.getValue('ipFlag');
  console.log('region, city, country: ', region, city, country, location );

		$('#field81838595_1').attr("checked", reportingService.getValue(clientSettings.autoFillPrefix + 'location_online')).trigger('change');
		$('#field81838595_2').attr("checked", reportingService.getValue(clientSettings.autoFillPrefix + 'location_on_campus')).trigger('change');
		$('#field81838596').val(reportingService.getValue(clientSettings.autoFillPrefix + 'campus')).trigger('change');
		$('#field81838597').val(reportingService.getValue(clientSettings.autoFillPrefix + 'startDate')).trigger('change');
		$('#field81838598').val(reportingService.getValue(clientSettings.autoFillPrefix + 'which_pace')).trigger('change');
	}
}

document.addEventListener('report.cookieReady', postCookieInit, false);

// ########################################################################
// ########################################################################
// UNBOUNCE AUTO FILL
// Adjusted with reportingService setUserAttribute and getValue
// ########################################################################
// ########################################################################

var ls_prepend_default = 'UB_AF_';

function saveFormData() {
	var ls_prepend = clientSettings.autoFillPrefix || ls_prepend_default;
	$(".lp-pom-form input[type='text']").each(function(i, obj) {
		fieldValue = obj.value;
		fieldID = obj.getAttribute("id");
		reportingService.setUserAttribute(ls_prepend+fieldID, fieldValue);
		// localStorage[ls_prepend+fieldID] = fieldValue;
		console.log(fieldID + ": " + fieldValue);
	});
  $(".lp-pom-form input[type='email']").each(function(i, obj) {
		fieldValue = obj.value;
		fieldID = obj.getAttribute("id");
		reportingService.setUserAttribute(ls_prepend+fieldID, fieldValue);
		// localStorage[ls_prepend+fieldID] = fieldValue;
		console.log(fieldID + ": " + fieldValue);
	});
  $(".lp-pom-form input[type='tel']").each(function(i, obj) {
		fieldValue = obj.value;
		fieldID = obj.getAttribute("id");
		reportingService.setUserAttribute(ls_prepend+fieldID, fieldValue);
		// localStorage[ls_prepend+fieldID] = fieldValue;
		console.log(fieldID + ": " + fieldValue);
	});
  $(".lp-pom-form input[type='hidden']").each(function(i, obj) {
		fieldValue = obj.value;
		fieldID = obj.getAttribute("id");
		reportingService.setUserAttribute(ls_prepend+fieldID, fieldValue);
		// localStorage[ls_prepend+fieldID] = fieldValue;
		console.log(fieldID + ": " + fieldValue);
	});
	$(".lp-pom-form select").each(function(i, obj) {
		fieldValue = obj.value;
		fieldID = obj.getAttribute("id");
		reportingService.setUserAttribute(ls_prepend+fieldID, fieldValue);
		// localStorage[ls_prepend+fieldID] = fieldValue;
		console.log(fieldID + ": " + fieldValue);
	});

	$(".lp-pom-form input[type='checkbox']").each(function(i, obj) {
		fieldValue = obj.checked;
		fieldID = obj.getAttribute("id");
		reportingService.setUserAttribute(ls_prepend+fieldID, fieldValue);
		// localStorage[ls_prepend+fieldID] = fieldValue;
		console.log(fieldID + ": " + fieldValue);
	});

	$(".lp-pom-form input[type='radio']:checked").each(function(i, obj) {
		fieldValue = "true";
		fieldID = obj.getAttribute("id");
		reportingService.setUserAttribute(ls_prepend+fieldID, fieldValue);
		// localStorage[ls_prepend+fieldID] = fieldValue;
		console.log(fieldID + ": " + fieldValue);
	});

	$(".lp-pom-form input[type='radio']:not(:checked)").each(function(i, obj) {
		fieldValue = "false";
		fieldID = obj.getAttribute("id");
		reportingService.setUserAttribute(ls_prepend+fieldID, fieldValue);
		// localStorage[ls_prepend+fieldID] = fieldValue;
		console.log(fieldID + ": " + fieldValue);
	});
}

function retrieveFormData() {
	var ls_prepend = clientSettings.autoFillPrefix || ls_prepend_default;
	$(".lp-pom-form input[type='text']").each(function(i, obj) {
		fieldID = obj.getAttribute("id");
		fieldSavedValue = reportingService.getValue(ls_prepend+fieldID);
		// fieldSavedValue = localStorage[ls_prepend+fieldID];
		if(fieldSavedValue != undefined && fieldSavedValue != "" && fieldSavedValue != null) {
			obj.value = fieldSavedValue;
			console.log("Filled " + fieldID);
		}
	});
  $(".lp-pom-form input[type='email']").each(function(i, obj) {
		fieldID = obj.getAttribute("id");
		fieldSavedValue = reportingService.getValue(ls_prepend+fieldID);
		// fieldSavedValue = localStorage[ls_prepend+fieldID];
		if(fieldSavedValue != undefined && fieldSavedValue != "" && fieldSavedValue != null) {
			obj.value = fieldSavedValue;
			console.log("Filled " + fieldID);
		}
	});
  $(".lp-pom-form input[type='tel']").each(function(i, obj) {
		fieldID = obj.getAttribute("id");
		fieldSavedValue = reportingService.getValue(ls_prepend+fieldID);
		// fieldSavedValue = localStorage[ls_prepend+fieldID];
		if(fieldSavedValue != undefined && fieldSavedValue != "" && fieldSavedValue != null) {
			obj.value = fieldSavedValue;
			console.log("Filled " + fieldID);
		}
	});
  $(".lp-pom-form select").each(function(i, obj) {
		fieldID = obj.getAttribute("id");
		fieldSavedValue = reportingService.getValue(ls_prepend+fieldID);
		// fieldSavedValue = localStorage[ls_prepend+fieldID];
		if(fieldSavedValue != undefined && fieldSavedValue != "" && fieldSavedValue != null) {
			obj.value = fieldSavedValue;
			console.log("Filled " + fieldID);
		}
	});
  $(".lp-pom-form input[type='radio'], .lp-pom-form input[type='checkbox']").each(function(i, obj) {
		fieldID = obj.getAttribute("id");
		fieldSavedValue = reportingService.getValue(ls_prepend+fieldID);
		// fieldSavedValue = localStorage[ls_prepend+fieldID];
		console.log('checking ', fieldID, fieldSavedValue);
		if(fieldSavedValue != undefined && fieldSavedValue != "" && fieldSavedValue != null) {
			obj.checked = fieldSavedValue;
			if (obj.checked) {
				var evt = document.createEvent("HTMLEvents");
    		evt.initEvent("change", false, true);
    		obj.dispatchEvent(evt);
			}
			console.log("Filled " + fieldID);
		}
	});
  $(".lp-pom-form input[type='hidden']").each(function(i, obj) {
		fieldID = obj.getAttribute("id");
    if(fieldID == "landingVariant"){
			fieldSavedValue = reportingService.getValue(ls_prepend+fieldID);
			// fieldSavedValue = localStorage[ls_prepend+fieldID];
      if(fieldSavedValue != undefined && fieldSavedValue != "" && fieldSavedValue != null) {
          obj.value = fieldSavedValue;
          console.log("Filled through cookie ready " + fieldID);
      }
    }
	});
}
