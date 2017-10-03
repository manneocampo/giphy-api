var topics = ["will smith", "ellen degeneres", "whoopi goldberg"]

$("button").on("click",function() {
	var person = $(this).attr("data-person");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

    $ajax.({
    	url:queryURL, 
    	method: "GET"
    })
    .done(function(response) {
    	var results = response.data;

    	for (var i=0; i < results.length; i++) {
    		if(results[i].rating !== "r" && results[i].rating !== "pg-13");
    	} 

    });
})