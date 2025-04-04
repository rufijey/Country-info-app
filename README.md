
This application provides country-related data and allows users to add national holidays to their calendar. It is built using **NestJS** and integrates with external APIs to fetch country details, population data, and flags.  

## Running the Application with Docker  

To start the application using Docker, run the following command in the project root directory:  

```sh
docker-compose up --build
```  

The application will be available at:  
`http://localhost:3000`  

## API Routes  

### Get Available Countries  
**GET** `/countries`  
- Fetches a list of available countries.  

### Get Country Info  
**GET** `/countries/{countryCode}`  
- Retrieves details about a specific country, including border countries, population history, and flag URL.  

### Add Holidays to User Calendar  
**POST** `/users/{userId}/calendar/holidays`  
- Saves selected national holidays for a user.  

#### Request Body:  
```json
{
  "countryCode": "US",
  "year": 2025,
  "holidays": ["New Year's Day", "Independence Day"]
}
```  
