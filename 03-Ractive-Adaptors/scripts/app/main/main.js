//Boostrap styles
require('bootstrap.min.css');
require('bootstrap.theme.min.css');

//Extra fonts
require('font-awesome.min.css');

//App styles
require('app.css');

//Global scripts
import Ractive from 'ractive';
window.Ractive = Ractive;

//RactiveJS adaptors
import QueryAdaptor from 'query-adaptor';
window.Ractive.adaptors.QueryAdaptor = QueryAdaptor;

// Ractive Debugging
Ractive.DEBUG = /unminified/.test(function() { /*unminified*/ });
Ractive.DEBUG_PROMISES = false;

//jQuery
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
require('bootstrap.min');

import template  from 'main.html';
import domReady  from 'domready';

let log = require('bows')('MainApp');

import QueryHelperClass from 'query-helper';

export default new class App {
  constructor(){
    domReady(() => {
      this.init();
      window.App = this;
    });
  }
  init(){
    this._main = new Ractive({
      el: '#app-root',
      template: template,
      adapt: ['QueryAdaptor'],
      data: function(){
        return {
          json        : 'no data',
          queryHelper : new QueryHelperClass(),
          message     : 'Ractive.JS Adaptors Demo'
        };
      },
      onrender: function(){
        log('rendered');
      },
      oncomplete: function(){
        log('completed');
      },
      onteardown: function(){
        log('removed');
      }
    });
    this._main.on('fetch-data', function(e){
      let queryHelper = this.get('queryHelper');
      queryHelper.queryApi().then((data) => {
        let asString = JSON.stringify(data, null, 4);
        this.set('json', asString);
      });
    });
  }
}