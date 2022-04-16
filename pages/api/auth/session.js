import {
  log,
  encrypt,
  decrypt,
  getCookie,
  setCookie,
  COOKIE_PATH,
} from "../../../utils/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const ch = req.cookies[COOKIE_PATH] ?? null;
  
  if (!ch) {
    //user not found by uuid
    res.status(500).json({ error: "Session var not found" });
    return;
  }

  let accessToken = getCookie("accessToken", ch);
  let uuid = getCookie("uuid", ch);

  if (!accessToken || !uuid) {
    //user not found by uuid
    res.status(500).json({ error: "User session vars not found" });
    return;
  }

  let user = await prisma.user.findUnique({
    where: {
      uuid,
    },
  });

  if (!user || !user.email) {
    //user not found by uuid
    res.status(500).json({ error: e });
    return;
  }

  let session = await prisma.session.findUnique({
    where: {
      sessionToken: accessToken,
    },
  });

  if (!session || session.userId != user.id) {
    //session not found by accesstoken and userId
    res.status(500).json({ error: e });
    return;
  }

  //TODO: time expires session controls

  try {
    res.status(200).json({
      user: {
        email: user.email,
        name: user.name,
        id: user.id,
        accessToken,
      },
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
