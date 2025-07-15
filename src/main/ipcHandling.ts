import getHexromConsoles from "./extensions/hexrom/consoles/getHexromConsoles";

function ipcExtensionsHandling(extension: string) {
    switch (extension) {
        case "hexrom":
            return getHexromConsoles;

        default:
            throw new Error("Extension not available");

        // case "romspedia":
        //     return await getRomspediaConsoles;
    }
};

export default ipcExtensionsHandling;