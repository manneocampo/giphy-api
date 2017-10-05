var topics = ["Hermione Granger", "Ron Weasley", "Harry potter", "Dumbledore", "Voldemort", "Ginny Weasley"];

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

		    			var gifDiv = $("<div class='gif'>");

		    			var rating = results[i].rating;

		    			var p =$("<p>").text("Rating:" + rating); 

		    			var personImage = $("<img class='animate' data-state='animate'>"); 

		    			personImage.attr("src", results[i].images.fixed_height.url);

		    			var personImageStill = $("<img class='still' data-state='animate'>"); 

		    			personImageStill.attr("src", results[i].images.fixed_height_still.url);

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

	$(".gif").on("click", function(){

		var state = $(this).attr("data-state");

		if (state ==="animate") {
			$(this).attr("src", $(this).attr("results[i].images.fixed_height_still.url"));
			$(this).attr("data-state", "still");
		}else {
			
			$(this).attr("src", $(this).attr("results[i].images.fixed_height.url")); 
			$(this).attr("data-state", "animate");
		}
		
		//attempt 3 
		// var state = $(this).class("animate"); 

		// if (state === "animate") {
		// 	$(this).attr("src", $(this).attr("results[i].images.fixed_height_still.url")); 
		// }else {
		// 	$(this).attr("src", $(this).attr("results[i].images.fixed_height.url"));
		// }

		//attempt 2
		// if (personImage === true) {
		// 	gifDiv.append(personImageStill);
		// }

		//attempt 1 edited
		// var state = $(this).attr("src"); 

		// if (state === "results[i].images.fixed_height.url") {
		// 	$(this).attr("src", $(this).attr("results[i].images.fixed_height_still.url")); 
		// }else {
		// 	$(this).attr("src", $(this).attr("results[i].images.fixed_height.url"));
		// }
	})


	//event listener for all elements with a class of "topic"
	$(document).on("click", ".topic",  displayTopicInfo); 
	renderButtons(); 

	