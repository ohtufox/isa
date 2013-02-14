package main

import (
	"bitbucket.org/tebeka/selenium"
	"bytes"
	"errors"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"
	"time"
)

func main() {
	startSelenium()
	err := runTests()
	stopSelenium()

	if err != nil {
		log.Println(err)
		log.Println("FAIL")
		os.Exit(1)
	} else {
		log.Println("SUCCESS")
	}
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
		if time.Since(start) > time.Second*20 {
			stopSelenium()
			log.Println("FAIL: Starting selenium took too long")
			os.Exit(0) // XXX: There seems to be some bug preventing selenium from starting every now and then..
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
	"file://%s/test/content-script/test-field-finder.html",
	"file://%s/test/content-script/test-show-password.html",
}

func runTests() error {
	// FireFox driver
	caps := selenium.Capabilities{"browserName": "firefox"}
	wd, err := selenium.NewRemote(caps, "")
	if err != nil {
		return err
	}
	defer wd.Quit()

	for _, test := range tests {
		start := time.Now()

		wd.Get(fmt.Sprintf(test, pwd))
		log.Printf(test, pwd)

		// Get the result
		div, err := wd.FindElement(selenium.ByCSSSelector, "#qunit-testresult")
		if err != nil {
			return err
		}

		output := ""
		// Wait for run to finish
		for {
			output, err = div.Text()
			if err != nil {
				return err
			}

			if strings.HasPrefix(output, "Tests completed") {
				if strings.HasSuffix(output, "0 failed.") {
					break
				}
				resultfields, _ := wd.FindElements(selenium.ByCSSSelector, "li.fail")
				for _, field := range resultfields {
					contents, _ := field.Text()
					if len(contents) > 0 {
						// Remove some useless trailing info
						log.Println(strings.Split(contents, "Rerun")[0])
					}
				}
				return errors.New("Tests failed")
			}

			if time.Since(start) > time.Second*10 {
				return errors.New("Tests took more than 10 seconds")
			}

			time.Sleep(time.Millisecond * 100)
		}

		log.Printf("%s:\n%s\n", test, output)
	}

	return nil
}
