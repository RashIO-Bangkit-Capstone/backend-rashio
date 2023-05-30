# RashIO API

## Documentation

http://34.128.112.254/documentation

## Endpoints

| Method | Endpoint                 | Description                        |
| ------ | ------------------------ | ---------------------------------- |
| GET    | /                        | Hello world                        |
| GET    | /documentation           | Documentation                      |
| --     | --                       | --                                 |
| POST   | /users                   | Create a user (register)           |
| GET    | /users/{id}              | Get user data                      |
| PUT    | /users/{id}              | Update user data                   |
| PUT    | /users/{id}/password     | Update user password               |
| --     | --                       | --                                 |
| POST   | /authentications         | Create a session (login)           |
| PUT    | /authentications         | Update a session (refresh token)   |
| DELETE | /authentications         | Delete a session (logout)          |
| --     | --                       | --                                 |
| POST   | /predictions             | Create a prediction (upload image) |
| GET    | /predictions/{userId}    | Get log predictions from a user    |
| --     | --                       | --                                 |
| GET    | /diseases/{nameDiseases} | Get disease description            |
| POST   | /diseases                | Create a disease description       |
| PUT    | /diseases/{nameDiseases} | Update a disease description       |

## Checklist

### Endpoints

- [x] GET /
- [x] POST /users
- [x] GET /users/{id}
- [x] PUT /users/{id}
- [x] PUT /users/{id}/password
- [x] POST /authentications
- [x] PUT /authentications
- [x] DELETE /authentications
- [x] POST /predictions
- [ ] GET /predictions/{userId}
- [ ] GET /diseases/{nameDiseases}
- [ ] POST /diseases
- [ ] PUT /diseases/{nameDiseases}

### Deployment

- [x] Deploy dev API in GCP
- [ ] Deploy prod API in GCP
- [ ] Deploy ML model in GCP
