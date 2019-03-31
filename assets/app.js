var animalsArray = ["Giraffes", "Polar Bears", "Zebras", "Lions", "Parrots", "Butterflies", "Jellyfish"]

function displayAnimalGifs() {

    var animal = $(this).attr("data-animal")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=6cRH8TNjLjtSmUIM1WzjLPxBIlkUd8LX"
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .then(function(response) {

        var results = response.data
        for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div>")
            var p = $("<p>").text("Rating: " + results[i].rating)
            var animalImage = $("<img>")
            animalImage.addClass("animal-image")
            animalImage.attr("src", results[i].images.downsized_still.url)

            animalImage.attr("data-sill", results[i].images.downsized_still.url)
            animalImage.attr("data-animate", results[i].images.fixed_height.url)
            animalImage.attr("data-state", "still")
           
            animalDiv.append(p)
            animalDiv.append(animalImage)
            $("#gifs-view").prepend(animalDiv)
        }
    })
}

$(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state")

    if (state === "still") {
        $(this).attr("src", $(this).data("animate"))
        $(this).attr("data-state", "animate")
    }
    else if (state === "animate") {
        $(this).attr("src", $(this).data("still"))
        $(this).attr("data-state", "still")
    }
})

function renderButtons() {

    $("#buttons-view").empty();
    for (var i = 0; i < animalsArray.length; i++) {

        var newButton = $("<button>")
        newButton.addClass("animal-button")
        newButton.attr("data-animal", animalsArray[i])
        newButton.text(animalsArray[i])
        $("#buttons-view").append(newButton)
    }
}

$("#add-animal").on("click", function(event) {
    
    event.preventDefault()
    var animalInput = $("#animal-input").val().trim()
    animalsArray.push(animalInput)
    renderButtons()
})

$(document).on("click", ".animal-button", displayAnimalGifs)

renderButtons()