import Log from '../models/logModel.js';

export const logger = {
  async info(message, metadata = {}) {
    try {
      await Log.create({ level: 'info', message, ...metadata });
    } catch (error) {
      console.error('Failed to write info audit log:', error.message);
    }
  },

  async warn(message, metadata = {}) {
    try {
      await Log.create({ level: 'warn', message, ...metadata });
    } catch (error) {
      console.error('Failed to write warning audit log:', error.message);
    }
  },

  async error(message, metadata = {}) {
    try {
      await Log.create({ level: 'error', message, ...metadata });
    } catch (error) {
      console.error('Failed to write error audit log:', error.message);
    }
  },
};

// Records the final API response. It never stores passwords or request bodies.
export function auditLoggerMiddleware(req, res, next) {
  const startTime = Date.now();

  res.on('finish', () => {
    const durationMs = Date.now() - startTime;
    const logData = {
      method: req.method,
      path: req.originalUrl,
      ip: req.ip ?? req.socket?.remoteAddress ?? null,
      userId: req.user?._id ?? null,
      username: req.user?.username ?? null,
      statusCode: res.statusCode,
      metadata: { duration: `${durationMs}ms` },
    };
    const message = `${logData.method} ${logData.path} - ${logData.statusCode}`;

    if (res.statusCode >= 500) void logger.error(message, logData);
    else if (res.statusCode >= 400) void logger.warn(message, logData);
    else void logger.info(message, logData);
  });

  next();
}
