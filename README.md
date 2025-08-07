# EmuMon - ROM Emulation Manager

<div align="center">
  <img src="src/renderer/src/assets/icon.ico" alt="EmuMon Logo" width="100">
  <p><strong>A comprehensive ROM emulation manager built with Electron, React, and TypeScript</strong></p>
</div>

## 🎮 Overview

EmuMon is a modern, cross-platform ROM emulation manager that simplifies discovering, downloading, and playing retro games. It provides a unified interface for managing emulators and ROMs across multiple gaming consoles, with support for popular ROM sources and automatic emulator setup.

## ✨ Features

### 🎯 Core Features
- **Multi-Console Support**: Supports PSP, PS2, PS3, GBA, NDS, 3DS, Wii, and GameCube
- **ROM Discovery**: Browse and search ROMs from multiple sources (HexRom, RomsPedia)
- **Automatic Downloads**: High-speed parallel downloading with aria2c integration
- **Emulator Management**: Automatic emulator downloading and installation
- **Local Library**: Organize and launch your downloaded ROMs
- **Cross-Platform**: Available for Windows, macOS, and Linux

### 🔧 Supported Emulators
| Console | Emulator(s) | Supported Formats |
|---------|-------------|-------------------|
| **PSP** | PPSSPP | `.iso`, `.cso` |
| **PS2** | PCSX2 | `.iso`, `.cso` |
| **PS3** | RPCS3 | `.iso` |
| **GBA** | mGBA | `.gba`, `.gbc`, `.gb`, `.ips` |
| **NDS** | DeSmuME, melonDS | `.nds` |
| **3DS** | Citra | `.3ds`, `.cia` |
| **Wii/GameCube** | Dolphin | `.iso`, `.gcz`, `.wbfs`, `.wad`, `.gcm` |

### 🌐 ROM Sources
- **HexRom**: Large collection of ROMs with detailed metadata
- **RomsPedia**: Alternative ROM source with extensive catalog
- **Search Functionality**: Search across all sources simultaneously

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **pnpm** package manager
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/emumon.git
   cd emumon
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Development mode**
   ```bash
   pnpm dev
   ```

4. **Build for production**
   ```bash
   # For Windows
   pnpm build:win

   # For macOS
   pnpm build:mac

   # For Linux
   pnpm build:linux
   ```

## 🛠️ Technology Stack

### Frontend
- **Electron** - Cross-platform desktop application framework
- **React 19** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Zustand** - Lightweight state management

### Backend & Core
- **Node.js** - Runtime environment
- **Electron Store** - Persistent data storage
- **aria2c** - High-performance download manager
- **Cheerio** - Server-side DOM manipulation for web scraping
- **Axios** - HTTP client for API requests

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **electron-builder** - Application packaging

## 📱 Application Structure

### Main Sections
1. **Library** - View and launch your downloaded ROMs
2. **ROMs** - Browse ROM sources (HexRom, RomsPedia)
3. **Emulators** - Manage emulator installations
4. **Settings** - Configure download paths and preferences

### Key Directories
```
src/
├── main/                    # Electron main process
│   ├── download/           # ROM and emulator download logic
│   ├── emulators/          # Emulator configuration and management
│   ├── extensions/         # ROM source integrations
│   │   ├── hexrom/        # HexRom API integration
│   │   └── romspedia/     # RomsPedia API integration
│   ├── launch/            # ROM launching functionality
│   ├── lib/aria2/         # Download manager
│   └── store/             # Data persistence
├── renderer/               # Frontend React application
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Application pages
│       ├── store/         # Frontend state management
│       └── types/         # TypeScript type definitions
└── preload/               # Electron preload scripts
```

## 🎮 Usage Guide

### 1. First-Time Setup
1. Launch EmuMon
2. Go to **Settings** and configure your download path
3. Visit the **Emulators** section to download required emulators

### 2. Finding and Downloading ROMs
1. Navigate to the **ROMs** section
2. Choose a ROM source (HexRom or RomsPedia)
3. Browse by console or use the search feature
4. Click on a ROM to view details and download options
5. Downloads will appear in the **Settings** section

### 3. Playing Games
1. Once a ROM is downloaded, it appears in your **Library**
2. Click on any ROM to launch it with the appropriate emulator
3. The application automatically detects the correct emulator based on file type

### 4. Managing Emulators
- View installed emulators in the **Emulators** section
- Download new emulators as needed
- Each emulator is automatically configured for optimal performance

## ⚙️ Configuration

### Emulator Configuration
Emulators are automatically configured via `src/main/emulators/emulators.json`:
- Download URLs for latest versions
- Supported file extensions
- Launch parameters

### ROM Source Extensions
New ROM sources can be added by creating extensions in `src/main/extensions/`:
- Console listing
- ROM browsing and searching
- Download URL extraction
- Metadata parsing

## 🔧 Development

### Project Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm typecheck    # TypeScript type checking
```

### Adding New Features

#### Adding a New ROM Source
1. Create a new directory in `src/main/extensions/`
2. Implement the required functions:
   - `getConsoles()` - List available consoles
   - `getRoms()` - Get ROMs for a console
   - `searchRoms()` - Search functionality
   - `getRomDetails()` - Get detailed ROM information
   - `getDownloadUrls()` - Extract download links

#### Adding a New Emulator
1. Update `src/main/emulators/emulators.json`
2. Add console mapping in `src/main/mappings/consoleMap.ts`
3. Include emulator icon in `src/renderer/src/assets/emulators/`

### Architecture Notes
- **IPC Communication**: Main process communicates with renderer via Electron IPC
- **Data Flow**: React Query manages API calls to ROM sources
- **Storage**: Electron Store persists ROM library and emulator data
- **Downloads**: aria2c handles parallel downloading with progress tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code consistency
- Write meaningful commit messages
- Test your changes across different platforms

## 📄 License

This project is licensed under the ISC License. See the `LICENSE` file for details.

## 🙏 Acknowledgments

- **aria2** - For high-performance downloading
- **Emulator Communities** - For creating amazing emulators
- **ROM Preservation Groups** - For keeping gaming history alive
- **Open Source Contributors** - For the tools and libraries that make this possible

## 🐛 Troubleshooting

### Common Issues

**Downloads not starting:**
- Check your internet connection
- Verify download path in Settings
- Ensure aria2c is properly installed

**Emulator won't launch:**
- Verify emulator is properly downloaded
- Check ROM file format compatibility
- Ensure ROM file isn't corrupted

**ROMs not appearing in Library:**
- Verify download completed successfully
- Check if ROM format is supported by emulator
- Refresh the Library page

## 📞 Support

For support and questions:
- Open an issue on GitHub
- Check the troubleshooting section
- Review existing issues for solutions

---

<div align="center">
  <p>Made with ❤️ for the retro gaming community</p>
</div>