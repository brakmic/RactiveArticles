let log = require('bows')('QueryAdaptor');
import QueryHelperClass from 'query-helper';

export default {
    filter: function(object){
      return object instanceof QueryHelperClass;
    },
    wrap: function(ractive, qhInstance, keypath, prefixer){
      let service = qhInstance.service;
      let url = qhInstance.url;

      qhInstance.setUrl = function(url){
        log(`url changed to ${url}`);
        this.url = this.service.url = url;
      };
      qhInstance.queryApi = function(){
        log(`querying api ${this.url}`);
        return this.service.fetchData();
      };

      return {
        teardown: function(){
          log(`removing Adaptor`);
          delete qhInstance.url;
          delete qhInstance.setUrl;
          delete qhInstance.queryApi;
        },
        get: function(){
          return {
            url: qhInstance.url,
            setUrl:qhInstance.setUrl,
            queryApi: qhInstance.queryApi
          };
        },
        set: function(prop, val){
          log(`putting value: ${val} into property ${prop}`);
          if(prop == 'url'){
            qhInstance[prop] = val;
          }
        },
        reset: function(data){
          log(`resetting`);
          //in case a non-object or a QueryHelperClass instances is set()
          if(typeof data !==  'object' || data instanceof QueryHelperClass){
            return false;
          }
          if(data.url !== undefined){
            qhInstance.url = url;
          }
        }
      };
    }
};