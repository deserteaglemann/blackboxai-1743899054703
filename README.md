
Built by burnt cheese

---

```markdown
# CLOD - DJ Request Management System

## Project Overview
CLOD is a web-based DJ Request Management System designed to facilitate user interactions with DJs for song requests during events. The platform allows DJs to manage their events, while users can submit song requests through a sleek UI. The system is built using a combination of HTML, CSS (Tailwind CSS), and JavaScript, with a Node.js backend.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/clod-app.git
   cd clod-app
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env` file in the root directory and populate it with necessary configurations (as required by your application).

4. Start the server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the app.

## Usage
The CLOD application has multiple functionalities including:

- **DJ Login**: DJs can log in to manage their events.
- **Event Creation**: DJs can create and manage events which generate QR codes for attendees.
- **Song Requests**: Users can submit song requests and pay according to the request type (standard, fast track, VIP).

### Example Flow
1. **Log in as a DJ**: Enter your DJ name and password in the DJ Login form.
2. **Create an Event**: Fill out the event details, including name, date, time, and venue.
3. **Submit Requests**: Attendees access the event QR code to submit their song requests.

## Features
- **Dynamic UI**: Responsive design with Dark Mode support.
- **User Authentication**: Simple login mechanism for DJs.
- **Event Management**: DJs can create and manage multiple events.
- **Song Request System**: Users can submit and pay for song requests based on tiers (Standard, Fast Track, VIP).
- **QR Code Integration**: Each event generates a QR code for ease of access to requests.

## Dependencies
This project relies on the following packages (listed in `package.json`):

- `body-parser`: ^1.20.2
- `cors`: ^2.8.5
- `dotenv`: ^16.3.1
- `express`: ^4.18.2
- `qrcode-generator`: ^1.4.4
- Development utility:
  - `nodemon`: ^3.0.2

To install these dependencies, simply run `npm install`.

## Project Structure
```
clod-app/
├── index.html              # Main landing page for the app
├── create-event.html       # Event creation page
├── listener.html           # Page for song requests
├── admin-panel.html        # Admin interface for managing requests
├── scripts.js              # Main JavaScript logic for the app
├── package.json            # Project metadata and dependencies
└── ...                     # Other configurations and resource files
```

## License
This project is licensed under the MIT License. For more details, please see the LICENSE file.
```
