document.querySelectorAll(".sidebar ul li a").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".sidebar ul li a").forEach((item) => {
      item.classList.remove("active");
    });
    this.classList.add("active");
  });
});

const apiBaseUrl = "http://localhost:5263/api/Bikes/Get-All-bikes-With-Images";

let bikes = [
  {
    bikeId: 2,
    brand: "Yamaha",
    type: "sports",
    model: "FZ",
    ratePerHour: 300,
    bikeImages: [
      {
        imageId: 2,
        imagePath:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAuRXhpZgAATU0AKgAAAAgAAkAAAAMAAAABAAAAAEABAAEAAAABAAAAAAAAAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wAARCAHaAdoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDkyTRk0GkoAXJoyaSigBcmjJpKKAFyaMmkooAXJoyaSigBcmjJpKKAFyaMmkooAXJoyaSigBcmjJpKKAFyaMmkooAXJoyaSigBcmjJpKKAFyaMmkooAXJoyaSigBcmjJpKKAFyaMmkooAXJoyaSigBcmjJpKKAFyaMmkooAXJoyaSigBcmjJpKKAFyaMmkooAXJoyaSigBcmjJpKKAFyaMmkooAXJoyaSigBcmjJpKKAFyaMmkooAXJoyaSigBcmlyabTqAENJSmkoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACnU2nUAIaSlNJQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFOptOoAQ0lKaSgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKdTadQAhpKU0lABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAU6m06gBDSUppKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAp1Np1ACGkpTSUAFFFFABWpoGhyeINQ+xQXMMEpUsvm5+bHUDHfHNZdS2t1LZXUVzbuUliYOjDsRQB2h+E+rgEi9sSQOAC/P6VxVxDJbTyQToUliYo6nsR1r3rw/rUWv6PBfQ4BcYdf7rjqK4T4oeHfKmTWrZPkciO4AHQ/wt/T8qAPPKKKUAkhVBLMcAAZzQBq+HvDt54lvWtrMomxd7ySZ2r+Xc10T/CnVI0Ltf2CqoyWJfgflXceDPDq+HtCjjlUfa5v3k59Cei/QDj86xfiZ4j+xaeNJtnxPdDMpB5SP0+p/kDQB5XIipI6q6uqkgMOA3uM9jRHG80ixxozyMcKqjJP0FLDDLczxwQIzyysFRR3Jr2jwj4PtvDlqskirLqDj95MR93/AGV9B/OgDhtK+GWr3yLJePHYxt/C/wAz/kOn4mt+P4R2YUeZqdyW/wBlFA/XNdlqutWGi2vn6hcLCh4UHkt9B3rj7j4tWEchFvp1zKg6MzBM/hzQBVuvhGuwmz1Rt3ZZo+PzFchrfhHVtAy95b7oM4E0Z3J+Pp+OK9H0r4maPfyCK5EtlI3AMoyn/fQ6fjiutIjuIiCFkjcdDyGB/mKAPnGiu48e+C10cnU9NQiydsSxD/lkT3H+yf0P1rh6AOk8PeCL7xJYPd2txbRIshjKy7s5H0HvTvEHgS/8O6b9turm2kj3hNsW7PP1HtXbfCn/AJFib/r5b+Qqb4o/8ij/ANvCf1oA8dooooAUDJA9Tiu4Hwo1YgEX1jgjP8f+FcOn31+or6Pj/wBWv+6KAPANd0Sfw/qb2FzJHJIqhi0ecHP1rOrrPiX/AMjnN/1yj/lXJ0AFFFFABRRTo42lkWONSzuQqqO5PFAHQ+HfBGoeJbJ7q2lghiR9gMufmPfGB2rX/wCFTat/z/WP/j/+Fej6Bpa6LodrYrjMSDcR3Y8k/mTWjQB876lYTaTqVxZXIHmwNtYjofcex61Vr0P4q6P5d1batGvyyDyZSB3HKn8sj8K88oAK1/Dvh258S3slraywxPHH5haTOCMgdu/NZFdz8J/+Rku/+vU/+hLQAv8AwqfV/wDn+sf/AB//AAo/4VPq/wDz/WP/AI//AIV6pcTrbW8s8mdkSl2wOwGa5MfFHQCAc3fP/TH/AOvQByx+E+r9r2xP4v8A4VnX3w68QWSF1t47lV/54vk/ka7ofE/w+TgtdAeph/8Ar1v6Truna5CZNOukmA+8o4ZfqDyKAPAZYpIZGimjaORThlcYI/OmV7h4r8J23iSzb5FjvUX91MBg57A+o/lXiUsT280kUylZI2Ksp7EcUAaPh/QrjxFqRsrWWKOQRl90ucYH078103/Cp9X/AOf6x/8AH/8ACq/wu/5G0/8AXu/8xXrssixQvI2cIpY49BQB5V/wqfV/+f6x/wDH/wDCj/hU+r/8/wBY/wDj/wDhXUf8LR0D/p7/AO/P/wBej/haOget3/35/wDr0Acv/wAKn1f/AJ/rH/x//CqupfDXUtM024vZry0ZIEMjKm7JA9OOtdl/wtHQPW7/AO/P/wBes/X/AIiaLqWg31nbm582eFo03R4GSPrQB5bRRRQAUUUUAFFFFABRRRQAU6m06gBDSUppKACiiigAooooA674d+I/7H1n7HcPi0vCFOT9x+x+h6flXrd/ZQ6hZS2lygeKZSjKfQ187f54r2jwF4j/ALe0VY53zeWuElyeXHZvx/mKAPJta0ibRNWuLCfJaJvlbHDKeh/Kum+Gvh3+0tTOp3KZtrQ/ICPvSf8A1uv1xXXePPCUniK2gnsgv22FgoLHG5Ceefbr+ddBoukw6JpNvY24+SJcE92Pc/UmgB+qajBpGmz3ty2IoVLH1PoPqTgV4JqmpT6vqdxfXJzJM24j+6OwHsBgV2HxN8R/bb8aRbPmG2O6Yg/ek7D8P5muEoA7z4V6Qt1qlxqUi5W1UJHn++3U/l/OvTr68i06ymu7g4ihQux9hXJ/CyJU8KvIB80lw+ffGBVn4lTtD4NnVSR5siIcemc/0oA8o1vWbnXtTkvbtiST+7TPEa9gKz6KKACvQ/hl4mkS7/sW6kLROC1uWOSpHJX6Y5/CvPKv6FO1rr9hMhwyXCflnmgD3y9s4r+ymtbhQ0UyFGB9DXz7f2T6dqFxZyfft5DGffB/rwa+ia8R+IMQh8bXwUfeCOfxUUAdx8Kf+RYm/wCvlv5Cpvij/wAij/28J/WofhT/AMixN/18t/IVN8Uf+RR/7eE/rQB47RRRQAqffX6ivo+P/Vr/ALor5wT76/UV9Hxf6pP90UAeN/Ev/kc5v+uUf8q5Ous+Jf8AyOc3/XKP+VcnQAUUUUAFdd8N9H/tLxKLmRcw2Q8w5/vnhf6n8K5Gvavh9o/9keGYnkXE92fOfI5AP3R+WPzoA6O5uI7S2luJmCxxKXYnsBya4P4feKZNV1jU7a6Y7riQ3MIJ6DoVH0GD+Bq18T9Y+xaGlhG2Jb1sMAeiDk/mcD868x0XU30fWLW/jzmGQMwHdehH4jNAHuPiTSV1vQLqyIG90zGT2ccj9a8CdWjco4IdThgexFfRsMyXEKTRMGjkUMpHcHpXjXxE0f8AsvxPJKi4hvB5y47N/EPz5/GgDlq7n4T/APIyXf8A16n/ANCWuGrufhP/AMjJd/8AXqf/AEJaAPTdY/5Al9/17yf+gmvnhPuD6V9E6nG82lXcUalneF1VR3JU4rxIeCfEWB/xKbjp6r/jQBiVreF7+fTfEljNbswZpVRlH8Sk4IqceCPETsB/ZMwz3LKP612Xg74eTadfR6hq5TzYjuigQ7gG9Sfb0FAHodeH+PYUt/GmoKnAYq5+pUE17ZLNHbwvLM4SNFLMxPAArwHX9S/tjXLy+Gds0hKg9lHA/QCgDovhd/yNp/693/mK9Zvv+Qfcf9cm/lXk3wu/5G0/9e7/AMxXrssYmieNs7XUqcehoA+cB0or2H/hVuget5/3/wD/AK1H/CrdA9bz/v8A/wD1qAPHqK73xv4K0vw9oiXdj9o80zrGfMk3DBBJ/kK4KgAooooAKKKKACiiigAooooAKdTadQAhpKU0lABRRRQAUUUUAFa/hnXZPD2tw3iljFnZMo/iQ9fxHX8KyKKAPo6GeO5gSaFw8cihlYdwelY3i/xCvh3Q5J1I+0y/u4FPdj3+g60eCP8AkTNL/wCuArkfi9/rNK+kv/stAHnLu0js7sWdiWZic5JpKKKAPWPhRdCTQLm2z80NwWx7MMj+RrW8fWLX/g+8WMFniAmAHfacn9M15x4B15dD8Qqs77bW6HlOx6Kf4T+fH417Syq6FWAZSMEHvQB830V1/jDwPc6NdSXVhE82nOS3yDJi9iPT3rkMj1FABWv4TsW1HxRp8CgkCUO3sq8n+VZltbTXs6wWsLzSseEQbia9e8CeDz4ft3ur0Kb+YAEDkRL/AHR7+tAHYV4V43uheeMdRdTlVkEeR/sjBr1/xJrcWgaLPeSEbwNsSH+Jz0H9foK8FkkaWR5HO53YszHuTzQB6x8KXB8N3AHUXLZ/IVY+J6E+EGIHCzxk/Tkf1rnfhTqqw3t3psjAeeBLHnuw4I+uMH8K9E1rS4tZ0i5sJjhZkwG/unqD+BxQB890Vd1XSbzRL17W/haNgeGx8rj1B7iqWR60AOiBeaNRyWYAD15r6OjBEag9QBXj/gPwlcapqcN/cxMljbsHDOP9aw6AewPOa9gkdYkZ5GCooyzHsBQB418SXB8Z3GD92KMH24rlK0fEGpDV9fvb4Z2SyEpn+6OB+gFZ1ABRRRQBreGdIOueIbWywTGW3Sn0Qcn8+n4170qhAFUYUDAArgPhVo3k2Nxqsi/POfLiJ/uDr+v8q7XUtVstItvtGoXCwRFgoZu59OKAOD8X+D9f8Q6/JdRrb/Z1URwq0uCFH+Jyaw/+FY+IP7lr/wB/v/rV6L/wnXhz/oKw/k3+FH/CdeHP+grD+Tf4UAP8IWOo6ZoEVlqgj82AlUKPuynb/D8KofEXRv7U8NPNGuZ7M+cuByV/iH5c/hV6Lxt4fmkSKPVIS7sFUYIyTx6VtOiyIUcBlYYIPcUAfOFdz8J/+Rku/wDr1P8A6Etcz4h0ltE166sSDsjfMZPdDyP04/Cum+E//IyXf/Xqf/QloA9WkkWJGeRgqKMsxOMCs7/hJ9F/6Ctn/wB/RVjWP+QJff8AXvJ/6Ca+eEA2DjtQB9B22vaXdzrDbahbSyt91EkBJrQr5wt5pLWeOe3cxyxMGRhwQRXunhTxDF4k0dLkYW4T5J0H8Lf4HrQB55498Vald3txpDwmzt4mwyZy0o7En074FcXXsHxC8Lf2zp/260jze2qk4A5kTuPqOo/GvH6AOy+F3/I2n/r3f+Yr1u5kMNrLKACUQtg+wryT4Xf8jaf+vd/5ivWb7/kH3H/XJv5UAeXf8LZ1T/nxs/zb/Gj/AIWzqn/PjZ/+Pf41w21v7rflRhvRvyoA6TxD44vfEmnrZ3NtBEiyCQNHuySMjv25rmqXDejflRtPo35UAJRRRQAUUUUAFFFFABRRRQAU6m06gBDSUppKACiiigAooooAKKKKAPdfBH/ImaX/ANcBXI/F7/WaV9Jf/Za4KPU7+GNY4b66jjUYVUmYAfQA1HcXlzdY+03E0237vmyFsfTNAENFFFABXoXg74hraQx6frTExKNsVz12j0b2HrXntFAH0bb3EN3AstvKksbDIZDkGqVz4c0i7k8y40y0kc/xGIZrwmx1O90199jdzW7d/LcgH8K2oviF4kiTaL8N7vErf0oA9ltNOs7BNtnawwA9RGgX+VUdc8Sab4fhL3s6+ZjKwocux+n9TXkF1428QXoKyanKqngiIBM/lWK7tI5eRmd2OSzHJNAGv4m8TXXiW+E037uGPiGEHIUf1J9axqKKAJba5ls7qK5tpDHNEwZGHYivYvCvjiy16FIbh1tr8D5omOA59VPfPp1rxij/APXQB9GXNrBeRmO5gjmjP8Mihh+tUYvDOiwyCSPSrNXByCIVrxmx8Wa5pyBLbUpxGOiud4H51df4h+JHTb9vUe6woD/KgD2mSSK2gLyOkUSDlmIAArzHxx47jv4X0vSHJgbia4H8Y/ur/j3ri7/V9Q1U5v72e49Fdsgfh0qnQAUUUUAFS2drLfXkNrAC0szhFA55P+c1FTo5ZIZBJC7RyKcqyHBH4igD6F0uwj0vTbezhH7uBAg98d68y+Ker/atYh01Gylqu9wO7t0/IY/OuR/tjUv+gjef9/3/AMaqySPNIZJnaSRjlmc5J/E0ANooooAORgg4IOQR2r3nwpq41vw7aXZOZCuyX2ccH/H8a8GqxDf3lqhS3u54UJyVjkKg/l3oA9G+K2j+ZBbatGvMR8mUj+6eh/A5H41lfCb/AJGK7/69T/6EtcfLqV7cRmOe9uZI26q8rMD+BNRW9zPauXtp5YXIwWjcqSPw7UAfQWsf8gS+/wCveT/0E188J9wfSrjatqDgq1/dsrDBBnY5/WqlABW14V8QyeG9YS5G5reT5J0H8S+v1HWsWigD6OgniuYEngcPFIoZWByCDXkvxD8K/wBk351K0jxZ3LfOAP8AVyHr+B6/WuVi1K+giEcN7dRxqMBUmYAfgDSS6le3EZjnvLmSNuqvKzA/gTQB1Hwt/wCRtb/r2f8AmK9h6184w3E1tJvt5pIXxjdGxU/p2qx/a+pf9BG8/wC/7/40AfQP2WD/AJ4x/wDfAo+ywf8APGP/AL4FfP39r6l/0Ebz/v8Av/jR/a+pf9BG8/7/AL/40AfQP2WD/njH/wB8Cq+pW0I0y6IhjyIXx8o/umvBv7X1L/oI3n/f9/8AGkOraiQQdQuyCMEGdzn9aAKafcH0paKKACiiigAooooAKKKKACnU2nUAIaSlNJQAUUUUAFFFS21rPeziG1heaVhkIgyT60ARUVp/8I1rX/QKvP8Av0aP+Ea1r/oFXn/fo0AZlFaf/CNa1/0Crz/v0aP+Ea1r/oFXn/fo0AZlFaf/AAjWtf8AQKvP+/RqreadeacUF9azW5cZUSLtzQBWoq5Z6RqF/GZLOynnjU7S0aFgDS3Wi6lYw+dd2NxBFnG6SMgZoApUUUUAFFFaY8N60QCNKvCCMgiI80AZlFTXVpcWMxhu4JIZQMlJBggUyGGW5mSGCNpJXOFRBkmgBlFaf/CNa1/0Crz/AL9Gj/hGta/6BV5/36NAGZRWn/wjWtf9Aq8/79Gj/hGta/6BV5/36NAGZRWn/wAI3rX/AECrz/v0azemfbg0AJRRRQAUUVf0rTDqMhLErEhwzDv7CqjFydkRUqRpxcpOyKFFdrDYWtsAI4EHuRkn86qa9Go0qQhFB3LyBjvXQ8M1FtvY4IZjGc1FR3ZytFFFcp6QUVNb2dxc/wCohdx6gcVbGgXxGSiD6sKtU5PVJmU69OLtKSRnUVfk0S+jBPk7h/sMDVJ42jcrIrKw6gik4SjurFQqwn8LTG0UUVJYUVbh0y8uQDHA209Gb5R+tWP+EfvsfdT6bxVqnNq6TMXiKUXZySZmUVam027tgTJAwX+8OR+lValxaeqNIzjP4XdeQUUUdeB1PTFIoKKuw6RezAFYGCnu52/zqY6BfAZ2IfYOKtU5tXSZi8RSTs5IzKKsXFjc23M0LKP72OKr1Li09UaRlGSvF3QUV1eiRqdKhJRScnkjPerNxYWtyCJYEP8AtAYI/KulYZtJp7nnyzKMJuLWz3OLoq9qumtp0wwS0TfdY/yPvVGuaUXF2Z306kakVKLumFFFFIsKKKKACnU2nUAIaSlNJQAUUUUAFdN8PJY4fGNs80ixoI5MlmwPun1rmaMA9aAPon+07H/n9tv+/q/40DUrIkAXluSTgASqa+ddi/3R+VT6ci/2lafKP9enb/aFAH0ZUEl9aROUkuoUcdVaQA1PXh/j9FPjTUMgdU7f7IoA9n/tOx/5/bb/AL+r/jXmnxXuYbi80wwTRyARyZKMGxyvpXAbF/uj8qUADoAPoKAPWvhR/wAi5cf9fJ/9BFWfih/yJ7f9d46rfCj/AJFy5/6+T/6CKs/FD/kUG/67x/1oA8cooooAUdR9a+jof9RH/uivnDuPrX0fB/qI/wDdFAHjvxN/5HGT/rhH/Ws3wZ/yOGmf9dx/KtL4m/8AI4yf9cI/61m+DP8AkcNM/wCu4/lQB7vVZtRs1JVruAMOCDIARVmvnvX0X/hIdR4H/HzJ2/2qAPe/7Tsf+f22/wC/q/40f2nY/wDP7bf9/V/xr512L/dH5UbF/uj8qAPoh9SstjYvLbOP+eq189Sf61/94/zpmxf7o/KloAKKKKACuu0SNY9Khx/Flj781yNdfpH/ACCrf/drqwnxs83M3+6XqV9evpbOGNYDtaQnLDsK5+W8uJkKSTO6k5Kk5rY8T/8ALv8AjWBU4iUudq+heApw9ipWV+4V0OmaGqATXi7nPIjPQfX3qp4fsluLozOMpF0B7t/9brXSu6xoXc4VRkk9q0w9FW55GGPxUlL2UH6gAEGAAqgdBxiq8mpWcRw1zGCOoBziub1LVZb52VSUgBwFBxn61QpzxVnaKIo5ZzLmqOz7HaxX1rMcR3EbH0zioNXNslg73MavxhQepPtXI095pZEVHkZkX7oJzipeK5k00axy3lmpKTshldJpGkJDGtxcKGlYZCn+H/69c9CAZ4w3QsAfzruf8ijCwUm2+gZjWlCKhF2vuNeRY0LOwVR1JOMVWOrWIOPtKZ9jWJ4hkmN+Ect5QUFB2P8A9esmqqYlxk0lsZUMujUgpye53MU0UwzDIrjvtOaxvEFraxwiXbsnY4G3jd9awY5GicPGzIw6EHFSXN5NeOrTvuKjaOMf5NRPEKcGmtTajgJUaqlGWnUiAJIAGSTgAd66vTNJjsow7qGnIyWP8PsK57Swp1O33dN+ef0rsarCwTvJmeZVpK1OLsmMlljhTdM6ovqxwKrDVrInH2lPzrndYeV9SlExPynCg9hVGnPFNNpLYVHLYygpSbu+x3UciTISjq6HqQc1z2v21rbvGYV2SuclV6Y9ayYZpbdw8LsjDuDinXNzJdTGWZsu3BwMVnUrqcLNam1DBSo1eZS0FjvbiJAkc7qo6KDjFdJod9Le20gnO54zgN61ytdD4Y/1dx/vD+VLDyfOlfQrMKcPZOVlfuW9ejV9JlJ6qQw/P/69cnXXa3/yCZ/oP5iuRp4r416E5Y/3T9QooormPSCiiigAp1Np1ACGkpTSUAFFFFABRRRQAVZ07/kJWn/XZP8A0IVWqzp3/IStP+uyf+hCgD6JrxDx/wD8jpqH1T/0EV7fXiHj/wD5HTUPqn/oIoA5yiiigD1r4Uf8i5c/9fJ/9BFbfi/Q5/EOhmytpI45DIr7nzjj6VifCj/kXLn/AK+T/wCgiuo1vW7Xw/p5vb7zPJDBD5a7jk9KAPN/+FT6r/z/AFp+Tf4Uv/Cp9V/5/rP8m/wrpv8AhaWgel5/34/+vR/wtLQPS8/78f8A16AOZ/4VPqvH+nWf5N/hXqsa7Y1U9QAK5D/haWgel5/34/8Ar12CsHRWHQjPNAHjfxN/5HGT/rhH/Ws3wZ/yOGmf9dx/KtL4m/8AI4yf9cI/61m+DP8AkcNM/wCu4/lQB7vXmOpfDDUr3U7q5jvLRUmlZwpDZAJzXp1cldfErQ7O7mtphd+ZE5RsQ5GRwe9AHK/8Kn1X/n+s/wAm/wAKpav8OtQ0fSri/nu7Z44F3MqA5Pbv9a7P/haWgel5/wB+P/r1leJfiDo2r+Hb2xtvtPnTx7V3xYGcjvmgDzOiiigAooooAK7DSM/2Vb/7uaytK0e3vLOOeZnJJIKg4BxW67RWsGWKxxIMZPAFd2GpuPvvZo8XMMRGpanFXaZjeJv+Xb/gVYFXtWvxf3QZM+Ug2rnjPv8AjVGuatJSm2j0cJTcKKjLc6rw/GE0wN3diT/KjxBKYtMKjjzGCn6daXQXB0qMf3WIP51F4jjL6erD+GQE12PSjp2PIWuM97uczRRRXnH0AUUUUAFdbpWpJfQBSQJlGGU9/f8AGuSpUdkcMpKsDkEHGK1pVXTd+hzYnDKvGzdmtmdtcW0V1HsnjV17Z7Vk3HhuM5NvMy/7LjNU7bxFcwgCYLMo7ng1qW/iC0lwJN0TH+8Mj9K6+ejV33PL9jisP8OqMS50i8tQWaPeg6snNUa7pJFkQOjBlbowOc1j65piGFrqBQsi8uAMbh6/UVlUw9leLOjD5g5SUKis31OfjkaKRXU4ZTkGuysb6K/gDoQHA+Ze4P8AhXF0+OV4XDxuyOOhBxWVGs6b8mdWLwqrpa2a2OyurK3vUAnjDY4DdCKybjw0OTbzkf7LjP6ioLfxHcR4E6LKP7w+U1p2+vWc2AzNEx7OMfrXVzUau+55vJi8N8N2jn7rTLqzyZIjs/vLyKqV3YIccEFWHGOc1z2uaYkIFzbqFUnDqO3vWNXD8q5ovQ6sLj/aSVOas2YtdB4Z/wBVcf7wrn60NI1FbC5PmZ8qQYYjnHvWVGSjNXOnGQdSi4x3N7Ws/wBkz/QfzFcjXcAxXUGQVkicY45BFYOraPb2Vq08LPncAFJyBmujE03L31skcGX4iME6ctG2YtFFFcR7IUUUUAFOptOoAQ0lKaSgAooooAKKKKACrOnf8hK0/wCuyf8AoQqtVnTv+Qlaf9dk/wDQhQB9E14h4/8A+R01D6p/6CK9vrw/x/8A8jpqH1T/ANBFAHO0UUUAetfCj/kXLn/r5P8A6CKs/FD/AJFBv+u8f9arfCj/AJFy5/6+T/6CKs/FD/kUG/67x/1oA8cooooAO4+tfR8P+oj/AN0V84dx9a+j4f8AUR/7ooA8d+Jv/I4yf9cI/wCtZvgz/kcNM/67j+VaXxN/5HGT/rhH/Ws3wZ/yOGmf9dx/KgD3evnzXv8AkYdR/wCvmT/0KvoOuYufh9oF3cy3E1tKZJWLsRMwyT+NAHilFe0f8K28Of8APrL/AN/3/wAaP+FbeHP+fWX/AL/v/jQB4vRXtH/CtvDn/PrL/wB/3/xryHU4UttVu4IQRHFO6KCc4AYigCrRRRQBr6dra2VskDQllBJLA+tdEjx3EKuMNG4yMjOa4auw0j/kFW/+7XbhqjbcXskeNmNCEEqkVZt6mBrditldAxjEcoyF9DWdW/4m/wCXb/gVYFc9ZJTdjvwc3OjFt3ZueG7oI8lsx+98y1uXEK3MEkMn3XGD7VxMcjRSLIhKupyCO1dZpuqxX8YUkJMB8ynv9K6cPUTjyM4Mfh5Rn7aG3X1OXurOWynMUy4I6N2YVDXcXFtFcpsnjV19CORWZJ4ctXOUeVPbOaieFd/d2NaOZQatUVmc1S4O3ODjPXFdNF4es4zly8nsTj+VWryxglsHg2rEgGVIGAp9an6rKzbZbzKnzKKTfmcdT5IpIseYjLuG4ZGMip7COF7+Nbl1WIHk9Qf/AKxrrpreG5j2TIroemf6VNKj7RPU0xOM9hJK109zh6K6SXw3bOSY5ZI/Y/NRF4bt0IMk0jj0A20/q072sL+0KFr3ZD4a839/yfKwMD3rZvCos5y3TyznP0p0UMdvGI4UCovQCsfXtSURm0hYM7f6wg9B6fU11aUqdmzy9cViOaKtr+Bzw7Dv0p8sTwyFJEZHHVSMVd0RLc6gpuHVdoyinjJ/+tXTXNnBeJtnjV8dD0I/GuWnQc43T1PUr4z2NRRauu5xNFdHJ4agJJSeRB6EA4p0Phy2jIMjvLjsflBo+rTvawPMaCW7Dw55v2CTeT5e/CZqzrRUaTPu9AB+dXURY0CoqqqjAAGMVzuu6ksxFtA25FOWYdz/APWrqm1TpWb6WPMpJ4jE86Vle5jVqaHYpeXLPMN0cQztPc/4Vl10Hhn/AFVx/vCuOgk5q56+Nm4UW07M2ZZI7aBpGwsaDJwOlc5qWtrfWzQLCVUsCGLZ6Vsa3/yCZ/oP5iuRrfE1GnyrZo4cuoQmnUkrtPQKKKK4j2AooooAKdTadQAhpKU0lABRRRQAUUUUAFPilaGaOVcbo2DDPqOaZRQB2X/C0td/uWn/AHwf8a5nVtTn1jUpr66CiWUjcEGBwMf0qnRQAUUUUAb2heMtS8O2b21ksBjd958xcnPT+lSa3431PX9PNleLbiIsHyiEHI/GudooAKKKKACuxHxQ1xQFCWmAMf6s/wCNcdRQBf1vWbnX9QN7eBBKyhCEGBgVFpt/LpeoQXtuFMsDblDjiqtFAHZf8LS13+5af98H/Gj/AIWlrv8ActP+/Z/xrjaKAOy/4Wlrv9y0/wC/Z/xo/wCFpa7/AHLT/v2f8a42igDsv+Fpa7/ctP8Av2f8a5G5uGurqa4kx5krl2xxyTn+tR0UAFFFFABXX6R/yCrf/drkK6zQ5Vl0qMA8oSpHpXVhX779DzczTdJPzKXib/l2/wCBVgV1esac9/ChhIEkZJAJxn1rn7jSru1hMs0YVAcEgg0sRTlzt20KwFaHslFtX7FSlBIIIJBHIIOMUlFcx6Bp22v3cICuVlUf3xz+dXB4nGPmtjn2esCitVWmlZM5Z4OjN3cTbk8SuR+7t1B9WOazbrUbm9/18hK9lHAFVqKUqs5aNl08NSpu8VqFW7XU7qywI5CU/utyKqUVEZNO6djWcIzVpK6NyPxO2P3lspPcq2Ke/icfw2xz7vWBRWv1ip3OZ4Gg38Jo3OuXdyCoYRIeCE4z+NZ1FFZyk5O7dzop04U1aKsFXrXV7u1AVZN6Dor84qjRSjJxd07BOnGatJXRvJ4nOP3ltz6q1D+Jzj5Lbn1LVg0Vr9Yqdzn+o0L35S9davd3gKs4SM9VTjNUaKKylKUndu50QpxgrRVkFdD4Y/1Nx/vD+VZVvpV3cwiWGMFG6EsBXQaPpzWFuwkIMkhyQOcV0YenLnTa0OHH1oOk4ppvsO1v/kEz/QfzFcjXV6/KsemOpPMhCgfrXKU8U/fXoGWJqk35hRRRXKeiFFFFABTqbTqAENJSmkoAKKKKACiiuk8A2sF74ut4bqGOaJo5MpIoYcL6GgDm8j1FGR6ivf8A/hG9G/6BVl/34X/Cj/hG9G/6BVl/34X/AAoA8AyPUUZHqK9//wCEb0b/AKBVl/34X/Cj/hG9F/6BVl/34X/CgDwDI9RRXv8A/wAI3o3/AECrL/vwv+FedfFDT7PT7zTls7WC3DpIWEUYXPI64oA4WipbW1nvbqO2tYmlmkOFRRya9Q8PfDKztEWbWiLqcj/VAkRr/wDFUAeWIjSnEaM59FGf5U82dygy1tOo9TGw/pX0NbWVtZoEtbeGFBwBGgXH5VORnIPSgD5t/nRXvup+GdJ1hCt5YwsxH31G1h+IrzLxZ4BuNCRryxZ7myXlsj54vr6j3oA4+iiigAooooAKMj1oPQ+uK910zwzpKaXarJplo7iFAzNCpJOB14oA8Kor2Dxn4Rsrnw7O+nWNvDcwfvVMUYUsB1Xj1Gfyrx+gAoopQGchVBZmOAB3NACZFW9O1KSwmLLhkbhlJ6//AF69j0HwfpthottBd2NtPcBMyvJEGO48nk9u34VW8X+HtNj8KajJa6faxTRxbkdIlUjHPUCnGTi7omcIzTjJXRw8Ot2UwGZfLburjGKra1e202mukNxE7lgQoOa5uvWPAv8AY2v6Kq3Gm2JvLbCS5gXLejdO/wDMV0PEyaaaWpwxy6EJqSb0dzyeivVvHng+1l0Q3ml2kUM9rl2WFAvmJ36dSOv515TXMegFFFWtNsJtV1CCytlzLM20e3v9AMmgCrkUV7xZeEtGs7KG3OnWspRQpkkiVmY9ySe9ea/EG807+1Rp2l2dtDHan968UYUs/pkdh/OgDkaKKKACiiigAooooAKKKKACiiigAooooA6XSL22h0yNJJ40cE5UnGOasTa3ZQgkS+a3ZUGc1yVFdKxMkkktjz5ZdCU3Jt6u5bv7+W/mDv8AKqjCqO3/ANeqlFFc8pOTuzuhBQSjFWSCiiikUFFFFABTqbTqAENJSmkoAKKKKACp7G+udNulubOZoZlBAdeoz1qCigDb/wCEz8Q/9Ba4/MVPZeMdfkv7dH1Scq0qqQSOQTzXO1Z07/kJWn/XZP8A0IUAfRNeSeMvE+s6f4rvba01GaKFCu1FIwPlBNet14f4/wD+R01D6p/6CKAIP+Ez8Q/9Ba4/MVR1LWL/AFcxtqN1JcGIHaWP3c9f5CqVW9Ls/t+rWdp/z3mVD+JoA9S+HPhpdM0pdRuEH2u7UMpI5SPsPx6/lXQa/r1r4e01ru6JPO1I1PzSN2A/x7VpqgjQIowqjAHtXj3xL1Vr7xM1qGPlWahFXtuPJP16D8KAKOseONa1iRibp7aEniKA7QB7nqTWTFq2o28gkhv7tHByGEzf41UooA9C8KfEidLiOz1xxJE52rc4wVP+16j3r04qsiEEBkYcg8givm+vafh5qj6n4VhErFpbZjAzE5JA6foR+VAHnXjnw4PD2uEW6kWdyDJEOyn+Jfw/ka5uvYPifYrc+FftGP3lrKrA+x4P8wfwrx+gAooooAls4jcXtvEBkySouPqa+jEARAo6AYFeC+E7f7T4r0uPGR9oViPYc/0r3ugBCAQQeQe1eFeMdEOheJLi3VcQSnzYf909vwOR+Feq+G/EI1bUtWspGBls7lgnvH0H5EEflWb8TNE/tHQRfRLmeyO/jqUP3v6H8KAPIK634c6J/aviIXMi5t7IeYcjq/8ACP6/hXJV7f4H0T+xPDcKSLi4n/ey/U9B+AwKAOjqnq8P2nR72HGfMgdcfVTWTf8AiIQ+MtN0aJh+8R3m9vl+UfoT+VdCQCpB6EUAfNw4AHpxWv4X11/D2uQ3gyYidk6j+JD/AFHX8Kz72H7Pf3EP/PKV0/I4qCgD6OikjuYEkjZXjkUMrDkMDXinjfw6fD+uOIlxZ3GZICO3qv4H9CK6z4YeI/Ot20W5f95EC9uSeqd1/Dr9DXT+LfD6+IdDltgALhPngY9nH9D0/GgDwmvU/hl4c+y2baxcpiWcbYAR91PX8f5CuH8L+Hpdd8QpYyIyRxHdc5GNqg8j6k8V7mqR28KqoVI4lwB0Cgf0xQBieMPEC+HtDkmUj7VL+7gX1Y9/oOteGu7O5ZmLMxyzE5ya3/GfiE+IdckljY/ZIcxwL6ju31J5+mK5+gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKdTadQAhpKU0lABRRRQAUUUUAFWdO/5CVp/12T/0IVWqzp3/ACErT/rsn/oQoA+ia8P8f/8AI6ah9U/9BFe4V4f4/wD+R01D6p/6CKAOdrX8JEJ4t0ot0+0qP8KyKltrhrO6huE+/FIHGPY5oA+ja8H8ZIyeMNUDdTOWH0Ir3Gyu476yhuoWDRzIHUj0NeZ/FLQ5IdQj1iFCYZlEcxA+64+6T7EcfhQBwFFFFABXqvwlUjRb5j91rnA/BRmvLERpXWNFZnY7VUDJJPb617t4R0Y6F4dtrR8ecRvlx/fPJ/Lp+FAFb4gOqeCtQ3d1UD/voV4hXqvxW1NYdHt9PVh5lxJvYD+6v/18flXlVABRRRQB1Hw5h87xnantEkj/APjuP617SSACT0A5ryj4Twb9fvJiP9Xb4B+rf/Wr07VJvs2k3k2f9XA7fkpNAHimh6+2keMP7RLHypJ3Eo9UZv6cH8K9xYR3EBUhXjkXBHZgf/rV84jkfWvZPhzrn9q+HhbTNm4siI2yeqfwn8uPwoA5DSPBrD4hPp0yFrS0bzySOGTqo/E4H4GvV7u7isbOW5nbbFChdj6AU4QxiYyhFEjAKWA5IHQfqfzrhPinrn2bT4dJhb95cnfLg9EHb8T/ACoA47SNYlvviBaalOcPPdjIJ+6D8oH0AIFe4V852Upt7+2mHWOVWH4GvosEEAjkGgDwXxbD9m8W6pGBgfaCw/Hn+tZFdT8SLfyfGdw2MCWNHHvxg/yrlqAJ7G9m029hu7ZtssLB1P8Ansele+aLq0OuaTBfW5+WVeV/ut3H4Gvnyu8+FmrTRaxNpud1vPGZQCfusv8AiD+lAHpVrplpY3d1c28KpLdMHmYfxEcVyXxL8Sf2dpo0y2fFxdr+8IPKx9/z6fTNdvI21GbGcDOK+e9X1ObWtVuL65P7yVsgZ+6OwHsBQBTooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACnU2nUAIaSlNJQAUUUUAFFFFABVnTv+Qlaf9dk/9CFVqltZVhvIZWBKxyK5A74OTQB9G14f4/8A+R01D6p/6CK7f/hbGkf8+d9/3yv/AMVXnfibVIdb1+6v7dHSKUjargZGAB2+lAGVRRRQB6F8OfFsdqF0bUJAkZbNtIxwAT1Q/U8j8q9KubaG8tpLe5jWWKQbWRhwRXznXYeHviNqOkRpb3i/bbZRgbmxIo9m7j6/nQBr6x8KH81pNHu1EZORDPn5fow6/jWTF8LtdkkCyNaRLnljIWx+QrtbP4leH7kDzJ5bZz1WWM8fiMirj+PPDiqT/akLeyhif5UAU/DHgKy8PyLdSsbq9A+WRhhY/wDdH9T+ldBqep22kWEl5eSiOGMZJ7n2HqT6Vx+p/FTToEK6bbzXUnZnGxB+fJrz3XPEOoeILkS6hNuVT8kSjCJ9B6+55oAb4h1ubxBrE19ONoPyxpn7iDoPr3+prNoooAKKKKAPTPhHB+41Ocjq6ID9ASf5iuq8aT/ZvB+puDgmEr+fH9a4DwV400/w1pMttc29zJLJMZC0SgjGAB1PtVjxX8QLHXdAmsLS3uo5ZWXLSKoGAcnoaAOArd8H6+PDuvJcyFvs0imOYKM/L2P1BwawqKAPY/8AhaHh/wDv3X/fg15b4g1d9c1y5vnyFkbEan+FBwB+X86zqKAA5AJHUDIr6I0qYT6TZyg53wo2f+AivnevSdD+JWnabollZ3FtePNBEsbMgUg447mgCj8WINuvWU2P9Zblf++W/wDshXCV1vjjxVY+J/sTWcM8bwF9xlA5Bx0wfauSoAK634Zf8jin/XCT+lclW34Q1uDw9ry311HJJGsTJtjAJ5x6/SgD3Sf/AFEn+6a+cK9Xk+K2kPGyi0vcsCPur/8AFV5RQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABTqbTqAENJSmkoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACnU2nUAIaSlNJQAUUUUAFFFFABRRRQAUUUUAFaGkWEd/NKkjMoRQRtrPra8Mf8fNx/1zH860oxTmk9jnxc3CjKUXZomudAtobWWVZJSyKWAJFc/XaX//ACD7j/rma4utcRBRaSVjmy+rOpBubvZhRRRXMeib1joNvdWUUzySBnXJAIqpq+mxad5Plszb853dsVu6R/yCrf8A3azfE/8Ay7f8C/pXbOnFUrpa2PGoYipLFcjel9ivpGkxX8EjyO6lW2jbV/8A4Ru2/wCesv5isrTtWbToXjWJXDNuJLYxVv8A4SeT/n2T/vo1NN0VFc25rXhi3Num9Oha/wCEbtv+esv5ij/hG7b/AJ6y/mKdpmstf3JiaFUAXdkHNacj+XG74ztUnHrW8adKaulocNStiacuSUmmZX/CN23/AD1l/MUf8I3bf89ZfzFVf+Enk/59k/76NH/CTyf8+yf99Gs+ah2On2eN7mVeRLb3k0KklUYqCas6RYJqM0iyMyqi5ytVLiY3FzJMQFMjbsA5xW54YT5Lh/UgVz0oqVS3Q7cRUlTw7d7O34kv/CN23/PWX8xWFe2xs7qSE/wngnuK7SsXxHab4UuVHKHa2PT/AOsa6a1FKN4rY4MFjJuoo1HdM52iiiuA9su6VY/b7ryyWEajLMO1bH/CN23/AD1l/MVNodp9msA7DEkvzH2HatGvQo0I8qclqzwcVjZ+0ag7JHG6larZXrwqWKqAQT3qrWv4jTF+jf3ox+lZFcdWPLNpHsYabnSjJ7tG1puiwXtkkzvIGYnIFRavpUVhDG8buxZsHdWvoP8AyCY/qf51W8S/8ekH++f5V0ypxVK6WtjzIYio8VyN6X2OcoooriPZCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAp1Np1ACGkpTSUAFFFFABRRRQAUVetdIu7rDLHsQ/xPxWxa+H7aHBnJmYdjwtbQozn0sjlrYylS3d32Rz0NtNcvtgjZz7DpWva+G2OGupQo7qnJ/Ot391bR/wAEcY/ACsy68QW0ORADMw7jgVuqNOmrzZwSxmIru1JWRj6vbRWt+YoF2oFBxnOaueGP+Pm4/wCuY/nWbeXj3s5mkChiMYHatLwx/wAfNx/1zH86yptOqrbXOrEKSwrUt7am1f8A/IPuP+uZri67sgOCrAFSMEHnNQ/YbX/n2i/75rpr0XUadzzsJi1QTTV7s4qiu1+w2v8Az7Rf98ij7Da/8+0X/fIrH6o+51/2pD+VkWkf8gq3/wB2s3xP/wAu3/Av6VuIixoFRQqqMAAYxWH4n/5dv+Bf0resrUmjkwkufFKS6u5g0UUV5p9Aa3hz/kIN/wBczXRXH/HtL/uH+Vc74c/5CDf9czXRXH/HtL/uH+Vehh/4f3ng4/8A3j7jh6KKK8891bBXTeHExppb+9IT+XFczXXaKmzSYP8AaBb9a6cKrzuefmbtSS7ssXN0lr5Zfo8gTPpmnyxLNC8TjKsNprI8SviCBPVifyH/ANer2lXn2ywRyf3ija31/wDr9a61NObgzy3RcaUay7nJ3ELW08kT/eQ4PvU+m2pvb+OPHyA7m+g/zitHxJZ4Md0o+98r4/SrXh+z8mzM7D55Txnsv/165FR/e8r2R6s8Wvq3Ot3oapKohJwFUZPtUdrcLdWyTKMK4yBWf4gvPJsxCp+eY4Psv/1+lSaA+/Sox/dYiuv2l58i7Hkug1Q9q+rKXidObd/qtYNdL4kTNhG392T+Yrmq4sQrTZ7OXu9BLsdZoP8AyCY/qf51W8S/8ekH++f5VZ0H/kEx/U/zqt4l/wCPSD/fP8q6pfwPkebT/wB8+ZzlFFFece+FSWyK91CrDKs4BHrzUdOjdo5FdcblORmmt9SZJuLSOguvDcbZa1kKH+6/IrGutOubMnzomC/3hyDWxa+JI3wt1GUP95OR+Va8NxDdJmGRZFPXBzXb7KlU1i7M8hYjE4fSoro4eiusutEtLnJCeU5/iTgflWPdaDdW+WjAmQf3eD+VYTw8462ujso46lU0vZ+Zl0UpBBIIIIOCDxikrA7QooooAKKKKACiiigAooooAKKKKACiiigAp1Np1ACGkpTSUAFFFFABRRRQB3MX+pj/AN0fyqtfvfLF/oKRtxySckfSsC11y6tgFYiWMcBX7fjW1a65aXOAzGJz2fofxr0o1oTja9mfP1MLVoz57XRzV1JcyTH7WZN47Pxioa7iWGK5jxIiyIRxkZrJuvDkT5a2kMZ/utyK56mGlunc7aOYU7KMlY52trwx/wAfNx/1zH86yrq1ls5zFMAHAzwc5rV8Mf8AHzcf9cx/Os6KaqJM6MW08PJp3TRuXrtHZTupIZUJBHauU/ta+/5+pK6m/wD+Qfcf9czXF1tipOLVmceWU4yg3JJ69S3/AGtff8/UlH9rX3/P1JVSiubnl3Z6Xsaf8qOz02RpdNgkkYs7Lkse9ZXif/l2/wCBf0rS0j/kFW/+7Wb4n/5dv+Bf0ruq60fkeLhkli7LuzBooorzj3zW8Of8hBv+uZrorj/j2l/3D/Kud8Of8hBv+uZrorj/AI9pf9w/yr0MP/D+88HH/wC8fccPRRRXnnurYK7ayTy7KBfSMZrikG91X+8QK7oDAA9BiuzBrVs8rNXpFHP+JXzPAnopP61BoF59nvfKY/u5uOex7f4UeIn36mR/dQCswEggg4IOQR2rKc2qrkujOijRU8KoPsdvc26XUDwyfdYYOO1PRFjQKuAqjA9qq2N9HdWccrOocjDAnGDUGtXyw2BWN1MkvyjBzj1ruc4pc3keNGlUlNUvMwNTvPtt/JID8gO1foP8a2fDT5s5l/uyZ/MVzdbnhh/nuE9QCK4qEm6t+57GMpqOGcVsjQ1xN+lS/wCyQ361yddpfp5mn3C+sZri6rFr3k/IzyuV6bXZnWaD/wAgmP6n+dVvEv8Ax6Qf75/lVnQf+QTH9T/OotftprqCFYI2kZWJIHat2m6Nl2OKDSxbbdlc5iirn9k33/PrJ+lH9k3/APz6yfpXD7OXZnt+3p/zIp0Vc/sm/wD+fWT9KrvbypOIGQrLkDaeOtJxkt0UqkJbNMjp0bukgMZYP22nBrctfDbcNdS4HdU5/Wte2sbezGIIlU/3sZJ/Gt4Yab1ehw1swpR92OpR0yTU3x9qRfK/vPw36f1rVqndapaWeQ8gZ/7qcmsa68Qzy5FuoiX+8eTXT7SFNWbuzz1h6uIlzKNkUtT/AOQncf75qrTndpHLuxZmOSTzmm150ndtnvwXLFJ9EFFFFIoKKKKACiiigAooooAKKKKACiiigAp1Np1ACGkpTSUAFFFFABRRRQAUUUUAWLa+ubM/uJWUd1PIP4Vs2viRThbqIqf7ycj8q56itYVZx2Zz1sLSq/Ete5f1qaK51AyQuHQoMEVY8PTRQzzmaRUDIACxxnmsiikqjU+aw3QTpeyvpax119e2z2E6rPGWaM4AbOa5GiinVqOo02icNhlQTSd7hRRRWR0nV6VeW0emQK88asq4IJxis7xHNFN9n8mRX27s7TnHSsWit5V24ctjihgowq+0Td73CiiisDtNTQJY4b9mkdUXyyMscVuzX1sbeQC4iJKkABuvFcdRW8K7hHlSOKvgo1anO20FFFFYHaTWe37bDvIC7wSTxiuv+32vP+kxf99VxVFbUqzpppLc5MRhFXabbVi5q0qzanM6sGXOAQcg1ToorJu7b7nTCKhFRXRWCiiikVYK1NAuEt79/MdUVoyMk1l0VUJOLTXQzq01Ug4PqdpJe2jxsv2mL5gR96uL6fgaOKK0q1XUtdbGOGwqoXSd7nTaLdW8WmRpJNGrAnKk471f+3Wv/PzF/wB9VxVFXHEuKStsc88ujOTk29Xc7X7da/8APzF/31R9utf+fmL/AL6riqKr62+xP9lw/mZ2v261/wCfmL/vqubvZUfXjIrqY/MU7gcjtms6ionXc0tNjahgY0W3du6sdNdeIbeLIt1MzevQVjXWrXd5kNIVQ/wpwKpUVE605dTSlg6VPVK77sKKKKyOoKKKKACiiigAooooAKKKKACiiigAooooAKKKKACnU2nUAIaSlNJQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFOptOoAQ0lKaSgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKdTadQAhpKU0lABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAU6m06gBDSUppKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAp1Np1ACGkpTSUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABTqbTqAENJT5P8AWN9aSgBtFOooAbRTqKAG0U6igBtFOooAbRTqKAG0U6igBtFOooAbRTqKAG0U6igBtFOooAbRTqKAG0U6igBtFOooAbRTqKAG0U6igBtFOooAbRTqKAG0U6igBtFOooAbRTqKAG0U6igBtFOooAbRTqKAG0U6igBtFOooAbRTqKAG0U6igBtFOooAbTqKup9xfoKAP//Z",
        bikeId: 2,
      },
    ],
    units: [{ registrationNo: "ABC0-1234", yearOfManufacture: 2021 }],
  },
];
console.log(bikes);

// JSON.stringify(bikes)

//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

let dispalySection = document.getElementById("dispalySection");
let dispalySectionHead = document.getElementById("dispalySectionHead");
let dispalySectionBody = document.getElementById("dispalySectionBody");

let viewBikesBtn = document.getElementById("viewBikes");
viewBikesBtn.addEventListener("click", displayBikes);

let addModalBtn = document.getElementById("addModalBtn");
addModalBtn.addEventListener("click", () => {
  addBikeModalFunctions();
});

function addBikeModalFunctions() {
  var modal = document.getElementById("addBikeModal");
  modal.style.display = "block";
  var closeBtn = document.getElementById("addBikesClose");
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

async function displayBikes() {
  // Example API call (uncomment and adjust as needed)
  // const response = await fetch(apiBaseUrl);
  // const bikes = await response.json();

  console.log(bikes);
  dispalySectionHead.innerHTML = "";
  dispalySectionHead.innerHTML = `
        <th>Brand</th>
        <th>Model</th>
        <th>Type</th>
        <th>Rate per Hour</th>
        <th>Actions</th>
    `;

  dispalySectionBody.innerHTML = "";
  bikes.forEach((bike) => {
    dispalySectionBody.innerHTML += `
            <tr>
                <td>${bike.brand}</td>
                <td>${bike.model}</td>
                <td>${bike.type}</td>
                <td>${bike.ratePerHour}</td> 
                <td>
                    <button type="button" id="addUnitsBtn" data-index="${bike.bikeId}">Add</button>
                    <button type="button">Edit</button>
                    <button type="button">Delete</button>
                </td>
            </tr>
        `;
  });
  let addUnitsBtn = document.getElementById("addUnitsBtn");
  addUnitsBtn.addEventListener("click", (event) => {
    addUnitsModalFunctions(event); //Model Display
  });
}

function addUnitsModalFunctions(event) {
  let addUnitsModal = document.getElementById("addUnitsModal");
  addUnitsModal.style.display = "block";
  const bikeId = event.target.getAttribute("data-index");
  fetchbikeById(bikeId);
  let addUnitsClose = document.getElementById("addUnitsClose");
  addUnitsClose.onclick = function () {
    addUnitsModal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == addUnitsModal) {
      addUnitsModal.style.display = "none";
    }
  };
}

async function fetchbikeById(id) {
  // const response = await fetch(`${apiBaseUrl}${id}`);
  // const bike = await response.json();
  let bike = bikes.find((p) => p.bikeId == id);
  console.log(bike);

  let AddbikeViewPage = document.getElementById("AddbikeViewPage"); //Add bike id defind

  console.log("Add Bikes: " + AddbikeViewPage);
  AddbikeViewPage.innerHTML = "";

  AddbikeViewPage.innerHTML += `
      <h3>${bike.brand} ${bike.type} ${bike.model}</h3>
      <table id="unitsTable">
      <thead>
      <tr>
          <th>Registration Number</th>
          <th>Year of manufacture</th>
      </tr> 
      </thead>`

  let tableBody = document.createElement('tbody');
  let table = document.getElementById('unitsTable');
  bike.units.forEach(element => {
    tableBody.innerHTML = `
    <tr>
    <td>${element.registrationNo}</td>
    <td>${element.yearOfManufacture}</td>
    </tr>  
    `
  });
  table.append(tableBody);
  generateRows(tableBody);
}
 function generateRows(tableBody){

  tableBody.innerHTML += `
  <tr class="block-elem">
    <td class="inline-elem"><input><input></td>
    <td class="inline-elem"><button>+</button></td>
   </tr>
  `
 }

