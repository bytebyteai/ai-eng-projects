import AskTheWeb from "./AskTheWeb";

export default function App() {
  return (
    <main className="flex items-center justify-center w-screen h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* full-page card */}
      <section className="w-full h-full flex flex-col gap-6 p-8 bg-white shadow-lg">
        <AskTheWeb />
      </section>
    </main>
  );
}