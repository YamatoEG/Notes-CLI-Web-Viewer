# 📘 Notes CLI & Web Viewer

A simple and extendable Node.js application that allows users to create, read, filter, and delete notes through a command-line interface or a lightweight web server. Notes are stored persistently in a local JSON database.

---

## 🚀 Features

- ✅ Add new notes with optional tags
- 📚 List all notes in the terminal
- 🔍 Filter notes by content
- 🗑️ Remove notes by ID or clear all
- 🌐 Launch a local web server to view notes
- 🧪 Unit and mock tests using Jest

---

## 📁 Project Structure
```
├── node_modules/ # Project dependencies
├── src/
│ ├── command.js # CLI commands using Yargs
│ ├── notes.js # Note management logic
│ ├── db.js # JSON file-based DB utilities
│ ├── server.js # Web server for viewing notes
│ ├── template.html # HTML template for note rendering
│ ├── style.css # Styling for the web viewer
│ └── utilis.js # Utility for listing notes in CLI
├── test/
│ ├── unit/ # Unit tests
├── app.js # App entry point
├── db.json # Local JSON database
└── README.md
```
---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)

### Installation

```bash
git clone https://github.com/YamatoEG/Notes-CLI-Web-Viewer.git
cd notes-cli-web
npm install

📟 CLI Usage
Add a new note
node app.js new "This is a note" --tags=work,urgent
View all notes

```bash
node app.js all
```
Filter notes
```bash
node app.js find "keyword"
```
Remove a note by ID
```bash
node app.js remove 123456789
```
Clear all notes
```bash
node app.js clean
```
🧪 Running Tests
To run unit and mock tests using Jest:
```
npm test
```
It opens http://localhost:5000 in your browser showing all notes styled via style.css.

📌 Technologies Used
* Node.js (ES Modules)

* Yargs (for CLI)

* HTTP Module (for web server)

* Open (auto-opens browser)

* Jest (for testing)

🤝 Contribution
* Pull requests are welcome! If you'd like to add features or improve the project, please fork it and submit a PR.

📄 License
 * This project is open source and available under the MIT License.

✍️ Author
 * Developed by Ahmad Mahmoud.