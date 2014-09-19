// Publish an organisation's staff list
Meteor.publish('organisationStaff', function (organisation_id) {
  var organisationStaff = Staff.find({organisation_id: organisation_id});
  return organisationStaff;
});

// Publish a calendars events
Meteor.publish('calendarEvents', function (organisation_id) {
  return Events.find({organisation_id: organisation_id});
});