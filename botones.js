let m, b;
let arrVarX = [];
let arrVarY = [];


//Esta funcion añade los inputs de las muestras
export const añadirMuestra = () => {
    const tablaMuestras = document.querySelector(".tablaMuestras");
    const muestraX = document.createElement("input");
    const muestraY = document.createElement("input");

    muestraX.id = "x";
    muestraY.id = "y";
    muestraX.placeholder = "x";
    muestraY.placeholder = "y";
    muestraX.classList.add("inputxy");
    muestraY.classList.add("inputxy");

    tablaMuestras.appendChild(muestraX);
    tablaMuestras.appendChild(muestraY);
}

//Esta funcion genera el modelo matematico (obtiene los valores de b y m)
export const generarModelo = () => {
    //Se obtiene un array con todos los inputs tanto los que corresponden al valor x, xomo al valor y 
    const tablaMuestras = document.querySelector(".tablaMuestras");
    const muestras = [...tablaMuestras.children]

    //Validaciones antes de generar el modelo matematico 
    //Al menos debe de haber 2 muestras
    //Importante tener en cuenta que una muestra es un par de inputs
    if(muestras.length === 0){
        console.log("Oye no has puesto ninguna muestra");
    } else if(muestras.length === 2){
        console.log("Oye se necesitan al menos dos muestras");
    } else {
        //Una vez que se hayan pasado las validaciones 
        arrVarX = [];
        arrVarY = [];

        //Se leen los datos de los inputs muestra 
        leerMuestra(muestras, arrVarX, arrVarY);

        //Validacion de si todos los datos son numeros
        if(validarMuestras(arrVarX) && validarMuestras(arrVarY)){

            //Se genera el modelo matematico
            calculoMinimosCuadrados(arrVarX, arrVarY);
            
            //Se muestra el modelo matematico en pantalla
            const divModeloMat = document.querySelector(".modeloMat");
            if(b >= 0){
                divModeloMat.innerHTML = ` Modelo matematico: y = ${m}x + ${Math.abs(b)}`
            } else {
                divModeloMat.innerHTML = `Modelo matematico: y = ${m}x - ${Math.abs(b)}`
            }

        } else {
            console.log("Asegurate de que todos los campos esten llenos o que todos los campos sean numeros");
        }
    }

    
}
//Se recorre todo el array de inputs dependiendo su su id ("x" o "y") se agregara al arrreglo de variables x o y 
const leerMuestra = (muestras, arrVarX, arrVarY) => {
    muestras.forEach( muestra => {
        if(muestra.id === "x"){
            arrVarX.push(parseFloat(muestra.value));
        }

        if(muestra.id === "y"){
            arrVarY.push(parseFloat(muestra.value));
        }
    })
}

//Se verifica que todos los datos son numeros 
const validarMuestras = (muestras) => {
    return muestras.every(muestra => !isNaN(muestra));
}

//Se realizan las operaciones del metodo de los minimos cuadrados y se determina el valor de b y m
const calculoMinimosCuadrados = (arrVarX, arrVarY) => {
    let n,sumatoriaX, sumatoriaY, sumatoriaCuadradosX, sumatoriaXY = 0;
    n = arrVarY.length;
    sumatoriaX = arrVarX.reduce((sumax, valorx) => sumax + valorx, 0);
    sumatoriaY = arrVarY.reduce((sumay, valory) => sumay + valory, 0);
    sumatoriaCuadradosX = arrVarX.reduce((sumCuadradosx, valorx) => sumCuadradosx + valorx**2,  0);
    
    arrVarX.forEach((valor, i) => {
        sumatoriaXY += arrVarX[i] * arrVarY[i];
    })

    m = ((n * sumatoriaXY) - (sumatoriaX * sumatoriaY)) / ((n * sumatoriaCuadradosX) - sumatoriaX**2 );

    b = ((sumatoriaY * sumatoriaCuadradosX) - (sumatoriaX * sumatoriaXY)) / (n*sumatoriaCuadradosX - sumatoriaX**2);
    console.log(m, b)
}


//Esta funcion genera la grafica del modelo matematico usando Chart Js
export const generarGrafica = () => {
    //Se verifica si ya existe un modelo matematico
    if(!isNaN(m) && !isNaN(b)){
       // console.log("Se puede generar el modelo matematico :)");

       //Se crea la grafica siguiendo la documentacion de chart Js
        const grafica1 = document.querySelector(".grafica1");
        const grafica2 = document.querySelector(".grafica2");
        const punto1 = {x: 0, y: b};
        const punto2 = {x: arrVarX[arrVarX.length - 1]};
        punto2.y = m * punto2.x + b;

        const grafica1DataSet =  {
            label: "Muestras",
            data: [...arrVarY],
            backgroundColor: 'rgba(255, 0, 0, 1)', 
            borderColor: 'rgba(255, 0, 0, 1)',
            showLine: false 
        }

        const grafica2DataSet =  {
            label: "Modelo matematico",
            data: [punto1.y, punto2.y],
            backgroundColor: 'rgba(54, 162, 235, 1)', 
            borderColor: 'rgba(54, 162, 235, 1)',
            showLine: true
        }

        new Chart(grafica1, {
            type: "line",
            data: {
                labels: [...arrVarX],
                datasets: [grafica1DataSet]
            },
            options: {
                indexAsis: "y",
                scales: {
                    y: {
                        beginAtZero: true
                    },
                }
            }
        });

        new Chart(grafica2, {
            type: "line",
            data: {
                labels: [punto1.x, punto2.x],
                datasets: [grafica2DataSet]
            },
            options: {
                indexAsis: "y",
                scales: {
                    y: {
                        beginAtZero: true
                    },
                }
            }
        });
    } else  {
        console.log("Primero necesitas generar el modelo matematico");
    }

}






