let log = require('bows')('QueryService');

export default class QueryService {
  constructor(config){
    this._config = config || { url: 'http://api.randomuser.me/'};
    this.init(this._config);
  }
  init(config){
    this.url = config.url;
    log(`initialized with url: ${this.url}`);
  }
  fetchData(){
    return fetch(this.url).then(function(res){
      return res.json();
    }).catch(function(err){
      log(JSON.stringify(err, null, 4));
    });
  }
}