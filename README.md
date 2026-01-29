# Expense Tracker with Database

A beautiful, full-featured expense tracking application with persistent database storage.

## Features

- 💾 **Persistent Database Storage** - All expenses are saved to a JSON database file
- 📊 **Real-time Statistics** - Track total expenses, monthly spending, and top categories
- 🏷️ **Tags & Categories** - Organize expenses with custom tags and predefined categories
- 💳 **Payment Tracking** - Record payment methods and card details
- 📥 **CSV Export** - Download expense statements with date range filtering
- 🎨 **Beautiful UI** - Refined design with smooth animations
- 🔌 **Connection Status** - Live database connection indicator
- 📱 **Responsive Design** - Works perfectly on all devices

## Tech Stack

- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express
- **Database**: JSON file storage (expenses.json)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup Steps

1. **Navigate to the project directory**
   ```bash
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to: `http://localhost:3000`

The server will automatically create an `expenses.json` database file on first run.

## Project Structure

```
expense-tracker/
├── server.js           # Backend API server
├── package.json        # Dependencies
├── expenses.json       # Database file (auto-created)
├── public/
│   └── index.html     # Frontend application
└── README.md          # This file
```

## API Endpoints

- `GET /api/expenses` - Fetch all expenses
- `POST /api/expenses` - Add a new expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

## Database

The application uses a simple JSON file database (`expenses.json`) that stores all expense data. The file is automatically created on first run and persists all your data between sessions.

### Data Structure

```json
{
  "expenses": [
    {
      "id": 1234567890,
      "description": "Lunch at restaurant",
      "amount": 23.50,
      "category": "Food & Dining",
      "paymentType": "Credit Card",
      "cardUsed": "Visa ending 4242",
      "tags": ["work", "lunch"],
      "date": "2026-01-28T10:30:00.000Z"
    }
  ]
}
```

## Usage

1. **Add Expenses**: Fill in the form with expense details and click "Add Expense"
2. **View History**: Scroll down to see all your expenses listed
3. **Delete Expenses**: Click the trash icon on any expense to remove it
4. **Export Data**: Select a date range and click "Export CSV" to download
5. **Monitor Connection**: Check the top-right corner for database connection status

## Development

To run the server with auto-reload during development:

```bash
npm run dev
```

This uses nodemon to automatically restart the server when you make changes.

## Backup Your Data

Your expense data is stored in `expenses.json`. To back it up, simply copy this file to a safe location.

## Troubleshooting

### Server won't start
- Make sure port 3000 is not already in use
- Check that Node.js is properly installed: `node --version`

### Database connection failed
- Ensure the server is running on http://localhost:3000
- Check browser console for detailed error messages
- Verify file permissions for creating/writing expenses.json

### Data not persisting
- Check that expenses.json exists in the project directory
- Ensure the server has write permissions
- Look for errors in the server console

## License

MIT License - Feel free to use and modify as needed!
