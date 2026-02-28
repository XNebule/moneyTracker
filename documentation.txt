MoneyTracker Documentation & Progress

BACK-END

# Feb, 27 2026 - Day 1 - Status: Completed

GOAL: Understanding [server, routes, controllers, services, databases]

Server: Is the core for all of the function to work. In server we use expressJs as middleware to define routes(API Endpoints), Handle HTTP Requests(Get, Post, etc) and sending back the response to clients

based on that defintion i know that to operate website thru front-end, it must be passed request from user/client side to server and sending the response back. But not that simple, before it arrives back to users/client side it goes thru routes, controllers, services, and databases

routes concept:
- app.get() = used when the client wants to retrieve data.

    example:

    app.get('/api/expenses', async (req, res, next) => {
        const result = await client.query(
            "SELECT * FROM expenses"
        )
        res.json(result.rows)
    })
    this returns expenses data from databases

- app.post() = used when the client wants to create new data

    example:
    app.post('/api/expenses', async (req, res, next) => {
        const result = await client.query(
            "INSERT INTO expenses (title, amount) VALUES ($1, $2) RETURNING *", [title, amount]
        )
        res.status(201).json(result.rows[0])
    })

    The Client sends a JSON body like:

    {
        "title": "Coffee",
        "amount": "20000"
    }

    The servers inserts it into the expenses database and returns the created row

Flow of request:
    Client -> Express(server) -> Pgsql(Database) -> Back to Express(server) -> Response to client Requests

# Feb, 28 2026 - Day 2 - Status: Completed

GOAL: Implement [Update, Delete] on routes architecture, Implement users' Credential registration and login

routes concept:
- app.put() = used when the client wants to update data

    example:

        app.put('/api/expenses/:id', async (req, res, next) => {
        const result = await client.query(
            "UPDATE expenses SET title = $1, amount = $2 WHERE id = $3 AND user_id = $4 RETURNING *", [title, amount, id, userId]
        )
        res.json(result.rows)
    })
    this update expenses [title, amount] data base on the user_id that logged in

- app.delete() = used when the client wants to delete data\

    example:

        app.delete('/api/expenses/:id', async (req, res, next) => {
            const result = await client.query("DELETE FROM expenses WHERE id = $1 RETURNING *", [id],
            );
            return result.rows[0];
        })
        this will delete expenses data(with specific id that retrieve from database)

Registed/Login credential implementation:
    More or less the system are the same as expenses system, it requires [routes, controller, services, databases, middleware(to handle error/hack)]

- for controller explanation see /src/controller/loginController.js||regisController.js
- for service explanation see /src/services/usersServices.js
- for middleware explanation see /src/middleware/authMW.js
- for routes explanation see /src/routes/users.js