async function generateTokenPayload(uuid: string): Promise<string> {
  return uuid
}

export const payloadService = {
  generateTokenPayload,
}
