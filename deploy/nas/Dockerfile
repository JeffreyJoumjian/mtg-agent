# The image both mtg-agent services on the NAS run (docker-compose.yaml next to this file): Bun at
# the version mise.toml pins, plus git for the nightly edhplay-data push. It holds no code; the
# services run the repo straight from the share. UGOS builds it from this folder on each redeploy.
FROM oven/bun:1.3.14

RUN apt-get update \
  && apt-get install -y --no-install-recommends git ca-certificates \
  && rm -rf /var/lib/apt/lists/*
