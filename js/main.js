//creamos la clase para instanciarla con los datos que ingresa el usuario
class Paquete {
    constructor(mayores, menores, habitaciones, noches) {
        this.mayores = mayores;
        this.menores = menores;
        this.habitaciones = habitaciones;
        this.noches = noches;
    }

    //metodo para calcular el monto total
    calcularTotal(destino) {
        const totalPrecioAdultos = this.mayores * destino.precioPorAdulto;
        const totalPrecioMenores = this.menores * destino.precioPorMenor;
        const totalPrecioHabitaciones = this.habitaciones * destino.precioHabitacion;

        const total = (totalPrecioAdultos + totalPrecioMenores + totalPrecioHabitaciones) * this.noches;
        return total;
    }
}

/**
 * Validamos que el dato ingresado es un numero mayor a 0
 * validacion llama a otra funcion por parametro que valida que el valor ingresado es mayor a cero, devolviendo true o false dependiendo si se cumple o no
 */
function validador(valor , validacion) {
    let datoSolicitado = parseInt(prompt("Seleccione la cantidad de " + valor));
    do {
        if(validacion(datoSolicitado)) {
            return datoSolicitado;
        }else {
            datoSolicitado = parseInt(prompt("La cantidad de " + valor + " no puede ser vacio o cero, indique nuevamente la cantidad."));
        }
    }while (true);
}

//validamos que no se pase de 2 personas por habitacion
function pedirHabitaciones(valor , validacion) {
    let habitaciones = parseInt(prompt("Seleccione la cantidad de habitaciones"));
    do {
        const totalPersonas = cantAdultos + cantMenores;
        if (!validacion(habitaciones)) {
            habitaciones = parseInt(prompt("La cantidad de " + valor + " no puede ser vacio o cero, indique nuevamente la cantidad."));
        } else if(totalPersonas / habitaciones > 2) {
            habitaciones = parseInt(prompt("No pueden haber mas de dos personas por cada habitacion, por favor ingrese una cantidad valida"));
        } else {
            return habitaciones;
        }
        
    } while (true);
}

//paquetes disponibles como una base de datos
const destinos = [
    {
        destino: "Montevideo",
        precioPorAdulto: 890,
        precioPorMenor: 500,
        precioHabitacion: 1200
    },
    {
        destino: "Buenos Aires",
        precioPorAdulto: 1500,
        precioPorMenor: 1050,
        precioHabitacion: 1800
    },
    {
        destino: "Acapulco",
        precioPorAdulto: 2500,
        precioPorMenor: 1980,
        precioHabitacion: 3000
    },
    {
        destino: "Cancún",
        precioPorAdulto: 2800,
        precioPorMenor: 2200,
        precioHabitacion: 3500
    },
    {
        destino: "Barcelona",
        precioPorAdulto: 3200,
        precioPorMenor: 2700,
        precioHabitacion: 4000
    },
    {
        destino: "Nueva York",
        precioPorAdulto: 3500,
        precioPorMenor: 3000,
        precioHabitacion: 4500
    }
];

alert("Bienvenidos a nuestra agencia de viajes! tenemos miles de paquetes al mejor precio del mercado para ofrecerte, a continuacion te solicitaremos algunos datos para mostrarte los paquetes que mejor se ajustan a tu presupuesto");


//funcion para validar que se ingrese un valor mayor a 0
function esValido (numero) {
    return numero > 0;
}
//guardamos los datos del usuario en las varibles
const cantAdultos = validador("adultos",esValido);
const cantMenores = validador("menores",esValido);
const cantHabitaciones = pedirHabitaciones("habitaciones" , esValido);
const cantNoches = validador("noches",esValido);
const montoMaximo = parseInt(prompt("Cual es su capital disponible en dolares para viajar?"));

//instanciamos la clase con la data que ingresa el usuario
const paquete = new Paquete(cantAdultos, cantMenores, cantHabitaciones, cantNoches);

//recorro los destinos para calcular el monto total y almacenarlo como atributo de cada objeto nuevo
const resultado = destinos.map(destino => {
    destino.total = paquete.calcularTotal(destino);
    return destino;
})

//filtramos los viajes posibles segun capital del cliente
const viajesPosibles = resultado.filter(dest => dest.total < montoMaximo);

//armado de detalle
let mensaje = "A continuacion le detallamos los increibles destinos que pueden visitar: \n\n";
if (viajesPosibles.length > 0) {
    for (const viaje of viajesPosibles) {
        mensaje += "Destino: " + viaje.destino + "\n" + "Cantidad de adultos: " + cantAdultos + "\n" + "Cantidad de menores: " + cantMenores + "\n" + "Cantidad de habitaciones: " + cantHabitaciones + "\n" + "Noches: " + cantNoches + "\n" + "Monto total: USD " + viaje.total + " imp inc." + "\n\n";
    }
} else {
    mensaje = "Ninguno de nuestros paquetes se ajustan a su presupuesto, lo sentimos \u{1F61E}";
}

console.log(mensaje);