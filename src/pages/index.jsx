import React from "react";
import ReservationCard from "../components/ReservationCard";

export default function Home() {
  return (
    <div>
      <ReservationCard
        startDate="April 29"
        endDate="April 30"
        propertyName="Marrtiot Internation"
        location="Denver, CO"
        isListed={true}
        imageUrl="https://bit.ly/2Z4KKcF"
      />
    </div>
);
}
