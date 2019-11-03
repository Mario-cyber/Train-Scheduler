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
        trainName = $("#train").val().trim()
        destination = $("#destination").val().trim()
        firstTrain = moment($("#first").val().trim(), 'HH:mm').format('HH:mm')
        trainInterval = $("#interval").val().trim()

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

    })


    //  Create Firebase event for adding train data to the database and a row in the html when a user adds an entry
    //  like an event listenr but for riebase. In this case, when a new child is added to
    //  firebase, the following comands are executed. 

    database.ref().on("child_added", function (childSnapshot) {
        // console.log("snapshot regular type" + typeof childSnapshot);
        console.log('snapshot stringified', JSON.stringify(childSnapshot));
        // console.log('snapshot stringified type', typeof JSON.stringify(childSnapshot));

        // retieve information ftom database and store everything into a variables.
        let trainName = childSnapshot.val().name;
        let destination = childSnapshot.val().destination;
        let firstTrain = childSnapshot.val().firstTrain;
        let trainInterval = childSnapshot.val().interval;

        // log infor into console 
        console.log('name: ' + trainName)
        console.log('destination: ' + destination)
        console.log('first departure: ' + firstTrain)
        console.log('frequency: ' + trainInterval)

        // do mathy thingy to times ! (thanks Jo for the help!)
        let timeDiff = moment().diff(moment(firstTrain, 'HH:mm'), 'minutes');
        let minutesAway = trainInterval - timeDiff % trainInterval;
        let nextArrival = moment().add(minutesAway, "minutes").format('HH:mm');

        // conolo log time values
        console.log('time diff: ' + timeDiff)
        console.log('minutes away: ' + minutesAway)
        console.log('next arrival: ' + nextArrival)

        //create new table row with train information
        let newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(trainInterval),
            $("<td>").text(nextArrival).attr("class", "text-right"),
            $("<td>").text(minutesAway),
            // $("<td>").text(empBilled)
        );

        // append new row to table
        $(".table-expand").append(newRow)

    })

})