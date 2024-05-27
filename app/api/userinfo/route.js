import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req) {
  const session = await getServerSession(req, { authOptions });

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  return new Response(JSON.stringify(user));
}
