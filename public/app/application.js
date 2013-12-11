/*
  Ember
*/
var App = Ember.Application.create({
  LOG_TRANSITIONS_INTERNAL: true
});

App.RESTAdapter = RL.RESTAdapter.create({
  url: 'http://localhost:4000'
});
// App.ApplicationAdapter = App.RESTAdapter;
App.Client = RL.Client.create({
  adapter: App.RESTAdapter
});

Ember.RSVP.configure('onerror', function(error) {
  Ember.Logger.assert(false, error);
});

/*
  Encapsulate UI methods under compass namespace
*/
// var compass = (function () {
  
//   // start Sly.js slider
//   function startSlider (selector, options) {
//     var $frame = $(selector || '#slider'),
//       defaults = {
//         horizontal: 1,
//         smart: 1,
//         itemNav: 'basic',
//         activateOn: 'mouseenter'
//       };

//     options = $.extend(defaults, (options || {}));

//     $frame.sly(options);
//   }
  
//   return {
//     startSlider: startSlider
//   };

// }());