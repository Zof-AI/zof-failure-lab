# cache-inconsistency

A successful database update leaves a stale cached representation.

This synthetic in-memory application injects the fault deterministically. The `broken` branch reproduces the defect; the `fixed` branch implements the mitigation: Invalidate cached values after committed writes.

Run `node dist/cli.js reproduce cache-inconsistency` from the checkout. Exit 0 confirms the expected defective behavior was observed. Run `node dist/cli.js verify cache-inconsistency` to execute the corrected regression. The JSON output records observed and expected values. `node dist/cli.js start` initializes the stateless lab and `node dist/cli.js cleanup` confirms no persistent resources remain. SQLite cases use only in-memory databases and close them in finally blocks. No services or ports are opened.

Expected corrected result: `{"visible": 2}`. The CI regression executes both branches and asserts the defective result differs from the expected result while the corrected result matches it. This is an educational reproduction, not a production workload or a claim of commercial Zof verification.
