import { auth } from "@clerk/nextjs/server";

export default function TestPage() {
//@ts-ignore
  const { sessionClaims } = auth();

  return (
    <pre>
      {JSON.stringify(sessionClaims?.publicMetadata, null, 2)}
    </pre>
  );
}
