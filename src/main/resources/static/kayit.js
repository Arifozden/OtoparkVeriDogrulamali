$(function () {
    tumArabalariGetir();
    hepsiniGetir();
});

function tumArabalariGetir() {
    $.get("/arabalariGetir", function (arabalar) {
        arabalariDuzenle(arabalar);
    });
}

function arabalariDuzenle(arabalar) {
    let yaz = "<select id='secilenMarka' onchange='modelleriBul()'>";
    let oncekiMarka = "";
    yaz += "<option>Marka sec</option>";
    for (const araba of arabalar) {
        if (araba.marka != oncekiMarka) {
            yaz += "<option>" + araba.marka + "</option>";
        }
        oncekiMarka = araba.marka;
    }
    yaz += "</select>";
    $("#marka").html(yaz);
}


function modelleriBul() {
    const seciliMarka = $("#secilenMarka").val();
    $("#failMarka").html();
    $.get("/arabalariGetir", function (arabalar) {
        modelleriDuzenle(arabalar, seciliMarka);
    })
        .fail(function (jqXHR){
            const json=$.parseJSON(jqXHR.responseText);
            $("#hata").html(json.message);
        });
}

function modelleriDuzenle(arabalar, secilenMarka) {
    let yaz = "<select id='seciliModel'>";
    for (const araba of arabalar) {
        if (araba.marka === secilenMarka) {
            yaz += "<option>" + araba.model + "</option>";
        }
    }
    yaz += "</select>";
    $("#model").html(yaz);
}

function tasitKayit() {
    const tasit = {  //javascript objesi olusturduk
        tc: $("#tc").val(),  //$ ile jquery kullaniyoruz
        ad: $("#ad").val(),
        adres: $("#adres").val(),
        plaka: $("#plaka").val(),
        marka: $("#secilenMarka").val(),
        model: $("#seciliModel").val(),
    }
    //olusturdugumuz objeyi post ile server a gonderiyoruz
    //hangi fonksiyona, neyi gonderdigimizi yaziyoruz
    //ve devaminda ne yapacagini soyluyoruz
    if (dogrulamaHatasiYoksa()) {
        $.post("/kaydet", tasit, function () {
            hepsiniGetir();
        });
        window.location.href = "/";
    }
}