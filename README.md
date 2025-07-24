# Enviador de Emails

Este proyecto envia correos, desarrollado con **Vite**, **JavaScript Vanilla**, **TailwindCSS** para los estilos, y **EmailJS** para el envío del correo electrónico. También utiliza **SweetAlert2** para mostrar alertas de éxito y un spinner durante el envío.

## 🎯 Funcionalidad

- Validación de campos del formulario.
- Envío de email usando [EmailJS](https://www.emailjs.com/).
- Spinner de carga mientras se envía el mensaje.
- Alerta de éxito con SweetAlert2 tras el envío correcto.

## 📂 Estructura del Proyecto

```
simulador-emails/
├── node_modules/
├── public/
├── src/
│   ├── app.js          # Lógica principal del formulario y envío del email
│   ├── style.css       # Estilos con Tailwind
├── .env                # Archivo para tus variables de entorno (EmailJS public key opcional)
├── index.html
├── package.json
├── vite.config.ts
```

## 🚀 Instalación

1. **Clona el repositorio:**

```bash
git clone https://github.com/carluis-berrocal/envio-emails.git
cd envio-emails
```

2. **Instala las dependencias:**

```bash
npm install
```

3. **Configura tus credenciales de EmailJS:**

Crea una cuenta en [https://www.emailjs.com/](https://www.emailjs.com/) y obtén los siguientes valores:

- Service ID
- Template ID
- Public Key

Edita el archivo `src/app.js` y reemplaza tus credenciales:

```js
emailjs.sendForm(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  formElement,
  'YOUR_PUBLIC_KEY'
)
```

> ⚠️ **Importante:** El proyecto incluye **mi clave pública**, pero **no debes usarla**. Si lo haces, **los correos llegarán a mi cuenta**. Asegúrate de usar tus propias credenciales de EmailJS.

4. **Ejecuta el servidor local:**

```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173`.

## 🛠️ Tecnologías usadas

- [Vite](https://vitejs.dev/) - Bundler rápido para frontend
- [TailwindCSS](https://tailwindcss.com/) - Framework de estilos
- [EmailJS](https://www.emailjs.com/) - Servicio para enviar correos desde el frontend
- [SweetAlert2](https://sweetalert2.github.io/) - Alertas elegantes

## 🧪 Validaciones

El formulario valida todos los campos requeridos antes de enviar. Si falta alguno, el email **no se envía**.

---

Desarrollado por Carluis Berrocal 🚀

visita mi sitio web: [carluisberrocal.netlify.app](https://carluisberrocal.netlify.app)
## 📧 Envío de Correos
visita: [envio-emails-dev.netlify.app](https://envio-emails-dev.netlify.app)
## 📄 Licencia
Licencia MIT © 2025