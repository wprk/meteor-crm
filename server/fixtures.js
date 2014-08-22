// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Projects.find().count() === 0) {
    var organisations = [
      {name: "kiddivouchers", status: true},
      {name: "do-web-design", status: false},
      {name: "another-organisation", status: false},
    ];

    var projects = [
      {name: "Wider Wallet", status: true},
      {name: "Wider Wallet Admin", status: false}
    ];

    var issues = [
      {name: 'This is Test Issue 1', status: true},
      {name: 'This is Test Issue 2', status: true},
      {name: 'This is a Test Issue 3', status: true}
    ];
    
    var desc = {content: 'This is a Banana'}
    
    var comments = [
      {content: 'This is a Comment 1'},
      {content: 'This is a Comment 2'}
    ]
    
    var tasks = [
      {content: 'This is a Task 1'},
      {content: 'This is a Task 2'},
      {content: 'This is a Task 3'}
    ]

    for (var h = 0; h < organisations.length; h++) {
      var organisation_id = Organisations.insert({
        name: organisations[h].name,
        status: organisations[h].status
      });
      for (var i = 0; i < projects.length; i++) {
        var project_id = Projects.insert({
          organisation_id: organisation_id,
          name: projects[i].name,
          status: projects[i].status
        });
        for (var j = 0; j < issues.length; j++) {
          var issue = issues[j];
          var issue_id = Issues.insert({
            project_id: project_id,
            name: issue.name,
            status: issue.status
          });
          desc.issue_id = issue_id;
          Descriptions.insert(desc);
          for (var k = 0; k < comments.length; k++) {
            comments[k].issue_id = issue_id;
            Comments.insert(comments[k]);
          }
          for (var l = 0; l < tasks.length; l++) {
            tasks[l].issue_id = issue_id;
            Tasks.insert(tasks[l]);
          }
        }
      }
    }
  }
});
