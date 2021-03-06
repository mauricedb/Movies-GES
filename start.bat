@echo off

if not exist .\EventStore-OSS-Win-v3.0.1\EventStore.ClusterNode.exe goto no-ges
if not exist .\redis-2.8.17\redis-server.exe goto no-redis

start  .\EventStore-OSS-Win-v3.0.1\EventStore.ClusterNode.exe

del dump.rdb
start .\redis-2.8.17\redis-server.exe
rem start .\redis-2.8.17\redis-cli.exe
rem gulp
goto: end

:no-ges
Echo Please download "http://download.geteventstore.com/binaries/EventStore-OSS-Win-v3.0.1.zip"
Echo And unzip to the "EventStore-OSS-Win-v3.0.1" folder
pause
goto: end

:no-redis
Echo Please download "https://github.com/MSOpenTech/redis/releases/download/win-2.8.17.3/redis-2.8.17.zip"
Echo And unzip to the "redis-2.8.17" folder
pause
goto: end

:end
