// Publish complete set of organisations to all clients.
Meteor.publish('organisations', function () {
  return Organisations.find();
});

// Publish complete set of projects to all clients.
Meteor.publish('organisationProjects', function (organisation_id) {
  return Projects.find({organisation_id: organisation_id});
});

// Publish complete set of projects to all clients.
Meteor.publish('projects', function () {
  return Projects.find();
});

// Publish complete set of projects to all clients.
Meteor.publish('projectIssues', function (project_id) {
  return Issues.find({project_id: project_id});
});

// Publish complete set of issues for each project to all clients.
Meteor.publish('issues', function () {
  return Issues.find();
});

// Publish complete set of issues for each project to all clients.
Meteor.publish('issue', function (issue_id) {
  return Issues.find({_id: issue_id});
});

// Publish the description for each issue to all clients.
Meteor.publish('descriptions', function(issue_id) {
  return Descriptions.find({issue_id: issue_id});
});

// Publish complete set of comments for each issue to all clients.
Meteor.publish('comments', function(issue_id) {
  return Comments.find({issue_id: issue_id});
});

// Publish complete set of tasks for each issue to all clients.
Meteor.publish('tasks', function(issue_id) {
  return Tasks.find({issue_id: issue_id});
});