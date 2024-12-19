$(function() {
    $('#bs-prod').on('keyup', function() {
        var dato = $('#bs-prod').val();
        var url = 'buscar_registro.php';
        $.ajax({
            type: 'POST',
            url: url,
            data: 'dato=' + dato,
            success: function(datos) {
                $('#agrega-registros').html(datos);
            }
        });
        return false;
    });
});

$(document).ready(function(){
    // Añade un evento de clic a cada botón
    $('.buttonCarac').on('click', function() {
        // Remueve la clase active-tab de todas las pestañas
        $('.tab').removeClass('active-tab');
        // Añade la clase active-tab a la pestaña correspondiente
        $('.tab').eq($(this).index()).addClass('active-tab');
    });
});

window.addEventListener("resize", redimencion_de_pantalla_animacion);
window.addEventListener("load", redimencion_de_pantalla_animacion);
    function redimencion_de_pantalla_animacion(){
        if(window.innerWidth<=700){
            /*
            si la pagina es menor a 700 pixeles la accion sera de click ya que sera para telefonos, tablet, ipat etc
*/
            $("#boton_redes_sociales").click(function () { 
                
                if($(".redes_sociales").hasClass("redes_sociales_inactivas")){
                    redes_activadas();
                }else{
                    redes_inactivas();
                }
            });
        }else{
            /* en este caso sin la pagina es mayor a 700 px para usuarios como con computadoras, laptops etc tendran este enevnto de over, cuando le cursor se aproxime al elemento .back-to-top  */
            $("#back-to-top-item2").hover(function () {
                // over
                redes_activadas();

            }, function () {
                // out
                redes_inactivas();
            }   );
        }   
    }
    function redes_activadas(){
        /*
            traemos a #boton_redes_sociales para darle un evento de click con una funcion, primero verifica que si la clase  redes_sociales_inactivas existe en las clase .resdes_sociales entonces removera iconos y dara animaciones de css, por otro lado si la clase redes_sociales_inactivas no existe agra lo contrario al codigo principal que dio true 
    */
        $(".redes_sociales").removeClass("redes_sociales_inactivas");
        $(".redes_sociales").addClass("redes_sociales_activas");
        $(".redes_sociales").css("display", "flex");
        $("#boton_redes_sociales i").removeClass("bi-chat-square-dots");
        $("#boton_redes_sociales i").addClass("bi-x");
$("#boton_redes_sociales i").addClass("rotateIn");
$("#boton_redes_sociales i").removeClass("rotateOut");

$("#mensaje_platiquemos").css("display", "none");
                
$(".red_mensaje").css("display", "block");
    }
    function redes_inactivas(){
        $(".redes_sociales").addClass("redes_sociales_inactivas");
        $(".redes_sociales").removeClass("redes_sociales_activas");
        $("#boton_redes_sociales i").addClass("bi-chat-square-dots");
        $("#boton_redes_sociales i").removeClass("bi-x");
$("#boton_redes_sociales i").removeClass("rotateIn");
$("#boton_redes_sociales  i").addClass("rotateOut");

$("#mensaje_platiquemos").css("display", "flex");
                
$(".red_mensaje").css("display", "none");
        setTimeout(() => {
            $(".redes_sociales").css("display", "none");
            /* espera 400 milicegundos para hacer que los elementos con clase .redes_sociales desaparescan */
        }, 400);
    }