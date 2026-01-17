// ========================================
// MAIN APPLICATION ENTRY POINT (ES6)
// ========================================
// This is where our app starts
// We import what we need from other modules

// Import our factory functions
import { createTodo } from './todo.js';
import { createProject } from './project.js';

console.log("✓ app.js (ES6 Module) loaded successfully");
console.log("========================================");
console.log("Testing ES6 Modules");
console.log("========================================");

// Test 1: Create a project
const myProject = createProject('Work Tasks');
console.log("✓ Created project:", myProject.name);

// Test 2: Create some todos
const todo1 = createTodo(
    'Complete Todo App',
    'Build a full-featured todo application',
    '2024-12-25',
    'high',
    'Use ES6 modules and best practices'
);

const todo2 = createTodo(
    'Learn Module Patterns',
    'Understand import/export',
    '2024-12-20',
    'medium'
);

console.log("✓ Created todo 1:", todo1.title);
console.log("✓ Created todo 2:", todo2.title);

// Test 3: Add todos to project
myProject.addTodo(todo1);
myProject.addTodo(todo2);

console.log("✓ Project now has", myProject.getAllTodos().length, "todos");
console.log("✓ Todos sorted by priority:", myProject.sortByPriority().map(t => t.title));

console.log("========================================");
console.log("ES6 Modules Working Perfectly! ✓");
console.log("========================================");