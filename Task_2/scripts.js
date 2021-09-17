var chart;

function onLoad() {
  let tbody = document.getElementById("tableBody");
  let tableSettings = document.getElementById("tableSettings");
  Object.entries(jsonData_table).forEach(([propName, propDataArr]) => {
    tbody.innerHTML += this.getRow(propName, propDataArr);
    tableSettings.innerHTML += this.buildCheckBox(propName);
  });
  
  this.buildChart(Object.keys(jsonData_chart)[0]);
}

// Builds table row, based on row name and its data
function getRow(name, dataArr) {
  let result = `<th>${PROP_NAME_MAP[name]}</th>`;
  dataArr.forEach((data, index) => {
    if (index === 0) {
      result += `<td class="table-info">${data}</td>`;
    } else {
      let difference = this.relDiff(data, dataArr[0]);
      if (difference == 0) {
        result += `<td>${data} -</td>`;
      } else {
        let textColor = difference > 0 ? "text-success" : "text-danger";
        result += `<td>${data} <span class="${textColor}">${difference}%</span></td>`;
      }
    }
  })

  return `<tr id="tr_${name}" onClick="buildChart('${name}')">${result}</tr>`
}

// Builds chart
function buildChart(type) {
  chart && chart.destroy();
  
  chart = new Chart("chart", {
    type: "line",
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7],
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: jsonData_chart[type]
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: PROP_NAME_MAP[type]
      }
    }
  });
}

// Checkbox element
function buildCheckBox(label) {
  return `<div class="form-check">
            <input class="form-check-input" name="${label}" type="checkbox" checked onClick="handleTableCheckBoxSettings(this)">
            <label class="form-check-label" for="defaultCheck1">${PROP_NAME_MAP[label]}</label>
          </div>`
}

// Show/Hide table row 
function handleTableCheckBoxSettings(elem) {
  if(elem.checked) {
    elem.removeAttribute('checked');
    document.getElementById(`tr_${elem.name}`).style.display = 'table-row';
  } else {
    elem.setAttribute("checked", "");
    document.getElementById(`tr_${elem.name}`).style.display = 'none';
  }
}

// Returns diff between two numbers in %
function relDiff(a, b) {
  return (((a - b) / b) * 100.0).toFixed(2);
}

const PROP_NAME_MAP = {
  "proceeds": "Выручка, руб",
  "cash": "Наличные",
  "cashless": "Безналичный расчет",
  "credit": "Кредитные карты",
  "avgReceipt": "Средний чек, руб",
  "avgGuest": "Средний гость, руб",
  "receiptAmt": "Количество чеков",
  "guestAmt": "Количество гостей"
}

const jsonData_table = {
  "proceeds": [35000, 33000, 36000, 32000],
  "cash": [30000, 26000, 32000, 33000],
  "cashless": [3000, 3100, 3000, 2900],
  "credit": [4000, 2600, 3200, 5000],
  "avgReceipt": [1000, 2000, 3000, 800],
  "avgGuest": [2000, 2000, 1000, 3000],
  "receiptAmt": [34, 26, 36, 33],
  "guestAmt": [30, 26, 29, 32]
};

jsonData_chart = {
  "proceeds": [35000, 33000, 36000, 32000, 37000, 35000, 36000],
  "cash": [30000, 26000, 32000, 33000, 28000, 26000, 29000],
  "cashless": [3000, 3100, 3000, 2900, 3300, 3200, 3400],
  "credit": [4000, 2600, 3200, 5000, 4500, 4600, 4700],
  "avgReceipt": [1000, 2000, 3000, 800, 1500, 1800, 1700],
  "avgGuest": [2000, 2000, 1000, 3000, 2000, 2500, 2200],
  "receiptAmt": [34, 26, 36, 33, 36, 37, 35],
  "guestAmt": [30, 26, 29, 32, 30, 28, 31]
};
