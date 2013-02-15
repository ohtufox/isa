package main

import (
	"bitbucket.org/tebeka/selenium"
	"bytes"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"path"
	"strings"
	"time"
)

var (
	pwd   = os.Getenv("PWD")
	tests []string
)

const (
	TESTPATH = "test/content-script/"
)

func main() {
	var err error

	if err = getTests(); err == nil {
		startSelenium()
		err = runTests()
		stopSelenium()
	}

	if err != nil {
		log.Println(err)
		log.Println("FAIL")
		os.Exit(1)
	} else {
		log.Println("SUCCESS")
	}
}

func getTests() error {
	var (
		files []os.FileInfo
		err   error
	)

	if files, err = ioutil.ReadDir(TESTPATH); err != nil {
		return err
	}

	tests = make([]string, 0, len(files))
	for _, file := range files {
		if file.IsDir() || !strings.HasSuffix(file.Name(), ".html") {
			continue
		}
		tests = append(tests, file.Name())
	}
	return nil
}

// Start Selenium and wait for it to print some output before continuing.
func startSelenium() {
	var (
		out bytes.Buffer
		err error
	)

	cmd := exec.Command("java", "-jar", "selenium.jar")
	cmd.Stdout = &out

	if err = cmd.Start(); err != nil {
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

func pathTo(testfile string) string {
	return "file://" + path.Join(pwd, TESTPATH, testfile)
}

func runTests() error {
	var failed bool

	// FireFox driver
	caps := selenium.Capabilities{"browserName": "firefox"}
	wd, err := selenium.NewRemote(caps, "")
	if err != nil {
		return err
	}
	defer wd.Quit()

	for _, test := range tests {
		start := time.Now()

		wd.Get(pathTo(test))
		log.Printf(test)

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
					failed = true
					contents, _ := field.Text()
					if len(contents) > 0 {
						// Remove some useless trailing info
						log.Println(strings.Split(contents, "Rerun")[0])
					}
				}
				log.Printf("\n%s\n", output)
			}

			if time.Since(start) > time.Second*10 {
				return errors.New("Tests took more than 10 seconds")
			}

			time.Sleep(time.Millisecond * 100)
		}

	}
	if failed {
		return errors.New("Tests failed")
	}

	return nil
}
