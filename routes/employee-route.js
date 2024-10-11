// routes for employee API endpoints
import { validateEmp, validationErr } from '../handlers/validation-handler.js';
import { errHandle } from '../handlers/error-handler.js';
import { createEmployee, readAllEmployees, readEmpById, 
    updateEmployee, deleteEmployee } from "../modules/employee.js";

// route for post request to create new employee
export async function createNewEmpRoute(app, employeeCollection) {
    app.post('/api/v1/emp/employees', validateEmp(), validationErr, async (req, res) => {
        // destructure emp details from req body
        const { first_name, last_name, email, position, salary, department } = req.body;

        try {
            // call create employee func from employee.js
            const createEmp = await createEmployee(first_name, last_name, email, position, salary, 
                department, employeeCollection);
                // success response
                res.status(201).json({ 
                    message: 'Employee created successfully.',
                    employee_id: createEmp._id
                });
        } catch (e) {
            // err handler func incase error occurs
            errHandle(null, 'Error creating new employee: ' + e);
        }
    });
}

// route for get request to read all employees
export async function readEmpRoute(app, employeeCollection) {
    // _ to indicate route not utilizing req
    app.get('/api/v1/emp/employees', async (_, res) => {


        try {
            // call read employee func from employee.js
            const getEmp = (await readAllEmployees(employeeCollection));
            // success response with emp list
            res.status(200).json({ getEmp });
        } catch (e) {
            // err handler func incase error occurs
            errHandle(null, 'Error reading employees: ' + e);
        }
    });
}

// route for get request to read employee by id
export async function readEmpByIdRoute(app, employeeCollection) {
    app.get('/api/v1/emp/employees/:eid', async (req, res) => {
        // emp id extraction from req params
        const { eid } = req.params;

        try {
            // call read employee by id func from employee.js
            const getEmpById = await readEmpById(eid, employeeCollection);
            // success response with specified emp listed
            res.status(200).json({ getEmpById });
        } catch (e) {
            // err handler func incase error occurs
            errHandle(null, 'Error reading employee by id: ' + e);
        }
    });
}

// route for updating employee by id
export async function updateEmpRoute(app, employeeCollection) {
    app.put('/api/v1/emp/employees/:eid', validateEmp(), validationErr, async (req, res) => {
        // emp id extraction from req params
        const { eid } = req.params;
        // destructure emp details from req body
        const { first_name, last_name, email, position, salary, department } = req.body;

        try {
            // call update emp by id func from employee.js
            const updateEmpById = await updateEmployee(eid, first_name, last_name, email, 
                position, salary, department, employeeCollection);
            // success response
            res.status(200).json({ message: 'Employee details updated successfully. ', updateEmpById });
        } catch (e) {
            // err handler func incase error occurs
            errHandle(null, 'Error updating employee: ' + e);
        }
    });
}

// route for deleting employee by id
export async function deleteEmpRoute(app, employeeCollection) {
    app.delete('/api/v1/emp/employees/:eid', async (req, res) => {
        // emp id extraction from req params
        const { eid } = req.params;

        try {
            // call delete emp by id func from employee.js
            const deleteEmp = await deleteEmployee(eid, employeeCollection);
            // success response
            res.status(200).json({ message: 'Employee deleted successfully. ', deleteEmp });
        } catch (e) {
            // err handler func incase error occurs
            errHandle(null, 'Error deleting employee: ' + e);
        }
    });
}
