FROM postgres
COPY ./sql/schemas.sql /docker-entrypoint-initdb.d/