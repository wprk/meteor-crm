Meteor.startup(function () {
  //code to run on server at startup
  try {
    enviroment = process.env.NODE_ENV;
    if (enviroment == 'production') {
      ServiceConfiguration.configurations.remove({
        service: "google"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "google",
        "clientId" : "181059737409-5cfcr237ab8flcbgeq0d0kesp701m7uk.apps.googleusercontent.com",
        "secret" : "20Rj2qOgSbcQF69qVOPxrFsA"
      });
      ServiceConfiguration.configurations.remove({
        service: "github"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "github",
        "clientId" : "c7cc0e8ab2f70afc1305",
        "secret" : "a16904f0ef41cdae16183b035458da7b96541dbf"
      });
    } else {
      ServiceConfiguration.configurations.remove({
        service: "google"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "google",
        "clientId" : "181059737409-4ljduubsrrimbifgcbhj1ti93l6600ai.apps.googleusercontent.com",
        "secret" : "7W5D5pbsh7euajSJRaw3mWhM"
      });
      ServiceConfiguration.configurations.remove({
        service: "github"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "github",
        "clientId" : "18eca7f55e5118c8c2c0",
        "secret" : "fd7e6626512861b84979ff99794da1fdf3ca3f41"
      });
    }
  } catch(error) {
    console.log(error.message);
  }
});