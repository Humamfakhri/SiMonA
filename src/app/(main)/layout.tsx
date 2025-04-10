import Sidebar from "@/components/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="bg-slate-100 grow pb-5 my-5 me-5 rounded-md overflow-y-auto">
        {children}
      </main>
    </>
  )
}
