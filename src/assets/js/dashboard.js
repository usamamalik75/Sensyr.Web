'use strict';
(function($) {

    $(document).ready(function() {

        "use strict";

        // Init Demo JS
        //Demo.init();

        // Init Core
        Core.init();

        // Init

        // Init Calendar Modal
        $('#compose-event-btn').magnificPopup({
            removalDelay: 500,
            callbacks: {
                beforeOpen: function(e) {
                    // Indicate active overlay with class
                    $('body').addClass('mfp-bg-open');
                    this.st.mainClass = this.st.el.attr('data-effect');
                },
                afterClose: function(e) {
                    $('body').removeClass('mfp-bg-open');
                }
            },
            midClick: true
        });

        // give file-upload preview onclick functionality
        var fileUpload = $('.fileupload-preview');
        if (fileUpload.length) {

        fileUpload.each(function(i, e) {
            var fileForm = $(e).parents('.fileupload').find('.btn-file > input');
            $(e).on('click', function() {
            fileForm.click();
            });
        });
        }


    });

})(jQuery);
