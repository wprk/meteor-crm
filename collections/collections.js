Organisations = new Meteor.Collection("organisations");
Projects = new Meteor.Collection("projects");
Issues = new Meteor.Collection("issues");
Descriptions = new Meteor.Collection("descriptions");
Comments = new Meteor.Collection("comments");
Tasks = new Meteor.Collection("tasks");

if (Meteor.isClient) {
  Handlebars.registerHelper('organisations', function () {
    return Organisations.find();
  });
  Handlebars.registerHelper('activeOrganisations', function () {
    return Organisations.find({status: true});
  });
  Handlebars.registerHelper('organisationProjects', function () {
    var organisationContent = this;
    var projects = Projects.find({'organisation_id': organisationContent._id});
    organisationContent.projects = projects;
    return organisationContent;
  });
  Handlebars.registerHelper('activeOrganisationProjects', function () {
    var organisationContent = this;
    var projects = Projects.find({'organisation_id': organisationContent._id, status: true});
    organisationContent.projects = projects;
    return organisationContent;
  });
  Handlebars.registerHelper('projectIssues', function () {
    var projectContent = this;
    var issues = Issues.find({'project_id': projectContent._id});
    projectContent.issues = issues;
    return projectContent;
  });
  Handlebars.registerHelper('activeProjectIssues', function () {
    var projectContent = this;
    var issues = Issues.find({'project_id': projectContent._id, status: true});
    projectContent.issues = issues;
    return projectContent;
  });
  Handlebars.registerHelper('issueData', function () {
    var issueContent = this;
    var description = Descriptions.find({'issue_id': issueContent._id});
    var comments = Comments.find({'issue_id': issueContent._id});
    var tasks = Tasks.find({'issue_id': issueContent._id});
    issueContent.desc = description;
    issueContent.comments = comments;
    issueContent.tasks = tasks;
    return issueContent;
  });
}