/*global document */
(function( window, document ) {
	'use strict';

	var offset_data;
	var prefix = "responsivetools-";
	var body = document.body || document.getElementsByTagName( 'body' )[ 0 ];

	var createEl = function( tag, attrs, appendTo ) {
		var i, l, temp;
		
		temp = document.createElement( tag );
		
		if ( attrs ) {
			for( i in attrs ) {
				temp.setAttribute( i, attrs[ i ] );
			}
		}

		if ( appendTo ) {
			appendTo.appendChild( temp );
		}
		
		return temp;
	};

	var panel = createEl(
		'div',
		{
			id: prefix + 'panel',
			draggable: true,
			style: 'border:1px solid #fff;position:fixed;left:0;top:0;z-index:9999;background:#00adef;border-radius:10px;padding:10px;color:#eff;'
		},
		body
	);
	var actual = createEl(
		'div',
		{
			id: prefix + 'actual',
			style: 'border-bottom:1px solid #eff;font-weight:bold;'
		},
		panel
	);
	var style = createEl(
		'style',
		null,
		body
	);

	window.responsivetools = {
		getWindowSize: function() {
			return {
				w: window.innerWidth,
				h: window.innerHeight
			};
		},
		inspectResolution: function( resolutions ) {
			var i, l, temp, res, id;
			var st = '.' + prefix + 'options{display:none;}';
			if ( resolutions ) {
				for ( i = 0, l = resolutions.length; i < l; i++ ) {
					res = resolutions[ i ];
					id = 'resolution' + res;
					temp = createEl(
						'div',
						{
							id: id,
							'class': prefix + 'options'
						},
						panel
					);
					temp.innerHTML = '(min-width:' + res + 'px)';
					st += '@media(min-width:' + res + 'px){#' + id + '{display:block;}}';
				}

				style.innerHTML = st;
			}
		},
		calculate: function() {
			var dim = window.responsivetools.getWindowSize();
			actual.innerHTML = dim.w + ' &times; ' + dim.h;
		},
		dragstart: function( event ) {
			var style = window.getComputedStyle( event.target, null );
		    offset_data = [
				parseInt( style.getPropertyValue( 'left' ), 10) - event.clientX,
				parseInt( style.getPropertyValue( 'top' ), 10) - event.clientY
		    ];
		},
		dragoveranddrop: function( event ){
			event.dataTransfer.dropEffect = 'move';
			event.preventDefault();
			panel.style.left = ( event.clientX + parseInt( offset_data[ 0 ], 10 ) ) + 'px';
			panel.style.top = ( event.clientY + parseInt( offset_data[ 1 ], 10 ) ) + 'px';
			return false;
		}
	};

	panel.addEventListener( 'dragover', window.responsivetools.dragoveranddrop, false );
	panel.addEventListener( 'dragstart', window.responsivetools.dragstart, false );

	window.addEventListener( 'load', window.responsivetools.calculate, false );
	window.addEventListener( 'resize', window.responsivetools.calculate, false );

	window.responsivetools.inspectResolution( [ 240, 480, 600, 800, 900, 1024 ] );
	

})( this, document );
