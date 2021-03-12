# 常用Linux命令

## `top`

### 查看系统运行情况

- `top`

## `netstat`

### 查看本机端口占用

- `netstat -tunlp`

## lsof

### 查看特定端口占用

- `lsof -i:PORT`

## `tail`

### 显示最新追加内容

- `tail -f FILE_PATH`

### 指定行数

- `tail -n NUMBER FILE_PATH`

## `dig`

### 追踪dns解析过程

- `dig @DNS_URL +trace URL`

## `free`

### 查看当前内存占用情况(unit: mb)

- `free -m`

## `kill`

## `scp`

## `ps`

## `mv` & `cp`

## `git`

### 设置remote地址

- `git remote add origin URL`

### 重新设置remote地址

- `git remote set-url origin URL`

### merge all incoming

- `git pull -X theirs`

## Reference

- <https://www.linuxcool.com/>
