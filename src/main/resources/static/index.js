$(function (){
    hepsiniGetir();
});

//ilk fonksiyondan sonra icinde fonksiyon varsa onu yaziyoruz
function hepsiniGetir(){
    //serverdan get ile cagiriyoruz
    //fonksiyonun icinde arabalari getiriyoruz
    $.get("/hepsiniGetir",function (arabalar){
        //serverdan array geldi simdi onu duzenleme zamani
        //bir fonksiyon daha yaziyoruz icine array i aliyor
        bilgiDuzenle(arabalar);
    });
}
//server dan gelen array i html e yazdirma
function bilgiDuzenle(arabalar){
    let yaz="<table class='table table-striped'><tr><th>TC</th><th>Ad</th><th>Adres</th>"+
        "<th>Plaka</th><th>Marka</th><th>Model</th><th></th><th></th></tr>";
    for(const araba of arabalar){
        yaz+="<tr><td>"+araba.tc+"</td><td>"+araba.ad+"</td><td>"+araba.adres+"</td><td>"+araba.plaka+"</td><td>"+araba.marka+"</td><td>"+araba.model+"</td>" +
            "<td><button class='btn btn-primary' onclick='duzenlemekIcinId("+araba.id+")'>Duzenle</button> </td>" +
            "<td><button class='btn btn-danger' onclick='birTasitSil("+araba.tc+")'>Sil</button> </td></tr>";
    }
    yaz+="</table>";
    $("#arabalar").html(yaz);
}

function duzenlemekIcinId(id){
    window.location.href="/duzenle.html?"+id;
}
function birTasitSil(tc){
    const url="/birTasitSil?tc="+tc;
    $.get(url,function (){
        window.location.href="/";
    });
}
function hepsiniSil(){
    $.get("/hepsiniSil", function (){
        hepsiniGetir();
    })
}