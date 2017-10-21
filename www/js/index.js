/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {


    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        /*
        document.getElementById("setLocalStorage").addEventListener("click", setLocalStorage); 
        document.getElementById("removeProjectFromLocalStorage").addEventListener 
   ("click", removeProjectFromLocalStorage);

   alert("hello")*/

   //Buttons
    document.getElementById("createContact").addEventListener("click", createContact);
    document.getElementById("findContact").addEventListener("click", findContact);
    document.getElementById("deleteContact").addEventListener("click", deleteContact);
    
    //List
    //document.getElementById("listContact").addEventListener("click", listContact);
    
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};
/*
function setLocalStorage() { 
   localStorage.setItem("Name", "John"); 
   localStorage.setItem("Job", "Developer"); 
   localStorage.setItem("Project", "Cordova Project"); 
}
function removeProjectFromLocalStorage() {
   localStorage.removeItem("Project");
}
*/

/* Create Contact */
function createContact() {
   var myContact = navigator.contacts.create({"displayName": "Test User"});
   myContact.save(contactSuccess, contactError);
    
   function contactSuccess() {
      alert("Contact is saved!");
   }
    
   function contactError(message) {
      alert('Failed because: ' + message);
   }
}

/* Find Contact */
function findContacts() {
    $("#loading").show();

   var options = new ContactFindOptions();
   options.filter = "";
   options.multiple = true;
   fields = ["displayName"];
   navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);
    
   function contactfindSuccess(contacts) {

    //to display contacts in a list view
    var listContact='';
      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].displayName=="Test User") {
            listContact='<li>'+contacts[i].displayName+'</li>';
            $("#contactsList").append(listContact);
        }
         //alert("Display Name = " + contacts[i].displayName);
      }
      $("#contactsList").listview("refresh");
      $("#loading").hide();
   }
    
   function contactfindError(message) {
      alert('Failed because: ' + message);
   }
    
}

/* Delete Contact */
function deleteContact() {
   var options = new ContactFindOptions();
   options.filter = "Test User";
   options.multiple = false;
   fields = ["displayName"];
   navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

   function contactfindSuccess(contacts) {
      var contact = contacts[0];
      contact.remove(contactRemoveSuccess, contactRemoveError);

      function contactRemoveSuccess(contact) {
         alert("Contact Deleted");
      }

      function contactRemoveError(message) {
         alert('Failed because: ' + message);
      }
   }

   function contactfindError(message) {
      alert('Failed because: ' + message);
   }
    
}

/*
function listContact(){
    alert("Hello1");
}
*/