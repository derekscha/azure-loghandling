
# Rsyslog plugin

This folder contains example rsyslog plugins to write to an Azure Event Hub.

`az_event_hub.py` is a Python implementation of an Rsyslog omprog plugin that can push messages to Azure Event Hub. It requires the [azure-servicebus](https://pypi.python.org/pypi/azure-servicebus) library to work.

`az_eventhub.js` is a NodeJS implementation of an Rsyslog omprog plugin for the same purpose. It requires the `amqp10` and `readline` npm libraries. For now I haven't provided a `package.json`, so you'll have to install those yourself.

`41-az_event_hub.conf` is an example Rsyslog configuration file.

From personal experience with a Raspberry Pi Zero W, the NodeJS implementation used a bit more CPU but was much faster at processing events.

# Setup
Instructions for NodeJS implementation only. I have assumed that you have installed NodeJS and have installed the required libraries using NPM.

* Download `az_eventhub.js` and put it somewhere safe on your system. If you are running Rsyslog as root, you could just put it in `/root`. Make sure that it is executable e.g. `chmod u+x` as root. Don't forget to `chown` it to root as well. In the next step you will be putting Azure shared keys into the file, so you will want to protect those.
* Edit the file and input the details of your ServiceBus account, Event Hub name and a Shared Key with permissions to write messages to the Event Hub.
* Download `41-az_event_hub.conf` and put it in `/etc/rsyslog.d/`. Edit the file to ensure that the path to the `az_eventhub.js` script is correct.
* Restart rsyslog and it should just work. Check a node process is running with `ps -ef | grep node`.

You can validate that you have the settings correctly specified in the NodeJS script by just running it in the foreground and typing messages into it. Each time you hit return, it'll send a message.

It is sometimes helpful to setup a basic Azure Function app to just read from the Event Hub and echo out the message it received to the log on-screen.
