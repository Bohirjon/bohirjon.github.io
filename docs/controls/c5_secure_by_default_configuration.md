C5: Secure By Default Configurations
Description
“Secure-by-Default” means products are resilient against prevalent exploitation techniques out of the box without additional charge. Software should start in a secure state without requiring extensive user configuration, ensuring the default settings are always the most secure option.

The benefit of having an application secure from the start is that it removes the burden away from developers on how to lock a system down, providing them with an already secure product. It reduces the effort required to deploy products in a secure manner and gives greater confidence that they will remain secure over time.

Threats
An attacker could gain unauthorized access by exploiting default, weak, or well-known credentials that haven't been changed from their out-of-the-box state.
An attacker could take advantage of overly permissive default settings to access sensitive resources or perform unauthorized actions.
An attacker could gather sensitive information by probing unnecessarily enabled features or services that are active by default.
An attacker could conduct cross-site scripting (XSS) attacks by exploiting lenient default security headers that don't provide adequate protection against such threats.
Implementation
In modern cloud applications, when developers build applications, they are also building the infrastructure for their applications, making infrastructure decisions, including security-critical configurations, while writing their code. These are deployed on infrastructure created and configured via code, Infrastructure-as-code (IaC), using configurations applied at the application level ( including web server and database), at container, Function as a Service, or infrastructure level. For example, in the case of web applications, folder permissions need to follow the principle of least privilege to limit resource access rights. When web and mobile applications are deployed in production, the debugging should be disabled.

Is it important that when developers put together their infrastructure components, they:

Implement configurations based on the Least privilege principle - for example: ensure that your cloud storage (S3 or other) is configured to be private and accessed by the minimum amount of time
Access is denied by default and allowed via an allowed list
Use container images that have been scanned for package and component vulnerabilities and pulled from a private container registry
Prefer declarative infrastructure configuration over manual configuration activities. On a low-level, utilize Infrastructure-as-Code templates for automated provisioning and configuration of your cloud and on-premises infrastructure. On a high-level utilize Policy-as-Code to enforce policies including privilege assignments.
Using a declarative format allows those policies to be managed similar to source code: checked-in into a source code management system, versioned, access-controlled, subject to change management, etc.
Traffic encryption - by default or do not implement unencrypted communication channels in the first place
Continuous Configurations Verification
As part of software development, a developer needs to ensure that software is configured securely by default at the application level. For example,

The code which defines the infrastructure should follow the principle of least privilege.
Configurations and features that aren’t required such as accounts, software, and demo capabilities should be disabled.
Vulnerabilities Prevented
OWASP Top 10 2021 A05 – Security Misconfiguration
References
OWASP Cheat Sheet: Infrastructure as Code Security Cheat Sheet
OWASP ASVS: Application Security Verification Standard V14 Configuration
Cloud security guidance - NCSC.GOV.UK
Tools
Tfsec - open source static analysis for your Terraform templates
Terrascan - scan for Infrastructure-as-Code vulnerabilities
Checkov - Scan for open-source and Infrastructure-as-Code vulnerabilities
Scout Suite is an open source multi-cloud security-auditing tool which currently supports: Amazon Web Services, Microsoft Azure, Google Cloud Platform
prowler
Cloudmapper
Snyk - Scan for open-source, code, container, and Infrastructure-as-Code vulnerabilities
Trivy - Scan for open-source, code, container, and Infrastructure-as-Code vulnerabilities
KICS - Scan for Infrastructure-as-Code vulnerabilities
Kubescape - Scan for Kubernetes vulnerabilities
Kyverno - Securing Kubernetes using Policies