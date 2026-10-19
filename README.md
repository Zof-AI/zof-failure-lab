# Zof Failure Lab

Ten deterministic synthetic applications reproduce common software failures and demonstrate corrected implementations. They use fake payment/order/message data, in-memory state, and in-memory SQLite for transaction and migration cases. No services, production data, credentials or network connections are used.

Version 0.1.0 is prepared under the Apache-2.0 license. Use the GitHub source installation below; npm registry publication is not claimed. Intentionally defective branches are teaching fixtures; never deploy them as application services.

<!-- ZOF_RELEASE_INSTALL_START -->
## Install from GitHub source

Requires Node.js 22 or 24, npm, and Git. Filesystem operations require Linux or macOS with Python 3.10 or newer; Windows file operations fail closed. Clone this repository and explicitly prepare its reviewed release dependencies:

```sh
git clone https://github.com/Zof-AI/zof-failure-lab.git
cd zof-failure-lab
node scripts/bootstrap.mjs --allow-network
npm ci --ignore-scripts --prefer-offline
npm run build
npm test
```

The bootstrap downloads only the exact `v0.1.0` dependency assets from [GitHub Releases](https://github.com/Zof-AI/zof-failure-lab/releases), as listed in `scripts/release-dependencies.json`, verifies SHA256 and byte size, and adds them to the npm cache. It does not extract archives, run package scripts, collect application data, or send credentials. Downloads require the explicit flag and follow only HTTPS GitHub asset redirects. Installation then fetches ordinary third-party dependencies from npm. Use a writable npm cache; set `npm_config_cache` consistently for both commands if needed. An unavailable asset, changed hash, or oversized response stops installation.

GitHub source and release artifacts are the initial distribution channel. These instructions do not claim that `@zof-ai` packages are published on npm or that the VS Code extension is listed in Marketplace.
<!-- ZOF_RELEASE_INSTALL_END -->

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
