#!/bin/bash

dbready=/database/.pokemon-db-ready

echo "Starting entrypoint.sh"
cd app

if [ -e "$dbready" ]; then
    echo "Database is already initialized"
else
    while true; do
        npx prisma migrate dev
        if [ $? -eq 0 ]; then
            break
        fi
        echo "Retrying connecting to database"
        sleep 1
    done

    npx prisma db seed \
    && touch "$dbready" \
    && echo "Initalization of database complete"
fi


if [ -e "$dbready" ]; then
    npm i -g nodemon ts-node && npm i && nodemon --watch ./src --ext ts,yaml ./src/app.ts
fi

