import './style.css'
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';


document.addEventListener('DOMContentLoaded', () => {
   
    //selecionar los elemntos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const inputNombre = document.querySelector('#nombre');
    const inputCelular = document.querySelector('#celular');
    const formulario = document.querySelector('#formulario');
    const btnEnviar = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');

    //crear un objeto para almacenar los datos del formulario
    const email = {email: '', asunto: '', mensaje: '', nombre: '', celular: ''};

    //asiganar eventos a los inputs button reset y enviar
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputNombre.addEventListener('input', validar);
    inputCelular.addEventListener('input', validar);

    btnReset.addEventListener('click', resetearFormulario);
    formulario.addEventListener('submit', enviarEmail);

    //funciones del programa
    function validar(e){
        if(e.target.value.trim() === ""){
            mostarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        if(e.target.type === 'email' && !validarEmail(e.target.value)){
            mostarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        if(e.target.type === 'text' && e.target.name === 'celular' && isNaN(e.target.value)){
            mostarAlerta('El celular debe ser un número', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.type === 'text' && e.target.name === 'celular' && e.target.value.length < 10){
            mostarAlerta('El celular debe tener al menos 10 dígitos', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        if(e.target.type === 'text' && e.target.name === 'celular' && e.target.value.length > 10){
            mostarAlerta('El celular no debe tener más de 10 dígitos', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        //si el campo es valido, limpiar la alerta previa si existe
        limpiarAlerta(e.target.parentElement);
           
        //asignar el valor al objeto email
        email[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail();

    }

    /* mostrar alerta de error removiendo la alerta previa si existe */
    function mostarAlerta(mensaje, referencia) {
        //remover la alerta previa si existe
        limpiarAlerta(referencia);
        const error = document.createElement('P');
    
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        //agregar el mensaje de error al DOM despues de la referencia que es el padre del input
        referencia.appendChild(error);

    }

    //limpiar alerta previa si existe
    function limpiarAlerta(referencia) {
        const alertaPrevia = referencia.querySelector('.bg-red-600');
        if (alertaPrevia) {
            alertaPrevia.remove();
        }
    }

    //validar email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    //validar el formulario al enviar
    function comprobarEmail() {
        //verificar que todos los campos del objeto email tengan un valor
        if (Object.values(email).includes('')) {
            btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
            btnEnviar.style.cursor = 'not-allowed';
            btnEnviar.disabled = true;
            return;
        }
        //si todos los campos son validos, habilitar el boton de enviar
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
        btnEnviar.style.cursor = 'pointer';
        btnEnviar.disabled = false;
    }


    //Funcion para confirmar el reset del formulario
    function resetearFormulario(e) {
        //prevenir el comportamiento por defecto del boton reset
        e.preventDefault();
        //verificar si el formulario tiene datos
        if (email.email === '' && email.asunto === '' && email.mensaje === '' && email.nombre === '' && email.celular === '') {
            Swal.fire({
                title: '¡Formulario vacío!',
                text: "No hay datos para limpiar.",
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        //si el formulario tiene datos, mostrar alerta de confirmacion
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Los campos se limpiarán!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, limpiar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                //si el usuario confirma, limpiar los campos del formulario
                //limpiar el objeto email
                defaultForm();
                
                Swal.fire(
                    '¡Limpiado!',
                    'Los campos han sido limpiados.',
                    'success'
                );
            }
        });
    }


    //funcion para resetear el formulario
    function defaultForm() {
        formulario.reset();
        limpiarAlerta(formulario);
        //limpiar el objeto email
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        email.nombre = '';
        email.celular = '';
        comprobarEmail();
    }

    // Enviar correo
    const encodedKey = import.meta.env.VITE_EMAILJS_USER_ID;
    emailjs.init(atob(encodedKey)); // Inicializar EmailJS con la clave decodificada
    function enviarEmail(e) {
        e.preventDefault();
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
        btnEnviar.style.cursor = 'not-allowed';
        btnEnviar.disabled = true;
       
        //mostrar el spinner
        spinner.classList.remove('hidden');
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID; // ID del servicio
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; // ID de la plantilla

        // Enviar el formulario usando EmailJS
        emailjs
            .sendForm(serviceID, templateID, this)
            .then(() => {
                //resetear el formulario
                defaultForm();

                //ocultar el spinner
                spinner.classList.add('hidden');

                Swal.fire({
                    title: "¡Correo Enviado!",
                    html: "El correo se envió correctamente.<br>Gracias por escribirnos,<br>nos pondremos en contacto a la brevedad.",
                    icon: "success",
                });
                //crear alerta de exito
                const alertaExito = document.createElement('P');
                alertaExito.textContent = 'Email enviado correctamente';
                alertaExito.classList.add('bg-green-600', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'font-bold');

                //mostrar alerta de exito encima del formulario
                formulario.insertBefore(alertaExito, formulario.firstChild);
                //remover la alerta de exito despues de 3 segundos
                setTimeout(() => {
                    alertaExito.remove();
                }, 3000);
            })
            .catch((err) => {
                //ocultar el spinner
                spinner.classList.add('hidden');
                btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
                btnEnviar.style.cursor = 'pointer';
                btnEnviar.disabled = false;

                // Mostrar mensaje de error usando SweetAlert2
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error al enviar el correo: " + err.text,
                    icon: "error",
                });
            });

        //simular envio de email
        // setTimeout(() => {
        //     //resetear el formulario
        //     defaultForm();

        //     //ocultar el spinner
        //     spinner.classList.add('hidden');

        //     //mostrar alerta de exito con SweetAlert2
        //     Swal.fire(
        //         '¡Enviado!',
        //         'Email enviado correctamente.',
        //         'success'
        //     );

        //     //crear alerta de exito
        //     const alertaExito = document.createElement('P');
        //     alertaExito.textContent = 'Email enviado correctamente';
        //     alertaExito.classList.add('bg-green-600', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'font-bold');

        //     //mostrar alerta de exito encima del formulario
        //     formulario.insertBefore(alertaExito, formulario.firstChild);
        //     //remover la alerta de exito despues de 3 segundos
        //     setTimeout(() => {
        //         alertaExito.remove();
        //     }, 3000);
            

        // }, 3000);
       
    }
    
    //TODO:agregar proyecto a GitHub terminar reto de la semana

});   