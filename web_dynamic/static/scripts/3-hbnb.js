$(document).ready(function() {
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(data) {
            let placesSection = $('#places');
            $.each(data.places, function(index, place) {
                let article = $('<article></article>');
                let titleBox = $('<div class="title_box"></div>').appendTo(article);
                $('<h2>' + place.name + '</h2>').appendTo(titleBox);
                $('<div class="price_by_night">$' + place.price_by_night + '</div>').appendTo(titleBox);

                let info = $('<div class="information"></div>').appendTo(article);
                $('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>').appendTo(info);
                $('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>').appendTo(info);
                $('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>').appendTo(info);

                $('<div class="description">' + place.description + '</div>').appendTo(article);
                article.appendTo(placesSection);
            });
        },
        error: function() {
            console.error('Error fetching places');
        }
    });
});
