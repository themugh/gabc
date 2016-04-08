$(function() {
    
    var headerHeight = $('.navbar-custom').height();
    
    $(window).on('scroll', { previousTop: 0}, function() {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
            //if scrolling up...
            if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                $('.navbar-custom').addClass('is-visible');
            } else {
                $('.navbar-custom').removeClass('is-visible is-fixed');
            }
        }
        else {
            //if scrolling down...
            $('.navbar-custom').removeClass('is-visible');
            if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) {
                $('.navbar-custom').addClass('is-fixed');
            }
        }
        this.previousTop = currentTop;
    });

    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});