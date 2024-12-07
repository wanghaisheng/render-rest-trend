# render-rest-trend

This project is a REST API that fetches data from Google Trends using the `google-trends-api` client. It provides several endpoints to get information about trending topics, related queries, interest over time, and more.

The API is built using Deno and can be deployed to platforms such as Render.

## Features

- Fetch **interest over time** for a single or multiple keywords.
- Get **autocomplete** suggestions for search terms.
- Retrieve **daily trends** for a specific region.
- Explore **related queries** and **related topics** based on keywords.
- **Batch processing** for multiple keywords to fetch trends data.

## Installation

### Prerequisites

Before you can run this API, make sure you have:

- Deno installed. If not, you can install it from [deno.land](https://deno.land/).
- Basic understanding of how to work with REST APIs and JSON.

### Clone the Repository

```bash
git clone https://github.com/your-username/google-trends-api-deno.git
cd google-trends-api-deno
```

### Install Dependencies

Deno doesn’t require a package manager like npm, but you can import dependencies directly. In this project, we're using the `google-trends-api` client.

For local development, you can use:

```bash
deno run --allow-net --allow-read server.ts
```

This will start the server with necessary permissions.

### Start the Server

To run the server locally:

```bash
deno run --allow-net --allow-read src/server.ts
```

This will start the API server on the default port `8000`. You can change the port in `src/server.ts`.

## API Endpoints

### 1. Autocomplete (GET `/api/v1/autocomplete`)

**Description**: Fetch autocomplete suggestions for a given keyword.

**Query Parameters**:
- `keyword`: The search term to fetch autocomplete data for (required).

**Example Request**:

```bash
curl "http://localhost:8000/api/v1/autocomplete?keyword=python"
```

**Response**:
```json
{
  "status": "OK",
  "data": { ... }
}
```

---

### 2. Interest Over Time (GET `/api/v1/interest-over-time`)

**Description**: Fetch the interest over time data for a given keyword.

**Query Parameters**:
- `keyword`: The keyword to fetch interest over time data for (required).
- `startTime`: The start date in ISO format (optional, defaults to 1 month ago).

**Example Request**:

```bash
curl "http://localhost:8000/api/v1/interest-over-time?keyword=python&startTime=2023-01-01"
```

**Response**:
```json
{
  "keyword": "python",
  "trendData": { ... }
}
```

---

### 3. Daily Trends (GET `/api/v1/daily-trends`)

**Description**: Fetch daily trending topics for a specific region.

**Query Parameters**:
- `geo`: The region code (default is `US`).

**Example Request**:

```bash
curl "http://localhost:8000/api/v1/daily-trends?geo=US"
```

**Response**:
```json
{
  "status": "OK",
  "data": { ... }
}
```

---

### 4. Related Queries (GET `/api/v1/related-queries`)

**Description**: Fetch related queries for a given keyword.

**Query Parameters**:
- `keyword`: The keyword to fetch related queries for (required).

**Example Request**:

```bash
curl "http://localhost:8000/api/v1/related-queries?keyword=python"
```

**Response**:
```json
{
  "status": "OK",
  "data": { ... }
}
```

---

### 5. Batch Trends (POST `/api/v1/batch-trends`)

**Description**: Fetch trends for multiple keywords in a single request.

**Request Body** (JSON):
```json
{
  "keywords": ["python", "javascript", "react"],
  "startTime": "2023-01-01"
}
```

**Response**:
```json
{
  "results": [
    {
      "keyword": "python",
      "trendData": { ... }
    },
    {
      "keyword": "javascript",
      "trendData": { ... }
    },
    {
      "keyword": "react",
      "trendData": { ... }
    }
  ]
}
```

---

## Project Structure

Here’s a brief overview of the project structure:

```
google-trends-api-deno/
│
├── src/
│   ├── lib/
│   │   └── googleTrendsClient.js    # The Google Trends client functions
│   ├── routes/
│   │   └── trendsRoutes.js          # The API routes for handling Google Trends requests
│   ├── server.ts                    # The main server file to set up and start the API
│
└── README.md                        # Project documentation
```

- **googleTrendsClient.js**: Contains the functions for interacting with the `google-trends-api` client, including fetching data for autocomplete, daily trends, interest over time, etc.
- **trendsRoutes.js**: Defines the API routes such as `/autocomplete`, `/interest-over-time`, and `/batch-trends`.
- **server.ts**: Main entry point for starting the API server, setting up routes, and handling requests.

## Permissions

When running locally, Deno requires the following permissions:
- `--allow-net`: To allow making network requests.
- `--allow-read`: To read from the filesystem (optional based on project needs).

## Deploying to Render

You can deploy this project to Render by following these steps:

1. Push your project to a GitHub repository.
2. Create a new web service on Render.
3. Connect your GitHub repository and configure the build and run commands.

For example:
- **Build Command**: `deno run --allow-net --allow-read src/server.ts`
- **Start Command**: `deno run --allow-net --allow-read src/server.ts`

Render will automatically deploy and run your API.

## Testing

You can test the API using tools like Postman or `curl`. Here’s an example `curl` request to fetch trends for a list of keywords:

```bash
curl -X POST http://localhost:8000/api/v1/batch-trends \
-H "Content-Type: application/json" \
-d '{"keywords": ["python", "javascript", "react"], "startTime": "2023-01-01"}'
```

## Contributions

Feel free to fork this project, make improvements, and submit pull requests. Issues and suggestions are welcome!

## License

MIT License.
