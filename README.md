# azure-website

## Project Overview

This project is built with Craft CMS 5, Alpine.js, Tailwind CSS 3, and Gulp, aiming to provide a robust and flexible foundation for web development. Craft CMS empowers content creators with a user-friendly interface while offering developers a powerful framework for building dynamic websites. Alpine.js enhances interactivity on the client-side with its lightweight and reactive JavaScript framework. Tailwind CSS provides utility-first styling, enabling rapid development and easy customization. Gulp automates tasks such as compiling SCSS, minifying JavaScript, and optimizing assets, streamlining the development process.

## Requirements

- Node.js (18.20.1)
- Gulp CLI (`npm install -g gulp-cli`)
- Craft CMS 5 (installation instructions available [here](https://craftcms.com/docs/3.x/installation.html))
- PHP (8.2)

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd <project-directory>
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up Craft CMS 5 according to the [official documentation](https://craftcms.com/docs/3.x/installation.html).

5. Configure your environment variables, database settings, and other configurations as needed for your Craft CMS installation.

## Usage

### Development

To start the development server, run:

```bash
npm run dev
```

This command will compile SCSS files, bundle JavaScript with Gulp, watch for changes, and start a development server.

### Production

For production builds, run:

```bash
npm run prod
```

This command will compile and optimize assets for production deployment, including minification, concatenation, and revisioning for cache-busting.

## Structure

The project follows a standard directory [structure](https://craftcms.com/docs/5.x/system/directory-structure.html)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README to fit your project's specific requirements and preferences. Happy coding!