# Security policy

The 0.1.x line is the initial supported candidate. Local analyses are bounded and offline unless an operation is explicitly documented otherwise. Do not provide production secrets or execute untrusted generated code.

Use GitHub private vulnerability reporting when enabled for this repository. If it is unavailable, contact an organization owner through an already verified private channel; do not file credentials, exploit details, or customer data in a public issue. A verified reporting channel must be enabled before public release. Reports will be triaged, reproduced using synthetic data, fixed and reviewed before coordinated disclosure. No response SLA is promised during prerelease development.

The ten deliberately defective implementations are isolated synthetic teaching examples. Only an allowlisted scenario ID can be imported; user-supplied source, command strings, repository paths and endpoints cannot be executed. There are no payment gateways, listening ports or disk databases. The optional Docker acceptance command runs as non-root with no network, no host mounts, a read-only filesystem and resource limits. Node SQLite warnings may appear on stderr; no application logs or credentials are captured into evidence. Do not deploy the examples as services.
