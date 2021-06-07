(function ($) {
    'use strict';
    var spinner = $('.spinner'),
        loadWrap = $('#loader-wrap'),
        main = $('.main');
    $(window).on('load', function () {
        spinner.css('opacity', 0);
        setTimeout(function () {
            loadWrap.addClass('animated slideOutUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                main.css('visibility', 'visible').addClass('animated fadeIn');
            });
        }, 1000);
    });
})(jQuery);
(function ($) {
    'use strict';
    var contentO = $('.content-open'),
        contentC = $('.content-close'),
        content = $('.content'),
        main = $('.main'),
        detailsWrap = $('.content-details-wrap'),
        contentBg = $('.background-content'),
        overlay = $('.overlay'),
        contentMsg = $('.content-message-area'),
        msgBg = $('.msg');
    contentO.on('click', function () {
        content.css('overflow', 'hidden').addClass('content-one');
        main.removeClass('animated slideInDown').addClass('animated slideOutUp');
        contentC.css('display', 'block');
        detailsWrap.css('opacity', 1).removeClass('content-details-wrap-one').addClass('content-details-wrap-two content-details-color');
        contentBg.css('opacity', 1);
        overlay.addClass('overlay-one');
        setTimeout(function () {
            contentMsg.css('visibility', 'visible').removeClass('animated slideOutDown').addClass('animated slideInUp');
            contentC.css('opacity', 1);
        }, 200);
        setTimeout(function () {
            content.css('overflow', 'auto');
        }, 1500);
    });
    contentC.on('click', function () {
        if ($(window).outerHeight() > msgBg.outerHeight() - 1) {
            content.css('overflow', 'hidden');
        }
        contentMsg.removeClass('animated slideInUp').addClass('animated slideOutDown');
        setTimeout(function () {
            overlay.removeClass('overlay-one');
            detailsWrap.removeClass('content-details-wrap-two content-details-color').addClass('content-details-wrap-one');
            main.removeClass('animated slideOutUp').addClass('animated slideInDown');
            content.removeClass('content-one');
            contentC.css('opacity', 0);
            contentBg.css('opacity', 0);
            setTimeout(function () {
                contentC.css('display', 'none');
            }, 500);
        }, 200);
    });
})(jQuery);
(function ($) {
    'use strict';
    var jsInput = $('.js-input'),
        subButton = $('.subscribe-button-styles'),
        subInput = $('.subscribe-input-styles');
    jsInput.keyup(function () {
        if ($(this).val()) {
            $(this).addClass('not-empty');
        } else {
            $(this).removeClass('not-empty');
        }
    });
    subButton.on('click', function () {
        var email = subInput.val(),
            emailTo = '',
            apiKey = '',
            listID = '',
            is_email_enabled = false,
            is_mailchimp_enabled = false;
        if (subscribe.emailTo) {
            is_email_enabled = true;
            emailTo = subscribe.emailTo;
        }
        if (subscribe.apiKey && subscribe.listID) {
            is_mailchimp_enabled = true;
            apiKey = subscribe.apiKey;
            listID = subscribe.listID;
        }
        $.ajax({
            type: 'POST',
            url: 'assets/subscribe.php',
            data: {
                via_mailchimp: is_mailchimp_enabled,
                via_email: is_email_enabled,
                email: email,
                email_to: emailTo,
                api_key: apiKey,
                list_id: listID,
                success_msg: subscribe.successMsg
            },
            dataType: 'json',
            success: function (json) {
                if (json.valid === 0) {
                    subInput.css('border', '1px solid tomato');
                } else {
                    subInput.val(json.message);
                    subInput.css('border', '1px solid green');
                    setTimeout(function () {
                        subInput.css('border', '1px solid rgba(244, 244, 244, 0.3)');
                        subInput.val('');
                    }, 3000);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
        return false;
    });
})(jQuery);
(function ($) {
    'use strict';
    var customTextColor = $('.text-color'),
        subButton = $('.subscribe-button-styles'),
        contentOpenButton = $('.content-open'),
        contentCloseButton = $('.content-close'),
        submitMsgButton = $('.submit-btn');
    customTextColor.css('color', colorOptions.customColor);
    subButton.css('background-color', colorOptions.subscribeColor).hover(function () {
        $(this).css('background-color', colorOptions.subscribeHoverColor);
    }, function () {
        $(this).css('background-color', colorOptions.subscribeColor);
    });
    contentOpenButton.css('background-color', colorOptions.contentOpenColor).hover(function () {
        $(this).css('background-color', colorOptions.contentOpenHoverColor);
    }, function () {
        $(this).css('background-color', colorOptions.contentOpenColor);
    });
    contentCloseButton.css('background-color', colorOptions.contentCloseColor).hover(function () {
        $(this).css('background-color', colorOptions.contentCloseHoverColor);
    }, function () {
        $(this).css('background-color', colorOptions.contentCloseColor);
    });
    submitMsgButton.css('background-color', colorOptions.submitButtonColor).hover(function () {
        $(this).css('background-color', colorOptions.submitButtonHoverColor);
    }, function () {
        $(this).css('background-color', colorOptions.submitButtonColor);
    });
    if ($(window).width() <= 991) {
        contentCloseButton.css('background-color', colorOptions.contentCloseHoverColor);
        submitMsgButton.css('background-color', colorOptions.submitButtonHoverColor);
    }
})(jQuery);
(function ($) {
    'use strict';
    var submitMessage = $('.submit-message'),
        massageName = $('#name'),
        messageEmail = $('#email'),
        messageMsg = $('#message');
    submitMessage.on('click', function (e) {
        e.preventDefault();
        var message_name = $('.message-name').val(),
            message_email = $('.message-email').val(),
            message_text = $('.message-text').val();
        $.ajax({
            type: 'POST',
            url: 'assets/message.php',
            data: {
                message_name: message_name,
                message_email: message_email,
                message_text: message_text,
                email_to: message.emailTo
            },
            dataType: 'json',
            success: function (json) {
                if (json.is_mail_sent) {
                    massageName.css('border-color', 'green');
                    messageEmail.css('border-color', 'green');
                    messageMsg.css('border-color', 'green');
                    setTimeout(function () {
                        $('#name, #email, #message').val('').removeClass('not-empty');
                        $('.js-input').keyup(function () {
                            if ($(this).val()) {
                                $(this).addClass('not-empty');
                            } else {
                                $(this).removeClass('not-empty');
                            }
                        });
                        if (json.name == 0) {
                            massageName.css('border-color', 'tomato');
                        } else {
                            massageName.css('border-color', '#FFF');
                        }
                        if (json.email == 0) {
                            messageEmail.css('border-color', 'tomato');
                        } else {
                            messageEmail.css('border-color', '#FFF');
                        }
                        if (json.message == 0) {
                            messageMsg.css('border-color', 'tomato');
                        } else {
                            messageMsg.css('border-color', '#FFF');
                        }
                    }, 3000);
                }

                if (!json.is_mail_sent) {
                    if (json.name == 0) {
                        massageName.css('border-color', 'tomato');
                    } else {
                        massageName.css('border-color', '#FFF');
                    }
                    if (json.email == 0) {
                        messageEmail.css('border-color', 'tomato');
                    } else {
                        messageEmail.css('border-color', '#FFF');
                    }
                    if (json.message == 0) {
                        messageMsg.css('border-color', 'tomato');
                    } else {
                        messageMsg.css('border-color', '#FFF');
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {}
        });
    });
})(jQuery);