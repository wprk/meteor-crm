if (Meteor.isClient) {
  Template.header.events({
    "click #logout": function (event) {
      event.preventDefault();
      Meteor.logout(function() {
          Errors.throw('You have been logged out.');
      });
    },
    "click #customers": function (event) {
      event.preventDefault();
      Router.go('customers');
    },
    "click #calendar": function (event) {
      event.preventDefault();
      Router.go('calendar');
    },
    "click #staff": function (event) {
      event.preventDefault();
      Router.go('staff');
    }
  });
}