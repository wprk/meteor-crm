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
    } else {
      ServiceConfiguration.configurations.remove({
        service: "google"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "google",
        "clientId" : "794125023120-pc0v6eouongba6ka8q9gf0qr1sd7hi8s.apps.googleusercontent.com",
        "secret" : "_C7Onr-GDVOLif5SeUrn5azS"
      });
    }
  } catch(error) {
    console.log(error.message);
  }
});