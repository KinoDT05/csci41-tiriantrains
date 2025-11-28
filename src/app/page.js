import Header from "@/components/Header";
import devs from "./data/devs";
import tabs from "./data/tabs";

export default function Home() {
  return (
    <>
    <Header name="Welcome to Tirian Trains" 
    desc="Tirian Trains operates a local town train system within the Western Woods and an inter-town train system in Narnia. Tirian Trains are always on time. They are never late and never delayed."/>
    
    <div className="flex flex-row text-4xl font-bold gap-6">
    Created by:
    {devs.map((dev, index) => (
      <img
      key={index}
      src={dev.src}
      alt={dev.name || `dev ${index + 1}`}
      width={75}
      className="rounded-full"
      />
    ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {tabs.map((tab, index) => (
          <a key={index} href={tab.href}>
            <div className="flex items-center gap-4 bg-primary rounded-2xl shadow-md px-8 py-6 text-3xl font-bold hover:shadow-lg hover:bg-secondary hover:text-primary transition">
              <span className="text-4xl">{tab.icon}</span>
              {tab.title}
            </div>
          </a>
        ))}
      </div>

    
    </>
  );
}
