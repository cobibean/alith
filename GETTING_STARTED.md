# Getting Started with Alith (macOS)

This guide will help you set up and start developing with the Alith framework on macOS.

## Prerequisites

Ensure you have the following installed on your Mac:

```bash
# Check if you have Homebrew installed
which brew || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install required tools
brew install rust
brew install node
brew install python@3.11
brew install git
```

## Environment Setup

1. **Clone your fork** (if starting fresh):
```bash
mkdir -p ~/DEV/alith-fresh
cd ~/DEV/alith-fresh
git clone https://github.com/cobibean/alith .
```

2. **Set up environment variables**:
```bash
# Create .env file
cat > .env << 'EOL'
# OpenAI API Key (required for GPT models)
export OPENAI_API_KEY=your_key_here

# Add other API keys as needed
# export ANTHROPIC_API_KEY=your_key_here
# export HUGGINGFACE_API_KEY=your_key_here
EOL

# Load environment variables
source .env
```

3. **Build the core framework**:
```bash
# Build Rust components
cargo build --release

# Install Node.js SDK dependencies
cd sdks/node
npm install
npm run build
cd ../..

# Install Python SDK (if needed)
cd sdks/python
pip3 install -e .
cd ../..
```

## Project Structure

```
alith-fresh/
├── alithTGBot/         # Telegram bot implementation
├── alithdocs/          # Documentation
├── crates/             # Core Rust implementations
├── sdks/               # Language-specific SDKs
├── integrations/       # Integration examples
└── website/           # Documentation website
```

## Development Workflow

### 1. Starting a New Feature

```bash
# Create a new branch
git checkout -b feature/your-feature-name

# Make your changes
# ...

# Commit changes
git add .
git commit -m "Description of your changes"

# Push to your fork
git push origin feature/your-feature-name
```

### 2. Keeping Updated

```bash
# Add upstream if you haven't
git remote add upstream https://github.com/0xLazAI/alith

# Sync with upstream
git fetch upstream
git merge upstream/main
```

### 3. Running Tests

```bash
# Run Rust tests
cargo test

# Run Node.js tests (if applicable)
cd sdks/node
npm test
cd ../..

# Run Python tests (if applicable)
cd sdks/python
python -m pytest
cd ../..
```

## Telegram Bot Development

If you're working on the Telegram bot:

```bash
# Navigate to bot directory
cd alithTGBot

# Install dependencies
npm install

# Start the bot in development mode
npm run dev
```

## Common Tasks

### Building Documentation

```bash
# Navigate to docs
cd alithdocs

# If using mdbook (install if needed)
brew install mdbook
mdbook build
mdbook serve
```

### Updating Dependencies

```bash
# Update Rust dependencies
cargo update

# Update Node.js dependencies
cd alithTGBot
npm update
cd ..

# Update Python dependencies
cd sdks/python
pip3 install --upgrade -r requirements.txt
cd ../..
```

## Troubleshooting

### Common Issues

1. **Rust Build Failures**
   ```bash
   # Clean and rebuild
   cargo clean
   cargo build --release
   ```

2. **Node.js Native Module Issues**
   ```bash
   # Rebuild native modules
   cd sdks/node
   npm rebuild
   cd ../..
   ```

3. **Permission Issues**
   ```bash
   # Fix permissions
   chmod +x sdks/node/alith.darwin-x64.node
   ```

### Getting Help

- Check the documentation in `/alithdocs`
- Join [Telegram](t.me/alithai)
- Follow [X/Twitter](https://x.com/0xalith)
- Review [Issues](https://github.com/0xLazAI/alith/issues)

## IDE Setup

### VSCode
1. Install recommended extensions:
   - rust-analyzer
   - Node.js extension
   - Python extension
   - GitLens

2. Workspace settings:
   ```json
   {
     "rust-analyzer.checkOnSave.command": "clippy",
     "editor.formatOnSave": true
   }
   ```

## Next Steps

1. Review the [Introduction](alithdocs/Introduction.md)
2. Check out [Tutorials](alithdocs/Tutorials/)
3. Explore [Features](alithdocs/Features/)
4. Join the community on [Telegram](t.me/alithai)

## License

This project is licensed under Apache 2.0. See the [LICENSE](LICENSE) file for details. 