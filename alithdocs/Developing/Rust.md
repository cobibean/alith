Developing
This section provides instructions for setting up the development environment for the Alith SDK and contributing to the project.

Prerequisites
Install Rust using rustup :
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
Clone the Repository
git clone https://github.com/0xLazAI/alith.git
cd alith
Build the SDK
To build the Rust SDK, run:

make check
Run Tests
To run the test suite:

make test
Format Code
Ensure your code follows Rust’s formatting standards:

make fmt
Linting
Use Clippy to catch common mistakes and improve code quality:

make clippy
Contributing
Fork the repository and create a new branch for your changes.
Submit a pull request with a detailed description of your changes.
