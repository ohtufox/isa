#!/bin/sh
wget -O selenium.jar https://selenium.googlecode.com/files/selenium-server-standalone-2.31.0.jar
go get bitbucket.org/tebeka/selenium
go run tests.go
