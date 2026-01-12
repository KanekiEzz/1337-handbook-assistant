PG_CONTAINER = pg_db
BACKEND_CONTAINER = backend

up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose build

logs-backend:
	docker-compose logs -f $(BACKEND_CONTAINER)

logs-db:
	docker-compose logs -f $(PG_CONTAINER)

bash-backend:
	docker exec -it $(BACKEND_CONTAINER) bash

bash-db:
	docker exec -it $(PG_CONTAINER) bash


psql:
	docker exec -it $(PG_CONTAINER) psql -U postgres -d postgres

psql-cmd:
ifndef cmd
	$(error cmd is undefined. Usage: make psql-cmd cmd="SELECT * FROM qa;")
endif
	docker exec -it $(PG_CONTAINER) psql -U postgres -d postgres -c "$(cmd)"

tables:
	docker exec -it $(PG_CONTAINER) psql -U postgres -d postgres -c "\dt"

show-q_a:
	docker exec -it $(PG_CONTAINER) psql -U postgres -d postgres -c "SELECT * FROM q_a;"

run-backend:
	docker-compose exec -T $(BACKEND_CONTAINER) uvicorn app:app --host 0.0.0.0 --port 8000 --reload


clean:
	docker system prune -f
	docker volume prune -f
