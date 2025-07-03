var manualDeUso = document.getElementById("manualUso_Cont");
var botonManual = document.getElementById("manualUso_Buttom");
var closeBotonManual = document.getElementById("close_Button_Manual");
var floating=document.getElementById("container-floating");
const OcultarBotResp = document.getElementById("btn_enviar");
var Contenedor_BotonOCR = document.getElementById("container-floating");
var BotonOCR = document.getElementById("floating-button");


botonManual.addEventListener("click", abrir_Manual);

function abrir_Manual(){
    if(manualDeUso.style.display == "none" || manualDeUso.style.display == ""){
        setTimeout(() => {
            botonManual.addEventListener("click", abrir_Manual);
        }, 500);
        botonManual.removeEventListener("click", abrir_Manual);
        manualDeUso.style.animation = "Expand_Manual 0.5s ease";
        manualDeUso.style.display = "block";
        floating.style.display="none";
        document.documentElement.style.overflow = "hidden";
    }
     else{
        setTimeout(() => {
            botonManual.addEventListener("click", abrir_Manual);
            manualDeUso.style.display = "none";
        }, 500);
        botonManual.removeEventListener("click", abrir_Manual);
        manualDeUso.style.animation = "Close_Manual 0.5s ease forwards";
        floating.style.display="block";
        document.documentElement.style.overflowY = "scroll";
    }
    
}



closeBotonManual.addEventListener("click", function () {
    setTimeout(() => {
        botonManual.addEventListener("click", abrir_Manual);
        manualDeUso.style.display = "none";
    }, 500);
    botonManual.removeEventListener("click", abrir_Manual);
    manualDeUso.style.animation = "Close_Manual 0.5s ease";
    floating.style.display="block";
    document.documentElement.style.overflowY = "scroll";

});

//Opciones de OBserveBTN
const options1 = {
    //porcentaje de visibilidad del objeto antes se ser reconocido
    threshold: 0.5,
};

//Accion ejecutada al ser reconocido
const callback1 = (entries1) => {
    //Entradas del reconocimento
    entries1.forEach(entry => { 
    
        if (entry.isIntersecting){

            BotonOCR.style.transform = "translateX(200px)";
            BotonOCR.style.transition = "0.8s ease";
            botonManual.style.transform = "translateX(-200px)";
            Contenedor_BotonOCR.style.width = "0px";
            
          
        }else{
            BotonOCR.style.transform = "translateX(0px)";
            botonManual.style.transform = "translateX(0px)";
            Contenedor_BotonOCR.style.width = "200px";
            
           
        }

    });

};

//Creacion del intersection Observer
const ObserveBTN = new IntersectionObserver(callback1, options1);

//La funcion solo se activara si la pantalla tiene el ancho marcado al momento de entrar a la pagina o recargarla
if(window.innerWidth < 840){
    //Funcion Activada
        ObserveBTN.observe(OcultarBotResp);
        
} else {
    //Funcion Desactivada
        ObserveBTN.disconnect();
        
}

// function ReconocimientoSizeBTN(){
// };

// window.addEventListener('resize', ReconocimientoSizeBTN);



 

