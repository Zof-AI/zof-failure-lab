# Security policy

The 0.1.x line is the initial supported release line. Local analyses are bounded and offline unless an operation is explicitly documented otherwise. Do not provide production secrets or execute untrusted generated code.

Use GitHub private vulnerability reporting when enabled for this repository. If it is unavailable, contact an organization owner through an already verified private channel; do not file credentials, exploit details, or customer data in a public issue. Reports will be triaged, reproduced using synthetic data, fixed and reviewed before coordinated disclosure. No response SLA is promised for this initial release.

The ten deliberately defective implementations are isolated synthetic teaching examples. Only an allowlisted scenario ID can be imported; user-supplied source, command strings, repository paths and endpoints cannot be executed. There are no payment gateways, listening ports or disk databases. The optional Docker acceptance command runs as non-root with no network, no host mounts, a read-only filesystem and resource limits. Node SQLite warnings may appear on stderr; no application logs or credentials are captured into evidence. Do not deploy the examples as services.

Filesystem operations use bounded, directory-relative descriptors on Linux/macOS with Python 3.10 or newer. Symlinks, hard-linked inputs, special files and traversal are rejected. Open descriptors remain attached to the original directory when names change. File contents can still change during a read or snapshot; this is not an atomic filesystem snapshot. Windows filesystem operations fail closed; in-memory JSON validation and analysis do not require the file helper.
