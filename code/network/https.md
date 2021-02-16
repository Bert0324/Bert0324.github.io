# Https

Hypertext transfer protocol secure (HTTPS) is the secure version of HTTP, which is the primary protocol used to send data between a web browser and a website.

## Why we need Https

Http use plain text to transmit data. When we are connecting with a unsecured medium, such as public Wi-Fi, the data can be sniffed by some of software.

It is harmful especially when the data is sensitive, such as password or bank number.

With HTTPS, traffic is encrypted by SSL such that even if the packets are sniffed or otherwise intercepted, they will come across as nonsensical characters.

As the client uses public key to encrypt message, and the server uses private key to decrypt it.

## Steps

A Https handshake includes 5 steps as below:

<img src="../assets/ssl_handshake.jpg" width="400"/>

1. The client sends a request to the server for a secure session. The server responds by sending its X.509 digital certificate to the client.

2. The client receives the server's X.509 digital certificate.

3. The client authenticates the server, using a list of known certificate authorities.

4. The client generates a random symmetric key and encrypts it using server's public key.

5. The client and server now both know the symmetric key and can use the SSL encryption process to encrypt and decrypt the information contained in the client request and the server response.

So in fact, Https use this symmetric key to encrypt and decrypt data both in the client and the server. As symmetric encryption which is used through the rest is faster and more efficient with large amounts of data transfer. The keys are smaller which is generally why it's faster, but it's algorithm is also easier to process.

## Certificate Validation

As we can see, a Https connection is based on Http connection, the key point it can guarantee security is Certificate. So, how the client to verify a certificate is valid?

1. Browser downloads the web server's certificate. This certificate is signed with the private key of a trusted certificate (GlobalSign Org) authority.

2. Browser comes installed with the public keys of all of the major certificate authorities. It uses this public key to verify that the web server's certificate was indeed signed by the trusted certificate authority.

3. The certificate contains the domain name and/or ip address of the web server. Browser confirms with the certificate authority that the address listed in the certificate is the one to which it has an open connection.

## Reference

- <https://www.ibm.com/support/knowledgecenter/en/SSZHJ2_9.1.0/securing/topics/sslauth.html>
- <https://robertheaton.com/2014/03/27/how-does-https-actually-work/>
- <https://www.cnblogs.com/yincheng/p/https.html>
- <https://www.venafi.com/education-center/ssl/how-to-check-ssl-certificate>
