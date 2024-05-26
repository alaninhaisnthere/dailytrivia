import LinkWithIcon from "@/components/LinkWithIcon";
import Arrow from "../../public/arrow.png"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("/bg-home.png")' }}></div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-9xl font-unbounded font-light">
            <span className="font-semibold">D</span>aily <span className="font-semibold">T</span>rivia
          </h1>
          <div className="py-8">
            <LinkWithIcon href="/" text="Start Quiz" icon={Arrow} />          </div>
        </div>
      </div>
    </main>
  );
}
