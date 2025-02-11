#!/bin/sh

# wait-for-postgres.sh

set -e

host="$1"
shift
port="$1"
shift
cmd="$@"

until PGPASSWORD=$DB_PASSWORD psql -h "$host" -U "$DB_USER" -p "$port" -d "$DB_NAME" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd
