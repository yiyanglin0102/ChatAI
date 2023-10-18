# OpenAI Chat Application

A simple web-based chat interface that communicates with OpenAI's GPT-4 model. Experience conversational AI firsthand at [chat.yiyanglin.com](http://chat.yiyanglin.com).

## Features

- Real-time chat interface with AI.
- Serverless architecture using Netlify Functions.
- Mobile responsive design for chat on the go.

## Prerequisites

- [Netlify CLI](https://www.netlify.com/products/dev/)
- [Node.js](https://nodejs.org/)
- An OpenAI API key.

## Setup & Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/openai-chat.git
   cd openai-chat
   ```
### Install Dependencies

`npm install`

### Environment
Create a `.env` file in the root directory and add your OpenAI API key:

```bash
OPENAI_API_KEY=YOUR_API_KEY_HERE
```
Note: Ensure you have the `.env` file listed in your `.gitignore` so that it doesn't get committed.

### Run Locally
Start the development server:

```bash
netlify dev
```
Visit `http://localhost:8888` to view the chat application.


## Deployment

1. **Connect your GitHub repository to [Netlify](https://www.netlify.com/).**

2. **Set your environment variables on the Netlify dashboard.**

3. **Deploy your site.**

## Tech Stack

- Frontend: Vanilla HTML, CSS, and JavaScript.
- Backend: Netlify Functions with Axios for API requests.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
Feel free to modify any parts to better suit your needs or the specifics of your project!
