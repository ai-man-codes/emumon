import RomCard from "@renderer/components/ui/RomCard";
import { useEffect, useState } from "react";

interface RomStoreType {
  name: string;
  consoleId: string;
  extension: string;
  romPath: string;
  imagePath: string;
}

function Library() {

  const [roms, setRoms] = useState<RomStoreType[]>([]);
  useEffect(() => {
    window.romLibrary.getAll().then((roms) => setRoms(roms));
  }, [roms]);

  return (
    <div className="grid grid-cols-5 justify-center gap-4 mx-8 mt-6 mb-4 text-white text-2xl" >
      {roms.map((rom) => (
        <div
        className="w-40 transition-all duration-200 hover:opacity-80 hover:scale-105 hover:-translate-y-4 cursor-pointer" 
        key={rom.name}
        onClick={async () => await window.launch.launchRom(rom.name, rom.consoleId, rom.extension)}
        >

          <RomCard
            name={rom.name}
            imageUrl={`file://${rom.imagePath.replace(/\\/g, '/')}`} 
            variant="default" 
            isInLibrary={true}
          />

        </div>
      ))}
    </div>

  )
}

export default Library