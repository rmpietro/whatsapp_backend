import app from "./app.js";
import logger from "./config/logger.js";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
