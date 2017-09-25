$(document).ready(function(){

var topics = [
	"Micheal Jordan",
	"Charles Barkley",
	"Magic Johnson",
	"Larry Bird",
];

var apiKey = "YqIBM8iSh5pujE7e2dMi4PdehpDSX7Va";
	console.log("APIkey: " + apiKey);

	//javascript, jQuery
	// var test = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
	
	// test.done(function(data) { 
	// 	console.log("Is this even working: ", data); 
	// });

function displayTopic() {


	var topicInfo = $(this).attr("data-name");
		console.log("var topicInfo: " + topicInfo);

	// adds a "%20" between spaces
	var topicEncoder = encodeURIComponent(topicInfo);
		console.log("topicEncoder: " + topicEncoder);

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicEncoder + "&api_key=" + apiKey + "&limit=10";
		console.log("queryURL: " + queryURL);

	// AJAX call for button clicked
	$.ajax({
		url: queryURL,
		method: "GET"
	})

	.done(function(response) {
		console.log(response);

	var results = response.data;
		console.log("results variable: " + results);

	for (var i = 0; i < results.length; i++) {
		console.log(results.length);
	

		// Creating a div to hold topic
		var topicDiv = $("<div class='topic'>");

		// varibale to hold rating
		var rating = results[i].rating;
			console.log("The rating is " + rating)

		// create element for rating
		var ratingDisplay = $("<p>").text("Rating: " + rating);
			console.log("This displays- Rating: " + rating)

		// Retrieving the URL for gif
		var gifURL = results[i].embed_url;
			console.log("gifURL: " + gifURL);

		// Create img tag to gif
		var gif = $("<img>")

		gif.attr("src", gifURL).attr("alt", "gif-image").attr("class", "gif");

		//add attributes for still and animate
		gif.attr("data-still", response.data[i].images.original_still.url);
		gif.attr("data-animate", response.data[i].images.original.url);
		gif.attr("data-state", "still");


		// append rating to topicDiv
		topicDiv.append(ratingDisplay);
		topicDiv.append(gif);

		// Putting the entire movie above the previous movies
		$("#topics-view").prepend(topicDiv);
	}
	});

}



// Dynamically generate buttons
function renderButtons() {

	// Deleting the topic buttons before adding new buttons
	$("#buttons-view").empty();

	// Looping through the array of topics
	for (var i = 0; i < topics.length; i++) {

	// create button tag
	var b = $("<button>" + topics[i] + "</button>");


	// var arrayObjectEncoder = encodeURIComponent(topics[i]);

	// Adding a class, addattribute, add text to button
	b.addClass("topic").attr("data-name", topics[i]);

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

// Toggle gif state
	$(".gif").on("click", function() {

		var state = $(this).attr("data-state");
			console.log("current state: " + state);

		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});



$(document).on("click", ".topic", displayTopic);

// Run button function
renderButtons();

});