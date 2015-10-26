module.exports = [
  {
    dest:'jquery.js',
    source: 'http://code.jquery.com/jquery-2.1.4.js'
  },
  {
    dest: 'mvc.js',
    source: [
      'https://raw.githubusercontent.com/douglascrockford/JSON-js/master/json2.js',
      'http://underscorejs.org/underscore.js',
      'http://backbonejs.org/backbone-min.js'
    ]
  },
  {
    dest: 'analytics.js',
    source: [
      'http://www.google-analytics.com/analytics.js',
      'http://web.localytics.com/v3/localytics.min.js',
      'http://cdn.optimizely.com/js/28194414.js',
      'https://js.intercomcdn.com/intercom.fe53cbbe.js'
    ]
  }
];
