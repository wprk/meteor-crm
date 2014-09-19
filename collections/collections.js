Organisations = new Meteor.Collection("organisations");
Staff         = new Meteor.Collection("staff");
Events        = new Meteor.Collection("events");

if (Meteor.isClient) {
	// var user = Meteor.users.findOne();
	// var organisation_id = user.profile.organisation;
	// Meteor.subscribe('organisationStaff', organisation_id);
	// Meteor.subscribe('calendarEvents', organisation_id);
}