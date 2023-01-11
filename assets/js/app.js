$(document).ready(function() {
    /* START ISOTOPE */

    // variables to use isotope
    var search;
    var verticalFilter;
    var horizontalFilter;

    // create grid to isotope
    var grid = $('#container-cards').isotope({
        layoutMode: 'fitRows',
        itemSelector: '.card',
        percentPosition: true,
        fitRows: {
            gutter: '.gutter-sizer'
        },
        filter: function() {
          var $this = $(this);
          var searchResult = search ? $this.text().match(search) : true;
          var veritcalResult = verticalFilter ? $this.is(verticalFilter) : true;
          var horizontalResult = horizontalFilter ? $this.is(horizontalFilter) : true;
          return searchResult && veritcalResult && horizontalResult;
        }
    });

    // filer search input
    var quicksearch = $('#quicksearch').keyup(debounce(function() {
        search = new RegExp(quicksearch.val(), 'gi');
        grid.isotope();
    }));
      
    // filter vertial
    $('.menu-sidebar').on('click', '.button', function() {
        verticalFilter = $(this).attr('data-filter');
        grid.isotope();
    });

    // filter horizontal
    $('.filters ul').on( 'click', 'li', function() {
        horizontalFilter = $(this).attr('data-filter');
        grid.isotope();
    });

    // debounce so filtering doesn't happen every millisecond
    function debounce(fn, threshold) {
        var timeout;
        threshold = threshold || 100;
        return function debounced() {
            clearTimeout(timeout);
            var args = arguments;
            var _this = this;
            function delayed() {
                fn.apply(_this, args);
            }
            timeout = setTimeout(delayed, threshold);
        };
    }

    /* FINISH ISOTOPE */

    // hide play video
    $('.media-video').on('mouseover', function() {
        $(this).parent().find(".play").each(function() {
            $(this).hide();
        });
    });

    // show play video
    $('.media-video').on('mouseout', function() {
        $(this).parent().find(".play").each(function() {
            $(this).show();
        });
    });

    // show sidebar
    $('#sidebar-btn').on('click', function() {
        $('#sidebar').addClass('visible');
        $('#sidebar-btn').addClass('btn-active');
        $('main').addClass('sidebar-active');
        setTimeout(
            function() {
                grid.isotope();
            }, 200
        );
    });

    // hide sidebar
    $('.sidebar-close').on('click', function() {
        $('#sidebar').removeClass('visible');
        $('#sidebar-btn').removeClass('btn-active');
        $('main').removeClass('sidebar-active');
        setTimeout(
            function() {
                grid.isotope();
            }, 300
        );
    });

    // color horizontal menu selected
    $('.filters ul').on('click', 'li', function() {
        $(this).parent().find(".btn-active-filter").each(function() {
            $(this).removeClass("btn-active-filter");
        });
        $(this).children().children().addClass('btn-active-filter');
    })

    // color vertical menu selected
    $('.menu-sidebar .button-group').on('click', 'button', function() {
        $(this).parent().find(".btn-active-filter").each(function() {
            $(this).removeClass("btn-active-filter");
        });
        $(this).addClass('btn-active-filter');
    })
});