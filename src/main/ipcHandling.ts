import getHexromConsoles from "./extensions/hexrom/consoles/getHexromConsoles";

async function ipcExtensionsHandling(extension: string) {
    
        switch (extension) {
            case "hexrom":
                const consoles = await getHexromConsoles();
                return JSON.stringify(consoles);
    
            default:
                throw new Error("Extension not available");
        }
};

export default ipcExtensionsHandling;