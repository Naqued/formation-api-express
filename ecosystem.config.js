module.exports = {
  apps: [{
    name: "movie-mood-api",
    script: "./dist/index.js",
    watch: true,
    ignore_watch: ["node_modules", "logs"],
    instances: 1,
    exec_mode: "fork",
    env: {
      NODE_ENV: "development",
      PORT: 3000
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 80
    },
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    error_file: "./logs/error.log",
    out_file: "./logs/out.log",
    merge_logs: true,
    max_memory_restart: "200M",
    exp_backoff_restart_delay: 100
  }]
} 