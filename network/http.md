# Http

Http is an application layer protocol and based on TCP/IP protocol which is a transport layer protocol.

## TCP/IP

TCP/IP protocol can provide a reliable link between two computers, if packet get lost, it is re-transmitted. TCP itself rides on top of IP, which provides unified addressing to communicate between computers. TCP/IP is a basis for internet and 99% of other networks.

How TCP/IP guarantee its reliability of transmission? The key point is to .

### Connection Establishment

The setup steps make sure both of them can receive and send data to each other.

1. the client send a SYN to the server. In this step, the server knows it can receive data from the client.

2. the server replies with a SYN-ACK. In this step, the client knows it can receive data and send data to the server.

3. the client sends an ACK back to the server. In this step, the server knows the client can receive data it sent.

### Connection Termination

The termination uses a four-way handshake, with each side of the connection terminating independently.

Each side needs to send a FIN and ACK packet to another side. Therefore, a typical tear-down requires a pair of FIN and ACK segments from each TCP endpoint.

There is a picture to show it:

<img src="../assets/tcp_teardown.png" width="400"/>

Why the initiator needs to wait for 2 maximum segment lifetime?

If the receiver doesn't get its ACK packet from the initiator, it will resend a FIN to the initiator. It can guarantee the connection can be teardown safely.

## Message Structure

HTTP requests, and responses, share similar structure and are composed of:

1. A start-line describing the requests to be implemented, or its status of whether successful or a failure. This start-line is always a single line.

2. An optional set of HTTP headers specifying the request, or describing the body included in the message.

3. A blank line indicating all meta-information for the request has been sent.

4. An optional body containing data associated with the request (like content of an HTML form), or the document associated with a response. The presence of the body and its size is specified by the start-line and HTTP headers.

## Reference

- <https://topic.alibabacloud.com/a/tcp-three-time-font-colorredhandshakefont-and-four-times-wave-break_8_8_20230829.html>
- <https://www.vskills.in/certification/tutorial/information-technology/basic-network-support-professional/tcp-connection-establish-and-terminate/>
- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages>
