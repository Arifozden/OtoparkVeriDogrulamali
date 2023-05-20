$(function (){
    tumArabalariGetir();
    birTasitGetir();
});

function tumArabalariGetir(){
    $.get("/arabalariGetir",function (arabalar){
        arabalariDuzenle(arabalar);
    });
}

function arabalariDuzenle(arabalar){
    let yaz="<select id='secilenMarka' onchange='modelleriBul()'>";
    let oncekiMarka="";
    yaz+="<option>Marka sec</option>";
    for(const araba of arabalar){
        if(araba.marka!=oncekiMarka){
            yaz+="<option>"+araba.marka+"</option>";
        }
        oncekiMarka=araba.marka;
    }
    yaz+="</select>";
    $("#marka").html(yaz);
}


function modelleriBul(){
    const seciliMarka=$("#secilenMarka").val();
    $.get("/arabalariGetir",function (arabalar){
        modelleriDuzenle(arabalar,seciliMarka);
    });
}

function modelleriDuzenle(arabalar,secilenMarka){
    let yaz="<select id='seciliModel'>";
    for(const araba of arabalar){
        if(araba.marka===secilenMarka){
            yaz+="<option>"+araba.model+"</option>";
        }
    }
    yaz+="</select>";
    $("#model").html(yaz);
}

function birTasitGetir(){
    const id=window.location.search.substring(1);
    const url="/birTasitGetir?id="+id;

    $.get(url,function (birTasit){
        $("#id").val(birTasit.id);
        $("#tc").val(birTasit.tc);
        $("#ad").val(birTasit.ad);
        $("#adres").val(birTasit.adres);
        $("#plaka").val(birTasit.plaka);
        $("#marka").val(birTasit.marka);
        $("#model").val(birTasit.model);
    });
}
function tasitDuzenle(){
    const tasit={  //javascript objesi olusturduk
        id:$("#id").val(),
        tc:$("#tc").val(),  //$ ile jquery kullaniyoruz
        ad:$("#ad").val(),
        adres:$("#adres").val(),
        plaka:$("#plaka").val(),
        marka:$("#secilenMarka").val(),
        model:$("#seciliModel").val(),
    };
    //olusturdugumuz objeyi post ile server a gonderiyoruz
    //hangi fonksiyona, neyi gonderdigimizi yaziyoruz
    //ve devaminda ne yapacagini soyluyoruz
    if(dogrulamaHatasiYoksa) {
        $.post("/duzenle", tasit, function () {
            hepsiniGetir();
        })
            .fail(function (jqXHR) {
                const json = $.parseJSON(jqXHR.responseText);
                $("#hata").html(json.message);
            });
        //degerleri aldiktan sonra felt lerin icini bosaltiyoruz

        window.location.href = "/";
    }
}