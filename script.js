var dpr = window.devicePixelRatio;

var canvas = document.getElementById( 'canvas' );
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
canvas.style.width = '100%';
canvas.style.height = '100%';

var context = canvas.getContext( '2d' );

var id = 52;

var width = 71;
var height = 96;

var cwidth = width * Math.round( dpr );
var cheight = height * Math.round( dpr );

var cwidthhalf = cwidth / 2;
var cheighthalf = cheight / 2;

var particles = [];

function Particle( id, x, y, sx, sy ) {

    if ( sx === 0 ) sx = 2;

    var cx = ( id % 4 ) * width;
    var cy = Math.floor( id / 4 ) * height;

    this.update = function () {

        x += sx;
        y += sy;

        if ( x < ( - cwidthhalf ) || x > ( canvas.width + cwidthhalf ) ) {

            var index = particles.indexOf( this );
            particles.splice( index, 1 );

            return false;

        }

        if ( y > canvas.height - cheighthalf ) {

            y = canvas.height - cheighthalf;
            sy = - sy * 0.85;

        }

        sy += 0.98;

        context.drawImage( image, cx, cy, width, height, Math.floor( x - cwidthhalf ), Math.floor( y - cheighthalf ), cwidth, cheight );

        return true;

    }

}

var image = document.createElement( 'img' );
image.src = "/cards.png";

function throwCard( x, y ) {

    id > 0 ? id -- : id = 51;

    var particle = new Particle( id, x, y, Math.floor( Math.random() * 6 - 3 ) * 2, - Math.random() * 16 );
    particles.push( particle );

}

document.addEventListener( 'pointerdown', function ( event ) {

    throwCard( event.clientX * dpr, event.clientY * dpr );

} );

document.addEventListener( 'pointermove', function ( event ) {

    if ( event.pressure === 0 ) return;

    throwCard( event.clientX * dpr, event.clientY * dpr );

} );

function animate() {

    var i = 0, l = particles.length;

    while ( i < l ) {

        particles[ i ].update() ? i ++ : l --;

    }
    
    requestAnimationFrame( animate );

}

requestAnimationFrame( animate );