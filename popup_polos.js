var data, nomor, otp, ecode, tampil = 0, hasil;
/*
chrome.tabs.executeScript({
    file: 'content.js'
});
*/



main();

async function main(event) {
    await $(document).ready(async function () {

        if (window.location.href.includes("https://www.netflix.com/")) {
            $.get(chrome.runtime.getURL('template.html'), function (data) {

                $($.parseHTML(data)).insertBefore('body');
            });
        }

    });


};
