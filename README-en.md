# Character Idea Generator

A web-based tool for generating random character ideas for creative projects, games, writing, and more.

## Features

- Create custom character properties (race, hair style, weapon, etc.)
- Add multiple options for each property
- Specify how many options to pick from each property
- Generate multiple character ideas at once
- Import/Export character properties as JSON
- Dark/Light theme support
- Multi-language support (English/Traditional Chinese)
- Collapsible sections and property items
- Save generated ideas as a text file

## How to Use

1. Add properties by entering a name (e.g., "Race", "Hair Style", "Weapon") and clicking "Add Property"
2. For each property, add options (e.g., for Race: "Human", "Elf", "Orc")
3. Set how many options to pick per property (e.g., pick 2 hair styles)
4. Set how many characters to generate
5. Click "Generate Ideas" to create random character combinations
6. Use the "Save Results" button to download your ideas as a text file
7. Use "Display JSON" to export your properties or "Paste JSON" to import existing configurations

## JSON Sample

You can import/export character properties using JSON format. Here's a sample structure, or you can refer to our [sample.json](./sample.json) file:

```json
[
  {
    "id": "property-race-1234567890",
    "name": "Race",
    "options": [
      {
        "id": "option-human-1234567891",
        "text": "Human"
      },
      {
        "id": "option-elf-1234567892",
        "text": "Elf"
      },
      {
        "id": "option-dwarf-1234567893",
        "text": "Dwarf"
      },
      {
        "id": "option-orc-1234567894",
        "text": "Orc"
      }
    ],
    "optionsToGenerate": 1
  },
  {
    "id": "property-class-1234567895",
    "name": "Class",
    "options": [
      {
        "id": "option-warrior-1234567896",
        "text": "Warrior"
      },
      {
        "id": "option-mage-1234567897",
        "text": "Mage"
      },
      {
        "id": "option-rogue-1234567898",
        "text": "Rogue"
      },
      {
        "id": "option-cleric-1234567899",
        "text": "Cleric"
      }
    ],
    "optionsToGenerate": 1
  },
  {
    "id": "property-weapon-1234567900",
    "name": "Weapon",
    "options": [
      {
        "id": "option-sword-1234567901",
        "text": "Sword"
      },
      {
        "id": "option-bow-1234567902",
        "text": "Bow"
      },
      {
        "id": "option-staff-1234567903",
        "text": "Staff"
      },
      {
        "id": "option-dagger-1234567904",
        "text": "Dagger"
      }
    ],
    "optionsToGenerate": 2
  }
]
```

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript (ES6+)
- Webpack (for building and development)
- Local Storage for data persistence

## Development Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd idea-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Commands

- **Development mode** (with hot reload):
  ```bash
  npm run serve
  ```
  This starts the development server and opens the application in your browser.

- **Build for development**:
  ```bash
  npm run dev
  ```

- **Build for production**:
  ```bash
  npm run build
  ```

- **Watch mode** (auto-rebuild):
  ```bash
  npm run watch
  ```

- **Clean build files**:
  ```bash
  npm run clean
  ```

### Project Structure

## Deployment

This project is designed to be easily deployed on GitHub Pages:

1. Fork or clone this repository
2. Enable GitHub Pages in your repository settings
3. Select the main branch as the source

## Local Development

To run this project locally:

### Option 1: Simple File Opening
1. Clone the repository
2. Open the `index.html` file directly in your browser

### Option 2: Using a Local Server (Recommended)
For better development experience and to avoid potential CORS issues:

1. Clone the repository
2. Install Node.js if you haven't already
3. Install a simple HTTP server:
   ```bash
   npm install -g http-server
   ```
4. Navigate to the project directory and start the server:
   ```bash
   cd idea-generator
   http-server
   ```
5. Open your browser and go to `http://localhost:8080`

### Alternative Local Server Options
- **Using Python 3**: `python -m http.server 8000`
- **Using Python 2**: `python -m SimpleHTTPServer 8000`
- **Using PHP**: `php -S localhost:8000`
- **Using Live Server (VS Code Extension)**: Install the Live Server extension and right-click on `index.html` → "Open with Live Server"

## License

MIT License

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.