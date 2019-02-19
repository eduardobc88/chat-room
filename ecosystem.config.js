module.exports = {
  apps : [{
    name   : "full-stack-developer-express",
    script : "./server-app/server.js",
    instances  : 1,
    exec_mode  : "cluster",
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    },
    watch  : true,
    ignore_watch : [
        "node_modules",
    ],
    watch_options: {
        followSymlinks: false
    }
  }]
}
