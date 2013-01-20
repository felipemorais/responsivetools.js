/* global module, test, ok, start */
'use strict';
module( 'Test script API', {
	teardown: function() {
		var panel = document.getElementById( 'responsivetools-panel' );
		document.body.removeChild( panel );
	}
});

test( 'created elements', 2, function() {
	console.log(document.getElementById( 'responsivetools-panel' ));
	ok( document.getElementById( 'responsivetools-panel' ).nodeName, 'Panel Element exists' );
	ok( document.getElementById( 'responsivetools-actual' ).nodeName, 'Actua Element exists' );
	start();
});