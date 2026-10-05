# 发布: 提交并推到私有源码仓, GitHub Actions 自动构建并发布到 lanbing510.github.io
git add -A
git commit -m "$1"
git push origin master
