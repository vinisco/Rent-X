import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

import createConnection from "../index";

async function create() {
  const id = uuidV4();
  const password = await hash("admin", 8);
  const connection = await createConnection("localhost");

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXXXXX')
        `,
  );
}

create().then(() => console.log("User admin created"));
