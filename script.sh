if [ ! -d "/app/uploads" ]; then
    mkdir -p /app/uploads
fi

if [ ! -d "/app/uploads/articles" ]; then
    mkdir -p /app/uploads/articles
fi

if [ ! -d "/app/uploads/predictions" ]; then
    mkdir -p /app/uploads/predictions
fi

npm run db:migrate && npm run start
