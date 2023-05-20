function tcDogrula(){
    const tc=$("#tc").val();
    const regexp=/^[0-9]{11}$/;
    const ok=regexp.test(tc);

    if(!ok){
        $("#failTc").html("TC, 11 hane olmali");
        return false;
    }else {
        $("#failTc").html("");
        return true;
    }
}

function adDogrula(){
    const ad=$("#ad").val();
    const regexp=/^[a-zA-ZøæåØÆÅ. \-]{2,50}$/;
    const ok=regexp.test(ad);

    if(!ok){
        $("#failAd").html("Ad, en az 2 en cok 50 harf olmali");
        return false;
    }else {
        $("#failAd").html("");
        return true;
    }
}
function adresDogrula(){
    const adres=$("#adres").val();
    const regexp=/^[a-zA-ZøæåØÆÅ. \-]{2,50}$/;
    const ok=regexp.test(adres);

    if(!ok){
        $("#failAdres").html("Adres, en az 2 en cok 50 harf olmali");
        return false;
    }else {
        $("#failAdres").html("");
        return true;
    }
}
function plakaDogrula(){
    const plaka=$("#plaka").val();
    const regexp=/^[0-9][0-9][A-Z]{2,3}[0-9]{2,4}$/;
    const ok=regexp.test(plaka);

    if(!ok){
        $("#failPlaka").html("Plaka, en az 7 en cok 9 harf olmali");
        return false;
    }else {
        $("#failPlaka").html("");
        return true;
    }
}

function markaDogrula(){
    const marka=$("#seciliMarka").val();
    if(merke==="Marka sec"){
        $("#failMarka").html("Marka seciniz");
        return false;
    }else {
        $("#failMarka").html("");
        return true;
    }
}
function dogrulamaHatasiYoksa(){
    return(tcDogrula()&&adDogrula()&&adresDogrula()&&plakaDogrula()&&markaDogrula()&&modelDogrula());
}