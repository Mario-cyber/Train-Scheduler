// Link to Friebase and authenticate credentials
var config = {
    apiKey: "AIzaSyBznHiPaF3lsxom5ZidCbvqYuP8UzcGCPE",
    authDomain: "train-scheduler-week-7-hw.firebaseapp.com",
    databaseURL: "https://train-scheduler-week-7-hw.firebaseio.com",
    projectId: "train-scheduler-week-7-hw",
    storageBucket: "train-scheduler-week-7-hw.appspot.com",
    messagingSenderId: "243147156903",
    appId: "1:243147156903:web:adb4dd29986303e5d51a82",
    measurementId: "G-1988CSP0HF"
};
// initialyze firebase 
firebase.initializeApp(config);

// store our database in a varibale to facilitate its use.
let database = firebase.database();

$(document).ready(function () {

    // Initial Values
    let trainName = "";
    let destination = "";
    let firstTrain = "";
    let trainInterval = 0;

    // get input from user 

    $(".btn").on("click", function () {
        event.preventDefault()
        trainName = $("#train").val().trim().toLowerCase()
        destination = $("#destination").val().trim().toLowerCase()
        firstTrain = $("#first").val().trim().toLowerCase()
        trainInterval = $("#interval").val().trim().toLowerCase()

        // create a local object to store train data
        newTrain = {
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            interval: trainInterval
        }
        // console log new object
        // console.log("new train: " + newTrain)

        // upload train data onto firbase database
        database.ref().push(newTrain);

        // empty the value of out input bars once info has been submmited
        $(".form-control").val("")
    })


    //  Create Firebase event for adding train data to the database and a row in the html when a user adds an entry
    //  like an event listenr but for riebase. In this case, when a new child is added to
    //  firebase, the following comands are executed. 

    database.ref().on("child_added", function (childSnapshot) {
        console.log("snapshot" + childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().firstTrain;
        var trainInterval = childSnapshot.val().interval;

        // log infor into console 
        console.log(trainName)
        console.log(destination)
        console.log(firstTrain)
        console.log(trainInterval)

    })

    // table row generator 

    function generateRow(rowLikeObject) {
        const keys = Object.keys(rowLikeObject)
        let tr = '<tr>';

        for (let i = 0; i < keys.lenght; i++) {
            tr += '<td>' + rowLikeObject[keys[i]] + '</td>'
        }
        tr += '<td>Actions</td>' + // this action tag is optinal
            '</tr>';

        $('tbody').append(tr)

        // create validation for input values
    }


})