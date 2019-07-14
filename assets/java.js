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

  //onclick to add user input to firebase

$('button').on('click', function (e) {
    e.preventDefault();
    let name = $('#TrainName').val().trim();
    let Destination = $('#Destination').val().trim();
    let frequency = $('#firstTrain').val().trim();
    let Rate = $('#Rate').val().trim();
    database.ref().push({
        TrainName: name,
        Destination: Destination,
        frequency: frequency,
        Rate: Rate
    });
    $('#TrainName').val('');
    $('#Destination').val('');
    $('#firstTrain').val('');
    $('#Rate').val('');
})
 var frequency = 0;
  database.ref().on('child_added', function(snapshot){
    console.log(snapshot.val().TrainName); //gets name of Train
    console.log(snapshot.val().Rate); // train rate (minutes)
    // current time in minutes only
    let b = moment(snapshot.val().frequency_d).format('m');
    console.log(b)
    // Difference between current time in minutes and the rate of train travel
    var Ratet = moment().diff(moment(snapshot.val().b) % (snapshot.val().Rate));
    console.log(Ratet);
    // 
    var convertrate = 
    console.log(convertrate)
    
  
    let arrival = Ratet % b;
    // console.log(arrival);
    let waittime = moment().add(arrival, "m").format("hh:mm");
    // console.log(waittime);
    
   
    
   // dynamically push stored data to the table
    let tableRow = $('<tr>');
    let nameRow = $('<td>').text(snapshot.val().TrainName);
    let DestinationRow = $('<td>').text(snapshot.val().Destination);
    let frequencyRow = $('<td>').text(snapshot.val().frequency);
    let waittimeRow = $('<td>').text(waittime);
    let RateRow = $('<td>').text(snapshot.val().Rate);

    
    tableRow.append(nameRow, DestinationRow, frequencyRow, waittimeRow, RateRow);
    $('tbody').append(tableRow);
})
