
// Collections store persistent data both client & server side
// sets up mongoDB collection on server
// sets up cache connected to server on client
// just call "CollectionName = new Mongo.Collection('collection-name');"
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    // calling the function "tasks"
    tasks: function() {
      // finds all the tasks, added "sort" to arrange by the createdAt value below in insert event
      return Tasks.find({}, { sort: {createdAt: -1}});
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
        createdAt: new Date()

      });

      // Clears form with empty string
      event.target.text.value = "";

      // Prevent default form submit
      return false;
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