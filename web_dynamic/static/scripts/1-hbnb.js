$(document).ready(() => {
    var selectedAmenities = {};

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
        const amenitiesList = Object.entries(selectedAmenities).map(([id, name]) => `${id}: ${name}`).join(', ');
        amenitiesDiv.find('h4').text(`Amenities (${Object.keys(selectedAmenities).length}): ${amenitiesList}`);
    }
});
