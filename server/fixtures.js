// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
	if (Staff.find().count() === 0) {
		var organisations = [
			{name: "Test Business", status: true}
		];

		var staff = [
			{name: 'Joe Bloggs', status: true},
			{name: 'John Doe', status: true},
		];
		
		for (var o = 0; o < organisations.length; o++) {
			var organisation_id = Organisations.insert({
				name: organisations[o].name,
				status: organisations[o].status
			});
			for (var s = 0; s< staff.length; s++) {
				var staff_id = Staff.insert({
					organisation_id: organisation_id,
					name: staff[s].name,
					status: staff[s].status
				});
			}
		}
	}
});