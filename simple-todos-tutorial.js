
// Collections store persistent data both client & server side
// sets up mongoDB collection on server
// sets up cache connected to server on client
// just call "CollectionName = new Mongo.Collection('collection-name');"
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    // calling the function "tasks"
    // commented out to add checkbox if/else block below to remove completed tasks instead of returning all
    // tasks: function() {
      // finds all the tasks, added "sort" to arrange by the createdAt value below in insert event
      // return Tasks.find({}, { sort: {createdAt: -1}});
    // }
    tasks: function() {
      // "Session" is reactive data state for Client side, not connected to server
      // Perfect place for temporary UI states like checkboxes
      // Call "Session.get..." whatever you want
      if (Session.get("hideCompleted")) {
        // if hide-completed is checked, filter if any are checked is true
        return Tasks.find({ checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        // if it's not checked, keep it like before and return all the tasks
        return Tasks.find({}, { sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    // adding function to count number of not completed to-dos
    incompleteCount: function() {
      // return any unfinished tasks and count them
      return Tasks.find({ checked: {$ne: true}}).count()
    }
  });

// Adding Event Listener to Template, same as adding Helpers
// Template.templateName.events(...)
// Keys describe event to listen for...
// Values are event handlers called when even happens
// Function listening to the "submit" event on the form button
  Template.body.events({
    // listening for "submit" action on any CSS Class "new-task"
    "submit .new-task": function(event) {

      // function gets called when new task form gets submitted
      // "event.target" is form element
      // "event.target.text.value" gets text value from input
      var text = event.target.text.value;

      // can "console.log(event)" to get event value

      // Inserts the text inputed into the Tasks Collection (defined on line 6)
      Tasks.insert({
        // Anything can be added, since schema doesn't have to be defined (noSQL)
        text: text,

          // adds the current time of insert to the new object
        createdAt: new Date(),

        // _id of logged in user - Meteor returns the _id of currentUser with .userId()
        owner: Meteor.userId(),

        // username of logged in user - Meteor returns whole currentUser document with .user()
        username: Meteor.user().username
      });

      // Clears form with empty string
      event.target.text.value = "";

      // Prevent default form submit
      return false;
      // missing comma below '},' caused an error, make sure to close out "action .class" function blocks with comma
    },
    // Adding Event Handler to update Session variable based on if hide task box is checked or unchecked
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });

  Template.task.events({
    // 
    "click .toggle-checked": function () {
      // setting property to opposite of current value
      // "update" takes two arguments, the selector of subset of collection, and what to happen to matched objects
      Tasks.update(this._id, {$set: {checked: ! this.checked}});
      // "$set" toggles checked field
    },

    // deletes task when run on button
    "click .delete": function () {
      // "remove" takes one argument, the selector
      Tasks.remove(this._id);
    }
  });
    // adding code to allow log in by username instead of e-mail
    Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
    });

}






// Below Array is commented out in favor of Collection in a real DB (Mongo) at top

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