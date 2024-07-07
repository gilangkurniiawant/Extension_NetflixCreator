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

        $.get(chrome.runtime.getURL('template.html'), function (data) {

            $($.parseHTML(data)).insertBefore('body');
        });
    });


};

