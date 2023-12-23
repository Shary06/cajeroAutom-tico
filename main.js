
/* variables */ 

const divFormulario = document.querySelector('.formulario');
const divCajero = document.querySelector('.cajero');
const formulario = document.getElementById('formulario');
const mensajeError = document.getElementById('mensaje-error');
const cajeroUsuario = document.getElementById('cajero-usuario');

/* botones */ 

const btnConsultar = document.getElementById('btn-consultar');
const btnIngresar = document.getElementById('btn-ingresar');
const btnRetirar = document.getElementById('btn-retirar');
const btnContinuar = document.getElementById('panel-btn')

const panelInput = document.getElementById('panel-input');
const panelInfo = document.getElementById('panel-informacion');
const panelFinal = document.getElementById('finalizar-btn');

let datosUsuario;
let logueado = false;
let opcion = '';

const cuentas = [
    { usuario: 'cr90', password: 'password', nombre: 'Cristian', saldo: 900 },
    { usuario: 'sh32', password: 'usuario', nombre: 'Sirley', saldo: 740 },
    { usuario: 'js21', password: '123uva', nombre: 'Jesus', saldo: 100 },
];

const login = (usuario, password) => {
    return cuentas.filter((item) => item.usuario === usuario && item.password === password);
};


formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuario = e.target[0].value;
    const password = e.target[1].value

    datosUsuario = login(usuario, password);

    if(datosUsuario.length === 0) {

        mensajeError.textContent = 'Usuario o contraseña incorrectos';
        document.querySelector('.form-msj').style.display = 'block';
        return;
    }
    logueado = true;
    mensajeError.style.visibility = 'hidden';

    cajeroUsuario.textContent = datosUsuario[0].nombre;
    divFormulario.style.display = 'none';
    divCajero.style.display = 'block';

});

btnConsultar.addEventListener('click', () => {
    opcion = 'consultar';
    document.querySelector('.saldo-usuario').textContent = `su saldo es: ${datosUsuario[0].saldo}`;
    document.querySelector('.cajero-saldo').style.display = 'block';
    document.querySelector('.panel').style.display = 'none';
    ocultarDiv()
});

btnIngresar.addEventListener('click', () => {
    opcion = 'ingresar';
    cajero()
});

btnRetirar.addEventListener('click', () => {
    opcion = 'retirar';
    cajero()
});

const cajero = () => {
    document.querySelector('.panel').style.display = 'block';
    document.querySelector('.saldo-usuario').style.display = 'none'; 
    document.getElementById('panel-label').textContent = `Monto a ${opcion}`;
    
};

btnContinuar.addEventListener('click', () => {
    if (panelInput.value === '') {
        panelInfo.textContent = 'Es necesario ingresar un valor';
        mensajeCajero('error');
        return;
    }

    if (parseInt(panelInput.value) <= 0){
        panelInfo.textContent = 'No se permiten números negativos o iguales a 0';
        mensajeCajero('error');

        return;
    }

    switch(opcion) {
        case "ingresar":
            if (datosUsuario[0].saldo + parseInt(panelInput.value) > 990){
                panelInfo.textContent =`La operación no es posible, su saldo no puede ser superior a $990. Saldo actual: ${datosUsuario[0].saldo}`
                mensajeCajero('error');
            } else {
                const saldoAnterior = datosUsuario[0].saldo;
                datosUsuario[0].saldo += parseInt(panelInput.value);
                const saldoActual = datosUsuario[0].saldo;
                panelInfo.textContent = `Saldo anterior:${saldoAnterior} Saldo actual:${saldoActual}`
                mensajeCajero('success');
            }
            break
        case "retirar":
            if (datosUsuario[0].saldo + parseInt(panelInput.value) < 10){
                panelInfo.textContent = `La operación no es posible, su saldo no puede ser inferior a $10. Saldo actual: ${datosUsuario[0].saldo}`
                mensajeCajero('error');
            } else {
                const saldoAnterior = datosUsuario[0].saldo;
                datosUsuario[0].saldo -= parseInt(panelInput.value);
                const saldoActual = datosUsuario[0].saldo;
                panelInfo.textContent = `Saldo anterior:${saldoAnterior} Saldo actual:${saldoActual}` 
                mensajeCajero('success');
            }
            break;
    }
});

const mensajeCajero = (tipo) => {
    panelInfo.style.visibility = 'visible';
    switch(tipo) {
        case "success":
            panelInfo.classList.add('mensaje-success');
            panelInfo.classList.remove('mensaje-error');
            break;
        case "error":
            panelInfo.classList.add('mensaje-error');
            panelInfo.classList.remove('mensaje-success');
            break;
    }

    setTimeout(() => { panelInfo.style.visibility = 'hidden'; }, 5000);
};

const ocultarDiv = () => {
    setTimeout(() => { document.querySelector('.cajero-saldo').style.display = 'none'; }, 3000);
};

panelFinal.addEventListener('click', () => {
    window.location.reload();
});