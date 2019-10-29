// Link to Friebase and authenticate credentials
let config = {
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
// Create a variable to reference the database.
let database = firebase.database();

$(document).ready(function () {
    event.preventDefault();

    $('[data-open-details]').click(function (e) {
        e.preventDefault();
        $(this).next().toggleClass('is-active');
        $(this).toggleClass('is-active');
    });

    console.log("hello")







})