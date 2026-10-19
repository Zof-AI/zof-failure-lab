# Zof Failure Lab

Ten deterministic synthetic applications reproduce common software failures and demonstrate corrected implementations. They use fake payment/order/message data, in-memory state, and in-memory SQLite for transaction and migration cases. No services, production data, credentials or network connections are used.

This is an unpublished 0.1.0 candidate. Proposed package/repository names and Apache-2.0 licensing await approval. Intentionally defective branches are teaching fixtures; never deploy them as application services.

## Run the lab

Requires Node.js 22 or newer. SQLite uses Node's built-in experimental SQLite module.

```sh
npm ci --ignore-scripts
npm run build
node dist/cli.js start
node dist/cli.js reproduce all
node dist/cli.js verify all
node dist/cli.js cleanup
npm test
```

The lab is stateless: start validates startup by loading the manifest, while cleanup confirms there are no persistent lab resources. Each reproduction/fix creates and disposes its own state. Reproduce exits 0 only when every requested defect is observed; verify exits 0 only when every corrected regression passes. Invalid IDs exit 2. JSON output records expected and observed behavior.

Three practical examples:

```sh
node examples/payment.mjs
node examples/concurrency.mjs
node examples/migration.mjs
```

`node dist/cli.js list` lists all scenarios. Each scenario's README explains its fault, mitigation, commands and expected evidence. Public `listScenarios`, `runScenario(id, 'broken'|'fixed')`, and `runAll(variant)` exports only execute bundled fixtures. No arbitrary candidate source is accepted.

## Isolated execution

Docker is optional for trusted bundled fixtures, and recommended for bounded demonstrations. `npm run test:container` builds the pinned Node image, executes all 20 branches without network, with read-only storage, a non-root user, no capabilities, PID/memory/CPU limits, then removes its local image. It exposes no ports and mounts no host directories. Docker must be installed and the pinned base image locally available, or explicitly retrieved by an authorized operator before an offline run.

A manually built image can be used with `docker run --rm --network=none --read-only --cap-drop=ALL --security-opt=no-new-privileges --pids-limit=64 --memory=128m --cpus=0.5 zof-failure-lab:local verify all`. Build it with `docker build --network=none --pull=false -t zof-failure-lab:local .`; remove it with `docker image rm zof-failure-lab:local`.

These simulations establish the documented defects and fixes. They do not estimate real payment behavior, distributed database isolation, production performance, or a commercial Zof service's capabilities. The public reliability benchmark can consume the exported scenarios. No hosted integration is claimed.
