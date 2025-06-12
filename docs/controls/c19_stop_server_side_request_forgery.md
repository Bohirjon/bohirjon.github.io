Stop Server Side Request Forgery
Description
While Injection Attacks typically target the victim server itself, Server-Side Request Forgery (SSRF) attacks try to coerce the server to perform a request on behalf of the attacker. SSRF occurs when an attacker can trick a server into making unintended requests to internal or external services, potentially bypassing security controls.

Why is this beneficial for the attacker? The outgoing request will be performed with the identity of the victim server and thus the attacker might execute operations with elevated operations.

Threats
Examples of this contain:

If an SSRF attack is possible on an server within the DMZ, an attacker might be able to access other servers within the DMZ without passing a perimeter firewall
Many servers have local services running on localhost, often without any authentication/authorization as localhost. This can be abused by SSRF attacks.
If SSO is used, SSRF can be used to extract tokens/tickets/hashes from servers etc.
Implementation
There multiple ways of preventing SSRF:

Input validation
If outgoing requests have to be made, check the target against an allow-list
If using XML, configure parser securely to prevent XEE
Be aware of Unicode and other Character transformations when performing input validation.

Vulnerabilities Prevented
A10:2021 – Server-Side Request Forgery (SSRF)
