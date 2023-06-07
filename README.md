# RashIO API

## Documentation

- prod: https://www.rashio.software/api/documentation
- beta: https://www.rashio.software/beta/documentation

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
| DELETE | /diseases/{nameDiseases} | Delete a disease description       |
| --     | --                       | --                                 |
| POST   | /articles                | Create an article                  |
| GET    | /articles/{id}           | Get an article                     |
| PUT    | /articles/{id}           | Update an article                  |
| DELETE | /articles/{id}           | Delete an article                  |

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
- [x] GET /predictions/{userId}
- [x] POST /diseases
- [x] GET /diseases/{nameDiseases}
- [x] PUT /diseases/{nameDiseases}
- [x] DELETE /diseases/{nameDiseases}
- [ ] POST /articles
- [ ] GET /articles/{id}
- [ ] PUT /articles/{id}
- [ ] DELETE /articles/{id}

### Deployment

- [x] Integrate with Google Cloud Storage Bucket
- [x] Deploy dev API in GCP
- [ ] Deploy prod API in GCP
- [ ] Deploy ML model in GCP


### Postman Testing

- [x] Feature Users
- [x] Feature Authentications
- [x] Feature Predictions
- [x] Feature Diseases
- [ ] Feature Articles