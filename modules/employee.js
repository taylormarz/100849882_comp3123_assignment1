// functions and routes for employees
// CRUD operations
import { ObjectId } from 'mongodb';
import { errHandle } from '../handlers/error-handler.js';

// create new employee
export async function createEmployee(fname, lname, email, position, salary, 
    department, collection) {
    const insertNewEmp = {
        _id: new ObjectId(),
        first_name: fname,
        last_name: lname,
        email: email,
        position: position,
        salary: salary,
        date_of_joining: new Date(),
        department: department,
        created_at: new Date(),
        updated_at: new Date()
    };

    try {
        await collection.insertOne(insertNewEmp);
        return insertNewEmp;
    } catch (e) {
        errHandle(null, 'Error creating new employee: ' + e);
    }
}

// read all employees
export async function readAllEmployees(collection) {
    try {
        return await collection.find(
            {},
            { projection: { created_at: 0, updated_at: 0 } }
        ).toArray();
    } catch (e) {
        errHandle(null, 'Error reading employees: ' + e);
    }
}

// read employee by id
export async function readEmpById(_id, collection) {
    try {
        return await collection.findOne(
            { _id: ObjectId.createFromHexString(_id) },
            { projection: { created_at: 0, updated_at: 0 } }
        );
    } catch (e) {
        errHandle(null, 'Error reading employee by id: ' + e);
    }
}

// update employee 
export async function updateEmployee(_id, fname, lname, email, position, salary, 
    department, collection) {
    try {
        await collection.updateOne({ _id: ObjectId.createFromHexString(_id) }, 
        { $set: {
            first_name: fname, 
            last_name: lname, 
            email: email, 
            position: position, 
            salary: salary, 
            department: department 
        }});
    } catch (e) {
        errHandle(null, 'Error updating employee: ' + e);
    }
}

// delete employee by id
export async function deleteEmployee(_id, collection) {
    try {
        await collection.deleteOne({ _id: ObjectId.createFromHexString(_id) });
    } catch (e) {
        errHandle(null, 'Error deleting employee: ' + e);
    }
}

