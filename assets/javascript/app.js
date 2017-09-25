$(document).ready(function(){

var topics = [
	"Micheal Jordan",
	"Charles Barkley",
	"Magic Johnson",
	"Larry Bird",
];


function displayTopic() {

	var topicInfo = $(this).attr("data-name");
	var queryURL = "https://www.omdbapi.com/?t=" 
	+ topicInfo + "&y=&plot=short&apikey=40e9cece";

	// AJAX call for button clicked
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);

	// Creating a div to hold topic
	var topicDiv = $("<div class='topic'>");

	// varibale to hold rating
	var rating = response.Rated;

	// create element for rating
	var ratingDisplay = $("<p>").text("Rating: " + rating);

	// append rating to topicDiv
	topicDiv.append(ratingDisplay);

	// // Storing the release year
	// var released = response.Released;

	// // Creating an element to hold the release year
	// var pTwo = $("<p>").text("Released: " + released);

	// // Displaying the release year
	// movieDiv.append(pTwo);

	// // Storing the plot
	// var plot = response.Plot;

	// // Creating an element to hold the plot
	// var pThree = $("<p>").text("Plot: " + plot);

	// // Appending the plot
	// movieDiv.append(pThree);

	// // Retrieving the URL for the image
	// var imgURL = response.Poster;

	// // Creating an element to hold the image
	// var image = $("<img>").attr("src", imgURL);

	// // Appending the image
	// movieDiv.append(image);

	// // Putting the entire movie above the previous movies
	// $("#movies-view").prepend(movieDiv);

	});

}



// Dynamically generate buttons
function renderButtons() {

	// Deleting the topic buttons before adding new buttons
	$("#buttons-view").empty();

	// Looping through the array of topics
	for (var i = 0; i < topics.length; i++) {

	// create button tag
	var b = $("<button>");

	// Adding a class, addattribute, add text to button
	b.addClass("topic").attr("data-name", topics[i]).text(topics[i]);

	// Display button
	$("#buttons-view").append(b);
	}
}



// Add click event listener to all buttons
	$("#submit-button").on("click", function(event) {
		event.preventDefault();

		// takes user input and stores in variable
		var userTopic = $("#user-search-input").val().trim();

		// adds user input to topics array
		topics.push(userTopic);

		//run renderButtons function
		renderButtons();
	
	});



// Run button function
renderButtons();

});