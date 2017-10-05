var topics = ["hermione granger", "ron weasley", "harry potter", "dumbledore", "voldemort", "ginny"];

function displayTopicInfo() {
		
			var person = $(this).attr("data-topic");

			//constructing URL to search Giphy for name of data-topic
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		        person + "&api_key=dc6zaTOxFJmzC&limit=10";

		    $.ajax({
		    	url:queryURL, 
		    	method: "GET"
		    })
		    .done(function(response) {
		    	console.log(response.data);

		    	var results = response.data;

		    	for (var i=0; i < results.length; i++) {
		    		
		    		if(results[i].rating !== "r" && results[i].rating !== "pg-13"){

		    			var gifDiv = $("<div class='topic'>");

		    			var rating = results[i].rating;

		    			var p =$("<p>").text("Rating:" + rating); 

		    			var personImage = $("<img>"); 

		    			personImage.attr("src", results[i].images.fixed_height.url);

		    			gifDiv.append(p);
		    			gifDiv.append(personImage);

		    			$("#gifs-appear-here").prepend(gifDiv);	
		    		}
		    	}
		    })
};


	function renderButtons () {
		$("#buttons-view").empty();

		for (var i = 0; i < topics.length; i++) {
			var arrayTopics = $("<button>");

			arrayTopics.addClass("topic");

			arrayTopics.attr("data-topic", topics[i]);

			arrayTopics.text(topics[i]);

			$("#buttons-view").append(arrayTopics);
		}
	}

	$("#add-gif").on("click", function(event){
		event.preventDefault();

		var gif = $("#gif-input").val().trim();

		topics.push(gif);

		renderButtons();
	});


	//event listener for all elements with a class of "topic"
	$(document).on("click", ".topic", displayTopicInfo); 
	renderButtons(); 

	