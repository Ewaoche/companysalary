const weekSalary = {
    'MO-TU-WE-TH-FR': {
        25: [1, 9],
        15: [9, 18],
        20: [18, 0],
    },
    'SA-SU': {
        30: [1, 9],
        20: [9, 18],
        25: [18, 0],
    },
};

const getScheduleByDay = (schedule) =>
    schedule.split(',').reduce(
        (acc, curr) => ({
            ...acc,
            [curr.slice(0, 2)]: {
                ...acc[curr.slice(0, 2)],
                hoursRange: [
                    Number(curr.slice(2).split('-')[0].slice(0, 2)),
                    Number(curr.slice(2).split('-')[1].slice(0, 2)),
                ],
                hoursWorked: Number(curr.slice(2).split('-')[1].slice(0, 2)) <
                    Number(curr.slice(2).split('-')[0].slice(0, 2)) ?
                    24 +
                    Number(curr.slice(2).split('-')[1].slice(0, 2)) -
                    Number(curr.slice(2).split('-')[0].slice(0, 2)) : Number(curr.slice(2).split('-')[1].slice(0, 2)) -
                    Number(curr.slice(2).split('-')[0].slice(0, 2)),
            },
        }), {}
    );

const getFinalSalaryPerEmployee = ({ MO, TU, WE, TH, FR, SA, SU }) => {
    // Method to calculate the total salary for an employee avoiding undefined values
    return Object.values({ MO, TU, WE, TH, FR, SA, SU }).reduce(
        (acc, curr) => (curr ? acc + curr : acc),
        0
    );
};

// Method to calculate the salary for a specific range
const getSalaryForCurrentSchedule = ({ range, startHour, endHour, hoursWorked, salary }) => {
    Object.entries(range).forEach(([salaryRange, [start, end]], index) => {
        if (
            start <= startHour &&
            (end === 0 ? 24 : end) >= (endHour < startHour ? endHour + 24 : endHour)
        ) {
            salary += hoursWorked * salaryRange;
        }

        if (endHour < startHour && startHour > start && startHour <= (end === 0 ? 24 : end)) {
            if (start <= startHour && (end === 0 ? 24 : end) >= endHour) {
                const salaryValue = Object.keys(range)[index + 1];

                salary +=
                    ((end === 0 ? 24 : end) - startHour) * salaryRange +
                    (hoursWorked - ((end === 0 ? 24 : end) - startHour)) * Number(salaryValue);
            }
        }
    });

    return salary;
};

const getSalaryForEmployees = (employee) => {
    const keys = ['MO-TU-WE-TH-FR', 'SA-SU'];
    const [employeeName, schedule] = employee.split('=');
    // console.log(employeeName, "==============", "", schedule)
    const scheduleByDay = getScheduleByDay(schedule);
    return Object.entries(
        Object.entries(scheduleByDay).reduce((acc, [day, { hoursRange, hoursWorked }]) => {
            const [startHour, endHour] = hoursRange;
            const key = keys.find((key) => key.includes(day));
            const posibleRanges = weekSalary[key];

            let salary = 0;

            return {
                ...acc,
                [employeeName]: {
                    ...acc[employeeName],
                    [day]: getSalaryForCurrentSchedule({
                        range: posibleRanges,
                        startHour,
                        endHour,
                        hoursWorked,
                        salary,
                    }),
                },
            };
        }, {})
    ).reduce((acc, [employeeName, { MO, TU, WE, TH, FR, SA, SU }]) => {
        const sum = getFinalSalaryPerEmployee({ MO, TU, WE, TH, FR, SA, SU });
        return (acc += `The amount to pay ${employeeName} is: ${sum} USD\n`);
    }, '');
};

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




//read text file data and get salary

function readTextFile(file) {
    fetch(file).then(function(res) {
        const hold = res.text();
        hold.then(data => console.log(getSalaryForEmployees(data)));

    })
}

readTextFile("/data/Data.txt");