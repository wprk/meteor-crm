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
        "clientId" : "794125023120-eq0c9s9hhp7rbr1sjv34fr5inkf9dac8.apps.googleusercontent.com",
        "secret" : "VJfBmq4WVfhDjboeS9OqrE3e"
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
        "clientId" : "794125023120-pc0v6eouongba6ka8q9gf0qr1sd7hi8s.apps.googleusercontent.com",
        "secret" : "_C7Onr-GDVOLif5SeUrn5azS"
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