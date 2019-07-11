 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyBa_M8E3zZubK7k6HAVo_BBLAwXaDEfpkE",
    authDomain: "trainscheduler-3c13f.firebaseapp.com",
    databaseURL: "https://trainscheduler-3c13f.firebaseio.com",
    projectId: "trainscheduler-3c13f",
    storageBucket: "",
    messagingSenderId: "781806976060",
    appId: "1:781806976060:web:9579f494c0be1199"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let database = firebase.database();
 
  database.ref().on('child_added', function(snapshot){
    // console.log(snapshot.val().TrainName); gets name of Train
   
    let waittime = moment().diff(moment(snapshot.val().frequency), 'minutes');
    let total = waittime * snapshot.val().Rate;
   
    let tableRow = $('<tr>');
    let nameRow = $('<td>').text(snapshot.val().TrainName);
    let DestinationRow = $('<td>').text(snapshot.val().Destination);
    let frequencyRow = $('<td>').text(snapshot.val().frequency);
    let waittimeRow = $('<td>').text(waittime);
    let RateRow = $('<td>').text(snapshot.val().Rate);
    let totalRow = $('<td>').text(total);
    
    tableRow.append(nameRow, DestinationRow, frequencyRow, waittimeRow, RateRow, totalRow);
    $('tbody').append(tableRow);
})
$('button').on('click', function(e){
    e.preventDefault();
    let name = $('#TrainName').val().trim();
    let Destination = $('#Destination').val().trim();
    let frequency = $('#frequency').val().trim();
    let Rate = $('#Rate').val().trim();
    console.log(Rate);
    database.ref().push({
        TrainName: name,
        Destination: Destination,
        frequency: frequency,
        Rate: Rate
    });
    $('#TrainName').val('');
    $('#Destination').val('');
    $('#frequency').val('');
    $('#Rate').val('');
})