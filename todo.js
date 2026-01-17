// ========================================
// TODO FACTORY MODULE (ES6)
// ========================================
// This module is responsible for creating Todo objects
// Using ES6 export/import for proper module system

/**
 * Factory function to create Todo objects
 * @param {string} title - The title of the todo
 * @param {string} description - Detailed description
 * @param {string} dueDate - Due date in YYYY-MM-DD format
 * @param {string} priority - 'low', 'medium', or 'high'
 * @param {string} notes - Optional additional notes
 * @returns {object} A new todo object
 */
export function createTodo(title, description, dueDate, priority, notes = '') {
    // Generate a unique ID for this todo
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    return {
        id,                    // Unique identifier
        title,                 // Todo title (required)
        description,           // Longer description (required)
        dueDate,              // Due date as a string (required)
        priority,             // 'low', 'medium', or 'high' (required)
        notes,                // Additional notes (optional)
        completed: false,     // Track if todo is done
        createdAt: new Date().toISOString(), // When it was created
        
        // Methods for this todo
        toggleComplete() {
            this.completed = !this.completed;
        },
        
        updateTodo(newData) {
            // Update todo properties with new data
            if (newData.title !== undefined) this.title = newData.title;
            if (newData.description !== undefined) this.description = newData.description;
            if (newData.dueDate !== undefined) this.dueDate = newData.dueDate;
            if (newData.priority !== undefined) this.priority = newData.priority;
            if (newData.notes !== undefined) this.notes = newData.notes;
        }
    };
}

console.log("✓ todo.js (ES6 Module) loaded successfully");