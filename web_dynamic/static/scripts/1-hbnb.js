$(document).ready(() => {
    var selectedAmenities = {};

    // Listen for changes on each input checkbox tag
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

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    function updateAmenitiesDisplay() {
        const amenitiesDiv = $('#amenities');
        const amenitiesList = Object.entries(selectedAmenities).map(([id, name]) => `${name}`).join(', ');
        amenitiesDiv.find('h4').text(`Amenities (${Object.keys(selectedAmenities).length}): ${amenitiesList}`);
    }

    // Listen for the search button click event
    $('button').click(function() {
        performSearch();
    });

    function performSearch() {
        // Your search functionality here
        console.log('Search button clicked!');
        console.log('Selected Amenities:', selectedAmenities);
        // You can send the selectedAmenities to the backend or perform other actions as needed
    }
});
