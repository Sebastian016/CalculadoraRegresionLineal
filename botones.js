const tablaMuestras = document.querySelector(".tablaMuestras");
let m, b;
let arrVarX = [];
let arrVarY = [];

export const generarModelo = () => {
    const muestras = [...tablaMuestras.children]
    if(muestras.length === 0){
        console.log("Oye no has puesto ninguna muestra");
    } else if(muestras.length === 2){
        console.log("Oye se necesitan al menos dos muestras");
    } else {
        arrVarX = [];
        arrVarY = [];
        leerMuestra(muestras, arrVarX, arrVarY);
        console.log(arrVarX, arrVarY);
        console.log(validarMuestras(arrVarX), validarMuestras(arrVarY));
        if(validarMuestras(arrVarX) && validarMuestras(arrVarY)){

            console.log(calculoMinimosCuadrados);
            calculoMinimosCuadrados(arrVarX, arrVarY);
            const divModeloMat = document.querySelector(".modeloMat");
            if(b >= 0){
                divModeloMat.innerHTML = ` Modelo matematico: y = ${m}x + ${Math.abs(b)}`
            } else {
                divModeloMat.innerHTML = `Modelo matematico: y = ${m}x - ${Math.abs(b)}`
            }

        } else {
            console.log("Debes llenar todos los campos");
        }
    }

    
}

export const añadirMuestra = () => {
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

export const generarGrafica = () => {
    //console.log(m, b);
    if(!isNaN(m) && !isNaN(b)){
        console.log("Se puede generar el modelo matematico :)");

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

const validarMuestras = (muestras) => {
    return muestras.every(muestra => !isNaN(muestra));
}

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

