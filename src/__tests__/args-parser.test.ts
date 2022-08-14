import { ArgsParser } from "../ArgsParser";

describe("ArgsParser", () => {
    it("no args", () => {
        const parser = new ArgsParser([]);

        expect(Object.keys(parser.getArgsObject()).length).toBe(0);
    });

    it("1 unnamed arg", () => {
        const parser = new ArgsParser(["some/path"]);

        expect(Object.keys(parser.getArgsObject()).length).toBe(1);
        expect(parser.getString(0)).toBe("some/path");
        expect(parser.getString(1)).toBe(undefined);
        expect(parser.getString("named")).toBe(undefined);
    });

    it("1 unnamed arg, 1 named arg", () => {
        const parser = new ArgsParser(["some/path", "--named", "namedval"]);

        expect(Object.keys(parser.getArgsObject()).length).toBe(2);
        expect(parser.getString(0)).toBe("some/path");
        expect(parser.getString(1)).toBe(undefined);
        expect(parser.getString("named")).toBe("namedval");
    });

    it("1 unnamed arg, 1 named arg with alias", () => {
        const parser = new ArgsParser(["some/path", "--named", "namedval"]);

        expect(Object.keys(parser.getArgsObject()).length).toBe(2);
        expect(parser.getString(0)).toBe("some/path");
        expect(parser.getString(1)).toBe(undefined);
        expect(parser.getString("named", "n")).toBe("namedval");
    });

    it("1 unnamed arg, 1 named arg with alias with value", () => {
        const parser = new ArgsParser(["some/path", "-n", "namedval"]);

        expect(Object.keys(parser.getArgsObject()).length).toBe(2);
        expect(parser.getString(0)).toBe("some/path");
        expect(parser.getString(1)).toBe(undefined);
        expect(parser.getString("named", "n")).toBe("namedval");
    });

    it("2 unnamed args, 1 named arg with alias with value", () => {
        const parser = new ArgsParser(["some/path", "-n", "namedval", "more"]);

        expect(Object.keys(parser.getArgsObject()).length).toBe(3);
        expect(parser.getString(0)).toBe("some/path");
        expect(parser.getString(1)).toBe("more");
        expect(parser.getString(2)).toBe(undefined);
        expect(parser.getString("named", "n")).toBe("namedval");
    });

    it("2 unnamed args, 1 named arg with alias with value", () => {
        const parser = new ArgsParser(["some/path", "-n", "namedval", "more", "--second", "secondval"]);

        expect(Object.keys(parser.getArgsObject()).length).toBe(4);
        expect(parser.getString(0)).toBe("some/path");
        expect(parser.getString(1)).toBe("more");
        expect(parser.getString(2)).toBe(undefined);
        expect(parser.getString("named", "n")).toBe("namedval");
        expect(parser.getString("second", "s")).toBe("secondval");
    });

    it("1 unnamed ard, 2 bool args", () => {
        const parser = new ArgsParser(["some/path", "-b"]);

        expect(Object.keys(parser.getArgsObject()).length).toBe(2);
        expect(parser.getString(0)).toBe("some/path");
        expect(parser.getBoolean("b")).toBe(true);
        expect(parser.getBoolean("central")).toBe(false);
    });

    it("1 number arg non-zero", () => {
        const parser = new ArgsParser(["-b", "15"]);

        expect(Object.keys(parser.getArgsObject()).length).toBe(1);
        expect(parser.getNumber("b")).toBe(15);
    });

    it("1 number arg zero", () => {
        const parser = new ArgsParser(["-b", "0"]);

        expect(Object.keys(parser.getArgsObject()).length).toBe(1);
        expect(parser.getNumber("b")).toBe(0);
    });

    it("1 number arg zero with default", () => {
        const parser = new ArgsParser(["-b", "0"]);

        expect(Object.keys(parser.getArgsObject()).length).toBe(1);
        expect(parser.getNumber("b", undefined, 42)).toBe(0);
    });

    it("no args, default values", () => {
        const parser = new ArgsParser([]);

        expect(Object.keys(parser.getArgsObject()).length).toBe(0);
        expect(parser.getString("a", "alpha", "def")).toBe("def");
        expect(parser.getNumber("b", "beta", 29)).toBe(29);
        expect(parser.getBoolean("c", "centrum")).toBe(false);
    });
});
