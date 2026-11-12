import { getRewindEffect, playRewind } from "@/app/lib/rewind";
import { getDiode, setDiode } from "@/app/lib/diode";

describe("reconstruction", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    setDiode("ok");
  });
  afterEach(() => jest.useRealTimers());

  it("déclenche l'effet le temps demandé et passe la diode en chargement", () => {
    expect(getRewindEffect()).toBe(false);
    playRewind(800);
    expect(getRewindEffect()).toBe(true);
    expect(getDiode()).toBe("loading");
    jest.advanceTimersByTime(800);
    expect(getRewindEffect()).toBe(false);
    expect(getDiode()).toBe("ok");
  });
});
