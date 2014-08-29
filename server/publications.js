// // Publish complete set of organisations to all clients.
// Meteor.publish('organisations', function () {
//   return Organisations.find();
// });

// // Publish complete set of calendars to all clients.
// Meteor.publish('organisationCalendars', function (organisation_id) {
//   return Calendars.find({organisation_id: organisation_id});
// });

// // Publish complete set of projects to all clients.
// Meteor.publish('calendarEvents', function (calendar_id) {
//   return Events.find({calendar_id: calendar_id});
// });