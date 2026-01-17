// ========================================
// MAIN APPLICATION ENTRY POINT (ES6)
// ========================================
// This is where our app starts
// We import what we need from other modules

// Import our factory functions
import { createTodo } from './todo.js';
import { createProject } from './project.js';
import { saveProjects, loadProjects, clearStorage, hasStoredData } from './storage.js';

console.log("✓ app.js (ES6 Module) loaded successfully");
console.log("========================================");
console.log("Testing Storage Module");
console.log("========================================");

// Clear any existing data first (for clean testing)
clearStorage();

// Test 1: Create a project with todos
const project1 = createProject('Work Tasks');
const todo1 = createTodo(
    'Complete Todo App',
    'Build a full-featured todo application',
    '2024-12-25',
    'high',
    'Use ES6 modules and localStorage'
);
const todo2 = createTodo(
    'Learn localStorage',
    'Understand how to persist data',
    '2024-12-20',
    'medium'
);

project1.addTodo(todo1);
project1.addTodo(todo2);

// Test 2: Create another project
const project2 = createProject('Personal');
const todo3 = createTodo(
    'Buy groceries',
    'Milk, eggs, bread',
    '2024-12-18',
    'low'
);
project2.addTodo(todo3);

console.log("✓ Created 2 projects with 3 total todos");

// Test 3: Save to localStorage
const allProjects = [project1, project2];
saveProjects(allProjects);
console.log("✓ Saved projects to localStorage");

// Test 4: Load from localStorage
const loadedProjects = loadProjects();
console.log("✓ Loaded projects from localStorage");
console.log("  - Number of projects:", loadedProjects.length);
console.log("  - Project 1 name:", loadedProjects[0].name);
console.log("  - Project 1 todos:", loadedProjects[0].getAllTodos().length);

// Test 5: Verify methods work after loading
console.log("✓ Testing that methods still work after loading...");
const firstTodo = loadedProjects[0].getTodo(todo1.id);
console.log("  - Found todo:", firstTodo.title);
console.log("  - Todo completed before toggle:", firstTodo.completed);
firstTodo.toggleComplete(); // This method should work!
console.log("  - Todo completed after toggle:", firstTodo.completed);

// Test 6: Check storage status
console.log("✓ Has stored data:", hasStoredData());

console.log("========================================");
console.log("Storage Module Working Perfectly! ✓");
console.log("Open DevTools > Application > Local Storage to see the saved data");
console.log("========================================");