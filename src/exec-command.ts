import { exec } from "child_process";

export async function execCommand(command: string) {
    return new Promise((resolve, reject) => {
        exec(command, function (error, stdout, stderr) {
            if (error) reject(error);
            resolve(stdout);
        });
    });
}
