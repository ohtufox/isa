package main

import (
	"log"
	"net/http"
)

func main() {
	log.Println("HTTPS: https://127.0.0.1:10443/")
	log.Println("HTTP:  http://127.0.0.1:10444/")
	go http.ListenAndServe(":10444", http.FileServer(http.Dir("./html")))
	err := http.ListenAndServeTLS(":10443", "cert.pem", "key.pem", http.FileServer(http.Dir("./html")))
	if err != nil {
		log.Fatal(err)
	}
}
