package main

import (
	"net/http"
	"os"
	"log"
)

const (
	DEFAULT_PORT = "8000"
	DEFAULT_HOST = "localhost"
)

type Person struct {
	Name string
	Phone string
}

var htmlRoot string = "pages"

func pageHandler(w http.ResponseWriter, r *http.Request){

	if r.URL.Path == "/" {	
		http.ServeFile(w, r, htmlRoot +  "/index.html")
		return
	}

	if _, err := os.Stat(htmlRoot + "/" + r.URL.Path[1:] + ".html"); err == nil {
		http.ServeFile(w, r, htmlRoot + "/" + r.URL.Path[1:] + ".html")
		return
	}
	http.Redirect(w, r, "/404", 301)
}

func notFoundHandler(w http.ResponseWriter, r *http.Request){
	log.Printf("Not found: ")
	log.Printf(r.URL.Path)
	http.ServeFile(w, r, htmlRoot + "/404.html")
}

func staticFileHandler(w http.ResponseWriter, r *http.Request){
	http.ServeFile(w, r, r.URL.Path[1:])
}

func main(){
	http.HandleFunc("/", pageHandler)
	http.HandleFunc("/404", notFoundHandler)
	http.HandleFunc("/js/", staticFileHandler)
	http.HandleFunc("/css/", staticFileHandler)
	http.HandleFunc("/images/", staticFileHandler)
	http.HandleFunc("/includes/", staticFileHandler)


	var port string
	if port = os.Getenv("VCAP_APP_PORT"); len(port) == 0 {
		port = DEFAULT_PORT
	}

	var host string
	if host = os.Getenv("VCAP_APP_HOST"); len(host) == 0 {
		host = DEFAULT_HOST
	}
	
	log.Printf("Starting app on %+v:%+v\n", host, port)
	http.ListenAndServe(host+":"+port, nil)
	
}