# dùng node image
FROM node:18

# tạo thư mục làm việc trong container
WORKDIR /app

# copy package.json trước để cache dependency
COPY package*.json ./

# cài thư viện
RUN npm install

# copy toàn bộ source code
COPY . .

# port express chạy
EXPOSE ${PORT}

# chạy server
CMD ["npm", "run", "dev"]