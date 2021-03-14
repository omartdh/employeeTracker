const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'employee_db'
})

function initial(){

    inquirer.prompt([
        {
            name: 'main_list',
            type: 'list',
            message: 'What would you like to do?',
            choices:[
                'Add departments',
                'Add roles',
                'Add employees',
                'View departments',
                'View roles',
                'View employees',
                'Update employee roles',
                'Exit'
            ]
        }
    ]).then(function(answer){
        switch(answer.main_list){
             case 'Add departments':
                addDepartments()
                break;
             case 'Add roles':
                addRole()
                break;
             case 'Add employees':
                addEmployee()
                break;
             case 'View departments':
                viewDepartments()
                break;
             case 'View roles':
                viewRoles()
               break;
             case 'View employees':
                viewEmployees()
               break;
             case 'Update employee roles':
                updateEmployeeRole() 
                break;
             case 'Exit':
                connection.end();

        }
    })

}

function addDepartments(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the Department?',
            name: 'depatment_name'
        }
    ]).then(function(ans){
        connection.query("INSERT INTO department SET ?", 
        { name: ans.depatment_name }, (err, res) => {
            if(err) throw err
            console.log(`${res.affectedRows} depatment has been added`);
            initial();
        })
    })

}

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the role title?',
            name: 'role_title'
        },
        {
            type: 'input',
            message: 'What is the role salary?',
            name: 'role_salary'
        }
    ]).then(function(ans){
        connection.query("INSERT INTO roles SET ?", 
        { 
            title: ans.role_title,
            salary: ans.role_salary
        }, 
        (err, res) => {
            if(err) throw err
            console.log(`${res.affectedRows} roles has been added`);
            initial();
        })
    })

}

function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employee First Name?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is the employee Last Name?',
            name: 'last_name'
        }
    ]).then(function(ans){
        connection.query("INSERT INTO employee SET ?", 
        { 
            first_name: ans.first_name,
            last_name: ans.last_name
        }, 
        (err, res) => {
            if(err) throw err
            console.log(`${res.affectedRows} employee has been added`);
            initial();
        })
    })
    

}

function viewDepartments(){
    connection.query('SELECT * FROM department', (err, res) => {
        if(err) throw err;
        console.log(res);
        initial();
    })

}

function viewRoles(){
    connection.query('SELECT * FROM roles', (err, res) => {
        if(err) throw err;
        console.log(res);
        initial();
    })

}

function viewEmployees(){
    connection.query('SELECT * FROM employee', (err, res) => {
        if(err) throw err;
        console.log(res);
        initial();
    })

}

function updateEmployeeRole(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the employee role you want to update?',
            name: 'title_update'
        },
        {
            type: 'input',
            message: 'What is the new salery?',
            name: 'update_salary'
        }
    ]).then(function(ans){
        connection.query("UPDATE role SET ? WHERE ?", 
        { 
            title: ans.title_update
        },
        { 
            salary: ans.update_salary
        },
        (err, res) => {
            if(err) throw err
            console.log(`${res.affectedRows} role has been updated`);
            initial();
        })
    })

}

connection.connect((err) => {
    if(err) throw err;
    initial();
})