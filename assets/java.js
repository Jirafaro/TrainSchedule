var firebaseConfig = {
    apiKey: "AIzaSyAF3o8mM_d7SRYzjMdO2_euK3SXRGWhzRA",
    authDomain: "trainproject-60fd1.firebaseapp.com",
    databaseURL: "https://trainproject-60fd1.firebaseio.com",
    projectId: "trainproject-60fd1",
    storageBucket: "",
    messagingSenderId: "193573108234",
    appId: "1:193573108234:web:37b2686c84a75b18"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let database = firebase.database();
 
  database.ref().on('child_added', function(snapshot){
    console.log(snapshot.val().TrainName); //gets name of Train
    console.log(snapshot.val());
    console.log(moment(snapshot.val().frequency_d).format('m'));
    
    let waittime = moment().diff(moment(snapshot.val().frequency_d).format('m'));
    console.log(waittime);
    let arrival = Rate - waittime;
    console.log(arrival);
    
    // diff(moment(snapshot.val().frequency), 'minutes');
    
   
    let tableRow = $('<tr>');
    let nameRow = $('<td>').text(snapshot.val().TrainName);
    let DestinationRow = $('<td>').text(snapshot.val().Destination);
    let frequencyRow = $('<td>').text(snapshot.val().frequency);
    let waittimeRow = $('<td>').text(waittime);
    let RateRow = $('<td>').text(snapshot.val().Rate);

    
    tableRow.append(nameRow, DestinationRow, RateRow, waittimeRow,frequencyRow );
    $('tbody').append(tableRow);
})
$('button').on('click', function(e){
    e.preventDefault();
    let name = $('#TrainName').val().trim();
    let Destination = $('#Destination').val().trim();
    let frequency = $('#frequency').val().trim();
    let Rate = $('#Rate').val().trim();
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