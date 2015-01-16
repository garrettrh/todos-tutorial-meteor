
// Collections store persistent data both client & server side
// sets up mongoDB collection on server
// sets up cache connected to server on client
// just call "CollectionName = new Mongo.Collection('collection-name');"
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function() {
      return Tasks.find({});
    }
  });
}






// Below Array is commented out in favor of Collection above

  // passing in a helper to the body called "tasks"
  // Template.body.helpers({
    // creating an array of tasks to use in view
//     tasks: [
//       { text: "This is task 1" },
//       { text: "This is task 2" },
//       { text: "This is task 3" }
//     ]
//   });
// }