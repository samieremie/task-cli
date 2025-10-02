#!/usr/bin/env node
const fs = require('fs');
const { type } = require('os');
const path = './data.json'; // your desired file name

let taskID = 1;

// Create save file if it doesn't exist
if (!fs.existsSync(path)) {
    // File doesn't exist, create it with empty JSON object
    fs.writeFileSync(path, JSON.stringify({}, null, 2), 'utf8');
    console.log(`${path} created successfully.`);
} else {
    // File exists
    console.log(`${path} already exists.`);
}

// Load the counter for the task IDs
if (!fs.existsSync('./counter.json')) {
    fs.writeFileSync('./counter.json', JSON.stringify({ "taskID": 1 }, null, 2), 'utf8');
    console.log(`counter.json created successfully.`);
} else {
    const data = fs.readFileSync('./counter.json', 'utf8');
    const counter = JSON.parse(data);
    taskID = counter.taskID;
    console.log(`counter.json already exists.`);
}

class Task{
    constructor(description){
        this.id = taskID++;
        this.task = {
            "description": description,
            "status": "todo",
            "createdAt": new Date().toISOString(),
            "updatedAt": new Date().toISOString(),
        }
        this._saveToFile();
    }

    _saveToFile(){
        const data = fs.readFileSync(path, 'utf8');
        let tasks = JSON.parse(data);

        tasks[this.id] = this.task;

        fs.writeFileSync(path, JSON.stringify(tasks, null, 2), 'utf8');
    }
}

// Main program logic
if (process.argv.length < 3) {
    console.log("Please provide a command.");
    process.exit(1);
} 
else {
    const command = process.argv[2];

    switch (command) {
        case 'add': {
            const description = process.argv.slice(3).join(' ');
            if (!description) {
                console.log("Please provide a task description.");
                process.exit(1);
            }
            const newTask = new Task(description);
            console.log(`Task added with ID: ${newTask.id}`);
            // Update the counter file
            fs.writeFileSync('./counter.json', JSON.stringify({ "taskID": taskID }, null, 2), 'utf8');
            break;
            }
        case 'delete': {
            const deleteID = process.argv[3];
            if (!deleteID) {
                console.log("Please provide a task ID to delete.");
                process.exit(1);
            }
            const data = fs.readFileSync(path, 'utf8');
            let tasks = JSON.parse(data);
            if (tasks[deleteID]) {
                delete tasks[deleteID];
                fs.writeFileSync(path, JSON.stringify(tasks, null, 2), 'utf8');
                console.log(`Task with ID: ${deleteID} deleted.`);
            } else {
                console.log(`Task with ID: ${deleteID} not found.`);
            }
            break;            
            }
        case 'list': {
            const type = process.argv[3]; // 'todo', 'in-progress', 'done'
            if (type && !['todo', 'in-progress', 'done'].includes(type)) {
                console.log("Invalid type. Please use 'todo', 'in-progress', or 'done'.");
                process.exit(1);
            }
            const data = fs.readFileSync(path, 'utf-8');
            const tasks = JSON.parse(data);
            if (type) {
                console.log(`Tasks with status '${type}':`);
                for (const [id, task] of Object.entries(tasks)) {
                    if (task.status === type) {
                        console.log(`ID: ${id}, Description: ${task.description}, Created At: ${task.createdAt}, Updated At: ${task.updatedAt}`);
                    }
                }
            } else {
                console.log("All Tasks:");
                for (const [id, task] of Object.entries(tasks)) {
                    console.log(`ID: ${id}, Description: ${task.description}, Status: ${task.status}, Created At: ${task.createdAt}, Updated At: ${task.updatedAt}`);
                }
            break;
            }
            }
        case 'update': {
            const updateID = process.argv[3];
            const newDescription = process.argv.slice(4).join(' ');
            if (!updateID || !newDescription) {
                console.log("Please provide a task ID and new description to update.");
                process.exit(1);
            }
            const data = fs.readFileSync(path, 'utf-8');
            let tasks = JSON.parse(data);
            if (tasks[updateID]) {
                tasks[updateID].description = newDescription;
                tasks[updateID].updatedAt = new Date().toISOString();
                fs.writeFileSync(path, JSON.stringify(tasks, null, 2), 'utf8');
                console.log(`Task with ID: ${updateID} updated.`);
            } else {
                console.log(`Task with ID: ${updateID} not found.`);
            }
            break;            
            }
        case 'mark-done': {
            const doneID = process.argv[3];
            if (!doneID) {
                console.log("Please provide a task ID to mark as done.");
                process.exit(1);
            }
            const data = fs.readFileSync(path, 'utf-8');
            let tasks = JSON.parse(data);
            if (tasks[doneID]) {
                tasks[doneID].status = 'done';
                tasks[doneID].updatedAt = new Date().toISOString();
                fs.writeFileSync(path, JSON.stringify(tasks, null, 2), 'utf8');
                console.log(`Task with ID: ${doneID} marked as done.`);
            } else {
                console.log(`Task with ID: ${doneID} not found.`);
            }
            break;            
            }
        case 'mark-in-progress': {
            const inProgressID = process.argv[3];
            if (!inProgressID) {
                console.log("Please provide a task ID to mark as in-progress.");
                process.exit(1);
            }
            const data = fs.readFileSync(path, 'utf-8');
            let tasks = JSON.parse(data);
            if (tasks[inProgressID]) {
                tasks[inProgressID].status = 'in-progress';
                tasks[inProgressID].updatedAt = new Date().toISOString();
                fs.writeFileSync(path, JSON.stringify(tasks, null, 2), 'utf8');
                console.log(`Task with ID: ${inProgressID} marked as in-progress.`);
            } else {
                console.log(`Task with ID: ${inProgressID} not found.`);
            }
            break;
        }
        case 'mark-todo': {
            const todoID = process.argv[3];
            if (!todoID) {
                console.log("Please provide a task ID to mark as todo.");
                process.exit(1);
            }
            const data = fs.readFileSync(path, 'utf-8');
            let tasks = JSON.parse(data);
            if (tasks[todoID]) {
                tasks[todoID].status = 'todo';
                tasks[todoID].updatedAt = new Date().toISOString();
                fs.writeFileSync(path, JSON.stringify(tasks, null, 2), 'utf8');
                console.log(`Task with ID: ${todoID} marked as todo.`);
            } else {
                console.log(`Task with ID: ${todoID} not found.`);
            }
            break;            
            }
        }
    }