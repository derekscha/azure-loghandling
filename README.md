# azure-loghandling

This is a simple collection of things to create a log collection system in Microsoft Azure.

The motivation behind this is to avoid building anything from scratch and use existing software and Azure Platform as a Service (PaaS) services as far as possible to create a log collection system using Azure to store and index the logs.

## Why?

Not sure really... fun? You'll see that at the end of this you can have something simple like a Raspberry Pi as a local log server, relaying logs from your local network, to the cloud. Given all the data is in Azure, there are no local log centralisation or database servers.

Word of warning: at a small scale it isn't very cost effective. It looks like Event Hub (https://azure.microsoft.com/en-us/services/event-hubs/) and Cosmos DB (https://azure.microsoft.com/en-us/services/cosmos-db/) charge part of their fee by the hour and part of their fee by usage (events processed, searches run).

Which is why at some point I'll repeat this for Azure Queue Service and Azure Blob Storage.

## What do you create?

The idea is this:
* Use rsyslog (default syslog daemon for Debian Linux distributions) to create a syslog server. Configure other devices in the network to send their logs to this server. A Raspberry Pi is good for this.
* Write a NodeJS script to act as a plugin for rsyslog to send data to Azure Event Hub
* Azure Event Hub acts as a queuing system, soaking up all the logs
* Another NodeJS script runs as an Azure Function, for serverless event processing. It is handed messages from the Event Hub, parses them into a JSON structure and sends them to a Cosmos DB output
* Persist them in Cosmos DB, using the Document DB API, where they stay.

Right now I don't have a way to visualise those events (though I'm sure Microsoft might recommend something like Power BI), but it is a neat demonstrator of how to create a log collection system with very little in the way of physical hardware.

## Rsyslog Setup

TODO

## Azure Event Hub Setup

TODO

## Azure Function Setup

TODO

## Azure Cosmos DB Setup

TODO

# More to do
* Switch out Event Hub and Document DB for plain Azure Queue Service and Azure Blob Storage.
* Create a Grafana plugin for Document DB to dashboard/visualise the collected logs
* Publish the Azure automation functions / steps that would provision the necessary pieces

# Things used
* Rsyslog - http://www.rsyslog.com/
* NodeJS - https://nodejs.org/
* Azure Event Hub - https://azure.microsoft.com/en-us/services/event-hubs/
* Azure Functions - https://azure.microsoft.com/en-us/services/functions/
* Azure Cosmos DB (Document DB API) - https://azure.microsoft.com/en-us/services/cosmos-db/
