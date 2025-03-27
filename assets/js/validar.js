function validar (){
	var nombre, apellidos,correo, expresion;
	nombre =document.getElementById('nombre').value;
	apellidos =document.getElementById('apellidos').value;
    correo =document.getElementById('correo').value;
    expresion= /\w+@\w+\.+[a-z]/;
    if (nombre==="",apellidos==="", correo==="") {
    	alert("Favor de llenar todos los campos");
    	return false;
} else if (nombre.length>50){
    	alert("El nombre es muy largo ");
    	return false;
}else if (!expresion.test(correo)) {
	alert("El correo no es valido");
	return false;
}
else if (rfc.length>13)
alert("El Rfc no es correcto");
    	return false;
}
