import EmulatorCard from '@renderer/components/ui/EmulatorCard'

function Emulators() {
  return (
    <div className='grid grid-cols-4 gap-4 items-center' >
      <EmulatorCard name='PSP' iconUrl='../../assets/emulators/ppsspp.png' downloadUrl='https://www.ppsspp.org/files/1_19_3/ppsspp_win.zip' />
      <EmulatorCard name='PS2' iconUrl='../../assets/emulators/pcsx2.png' downloadUrl='https://github.com/PCSX2/pcsx2/releases/download/v2.4.0/pcsx2-v2.4.0-windows-x64-Qt.7z' />
      <EmulatorCard name='NDS' iconUrl='../../assets/emulators/desmume.png' downloadUrl='https://github.com/TASEmulators/desmume/releases/download/release_0_9_13/desmume-0.9.13-win64.zip' />
      <EmulatorCard name='PS3' iconUrl='../../assets/emulators/rpcs3.png' downloadUrl='https://github.com/RPCS3/rpcs3-binaries-win/releases/download/build-9c93ec0bc31bbc94ca4dce2a76ceea80da6f6554/rpcs3-v0.0.37-18022-9c93ec0b_win64_msvc.7z' />
      <EmulatorCard name='3DS' iconUrl='../../assets/emulators/citra.png' downloadUrl='https://archive.org/download/citra-nightly-2104_20240304/citra-windows-msvc-20240303-0ff3440.7z' />
      <EmulatorCard name='WII & GC' iconUrl='../../assets/emulators/dolphin.png' downloadUrl='https://dl.dolphin-emu.org/releases/2506/dolphin-2506-x64.7z' />
      
    </div>
  )
}

export default Emulators