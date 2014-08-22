Router.configure({
  layoutTemplate: 'sidebarlayout'
});

Router.map(function() {
  this.route('login', { 
    path: '/login',
    template: 'login',
    layoutTemplate: 'fullLayout'
  });  
  
  this.route('home', { 
    path: '/',
    layoutTemplate: 'fullLayout'
  });
  
  this.route('customers', {
    path: '/customers',
    yieldTemplates: {
      'sidebarLeftCustomers': {to: 'sidebarLeft'}
    }
  });

  this.route('calendar', {
    path: '/calendar',
    template: 'calendar',
    yieldTemplates: {
      'sidebarLeftCalendar': {to: 'sidebarLeft'}
    }
  });
  
  this.route('staff', {
    path: '/staff',
    yieldTemplates: {
      'sidebarLeftStaff': {to: 'sidebarLeft'}
    }
  });
});

var mustBeSignedIn = function(pause) {
  if (! Meteor.user() && !Meteor.loggingIn()) {
    Router.go('login');
  }
  pause();
};

var onLogin = function(pause) {
  if (Meteor.user() || Meteor.loggingIn()) {
      Router.go('home');
  }
  pause();
};

Router.onAfterAction(function() { Errors.clearSeen(); });

Router.onAfterAction(mustBeSignedIn, {except: ['login']});
Router.onAfterAction(onLogin, {only: ['login']});