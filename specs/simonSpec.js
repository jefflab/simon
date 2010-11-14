describe("Settings", function() {
  it("has color sequences", function() {
    var sequences = [
      ['g', 'b', 'y', 'y'],
      ['r', 'r']
    ];
    expect(Simon.Settings.sequences).toEqual(sequences);
  });
});

