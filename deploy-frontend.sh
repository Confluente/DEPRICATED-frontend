#!/bin/bash
host=$1
if [[ $# -ne 1 ]]; then
	read -p "Host/ip: " host
fi
echo $host

grunt build
scp -i ~/.ssh/id_rsa -r ./build/ root@"$host":/node/frontend/
echo 'Done!'
