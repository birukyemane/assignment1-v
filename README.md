## Assignment 1

check it out [live!](https://competent-mirzakhani-893cdc.netlify.com/)

# Features

    * Show the stations on map 
        * the app uses the endpoint /stations to show the stations on the map

    * Adjust the map to current location
        * recenter is to Helsinki center 

    * Show the stations’ status on the map
        * the app uses the endpoint /stations/status to show the stations’ status on the map
        * the simple logic used is, we check only the first EVSE's status. This can be corrected if its wrong, it 
          was not obvious from the requirements. The problem is, there are more than one EVSE per a station ID and each could have differnt status. There was no sufficient info how to determine the status.
        * the data from /stations and /stations/status end-points are combined. i.e the status data is added to each station. 

    * When clicking on individual station the app shows more info about the station 
        * the app uses /stations/<station ID> endpoint
        * the data is fetched from the endpoint only when user selected a marker on the map 
        * only the first connector of the EVSE's info is used to get additonal info such as max kwh, type etc. This can         easily be extended if neccessary.        

# Technologies

    * React
    * Goolge maps API 
