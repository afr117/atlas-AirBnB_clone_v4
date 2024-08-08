$(document).ready(() => {
    const selectedAmenities = {};

    $('input[type="checkbox"]').change(function() {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }

        updateAmenitiesDisplay();
    });

    function updateAmenitiesDisplay() {
        const amenitiesDiv = $('#amenities');
        const amenitiesList = Object.entries(selectedAmenities).map(([id, name]) => `${name}`).join(', ');
        amenitiesDiv.find('h4').text(`Amenities: ${amenitiesList}`);
    }

    $('#search-button').click(function() {
        const amenities = Object.keys(selectedAmenities);
        console.log("Sending amenities:", amenities);
        $.ajax({
            type: 'POST',
            url: '/search',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: amenities }),
            success: function(data) {
                console.log("Received data:", data);
                updatePlaces(data.places);
            }
        });
    });

    function updatePlaces(places) {
        const placesSection = $('.places');
        placesSection.empty();
        places.forEach(place => {
            placesSection.append(
                `<article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="user">
                        <b>Owner:</b> ${place.owner}
                    </div>
                    <div class="description">
                        ${place.description}
                    </div>
                </article>`
            );
        });
    }
});
