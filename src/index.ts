import "dotenv/config";
import { server } from "./server/Server";

const PORT = process.env.PORT || process.env.LOCAL_PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
