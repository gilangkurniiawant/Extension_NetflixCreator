var data, nomor, otp, ecode, tampil = 0, hasil;
/*
chrome.tabs.executeScript({
    file: 'content.js'
});
*/



checkUrlChange();

async function main(event) {
    await $(document).ready(async function () {

        if (window.location.href.includes("https://www.netflix.com/")) {

            if (window.location.href == "https://www.netflix.com/signup") {
                await tunggu("#appMountPoint > div > div > div > div.simpleContainer > div > div.submitBtnContainer > button");
                document.querySelector("#appMountPoint > div > div > div > div.simpleContainer > div > div.submitBtnContainer > button").click();
            } else if (window.location.href == "https://www.netflix.com/signup/planform") {
                await tunggu("#appMountPoint > div > div > div > div.simpleContainer > div > div > div.default-ltr-cache-xu8gj4 > div > div:nth-child(2) > div > label");
                document.querySelector("#appMountPoint > div > div > div > div.simpleContainer > div > div > div.default-ltr-cache-xu8gj4 > div > div:nth-child(2) > div > label").click();

                await delay(500);
                // document.querySelector("#appMountPoint > div > div > div > div.simpleContainer > div > div > div.default-ltr-cache-0 > div > button").click();



            } else if (window.location.href == "https://www.netflix.com/signup/registration") {
                await tunggu("#appMountPoint > div > div > div > div.simpleContainer > div > div.submitBtnContainer > button");
                document.querySelector("#appMountPoint > div > div > div > div.simpleContainer > div > div.submitBtnContainer > button").click();
            } else if (window.location.href == "https://www.netflix.com/signup/paymentPicker") {
                await tunggu("#mobileWalletDisplayStringId");
                document.querySelector("#mobileWalletDisplayStringId").click();
            } else {

            }

            if (window.location.href == "https://www.netflix.com/signup/mobileWalletOption") {

                await tunggu("#appMountPoint > div > div > div > div.simpleContainer > div > div > form > div.paymentFormContainer > div.fieldContainer > div.ui-select-wrapper.mobile-wallet-select > a > div");
                document.querySelector("#appMountPoint > div > div > div > div.simpleContainer > div > div > form > div.paymentFormContainer > div.fieldContainer > div.ui-select-wrapper.mobile-wallet-select > a > div").click();
                await delay(500);
                document.querySelector("#appMountPoint > div > div > div > div.simpleContainer > div > div > form > div.paymentFormContainer > div.fieldContainer > div.ui-select-wrapper.ui-select-wrapper-open.mobile-wallet-select > ul > li:nth-child(2)").click()
                document.querySelector("#cb_hasAcceptedTermsOfUse").click();
                document.querySelector("#id_phoneNumber").focus();

            } else {


                if (tampil == 0) {
                    $.get(chrome.runtime.getURL('template.html'), function (data) {

                        $($.parseHTML(data)).insertBefore('body');
                    });
                    tampil = 1;
                }
            }

        } else if (window.location.href.includes("https://m.dana.id/d/ipg/new/register/pin")) {
            let ipin = "121212";

            async function enterPin(selectorBase, ipin) {
                for (let i = 0; i < ipin.length; i++) {
                    let selector = `${selectorBase} > div:nth-child(${i + 1})`;
                    await tunggu(selector);
                    document.querySelector(selector).focus();
                    document.execCommand('insertText', false, ipin.substring(i, i + 1));
                }
            }

            await enterPin("#app > div > div > div.ipg-new__wrapper > div.ipg-new__content > div > div.card-agreement > main > div > div:nth-child(3) > div.input-pin__input-wrapper > div", ipin);

            await delay(100);

            await enterPin("#app > div > div > div.ipg-new__wrapper > div.ipg-new__content > div > div.card-agreement > main > div > div:nth-child(5) > div.input-pin__input-wrapper > div", ipin);


        }

    });


};




async function cekConfig() {
    return new Promise(async function (resolve) {
        function checkStatus() {
            $.ajax({
                type: "GET",
                url: "https://akun.vip/5esim/config.json",
                cache: false,
                success: function (data) {
                    if (data.status === 1) {
                        resolve(data);
                    } else {
                        setTimeout(checkStatus, 250); // Retry after 1 second
                    }
                },
                error: function () {
                    resolve({ status: 0, message: "Failed to fetch data" });
                }
            });
        }

        checkStatus();
    });
}


async function getOTP(id) {
    return new Promise((resolve, reject) => {
        const checkStatus = async () => {
            try {

                let data = btoa(JSON.stringify({
                    "status": 0,
                    "nomer": nomor,
                    "id": hasil.id
                }));


                const response = await $.ajax({
                    type: "GET",
                    url: `https://akun.vip/5esim/5sim.php?key=150199&otp=${id}`,
                    cache: false,
                });
                console.log(response);
                if (response.status === "FINISHED") {
                    // Extract the OTP code from the response
                    const otpCode = response.sms[0]?.code;
                    hasil = 0;
                    await simpanConfig(data);
                    resolve(otpCode);
                } else if (response.status === "RECEIVED") {
                    if (response.sms && response.sms.length > 0 && response.sms[0]?.code) {
                        const otpCode = response.sms[0].code;
                        await simpanConfig(data);
                        hasil = 0;
                        resolve(otpCode);
                    } else {
                        setTimeout(() => {
                            checkStatus();
                        }, 250); // Check every 2 seconds

                        let re
                    }
                } else {
                    await tunggu("#app > div > div > div.ipg-new__wrapper > div.ipg-new__content > div > div.card-agreement > main > div > div > div.no-border > p");
                    document.querySelector("#app > div > div > div.ipg-new__wrapper > div.ipg-new__content > div > div.card-agreement > main > div > div > div.no-border > p").innerText = `STATUS SMS ${response.status}`;

                    hasil = 0;
                    resolve(0);
                }
            } catch (error) {
                reject(error);
            }
        };

        checkStatus();
    });
}




async function tunggu(selecTor, all = 0) {




    return new Promise(async function (resolve) {
        if (all == 0) {
            while (document.querySelector(selecTor) == null) {
                await delay(100);
            }
        } else {
            while (document.querySelectorAll(selecTor) == null) {
                await delay(100);
            }
        }


        resolve(1);
    });
}

async function delay(time) {
    return new Promise(r => setTimeout(r, time));


}


function waitForButtonEnable(selector, callback) {
    const interval = setInterval(() => {
        const button = document.querySelector(selector);
        if (button && !button.disabled) {
            clearInterval(interval);
            callback(button);
        }
    }, 100); // Poll every 100 milliseconds
}

async function checkUrlChange() {
    let lastUrl = window.location.href;
    main();
    while (true) {
        const currentUrl = window.location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            main();
        }
        await delay(500); // Tunggu 500 milidetik sebelum memeriksa lagi
    }
}


async function simpanConfig(content, attempt = 1, maxAttempts = 999) {
    return new Promise((resolve, reject) => {
        function makeRequest() {
            $.ajax({
                type: "POST",
                url: "https://akun.vip/5esim/5sim.php?key=150199",
                data: new URLSearchParams({
                    'config': content
                }).toString(),
                cache: false,
                success: function (data) {
                    if (data == "1") {
                        resolve(1);
                    } else {
                        retry();
                    }
                },
                error: function () {
                    retry();
                }
            });
        }

        function retry() {
            if (attempt < maxAttempts) {
                console.log(`Attempt ${attempt} failed. Retrying...`);
                simpanConfig(content, attempt + 1, maxAttempts).then(resolve).catch(reject);
            } else {
                reject(new Error("Exceeded maximum retry attempts"));
            }
        }

        makeRequest();
    });
}