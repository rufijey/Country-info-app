
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

#### Response Example:  

[
  { "countryCode": "US", "name": "United States" },
  { "countryCode": "FR", "name": "France" }
]

### Get Country Info  
**GET** `/countries/{countryCode}`  
- Retrieves details about a specific country, including border countries, population history, and flag URL.  

#### Response Example:  

{
  "borders": ["FR", "DE"],
  "population": [{ "year": 2020, "population": 67000000 }],
  "flag": "https://example.com/flag.png"
}


### Add Holidays to User Calendar  
**POST** `/users/{userId}/calendar/holidays`  
- Saves selected national holidays for a user.  

#### Request Body:  

{
  "countryCode": "US",
  "year": 2025,
  "holidays": ["New Year's Day", "Independence Day"]
}


#### Response Example:  

{ "message": "Holidays added successfully" }


This setup ensures that all required services run smoothly using Docker while providing a clear API structure for retrieving country information and managing user holiday data.
