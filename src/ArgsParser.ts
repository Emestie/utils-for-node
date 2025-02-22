export class ArgsParser {
    private argsArray: string[];
    private argsObject: Record<string | number, any>;

    constructor(argsArray?: string[]) {
        this.argsArray = argsArray || process.argv.slice(2);
        this.argsObject = this.createArgsObject();
    }

    private createArgsObject(): Record<string | number, any> {
        const args = this.argsArray;
        const object: Record<string | number, any> = {};

        let skip = false;
        let unnamedIndex = 0;
        args.forEach((arg, index) => {
            if (skip) {
                skip = false;
                return;
            }

            let isOneDash = false;

            const key =
                arg.indexOf("--") === 0
                    ? arg.substring(2)
                    : (isOneDash = true && arg.indexOf("-") === 0)
                    ? arg.substring(1)
                    : unnamedIndex;

            if (key === unnamedIndex) {
                const value = arg;
                unnamedIndex++;
                object[key] = value;
                return;
            }

            skip = true;

            let value: any = args[index + 1];

            if (value === undefined || value.indexOf("-") === 0) {
                value = true;
                skip = false;
            }

            if (isOneDash && key.toString().length > 1) {
                key.toString()
                    .split("")
                    .forEach((k) => {
                        object[k] = value;
                    });
            } else object[key] = value;
        });

        return object;
    }

    public getArgsObject(): Record<string | number, any> {
        return this.argsObject;
    }

    public getString(name: string | number, alias?: string, defaultValue?: string): string | undefined {
        const valA = this.argsObject[name];
        const valB = alias ? this.argsObject[alias] : undefined;
        const val = valA || valB || defaultValue;

        return val;
    }

    public getNumber(name: string | number, alias?: string, defaultValue?: number): number | undefined {
        const val = this.getString(name, alias, defaultValue + "");

        if (val === undefined) return undefined;
        return Number(val);
    }

    public getBoolean(name: string | number, alias?: string): boolean {
        const valA = !!this.argsObject[name];
        const valB = alias ? !!this.argsObject[alias] : false;

        return valA || valB;
    }
}
