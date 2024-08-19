export const config = {
    port: process.env.PORT || 3003,
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Course'
    },
    redis: {
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    },
    kafka: {
      broker: process.env.KAFKA_BROKER || 'localhost:9092'
    },
    JWT_SECRET: process.env.JWT_SECRET_KEY || 'jwtsecretkey',
    JWT_REFRESH: process.env.JWT_SECRET_KEY || 'jwtsecretkey'
  };