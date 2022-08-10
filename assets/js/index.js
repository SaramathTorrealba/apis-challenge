
const url =  'https://mindicador.cl/api'

currencyValues = ""

let test = [0]

const labels = [
    'Día 1', 
    'Día 2', 
    'Día 3', 
    'Día 4', 
    'Día 5',
    'Día 6', 
    'Día 7', 
    'Día 8', 
    'Día 9', 
    'Día 10'
];

const dataGraph = {
    labels: labels,
    datasets: [{
      label: `Valor moneda`,
      data: test,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 1
    }]
};


const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: dataGraph,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

fetch(url)
.then(response => response.json() )
.then(data => {
   
    currencyValues = data
})
.catch(error => {
    console.error(error)
    result.innerHTML=`<p> Error al consultar al servidor</p>`
})

function calculate(){

    let inputChange= document.querySelector("#inputChange").value
    let currency= document.querySelector("#currency").value
    let calculation = inputChange/currencyValues[currency].valor
    console.log(calculation)
    result.innerHTML=`<p>Resultado: ${calculation}</p>`

    fetch(`${url}/${currency}`)
    .then(response => response.json() )
    .then(data => {

        console.log(data)
        let arrayGraph = data.serie.splice(1, 10)
        var arrayData = arrayGraph.map(day => {
            return day.valor;
        });

        myChart.data.datasets[0].data = arrayData
        myChart.update();
        
    })
    .catch(error => {
        console.error(error)
        result.innerHTML=`<p> Error al consultar al servidor</p>`
    })
    

}

  

