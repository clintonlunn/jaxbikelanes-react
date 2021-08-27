const cycleQuery = `
    [out:json]
    [timeout:25]
    ;
    area(3600119008)->.area_0;
    (
      nwr
        ["highway"="cycleway"]
        (area.area_0);
      nwr
        ["cycleway"]
        (area.area_0);
      nwr
        ["cycleway:left"]
        (area.area_0);
      nwr
        ["cycleway:right"]
        (area.area_0);
      nwr
        ["bicycle_road"="yes"]
        (area.area_0);
      nwr
        ["bicycle_parking"]
        (area.area_0);
      nwr
        ["bicycle"="designated"]
        (area.area_0);
    );
    (
      ._;
      >;
    );
    out;
    `;

export { cycleQuery }