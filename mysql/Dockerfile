FROM mysql/mysql-server:latest AS base

FROM mysql:latest

LABEL version="1.0.0" description="todolist MySQL 服务器"
WORKDIR /mysql

# 拷贝安装脚本
COPY setup.sh /mysql/setup.sh 
# 创建数据库
COPY create_db.sql /mysql/create_db.sql
# 初始数据
COPY initial_data.sql /mysql/initial_data.sql 
# 设置密码和权限
COPY privileges.sql /mysql/privileges.sql 

COPY --from=base . .

EXPOSE 3306

CMD ["sh", "/mysql/setup.sh"]