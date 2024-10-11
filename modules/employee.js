// functions for employee module
import { ObjectId } from 'mongodb';
import { errHandle } from '../handlers/error-handler.js';

// CRUD operations
// create new employee func
export async function createEmployee(fname, lname, email, position, salary, 
    department, collection) {
    
    // schema initialization for obj representing new emp document 
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

    // method to insert 1 document into collection (in this case doc is a new employee)
    try {
        await collection.insertOne(insertNewEmp);
        return insertNewEmp;
    } catch (e) {
        errHandle(null, 'Error creating new employee: ' + e);
    }
}

// read all employees func
export async function readAllEmployees(collection) {
    try {
        // uses find method to return array with all employee docs found in db
        return await collection.find(
            {},
            // using mongodb syntax to exclude created_at and updated_at fields
            { projection: { created_at: 0, updated_at: 0 } }
        ).toArray();
    } catch (e) {
        errHandle(null, 'Error reading employees: ' + e);
    }
}

// read employee by id func
export async function readEmpById(_id, collection) {
    try {
        // using findOne method to search collection for emp document that has matching id field
        return await collection.findOne(
            // specifies id field
            { _id: ObjectId.createFromHexString(_id) },
            // excluding created_at and updated_at fields from return
            { projection: { created_at: 0, updated_at: 0 } }
        );
    } catch (e) {
        errHandle(null, 'Error reading employee by id: ' + e);
    }
}

// update employee by id func
export async function updateEmployee(_id, fname, lname, email, position, salary, 
    department, collection) {
    try {
        // using updateOne method to update one emp doc that matches specified id
        await collection.updateOne({ _id: ObjectId.createFromHexString(_id) }, 
        // using mongodb syntax to set the field params that can be updated
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

// delete employee by id func
export async function deleteEmployee(_id, collection) {
    try {
        // using deleteOne method to delete emp doc by specified id that matches id field
        await collection.deleteOne({ _id: ObjectId.createFromHexString(_id) });
    } catch (e) {
        errHandle(null, 'Error deleting employee: ' + e);
    }
}
