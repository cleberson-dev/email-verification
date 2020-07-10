# Email Verification com Redis

Webapp oferecendo verificação de email sob registro por token enviado à caixa de entrada. 

Vale menção o uso de **Redis** como 'message queue', **Docker Engine e Docker Compose** para containerização e orquestração dos containers de banco de dados relacional, Redis e da aplicação Web, como também **Prisma** sendo a camada de acesso aos dados do banco **PostgreSQL**.



## Uso

Como a aplicação é containerizada, é somente necessário:

- [Docker Engine](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

Para usuários Windows e macOS, é preciso instalar somente [Docker Desktop](https://docs.docker.com/desktop/), pois já inclui Docker Engine, Docker Compose como outras ferramentas.

Uma vez satisfeito os requerimentos, execute na linha de comandos:

``````bash
docker-compose up
``````

Pronto! O servidor Web estará escutando por requisições na porta 5000.



### Aplicação

### Endpoints

- GET `/users` - Lista todos os usuários persistidos no banco
- POST`/users` - Registrar usuário na aplicação
- GET `/confirm-email` - Confirmar email registrado na aplicação
  - Parâmetros de consulta:
    - `?token` : Token entregue ao email para verificação.
- GET `/` - Um 'Hello World' no formato JSON.

