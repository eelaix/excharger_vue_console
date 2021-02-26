#!/bin/sh
echo
echo  npm install
echo  npm run serve
echo  npm run build
echo ==============================================================================================
echo 
echo  执行本程序前需要处理的工作：
echo  1. 准备一个后台管理网站域名：webconsole.domain.com
echo  2. 以此域名为名称在S3中创建存储桶
echo  3. 设置存储桶以进行网站访问，在Route53中设置CNAME
echo  4. 执行本程序上传数据到存储桶
echo  本程序在aws中国区北京，宁夏运行正常。
echo
s3bucket="a.mosf.cn"
echo 
echo
ver=`grep "APPVERSION" src/config.js | awk -F[\'.] '{print $2 $3 $4}'`
let ver=${ver}+1
version=${ver:0:1}.${ver:1:1}.${ver:2:1}
sed -i "" "s/APPVERSION\ =\ \'[0-9].[0-9].[0-9]\'/APPVERSION\ =\ \'$version\'/" src/config.js
npm install
npm run build
aws s3 rm s3://${s3bucket}/css --quiet --recursive
aws s3 rm s3://${s3bucket}/images --quiet --recursive
aws s3 rm s3://${s3bucket}/js --quiet --recursive
aws s3 rm s3://${s3bucket}/404.html --quiet --recursive
aws s3 rm s3://${s3bucket}/index.html --quiet --recursive
aws s3 sync dist/ s3://${s3bucket}/
