

# To run the project on your local machine

1. Clone the repo in your computer:

```bash
git clone https://github.com/ewaoche/companysalary
```

# How to run the project
After cloning the repository into a local machine, simply lunch the index.html on the browser like google chrome then right click on the browser and go to the console to see the calculated salary for every employee.
Employee data can be change by opening the **data** folder and replacing **MATHEW=MO15:15-20:00,TU10:00-12:00,TH05:00-09:15,SA14:00-18:00,SU21:10-22:00** sample input data 
also 
the code 
// console.log(
//   getSalaryForEmployees(
//     'RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00'
//   )
// ); 

// console.log(getSalaryForEmployees(
// 'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00'
// )
// ); 


// console.log(
//   getSalaryForEmployees(
//     'RENE=MO20:00-02:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00'
//   )
// ); 
// console.log(
//   getSalaryForEmployees(
//     'MATHEW=MO15:15-20:00,TU10:00-12:00,TH05:00-09:15,SA14:00-18:00,SU21:10-22:00'
//   )
// ); 
// console.log(
//   getSalaryForEmployees(
//     'EWAOCHE=MO11:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00'
//   )
// ); 

can be used if  
function readTextFile(file) {
    fetch(file).then(function(res) {
        const hold = res.text();
        hold.then(data => console.log(getSalaryForEmployees(data)));

    })
}

readTextFile("/data/Data.txt"); is commented out of the code to see all the result at once.

# Synthesis of the solution

The goal of this exercise is to calculate the total that the company has to pay an employee, based on the hours they worked and the times during which they worked.




To solve this challenge I used Javascript.


# Step By Step to solve the challenge

1. First of all, I need to know what data type I am receiving

 # Data input is a text file containing time range in hours for which an employee has worked for a week .

 2. I needed the **readTextFile** function that reads the data from the text file in the folder called **data**
 
 3. I used **getSalaryForEmployees** function which received the employee name and days and hours worked 
 for example MATHEW=MO15:15-20:00,TU10:00-12:00,TH05:00-09:15,SA14:00-18:00,SU21:10-22:00
 this  function splited  the data into array employeeName and schedule.

 4 The **getScheduleByDay** function received the **schedule** and returned worked hours range **hoursRange** and hours worked **hoursWorked** for all the week days.


5 I used the function **getSalaryForCurrentSchedule** to calculate the salary for a specific range

6 Then **getSalaryForEmployees** was used to calculate the salary to be paid based on the hours and days worked by invoking the function **getFinalSalaryPerEmployee** 

# Conclusions 

This challenge was very useful for me. Was useful because I could improve my logical thinking and feel challenged to do my best.

After this problem, I am left with a huge desire to continue improving my development skills.



