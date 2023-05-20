package otopark.otoparkveridogrulamali;

import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Locale;



@RestController
public class TasitController {
    //once array olusturuyoruz
   // public final List<Tasit> tasitKayit=new ArrayList<>();
    //public final List<Araba> arabaKayit=new ArrayList<>();
    //database kayit olacagi icin bu arraylistleri kaldiriyoruz
    //database icin gerekli kodlari yaziyoruz

    @Autowired
    private TasitRepository rep;
    private Logger logger= LoggerFactory.getLogger(TasitController.class);

   /* public TasitController(){   //bu constructor ile acilir tablolar icin olusturdugumuz degerleri siliyoruz
         Araba araba1=new Araba("Volvo","V30");
         arabaKayit.add(araba1);
         Araba araba2=new Araba("Volvo","V70");
         arabaKayit.add(araba2);
         Araba araba3=new Araba("Audi","A8");
         arabaKayit.add(araba3);
         Araba araba4=new Araba("Audi","Q7");
         arabaKayit.add(araba4);
         Araba araba5=new Araba("Toyota","Yaris");
         arabaKayit.add(araba5);
         Araba araba6=new Araba("Toyota","Auris");
         arabaKayit.add(araba6);
    }*/

    @GetMapping("/arabalariGetir")
    public List<Araba>arabalariGetir(){
       // return arabaKayit; array sildigimiz icin fonk arrayi degil sql den gelen degerleeri dondurecek asagidaki fonk araciligi ile
        return rep.tumArabalariGetir();
    }

    //Java script icine access point leri olusturuyoruz

    //kayit fonksiyonu ile arraylist icine girilen degerlerle bir araba kaydediyoruz
@PostMapping("/kaydet")
    public void kaydet(Tasit tasit, HttpServletResponse response) throws IOException {
        if(tasitDogrulaOK(tasit)){

        if(!rep.tasitKayit(tasit)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Veritabaninda hata, sonra tekrar deneyin");
        }}else {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Dogrulama hatasi - sonra tekrar deneyin ");
        }
        //tasitKayit.add(araba); array i sildik yukarida. asagidaki fonk ile sql den alacagiz
    //rep.tasitKayit(araba);
    }

    //kayittan sonra hepsinigetir fonksiyonu ile array i donduruyoruz
@GetMapping("/hepsiniGetir")
    public List<Tasit>hepsiniGetir(){
    //return tasitKayit;   arrayi sildik
    return rep.tumTasitlariGetir();
    }


    @GetMapping("/birTasitGetir")
    public Tasit birTasitGetir(int id){
        return rep.birTasitGetir(id);
    }
    @PostMapping("/duzenle")
    public void duzenle(Tasit tasit, HttpServletResponse response)throws IOException{
        if (tasitDogrulaOK(tasit)) {
            if(!rep.tasitDuzenle(tasit)){
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Veritabaninda hata, sonra tekrar deneyin");
            }}else {response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Dogrulama hatasi, sonra tekrar deneyin");


       // rep.tasitDuzenle(tasit);

        }
    }
    @GetMapping("/birTasitSil")
    public void birTasitSil(String tc){
        rep.birTasitSil(tc);
    }
    //son olarak array i temizleme fonksiyonu ile array i temizleyip, donduruyoruz.
@GetMapping("/hepsiniSil")
    public void hepsiniSil(){
    //tasitKayit.clear();
    rep.tumTasitlariSil();
    }
    private boolean tasitDogrulaOK(Tasit tasit){
        String regexTc="/^[0-9]{11}$/";
        String regexAd="/^[a-zA-ZøæåØÆÅ. \\-]{2,50}$/";
        String regexAdres="/^[a-zA-ZøæåØÆÅ. \\-]{2,50}$/";
        String regexPlaka="/^[0-9][0-9][A-Z]{2,3}[0-9]{2,4}$/";
        String regexMarka="/^[a-zA-ZøæåØÆÅ. \\-]{2,50}$/";

        boolean tcOK=tasit.getTc().matches(regexTc);
        boolean adOK=tasit.getAd().matches(regexAd);
        boolean adresOK=tasit.getAdres().matches(regexAdres);
        boolean plakaOK=tasit.getPlaka().matches(regexPlaka);
        boolean markaOK=tasit.getMarka().matches(regexMarka);

        if(tcOK&&adOK&&adresOK&&plakaOK&&markaOK){
            return true;
        }
        logger.error("dogrulama hatasi");
        return false;

    }
}

