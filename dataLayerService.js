var dataLayerService = (function () {
  var triggerStandardEvent = function(eventName, attributes) {
    reportingService.reportEvent(rawEvent, eventName);
  }

  return {
    // Cat vs Dog
    setSpecies: function(species) {
      species = species.toLowerCase();
      if ('cat'=== species || 'dog' === species) {
        reportingService.setUserAttribute('species', species, [{fb: 'pet_species'}]);
      }
    },
    quoteGenerated: function(quote) {
      console.log('NEW QUOTE FROM REPORTING', quote);
      var firstPetQuote = quote.quote_pets[0]
      // get the 250 deductible as a point of reference
      reportingService.reportEvent({category: 'conversion', event: 'signup_submit'}, 'signup_submit');
      reportingService.reportEvent({event: 'quote_generate', label: firstPetQuote.pet.breed_code, value: firstPetQuote.policy_options[1] });
    }
  }
})();

// Check matching selectors and return the index if found, false otherwise
var trySelectorMatch = function(eventTarget, selectorsList) {
	// Check id/class or any other selector of the clicked element are in the tracked list
	var inSelectors = false;
	for (var i = 0; i < selectorsList.length; i++) {
		if (eventTarget.matches(selectorsList[i]) || eventTarget.closest(selectorsList[i])) {
			// finished looking
			return i;
		}
	}
	// if we got here, it's a no go
	return inSelectors;
}

// Track clicks
document.addEventListener('click', function (event) {
  // console.log('CLICK', event.target, event.currentTarget);
  var selectorsToTrack = {
		// toggling price card monthly vs daily
		'#lp-pom-button-182': {
      event: 'toggle_click',
      label: 'pricing-daily'
		},
		'#lp-pom-button-181': {
			event: 'toggle_click',
			label: 'pricing-monthly'
		},
		// toggling price card monthly vs daily
		'#lp-pom-button-99': {
      event: 'toggle_click',
      label: 'testimonial-vet'
		},
		'#lp-pom-button-98': {
			event: 'toggle_click',
			label: 'testimonial-parent'
		},
		// toggling dogs in header
		'#lp-pom-button-279': {
      event: 'choose_species',
      label: 'dog | header'
		},
		'#lp-pom-button-326': {
			event: 'choose_species',
			label: 'cat | header'
		},
    // Main CTAs
		'#lp-pom-button-184': {
			event: 'main_cta_click',
      label: 'get quote | pricing card'
		},
		'#lp-pom-button-87': {
			event: 'main_cta_click',
      label: 'get quote | coverage overview'
		},
		'#lp-pom-button-160': {
			event: 'main_cta_click',
      label: 'get quote | save on preventive care'
		},
		'#lp-pom-button-166': {
			event: 'main_cta_click',
      label: 'get quote | 90 percent reimbursement'
		},
		'#lp-pom-button-418': {
			event: 'main_cta_click',
      label: 'get quote | savings add up'
		},
    // CTAs
		'#lp-pom-button-47': {
			event: 'cta_click',
      label: 'create my pet plan | hero'
		},
		'#lp-pom-button-251': {
			event: 'cta_click',
      label: 'see what you get | wizard'
		},
    	'#lp-pom-button-554': {
          event: 'cta_click',
          label: 'restart | wizard'
        },
		'#lp-pom-button-90': {
			event: 'cta_click',
      label: 'see why pet owners | try 30 days free'
		},
		'#lp-pom-button-137': {
      event: 'cta_click',
      label: 'How Pumpkin makes life easier | make it easy'
		},
		'#lp-pom-button-472': {
      event: 'cta_click',
      label: 'Add another pet | under pricing'
		},
    // Video plays
		'#lp-pom-button-46': {
			event: 'video_play',
      label: 'hero'
		},
		'#lp-pom-image-545': {
			event: 'video_play',
      label: 'makes life easier'
		},
	// Quote Form Multi-Pet Answers
	'#lp-pom-box-34': {
		category: 'interest',
		event: 'choose_pet_amount',
		label: 'one | popup'
	},
	'#lp-pom-box-37': {
		category: 'interest',
		event: 'choose_pet_amount',
		label: 'more than one | popup'
	},
    // wizard questions
    '#lp-pom-box-565': {
      category: 'wizard',
      event: 'wizard_answer',
      action: 'pet_amount',
      label: 'one'
    },
    '#lp-pom-box-568': {
      category: 'wizard',
      event: 'wizard_answer',
      action: 'pet_amount',
      label: 'more than one'
    },
    '#lp-pom-box-241': {
      category: 'wizard',
      event: 'wizard_answer',
      action: 'species',
      label: 'dog'
    },
    '#lp-pom-box-242': {
      event: 'wizard_answer',
      action: 'species',
      label: 'cat'
    },
    '#lp-pom-box-254': {
      event: 'wizard_answer',
      action: 'gender',
      label: 'male'
    },
    '#lp-pom-box-257': {
      event: 'wizard_answer',
      action: 'gender',
      label: 'female'
    },
    '#lp-pom-box-595': {
      event: 'wizard_answer',
      action: 'previous_ownership',
      label: 'yes'
    },
    '#lp-pom-box-598': {
      event: 'wizard_answer',
      action: 'previous_ownership',
      label: 'no'
    },
    '#lp-pom-box-584': {
      event: 'wizard_answer',
      action: 'has_insurance',
      label: 'yes-currently'
    },
    '#lp-pom-box-587': {
      event: 'wizard_answer',
      action: 'has_insurance',
      label: 'yes-previously'
    },
    '#lp-pom-box-591': {
      event: 'wizard_answer',
      action: 'has_insurance',
      label: 'no'
    },
    // read more
    '#lp-pom-button-53': {
      event: 'read_more_click'
    },
    // Wizard events - TBD
    '#lp-pom-image-751': {
      event: 'wizard_click',
      action: 'answer_course',
      label: 'Software Engineering'
    },
    '#lp-pom-image-750': {
      event: 'wizard_click',
      action: 'answer_course',
      label: 'UX/UI Design'
    }
	}
	var selectors = Object.keys(selectorsToTrack);
 	var selectorIndex = trySelectorMatch(event.target, selectors)
	// if the selector isn't right, abandone
	if (!selectorIndex || selectorIndex < 0) return;
	// store the event details
	var eventDetails = selectorsToTrack[selectors[selectorIndex]];
	console.log('TRACKING ', eventDetails);
	reportingService.reportEvent(eventDetails, eventDetails.event);

	// Log the clicked element in the console
	console.log(event.target, eventDetails);
  return;
}, true)

// Track value changes (mainly inputs)
document.addEventListener('change', function(event) {
  var selectorsToTrack = {
		'#dd_species': {attribute: 'species'},
		'#pet_age': {attribute: 'pet_age'},
		'#petAge': {
			attribute: 'pet_age',
			category: 'wizard',
			event: 'wizard_answer',
			action: 'pet_age',
			label: event.target.value
		}, // Wizard DD
		'#dd_breed': {attribute: 'breed'},
    	'#petBreed': {
    		attribute: 'breed',
    		category: 'wizard',
    		event: 'wizard_answer',
    		action: 'breed',
    		label: event.target.value
    	}, // Wizard DD
		'#pet_gender': {attribute: 'pet_gender'},
		'#pet_name': {attribute: 'pet_name'},
		'#zipcode': {attribute: 'pet_name'},
		'#state_code': {attribute: 'state_code'},
		'#state_covered': {attribute: 'state_covered'},
		'#breed_code': {attribute: 'breed_code'}
	}
	var selectors = Object.keys(selectorsToTrack);
  var selectorDetails = {attribute: event.target.id};
	var selectorIndex = trySelectorMatch(event.target, selectors)
  if (selectorIndex) {
    var selectorDetails = selectorsToTrack[selectors[selectorIndex]];
  }

  var eventValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value
  // report with prefix+id to prefill forms
  reportingService.setUserAttribute(clientSettings.autoFillPrefix + event.target.id, eventValue);

  if ((event.target.id === 'petAge') || (event.target.id === 'petBreed')) {
    console.log('if ', event.target.id);
    reportingService.reportEvent(selectorDetails, selectorDetails.event);
  } else {
    console.log('else ', event.target.id);
	// report without prefix to initiate propagation and such
  	reportingService.setUserAttribute(selectorDetails.attribute, eventValue);
  }
}, false);

// Polyfills
/**
 * Element.closest() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.closest) {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}
	Element.prototype.closest = function (s) {
		var el = this;
		var ancestor = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (ancestor.matches(s)) return ancestor;
			ancestor = ancestor.parentElement;
		} while (ancestor !== null);
		return null;
	};
}
