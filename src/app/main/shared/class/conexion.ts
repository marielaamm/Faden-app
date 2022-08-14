export class Conexion {

    private IP : string = "localhost";
    private PORT : String =  "44367";
    public TimeVerif: number = 600;
    public TimeClose: number = 30;
    
    Url() : string{
        return "https://"+this.IP+":"+this.PORT+"/api/"; 
    }


    /*private IP : string = "192.168.0.118";
    private PORT : String =  "130";

    public TimeVerif: number = 600;
    public TimeClose: number = 30;


    public Url() : string{
        return "http://"+this.IP+":"+this.PORT+"/api/"; 
    }*/


}
