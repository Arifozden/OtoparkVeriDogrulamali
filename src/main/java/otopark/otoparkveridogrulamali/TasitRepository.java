package otopark.otoparkveridogrulamali;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TasitRepository {
    @Autowired
    private JdbcTemplate db;
    private Logger logger= LoggerFactory.getLogger(TasitRepository.class);

    public boolean tasitKayit(Tasit tasit){
        String sql="INSERT INTO Tasit(tc,ad,adres,plaka,marka,model) VALUES (?,?,?,?,?,?)";
        db.update(sql,tasit.getTc(),tasit.getAd(),tasit.getAdres(),tasit.getPlaka(),tasit.getMarka(),tasit.getModel());
        return false;
    }

    public List<Tasit> tumTasitlariGetir(){
        String sql="SELECT * FROM Tasit";
        return db.query(sql, new BeanPropertyRowMapper(Tasit.class));
    }

    public Tasit birTasitGetir(int id){
        String sql="SELECT * FROM Tasit WHERE id=?";
        List<Tasit> birTasit=db.query(sql, new BeanPropertyRowMapper(Tasit.class),id);
        return birTasit.get(0);
    }

    public boolean tasitDuzenle(Tasit tasit){
        String sql="UPDATE Tasit SET tc=?, ad=?, adres=?, plaka=?, marka=?, model=? WHERE id=?";
        db.update(sql, tasit.getTc(),tasit.getAd(),tasit.getAdres(),tasit.getPlaka(),tasit.getMarka(),tasit.getModel(), tasit.getId());
        return false;
    }
    //tablodaki satirlardan birini silmek icin kod. fonksiyon icine PK ne ise onu alir
    //db.update fonksiyonu da bu PK kullanir
    public void birTasitSil(String tc){
        String sql="DELETE FROM Tasit WHERE tc=?";
        db.update(sql,tc);
    }
    public void tumTasitlariSil(){
        String sql="DELETE FROM Tasit";
        db.update(sql);
    }

    public List<Araba>tumArabalariGetir(){
        String sql="SELECT * FROM Araba";
        return db.query(sql, new BeanPropertyRowMapper(Araba.class));
    }
}

