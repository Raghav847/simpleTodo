// ========================================
// PROJECT FACTORY MODULE (ES6)
// ========================================
// This module is responsible for creating Project objects
// A Project contains multiple todos

// Import the createTodo function from todo.js
// This is an explicit dependency - much clearer!
import { createTodo } from './todo.js';

/**
 * Factory function to create Project objects
 * @param {string} name - The name of the project
 * @returns {object} A new project object with methods to manage todos
 */
export function createProject(name) {
    // Generate a unique ID for this project
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    return {
        id,                    // Unique identifier
        name,                  // Project name
        todos: [],            // Array to hold todos
        createdAt: new Date().toISOString(), // When it was created
        
        // ========================================
        // TODO MANAGEMENT METHODS
        // ========================================
        
        /**
         * Add a todo to this project
         * @param {object} todo - A todo object created by createTodo
         */
        addTodo(todo) {
            this.todos.push(todo);
            console.log(`Added todo "${todo.title}" to project "${this.name}"`);
        },
        
        /**
         * Remove a todo from this project by ID
         * @param {string} todoId - The ID of the todo to remove
         * @returns {boolean} True if removed, false if not found
         */
        removeTodo(todoId) {
            const initialLength = this.todos.length;
            this.todos = this.todos.filter(todo => todo.id !== todoId);
            const removed = this.todos.length < initialLength;
            
            if (removed) {
                console.log(`Removed todo with ID: ${todoId}`);
            } else {
                console.log(`Todo with ID: ${todoId} not found`);
            }
            
            return removed;
        },
        
        /**
         * Find a todo by ID
         * @param {string} todoId - The ID of the todo to find
         * @returns {object|null} The todo object or null if not found
         */
        getTodo(todoId) {
            return this.todos.find(todo => todo.id === todoId) || null;
        },
        
        /**
         * Get all todos in this project
         * @returns {array} Array of all todos
         */
        getAllTodos() {
            return this.todos;
        },
        
        /**
         * Get todos filtered by priority
         * @param {string} priority - 'low', 'medium', or 'high'
         * @returns {array} Filtered array of todos
         */
        getTodosByPriority(priority) {
            return this.todos.filter(todo => todo.priority === priority);
        },
        
        /**
         * Get completed todos
         * @returns {array} Array of completed todos
         */
        getCompletedTodos() {
            return this.todos.filter(todo => todo.completed);
        },
        
        /**
         * Get incomplete todos
         * @returns {array} Array of incomplete todos
         */
        getIncompleteTodos() {
            return this.todos.filter(todo => !todo.completed);
        },
        
        /**
         * Sort todos by due date
         * @returns {array} Sorted array of todos
         */
        sortByDueDate() {
            return [...this.todos].sort((a, b) => {
                return new Date(a.dueDate) - new Date(b.dueDate);
            });
        },
        
        /**
         * Sort todos by priority (high -> medium -> low)
         * @returns {array} Sorted array of todos
         */
        sortByPriority() {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return [...this.todos].sort((a, b) => {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
        }
    };
}

console.log("✓ project.js (ES6 Module) loaded successfully");