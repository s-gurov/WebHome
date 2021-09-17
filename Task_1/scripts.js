function getTable() {
  let table = document.getElementById('workSchedule');
  let startDate = new Date(document.getElementById('startDate').value);
  let endDate = new Date(document.getElementById('endDate').value);
  let scheduleType = document.getElementById('scheduleType').value;
  let columns = "<td>Name</td>";
  let dateRangeArray = this.getSelectedDates(startDate, endDate);
  let uniqueEmployees = this.getUniqueEmployees(scheduleType);

  // Fills table head row
  dateRangeArray.forEach(date => columns += `<td>${date.toDateString()}</td>`);
  table.innerHTML = `<tr>${columns}</tr>`;
  
  // Builds employee table row
  uniqueEmployees.forEach(employee => {
    let employeeRow = "";
    dateRangeArray.forEach(date => {
      let foundEntries = jsonData[scheduleType]
        .filter(planData => (planData.employee === employee && date.toDateString() === new Date(planData.start).toDateString()));
      if (foundEntries.length) {
        let cellData = "";
        foundEntries.forEach(entry => {
          cellData += `<p>${entry.restaurant + ": " + this.getWorktime(entry.start, entry.finish)}<p>`;
        })
        employeeRow += `<td class='filledCell cellData'>${cellData}</td>`;
      } else {
        employeeRow += "<td class='cellData'></td>";
      }
    })
    table.innerHTML += `<tr><td>${employee}</td>${employeeRow}</tr>`;
  });
}

function getUniqueEmployees(scheduleType) {
  let result = [];

  jsonData[scheduleType].forEach(planData => {
    result.push(planData.employee);
  })

  return [...new Set(result)];
}

// Returns array with selected date range
function getSelectedDates(startDate, endDate) {
  result = [];

  for(let loopDate = new Date(startDate); loopDate <= endDate; loopDate.setDate(loopDate.getDate() + 1))
  {
    result.push(new Date(loopDate));
  }

  return result;
}

function getWorktime(start, finish) {
  return new Date(start).toLocaleTimeString() + " - " + new Date(finish).toLocaleTimeString();
}

const jsonData = {
  "plan":[
    {
      "employee": "Lucy",
      "restaurant": "Mirazur",
      "position": "Chef",
      "start": "2021-09-01T10:25:43.511Z",
      "finish": "2021-09-01T18:25:43.511Z"
    },
    {
      "employee": "Lucy",
      "restaurant": "Central",
      "position": "Chef",
      "start": "2021-09-01T10:25:43.511Z",
      "finish": "2021-09-01T18:25:43.511Z"
    },
    {
      "employee": "Lucy",
      "restaurant": "Mirazur",
      "position": "Chef",
      "start": "2021-09-02T10:15:43.511Z",
      "finish": "2021-09-02T18:05:43.511Z"
    },
    {
      "employee": "Lucy",
      "restaurant": "Mirazur",
      "position": "Chef",
      "start": "2021-09-03T09:05:43.511Z",
      "finish": "2021-09-03T18:35:43.511Z"
    },
    {
      "employee": "Robert",
      "restaurant": "Mirazur",
      "position": "Waiter",
      "start": "2021-09-02T11:25:43.511Z",
      "finish": "2021-09-02T19:25:43.511Z"
    },
    {
      "employee": "Robert",
      "restaurant": "Mirazur",
      "position": "Waiter",
      "start": "2021-09-03T11:25:43.511Z",
      "finish": "2021-09-03T19:15:43.511Z"
    },
    {
      "employee": "Robert",
      "restaurant": "Central",
      "position": "Waiter",
      "start": "2021-09-03T11:25:43.511Z",
      "finish": "2021-09-03T19:15:43.511Z"
    },
    {
      "employee": "Tom",
      "restaurant": "Central",
      "position": "Chef",
      "start": "2021-09-01T12:25:43.511Z",
      "finish": "2021-09-01T20:05:43.511Z"
    },
    {
      "employee": "Tom",
      "restaurant": "Central",
      "position": "Chef",
      "start": "2021-09-04T11:05:43.511Z",
      "finish": "2021-09-04T18:25:43.511Z"
    }
  ],
  "fact":[
    {
      "employee": "Lucy",
      "restaurant": "Mirazur",
      "position": "Chef",
      "start": "2021-09-01T10:00:43.511Z",
      "finish": "2021-09-01T18:00:43.511Z"
    },
    {
      "employee": "Lucy",
      "restaurant": "Mirazur",
      "position": "Chef",
      "start": "2021-09-04T10:00:43.511Z",
      "finish": "2021-09-04T18:00:43.511Z"
    },
    {
      "employee": "Lucy",
      "restaurant": "Central",
      "position": "Chef",
      "start": "2021-09-04T10:00:43.511Z",
      "finish": "2021-09-04T18:00:43.511Z"
    },
    {
      "employee": "Lucy",
      "restaurant": "Mirazur",
      "position": "Chef",
      "start": "2021-09-03T10:00:43.511Z",
      "finish": "2021-09-03T18:00:43.511Z"
    },
    {
      "employee": "Robert",
      "restaurant": "Mirazur",
      "position": "Waiter",
      "start": "2021-09-02T11:00:43.511Z",
      "finish": "2021-09-02T19:00:43.511Z"
    },
    {
      "employee": "Robert",
      "restaurant": "Central",
      "position": "Waiter",
      "start": "2021-09-02T11:00:43.511Z",
      "finish": "2021-09-02T19:00:43.511Z"
    },
    {
      "employee": "Robert",
      "restaurant": "Mirazur",
      "position": "Waiter",
      "start": "2021-09-04T11:00:43.511Z",
      "finish": "2021-09-04T19:00:43.511Z"
    },
    {
      "employee": "Tom",
      "restaurant": "Central",
      "position": "Chef",
      "start": "2021-09-01T12:00:43.511Z",
      "finish": "2021-09-01T20:00:43.511Z"
    },
    {
      "employee": "Tom",
      "restaurant": "Central",
      "position": "Chef",
      "start": "2021-09-03T12:00:43.511Z",
      "finish": "2021-09-03T20:00:43.511Z"
    }
  ]
};
