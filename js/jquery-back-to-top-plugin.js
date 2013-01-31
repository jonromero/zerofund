/************************************************************************************
** jQuery To Top version 0.1
** (cc) Jorgen Kesseler - jkesseler@gmail.com / verpletterend.nl
** Licensed under the CC-GNU GPL (http://creativecommons.org/licenses/GPL/2.0/)
*************************************************************************************/

(function( $ ) {
        jQuery.toTop = function( options ) {

                options = $.extend( {}, jQuery.toTop.defaults, options );
                options.css = $.extend( {}, jQuery.toTop.defaults.css, options.css );

                $anchor = $( '<a />', {
            id: options.anchorName,
                        name: options.anchorName
                }).prependTo( 'body' );

                var $divTag = $( '<div/>', {
                                css: options.css,
                                id: options.id
                        }
                ).appendTo( options.appentTo );

                $toTopLink = $( '<a />', {
                        href: '#' + options.anchorName
                })
        .html( options.topLinkText )
                .click ( function( event ) {
            event.preventDefault();

            $( 'html, body').animate({
                                        scrollTop : 0
                                },
                                options.scrollSpeed
                        );
                })
        .appendTo($divTag);
        if( options.image != '' ) {
            $toTopLink.html('');
            $image = $( '<img />', {
                alt: options.topLinkText,
                css: {
                    border: 'none'
                },
                src: options.image
            })
            .appendTo( $toTopLink );
        }
                $( window ).scroll( function() {
                        if ( $( document ).scrollTop() == 0 ) {
                                $divTag.slideUp();
                        } else {
                                $divTag.slideDown();
                        }
                });
        }
        jQuery.toTop.defaults = {
                anchorName: 'top',
                appentTo: 'body',
                css: {
                        bottom: '-3px',
						right: '-3px',
                        display: 'none',
                        position: 'fixed',
                        zIndex: 999
                },
                id: 'toTop',
                image: '',
                scrollSpeed: 200,
        topLinkText: 'Back to top'
        };
})(jQuery);