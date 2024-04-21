const AppRouter = require('./middleware/AppRouter');
const ErrorMiddleware = require('./middleware/ErrorMiddleware');

class App {
    express;
    dotenv;
    port;
    app;
    errorMiddleware;

    constructor() {
        // Initialize server dependencies
        this.express = require('express');
        this.dotenv = require('dotenv').config();
        this.port = process.env.PORT || 5000;
        this.errorMiddleware = new ErrorMiddleware();
        this.app = this.express();
    }

    // Configure and run server
    run = () => {
        this.app.use(this.express.json());

        // Default route for server health check
        this.app.get('/api/healthcheck', (req, res) => {
            res.sendStatus(200);
        })

        this.app.use('/api', new AppRouter().router);
        // Custom error handling middleware override
        this.app.use(this.errorMiddleware.errorHandler);

        // Start listening
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        })
    }
}

new App().run();
