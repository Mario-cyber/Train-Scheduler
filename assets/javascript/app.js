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

    // get input from user 

    $(".btn").on("click", function () {
        event.preventDefault()
        let trainName = $("#train").val().trim().toLowerCase()
        let destination = $("#destination").val().trim().toLowerCase()
        let firstTrain = $("#first").val().trim().toLowerCase()
        let trainInterval = $("#interval").val().trim().toLowerCase()
        $(".form-control").val("")
        console.log(trainName)
        console.log(destination)
        console.log(firstTrain)
        console.log(trainInterval)
        database.ref().set({
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            interval: trainInterval
        })
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

    console.log("hello")





})