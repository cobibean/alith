Developing
This section provides instructions for setting up the development environment for the Alith SDK and contributing to the project.

Prerequisites
Install Python  (v3.8 or higher).
Install Cargo  (for Rust code).
Clone the Repository
git clone https://github.com/0xLazAI/alith.git
cd alith
Set Up a Virtual Environment
Create and activate a virtual environment:

python3 -m venv venv
source venv/bin/activate
Install Maturin
Install maturin to build the Python bindings:

cargo install maturin
Build the SDK
Build the Python SDK:

maturin develop
Run Tests
Run the test suite:

python3 -m pytest
Contributing
Fork the repository and create a new branch for your changes.
Submit a pull request with a detailed description of your changes.