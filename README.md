# VS Code-Themed Profile Site

A modern, interactive portfolio website styled after Visual Studio Code. This project showcases professional experience, technical skills, and projects in a familiar IDE interface that developers will appreciate.

## Features

- **VS Code Interface**: Complete with Explorer, Tabs, and Editor panels
- **Interactive Components**: Expandable sections, collapsible folders, and tab management
- **Responsive Design**: Fully mobile-responsive layout
- **Markdown Rendering**: Dynamic rendering of markdown content with syntax highlighting
- **Mermaid Diagrams**: Support for rendering mermaid diagrams in markdown
- **Python Playground**: Embedded code editor with Python execution capabilities
- **Dynamic Content**: Site content is loaded from JSON data files for easy updates

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Markdown**: React Markdown with highlight.js for syntax highlighting
- **Diagrams**: Mermaid for technical diagrams
- **Code Editor**: Monaco Editor with Pyodide for Python execution
- **Deployment**: Docker, Nginx, AWS (via Terraform)

## Development

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/aashishshenoy/aash-profile-vsc.git
cd aash-profile-vsc

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at http://localhost:5173

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build locally
npm run preview
```

### Docker Deployment

This project includes a multi-stage Dockerfile for efficient production deployment:

```bash
# Build the Docker image
docker build -t aashish-profile:local .

# Run the container
docker run -d -p 8080:80 --name aashish_local_run aashish-profile:local
```

The site will be available at http://localhost:8080

## Project Structure

```
├── public/               # Static assets
├── src/
│   ├── assets/           # Application assets
│   ├── component/        # React components
│   │   ├── code/         # Code-related components
│   │   ├── common/       # Shared components
│   │   ├── content/      # Content display components
│   │   ├── mobile/       # Mobile-specific components
│   │   └── tabs/         # Tab system components
│   ├── context/          # React context providers
│   ├── data/             # Data files
│   │   ├── images/       # Image assets
│   │   ├── json/         # JSON data files
│   │   └── markdown/     # Markdown content
│   └── types/            # TypeScript type definitions
├── Dockerfile            # Multi-stage build for production
├── nginx.conf            # Nginx configuration for Docker
└── vite.config.ts        # Vite configuration
```

## Customization

The site content is primarily controlled through the `src/data/json/site-data.json` file. Edit this file to update:

- Personal information and links
- Skills and expertise
- Work experience and education
- Project details
- Explorer structure and content

Markdown content can be added or modified in the `src/data/markdown/` directory.

## Infrastructure

The production deployment uses:

- AWS for hosting
- Terraform for infrastructure as code
- GitHub Actions for CI/CD
- Docker for containerization

## License

MIT

## Acknowledgments

- Initial VS Code theme inspiration from [YouTube tutorial](https://www.youtube.com/watch?v=w2Gsvu8QdlU)
- All advanced features and current architecture developed independently
