var data, nomer, otp, ecode;
/*
chrome.tabs.executeScript({
    file: 'content.js'
});
*/



try {
    main();
} catch (e) {
    alert(e);
    //location.reload();
}

async function main() {
    await $(document).ready(async function () {
        console.log(window.location.href);
        if (window.location.href.includes("https://www.netflix.com/")) {


            $.get(chrome.runtime.getURL('template.html'), function (data) {

                $($.parseHTML(data)).insertBefore('body');
            });

        } else if (window.location.href.includes("https://m.dana.id/d/ipg/new/inputphone") || window.location.href.includes("https://m.dana.id/d/portal/oauth")) {
            const hasil = await cekConfig();
            let nomor = hasil.nomer[0] === '0' ? hasil.nomer.slice(1) : hasil.nomer;

            console.log(hasil);
            await tunggu("#app > div > div > div.ipg-new__wrapper > div.ipg-new__content > div > div.card-agreement > main > div.agreement__phone-wrapper > div.input-phone-wrapper > div.input-phone-container > label.clearable-input.desktop-input > input");
            let isinomer = document.querySelector("#app > div > div > div.ipg-new__wrapper > div.ipg-new__content > div > div.card-agreement > main > div.agreement__phone-wrapper > div.input-phone-wrapper > div.input-phone-container > label.clearable-input.desktop-input > input");

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
                setTimeout(() => {
                    OTPsimulateTyping(otp[i]);
                }, i * 500);
            }



        }
    });


};


async function cekConfig() {
    return new Promise(async function (resolve) {
        function checkStatus() {
            $.ajax({
                type: "GET",
                url: "https://akun.vip/5esim/config.json",
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
                const response = await $.ajax({
                    type: "GET",
                    url: `https://akun.vip/5esim/5sim.php?key=150199&otp=${id}`,
                });

                if (response.status === "FINISHED") {
                    // Extract the OTP code from the response
                    const otpCode = response.sms[0]?.code;
                    resolve(otpCode);
                } else if (response.status === "RECEIVED") {
                    // Retry after a delay if the status is RECEIVED
                    setTimeout(() => {
                        checkStatus(x + 1);
                    }, 250); // Check every 2 seconds
                } else {
                    console.log(response);
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
