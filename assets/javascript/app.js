  // Initialize Firebase
 var config = {
  apiKey: "AIzaSyDlBUKKPovZjCq8DZhkfHUIgMLmjuyr_ZY",
  authDomain: "choochooexpress-905f8.firebaseapp.com",
  databaseURL: "https://choochooexpress-905f8.firebaseio.com",
  projectId: "choochooexpress-905f8",
  storageBucket: "choochooexpress-905f8.appspot.com",
  messagingSenderId: "975734812261"
};
  firebase.initializeApp(config);

  database = firebase.database();


//Event listener to gather form data.
$('#submit').on('click',(event)=>{
  //prevent default button behavior
  event.preventDefault();
  //capture form values
  let trainName = $('#train-name').val().trim();
  let destination = $('#destination').val().trim();
  let firstTime = $('#first-time').val().trim();
  let frequency = $('#frequency').val().trim();

  //local object to send to firebase
  let train = {
    name: trainName,
    destination : destination,
    time: firstTime,
    frequency: frequency
  }

   //send values to firebase
   console.log(train); 
   database.ref().push(train);

    //clear values from form
  $('#train-name').val('')
  $('#destination').val('');
  $('#first-time').val('');
  $('#frequency').val('');  
});


//update table when value is added to firebase.
database.ref().on('child_added',(snap, prevChildKey)=>{

  //function variables
  let trainName = snap.val().name;
  let destination = snap.val().destination;
  let firstTime =snap.val().time;
  let frequency =snap.val().frequency;

  //parse first time into moment
  let parsedTime = moment(firstTime, 'HH-mm');
  // let parsedTime =
  console.log(JSON.stringify(parsedTime));

  //Calculate next arrival
  let nextArrival = parsedTime.add(frequency,'m');
  console.log(JSON.stringify(nextArrival));
  //Calculate minutes away
  let minutesAway = nextArrival.subtract(moment()).format('m');
  console.log(JSON.stringify(minutesAway));

  //Display that stuff!!!
  
  console.log(snap.val());
  

});
