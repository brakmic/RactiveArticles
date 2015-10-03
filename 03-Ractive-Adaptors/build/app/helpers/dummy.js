let log = require('bows')('Dummy');
import UserService from 'user-service';

export default class Dummy {
  constructor(config){
    this.init(config || { url: 'http://api.randomuser.me/'});
  }
  init(config){
    this.url = config.url;
    this.service = new UserService(config);
  }
  setUrl(url){
    this.service.url = this.url = url;
  }
  queryApi(){
    return this.service.fetchData();
  }
}