#!/bin/bash

dbready=/database/.pokemon-db-ready

echo "Starting entrypoint.sh"
cd app

if [ -e "$dbready" ]; then
    echo "Database is already initialized"
else
    npx prisma migrate dev \
    && npx prisma db seed \
    && touch "$dbready" \
    && echo "Initalization of database complete"
fi

npm run dev
#npm i -g nodemon ts-node && npm i && nodemon --watch ./src --ext ts,yaml ./src/app.ts

