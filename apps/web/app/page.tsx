import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/home");

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

