(function(global){

  var App = {
    _main: null
  };
  var Ractive = window.Ractive;

//*Custom event definition - BEGIN
  Ractive.events.click2 = function(node, fire){
    var click2Handler;

    click2Handler = function(event){
      event.preventDefault();

      fire({
        node: node,
        original: event,
        x: event.clientX,
        y: event.clientY,
        extra: 'this is some extra data only I can provide'
      });
    };

    node.addEventListener('click', click2Handler);

    return {
      teardown: function(){
        console.log('click2 event removed');
        node.removeEventListener('click2', click2Handler);
      }
    };
  };
//Custom event definition - END

  var ractive = new Ractive({
    el: '#app-main',
    template: '#app-template',
    data: function(){
      return {
        message: 'WebService Query',
        results: {
          user: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            photo: ''
          }
        }
      };
    },
    onrender: function(){
      console.log('rendered');
    },
    oncomplete: function(){
      console.log('completed');
    },
    onteardown: function(){
      console.log('removed');
    },
    queryWebService: function(){
      return $.ajax({
               type: 'GET',
               dataType: 'json',
               url: 'http://api.randomuser.me'
      });
    },
    showUserInfo: function(user){
      this.set('results.user.firstName', user.name.first);
      this.set('results.user.lastName', user.name.last);
      this.set('results.user.email', user.email);
      this.set('results.user.phone', user.phone);
      this.set('results.user.photo', user.picture.medium);
      this.set('results.userInfo', JSON.stringify(user, null, 4));
    }
  });

  ractive.on('query-webservice', function(e){
    var self = this;
    e.original.preventDefault();
    console.log('querying web-service...');
    this.queryWebService().done(function(data){
      self.showUserInfo(data.results[0].user);
    }).fail(function() {
      console.log('query failed');
    })
    .always(function() {
      console.log('query completed');
    });
  });


//Custom event click2 (also uncomment the declaration in main.html)
/*  ractive.on('click2-in-action', function(e){
    e.original.preventDefault();
    console.log('Extra data: ' + e.extra);
  });*/

  ractive.observe('results.user.firstName', function(newVal,oldVal,keyPath){
    console.log('User name in ' + keyPath + ' was changed from ' + JSON.stringify(oldVal) + ' to ' + JSON.stringify(newVal));
  });

  App._main = ractive;
  window.App = App;


}(window));