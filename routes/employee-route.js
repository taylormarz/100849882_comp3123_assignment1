// routes for employee API endpoints
import { validateEmp, validationErr } from '../handlers/validation-handler.js';
import { errHandle } from '../handlers/error-handler.js';
import { createEmployee, readAllEmployees, readEmpById, 
    updateEmployee, deleteEmployee } from "../modules/employee.js";

// route for post request to create new employee
export async function createNewEmpRoute(app, employeeCollection) {
    app.post('/api/v1/emp/employees', validateEmp(), validationErr, async (req, res) => {
        const { first_name, last_name, email, position, salary, department } = req.body;

        try {
            const createEmp = await createEmployee(first_name, last_name, email, position, salary, 
                department, employeeCollection);
                res.status(201).json({ 
                    message: 'Employee created successfully.',
                    employee_id: createEmp._id
                });
        } catch (e) {
            errHandle(null, 'Error creating new employee: ' + e);
        }
    });
}

// route for get request to read all employees
export async function readEmpRoute(app, employeeCollection) {
    app.get('/api/v1/emp/employees', async (_, res) => {

        try {
            const getEmp = (await readAllEmployees(employeeCollection));
            res.status(200).json({ getEmp });
        } catch (e) {
            errHandle(null, 'Error reading employees: ' + e);
        }
    });
}

// route for get request to read employee by id
export async function readEmpByIdRoute(app, employeeCollection) {
    app.get('/api/v1/emp/employees/:eid', async (req, res) => {
        const { eid } = req.params;

        try {
            const getEmpById = await readEmpById(eid, employeeCollection);
            res.status(200).json({ getEmpById });
        } catch (e) {
            errHandle(null, 'Error reading employee by id: ' + e);
        }
    });
}

// route for updating employee
export async function updateEmpRoute(app, employeeCollection) {
    app.put('/api/v1/emp/employees/:eid', validateEmp(), validationErr, async (req, res) => {
        const { eid } = req.params;
        const { first_name, last_name, email, position, salary, department } = req.body;

        try {
            const updateEmpById = await updateEmployee(eid, first_name, last_name, email, 
                position, salary, department, employeeCollection);
            res.status(200).json({ message: 'Employee details updated successfully. ', updateEmpById });
        } catch (e) {
            errHandle(null, 'Error updating employee: ' + e);
        }
    });
}

export async function deleteEmpRoute(app, employeeCollection) {
    app.delete('/api/v1/emp/employees/:eid', async (req, res) => {
        const { eid } = req.params;

        try {
            const deleteEmp = await deleteEmployee(eid, employeeCollection);
            res.status(200).json({ message: 'Employee deleted successfully. ', deleteEmp })
        } catch (e) {
            errHandle(null, 'Error deleting employee: ' + e);
        }
    })
}
