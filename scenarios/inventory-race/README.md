# inventory-race

Two buyers read the same available stock before either update commits.

This synthetic in-memory application injects the fault deterministically. The `broken` branch reproduces the defect; the `fixed` branch implements the mitigation: Reserve stock atomically instead of reading and updating across an await.

Run `node dist/cli.js reproduce inventory-race` from the checkout. Exit 0 confirms the expected defective behavior was observed. Run `node dist/cli.js verify inventory-race` to execute the corrected regression. The JSON output records observed and expected values. `node dist/cli.js start` initializes the stateless lab and `node dist/cli.js cleanup` confirms no persistent resources remain. SQLite cases use only in-memory databases and close them in finally blocks. No services or ports are opened.

Expected corrected result: `{"stock": 1, "sold": 4}`. The CI regression executes both branches and asserts the defective result differs from the expected result while the corrected result matches it. This is an educational reproduction, not a production workload or a claim of commercial Zof verification.
