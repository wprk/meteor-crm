Accounts.onCreateUser(function(options, user) {
	
	var accessToken = user.services.github.accessToken;

	userResponse = Meteor.http.get("https://api.github.com/user", {
		headers: {
			"User-Agent": "Meteor/1.0"
		},
		params: {
			access_token: accessToken
		}
	});

	if (userResponse.error)
		throw userResponse.error;
	
	userData = {git: _.pick(userResponse.data,
		"login",
		"name",
		"avatar_url",
		"url",
		"company",
		"blog",
		"location",
		"email",
		"bio",
		"html_url"
	)};
	
	user.profile = userData;
	
	return user;
});