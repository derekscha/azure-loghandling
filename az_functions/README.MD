# Azure Function App

TODO, but roughly:
* Create a skeleton Javascript function triggered from Event Hub
* Copy and paste the contents of az_function.js into the Azure Function
* Copy and paste the contents of package.json into the Azure Function package.json
* install dependencies (glossy). I've lost the Microsoft documentation link I used, but this SO post seems to describe the process: https://stackoverflow.com/questions/36461247/how-can-i-use-package-management-in-nodejs-azure-functions
* You probably want to just let the Function run and write to the context.log to check it is working, then wire up the Cosmos DB output later.
