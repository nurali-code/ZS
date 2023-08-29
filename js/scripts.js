$(document).ready(function () {
    $('.btn-menu').on('click', function () {
        $('header, .btn-menu, body').toggleClass('active');
    })

    /*-------------------------------------------------end*/

    $('.btn_catalog').on('click', function (e) {
        // e.preventDefault();
        const catalog = $(this).attr("href");
        $('.btn_catalog').removeClass('active')
        $(this).addClass('active')
        $('.catalog').show();
        $('.catalog-content').not(catalog).hide(0);
        $(catalog).fadeIn(300);
    });

    $('.cat-item').on('click', function () {
        $('#radio-buttons, #checkbox-buttons').empty();
        var heights = $(this).attr('data-height').split(',');
        var capacity = $(this).attr('data-capacity').split(',');
        var radioContainer = $('#radio-buttons');
        var checkboxContainer = $('#checkbox-buttons');
        for (var i = 0; i < heights.length; i++) {
            var checkboxDiv = $('<div>').addClass('radio');
            var radioInput = $('<input>').attr({
                type: 'radio',
                value: heights[i] + ' метров',
                name: 'height',
                id: 'height' + (i + 1)
            });
            var radioLabel = $('<label>').attr('for', 'height' + (i + 1)).text(heights[i] + ' метров');
            checkboxDiv.append(radioInput);
            checkboxDiv.append(radioLabel);
            checkboxContainer.append(checkboxDiv);
        }
        for (var i = 0; i < capacity.length; i++) {
            var radioDiv = $('<div>').addClass('radio');
            var checkboxInput = $('<input>').attr({
                type: 'radio',
                value: capacity[i] + ' тонн',
                name: 'capacity',
                id: 'capacity' + (i + 1)
            });
            var checkboxLabel = $('<label>').attr('for', 'capacity' + (i + 1)).text(capacity[i] + ' тонн');
            radioDiv.append(checkboxInput);
            radioDiv.append(checkboxLabel);
            radioContainer.append(radioDiv);
        }
        var itemContent = $(this).html();
        $('#modal-card .cat-content').html(itemContent);
        $('#modal-card').fadeIn(300);
    });

    /*-------------------------------------------------end*/

    function hideModals() {
        $('.modal').fadeOut();
        $('body').removeClass('active');
    };

    $(function () {
        function showModal(id) {
            $('body').addClass('active');
            $(id).fadeIn(300);
        }

        $('[data-modal]').on('click', function (e) {
            e.preventDefault();
            showModal('#' + $(this).attr("data-modal"));
        });

        // $('.cat-item').on('click', function (e) {
        //     e.preventDefault();

        // });

        $('.modal-close').on('click', () => { hideModals(); });

        $(document).on('click', function (e) {
            if (!(($(e.target).parents('.modal-content').length) ||
                ($(e.target).parents('.nav').length) ||
                ($(e.target).parents('.cat-item').length) ||
                ($(e.target).hasClass('btn')) ||
                ($(e.target).hasClass('cat-item')) ||
                ($(e.target).hasClass('modal-content'))
            )) { hideModals(); }
        });
    });

    /*---------------------------------------------------end*/

    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        var offNum;
        $(this).hasClass('btn_catalog') ? offNum = 200 : offNum = 0;
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - offNum, }, 300,)
        $('header, .btn-menu').removeClass('active');
    })

    /*---------------------------------------------------end*/

    $(window).scroll(function () {
        if ($(window).scrollTop() >= 500) {
            $(".scroll-up").fadeIn(300);
        } else {
            $(".scroll-up").fadeOut(300);
        }
    });

    /*---------------------------------------------------end*/

    $('input[type="tel"]').inputmask({ "mask": "8-999-999-99-99" });

    /*---------------------------------------------------end*/

    $('.dropdown-btn').click(function () {
        $(this).toggleClass('active');
        $(this).next('.dropdown-content').slideToggle();
    });

    /*---------------------------------------------------end*/

    $("form").submit(function () {
        $('form .btn').addClass('loading');
        $.ajax({
            type: "post",
            method: 'post',
            url: "../sendmail.php",
            data: $(this).serialize()
        }).done(function () {
            $('form .btn').removeClass('loading');
            $('form').trigger('reset');
            alert('Спасибо за заявку. Ожидайте с вами свяжется специалист!');
        }); return false;
    });
});

