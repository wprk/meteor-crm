Accounts.onCreateUser(function(options, user) {
		
	if (user.profile == null) {
		user.profile = {};
		user.profile.organisation = Organisations.findOne();
		if (options.profile != null) {
			user.profile.name = options.profile.name;
		}
	}
	
	return user;
});