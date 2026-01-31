import { auth } from "@clerk/nextjs/server";

export default function GuardAlerts() {
    //@ts-ignore
  const { sessionClaims } = auth();

  return (
    <div>
      <h1>Guard Alerts</h1>
      <p>Role: {sessionClaims?.publicMetadata?.role}</p>

      <ul>
        <li>View alerts</li>
        <li>Accept alert</li>
        <li>Resolve alert</li>
        <li>View logs</li>
      </ul>
    </div>
  );
}
