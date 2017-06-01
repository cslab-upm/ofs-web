// var path = window.location.pathname;
// var dir = path.slice(18); //poner a 1 al subir a venus
// var selected; //clase activa navbar
//
// // Ajuste path - navbar
// if (dir == 'contacto') {
//     $('.nav').find('.active').removeClass('active');
//     $('#contact').addClass('active');
// } else if (dir == 'acerca') {
//     $('.nav').find('.active').removeClass('active');
//     $('#about').addClass('active');
// } else if (dir == 'equipamiento') {
//     $('.nav').find('.active').removeClass('active');
//     $('#equip').addClass('active');
// } else if (dir == 'inicio') {
//     $('.nav').find('.active').removeClass('active');
//     $('#init').addClass('active');
// }
// // End Ajuste path - navbar


$(document).ready(function() {
    // Elemento activo Lista navbar
    $('.nav li').click(function() {
      if((this.id == 'login') || (this.id == 'register') || (this.id == 'logout')){
        var var1 = $('.nav').find('.active').removeClass('active');
        $('#init').addClass('active');
      }else {
        var var1 = $('.nav').find('.active').removeClass('active');
        $(this).addClass('active');
      }

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

// $('#loginn').click(function() {
//   console.log('wfd');
//   window.location.href='./registrar';
// });

});

function reloadImages(){
  var d = new Date();
  $('#interior').attr('src', '/philips.jpg' + '?timestamp=' + d.getTime());
  $('#exterior').attr('src', '/moobotix.jpg' + '?timestamp=' + d.getTime());
}

// function reloadImgOut() {
//   var date = new Date();
//   var time = date.getTime();
//   $('#initCamera').attr('src', '/philips.jpg' + '?timestamp=' + time);
// }
//
// function reloadImgIn() {
//   var date = new Date();
//   var time = date.getTime();
//   $('#initCamera').attr('src', '/moobotix.jpg' + '?timestamp=' + time);
// }
//
// //Inicializado en el script para que el controller no lo inicialice cada vez
// var contOut = 0;//contador controlar recarga imagen exterior
// var contIn = 0 ;//contador controlar recarga imagen interior
