var path = window.location.pathname;
var dir = path.slice(18);
var selected; //clase activa navbar

// Ajuste path - navbar
if (dir == 'contacto') {
    $('.nav').find('.active').removeClass('active');
    $('#contact').addClass('active');
} else if (dir == 'acerca') {
    $('.nav').find('.active').removeClass('active');
    $('#about').addClass('active');
} else if (dir == 'equipamiento') {
    $('.nav').find('.active').removeClass('active');
    $('#equip').addClass('active');
} else if ((dir == 'inicio') || (dir == 'bienvenido')) {
    $('.nav').find('.active').removeClass('active');
    $('#init').addClass('active');
}
// End Ajuste path - navbar

$(document).ready(function() {
    // Elemento activo Lista navbar
    $('.nav li').click(function() {
        $('.nav').find('.active').removeClass('active');
        $(this).addClass('active');
    });
    // End elemento activo Lista navbar


    // Navbar lateral activo
    $('.navbar-nav').on('click', 'li', function() {
        selected = $('#slidemenu').hasClass('slide-active');
        $('#slidemenu').stop().animate({
            left: '-100%'
        });
        $('slide-nav').toggleClass('slide-active');
        $('#slidemenu').toggleClass('slide-active');
        $('.navbar-toggle').toggleClass('slide-active');
    });

    $("#slide-nav").on("click", '.navbar-toggle', function(e) {
        selected = $(this).hasClass('slide-active');
        $('#slidemenu').stop().animate({
            left: selected ? '-100%' : '0px'
        });
        $(this).toggleClass('slide-active', !selected);

        $('#slidemenu').toggleClass('slide-active');
        console.log(selected);
    });
    //End Navbar lateral activo

    //Por si redimensiona la pagina no interferir en el boton ->.navbar-toggle
    var del = '#slidemenu, #page-content, body, .navbar-toggle, .navbar, .navbar-header ';
    $(window).on("resize", function() {
        if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
            $(del).removeClass('slide-active');
        } else if ($(window).width() < 767 && $('.navbar-toggle').is(':hidden')) {
            $(del).removeClass('slide-active');
        }
    });
});
