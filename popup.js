var data, nomor, otp, ecode, tampil = 0, hasil;
/*
chrome.tabs.executeScript({
    file: 'content.js'
});
*/



checkUrlChange();

async function main(event) {
    await $(document).ready(async function () {
        console.log(window.location.href);
        if (window.location.href.includes("https://www.netflix.com/")) {

            if (window.location.href == "https://www.netflix.com/signup/mobileWalletOption") {
                hasil = await cekConfig();
                nomor = hasil.nomer[0] === '0' ? hasil.nomer.slice(1) : hasil.nomer;

                console.log(nomor)
                const observer = new MutationObserver((mutations, observer) => {
                    const phoneNumberElement = document.querySelector("#id_phoneNumber");
                    if (phoneNumberElement && phoneNumberElement.offsetParent !== null) { // Check if visible
                        document.querySelector("#id_phoneNumber").focus();
                        document.execCommand('insertText', false, nomor);
                        console.log(nomor)
                        document.querySelector("#cb_hasAcceptedTermsOfUse")
                        observer.disconnect(); // Stop observing
                        // Perform your action here
                    }
                });

                // Start observing changes in the body
                observer.observe(document.body, { attributes: true, childList: true, subtree: true });




            } else {


                if (tampil == 0) {
                    $.get(chrome.runtime.getURL('template.html'), function (data) {

                        $($.parseHTML(data)).insertBefore('body');
                    });
                    tampil = 1;
                }
            }

        } else if (window.location.href.includes("https://m.dana.id/d/ipg/new/inputphone")) {
            hasil = await cekConfig();
            nomor = hasil.nomer[0] === '0' ? hasil.nomer.slice(1) : hasil.nomer;

            console.log(hasil);
            await tunggu("#app > div > div > div.ipg-new__wrapper > div.ipg-new__content > div > div.card-agreement > main > div.agreement__phone-wrapper > div.input-phone-wrapper > div.input-phone-container > label.clearable-input.desktop-input > input");
            let isinomer = document.querySelector("#app > div > div > div.ipg-new__wrapper > div.ipg-new__content > div > div.card-agreement > main > div.agreement__phone-wrapper > div.input-phone-wrapper > div.input-phone-container > label.clearable-input.desktop-input > input");

            isinomer.value = ' ';
            // Focus on the input
            isinomer.focus();

            // Simulate typing with delays
            function simulateTyping(text, index = 0) {
                if (index < text.length) {
                    isinomer.value += text[index];
                    isinomer.dispatchEvent(new Event('input', { bubbles: true }));
                    setTimeout(() => simulateTyping(text, index + 1), Math.random() * 10 + 15); // Random delay
                }
            }
            isinomer.click();

            simulateTyping(nomor);



        } else if (window.location.href.includes("https://m.dana.id/d/ipg/new/register/otp")) {
            // NEXT PAGE
            await tunggu("#app > div > div > div.ipg-new__wrapper > div.ipg-new__content > div > div.card-agreement > main > div > div > div.risk-otp-content.text-center > div > div > div:nth-child(1)");

            const otp = await getOTP(hasil.id);

            function OTPsimulateTyping(otp) {
                // Seleksi elemen input
                const inputElement = document.querySelector("#app > div > div > div.ipg-new__wrapper > div.ipg-new__content > div > div.card-agreement > main > div > div > div.risk-otp-content.text-center > div > div > input");

                // Set nilai input
                inputElement.value = otp;

                // Buat dan kirim event 'input'
                const inputEvent = new Event('input', { bubbles: true });
                inputElement.dispatchEvent(inputEvent);

                // Opsional: Buat dan kirim event 'change' jika diperlukan
                const changeEvent = new Event('change', { bubbles: true });
                inputElement.dispatchEvent(changeEvent);
            }

            for (let i = 0; i < otp.length; i++) {

                OTPsimulateTyping(otp[i]);
                await delay(50);
            }

            let ipin = "121212";
            let ipin2 = "121212";


            await tunggu("#app > div > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(2) > div > div:nth-child(1)");
            document.querySelector("#app > div > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(2) > div > div:nth-child(1)").focus();
            document.execCommand('insertText', false, ipin.substring(0, 1));
            document.querySelector("#app > div > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(2) > div > div:nth-child(2)").focus();
            document.execCommand('insertText', false, ipin.substring(1, 2));
            document.querySelector("#app > div > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(2) > div > div:nth-child(3)").focus();
            document.execCommand('insertText', false, ipin.substring(2, 3));
            document.querySelector("#app > div > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(2) > div > div:nth-child(4)").focus();
            document.execCommand('insertText', false, ipin.substring(3, 4));
            document.querySelector("#app > div > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(2) > div > div:nth-child(5)").focus();
            document.execCommand('insertText', false, ipin.substring(4, 5));
            document.querySelector("#app > div > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(2) > div > div:nth-child(6)").focus();
            document.execCommand('insertText', false, ipin.substring(5, 6));


            await delay(1000);
            document.querySelector("#app > div > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(4) > div > div:nth-child(1)").focus();
            document.execCommand('insertText', false, ipin2.substring(0, 1));
            document.querySelector("#app > div > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(4) > div > div:nth-child(2)").focus();
            document.execCommand('insertText', false, ipin2.substring(1, 2));
            document.querySelector("#app > div > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(4) > div > div:nth-child(3)").focus();
            document.execCommand('insertText', false, ipin2.substring(2, 3));
            document.querySelector("#app > div > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(4) > div > div:nth-child(4)").focus();
            document.execCommand('insertText', false, ipin2.substring(3, 4));
            document.querySelector("#app > div > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(4) > div > div:nth-child(5)").focus();
            document.execCommand('insertText', false, ipin2.substring(4, 5));
            document.querySelector("#app > div > div > div.web-checkout-wrapper > div > div > div > div > div:nth-child(4) > div > div:nth-child(6)").focus();
            document.execCommand('insertText', false, ipin2.substring(5, 6));



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