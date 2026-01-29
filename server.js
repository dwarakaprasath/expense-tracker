const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'expenses.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize database file if it doesn't exist
async function initDatabase() {
  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify({ expenses: [] }));
    console.log('Database initialized');
  }
}

// Read from database
async function readDatabase() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { expenses: [] };
  }
}

// Write to database
async function writeDatabase(data) {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
    throw error;
  }
}

// API Routes

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const db = await readDatabase();
    res.json(db.expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Add new expense
app.post('/api/expenses', async (req, res) => {
  try {
    const db = await readDatabase();
    const newExpense = {
      id: Date.now(),
      ...req.body,
      date: new Date().toISOString()
    };
    db.expenses.unshift(newExpense);
    await writeDatabase(db);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

// Delete expense
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const db = await readDatabase();
    const expenseId = parseInt(req.params.id);
    db.expenses = db.expenses.filter(exp => exp.id !== expenseId);
    await writeDatabase(db);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// Update expense
app.put('/api/expenses/:id', async (req, res) => {
  try {
    const db = await readDatabase();
    const expenseId = parseInt(req.params.id);
    const index = db.expenses.findIndex(exp => exp.id === expenseId);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    db.expenses[index] = { ...db.expenses[index], ...req.body };
    await writeDatabase(db);
    res.json(db.expenses[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

// Start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Database file: ${DB_FILE}`);
  });
});
