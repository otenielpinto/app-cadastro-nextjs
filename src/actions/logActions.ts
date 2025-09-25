"use server";

import { TMongo } from "@/infra/mongoClient";
import { LogData } from "@/types/logData";

export async function createLog(data: LogData) {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    await clientdb.collection("tmp_log").insertOne(data);
    await TMongo.mongoDisconnect(client);
  } catch (error) {
    console.error("Erro ao criar log:", error);
  }
}
