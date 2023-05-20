package otopark.otoparkveridogrulamali;

public class Araba {
    private String marka;
    private String model;

    public Araba(String marka, String model) {
        this.marka = marka;
        this.model = model;
    }

    public Araba(){}

    public String getMarka() {
        return marka;
    }

    public void setMarka(String marka) {
        this.marka = marka;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}
