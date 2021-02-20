import React from "react";

// connect to MongoDB through the MongoClient's connect method
const connectionString =
  "mongodb+srv://Austyn:1234@cluster0.8jq7o.mongodb.net/dataForWebAppDatabase?retryWrites=true&w=majority";

export default function Index() {
  return (
    <div>
      <h1> Upcoming Events</h1>
      <ul>
        <li>
          <a href="/eventsPage">Events Page </a>
        </li>
        <li> Personal Page / Create an Event Page</li>
        <li>
          <a href="/createAnEvent">Create an Event Page</a>
        </li>
      </ul>
    </div>
  );
}
