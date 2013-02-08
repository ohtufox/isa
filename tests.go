package main

import (
	"bitbucket.org/tebeka/selenium"
	"bytes"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"
	"time"
)

func main() {
	startSelenium()
	runTests()
	stopSelenium()
}

// Start Selenium and wait for it to print some output before continuing.
func startSelenium() {
	cmd := exec.Command("java", "-jar", "selenium.jar")
	var out bytes.Buffer
	cmd.Stdout = &out

	err := cmd.Start()
	if err != nil {
		log.Fatalln(err)
	}

        // Wait for Selenium to start
	start := time.Now()
	for line := ""; !strings.Contains(line, "SocketListener"); line, _ = out.ReadString('\n') {
		if time.Since(start) > time.Second*10 {
			log.Fatalln("FAIL: Starting selenium took too long")
		}
		time.Sleep(time.Millisecond * 100)
		fmt.Print(".")
	}
	fmt.Println()
	time.Sleep(time.Millisecond * 1000)
}

// Just kill all Java.
func stopSelenium() {
	cmd := exec.Command("killall", "java")
	cmd.Run()
}

var pwd = os.Getenv("PWD")

// Slice containing all qunit test files
var tests = []string{
	"file://%s/test/content-script/field-finder.html",
}


func runTests() {
	// FireFox driver
	caps := selenium.Capabilities{"browserName": "firefox"}
	wd, err := selenium.NewRemote(caps, "")
	if err != nil {
		log.Println(err)
		return
	}
	defer wd.Quit()

	for _, test := range tests {
		wd.Get(fmt.Sprintf(test, pwd))
		fmt.Println(test, pwd)

		// Get the result
		div, err := wd.FindElement(selenium.ByCSSSelector, "#qunit-testresult")
		if err != nil {
			log.Println(err)
			return
		}

		output := ""
		// Wait for run to finish
		for {
			output, err = div.Text()
			if err != nil {
				log.Println(err)
				return
			}

			if strings.HasPrefix(output, "Tests completed") {
				break
			}
			time.Sleep(time.Millisecond * 100)
		}

		fmt.Printf("%s:\n%s\n", test, output)
	}
}
