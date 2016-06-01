# Welcome to dappDentist

## Description

This project is meant for a school project. Initially, the intention was to create a decentralized application. However, the in the end, it was not to be.

## Requirements

In order to run this software you need to install

* [IPFS](http://www.ipfs.io)
* geth ([Ethereum](http://www.ethereum.org))
* [Meteor.js](http://www.meteor.com)

## Usage

In order to use this software, you first need to run a private Ethereum node. There is a sample .sh and .bat file included in the project to help you get started. Remember to change every path in those file to the relevant paths on your system.
It is also important that you specify an account to unlock while running.

After your Ethereum node is running, run the ```geth attach```command. When you are in the geth shell, type:

```
miner.start(1)
```

When you are done using the software, remember to run
```
miner.stop()
```

Before you can run this software, you have to register a new account on the Ethereum node. inside the ```geth attach```shell, type:

```
personal.newAccount("password-of-your-choice")
```


After that, you need to start an IPFS daemon.

```
ipfs daemon
```

Lastly, run Meteor with the settings flag, and point it at the sample settings file.

```
meteor --settings settings-development-sample.json
```
