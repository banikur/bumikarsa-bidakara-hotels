import { cookies } from "next/headers";
import { insforge } from "@/lib/insforge";
import { AdminPanel } from "@/components/admin/admin-panel";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  // Authentication check
  if (!session || session.value !== "true") {
    // Show a simple login screen covering everything (z-50)
    return (
      <main className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8 shadow-sm">
          <h1 className="mb-6 font-display text-3xl">Admin Login</h1>
          {/* A simple form referencing a server action via action prop requires a client component if we want pending states. 
              Let's use a server action natively with standard HTML form. */}
          <form
            action={async (formData: FormData) => {
              "use server";
              const pw = formData.get("password");
              if (pw === process.env.ADMIN_PASSWORD) {
                const cs = await cookies();
                cs.set("admin_session", "true", {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  maxAge: 60 * 60 * 24, // 1 day
                  path: "/",
                });
              }
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="password"
              name="password"
              placeholder="Enter admin password"
              className="w-full rounded border border-border bg-background px-4 py-3 placeholder-muted-foreground outline-none focus:border-primary"
              required
            />
            <button
              type="submit"
              className="w-full rounded bg-primary px-4 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
            >
              Enter Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Fetch the configuration
  const { data, error } = await insforge.database
    .from("site_config")
    .select("*")
    .limit(1)
    .single();

  if (error || !data) {
    return (
      <main className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        <p>Error loading site configuration. Please run the seed script.</p>
      </main>
    );
  }

  // Render Admin Panel
  return (
    <main className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground overflow-hidden">
      <AdminPanel initialConfig={data} />
    </main>
  );
}
