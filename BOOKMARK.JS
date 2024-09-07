

main();
var all_profiles = "", esn = netflix.reactContext.models.esnGeneratorModel.data.esn, cuser = netflix.reactContext.models.signupContext.data.flow.fields.showPrivacyAndDataSettings.value[0];
var esnp = esn.split("-").slice(0, 2).join("-") + "-";
try {
    const datap = netflix.reactContext.models.graphql.data;
    const profiles = Object.values(datap).filter(item => item.__typename === "Profile");
    all_profiles = profiles.sort((a, b) => a.name.localeCompare(b.name));
} catch (e) {
    all_profiles = netflix.reactContext.models.profilesModel.data.profiles;
}
var versi = netflix.reactContext.models.abContext.data.headers["X-Netflix.uiVersion"], path, guid_utama, url_create, avatar, pins, apin, cekgagal, body, avatar_baru;
async function main() {
    await getajax();
    var act = prompt("Menu : \n1. Buat Profile 1 s.d 5\n2. Set PIN Semua Profile\n3. Clear Histori Semua Profile\n4. Perpanjang\n    (Clear Histori & Ganti Profile Nama Yang Tidak PPJ)\n \n Masukan 1 / 2 / 3 / 4 : ");
    if (act == 1) {
        do {
            body = await req("GET", "https://www.netflix.com/YourAccount");
            $('body').html(body);
            cekgagal = await req("POST", 'https://www.netflix.com/nq/website/memberapi/release/pathEvaluator?webp=true&drmSystem=widevine&isVolatileBillboardsEnabled=true&isTop10Supported=true&isTop10KidsSupported=true&hasVideoMerchInBob=true&hasVideoMerchInJaw=true&method=call&falcor_server=0.1.0&withSize=true&materialize=true&original_path=%2Fshakti%2Fmre%2FpathEvaluator', 'callPath=%5B%22profiles%22%2C%22' + all_profiles[0].guid + '%22%2C%22edit%22%5D&param=%221%22&param=%22id-ID%22&param=%22AVATAR%7Cd0033ad0-6620-11e9-a8d8-124bf1e73cce%7Cen%7CID%7C80108159%22&param=null&param=true&path=%5B%22profilesList%22%2C%22summary%22%5D&path=%5B%22profilesList%22%2C%7B%22to%22%3A5%7D%2C%22summary%22%5D&path=%5B%22profilesList%22%2C%7B%22to%22%3A5%7D%2C%22avatar%22%2C%22images%22%2C%22byWidth%22%2C320%5D&authURL=' + netflix.reactContext.models.userInfo.data.authURL, 0);
        } while (!cekgagal);
        await showPopup();
        await pilihan_1();
        location.reload();
    } else if (act == 2) {
        var pinss = prompt("Masukan PIN 1 s.d 5, berurutan dengan pemisah dari excel (newline) atau gunakan spasi \n\nContoh : 1111 2222 3333 4444 5555");
        do {
            body = await req("GET", "https://www.netflix.com/YourAccount");
            $('body').html(body);
            cekgagal = await req("POST", 'https://www.netflix.com/nq/website/memberapi/release/pathEvaluator?webp=true&drmSystem=widevine&isVolatileBillboardsEnabled=true&isTop10Supported=true&isTop10KidsSupported=true&hasVideoMerchInBob=true&hasVideoMerchInJaw=true&method=call&falcor_server=0.1.0&withSize=true&materialize=true&original_path=%2Fshakti%2Fmre%2FpathEvaluator', 'callPath=%5B%22profiles%22%2C%22' + all_profiles[0].guid + '%22%2C%22edit%22%5D&param=%221%22&param=%22id-ID%22&param=%22AVATAR%7Cd0033ad0-6620-11e9-a8d8-124bf1e73cce%7Cen%7CID%7C80108159%22&param=null&param=true&path=%5B%22profilesList%22%2C%22summary%22%5D&path=%5B%22profilesList%22%2C%7B%22to%22%3A5%7D%2C%22summary%22%5D&path=%5B%22profilesList%22%2C%7B%22to%22%3A5%7D%2C%22avatar%22%2C%22images%22%2C%22byWidth%22%2C320%5D&authURL=' + netflix.reactContext.models.userInfo.data.authURL, 0);
        } while (!cekgagal);
        await showPopup();
        await pilihan_2(pinss);
        location.reload();
    } else if (act == 3) {
        do {
            body = await req("GET", "https://www.netflix.com/YourAccount");
            $('body').html(body);
            cekgagal = await req("POST", 'https://www.netflix.com/nq/website/memberapi/release/pathEvaluator?webp=true&drmSystem=widevine&isVolatileBillboardsEnabled=true&isTop10Supported=true&isTop10KidsSupported=true&hasVideoMerchInBob=true&hasVideoMerchInJaw=true&method=call&falcor_server=0.1.0&withSize=true&materialize=true&original_path=%2Fshakti%2Fmre%2FpathEvaluator', 'callPath=%5B%22profiles%22%2C%22' + all_profiles[0].guid + '%22%2C%22edit%22%5D&param=%221%22&param=%22id-ID%22&param=%22AVATAR%7Cd0033ad0-6620-11e9-a8d8-124bf1e73cce%7Cen%7CID%7C80108159%22&param=null&param=true&path=%5B%22profilesList%22%2C%22summary%22%5D&path=%5B%22profilesList%22%2C%7B%22to%22%3A5%7D%2C%22summary%22%5D&path=%5B%22profilesList%22%2C%7B%22to%22%3A5%7D%2C%22avatar%22%2C%22images%22%2C%22byWidth%22%2C320%5D&authURL=' + netflix.reactContext.models.userInfo.data.authURL, 0);
        } while (!cekgagal);
        await showPopup();
        await pilihan_3();
        location.reload();
    } else if (act == 4) {
        var pinssnumber = prompt("Masukan profile yang ingin diperpanjang,  \n\nContoh(1&5) ditulis : 15");
        do {
            body = await req("GET", "https://www.netflix.com/YourAccount");
            $('body').html(body);
            cekgagal = await req("POST", 'https://www.netflix.com/nq/website/memberapi/release/pathEvaluator?webp=true&drmSystem=widevine&isVolatileBillboardsEnabled=true&isTop10Supported=true&isTop10KidsSupported=true&hasVideoMerchInBob=true&hasVideoMerchInJaw=true&method=call&falcor_server=0.1.0&withSize=true&materialize=true&original_path=%2Fshakti%2Fmre%2FpathEvaluator', 'callPath=%5B%22profiles%22%2C%22' + all_profiles[0].guid + '%22%2C%22edit%22%5D&param=%221%22&param=%22id-ID%22&param=%22AVATAR%7Cd0033ad0-6620-11e9-a8d8-124bf1e73cce%7Cen%7CID%7C80108159%22&param=null&param=true&path=%5B%22profilesList%22%2C%22summary%22%5D&path=%5B%22profilesList%22%2C%7B%22to%22%3A5%7D%2C%22summary%22%5D&path=%5B%22profilesList%22%2C%7B%22to%22%3A5%7D%2C%22avatar%22%2C%22images%22%2C%22byWidth%22%2C320%5D&authURL=' + netflix.reactContext.models.userInfo.data.authURL, 0);
        } while (!cekgagal);
        await showPopup();
        await pilihan_4(pinssnumber);
        location.reload();
    } else if (act == null) { } else {
        alert('Pilihan tidak terdaftar, mohon ulangi!');
    }
}
; async function getajax() {
    return new Promise(function (resolve) {
        var s, r, t;
        r = false;
        s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
        s.onload = s.onreadystatechange = function () {
            if (!r && (!this.readyState || this.readyState == 'complete')) {
                r = true;
                resolve('OK');
            }
        }
            ;
        t = document.getElementsByTagName('script')[0];
        t.parentNode.insertBefore(s, t);
    }
    );
}
async function req(method, url, data, json = 1) {
    return new Promise(function (resolve) {
        if (json == 1) {
            var type = "application/json";
            data = JSON.stringify(data);
        } else {
            var type = "application/x-www-form-urlencoded";
        }
        $.ajax({
            type: method,
            data: data,
            contentType: type,
            url: url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-netflix.uiversion", versi);
                xhr.setRequestHeader("x-netflix.esn", esn);
                xhr.setRequestHeader("x-netflix.request.client.user.guid", cuser);
                xhr.setRequestHeader("x-netflix.esnprefix", esnp);
            },
            success: function (data) {
                resolve(data);
            },
            error: function () {
                resolve(0)
            }
        });
    }
    );
}
async function delay(time) {
    return new Promise(r => setTimeout(r, time));
}
async function setbanner() {
    return new Promise(async function (resolve) {
        try {
            if (document.querySelector("#appMountPoint > div > div > div > section > div.default-ltr-cache-1fhvoso.eslj5pt1 > div > div > div > div > div > div > section > div:nth-child(3) > div")) {
                $('#appMountPoint > div > div > div > section > div.default-ltr-cache-1fhvoso.eslj5pt1 > div > div > div > div > div > div > section > div:nth-child(3) > div').html('');
                $('#appMountPoint > div > div > div > section > div.default-ltr-cache-1fhvoso.eslj5pt1 > div > div > div > div > div > div > section > div:nth-child(3) > div').append('<header class="account-section-header collapsable-section-toggle"><h2><b>NETFLIX TOOL</b></h2>\nBy: AkunVIP</header>');
                $('#appMountPoint > div > div > div > section > div.default-ltr-cache-1fhvoso.eslj5pt1 > div > div > div > div > div > div > section > div:nth-child(3) > div').append('<section class="collapsable-section-content account-section-content"><div class="acollapsable-section-content account-section-content"><div class="clearfix"><div class="account-section-group">');
                $('#appMountPoint > div > div > div > section > div.default-ltr-cache-1fhvoso.eslj5pt1 > div > div > div > div > div > div > section > div:nth-child(3) > div').append('<section class="collapsable-section-content account-section-content" id="akunvip">');
            } else {
                $('*[data-uia="plan-section"]').text('');
                $('*[data-uia="plan-section"]').append('<header class="account-section-header collapsable-section-toggle"><h2><b>NETFLIX TOOL</b></h2>\nBy: AkunVIP</header>');
                $('*[data-uia="plan-section"]').append('<section class="collapsable-section-content account-section-content"><div class="acollapsable-section-content account-section-content"><div class="clearfix"><div class="account-section-group">');
                $('*[data-uia="plan-section"]').append('<section class="collapsable-section-content account-section-content" id="akunvip">');
            }
            var focusElement = $(".bd");
            $(focusElement).focus();
            ScrollToTop(focusElement);
        } catch (e) { }
        resolve(1);
    }
    );
}
function ScrollToTop(el) {
    $('html, body').animate({
        scrollTop: $(el).offset().top - 50
    }, 'slow');
}
async function pilihan_1() {
    return new Promise(async function (resolve) {
        for (let x = 0; x < all_profiles.length; x++) {
            if (x >= 1) {
                path = 'callPath=["profilesList","remove"]&param="' + all_profiles[x].guid + '"&path=["profilesList","summary"]&path=["profilesList",{"to":5},"summary"]&path=["profilesList",{"to":5},"avatar","images","byWidth",320]&authURL=' + netflix.reactContext.models.userInfo.data.authURL;
                await req('POST', 'https://www.netflix.com/nq/website/memberapi/release/pathEvaluator?webp=true&drmSystem=widevine&isVolatileBillboardsEnabled=true&isTop10Supported=true&isTop10KidsSupported=true&hasVideoMerchInBob=true&hasVideoMerchInJaw=true&method=call&falcor_server=0.1.0&withSize=true&materialize=true&original_path=%2Fshakti%2Fmre%2FpathEvaluator', path, 0);
            } else {
                guid_utama = all_profiles[x].guid;
            }
        }

        path = {
            "hideAll": "true",
            "guid": guid_utama,
            "authURL": netflix.reactContext.models.userInfo.data.authURL
        };

        if (!(await req('POST', 'https://www.netflix.com/api/shakti/mre/viewingactivity', path))) {
            alert("Clear History Profile '1' Gagal");
            location.reload();
            process.exit();
        } else {
            $('#akunvip').append('<h1 style="display: inline;color:#01937C">  1 OK!<h/1>');
        }

        url_create = 'https://www.netflix.com/api/shakti/mre/profiles/create';
        avatar = ['', '', 'AVATAR|d00388f0-6620-11e9-a8d8-124bf1e73cce|en|ID|80108159', 'AVATAR|d00361e0-6620-11e9-a8d8-124bf1e73cce|en|ID|80108159', 'AVATAR|d00388f1-6620-11e9-a8d8-124bf1e73cce|en|ID|80108159', 'AVATAR|d00361e1-6620-11e9-a8d8-124bf1e73cce|en|ID|80108159'];
        avatar_baru = ['', '', 'icon26', 'icon27', 'icon28', 'icon29'];
        for (let x = 2; x <= 5; x++) {
            if (await req('POST', url_create,
                { "profiles": "[{\"firstName\":\"" + x + "\",\"avatarName\":\"" + avatar[x] + "\",\"jfk\":false,\"maturityLevel\":\"ADULTS\"}]", "authURL": netflix.reactContext.models.userInfo.data.authURL }
            )) {
                await delay(1000);
                $('#akunvip').append('<h1 style="display: inline;color:#01937C">  ' + x + ' OK!<h/1>');
            } else {
                $('#akunvip').append('<h1 style="display: inline;color:#fc827e">  ' + x + 'Gagal!<h/1>');
                alert('Create Profile ' + x + 'Gagal!');
                location.reload();
                process.exit();
            }
        }
        resolve(1);
    }
    );
}
async function pilihan_2(pinss) {
    return new Promise(async function (resolve) {
        pins = pinss;
        apin = pins.split("\r\n");
        if (apin.length < 5) {
            apin = pins.split(" ");
        }
        while (apin.length < 5) {
            alert("Input PIN Salah !");
            var pins = prompt("Masukan PIN 1 s.d 5, berurutan dengan pemisah dari excel (newline) atau gunakan spasi \n\nContoh : 1111 2222 3333 4444 5555");
            apin = pins.split("\r\n");
            if (apin.length < 5) {
                apin = pins.split(" ");
            }
        }
        pins = apin;
        let promises = [];

        for (let x = 0; x <= 4; x++) {
            let path = {
                "action": "set",
                "isProfileCreationLocked": true,
                "pin": pins[x],
                "guid": all_profiles[x].guid,
                "authURL": netflix.reactContext.models.userInfo.data.authURL
            };

            let promise = req('POST', 'https://www.netflix.com/api/shakti/mre/profileLock', path)
                .then((result) => {
                    if (result) {
                        $('#akunvip').append('<h1 style="display: inline;color:#01937C"> ' + (x + 1) + ' OK! <h/1>');
                    } else {
                        $('#akunvip').append('<h1 style="display: inline;color:#fc827e">  ' + x + ' Gagal! <h/1>');
                        alert('Set PIN ' + x + ' Gagal!');
                        location.reload();
                        process.exit();
                    }
                })
                .catch((error) => {
                    $('#akunvip').append('<h1 style="display: inline;color:#fc827e">  ' + x + ' Gagal! <h/1>');
                    alert('Set PIN ' + x + ' Gagal!');
                    location.reload();
                    process.exit();
                });

            promises.push(promise);
        }


        Promise.all(promises)
            .then(() => {
                console.log('Semua permintaan selesai diproses.');
            })
            .catch(() => {
                console.log('Ada beberapa permintaan yang gagal.');
            });

        resolve(1);
    }
    );
}
async function pilihan_3() {
    return new Promise(async function (resolve) {
        for (let x = 0; x <= 4; x++) {
            path = {
                "hideAll": "true",
                "guid": all_profiles[x].guid,
                "authURL": netflix.reactContext.models.userInfo.data.authURL
            };
            if (await req('POST', 'https://www.netflix.com/api/shakti/' + versi + '/viewingactivity', path)) {
                $('#akunvip').append('<h1 style="display: inline;color:#01937C"> ' + (x + 1) + ' OK! <h/1>');
            } else {
                $('#akunvip').append('<h1 style="display: inline;color:#fc827e"> Gagal!<h/1>');
                alert('Clear History  ' + (x + 1) + ' Gagal!');
                location.reload();
                process.exit();
            }
        }
        resolve(1);
    }
    );
}
async function pilihan_4(number) {
    return new Promise(async function (resolve) {
        var output = []
            , sNumber = number.toString();
        for (let i = 0, len = sNumber.length; i < len; i += 1) {
            output.push((+sNumber.charAt(i) - 1));
        }
        avatar = ['', 'AVATAR|d00388f0-6620-11e9-a8d8-124bf1e73cce|en|ID|80108159', 'AVATAR|d00361e0-6620-11e9-a8d8-124bf1e73cce|en|ID|80108159', 'AVATAR|d00388f1-6620-11e9-a8d8-124bf1e73cce|en|ID|80108159', 'AVATAR|d00361e1-6620-11e9-a8d8-124bf1e73cce|en|ID|80108159'];
        for (var h = 0; h < output.length; h++) {
            for (let z = 0; z < output.length; z++) {
                if (output[z] !== h) {
                    delete all_profiles[output[h]];
                    break;
                }
            }
        }
        var lx = 1;
        for (const res of all_profiles) {
            if (res !== undefined) {
                path = {
                    "hideAll": "true",
                    "guid": res.guid,
                    "authURL": netflix.reactContext.models.userInfo.data.authURL
                };
                if (await req('POST', 'https://www.netflix.com/api/shakti/mre/viewingactivity', path)) { } else {
                    $('#akunvip').append('<h1 style="display: inline;color:#fc827e"> Gagal Clear Histori Perpanjang!<h/1>');
                    alert('Clear History  ' + lx + ' Gagal!');
                    location.reload();
                    process.exit();
                }
                if (await req("POST", 'https://www.netflix.com/nq/website/memberapi/release/pathEvaluator?webp=true&drmSystem=widevine&isVolatileBillboardsEnabled=true&isTop10Supported=true&isTop10KidsSupported=true&hasVideoMerchInBob=true&hasVideoMerchInJaw=true&method=call&falcor_server=0.1.0&withSize=true&materialize=true&original_path=%2Fshakti%2Fmre%2FpathEvaluator', 'callPath=["profiles","' + all_profiles[(lx - 1)].guid + '","edit"]&param="' + lx + '"&param="id-ID"&param="' + avatar[(lx - 1)] + '"&param=null&param=true&path=["profilesList","summary"]&path=["profilesList",{"to":5},"summary"]&path=["profilesList",{"to":5},"avatar","images","byWidth",320]&authURL=' + netflix.reactContext.models.userInfo.data.authURL, 0)) { } else {
                    $('#akunvip').append('<h1 style="display: inline;color:#fc827e"> Gagal!<h/1>');
                    alert('Edit Profile  ' + lx + ' Gagal!');
                    location.reload();
                    process.exit();
                }
            } else {
                $('#akunvip').append('<h1 style="display: inline;color:#01937C"> ' + lx + ' OK! <h/1>');
            }
            lx++;
        }
        resolve(1);
    }
    );
}
function showPopup() {
    var popupOverlay = document.createElement('div');
    popupOverlay.id = 'popupOverlay';
    popupOverlay.style.display = 'none';
    popupOverlay.style.position = 'fixed';
    popupOverlay.style.top = '0';
    popupOverlay.style.left = '0';
    popupOverlay.style.width = '100%';
    popupOverlay.style.height = '100%';
    popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    popupOverlay.style.zIndex = '999';
    var popup = document.createElement('div');
    popup.id = 'popup';
    popup.style.display = 'none';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.width = '300px';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'white';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    popup.style.zIndex = '1000';
    var popupHeader = document.createElement('h2');
    popupHeader.id = 'judul';
    popupHeader.innerText = 'Run . . .';
    var popupMessage = document.createElement('p');
    popupMessage.id = 'akunvip';
    var closeButton = document.createElement('button');
    closeButton.innerText = 'Tutup';
    closeButton.onclick = function () {
        popup.style.display = 'none';
        popupOverlay.style.display = 'none';
    }
        ;
    popup.appendChild(popupHeader);
    popup.appendChild(popupMessage);
    popup.appendChild(closeButton);
    document.body.appendChild(popupOverlay);
    document.body.appendChild(popup);
    popup.style.display = 'block';
    popupOverlay.style.display = 'block';
}
