import { flashLoading, getDiode, setDiode } from "@/app/lib/diode";

describe("diode", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    setDiode("ok");
  });
  afterEach(() => jest.useRealTimers());

  it("passe en chargement puis revient à la normale", () => {
    flashLoading(500);
    expect(getDiode()).toBe("loading");
    jest.advanceTimersByTime(500);
    expect(getDiode()).toBe("ok");
  });

  it("ne masque pas une erreur en cours", () => {
    setDiode("error");
    flashLoading(500);
    expect(getDiode()).toBe("error");
  });
});
