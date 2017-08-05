$( document ).ready(function() {
	
	console.log("custom javascript");
	$(".button-collapse").sideNav();

	$('.chips-autocomplete').material_chip({
		autocompleteOptions: {
			data: {
				'Apple': null,
				'Microsoft': null,
				'Google': null
			},
			limit: Infinity,
			minLength: 1
		}
	});
});