#!/bin/bash
OF_DATA={\"refreshtoken\":\"$OF_RT1$OF_RT2\"}
OF_ACCESSTOKEN=$(curl -X POST --data $OF_DATA https://open.ge.tt/1/users/login 2> /dev/null| python -c 'import json,sys;obj=json.load(sys.stdin);print obj["accesstoken"]')
OF_PUTURL=$(curl -X POST --data '{"filename":"isa.xpi"}' https://open.ge.tt/1/files/63sezAX/create?accesstoken=$OF_ACCESSTOKEN 2> /dev/null | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["upload"]["puturl"]')
curl --upload-file isa.xpi $OF_PUTURL
