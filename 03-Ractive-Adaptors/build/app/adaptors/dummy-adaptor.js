let log = require('bows')('DummyAdaptor');
import Dummy from 'dummy';

export default {
    filter: function(object){
      return object instanceof Dummy;
    },
    wrap: function(ractive, dummy, keypath, prefixer){
      let service = dummy.service;
      let url = dummy.url;

      dummy.setUrl = function(url){
        log(`url changed to ${url}`);
        this.url = this.service.url = url;
      };
      dummy.queryApi = function(){
        log(`querying api ${url}`);
        return this.service.fetchData();
      };

      return {
        teardown: function(){
          log(`removing Adaptor`);
          delete dummy.url;
          delete dummy.setUrl;
          delete dummy.queryApi;
        },
        get: function(){
          return {
            url: dummy.url,
            setUrl:dummy.setUrl,
            queryApi: dummy.queryApi
          };
        },
        set: function(prop, val){
          log(`putting value: ${val} into property ${prop}`);
          if(prop == 'width' || prop == 'height'){
            dummy[prop] = val;
          }
        },
        reset: function(data){
          log(`resetting`);
          //ignore non-objects and Dummy objects
          if(typeof data !==  'object' || data instanceof Dummy){
            return false;
          }
          if(data.width !== undefined){
            dummy.width = width;
          }
          if(data.height !== undefined){
            dummy.height = height;
          }
        }
      };
    }
};