let log = require('bows')('QueryHelper');
import QueryService from 'query-service';

export default class QueryHelper {
  constructor(config){
    this.init(config || { url: 'http://api.randomuser.me/'});
  }
  init(config){
    this.url = config.url;
    this.service = new QueryService(config);
  }
  setUrl(url){
    this.service.url = this.url = url;
  }
  queryApi(){
    return this.service.fetchData();
  }
}