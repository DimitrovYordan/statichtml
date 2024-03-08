$(document).ready(function () {
    var $kbcBtnFake = $('#fake-kbc_employee_btn'),
        $kbcBtnReal = $('#PIC_B2B_IDP'),
        $usernameFake = $('#fake-username'),
        $usernameReal = $('#email'),
        $passwordFake = $('#fake-password'),
        $passwordReal = $('#password'),
        $submitBtnFake = $('#fake-submit-btn'),
        $errors = $('.error'),
        $forgotPasswordFake = $('#fake-forgot-password'),
        $forgotPasswordReal = $('#forgotPassword'),
        $emailError = $('#email-error-message'),
        $passwordError = $('#password-error-message'),
        $hideEyeIcon = $('#hide-input-icon'),
        $showEyeIcon = $('#show-input-icon'),
        maxChecks = 30,
        errorsFound = false,
        emailReg = new RegExp('^[A-Za-z\._0-9+_-]{2,}[@][A-Za-z]{2,}[\.][a-z]{2,4}$'),
        errorMessages = [
            {
                realMsgAcc: 'We can\'t seem to find your account',
                realMsgPass: 'Your password is incorrect',
                realMsgEntPass: 'Please enter your password',
                realMsgEntEmail: 'Please enter your Email Address',
                realMsgWrongPatternEmail: 'Incorrect pattern for [Email Address]',
                fakeMsgAccPass: 'Невалидни данни за вход',
                fakeMsgEntEmailPass: 'Попълнете полето, за да продължите',
            }
        ];

    if ($kbcBtnReal.length) {
        $kbcBtnFake.on('click', function () {
            $kbcBtnReal.click();
        });
    }

    $(window).on('keypress', function (ev) {
        if (ev.keyCode === 13 || ev.keyCode === 10) {
            findErrors(0);
            submitForm();
        }
    });

    $submitBtnFake.on('click', function () {
        findErrors(0);
        submitForm();
    });

    $forgotPasswordFake.on('click', function () {
        $forgotPasswordReal[0].click();
    });

    $usernameFake.on('change', function () {
        var enterVal = $usernameFake.val();
        if (enterVal === '') {
            $emailError.text('Попълнете полето, за да продължите');
        } else if (!emailReg.test(enterVal)) {
            $emailError.text('Имейлът за вход не е валиден');
        } else {
            $emailError.text('');
        }
    });

    $passwordFake.on('keyup', function () {
        var enterVal = $passwordFake.val();
        if (enterVal === '') {
            $passwordError.text('Попълнете полето, за да продължите');
            $passwordFake.attr("type", "password");
            $hideEyeIcon.css('display', 'none');
            $showEyeIcon.css('display', 'none');
        } else {
            $hideEyeIcon.css('display', 'block');
            $passwordError.text('');
        }
    });

    $hideEyeIcon.on("click", function () {
        $passwordFake.attr("type", "text");
        $hideEyeIcon.css('display', 'none');
        $showEyeIcon.css('display', 'block');
    });

    $showEyeIcon.on("click", function () {
        $passwordFake.attr("type", "password");
        $hideEyeIcon.css('display', 'block');
        $showEyeIcon.css('display', 'none');
    });

    function submitForm() {
        $("input").removeAttr("pattern");

        var unFake = $usernameFake.val();
        var pwdFake = $passwordFake.val();

        $usernameReal.val(unFake);
        $passwordReal.val(pwdFake);

        $('#next').click();
    }

    function findErrors(checkCounter) {
        if (checkCounter < maxChecks) {
            setTimeout(function () {
                $($errors).find('p').each(function (ind, el) {
                    // var message = $(el).val();
                    // console.log(message);
                    
                    if (el && el !== '') {
                        console.log('2ви if');
                        var realMsg = errorMessages.find(function (index, element) {
                            // index - идва масива съобщения на англ.
                            // el - идва real съобщението
                            console.log(el);
                            console.log(index);
                            if (errorMessages.realMsgAcc === el) {
                                console.log('1');
                                return errorMessages.fakeMsgAccPass;
                            } else if (errorMessages.realMsgPass === el) {
                                console.log('2');
                                return errorMessages.fakeMsgAccPass;
                            } else if (errorMessages.realMsgEntPass === el) {
                                console.log('3');
                                return errorMessages.fakeMsgEntEmailPass;
                            } else if (errorMessages.realMsgEntEmail === el) {
                                console.log('4');
                                return errorMessages.fakeMsgEntEmailPass;
                            } else if (errorMessages.realMsgWrongPatternEmail === el) {
                                console.log('5');
                                return errorMessages.fakeMsgEntEmailPass;
                            }
                        });
                        
                        if (realMsg) {
                            console.log(realMsg);
                            console.log('след проверките');
                            $passwordError.text();

                            $(el).val('');
                        }

                        errorsFound = true;
                    }
                });

                if (!errorsFound) {
                    findErrors(checkCounter + 1);
                }
            }, 333);
        }
    }

});
