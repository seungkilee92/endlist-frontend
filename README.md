# Endlist

A collaborative playlist application created using electron, elm, and phoenix.

## Frontend Development

Make sure dependencies are up to date:

  * `npm install`

Hot reloading has only been partially set up so for now, use manual builds:

  * Compile files using webpack with `npm run build`
  * Start electron application in development mode with `npm run dev`

## Backend Development

The API is set up as an elixir umbrella app with different functions separated into
different apps. Ecto and database schema definitions are organized into the appropriate
apps rather than isolated as a database app.

To set up the Postgres DB:

  * Create the postgres container with 
    `docker run --name endlist-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=endlist_dev -d postgres`

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Start Phoenix endpoint with `mix phx.server`

The API will be available from [`localhost:4000`](http://localhost:4000)
